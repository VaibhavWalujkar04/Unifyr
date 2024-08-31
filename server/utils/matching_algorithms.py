from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from sklearn.decomposition import LatentDirichletAllocation
from scipy.sparse import csr_matrix
import faiss
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import jaccard_score

# Ignore warnings for cleaner output
import warnings
warnings.filterwarnings('ignore')

# Declare global variables
experience_weight = 0.2

# Optimized cosine similarity function without BERT embeddings
def cosine_similarity_with_plain_embeddings(candidates_data, experts_data):
    global experience_weight
    
    candidates_df = pd.DataFrame(candidates_data)
    experts_df = pd.DataFrame(experts_data)

    # Vectorization using TF-IDF
    vectorizer = TfidfVectorizer(stop_words='english')
    all_skills = candidates_df['skills'].tolist() + experts_df['skills'].tolist()
    tfidf_matrix = vectorizer.fit_transform(all_skills)

    # Split back into candidates and experts matrices
    candidates_tfidf = tfidf_matrix[:len(candidates_df)]
    experts_tfidf = tfidf_matrix[len(candidates_df):]

    # Compute cosine similarity between candidates and experts
    similarity_matrix = cosine_similarity(candidates_tfidf, experts_tfidf)

    # Normalize experience values to be between 0 and 1
    candidates_df['normalized_experience'] = candidates_df['experience'] / candidates_df['experience'].max()
    experts_df['normalized_experience'] = experts_df['experience'] / experts_df['experience'].max()

    # Factor in the experience by multiplying the cosine similarity with experience ratios
    for i in range(similarity_matrix.shape[0]):
        for j in range(similarity_matrix.shape[1]):
            experience_diff = abs(candidates_df['experience'].iloc[i] - experts_df['experience'].iloc[j])
            epsilon = 1e-6
            experience_ratio = 1 / (experience_diff + epsilon)
            experience_ratio /= (1 + experience_ratio)
            similarity_matrix[i, j] *= (1 - experience_weight + experience_weight * experience_ratio)

    # Convert the DataFrame into the desired dictionary format
    similarity_dict = {c: {e: similarity_matrix[i, j] for j, e in enumerate(experts_df['id'])} for i, c in enumerate(candidates_df['id'])}

    return similarity_dict

def cosine_similarity_with_topic_modelling(candidates_data, experts_data):
    global experience_weight
    
    candidates_df = pd.DataFrame(candidates_data)
    experts_df = pd.DataFrame(experts_data)

    # Combine skills from both candidates and experts
    all_skills = pd.concat([candidates_df['skills'], experts_df['skills']])

    # Preprocessing - Vectorization using TF-IDF with sparse matrix
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = csr_matrix(tfidf_vectorizer.fit_transform(all_skills))

    # Apply LDA with reduced number of topics
    n_topics = 3  # Reduced number of topics
    lda_model = LatentDirichletAllocation(n_components=n_topics, random_state=42)
    lda_matrix = lda_model.fit_transform(tfidf_matrix)

    # Split LDA matrix back into candidates and experts
    candidates_lda = lda_matrix[:len(candidates_df)]
    experts_lda = lda_matrix[len(candidates_df):]

    # Compute cosine similarity between candidates and experts based on topic distribution
    similarity_matrix = cosine_similarity(candidates_lda, experts_lda)

    experts_df['normalized_experience'] = experts_df['experience'] / experts_df['experience'].max()

    for i in range(similarity_matrix.shape[0]):
        for j in range(similarity_matrix.shape[1]):
            experience_diff = abs(candidates_df['experience'].iloc[i] - experts_df['experience'].iloc[j])
            epsilon = 1e-6
            experience_ratio = 1 / (experience_diff + epsilon)
            experience_ratio /= (1 + experience_ratio)
            similarity_matrix[i, j] *= (1 - experience_weight + experience_weight * experience_ratio)

    # Convert similarity matrix to nested dictionary format
    similarity_dict = {c: {e: similarity_matrix[i, j] for j, e in enumerate(experts_df['id'])} for i, c in enumerate(candidates_df['id'])}

    return similarity_dict

