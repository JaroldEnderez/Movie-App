const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const movieRoutes = require('./routes/movieRoutes')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())


app.use('/api/movies', movieRoutes)

// 404 Not Found Middleware
app.use((req,res,next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        error: `Cannot ${req.method} ${req.url}`
    })
})

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    
    // Handle specific types of errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            error: err.message
        })
    }

    // Default error response
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
    })
})

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
