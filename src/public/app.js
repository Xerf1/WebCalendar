/* global angular */
var jetbrains = angular.module('jetbrains', []);


var weekday = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
var Picker = window.Picker;
jetbrains.controller('AppCtrl', function ($http) {
    var app = this;
    var url ='http://localhost:3000';
    var chosenDay;
    var currentDate = new Date();
    var startDay = document.getElementById('startDay');
    var startPicker = new Picker(startDay, {
        title: 'Pick the starting date',
        format: 'MMM DD, YYYY',
        date: months[(currentDate.getMonth())].substr(0,3) + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear(),
    });
    startDay.addEventListener('pick',setEndDate);
    app.init = function () {
        app.flexUp(0);
        startPicker.pick();
        app.startDay = months[(currentDate.getMonth())].substr(0,3) + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear();
    };

    app.flexUp = function (id) {


        var content = document.getElementById('content');
        var height = window.screen.height;
        var width = window.screen.width;
        var wHeight = window.innerHeight;
        var wWidth = window.innerWidth;
        if((height > (1.5 * width))||(wHeight > (1.5 * wWidth))){
            content.style.flexDirection = 'column';
        }else{
            content.style.flexDirection = 'row';
        }
        //vars for Labels
        var currentDate = new Date();
        var d = currentDate.getDate();
        var w = currentDate.getDay();
        var y = currentDate.getFullYear();
        var weekDayDiff = w - id;
        var theDate = getSomeDate(-weekDayDiff);
        var d1 = theDate.getDate();
        var w1 = theDate.getDay();
        var m1 = theDate.getMonth(); //Be careful! January is 0 not 1
        var dayOfMonth = d - weekDayDiff + 'th ';
        if (d===1 || d===21 || d===31 ){
            dayOfMonth = d - weekDayDiff + 'st ';
        }
        if (d===2 || d===22){
            dayOfMonth = d - weekDayDiff + 'nd ';
        }
        if (d===3 || d===23 || d===33 ){
            dayOfMonth = d - weekDayDiff + 'st ';
        }

        var i;

        var e = document.getElementsByClassName('day');
        var addEntryButtons = document.getElementsByClassName('addEntry');
        var dates = document.getElementsByClassName('date');
        if(id !== 0) {
            var label = document.getElementById('date'+id);
            var element = document.getElementById('day' + id);
            for (i = 0; i < e.length; i++) {  //iterating through days
                if((height > (1.5 * width))||(wHeight > (1.5 * wWidth))) {
                    e[i].style.width = '100%';
                    e[i].style.height = 'auto';

                    dates[i].style.flex = 1;
                    dates[i].style.paddingTop = '2vw';
                    dates[i].style.height = '4vw';
                    dates[i].style.fontSize = '3vw';
                    dates[i].innerHTML = weekday[getSomeDate(i-w+1).getDay()].substr(0,1);
                }else{
                    e[i].style.width = '13%';
                    e[i].style.height = '100%';

                    dates[i].style.flex = 1;
                    dates[i].style.paddingTop = '1vw';
                    dates[i].style.height = '3vw';
                    dates[i].style.fontSize = '2vw';
                    dates[i].innerHTML = weekday[getSomeDate(i-w+1).getDay()].substr(0,1);
                }
                e[i].style.flex = 1;
                var j;
                for (j = 0; j < addEntryButtons.length; j++){     //iterating through buttons
                    if(j !== id - 1) {
                        addEntryButtons[j].style.display = 'none';
                    }else{
                        addEntryButtons[j].style.display = 'inherit';
                    }
                }
            }

            element.style.flex = 10;
            label.style.flex = 10;
            if((height > (1.5 * width))||(wHeight > (1.5 * wWidth))) {
                if(label.offsetWidth < 500) {
                    label.style.paddingTop = '2vw';
                    label.style.height = '4vw';
                    label.style.fontSize = '3vw';
                    label.innerHTML = weekday[w1] + ' , ' + d1 + '.' + (m1+1) + '.' + y;
                }else{
                    label.style.paddingTop = '2vw';
                    label.style.height = '4vw';
                    label.style.fontSize = '3vw';
                    label.innerHTML = weekday[w1] + ' the ' + dayOfMonth + 'of ' + months[m1] + ', ' + y;
                }
            }else{
                if(label.offsetWidth < 500) {
                    label.style.paddingTop = '1vw';
                    label.style.height = '3vw';
                    label.style.fontSize = '2vw';
                    label.innerHTML = weekday[w1] + ' , ' + d1 + '.' + (m1+1) + '.' + y;
                }else{
                    label.style.paddingTop = '1vw';
                    label.style.height = '3vw';
                    label.style.fontSize = '2vw';
                    label.innerHTML = weekday[w1] + ' the ' + dayOfMonth + 'of ' + months[m1] + ', ' + y;
                }
            }
        }else{

            var k;
            for (k = 0; k < addEntryButtons.length; k++){
                addEntryButtons[k].style.display = 'none';
            }

            for (i = 0; i < e.length; i++) {
                if((height > (1.5 * width))||(wHeight > (1.5 * wWidth))) {
                    e[i].style.width = '100%';
                    e[i].style.height = 'auto';
                    dates[i].style.paddingTop = '2vw';
                    dates[i].style.height = '4vw';
                    dates[i].style.fontSize = '3vw';
                }else{
                    e[i].style.width = '13%';
                    e[i].style.height = '100%';
                    dates[i].style.paddingTop = '1vw';
                    dates[i].style.height = '3vw';
                    dates[i].style.fontSize = '2vw';
                }
                e[i].style.flex = 1;
                dates[i].style.flex = 1;
                dates[i].innerHTML = weekday[getSomeDate(i-w+1).getDay()].substr(0,1) + ', ' + (getSomeDate(i-2).getDate()) + '.' + (getSomeDate(i-2).getMonth()+1);
            }
            for (i = 0; i < e.length; i++) {
                if (e[i].offsetWidth < 125) {
                    dates[i].innerHTML = (getSomeDate(i - w+1).getDate()) + '.' + (getSomeDate(i - 2).getMonth() + 1);
                } else {
                    dates[i].innerHTML = weekday[getSomeDate(i - w+1).getDay()].substr(0, 1) + ', ' + (getSomeDate(i - 2).getDate()) + '.' + (getSomeDate(i - 2).getMonth() + 1);
                }
            }
        }
    };


    function setEndDate() {
        console.log(getSomeDate2(0));
        var wD = startPicker.getDate().getDay()-1;
        if(wD < 0){wD = 6;}
        console.log(wD);
        app.endDay = months[(getSomeDate2(-wD).getMonth())].substr(0,3) + ' ' + getSomeDate2(-wD).getDate() + ', ' + getSomeDate2(-wD).getFullYear() + ' - ' + months[(getSomeDate2(-wD+6).getMonth())].substr(0,3) + ' ' + getSomeDate2(-wD+6).getDate() + ', ' + getSomeDate2(-wD+6).getFullYear();
    }

    app.showMenu = function () {
        var menu = document.getElementById('menu');
        var content = document.getElementById('content');
        if(menu.style.height === '0px') {
            menu.style.height = '100%';
            content.style.right = 'calc(16.6% + 0px)';
        }else{
            menu.style.height = 0;
            content.style.right = '30px';
        }

    };

    app.showAddEntryContainer = function (id) {

        var currentDate = new Date();


        new Picker(document.getElementById('entryST'), {
            format: 'HH:mm',
            date: '00:00',

        });
        new Picker(document.getElementById('entrySD'), {
            format: 'DD.MM.YYYY',
            date: '2048.10.2024',

        });
        new Picker(document.getElementById('entryET'), {
            format: 'HH:mm',
            date: '00:00',

        });
        new Picker(document.getElementById('entryED'), {
            format: 'DD.MM.YYYY',
            date: '2048.10.2024',

        });
        chosenDay = id;
        var days = document.getElementsByClassName('day');
        var j;
        for (j = 0; j < days.length; j++){     //iterating through buttons
            days[j].style.opacity = 0;
            days[j].style.visibility = 'hidden';
        }
        var container = document.getElementById('addEntryContainer');
        container.style.visibility = 'visible';
        container.style.opacity = 1;
    };

    app.closeAddEntryContainer = function () {
        var days = document.getElementsByClassName('day');
        var j;
        for (j = 0; j < days.length; j++){     //iterating through buttons
            days[j].style.opacity = 1;
            days[j].style.visibility = 'visible';
        }
        var container = document.getElementById('addEntryContainer');
        container.style.visibility = 'hidden';
        container.style.opacity = 0;
    };

    app.addEntry = function (title,sT,eT,d) {
        $http({method: 'POST', url: url+'/add', data:{title:title, startDateTime:chosenDay+' '+sT, endDateTime:eT, description:d}}).then( function () {
            loadEntry();
        });
        var days = document.getElementsByClassName('day');
        var j;
        for (j = 0; j < days.length; j++){     //iterating through buttons
            days[j].style.opacity = 1;
            days[j].style.visibility = 'visible';
        }
        var container = document.getElementById('addEntryContainer');
        container.style.visibility = 'hidden';
        container.style.opacity = 0;
    };


    app.saveProduct = function (newProduct) {
        $http({method: 'POST', url: url+'/add', data:{name:newProduct}}).then( function () {
            loadEntry();
        });
    };

    app.deleteProduct = function (delProduct) {
        $http({method: 'POST', url: url+'/delete', data:{name:delProduct}}).then( function () {
            loadEntry();
        });
    };

    function getSomeDate(t){
        return new Date(new Date().getTime() + t*(24 * 60 * 60 * 1000));
    }

    function getSomeDate2(t){
        return new Date(startPicker.getDate().getTime()+ t*(24 * 60 * 60 * 1000));
    }

    function loadEntry() {
        $http({method: 'GET', url: url}).then(function successCallback(entries) {
            app.entries = entries.data;
        }, function errorCallback(response) {
            return response;
        });
    }
    loadEntry();
});