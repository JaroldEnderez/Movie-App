require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  tmdbApiKey: process.env.TMDB_API_KEY,
  tmdbBaseUrl: 'https://api.themoviedb.org/3'
}; 