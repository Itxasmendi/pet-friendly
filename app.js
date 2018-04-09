const express = require('express')
const bodyParser = require('body-parser')
const recastai = require('recastai').default

const client = new recastai('e44ffe35ecbb7a5e7c59e9e1661ef8ed')
var build = client.build
//crea instancia https con las claves de letsencrypt 
const https = require('https');
const fs = require('fs');
const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/bots.via-directa.com/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/bots.via-directa.com/privkey.pem')
};

const app = express() 
// define puertos
const port = 5000
const securePort = 5443
 
app.use(bodyParser.json()) 
app.get('/', (req,res) =>{
  console.log("ok mackey")
 res.send("ok McKey")
});

app.post('/', (req, res) => {
  console.log(req.body)

  res.send({
    replies: [
	{
      type: 'text',
      content: 'Olala!',
    },
{
  type: 'picture',
  content: 'https://a4.odistatic.net/images/landingpages/vacation/640x480/paris_640x480.jpg',
}
], 
    conversation: {
      memory: { location: 'value' }
    }
  })
})


app.listen(port, () => { 
  console.log('Server is running on port 5000') 
})
// crea puerto ssl para poder conectar con recast.ai
https.createServer(options, app).listen(securePort);