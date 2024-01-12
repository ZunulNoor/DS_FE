const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 2500;
const cors = require('cors');
const path = require('path')

const clientPath = path.join(__dirname, './client/build')
app.use('/', express.static(clientPath))

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["POST", "DELETE", "PUT", "GET"]
}));

app.use('/api', require('./API/USER/router'));
app.use('/api', require('./API/ProjectFile/router'))
app.use('/api', require('./API/ProjectGroup/router'))
app.use('/api', require('./API/GroupHead/router'))
app.use('/api', require('./API/SubHead/router'))
app.use('/api', require('./API/ChartOFAcc/router'))
app.use('/api', require('./API/Voucher/router'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})