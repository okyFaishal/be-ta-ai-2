// export default function (data, type) {
//   if(type){
//     return new Intl.NumberFormat('id', {style: 'currency', currency: type}).format(data)
//   }else{
//     return new Intl.NumberFormat('id', { style: 'decimal' }).format(data)
//   }
// }

function numberFormat (data, type) {
  if(type){
    return new Intl.NumberFormat('id', {style: 'currency', currency: type}).format(data)
  }else{
    return new Intl.NumberFormat('id', { style: 'decimal' }).format(data)
  }
}

module.exports = numberFormat