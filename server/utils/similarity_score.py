import time
from matching_algorithms import cosine_similarity_with_plain_embeddings, cosine_similarity_with_topic_modelling, Bipartite_graph_matching, hybrid_recommendation_algorithm, Faiss_search, weighted_jaccard_similarity
import warnings

warnings.filterwarnings('ignore')

start = time.time()

# Sample data
candidates_data = {
    'id': [1, 2, 3, 4],
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'skills': [
        'Python, Machine Learning, Data Analysis, SQL, TensorFlow, Pandas, NumPy, Keras, Scikit-Learn, ETL',
        'Java, Spring, Microservices, Docker, Kubernetes, Maven, RESTful APIs, Hibernate, Git, CI/CD',
        'Python, Deep Learning, NLP, PyTorch, Data Visualization, Flask, AWS, Spark, Big Data, SQL',
        'JavaScript, React, Node.js, TypeScript, Web Development, Angular, HTML, CSS, Redux, Webpack'
    ],
    'experience': [7, 5, 4, 6]  # Years of experience
}


experts_data = {
    'id': [1, 2, 3, 4],
    'name': ['Dr. Johnson','Dr. Smith', 'Dr. Brown', 'Dr. Taylor'],
    'skills': [
        'Python, Machine Learning, Data Analysis, SQL, TensorFlow, Pandas, NumPy, Keras, Scikit-Learn, ETL',
        'Python, Spring, Microservices, Docker, Kubernetes, Maven, RESTful APIs, Keras, Scikit-Learn, ETL',
        'C++, High-Performance Computing, Algorithm Optimization, Data Structures, Machine Learning, SQL, Parallel Computing, MPI, OpenMP',
        'JavaScript, Full Stack Development, React, Node.js, TypeScript, Angular, Web Development, HTML, CSS, Redux'
    ],
    'experience': [15, 10, 12, 8]  # Years of experience
}


cosine_similarity_with_plain_embeddings_matrix = cosine_similarity_with_plain_embeddings(candidates_data, experts_data)
cosine_similarity_with_topic_modelling_matrix = cosine_similarity_with_topic_modelling(candidates_data, experts_data)
Faiss_search_matrix = Faiss_search(candidates_data, experts_data)
Bipartite_graph_matching_matrix = Bipartite_graph_matching(candidates_data, experts_data)
hybrid_recommendation_algorithm_matrix = hybrid_recommendation_algorithm(candidates_data, experts_data)
weighted_jaccard_similarity_matrix = weighted_jaccard_similarity(candidates_data, experts_data)


# Example scores from each method with desired format
methods_scores = {
    'cosine_similarity_with_topic_modelling': cosine_similarity_with_topic_modelling_matrix,
    'cosine_similarity_with_BERT_embeddings': cosine_similarity_with_plain_embeddings_matrix,
    'faiss_searching': Faiss_search_matrix,
    'hybrid_recommendation': hybrid_recommendation_algorithm_matrix,
    'weighted_jaccard_similarity': weighted_jaccard_similarity_matrix
}

# Normalizing function
def normalize_scores(scores):
    all_scores = [v for candidate_scores in scores.values() for v in candidate_scores.values()]
    min_score = min(all_scores)
    max_score = max(all_scores)
    return {candidate: {expert: (score - min_score) / (max_score - min_score)
                        for expert, score in candidate_scores.items()}
            for candidate, candidate_scores in scores.items()}

# Normalize all methods' scores
normalized_methods_scores = {method: normalize_scores(scores) for method, scores in methods_scores.items()}

# Step 2: Combine the scores
# Assigning equal weight to all methods
weights = {method: 1 / len(normalized_methods_scores) for method in normalized_methods_scores}

combined_scores = {candidate: {} for candidate in normalized_methods_scores['faiss_searching'].keys()}

for candidate in combined_scores.keys():
    for expert in normalized_methods_scores['faiss_searching'][candidate].keys():
        combined_score = sum(weights[method] * normalized_methods_scores[method][candidate][expert]
                             for method in normalized_methods_scores)
        combined_scores[candidate][expert] = combined_score

# Step 3: Rank the matches and ensure unique matches per candidate
final_matches = sorted([(candidate, expert, score) for candidate, experts in combined_scores.items() 
                        for expert, score in experts.items()],
                       key=lambda x: x[2], reverse=True)

