const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth= require('../../utils/auth')


  
router.post('/login', async (req,res) => {
    try {
        const userData = await User.findOne(
            {
              where: {
                  email: req.body.email
              }  
            }
        )
            const validPassword = await userData.checkPassword(req.body.password)
        if (!userData) {
            res.status(400).json({ message: "Wrong email"});
            return;
        } 

        if (!validPassword) {
            res.status(400).json({ message: "Wrong email"});
            return;
        }

        req.session.save(() => 
        {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.json({ user: userData, message: 'You are now logged in!' });
        })
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/post', withAuth, async (req,res) => {
    console.log(req)
    try {
        const newPost = await Post.create({
            post_title: req.body.postTitle,
            post_text: req.body.postText,
            user_id: req.session.user_id,
        })
        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err);
    } 
})

module.exports = router;