const connection = require('../config/connection');
const { User } = require('../models');

const usernames = [
  'johndoe',
  'janedoe',
  'marysmith',
  'peterjones',
  'susanwilliams',
  'davidbrown',
  'elizabethgreen',
  'michaelblue',
  'tammywhite',
  'robertblack',
  'amypink',
  'jamespurple',
  'stephanieorange',
  'benjaminyellow',
  'catherinegreen',
  'davidblue',
  'elizabethpurple',
  'michaelorange',
  'tammypink',
];

emails = [
  'johndoe@gmail.com',
  'janedoe@yahoo.com',
  'marysmith@hotmail.com',
  'peterjones@aol.com',
  'susanwilliams@icloud.com',
  'davidbrown@outlook.com',
  'elizabethgreen@me.com',
  'michaelblue@live.com',
  'tammywhite@msn.com',
  'robertblack@comcast.net',
  'amypink@verizon.net',
  'jamespurple@att.net',
  'stephanieorange@charter.net',
  'benjaminyellow@cox.net',
  'catherinegreen@centurylink.net',
  'davidblue@earthlink.net',
  'elizabethpurple@bellsouth.net',
  'michaelorange@yahoo.com',
  'tammypink@gmail.com',
];

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await User.deleteMany({});

  const users = [];

  for (i = 0; i < 19; i++) {
    const username = usernames[i];
    const email = emails[i];

    users.push({
      username,
      email,
      thoughts: [],
      friends: [],
    });
  }

  await User.collection.insertMany(users);

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
