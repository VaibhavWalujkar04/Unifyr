const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  basicInfo: { type: Object, required: true },
  tfidfVector: { type: [Number], required: true },
  bertEmbedding: { type: [Number], required: true },
  combinedVector: { type: [Number], required: true },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expert' }], // Changed to array of experts
});

module.exports = mongoose.model('Candidate', CandidateSchema);
