const morgan = require('morgan')
morgan.token('body', function (req) { return JSON.stringify(req.body) })

const morg = morgan(':method :url :response-time :body')

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }else {
    request.token = null
  }
  next()
}

module.exports = {
  morg,
  error,
  tokenExtractor
}