var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const jsonfile = require('jsonfile')
var oxford = require('project-oxford'),
    client = new oxford.Client('38b88077298b4dc59d87682f324e1adc');
var NodeWebcam = require("node-webcam");
var finish = require("finish");
var Linq = require('linq');
var prompt = require('prompt');
var fs = require('fs');
var request = require('request');

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/forecast', function (req, res) {

    const secret_key = 'dcb4eb4795a963c13544021a5799fe28';
    const base = 'https://api.darksky.net/forecast';
    const lat = req.query.lat;
    const lon = req.query.lon;

    return request(base + '/' + secret_key + '/' + lat + ',' + lon, function(error, response, body) {
        return response;
    });
});



var directory = "./public/Data/";
var clientDirectory = "./Data";
var file = directory + 'users.json';
//var users = [{ id: 1, username: 'Naval', guids: ['a38ae7e1-8059-4724-b84e-312ff891d66d'], images: ['./Data/Naval.JPG'] }, { id: 2, username: "Gareth", guids: ['77dae8bf-64d3-445e-bd14-d45cb191dc39'] }];
//jsonfile.writeFile(file, users, function (err) {
//    console.error(err)
//})
var users = jsonfile.readFileSync(file);
users.forEach(function (user)
{
    user.images.forEach(function (image)
    {
        image.timeOut = new Date(image.timeOut);
    });
});

//https://stackoverflow.com/questions/563406/add-days-to-javascript-date
Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

var promises = [];
users.forEach(function (user)
{
    user.images.forEach(function (image, i)
    {
        var today = new Date();
        if (!("timeOut" in image) || today.getTime() >= image.timeOut.getTime())
        {
            promises.push(client.face.detect(
            {
                path: image.image,
                returnFaceId: true
            }).then(function (response)
            {
                console.log(response);
                if (response.length > 0)
                {
                    image.timeOut = today.addDays(1);
                    image.guid = response[0].faceId;
                }
            }));
        }
    });
});


Promise.all(promises).then(values =>
{
    writeUsers();
});

function writeUsers()
{
    jsonfile.writeFile(file, users, function (err)
    {
        console.error(err);
    })
}


var opts =
{
    width: 640,
    height: 480,
    quality: 50,
    delay: 0,
    saveShots: true,
    output: "jpeg",

    //Which camera to use
    //Use Webcam.list() for results
    //false for default device

    device: false,
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes

    callbackReturn: "buffer",
    verbose: false
};
//Creates webcam instance
var Webcam = NodeWebcam.create(opts);

takePicture();
setInterval(takePicture, 20000);


http.listen(3000, function ()
{
  console.log('listening on *:3000');
});

function takePicture()
{
    Webcam.capture(directory +  'tmp.JPG', function (err, data) {
        (client.face.detect(
        {
            path: directory + '/tmp.JPG',
            returnFaceId: true
        }).then(function (response) {
            console.log(response);
            if (response.length > 0) {
                var faceId = response[0].faceId;
                client.face.similar(faceId,
                {
                    candidateFaces : Linq.from(users).selectMany(function (x) { return x.images }).select(function (x) { return x.guid }).toArray()
                }).then(function (response)
                {
                    console.log(response);
                    if (response.length > 0 && response[0].confidence > .6)
                    {
                        var user = Linq.from(users).where(function (x) { return Linq.from(x.images).any(function (x) { return x.guid == response[0].faceId }) }).first();
                        console.log(user);
                        console.log("User verified as " + user.username + ".");
                        io.sockets.emit('userVerified', user);
                        if (user.images.length < 11 && response[0].confidence > .8)
                        {
                            var filename = user.username + user.images.length + '.JPG';
                            fs.rename(directory + 'tmp.JPG', directory + filename, function (err)
                            {
                                if (err) console.log('ERROR: ' + err);
                            });
                            user.images.push({ "image": clientDirectory + filename, "guid" : faceId });
                            writeUsers();
                        }
                    }
                    else
                    {
                        console.log("User not recognised");
                        //prompt.start();
                        //prompt.get([{ name: 'username', message: "Please enter new user name" }], function (err, result) {
                        //    users.push({ id: users[users.length - 1].id + 1, username: result.name, guids: [faceId] });
                        //});
                        //jsonfile.writeFile(file, users, function (err) {
                        //    console.error(err)
                        //})

                    }
                }).catch((rejected) => {
                    console.log('rej: ', rejected);
                });
            }
        }));

    });
}


