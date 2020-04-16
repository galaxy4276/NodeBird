import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { Post, Hashtag, User } from '../models';
import { isLoggedIn } from '../controllers/middlewares';
import path from 'path';

const postRouter = express.Router();


fs.readdir('uploads', err => {
  if (err) {
    console.log('uploads 폴더가 없어 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

const upload = multer({
  dest: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname); // originalname 사용자가 업로드한 파일 명
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

postRouter.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `img/${req.file.filename}`});
});

const upload2 = multer();

postRouter.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: req.user.id,
    });
    console.log(post);
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
        where: { title: tag.slice(1).toLowerCase() },
      })));
      await post.addHashtags(result.map(r => r[0]));
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});


postRouter.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query }});
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }]});
    }
    return res.render('main', {
      title: `${query} | Nodebird`,
      user: req.user,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


export default postRouter;