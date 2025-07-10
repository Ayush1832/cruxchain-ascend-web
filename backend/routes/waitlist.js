// backend/routes/waitlist.js
import express from 'express';
import Waitlist from '../models/Waitlist.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Waitlist.findOne({ email });

    if (existing) {
      return res.status(409).json({ message: 'Email already exists in waitlist.' });
    }

    const entry = new Waitlist({
      email,
      points: 50, // Give them 10 points for joining!
    });

    await entry.save();

    res.status(201).json({ message: 'Successfully added to waitlist with points!' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error });
  }
});

export default router;
