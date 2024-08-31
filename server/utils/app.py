from flask import Flask, request, jsonify
import time
from matching_algorithms import cosine_similarity_with_plain_embeddings, cosine_similarity_with_topic_modelling, Bipartite_graph_matching, hybrid_recommendation_algorithm, Faiss_search
import warnings

warnings.filterwarnings('ignore')

app = Flask(__name__)

@app.route('/get-similarity-scores', methods=['POST'])
def get_similarity_scores():
    data = request.get_json()
    candidates_data = data.get('candidates_data')
    experts_data = data.get('experts_data')

    if not candidates_data or not experts_data:
        return jsonify({"error": "Invalid input data"}), 400

    start = time.time()
    matches = get_score(candidates_data, experts_data)
    end = time.time()

    return jsonify({
        "matches": [{"candidate_id": match[0], "expert_id": match[1], "score": match[2]} for match in matches],
        "execution_time_ms": (end - start) * 1000
    })

def get_score(candidates_data, experts_data):
    # Run the various matching algorithms
    cosine_similarity_with_plain_embeddings_matrix = cosine_similarity_with_plain_embeddings(candidates_data, experts_data)
    cosine_similarity_with_topic_modelling_matrix = cosine_similarity_with_topic_modelling(candidates_data, experts_data)
    Faiss_search_matrix = Faiss_search(candidates_data, experts_data)
    Bipartite_graph_matching_matrix = Bipartite_graph_matching(candidates_data, experts_data)
    hybrid_recommendation_algorithm_matrix = hybrid_recommendation_algorithm(candidates_data, experts_data)

    # Example scores from each method with desired format
    methods_scores = {
        'cosine_similarity_with_topic_modelling': cosine_similarity_with_topic_modelling_matrix,
        'cosine_similarity_with_BERT_embeddings': cosine_similarity_with_plain_embeddings_matrix,
        'faiss_searching': Faiss_search_matrix,
        'hybrid_recommendation': hybrid_recommendation_algorithm_matrix,
        'Bipartite_graph_matching':Bipartite_graph_matching_matrix
    }

    # Normalizing function
    def normalize_scores(scores):
        all_scores = [v for candidate_scores in scores.values() for v in candidate_scores.values()]
        min_score = min(all_scores)
        max_score = max(all_scores)
        if max_score == min_score:
            return scores
        return {candidate: {expert: (score - min_score) / (max_score - min_score)
                            for expert, score in candidate_scores.items()}
                for candidate, candidate_scores in scores.items()}

    # Normalize all methods' scores
    normalized_methods_scores = {method: normalize_scores(scores) for method, scores in methods_scores.items()}
    
    # Combine the scores
    weights = {method: 1 / len(normalized_methods_scores) for method in normalized_methods_scores}
    combined_scores = {candidate: {} for candidate in normalized_methods_scores['faiss_searching'].keys()}

    for candidate in combined_scores.keys():
        for expert in normalized_methods_scores['faiss_searching'][candidate].keys():
            combined_score = sum(weights[method] * normalized_methods_scores[method][candidate][expert]
                                 for method in normalized_methods_scores)
            combined_scores[candidate][expert] = combined_score

    # Rank the matches and ensure unique matches per candidate
    final_matches = sorted([(candidate, expert, score) for candidate, experts in combined_scores.items()
                            for expert, score in experts.items()],
                           key=lambda x: x[2], reverse=True)

    # Ensure unique matching per candidate
    assigned_candidates = set()
    unique_matches = []

    for match in final_matches:
        candidate, expert, score = match
        # if candidate not in assigned_candidates:
        unique_matches.append(match)
            # assigned_candidates.add(candidate)

    # Return final unique matches
    return unique_matches

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
