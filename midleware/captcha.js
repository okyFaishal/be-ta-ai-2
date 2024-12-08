// const request = require('request');
const axios = require('axios');
const qs = require('qs');

async function captcha(req,res,next){    
  if(req.body.captcha){
    const verifyResponse = await axios.post('https://hcaptcha.com/siteverify', 
      qs.stringify({
        secret: process.env.SECRET_CAPCHA,
        response: req.body.captcha,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    if (!verifyResponse.data.success) {
      next([500, 'Verifikasi captcha gagal'])
    }else{
      next()
    }
  } else {
    next([500, 'Captcha tidak terkirim'])
  }
}

// async function captcha(req,res,next){    
//   if(req.body.captcha){
//     const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.secret_captcha}&response=${req.body.captcha}`;
//     // console.log('verifyUrl', verifyUrl)
//     request(verifyUrl, (err, response, body)=>{
//       if (!err) {
//         // console.log(body);  
//         body = JSON.parse(body);
  
//         if (!body.success || body.success === undefined) {
//           next([500, 'captcha verification failed'])
//           // return  res.status(500).json({ status: 500, message: "captcha verification failed" });
//         } else if (body.score < 0.5){
//           next([500, 'you might be a bot, sorry!'])
//           // return  res.status(500).json({ status: 500, message: "you might be a bot, sorry!", data: body.score });
//         }
//         next()
//         // next(true)
//       } else {
//         console.log('err captcha')
//         console.log(err)
//         next([500, 'Captcha Error'])
//         // return  res.status(500).json({ status: 500, message: "Captcha Error" });
//       }
//     })
//   } else {
//     console.log("err");
//     next([500, 'Captcha tidak terkirim'])
//     // return  res.status(500).json({ status: 500, message: "Captcha tidak terkirim" });
//   }
// }

module.exports = captcha