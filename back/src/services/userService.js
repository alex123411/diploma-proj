const User = require('../models/userModel');
const UserRequest = require('../models/requestModel');
// const { badRequestError } = require('../errors')

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

const getUserReqs = async (userId) => {
  try {
    const lastReqs = await UserRequest.findAll({ where: { userId: userId } })
    return lastReqs;

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
  updateUser,
  getUserReqs
};