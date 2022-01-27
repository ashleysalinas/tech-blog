const router = require('express').Router();
const e = require('express');
const req = require('express/lib/request');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        })
        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('dashboard', { posts,
                logged_in: req.session.logged_in
            })
        
    } catch (err) {
        res.status(500).json(err)
    }  
});

router.get('/post/:id', async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    include: [User],
                    attributes: ['comment_text', 'user_id'],
                },
            ]
        })
        const post = postData.get({ plain: true })
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status.json(err)
    }
})
router.get('/post', withAuth, async (req, res) => {
    try {
        res.render('newPost', {
            logged_in:true
        });
    } catch (err) {
        res.status(500).json(err);
    }
})
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            }}
        )
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        })
        const commentData = await Comment.findAll({
            where: {
                user_id: req.session.user_id
            }
        })
        const posts = postData.map((post) => post.get({ plain: true }))
        const comments = commentData.map((comment) => comment.get({plain: true}))
        const user = userData.get({ plain: true})
        res.render('profile', {
            ...user,
            posts,
            comments,
            logged_in:true
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
        res.redirect('/')
    }
})

module.exports = router;