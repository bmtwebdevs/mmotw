document.addEventListener("DOMContentLoaded", function (event) {

    //const jsonfile = require('jsonfile')
    //var oxford = require('project-oxford'),
    //    
    //var NodeWebcam = require("node-webcam");
    ////var wait = require("wait.for");
    //var Linq = require('linq');
    //var prompt = require('prompt');
    //var fs = require('fs');

    client = new oxford.Client('38b88077298b4dc59d87682f324e1adc');

    var file = './Data/users.json';
    //var users = [{ id: 1, username: 'Naval', guids: ['a38ae7e1-8059-4724-b84e-312ff891d66d'], images: ['./Data/Naval.JPG'] }, { id: 2, username: "Gareth", guids: ['77dae8bf-64d3-445e-bd14-d45cb191dc39'] }];
    //jsonfile.writeFile(file, users, function (err) {
    //    console.error(err)
    //})
    var users = jsonfile.readFileSync(file);


    var opts =
    {
        width: 1280,
        height: 720,
        quality: 100,
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

    setInterval(function () {
        Webcam.capture("./Data/tmp.JPG", function (err, data) {
            (client.face.detect(
            {
                path: './Data/tmp.JPG',
                returnFaceId: true,
                analyzesAge: true,
                analyzesGender: true
            }).then(function (response) {
                console.log(response);
                if (response.length > 0) {
                    var faceId = response[0].faceId;
                    //console.log('The age is: ' + response[0].attributes.age);
                    //console.log('The gender is: ' + response[0].attributes.gender);
                    //console.log(Linq.from(users).select(function (x) { console.log(x.guid); return x.guid }).toArray());
                    client.face.similar(faceId,
                    {
                        candidateFaces: Linq.from(users).select(function (x) { return x.guids }).selectMany(function (x) { return x }).toArray()
                    }).then(function (response) {
                        console.log(response);
                        if (response.length > 0 && response[0].confidence > .6) {
                            var user = Linq.from(users).where(function (x) { return Linq.from(x.guids).contains(response[0].faceId) }).first();
                            console.log("User verified as " + user.username + ".");
                            var userPanel = _(document.querySelectorAll(".userprofile"));

                            userPanel.forEach(function (div) {
                                div.innerHTML = '<dtitle>Hi ' + user.username + '<hr /></dtitle><div>Loading</div>';
                            });
                            if (user.guids.length < 11 && response[0].confidence > .8) {
                                user.guids.push(faceId);
                                jsonfile.writeFile(file, users, function (err) {
                                    console.error(err)
                                })
                                var filename = './Data/' + user.username + user.guids.length + '.JPG';
                                fs.rename('./Data/tmp.JPG', filename, function (err) {
                                    if (err) console.log('ERROR: ' + err);
                                });
                                user.images.push(filename);
                            }
                        }
                        else {
                            console.log("User not recognised");
                            prompt.start();
                            prompt.get([{ name: 'username', message: "Please enter new user name" }], function (err, result) {
                                users.push({ id: users[users.length - 1].id + 1, username: result.name, guids: [faceId] });
                            });
                            jsonfile.writeFile(file, users, function (err) {
                                console.error(err)
                            })

                        }
                    }).catch((rejected) => {
                        console.log('rej: ' + rejected);
                    });
                }
            }));

        });
    }, 10000);
});