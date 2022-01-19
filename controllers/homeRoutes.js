const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (rec,res) => {
    try {
        const postData = await Post.findAll()
        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('dashboard', { posts })
    } catch (err) {
        res.status(500).json(err)
    }  
}
)

module.exports = router;