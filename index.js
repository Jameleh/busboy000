
import express from 'express';
//he crypto module provides cryptographic functionality that includes
// a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.
import  crypto from "crypto";
// busBoy A node.js module for parsing incoming HTML form data.
import  busboy  from "busboy";

const appExp  = express();
var PORT =process.env.PORT || 4321;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT,OPTIONS,PATCH",
  "Access-Control-Allow-Headers":
    "x-test,Content-Type,Accept,Access-Control-Allow-Headers",
  "Access-Control-Expose-Headers":
    "X-Resp,Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Expose-Headers",
  "Access-Control-Allow-Headers":
    "X-Resp,Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Expose-Headers",
};
appExp.get('/', async(req,res)=>res.end('hello world'));
appExp
  .post('/', async (req, res) => {
    console.log(req);
    let o = {};
    const BB= new busboy({ headers: req.headers });
 /*busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
  console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)
  File [filefield]: filename: ryan-speaker.jpg, encoding: binary;*/
    BB
      .on('file', (fieldname, file) =>
       // process files

    
       { console.log(`File ${fieldname} started to process`);
        file
        .on('data', (data) => o[fieldname] = data)
        .on('end', () => console.log(` File ${fieldname} finnished `))
       }
        
      );
     BB.on("finish", () => {
        console.log("connection close");
        // send response
        let result;
        try {
          //crypto.privateDecrypt( privateKey, buffer )
          result = crypto.privateDecrypt( o['key'], o['secret']);
        } catch (e){
          result = `Error ${e}`;
          console.log(result)
        }
        debugger;
        res.set(CORS).send(String(result));
      });
    req.pipe(BB);
  })
  .listen(PORT, () => console.log(`listening 0n  ${PORT}`))