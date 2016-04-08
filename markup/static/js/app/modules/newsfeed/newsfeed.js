/**
 * Created by slava on 23.02.16.
 */

(function() {

    angular.module('yasocial.newsfeed', [
        'ui.router',
        'yasocial.global'
    ]);

    function run() {}

    function config($stateProvider) {
        $stateProvider
            .state('feed', {
                url: '/feed',
                templateUrl: '/newsfeed.html',
                controller: 'newsfeedController as feedCtrl'
            });
    }

    angular.module('yasocial.newsfeed').config(['$stateProvider', config]);
    angular.module('yasocial.newsfeed').run([run]);

})();
