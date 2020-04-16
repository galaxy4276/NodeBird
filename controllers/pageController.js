import { Post, User } from "../models";

export const userProfile = (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird', user:null });
};


export const join = (req, res) => {
  res.render('join', {
    title: '회원 가입 - NodeBird',
    twits: [],
    user: req.user,
    joinError: req.flash('joinError'),
  });
};


export const root = (req, res, next) => {
  Post.findAll({
    include: {
      model: User,
      attributes: ['id', 'nick'],
    },
    order: [['createdAt', 'DESC']],
  })
    .then(posts => {
      res.render('main', {
        title: 'NodeBird',
        twits: posts,
        user: req.user,
        loginError: req.flash('loginError'),
      });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
  }