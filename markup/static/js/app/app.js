(function() {

    angular.module('yasocial', [

        // Vendor modules

        'ui.router',
        'ui.bootstrap',

        // App modules

        'yasocial.global',
        'yasocial.newsfeed',
        'yasocial.profile'
    ]);

    function run($state, usersService) {
        usersService.preload();

        $state.go('feed');
    }

    function config($stateProvider) {}

    angular.module('yasocial').config(['$stateProvider', config]);
    angular.module('yasocial').run(['$state', 'usersService', run]);

})();
