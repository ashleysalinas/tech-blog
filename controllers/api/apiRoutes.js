const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth= require('../../utils/auth');


  
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
router.post('/signup', async (req,res) => {
    try {
        const newUser = await User.create(
            req.body
        );
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.json({ user: newUser, message: 'You are now logged in!' });
            res.status(200).json(newUser);
          });
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/comment', withAuth, async (req,res) => {
    try {
        const newComment = await Comment.create({
            post_id: req.body.postId,
            comment_text: req.body.commentText,
            user_id: req.session.user_id
        })
        console.log(newComment)  
        res.status(200).json(newComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/post/:id', withAuth, async (req,res) => {
    try {
        console.log(req)
        const updatedPost = await Post.update({
            post_title: req.body.editTitle,
            post_text: req.body.editText
        },
        {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/post/:id', withAuth, async (req,res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.body.id
            }
        })
        res.status(200).json(deletePost)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;