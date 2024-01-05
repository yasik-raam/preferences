const jwt = require('jsonwebtoken')
const config = require('./config')
const axios = require('axios');
const querystring = require('querystring');

module.exports = (req,res,next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] 
  // decode token
  var requestToken = req.headers['x-access-token'] ;
  console.log('restoken',requestToken);
  // var config = {
  //   headers: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //   }
  
  // }
  let data = {
    "client_id": config.client_id,  
    "client_secret": config.client_secret, 
    "access_token": requestToken  
  }
  //let url = config.openIdUrl.url.replace('https','http'); 
  axios.post(config.openIdUrl.url, querystring.stringify(data), config.headers_oidc).then(response => {
    console.log('data', JSON.stringify(response.data));
    if(response && response.data && response.data.active==true){
      console.log('data: ', response.data)
      next();
    }else{
      res.status(200).json({"error": true, "message": 'Unauthorized access.' });
    }
})
.catch(e => {
    console.log('Error: ', e.response.data)
})
}
