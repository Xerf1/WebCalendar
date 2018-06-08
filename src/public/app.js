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

    var weekDates = [getSomeDate(0),getSomeDate(1),getSomeDate(2),getSomeDate(3),getSomeDate(4),getSomeDate(5),getSomeDate(6)];

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
        var i;
        var e = document.getElementsByClassName('day');
        var addEntryButtons = document.getElementsByClassName('addEntry');
        var dates = document.getElementsByClassName('date');
        var wD = startPicker.getDate().getDay()-1;
        if(wD < 0){wD = 6;}


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
                    dates[i].innerHTML = weekday[getSomeDate(-wD + i).getDay()].substr(0,1);
                }else{
                    e[i].style.width = '13%';
                    e[i].style.height = '100%';
                    dates[i].style.flex = 1;
                    dates[i].style.paddingTop = '1vw';
                    dates[i].style.height = '3vw';
                    dates[i].style.fontSize = '2vw';
                    dates[i].innerHTML = weekday[getSomeDate(-wD + i).getDay()].substr(0,1);
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

            var dayOfMonth = weekDates[id-1].getDate()+ 'th ';
            if (weekDates[id-1].getDate()===1 || weekDates[id-1].getDate()===21 || weekDates[id-1].getDate()===31 ){
                dayOfMonth = weekDates[id-1].getDate()+ 'st ';
            }
            if (weekDates[id-1].getDate()===2 || weekDates[id-1].getDate()===22){
                dayOfMonth = weekDates[id-1].getDate()+ 'nd ';
            }
            if (weekDates[id-1].getDate()===3 || weekDates[id-1].getDate()===23){
                dayOfMonth = weekDates[id-1].getDate()+ 'rd ';
            }

            element.style.flex = 10;
            label.style.flex = 10;
            if((height > (1.5 * width))||(wHeight > (1.5 * wWidth))) {
                if(label.offsetWidth < 500) {
                    label.style.paddingTop = '2vw';
                    label.style.height = '4vw';
                    label.style.fontSize = '3vw';
                    label.innerHTML =  weekday[weekDates[id-1].getDay()] + ' , ' + weekDates[id-1].getDate() + '.' + (weekDates[id-1].getMonth()+1) + '.' + weekDates[id-1].getFullYear();
                }else{
                    label.style.paddingTop = '2vw';
                    label.style.height = '4vw';
                    label.style.fontSize = '3vw';
                    label.innerHTML = weekday[weekDates[id-1].getDay()] + ' the ' + dayOfMonth + 'of ' + months[weekDates[id-1].getMonth()] + ', ' + weekDates[id-1].getFullYear();
                }
            }else{
                if(label.offsetWidth < 500) {
                    label.style.paddingTop = '1vw';
                    label.style.height = '3vw';
                    label.style.fontSize = '2vw';
                    label.innerHTML =  weekday[weekDates[id-1].getDay()] + ' , ' + weekDates[id-1].getDate() + '.' + (weekDates[id-1].getMonth()+1) + '.' + weekDates[id-1].getFullYear();
                }else{
                    label.style.paddingTop = '1vw';
                    label.style.height = '3vw';
                    label.style.fontSize = '2vw';
                    label.innerHTML = weekday[weekDates[id-1].getDay()] + ' the ' + dayOfMonth + 'of ' + months[weekDates[id-1].getMonth()] + ', ' + weekDates[id-1].getFullYear();
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
            }
            for (i = 0; i < e.length; i++) {
                if (e[i].offsetWidth < 125) {
                    dates[i].innerHTML = (getSomeDate(-wD + i).getDate()) + '.' + (getSomeDate(-wD+i).getMonth() + 1);
                } else {
                    dates[i].innerHTML = weekday[getSomeDate(-wD + i).getDay()].substr(0, 1) + ', ' + (getSomeDate(-wD+i).getDate()) + '.' + (getSomeDate(-wD+i).getMonth()+1);
                }
            }
        }
    };

    function setEndDate() {
        var wD = startPicker.getDate().getDay()-1;
        if(wD < 0){wD = 6;}
        app.endDay = months[(getSomeDate(-wD).getMonth())].substr(0,3) + ' ' + getSomeDate(-wD).getDate() + ', ' + getSomeDate(-wD).getFullYear() + ' - ' + months[(getSomeDate(-wD+6).getMonth())].substr(0,3) + ' ' + getSomeDate(-wD+6).getDate() + ', ' + getSomeDate(-wD+6).getFullYear();

        weekDates = [getSomeDate(-wD),getSomeDate(-wD+1),getSomeDate(-wD+2),getSomeDate(-wD+3),getSomeDate(-wD+4),getSomeDate(-wD+5),getSomeDate(-wD+6)];
        app.flexUp(0);

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


    app.showAccMenu = function () {
        var accMenu = document.getElementById('accMenu');
        var content = document.getElementById('content');
        if(accMenu.style.height === '0px') {
            accMenu.style.height = '100%';
            content.style.left = 'calc(16.6% + 0px)';
        }else{
            accMenu.style.height = 0;
            content.style.left = '30px';
        }
    };

    app.registerUser = function(name, username, email, password){
        $http({method: 'POST', url: url+'/users/register', data:{name: name, username: username, email: email,password: password }}).then( function success (res) {
            console.log(res);
        }, function error(err){
            console.log(err);
        });
    };

    app.loginUser = function(username, password){
        $http({method: 'POST', url: url+'/users/authenticate', data:{username: username, password: password }}).then( function success (res) {
            console.log(res);
        }, function error(err){
            console.log(err);
        });
    };


    app.showAddEntryContainer = function (id) {


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