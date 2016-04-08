/**
 * Created by slava on 23.02.16.
 */

(function () {

    function usersService($rootScope, $resource) {
        var apiPath = 'http://jsonplaceholder.typicode.com/users',
            resource = $resource(apiPath, {}, {
                'getAll': {
                    isArray: true
                },
                'getUserById': {
                    url: apiPath + '/:userId',
                    params: {
                        userId: '@id'
                    }
                }
            });

        var service = {
            getAll: function () {
                return resource.getAll().$promise;
            },

            getUserById: function (userId) {
                return resource.getUserById({userId: userId }).$promise;
            },

            preload: function() {
                service.getAll().then(function(response) {
                    var users = {};

                    response.forEach(function(user) {
                        users[user.id] = user;
                    });

                    service.cachedUsers = users;

                    $rootScope.$broadcast('users.preloaded');
                }, function(err) {
                    console.log(err);
                });
            },

            isPreloaded: function() {
                if (!service.cachedUsers) {
                    return false;
                }

                return service.cachedUsers.length > 0;
            },

            getCachedUsers: function() {
                return service.cachedUsers;
            },

            currentUser: function() {
                return service.cachedUsers[1];
            }
        };

        return service;
    }

    angular.module('yasocial.global').factory('usersService', ['$rootScope', '$resource', usersService]);

})();
