var spotify = spotify || (function () {

    var audio = new Audio();
    var accessToken;

    function initialise() {
        apis.ajax.get('http://localhost:3000/spotify-authenticate/?')
        .then((response) => {
            var data = JSON.parse(response);
            accessToken = data.access_token;
            return data;
        });
    }

    function stop() {
        audio.stop();
    }

    function search(query) {

        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: {
                q: query,
                type: 'track'
            },
            success: function (response) {
                if (response.tracks.items.length) {

                    var tracksWithUrls = _.filter(response.tracks.items, function(track) {
                        return track.preview_url;
                    });

                    var t = tracksWithUrls[0];
                    audio.src = t.preview_url;
                    audio.play();
                }
            }
        });
    }

    return {
        initialise: initialise,
        search: search
    };
})();
