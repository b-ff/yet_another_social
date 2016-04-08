/**
 * Created by slava on 23.02.16.
 */

(function() {

    function newsfeedController($rootScope, usersService, postsService) {
        var thisCtrl = this;

        thisCtrl.posts = [];

        thisCtrl.loadPosts = function() {
            postsService.getAll().then(function(posts) {
                var users = usersService.getCachedUsers();

                posts.forEach(function(post, postIdx) {
                    posts[postIdx].user = users[post.userId];
                });

                thisCtrl.posts = posts;
            }, function(err) {
                console.log(err);
            });
        };

        //if (usersService.isPreloaded()) {
            thisCtrl.loadPosts();
        //} else {
        //    $rootScope.$on('users.preloaded', thisCtrl.loadPosts);
        //}
    }

    angular.module('yasocial.newsfeed').controller('newsfeedController', ['$rootScope', 'usersService', 'postsService', newsfeedController]);

})();

