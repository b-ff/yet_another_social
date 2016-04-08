/**
 * Created by slava on 23.02.16.
 */

(function() {

    angular.module('yasocial.profile', [
        'ui.router',
        'yasocial.global'
    ]);

    function run() {}

    function config($stateProvider) {
        $stateProvider
            .state('profile', {
                url: '/profile/:id',
                templateUrl: '/profile.html',
                controller: 'profileController as profileCtrl'
            });
    }

    angular.module('yasocial.profile').config(['$stateProvider', config]);
    angular.module('yasocial.profile').run([run]);

})();