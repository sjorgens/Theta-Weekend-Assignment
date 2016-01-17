/**
 * Created by Scott on 1/16/16.
 */

var app = angular.module('serviceApp', []);

app.controller('mainController', ['$scope', '$http', 'GitHubService', function($scope, $http, GitHubService){

    $scope.users = GitHubService.theta;

    GitHubService.fetch();

}]);

app.factory('GitHubService', ['$http', function($http){

    var thetaData = [];

    var gitUserNames = function(){
        return ["abrooksnagel", "CharlieGitDev", "cwgraff", "Dante0031", "EricWAnderson", "ewest081", "gwenpaul", "Hinges", "jeremycloutier", "jmanders85", "jrobby", "kenziebultema", "kyracrow", "mcreinders", "nataliekoch", "rimatla", "rohran01", "Rothermal", "samantha212", "sjorgens", "sothep", "the-amber-joy"];
    }

    var randNumber = function randomNumber(min, max){
        return Math.floor(Math.random() * (1 + max - min) + min);
    }

    var userName = function(){
        var nameList = [];
        nameList = gitUserNames();
        //return nameList[1];
        return nameList[randNumber(0, nameList.length)];
    }

    var url = 'https://api.github.com/users/' + userName() + '/events?callback=JSON_CALLBACK';


    //var url = 'https://api.github.com/users/sjorgens/events?callback=JSON_CALLBACK';

    var getJSON = function() {
        $http.jsonp(url).then(function (response) {
            console.log(response);
            for (var i = 0; i < 12; i++){
                thetaData.push(response.data.data[i]);
            }

        });
    }

    return {
        fetch: getJSON,
        theta: thetaData
    }

}]);