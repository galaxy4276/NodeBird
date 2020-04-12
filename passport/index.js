import local from './localStrategy';
import kakao from './kakaoStrategy';
import { User } from '../models';

const passportSettings = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then( user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);
  kakao(passport);
};


export default passportSettings;
