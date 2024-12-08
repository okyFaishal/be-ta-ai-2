async function Primevue(req, res, next){
  // console.log(req.body)
  //order
  if (req.body.sort && req.body.sort.length) {
    let el = ''
    for (let i = 0; i < req.body.sort.length; i++) {
      const item = req.body.sort[i];
      el += `${el ? ', ':  ''} ${item.field} ${item.order == 1 ? 'asc' : 'desc'}`
    }
    req.body.sort = el
  }else{
    req.body.sort = null
  }
  //like
  let el = ''
  for (const key in req.body.search) {
    if (req.body.search[key].value && Object.hasOwnProperty.call(req.body.search, key)) {
      const item = req.body.search[key];
      el += `${el ? ' and ':  ''} ${key} ilike '%${item.value}%'`
    }
  }
  req.body.search = el
  next()
}
module.exports = Primevue