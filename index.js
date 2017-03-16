var express = require('express')
var app = express();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');

app.use(express.static('uploads'))
app.set('views', './views')
app.set('view engine', 'pug')

var invoices = [

];

app.get('/', function (req, res) {
    res.render('index', { invoices: invoices })
})

app.post('/api/invoice', upload.single('file'), function (req, res, next) {
    console.log('Received a file', req.file, req.body);
    fs.rename(req.file.path, req.file.path + '.jpg', (err) => {
        invoices.push({
            file: req.file.filename + '.jpg',
            number: req.body.number,
            date: req.body.date,
        })
        res.send("OK!");
    });
})

var port = process.env.PORT || 5500;
app.listen(, function () {
    console.log('Example app listening on port ' + port + '!')
})