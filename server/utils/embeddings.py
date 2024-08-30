# backend/utils/embeddings.py
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from transformers import BertTokenizer, BertModel
import torch

class VectorGenerator:
    def __init__(self):
        self.tfidf_vectorizer = TfidfVectorizer()
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.bert_model = BertModel.from_pretrained('bert-base-uncased')

    def generate_tfidf_vector(self, texts):
        return self.tfidf_vectorizer.fit_transform(texts).toarray()

    def generate_bert_embedding(self, text):
        inputs = self.tokenizer(text, return_tensors='pt', truncation=True, padding=True)
        outputs = self.bert_model(**inputs)
        return outputs.last_hidden_state.mean(dim=1).detach().numpy()

    def generate_combined_vector(self, tfidf_vector, berpt_embedding):
        return np.concatenate((tfidf_vector, bert_embedding), axis=1)

# Usage
# vector_generator = VectorGenerator()
# tfidf_vector = vector_generator.generate_tfidf_vector(["sample text"])
# bert_embedding = vector_generator.generate_bert_embedding("sample text")
# combined_vector = vector_generator.generate_combined_vector(tfidf_vector, bert_embedding)
    