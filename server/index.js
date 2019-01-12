require("dotenv").config();
const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const mailer = require("./mailer");
const axios = require('axios')
const PORT = process.env.PORT || 5000;

var jsonify=function(o){
	var seen=[];
	var jso=JSON.stringify(o, function(_k,v){
		if (typeof v =='object') {
			if ( seen.indexOf(v) != -1 ) { return '__cycle__'; }
			seen.push(v);
		} return v;
	});
	return JSON.parse(jso);
};

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  app.use(express.json()); // Parse json in request. Available in express 4.16+

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

  // Answer API requests.
  app.post("/api/send_email", function (req, res) {
    res.set("Content-Type", "application/json");

    const { userName, email } = req.body;
    const locals = { userName };
    const messageInfo = {
      email,
      fromEmail: "info@ingsw.com",
      fromName: "Star Wars",
      subject: "Checkout this awesome droids"
    };
    mailer.sendOne("droids", messageInfo, locals);
    res.send('{"message":"Email sent."}');
  });

  app.post('/api/get_exchange', (req, res) => {
    res.set("Content-Type", "application/json");
    axios({
      method: 'get',
      url: `http://data.fixer.io/api/latest?access_key=ae16ba31b24815b48e29425238a19fb2&`,
      responseType: 'json'
    })
      .then(resp => {
        console.log('/api/get_exchange call')
        res.send({rates:jsonify(resp)});
      })
      .catch(e=>console.log(e))
  })

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
