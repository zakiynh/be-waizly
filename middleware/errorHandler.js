function errorHandler(error, req, res, next) {
    switch (error.name) {
        case "SequelizeValidationError":
            const errors = error.errors.map(err => err.message)
            res.status(400).json({ errors })
            break;
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ errors: [error.message] })
            break;
        case "JsonWebTokenError":
            res.status(401).json({ errors: error.message })
            break;
        case "Not Found":
            res.status(404).json({ errors: error.message })
            break;
        case "Bad Request":
            res.status(400).json({ errors: error.message })
            break;
        case "Unauthorized":
            res.status(401).json({ errors: error.message })
            break;
        case "Forbidden":
            res.status(403).json({ errors: error.message })
            break;
        default:
            res.status(500).json({ errors: error.message })
            break;
    }
}

module.exports = errorHandler