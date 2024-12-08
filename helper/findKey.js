function findKey (array, value, key, keyReturn) {
  // findKey([list], '123', 'id_user', 'nama_user')
  // array = [] list / sumber
  // value   = "" value
  // v     = "" key dari list
  let key1 = key || 'value' 
  for (let i = 0; i < array.length; i++) { // pengulangan array
    const x = array[i];
    if(x[key1] == value){ // jika value yang diberikan sama dengan value dari pengulangan array
      if(keyReturn){ // jika terdapat key untuk mereturn
        return x[keyReturn] // mengembalikan value dari key return
      }else{
        return x //mengembalikan value dari for (original)
      }
    }
  }
  return null
}

module.exports = findKey

// const jwt = require( 'jsonwebtoken' )
// const env = process.env
// // console.log(env.secret)
// function generateToken( payload ) {
// 	return jwt.sign( payload, env.secret )
// }

// function verifyToken( token ) {
// 	return jwt.verify( token, env.secret )
// }

// module.exports = {
// 	generateToken,
// 	verifyToken
// }