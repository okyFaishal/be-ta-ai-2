const jwt = require( 'jsonwebtoken' )
const env = process.env
// console.log(env.secret)
function generateToken( payload ) {
	return jwt.sign( payload, env.secret )
}

function verifyToken( token ) {
	return jwt.verify( token, env.secret )
}

module.exports = {
	generateToken,
	verifyToken
}