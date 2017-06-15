var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const jsonfile = require('jsonfile')
var oxford = require('project-oxford'),
    client = new oxford.Client('38b88077298b4dc59d87682f324e1adc');
var NodeWebcam = require("node-webcam");
var Linq = require('linq');
var fs = require('fs');
var Jimp = require("jimp");
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
var clientDirectory = "/Data/";
var file = directory + 'users.json';
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
                path: 'public' + image.image,
                returnFaceId: true
            }).then(function (response)
            {
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
    });
}

var opts = {
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    device: false,
    callbackReturn: "buffer",
    verbose: false
};
//Creates webcam instance
var Webcam = NodeWebcam.create(opts);
var currentUser;

takePicture();
setInterval(takePicture, 5000);

http.listen(3000, function ()
{
    console.log('listening on *:3000');
});

function takePicture()
{
    var tmpDirectory = directory + 'tmp.JPG';
    Webcam.capture(tmpDirectory, function (err, data)
    {
        if(!currentUser) {
          io.sockets.emit('speech', 'I\'m looking for you through my webcam, please wait for recognition');
        }
        Jimp.read(data, function (err, tmp)
        {
            if (err) { console.log('woot', err); };
            if(!tmp) return;
            tmp.resize(640, 480)
                 .quality(70)
                 .write(tmpDirectory, function (response)
                 {
                     client.face.detect(
                     {
                         path: tmpDirectory,
                         returnFaceId: true
                     })
                     .then(function (response)
                     {
                         console.log('detect', response);
                         if (response.length > 0)
                         {
                             var faceId = response[0].faceId;
                             client.face.similar(faceId,
                             {
                                 candidateFaces: Linq.from(users).selectMany(function (x) {
                                     return x.images
                                    }).select(function (x) { return x.guid }).toArray()
                             })
                             .then(function (response)
                             {
                                 //console.log('blaa', response);
                                 if (response.length > 0 && response[0].confidence > .6)
                                 {
                                     var user = Linq.from(users).where(function (x) { return Linq.from(x.images).any(function (x) { return x.guid == response[0].faceId }) }).first();

                                     console.log("User verified as " + user.username);
                                     if(currentUser !== user.username) {
                                        console.log("Emitting new user " + user.username);
                                        io.sockets.emit('userVerified', user);
                                        io.sockets.emit('speech', 'Welcome to the magic mirror ' + user.username);
                                        currentUser = user.username;
                                     }

                                     if (user.images.length < 11 && response[0].confidence > .9)
                                     {
                                         var filename = user.username + user.images.length + '.JPG';
                                         fs.rename(tmpDirectory, directory + filename, function (err)
                                         {
                                             if (err) console.log('ERROR:', err);
                                         });
                                         user.images.push({ "image": clientDirectory + filename, "guid": faceId, "timeOut": new Date().addDays(1) });
                                         writeUsers();
                                     }
                                 }
                                 else
                                 {
                                     if(!currentUser) {
                                       io.sockets.emit('speech', 'I\'ve not recognised a user, make sure you\'re right where I can see you');
                                     }
                                     //console.log("User not recognised");
                                 }
                             }).catch((rejected) =>
                             {
                                 console.log('rej: ',  rejected);
                             });
                         }
                     });
                 });
        });
    });
}