# Ensure unique matching per candidate
assigned_candidates = set()
unique_matches = []

# Iterate over sorted matches
for match in final_matches:
    candidate, expert, score = match
    if candidate not in assigned_candidates:
        unique_matches.append(match)
        assigned_candidates.add(candidate)

# Display final unique matches
print("Final Unique Matching based on Combined Scores:")
for match in unique_matches:
    print(f"Candidate {match[0]} is best matched with Expert {match[1]} (Combined Score: {match[2]:.2f})")

end = time.time()

print("code tooke", (end - start) * 10**3, "ms")

# import os
# import json
# import time
# from matching_algorithms import cosine_similarity_with_BERT_embeddings, cosine_similarity_with_topic_modelling, Bipartite_graph_matching, hybrid_recommendation_algorithm, Faiss_search

# def get_score(candidates_data, experts_data):
#     # Run the various matching algorithms
#     cosine_similarity_with_BERT_embeddings_matrix = cosine_similarity_with_BERT_embeddings(candidates_data, experts_data)
#     cosine_similarity_with_topic_modelling_matrix = cosine_similarity_with_topic_modelling(candidates_data, experts_data)
#     Faiss_search_matrix = Faiss_search(candidates_data, experts_data)
#     Bipartite_graph_matching_matrix = Bipartite_graph_matching(candidates_data, experts_data)
#     hybrid_recommendation_algorithm_matrix = hybrid_recommendation_algorithm(candidates_data, experts_data)

#     # Example scores from each method with desired format
#     methods_scores = {
#         'cosine_similarity_with_topic_modelling': cosine_similarity_with_topic_modelling_matrix,
#         'cosine_similarity_with_BERT_embeddings': cosine_similarity_with_BERT_embeddings_matrix,
#         'faiss_searching': Faiss_search_matrix,
#         'hybrid_recommendation': hybrid_recommendation_algorithm_matrix
#     }

#     # Normalizing function
#     def normalize_scores(scores):
#         all_scores = [v for candidate_scores in scores.values() for v in candidate_scores.values()]
#         min_score = min(all_scores)
#         max_score = max(all_scores)
#         return {candidate: {expert: (score - min_score) / (max_score - min_score)
#                             for expert, score in candidate_scores.items()}
#                 for candidate, candidate_scores in scores.items()}

#     # Normalize all methods' scores
#     normalized_methods_scores = {method: normalize_scores(scores) for method, scores in methods_scores.items()}

#     # Combine the scores
#     weights = {method: 1 / len(normalized_methods_scores) for method in normalized_methods_scores}
#     combined_scores = {candidate: {} for candidate in normalized_methods_scores['faiss_searching'].keys()}

#     for candidate in combined_scores.keys():
#         for expert in normalized_methods_scores['faiss_searching'][candidate].keys():
#             combined_score = sum(weights[method] * normalized_methods_scores[method][candidate][expert]
#                                  for method in normalized_methods_scores)
#             combined_scores[candidate][expert] = combined_score

#     # Rank the matches and ensure unique matches per candidate
#     final_matches = sorted([(candidate, expert, score) for candidate, experts in combined_scores.items()
#                             for expert, score in experts.items()],
#                            key=lambda x: x[2], reverse=True)

#     # Ensure unique matching per candidate
#     assigned_candidates = set()
#     unique_matches = []

#     for match in final_matches:
#         candidate, expert, score = match
#         if candidate not in assigned_candidates:
#             unique_matches.append(match)
#             assigned_candidates.add(candidate)

#     # Print final unique matches
#     print("Final Unique Matching based on Combined Scores:")
#     for match in unique_matches:
#         print(f"Candidate {match[0]} is best matched with Expert {match[1]} (Combined Score: {match[2]:.2f})")

# if __name__ == "__main__":
#     # Load data from environment variables
#     candidates_data = json.loads(os.environ['CANDIDATES_DATA'])
#     experts_data = json.loads(os.environ['EXPERTS_DATA'])

#     start = time.time()
#     get_score(candidates_data, experts_data)
#     end = time.time()

#     print(f"Script execution time: {(end - start) * 1000:.2f} ms")
