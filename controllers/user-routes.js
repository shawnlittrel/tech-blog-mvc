const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

//Render landing page
router.get('/', (req, res) => {
     console.log(req.session);

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
     res.render('dashboard');
})

module.exports = router;