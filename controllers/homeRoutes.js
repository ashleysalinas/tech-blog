const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (rec,res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })
        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('dashboard', { posts })
    } catch (err) {
        res.status(500).json(err)
    }  
}
)

router.get('/post/:id', async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })
        const post = postData.get({ plain: true })
        res.render('post', {
            ...post
        })
    } catch (err) {
        res.status.json(err)
    }
})

router.get('/login', (req, res) => {
    res.render('login');
})
router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;