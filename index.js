// Modules
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import dotenv from 'dotenv';
import 'mysql2';
import { sequelize } from './models';
import './models';
import 'sequelize';
import passport from 'passport';
import passportConfig from './passport';
dotenv.config();


// Routers
import pageRouter from './routes/pageRouter';
import authRouter from './routes/authRouter';
import postRouter from './routes/postRouter';
import userRouter from './routes/userRouter';
import { localMiddleware } from './controllers/middlewares';

const app = express();
sequelize.sync();
passportConfig(passport);

// set a settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001);


// using middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,  
  },
}));
app.use(flash());
app.use(passport.initialize()); // req 객체에 passport 설정을 심음.
app.use(passport.session()); // req.session 객체에 passport 정보를 저장.


app.use('/', pageRouter);
app.use('/', authRouter);
app.use(localMiddleware);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err); // if next in params, called error
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error'); 
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} 번 포트에서 대기 중`);
});


