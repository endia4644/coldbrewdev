const fs = require('fs');
const db = require('../models');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('로그인이 필요합니다.');
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('로그인한 사람은 할 수 없습니다.');
}

exports.isProfileImgExist = async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        id: req.user.id
      }
    })
    if (exUser.profileImg) {
      if (fs.existsSync("uploads/" + exUser.profileImg)) {
        // 파일이 존재한다면 true 그렇지 않은 경우 false 반환
        fs.unlinkSync("uploads/" + exUser.profileImg);
      }
    }
  } catch (err) {
    console.error(err);
  }
  next()
}