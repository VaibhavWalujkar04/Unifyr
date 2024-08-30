# backend/utils/faiss_search.py
import faiss
import numpy as np

class FaissSearch:
    def __init__(self, dimension):
        self.index = faiss.IndexFlatL2(dimension)

    def add_to_index(self, vectors):
        self.index.add(np.array(vectors).astype('float32'))

    def search(self, query_vector, k=5):
        query_vector = np.array(query_vector).astype('float32').reshape(1, -1)
        distances, indices = self.index.search(query_vector, k)
        return distances, indices

# Usage
# faiss_search = FaissSearch(dimension=768)  # Example dimension
# faiss_search.add_to_index([combined_vector])
# distances, indices = faiss_search.search(combined_vector)
