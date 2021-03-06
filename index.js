var express = require('express')
var multer = require('multer')
var fs = require('fs')
var upload = multer({dest: 'uploads/'})
var app = express()

var html5base = '<html>\n  <head>\n    <title></title>\n  </head>\n  <body>'
var html5close = '  </body>\n</html>'

app.use(express.static('uploads'))

app.get('/', function (req, res) {
  //  TODO: List files
  var files = fs.readdirSync('uploads/')
  var fileList = files.map(function (file) {
    return '<li><a href="/' + file + '" target="_blank">' + file + '</a></li>';
  })
  res.send(html5base + '<ul>' + fileList.join('') + '</ul>' + html5close)
})

app.post('/upload', upload.single('file'), function (req, res) {
  //  TODO: Store file
  fs.renameSync('uploads/' + req.file.filename, 'uploads/' + req.body.fileName);
  res.status(200).send('')
})

app.listen(3000)
