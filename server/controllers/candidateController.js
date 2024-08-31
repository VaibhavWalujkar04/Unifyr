
const Candidate = require('../models/Candidate');
const Expert = require('../models/Expert')
const { getSimilarityScores } = require('../utils/similarity_utils');

exports.createCandidateProfile = async (req, res) => {
  const { fullName, technicalSkills, yearsOfExperience, user } = req.body;

  try {
    const candidate = new Candidate({
      name: fullName,
      skills: technicalSkills,
      experience: yearsOfExperience,
      user
    });
    await candidate.save();
    const experts = await Expert.find();
    const candidatesData = {
        id: [candidate._id],
        name: [candidate.name],
        skills: [candidate.skills],
        experience: [candidate.experience]
    };
    const expertsData = {
        id: experts.map(expert => expert._id),
        name: experts.map(expert => expert.name),
        skills: experts.map(expert => expert.skills),
        experience: experts.map(expert => expert.experience)
    };
    const data = await getSimilarityScores(candidatesData, expertsData);
    const matches = data.matches
    for (const match of matches) {
      const { candidate_id, expert_id, score } = match;

      // Find the candidate by ID
      const candidateToUpdate = await Candidate.findById(candidate_id);

      if (candidateToUpdate) {
        // Add the expert and score to the assignedTo field
        candidateToUpdate.assignedTo.push({ expert: expert_id, score });

        // Save the updated candidate
        await candidateToUpdate.save();

        // Update the expert's assignedCandidates field
        await Expert.findByIdAndUpdate(expert_id, { $addToSet: { assignedCandidates: candidate_id } });
      }
    }
    res.status(201).json({ message: 'Candidate profile created and experts assigned successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCandidateById = async (req, res) => {
  const { candidateId } = req.params;

  try {
    const candidate = await Candidate.findById(candidateId).populate('assignedTo');
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};