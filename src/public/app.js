/* global angular */
var jetbrains = angular.module('jetbrains', []);


var weekday = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
var Picker = window.Picker;

jetbrains.controller('AppCtrl', function ($http) {
    var resoSwitch;
    var userName;
    var app = this;
    var url ='http://localhost:3000';
    var currentDate = new Date();
    var startDay;
    var startPicker;
    var wD;
    var weekDates;
    window.addEventListener('resize',checkForFlex);
    app.init = function () {

        startDay = document.getElementById('startDay');
        startPicker = new Picker(startDay, {
            title: 'Pick the starting date',
            format: 'MMM DD, YYYY',
            date: months[(currentDate.getMonth())].substr(0,3) + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear(),
        });


        startDay.addEventListener('pick',setEndDate);


        wD = startPicker.getDate().getDay()-1;
        if(wD < 0){wD = 6;}



        weekDates = [getSomeDate(-wD),getSomeDate(-wD+1),getSomeDate(-wD+2),getSomeDate(-wD+3),getSomeDate(-wD+4),getSomeDate(-wD+5),getSomeDate(-wD+6)];

        app.flexUp(0);
        startPicker.pick();
        app.startDay = months[(currentDate.getMonth())].substr(0,3) + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear();

    };

    app.checkIfClosing = function () {
        var x = event.clientX, y = event.clientY,
            elementMouseIsOver = document.elementFromPoint(x, y);

        if(elementMouseIsOver.id === 'content'){
            app.flexUp(0);
        }
    };

    app.flexUp = function (id) {
        loadEntry();
        wD = startPicker.getDate().getDay()-1;
        if(wD < 0){wD = 6;}
        weekDates = [getSomeDate(-wD),getSomeDate(-wD+1),getSomeDate(-wD+2),getSomeDate(-wD+3),getSomeDate(-wD+4),getSomeDate(-wD+5),getSomeDate(-wD+6)];

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
        var entryLists = document.getElementsByClassName('entryList');
        var dates = document.getElementsByClassName('date');
        var wD = startPicker.getDate().getDay()-1;
        if(wD < 0){wD = 6;}


        if(id !== 0) {

            //     CLICKED ON A DAY
            var label = document.getElementById('date'+id);
            var element = document.getElementById('day' + id);
            for (i = 0; i < e.length; i++) {                                //ITERATING THROUGH DAYS
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
                var l;
                for (l = 0; l < entryLists.length; l++){     //iterating through buttons
                    if(l !== id - 1) {
                        entryLists[l].style.display = 'none';
                    }else{
                        entryLists[l].style.display = 'inherit';
                    }
                }
            }
            //DAY THAT WAS CLICKED ON
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
            //NO DAY IS FOCUSED
            var k;
            for (k = 0; k < addEntryButtons.length; k++){
                addEntryButtons[k].style.display = 'none';
            }
            var m;
            for (m = 0; m < entryLists.length; m++){
                entryLists[m].style.display = 'none';
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
        app.endDay = months[(getSomeDate(-wD).getMonth())].substr(0,3) + ' ' + getSomeDate(-wD).getDate() + ', ' + getSomeDate(-wD).getFullYear() + ' - ' + months[(getSomeDate(-wD+6).getMonth())].substr(0,3) + ' ' + getSomeDate(-wD+6).getDate() + ', ' + getSomeDate(-wD+6).getFullYear();

        weekDates = [getSomeDate(-wD),getSomeDate(-wD+1),getSomeDate(-wD+2),getSomeDate(-wD+3),getSomeDate(-wD+4),getSomeDate(-wD+5),getSomeDate(-wD+6)];
        app.flexUp(0);

    }

    function checkForFlex(){
        var height = window.screen.height;
        var width = window.screen.width;
        var wHeight = window.innerHeight;
        var wWidth = window.innerWidth;

        resoSwitch = true;
        if(resoSwitch === false) {
            if ((height > (1.5 * width)) || (wHeight > (1.5 * wWidth))){
                app.flexUp(0);
                resoSwitch = true;
            }
        }else{
            if ((height < (1.5 * width)) || (wHeight < (1.5 * wWidth))){
                app.flexUp(0);
                resoSwitch = false;
            }
        }
    }

    app.showMenu = function () {
        var menu = document.getElementById('menu');
        var content = document.getElementById('content');
        if(menu.style.visibility === 'hidden') {
            menu.style.visibility = 'visible';
            content.style.right = 'calc(16.6% + 20px)';
        }else{
            menu.style.visibility = 'hidden';
            content.style.right = '20px';
        }

    };


    app.showAccMenu = function () {
        var accMenu = document.getElementById('accMenu');
        var content = document.getElementById('content');
        if(accMenu.style.visibility === 'hidden') {
            accMenu.style.visibility = 'visible';
            accMenu.style.display = 'block';
            content.style.left = 'calc(16.6% + 20px)';
        }else{
            accMenu.style.visibility = 'hidden';
            accMenu.style.display = 'none';
            content.style.left = '20px';
        }
    };

    app.registerUser = function(name, username, email, password){

        if(name === undefined || username === undefined || password === undefined || name === undefined) {
            if (name === undefined) {
                app.name = '';
                document.getElementById('name').style.backgroundColor = 'red';
                document.getElementById('name').style.color = 'black';
            }
            if (username === undefined) {
                app.usernameR = '';
                document.getElementById('usernameR').style.backgroundColor = 'red';
                document.getElementById('usernameR').style.color = 'black';
            }
            if (email === undefined) {
                app.email = '';
                document.getElementById('email').style.backgroundColor = 'red';
                document.getElementById('email').style.color = 'black';
            }
            if (password === undefined) {
                app.passwordR = '';
                document.getElementById('passwordR').style.backgroundColor = 'red';
                document.getElementById('passwordR').style.color = 'black';
            }
        }else{
            document.getElementById('name').style.backgroundColor = 'transparent';
            document.getElementById('name').style.color = '#67757f';
            document.getElementById('usernameR').style.backgroundColor = 'transparent';
            document.getElementById('usernameR').style.color = '#67757f';
            document.getElementById('email').style.backgroundColor = 'transparent';
            document.getElementById('email').style.color = '#67757f';
            document.getElementById('passwordR').style.backgroundColor = 'transparent';
            document.getElementById('passwordR').style.color = '#67757f';

            userName = username;
            document.getElementById('upperLeftButton').innerHTML = username;
            loggedIn();

            $http({
                method: 'POST',
                url: url + '/users/register',
                data: {name: name, username: username, email: email, password: password}
            }).then(function success() {
            }, function error() {
            });
        }
    };

    app.loginUser = function(username, password){
        if(username === undefined || password === undefined){
            if (username === undefined) {
                app.username = '';
                document.getElementById('username').style.backgroundColor = 'red';
                document.getElementById('username').style.color = 'black';
            }
            if (password === undefined) {
                app.password = '';
                document.getElementById('password').style.backgroundColor = 'red';
                document.getElementById('password').style.color = 'black';
            }
        }else {
            $http({
                method: 'POST',
                url: url + '/users/authenticate',
                data: {username: username, password: password}
            }).then(function success(res) {
                if(res.data.success === true){

                    app.username = '';
                    app.password = '';
                    document.getElementById('password').style.backgroundColor = 'transparent';
                    document.getElementById('password').style.color = '#67757f';
                    document.getElementById('username').style.backgroundColor = 'transparent';
                    document.getElementById('username').style.color = '#67757f';
                    userName = username;
                    document.getElementById('upperLeftButton').innerHTML = username;
                    loggedIn();
                }else{
                    if(res.data.r === 0){
                        app.username = '';
                        document.getElementById('username').style.backgroundColor = 'red';
                        document.getElementById('username').style.color = 'black';
                        app.password = '';
                    }else if(res.data.r === 1){
                        document.getElementById('username').style.backgroundColor = 'transparent';
                        document.getElementById('username').style.color = '#67757f';
                        app.password = '';
                        document.getElementById('password').style.backgroundColor = 'red';
                        document.getElementById('password').style.color = 'black';
                    }
                }
            }, function error() {
            });
        }
    };


    app.showAddEntryContainer = function (id) {
        var days = document.getElementsByClassName('day');
        var j;
        for (j = 0; j < days.length; j++){     //iterating through buttons
            days[j].style.opacity = 0;
            days[j].style.visibility = 'hidden';
        }
        var container = document.getElementById('addEntryContainer');
        container.style.visibility = 'visible';
        container.style.opacity = 1;


        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        var date1 = weekDates[id-1].toLocaleDateString('de-DE', options);

        new Picker(document.getElementById('entryST'), {
            format: 'HH:mm',
            date: '00:00'

        });
        new Picker(document.getElementById('entryET'), {
            format: 'HH:mm',
            date: '00:00'

        });
        new Picker(document.getElementById('entrySD'), {
            format: 'DD.MM.YYYY',
            date: date1
        });
        new Picker(document.getElementById('entryED'), {
            format: 'DD.MM.YYYY',
            date: date1
        });
        app.newEntryStartTime = '00:00';
        app.newEntryStartDay = date1;
        app.newEntryEndTime = '00:00';
        app.newEntryEndDay = date1;

    };

    app.closeAddEntryContainer = function () {
        var days = document.getElementsByClassName('day');
        var j;
        for (j = 0; j < days.length; j++){     //iterating through buttons
            days[j].style.opacity = 1;
            days[j].style.visibility = 'visible';
        }
        var container = document.getElementById('addEntryContainer');
        document.getElementById('entryTitle').value = '';
        document.getElementById('entryDesc').value = '';
        container.style.visibility = 'hidden';
        container.style.opacity = 0;
    };

    app.addEntry = function (title,sT,sD,eT,eD,d) {
        $http({method: 'POST', url: url+'/add', data:{title:title, startTime:sT,startDay:sD, endTime:eT,endDay:eD, description:d,userName:userName}}).then( function () {
            loadEntry();
        });
        app.closeAddEntryContainer();
    };

    app.logout = function () {
        userName = '';

        document.getElementById('upperLeftButton').innerHTML = '';
        document.getElementById('logoutButton').style.visibility = 'hidden';
        document.getElementById('logoutButton').style.opacity = 0;
        document.getElementById('loginButton').style.visibility = 'visible';
        document.getElementById('loginButton').style.opacity = 1;
        document.getElementById('registerButton').style.visibility = 'visible';
        document.getElementById('registerButton').style.opacity = 1;
        document.getElementById('register').style.visibility = 'hidden';
        document.getElementById('register').style.opacity = 0;
        document.getElementById('login').style.visibility = 'hidden';
        document.getElementById('login').style.opacity = 0;
        app.password = '';
        app.passwordR = '';
        app.username = '';
        app.usernameR = '';
        app.email = '';
        app.name = '';
        loadEntry();
    };

    app.deleteEntry = function (delTitle,delTime) {
        $http({method: 'POST', url: url+'/delete', data:{title:delTitle,startTime:delTime,userName:userName}}).then( function () {
            loadEntry();
        });
    };
    app.showDesc = function (desc, title, startTime) {
        var entry = document.getElementById(startTime+title);
        entry.style.height = '40px';
        entry.style.background = 'black';
        entry.innerHTML = desc;
    };

    app.showLogin = function () {
        document.getElementById('login').style.visibility = 'visible';
        document.getElementById('login').style.opacity = 1;
        document.getElementById('loginButton').style.visibility = 'hidden';
        document.getElementById('loginButton').style.opacity = 0;
        document.getElementById('registerButton').style.visibility = 'hidden';
        document.getElementById('registerButton').style.opacity = 0;
    };

    app.showRegister = function () {
        document.getElementById('register').style.visibility = 'visible';
        document.getElementById('register').style.opacity = 1;
        document.getElementById('loginButton').style.visibility = 'hidden';
        document.getElementById('loginButton').style.opacity = 0;
        document.getElementById('registerButton').style.visibility = 'hidden';
        document.getElementById('registerButton').style.opacity = 0;
    };

    app.closeRegisterLogin = function () {
        document.getElementById('loginButton').style.visibility = 'visible';
        document.getElementById('loginButton').style.opacity = 1;
        document.getElementById('registerButton').style.visibility = 'visible';
        document.getElementById('registerButton').style.opacity = 1;
        document.getElementById('register').style.visibility = 'hidden';
        document.getElementById('register').style.opacity = 0;
        document.getElementById('login').style.visibility = 'hidden';
        document.getElementById('login').style.opacity = 0;
        app.password = '';
        app.passwordR = '';
        app.username = '';
        app.usernameR = '';
        app.email = '';
        app.name = '';
    };
    function getSomeDate(t){
        return new Date(startPicker.getDate().getTime()+ t*(24 * 60 * 60 * 1000));
    }


    function loggedIn(){
        document.getElementById('register').style.visibility = 'hidden';
        document.getElementById('register').style.opacity = 0;
        document.getElementById('login').style.visibility = 'hidden';
        document.getElementById('login').style.opacity = 0;
        document.getElementById('loginButton').style.visibility = 'hidden';
        document.getElementById('loginButton').style.opacity = 0;
        document.getElementById('registerButton').style.visibility = 'hidden';
        document.getElementById('registerButton').style.opacity = 0;
        document.getElementById('logoutButton').style.visibility = 'visible';
        document.getElementById('logoutButton').style.opacity = 1;
        loadEntry();
    }


    function loadEntry() {


        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        wD = startPicker.getDate().getDay()-1;
        if(wD < 0){wD = 6;}
        weekDates = [getSomeDate(-wD),getSomeDate(-wD+1),getSomeDate(-wD+2),getSomeDate(-wD+3),getSomeDate(-wD+4),getSomeDate(-wD+5),getSomeDate(-wD+6)];

        var date1 = weekDates[0].toLocaleDateString('de-DE', options);
        var date2 = weekDates[1].toLocaleDateString('de-DE', options);
        var date3 = weekDates[2].toLocaleDateString('de-DE', options);
        var date4 = weekDates[3].toLocaleDateString('de-DE', options);
        var date5 = weekDates[4].toLocaleDateString('de-DE', options);
        var date6 = weekDates[5].toLocaleDateString('de-DE', options);
        var date7 = weekDates[6].toLocaleDateString('de-DE', options);



        $http({method: 'POST', url: url+'/all', data:{userName:userName}}).then(function successCallback(entries) {
            app.entries = entries.data;
        }, function errorCallback(response) {
            return response;
        });
        $http({method: 'POST', url: url, data:{startDay:date1,userName:userName}}).then(function successCallback(entries) {
            app.entries1 = entries.data;
        }, function errorCallback(response) {
            return response;
        });
        $http({method: 'POST', url: url, data:{startDay:date2,userName:userName}}).then(function successCallback(entries) {
            app.entries2 = entries.data;
        }, function errorCallback(response) {
            return response;
        });
        $http({method: 'POST', url: url, data:{startDay:date3,userName:userName}}).then(function successCallback(entries) {
            app.entries3 = entries.data;
        }, function errorCallback(response) {
            return response;
        });
        $http({method: 'POST', url: url, data:{startDay:date4,userName:userName}}).then(function successCallback(entries) {
            app.entries4 = entries.data;
        }, function errorCallback(response) {
            return response;
        });
        $http({method: 'POST', url: url, data:{startDay:date5,userName:userName}}).then(function successCallback(entries) {
            app.entries5 = entries.data;
        }, function errorCallback(response) {
            return response;
        });
        $http({method: 'POST', url: url, data:{startDay:date6,userName:userName}}).then(function successCallback(entries) {
            app.entries6 = entries.data;
        }, function errorCallback(response) {
            return response;
        });
        $http({method: 'POST', url: url, data:{startDay:date7,userName:userName}}).then(function successCallback(entries) {
            app.entries7 = entries.data;
        }, function errorCallback(response) {
            return response;
        });
    }
});