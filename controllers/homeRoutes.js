const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (rec,res) => {
    try {

        res.render('dashboard', {})
    } catch (err) {
        res.status(500).json(err)
    }  
}
)

module.exports = router;