const router = require('express').Router();
const { Thought, User } = require('../../models');

router.get('/', async (req, res) => {
  const thoughts = await Thought.find();

  res.status(200).json(thoughts);
});

router.get('/:id', async (req, res) => {
  try {
    const selectedThought = await Thought.findById(req.params.id);

    if (!selectedThought) {
      res.status(404).json('404: Not Found!');
    }

    res.status(200).json(selectedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const selectedUser = await User.findById(req.body.userId);

    if (!selectedUser) {
      return res.status(404).json('404: Not Found');
    }

    const createdThought = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });
    const usernameThoughts = await User.findByIdAndUpdate(
      req.body.userId,
      {
        $push: { thoughts: createdThought },
      },
      {
        returnOriginal: false,
      }
    );

    res.status(200).json(createdThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedThought = Thought.findByIdAndUpdate(
      req.params.id,
      { thoughtText: req.body.thoughtText },
      { returnOriginal: false }
    );

    if (!updatedThought) {
      res.status(404).json('404: Not Found');
    }

    res.status(200).json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:thoughtId', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(
      req.params.thoughtId,
      { returnDocument: false }
    );

    const userThoughtArray = await User.findOneAndUpdate(
      {
        username: deletedThought.username,
      },
      {
        $pull: {
          thoughts: req.params.thoughtId,
        },
      },
      {
        returnOriginal: false,
      }
    );
    if (deletedThought && userThoughtArray) {
      res.status(200).json(deletedThought);
    } else {
      res.status(404).jason('404: Not Found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const addedReaction = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $push: {
          reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
          },
        },
      },
      { returnDocument: false }
    );

    if (!addedReaction) {
      return res.status(404).json('404: Not Found');
    }
    res.status(200).json(addedReaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:thoughtId/reactions', async (req, res) => {
  try {
    const deletedReaction = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $pull: {
          reactions: {
            reactionId: req.body.reactionId,
          },
        },
      },
      { returnDocument: false }
    );

    if (!deletedReaction) {
      return res.status(404).json('404: Not Found');
    }
    res.status(200).json(deletedReaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;