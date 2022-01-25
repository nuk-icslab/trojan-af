const http2 = require("http2");

class Http2Req {
  constructor(uri) {
    this.uri = uri;
  }

  request(path, method = "GET") {
    return new Promise((resolve, reject) => {
      const session = http2.connect(this.uri);

      session.on("error", (err) => {
        reject(err);
        session.destroy();
      });

      session.on("connect", () => {
        const req = session.request({
          ":path": path,
          ":method": method,
        });
        req.setEncoding("utf8");
        let data = "";

        req.on("response", (headers) => {
          // for (const name in headers) {
          //   console.log(`${name}: ${headers[name]}`);
          // }
        });

        req.on("data", (chunk) => {
          data += chunk;
        });

        req.on("error", (err) => {
          reject(err);
          session.destroy();
        });

        req.on("end", () => {
          resolve(data);
          session.close();
        });

        req.end();
      });
    });
  }
}

module.exports = Http2Req;
