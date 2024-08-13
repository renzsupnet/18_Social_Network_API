const connection = require('../config/connection');
const { User, Thought} = require('../models');

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connection.once('open', async () => {
  console.log('connected');
  const users = [
    {
      username: 'johndoe',
      email: 'johndoe@example.com',
    },
    {
      username: 'janesmith',
      email: 'janesmith@example.com',
    },
    {
      username: 'bobwilson',
      email: 'bobwilson@example.com',
    }
  ];
  
  const thoughts = [
    {
      thoughtText: 'This is my first thought!',
      username: 'johndoe',
      reactions: [
        {
          reactionBody: 'Great thought!',
          username: 'janesmith'
        },
        {
          reactionBody: 'I agree!',
          username: 'bobwilson'
        }
      ]
    },
    {
      thoughtText: 'Coding is fun!',
      username: 'janesmith',
      reactions: [
        {
          reactionBody: 'Interesting perspective.',
          username: 'johndoe'
        }
      ]
    },
    {
      thoughtText: 'I love the weekend!',
      username: 'bobwilson',
      reactions: []
    }
  ];
  
  const seedDatabase = async () => {
    try {
      // Delete existing data
      await User.deleteMany({});
      await Thought.deleteMany({});
  
      // Create users
      const createdUsers = await User.create(users);
  
      // Create thoughts and associate them with users
      const createdThoughts = await Thought.create(thoughts);
  
      // Add thoughts to users
      for (const thought of createdThoughts) {
        const user = await User.findOne({ username: thought.username });
        user.thoughts.push(thought._id);
        await user.save();
      }
  
      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    } 
  };
  
  await seedDatabase();
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
