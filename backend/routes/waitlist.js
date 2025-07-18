import express from 'express';
import Waitlist from '../models/Waitlist.js';

const router = express.Router();

// // ✅ Get first 50 users who joined the waitlist
// router.get('/top50', async (req, res) => {
//   try {
//     const topUsers = await Waitlist.find({})
//       .sort({ createdAt: 1 }) // oldest first
//       .limit(50);

//     res.status(200).json(topUsers);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch top 50 users', error });
//   }
// });

// ✅ Get user position in the waitlist
router.post('/position', async (req, res) => {
  try {
    const { email, fingerprint } = req.body;

    if (!email && !fingerprint) {
      return res.status(400).json({ message: 'Email or fingerprint is required' });
    }

    const user = await Waitlist.findOne({ $or: [{ email }, { fingerprint }] }).sort({ createdAt: 1 });

    if (!user) {
      return res.status(404).json({ message: 'User not found in waitlist' });
    }

    const position = await Waitlist.countDocuments({ createdAt: { $lt: user.createdAt } }) + 1;

    res.status(200).json({ position });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching position', error });
  }
});


// ✅ Get total number of users in the waitlist
router.get('/count', async (req, res) => {
  try {
    const count = await Waitlist.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error getting count', error });
  }
});

// ✅ Get number of users joined per day (using createdAt)
router.get('/stats/daily', async (req, res) => {
  try {
    const stats = await Waitlist.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1
        }
      }
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch daily stats', error });
  }
});

// ✅ Add a user to the waitlist
router.post('/', async (req, res) => {
  try {
    const { email, name, fingerprint, ipAddress } = req.body;

    // Check if the user already exists by email, fingerprint, or IP
    const existingEntry = await Waitlist.findOne({
      $or: [
        { email },
        { fingerprint },
        { ipAddress }
      ]
    });

    if (existingEntry) {
      return res.status(409).json({ 
        message: 'You have already joined the waitlist',
        existingEntry
      });
    }

    const entry = new Waitlist({
      email,
      name,
      fingerprint,
      ipAddress,
      points: 100
    });

    await entry.save();

    res.status(201).json({ 
      message: 'Successfully added to waitlist!', 
      entry 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Duplicate entry detected' });
    }
    res.status(500).json({ message: 'Something went wrong.', error });
  }
});

export default router;
