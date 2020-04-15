import KakaoStrategy from 'passport-kakao';
import { User } from '../models';
import routes from '../routes';
import { kakaoCallback } from '../controllers/authController';

const kakaoStgy = passport => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_KEY,
    callbackURL: routes.kakaoCallback,
  }, kakaoCallback))
};

export default kakaoStgy;