// index.js
// where your node app starts

// init project
var express = require("express")
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors")
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html")
})

// your first API endpoint...
app.get("/api", function (req, res) {
  res.json({
    unix: Date.now(),
    utc: new Date().toUTCString(),
  })
})

app.get("/api/:date", function (req, res) {
  const differentDateTypes = {}

  /* if (!isNaN(new Date(req.params.date))) {
    if (isNaN(Number(req.params.date))) {
      differentDateTypes["unix"] = Date.parse(req.params.date)
      differentDateTypes["utc"] = new Date(req.params.date).toUTCString()
    } else {
      differentDateTypes["unix"] = Number(req.params.date)
      differentDateTypes["utc"] = new Date(
        Number(req.params.date)
      ).toUTCString()
    }
  } else {
    differentDateTypes["error"] = "Invalid Date"
  } */

  if (!isNaN(req.params.date)) {
    differentDateTypes["unix"] = Number(req.params.date)
    differentDateTypes["utc"] = new Date(Number(req.params.date)).toUTCString()
  } else if (!isNaN(new Date(req.params.date))) {
    differentDateTypes["unix"] = Date.parse(req.params.date)
    differentDateTypes["utc"] = new Date(req.params.date).toUTCString()
  } else {
    differentDateTypes["error"] = "Invalid Date"
  }

  res.json(differentDateTypes)
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port)
})
