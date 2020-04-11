// import routes from '../routes';

export const userProfile = (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird', user:null });
};

export const join = (req, res) => {
  res.render('join', {
    title: '회원 가입 - NodeBird',
    twits: [],
    user: null,
    joinError: req.flash('joinError'),
  });
};

export const root = (req, res) => {
  res.render('main', {
    title: 'NodeBird',
    twits: [],
    user: null,
    loginError: req.flash('loginError'),
  });
};