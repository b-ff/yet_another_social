/**
 * Created by slava on 23.02.16.
 */

(function() {

    function profileController($stateParams, usersService) {
        var thisCtrl = this;

        thisCtrl.user = {};

        if ($stateParams.id == 1) {
            thisCtrl.isOnline = true;
        }

        thisCtrl.loadInfo = function() {
            usersService.getUserById($stateParams.id).then(function(data) {
                thisCtrl.user = data;
                thisCtrl.user.avatar = '/static/images/content/avatars/' + thisCtrl.user.id + '.jpg';
                thisCtrl.user.address.geo = 'https://www.google.ru/maps/place/' + thisCtrl.user.address.geo.lat + ',' + thisCtrl.user.address.geo.lng;
            }, function(err) {
                console.log(err);
            });
        };

        thisCtrl.loadInfo();
    }

    angular.module('yasocial.profile').controller('profileController', ['$stateParams', 'usersService', profileController]);

})();