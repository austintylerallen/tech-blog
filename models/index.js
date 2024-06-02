const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

// Function to initialize models
const initModels = (sequelize) => {
  User.init({}, { sequelize });
  Post.init({}, { sequelize });
  Comment.init({}, { sequelize });

  // Re-define associations after initializing
  User.hasMany(Post, { foreignKey: 'user_id' });
  Post.belongsTo(User, { foreignKey: 'user_id' });
  Comment.belongsTo(User, { foreignKey: 'user_id' });
  Comment.belongsTo(Post, { foreignKey: 'post_id' });
  User.hasMany(Comment, { foreignKey: 'user_id' });
  Post.hasMany(Comment, { foreignKey: 'post_id' });
};

module.exports = { User, Post, Comment, initModels };
