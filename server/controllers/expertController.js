const Expert = require('../models/Expert');
const Candidate = require('../models/Candidate');

exports.createExpertProfile = async (req, res) => {
  const { fullName, skills, coreAreasOfExpertise, yearsOfExperience, user } = req.body;

  try {
    const expert = new Expert({
      user,
      name: fullName,
      skills,
      subject: coreAreasOfExpertise,
      experience: yearsOfExperience
    });

    await expert.save();

    res.status(201).json({ message: 'Expert profile created successfully', expert });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.assignCandidateToExpert = async (req, res) => {
  const { expertId } = req.params;
  const { candidateId } = req.body;

  try {
    const expert = await Expert.findById(expertId);
    const candidate = await Candidate.findById(candidateId);

    if (!expert || !candidate) {
      return res.status(404).json({ message: 'Expert or Candidate not found' });
    }

    // Check if the candidate is already assigned
    if (candidate.assignedTo) {
      return res.status(400).json({ message: 'Candidate is already assigned to an expert' });
    }

    // Assign the candidate to the expert
    candidate.assignedTo = expert._id;
    await candidate.save();

    // Add candidate to the expert's assignedCandidates list
    expert.assignedCandidates.push(candidate._id);
    await expert.save();

    res.status(200).json({ message: 'Candidate assigned to expert successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCandidatesAssignedToExpert = async (req, res) => {
  const { expertId } = req.params;

  try {
    const expert = await Expert.findById(expertId).populate('assignedCandidates');
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }

    res.status(200).json(expert.assignedCandidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpertById = async (req, res) => {
  const { expertId } = req.params;

  try {
    const expert = await Expert.findById(expertId).populate('assignedCandidates');
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }
    res.status(200).json(expert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};