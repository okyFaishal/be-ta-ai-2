require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan'); 
const bodyParser = require('body-parser');
const path = require('path')
const app = express()
const routing = require('./routing/index')

// cord / menjalankan program sesuai jadwal
const cronJobs = require('./helper/cron');
// cronJobs.hourlyTask.start();

// const { hourlyTask } = require('./helper/cron');
// hourlyTask.start();
const moment = require('moment');
const idLocale = require('moment/locale/id');
moment.updateLocale('id', idLocale);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: '10mb' }));
app.use(morgan('dev'))
// app.use(express.static('asset'))
app.use(cors())
app.use('/image', express.static(path.join(__dirname, 'public/image'))) //image static
app.use('/dokumen', express.static(path.join(__dirname, 'public/dokumen'))) //image static

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routing)

app.use((result, req, res, next)=>{
  let data = {}
  // console.log('file', req.files)
  // console.log('jalan', res)
  // console.log('result', result)
  if(result === true){ //next(true)
    data.status = 200
    data.message = 'success'
  }else if(result === false){ //next(false)
    data.status = 400
    data.message = 'error'
  }else if(typeof result === 'object'){ //next([status, message, data])
    data.status = result[0]
    data.message = result[1]
    if(result[2]) data = {...result[2], ...data}
    if(result[2] && result[2].original && result[2].original.sqlMessage && /^Duplicate entry/.test(result[2].original.sqlMessage)){
      data.message = 'Data sudah ada'
    }
  }
  res.status(200).json(data)
})

app.use((req, res) => {
  res.status(404).json({
      message: 'URL Not found',
      status: 404,
  });
})

app.listen(process.env.PORT, () => {
	console.log(`telah tersambung pada port : ${process.env.PORT}`)
});