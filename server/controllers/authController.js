
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) return res.status(400).json({ message: 'Account already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.status(201).json({ userId:user._id, username, role, token });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    const username = user.username, role = user.role;
    res.json({ userId:user._id,token, username, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
