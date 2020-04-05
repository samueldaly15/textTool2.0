const express = require('express')
const mysql = require('mysql')
// const Nexmo = require('nexmo')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const port = 5000

app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})
const displayQuery = 'SELECT * FROM textTest'

app.use(cors())

const db = mysql.createConnection({
    host:'192.168.64.2',
    user:'world',
    password:'password',
    database:'textData'
})

db.connect((err) => {
    if(err){
        throw(err)
    }
    console.log('Connection Successful')
})

app.get('/data/add', (req, res) => {
    const { lastName, partySize, phoneNumber} = req.query
    const insert_data_query = `INSERT INTO textTest (lastName, partySize, phoneNumber) VALUES('${lastName}',${partySize},${phoneNumber})`
    db.query(insert_data_query,(err, results) =>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send('succesfully added data')
        }
    })
})

app.get('/data', (req, res) => {
    db.query(displayQuery, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                results
            })
        }
    })
})

// const nexmo = new Nexmo({
//     apiKey: '892cda9e ',
//     apiSecret: '2BmrcToj82Mx9mUx '
// }, {debug:true});
//
// app.post('/', (req, res) => {
//     console.log(req.body)
//     res.send(req.body);
//
//     const number = req.body.number;
//     const text = req.body.text;
//
//     nexmo.message.sendSms(
//         '13024867688', number, text, {type: 'unicode'},
//         (err, responseData) => {
//             if(err) {
//                 console.log(err)
//             } else{
//                 console.dir(responseData)
//                 //get data from responseData
//                 const data = {
//                     id: responseData.messages[0]['message-id'],
//                     number: responseData.messages[0]['to']
//                 }
//                 io.emit('smsStatus', data)
//             }
//         }
//     )
// });
