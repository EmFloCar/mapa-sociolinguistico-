const express = require('express')
const helmet = require("helmet");
const serveStatic = require('serve-static')
const path = require('path')
const app = express()
app.use(helmet());
app.use('/', serveStatic(path.join(__dirname, '/dist')))
const port = process.env.PORT || 8080
app.listen(port)