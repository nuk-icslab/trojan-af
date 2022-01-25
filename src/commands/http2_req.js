const http2 = require("http2");

class Http2Req {
  constructor(uri) {
    this.uri = uri;
  }

  async request(path, method = "GET") {
    return new Promise((resolve, reject) => {
      let session = {};
      try {
        session = http2.connect(this.uri);
      } catch (err) {
        reject(err);
        return;
      }
      session.on("error", (err) => {
        reject(err);
        session.destroy();
      });

      const req = session.request({
        ":path": path,
        ":method": method,
      });

      req.on("response", (headers) => {
        for (const name in headers) {
          console.log(`${name}: ${headers[name]}`);
        }
      });

      req.setEncoding("utf8");
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("error", (err) => {
        reject(err);
        session.destroy();
      });

      req.on("end", () => {
        try {
          session.destroy();
          data = JSON.parse(data);
          resolve(data);
        } catch (err) {}
      });

      req.end();
    });
  }
}

module.exports = Http2Req;
