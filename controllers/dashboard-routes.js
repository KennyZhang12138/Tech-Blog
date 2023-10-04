const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
   

    const postData = await Post.findAll({
      where:{userId: req.session.userId},
      include: [User]
    });
    
    const posts = postData.map((post) => post.get({ plain: true }));
    
    res.render("dashboard", {
      layout: "dashboard",

      posts,
      user: req.session.username,
    });
  } catch (err) {
    res.redirect('login');
  }
});


router.get("/newPost", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      
      const post = postData.get({ plain: true });
      console.log(post);
      
      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