def Faiss_search(candidates_data, experts_data):
    global experience_weight

    candidates_df = pd.DataFrame(candidates_data)
    experts_df = pd.DataFrame(experts_data)

    # Vectorization using TF-IDF
    vectorizer = TfidfVectorizer(stop_words='english')
    all_skills = candidates_df['skills'].tolist() + experts_df['skills'].tolist()
    tfidf_matrix = vectorizer.fit_transform(all_skills)

    # Split back into candidates and experts matrices
    candidates_tfidf = tfidf_matrix[:len(candidates_df)]
    experts_tfidf = tfidf_matrix[len(candidates_df):]

    # Normalize embeddings for better FAISS performance
    candidates_embeddings = candidates_tfidf.toarray().astype('float32')
    experts_embeddings = experts_tfidf.toarray().astype('float32')

    # Create a FAISS index
    index = faiss.IndexFlatIP(candidates_embeddings.shape[1])  # Inner Product for similarity
    index.add(experts_embeddings)

    # Search for the nearest experts for each candidate
    k = len(experts_df)
    distances, indices = index.search(candidates_embeddings, k)

    experts_df['normalized_experience'] = experts_df['experience'] / experts_df['experience'].max()

    similarity_scores = {}

    for i, candidate in enumerate(candidates_df['id']):
        candidate_scores = {}
        for j in range(k):
            expert_idx = indices[i][j]
            expert_name = experts_df.iloc[expert_idx]['id']
            similarity_score = 1 / (1 + distances[i][j])
            experience_diff = abs(candidates_df['experience'].iloc[i] - experts_df['experience'].iloc[expert_idx])
            epsilon = 1e-6
            experience_ratio = 1 / (experience_diff + epsilon)
            experience_ratio /= (1 + experience_ratio)
            adjusted_similarity_score = similarity_score * (1 - experience_weight + experience_weight * experience_ratio)
            candidate_scores[expert_name] = adjusted_similarity_score
        
        similarity_scores[candidate] = candidate_scores

    return similarity_scores

def Bipartite_graph_matching(candidates_data, experts_data):
    global experience_weight
    
    # Convert data to DataFrames
    candidates_df = pd.DataFrame(candidates_data)
    experts_df = pd.DataFrame(experts_data)

    # Vectorization using TF-IDF
    vectorizer = TfidfVectorizer(stop_words='english')
    all_skills = candidates_df['skills'].tolist() + experts_df['skills'].tolist()
    tfidf_matrix = vectorizer.fit_transform(all_skills)

    # Split back into candidates and experts matrices
    candidates_tfidf = tfidf_matrix[:len(candidates_df)]
    experts_tfidf = tfidf_matrix[len(candidates_df):]

    # Compute cosine similarity between each candidate and expert
    similarity_matrix = cosine_similarity(candidates_tfidf, experts_tfidf)

    # Normalize expert experience and factor it into the similarity scores
    max_experience = experts_df['experience'].max()
    experts_df['normalized_experience'] = experts_df['experience'] / max_experience

    # Create a matrix of experience differences between candidates and experts
    experience_diff_matrix = np.abs(
        candidates_df['experience'].values[:, np.newaxis] - experts_df['experience'].values
    )

    # Compute inverse experience ratios (using a small epsilon to avoid division by zero)
    epsilon = 1e-6
    experience_ratio_matrix = 1 / (experience_diff_matrix + epsilon)
    experience_ratio_matrix /= (1 + experience_ratio_matrix)

    # Adjust similarity scores based on experience ratios
    similarity_matrix *= (1 - experience_weight + experience_weight * experience_ratio_matrix)

    # Create a dictionary to store similarity scores
    similarity_scores = {
        candidate: {
            experts_df['id'][expert_idx]: similarity_matrix[candidate_idx, expert_idx]
            for expert_idx in range(len(experts_df))
        }
        for candidate_idx, candidate in enumerate(candidates_df['id'])
    }

    return similarity_scores

