const express = require("express")
const {getPopularMovies} = require('../controllers/movieController')
const router = express.Router() 

router.route('/').get(getPopularMovies)

module.exports = router;