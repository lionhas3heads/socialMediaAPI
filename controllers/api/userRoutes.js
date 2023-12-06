const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', async (req, res) => {
  const allUsers = await User.find();

  res.status(200).json(allUsers);
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.sytus(404).json('404 Not Found');
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const createdUser = await User.create({
      username: req.body.username,
      email: req.body.email,
    });

    res.status(200).json(createdUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
      },
      {
        returnOriginal: false,
      }
    );

    if (!updatedUser) {
      res.status(404).json('404: Not Found');
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id, {
      retunOriginal: false,
    });
    const deletedThoughts = await Thought.deleteMany({
      username: deletedUser.username,
    });

    if (deletedUser && deletedThoughts) {
      res.status(200).json({ deletdUser, deletedThoughts });
    } else {
      res.status(404).json('404: Not Found!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const friend = await User.findById(req.params.friendId);

    if (!friend) {
      return res.status(404).json('404: Not Found');
    }

    const addedFriend = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $push: { friends: friend },
      },
      {
        returnOriginal: false,
      }
    );

      if (!addedFriend) {
        res.status(404).json('404: Not Found');
      }

      res.status(200).json(addedFriend);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const friend = await User.findById(req.params.friendId);

    if (!friend) {
      return res.status(404).json('404: Not Found');
    }

    const deletedFriend = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $pull: { friends: friend },
      },
      {
        returnOriginal: false,
      }
    );

    if (!deletedFriend) {
      res.status(404).json('404: Not Found');
    }

    res.status(200).json(deletedFriend);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;