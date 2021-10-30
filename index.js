
import http from 'http';
 
import dec  from "crypto";

import Busboy  from 'busboy';




http.createServer(function(req, res) {

  if (req.method === 'POST')
  {
    let o = {};
    const busboy = new Busboy({ headers: req.headers });
    busboy
      .on("file", (fieldname, file) =>
        file
          .on("data", (data) => (o[fieldname] = data))
          .on("end", () => console.log(`${fieldname}`))
      )
      .on("finish", () => {
        let result;
        try {
          result = dec(o.key, o.secret);
        } catch {
          result = "ERROR";
        }
        res.send(String(result));
      });
    req.pipe(busboy);
 }
 else if (req.method === 'GET') {
  res.writeHead(200, { Connection: 'close' });
  res.end('<html><head></head><body>\
             <form method="POST" enctype="multipart/form-data">\
              <input type="text" name="key"><br />\
              <input type="file" name="secret"><br />\
              <input type="submit">\
            </form>\
          </body></html>');
}
})
  .listen(4321, () => console.log("app work on port 4321"));

