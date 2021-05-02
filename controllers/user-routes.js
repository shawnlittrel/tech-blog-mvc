const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

//Render landing page
router.get('/', (req, res) => {
     Post.findAll({
          attributes: [
               'id',
               'title',
               'content',
               'created_at'
          ],
          include: [
               {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                         model: User,
                         attributes: ['username'],
                    },
               },
               {
                    model: User,
                    attributes: ['username'],
               },
          ],
     })
     .then((dbPostData) => {
          const posts = dbPostData.map((post) => post.get({ plain: true }));

          res.render('homepage', {
               posts,
               loggedIn: req.session.loggedIn,
          });
     })
     .catch(err => {
          console.log(err);
          res.status(500).json(err);
     });
});

//Render login page
router.get('/login', (req, res) => {
     res.render('login');
});

//Render signup page
router.get('/register', (req, res) => {
     res.render('signup');
});

//Render Dashboard
router.get('/dashboard', (req, res) => {
     User.findOne({
          attributes: { exclude: ['password'] },
          where: {
               username: req.session.username
          },

          include: [
               {
                    model: Post,
                    attributes: ['id', 'title', 'content']
               },
               {
                    model: Comment,
                    attributes: ['id', 'comment_text'],
                    include: {
                         model: Post,
                         attributes: ['title']
                    }
               },
          ]
     })
     .then(userPostData => {
          const userData = userPostData.get({ plain: true });
          const post = userData.posts;
          console.log(post);
          const username = req.session.username;
          const loggedIn = req.session.loggedIn;
         res.render('dashboard', {username, loggedIn, post}); 
     })
     
});

//Create new blog post
router.get('/add-blog', (req, res) => {
     res.render('add-blog');
})

module.exports = router;