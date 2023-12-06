const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {
    type: Types.ObjectId,
    default: new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    get: (date) => new Date(date).toLocaleDateString('en-US'),
  },
}, 
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
  versionKey: false,
}
);

const thoughtSchema = new Schema(
  {
  thoughtText: {
    type: String,
    minLength: 1,
    maxLength: 230,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  reactions: [reactionSchema],
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
  versionKey: false,
}
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
