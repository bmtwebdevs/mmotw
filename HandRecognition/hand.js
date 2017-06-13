const cv = require('opencv');

try {
    var vid = new cv.VideoCapture(0);
    var window = new cv.NamedWindow('Video', 0)

    setInterval(function () {
        vid.read(function (err, im) {
            if (err)
            {
                console.log("stream error");
                throw err;
            }
            if (im.size()[0] > 0 && im.size()[1] > 0) {
                //im.detectObject(cv.FACE_CASCADE, {}, function (err, faces) {
                //    if (err) {
                //        console.log("face error");
                //        throw err;
                //    }
                //    if (!faces.length) return console.log("No Faces");

                //    var face = faces[0];
                //    var ims = im.size();
                //    im.rectangle([face.x, face.y], [face.width, face.height]);
                //    //vid.release();
                //});
                window.show(im);
                window.blockingWaitKey(0, 50);
            } else {
                console.log("Camera didn't return image")
            }
        });
    }, 20);    
} catch (e) {
    console.log("Couldn't start camera", e)
}