var app = angular.module('loganalysisApp', ['ngRoute', 'ngMaterial', 'elasticsearch'])
    .config(function ($routeProvider, $locationProvider, $sceProvider) {
        $sceProvider.enabled(false);

        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })

            .otherwise({redirectTo: '/'});



        // use the HTML5 History API
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    })

    .service('client', function (esFactory) {
        return esFactory({
            host: 'http://localhost:9300',
            apiVersion: '2.1',
            log: 'trace'
        });
    });


