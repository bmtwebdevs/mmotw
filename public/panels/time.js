var time = time || (function () {

    var panel;

    function checkTime(i) {
        if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
        return i;
    }

    function update() {

        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        
        var year1 = today.getFullYear();       
        
        var date1 = today.getDate();
                
        //days of week       
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] =  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var dayname = weekday[d.getDay()];
        
        //months of year
        var month = today.getMonth() + 1;
        var mo = new Date();
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var monthname = month[mo.getMonth()];               
                    
        
        panel.innerHTML = '<font size="90">' + dayname + ' ' + date1 + ' ' + monthname + ' ' + year1 + "<br>" + h + ":" + m + ":" + s + '</font>';       
        
        
        var t = setTimeout(update, 500);
        
        
    }

    function attach(p) {

        panel = p;

        update();
    }

    return {
        attach: attach
    };

})();