def hybrid_recommendation_algorithm(candidates_data, experts_data):    
    # Create DataFrames
    candidates_df = pd.DataFrame(candidates_data)
    experts_df = pd.DataFrame(experts_data)

    # Combine skills to create a vocabulary
    all_skills = candidates_df['skills'].tolist() + experts_df['skills'].tolist()

    # Vectorize skills
    vectorizer = CountVectorizer()
    skills_matrix = vectorizer.fit_transform(all_skills)

    # Split into candidates and experts features
    candidates_skills_matrix = skills_matrix[:len(candidates_df)]
    experts_skills_matrix = skills_matrix[len(candidates_df):]

    # Convert to DataFrames
    candidates_skills_df = pd.DataFrame(candidates_skills_matrix.toarray(), columns=vectorizer.get_feature_names_out())
    experts_skills_df = pd.DataFrame(experts_skills_matrix.toarray(), columns=vectorizer.get_feature_names_out())

    # Add experience as a feature
    candidates_features = pd.concat([candidates_skills_df, candidates_df['experience']], axis=1)
    experts_features = pd.concat([experts_skills_df, experts_df['experience']], axis=1)

    # Convert all column names to strings
    candidates_features.columns = candidates_features.columns.astype(str)
    experts_features.columns = experts_features.columns.astype(str)

    # Ensure all features are numeric
    candidates_features = candidates_features.apply(pd.to_numeric, errors='ignore')
    experts_features = experts_features.apply(pd.to_numeric, errors='ignore')

    # Standardize the features
    scaler = StandardScaler()
    candidates_features_scaled = scaler.fit_transform(candidates_features)
    experts_features_scaled = scaler.transform(experts_features)

    # Combine all features for collaborative filtering
    all_features_scaled = np.vstack([candidates_features_scaled, experts_features_scaled])

    # Perform Dimensionality Reduction
    svd = TruncatedSVD(n_components=10)
    all_features_reduced = svd.fit_transform(all_features_scaled)

    # Calculate cosine similarity for collaborative filtering
    similarity_matrix = cosine_similarity(all_features_reduced)

    # Split back into candidates and experts similarity matrix
    candidates_similarity_matrix = similarity_matrix[:len(candidates_df), len(candidates_df):]
    experts_similarity_matrix = similarity_matrix[len(candidates_df):, :len(candidates_df)]

    # Transpose the experts_similarity_matrix to match the shape
    experts_similarity_matrix = experts_similarity_matrix.T

    # Define weights for hybrid recommendation
    alpha = 0.5  # Weight for content-based scores
    beta = 0.5   # Weight for collaborative scores

    # Compute final scores
    final_scores = alpha * candidates_similarity_matrix + beta * experts_similarity_matrix
    experts_df['normalized_experience'] = experts_df['experience'] / experts_df['experience'].max()

    for i in range(len(candidates_df)):
        for j in range(len(experts_df)):
            # Calculate the absolute difference in experience between candidate and expert
            experience_diff = abs(candidates_df['experience'].iloc[i] - experts_df['experience'].iloc[j])
            
            # Compute inverse experience ratio (add a small epsilon to avoid division by zero)
            epsilon = 1e-6
            experience_ratio = 1 / (experience_diff + epsilon)
            
            # Normalize the experience ratio (optional for scaling)
            experience_ratio /= (1 + experience_ratio)
            
            # Adjust the final score based on the experience ratio
            final_scores[i, j] *= (1 - experience_weight + experience_weight * experience_ratio)

    # Construct output in desired format
    output_similarity_matrix = {}
    for i, candidate_name in enumerate(candidates_df['id']):
        output_similarity_matrix[candidate_name] = {}
        for j, expert_name in enumerate(experts_df['id']):
            output_similarity_matrix[candidate_name][expert_name] = final_scores[i, j]

    return output_similarity_matrix

def weighted_jaccard_similarity(candidates_data, experts_data, weight_vector=None):
    candidates_df = pd.DataFrame(candidates_data)
    experts_df = pd.DataFrame(experts_data)

    # Convert skills into binary vectors (0 or 1)
    vectorizer = CountVectorizer(binary=True)
    all_skills = candidates_df['skills'].tolist() + experts_df['skills'].tolist()
    skills_matrix = vectorizer.fit_transform(all_skills)

    # Split into candidates and experts vectors
    candidates_skills = skills_matrix[:len(candidates_df)].toarray()
    experts_skills = skills_matrix[len(candidates_df):].toarray()

    if weight_vector is None:
        weight_vector = np.ones(candidates_skills.shape[1])

    # Apply weights to skills
    weighted_candidates_skills = candidates_skills * weight_vector
    weighted_experts_skills = experts_skills * weight_vector

    # Calculate weighted Jaccard similarity using jaccard_score
    similarity_matrix = np.zeros((len(candidates_df), len(experts_df)))

    for i, candidate in enumerate(weighted_candidates_skills):
        for j, expert in enumerate(weighted_experts_skills):
            similarity_matrix[i, j] = jaccard_score(candidate > 0, expert > 0)

    similarity_dict = {c: {e: similarity_matrix[i, j] for j, e in enumerate(experts_df['id'])} for i, c in enumerate(candidates_df['id'])}

    return similarity_dict
