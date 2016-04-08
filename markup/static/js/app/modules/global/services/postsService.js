/**
 * Created by slava on 23.02.16.
 */

(function () {

    function postsService($resource) {
        var apiPath = 'http://jsonplaceholder.typicode.com/posts',
            resource = $resource(apiPath, {}, {
                'getAll': {
                    isArray: true
                },
                'getPostById': {
                    url: apiPath + '/:postId',
                    params: {
                        postId: ':postId'
                    }
                },
                'getPostsByUserId': {
                    url: apiPath,
                    isArray: true,
                    params: {
                        userId: '@userId'
                    }
                }
            });

        return {
            getAll: function () {
                return resource.getAll().$promise;
            },

            getPostById: function (postId) {
                return resource.getPostById({ postId: postId }).$promise;
            },

            getPostsByUserId: function (userId) {
                return resource.getPostsByUserId({ userId: userId }).$promise;
            }
        }
    }

    angular.module('yasocial.global').factory('postsService', ['$resource', postsService]);

})();
