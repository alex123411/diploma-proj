const User = require('../models/userModel');
const { badRequestError } = require('../errors')

const getUser = async (userId) => {
  try {
    const userInfo = await User.findByPk(userId);
    const user = {
      ...userInfo.dataValues
    };

    return user;

  } catch (err) {
    return null;
  }
}

const updateUser = async (user) => {
  try {
    await User.update(user,
      {
        where: {
          id: user.id
        }
      });

    return getUser(user.id);

  } catch (err) {
    return null;
  }
}

module.exports = {
  getUser,
  updateUser
};