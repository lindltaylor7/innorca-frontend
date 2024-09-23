const middleware = {}

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['no-auth'] = require('..\\middleware\\no-auth.js')
middleware['no-auth'] = middleware['no-auth'].default || middleware['no-auth']

export default middleware
