app
    .controller('PostIndex', ['$scope', 'rest', 'toaster', '$sce', 'status', '$filter', function ($scope, rest, toaster, $sce, status, $filter) {

        rest.path = 'v1/posts';

        var errorCallback = function (data) {
            toaster.clear();
            toaster.pop('error', "status: " + data.status + " " + data.name, data.message);
        };

        rest.models().success(function (data) {
            $scope.posts = $filter('filter')(data, {"status": status});
        }).error(errorCallback);

    }])

    .controller('PostView', ['$scope', 'rest', 'toaster', function ($scope, rest, toaster) {

        rest.path = 'v1/posts';

        $scope.post = {};

        var errorCallback = function (data) {
            toaster.clear();
            if (data.status == undefined) {
                angular.forEach(data, function (error) {
                    toaster.pop('error', "Field: " + error.field, error.message);
                });
            } else {
                toaster.pop('error', "code: " + data.code + " " + data.name, data.message);
            }
        };

        rest.model().success(function (data) {
            $scope.post = data;
            $scope.post.comment = {"post_id": data.id, "content": null};
        }).error(errorCallback);

        $scope.addComment = function () {

            rest.path = 'v1/comments';

            rest.postModel($scope.post.comment)
                .success(function (data) {
                    if (!angular.isArray($scope.post.comments)) {
                        $scope.post.comments = [];
                    }
                    $scope.post.comments.unshift(data);
                    $scope.post.comment.content = null;
                    toaster.pop('success', "Comment is added!");
                })
                .error(errorCallback);
        };

        $scope.deleteComment = function (comment) {

            rest.path = 'v1/comments/' + comment.id;

            rest.deleteModel()
                .success(function () {
                    angular.forEach($scope.post.comments, function (value, key) {
                        if (value.id == comment.id) {
                            $scope.post.comments.splice(key, 1);
                            toaster.pop('success', "Comment is deleted!");
                            return true;
                        }
                    });
                })
                .error(errorCallback);
        };
    }])

    .controller('PostCreate', ['$scope', 'rest', 'toaster', '$window', function ($scope, rest, toaster, $window) {

        rest.path = 'v1/posts';

        $scope.post = {};

        $scope.icons = [
            {value: '1', label: 'Draft'},
            {value: '2', label: 'Published'},
        ];

        var errorCallback = function (data) {
            toaster.clear();
            if (data.status == undefined) {
                angular.forEach(data, function (error) {
                    toaster.pop('error', "Field: " + error.field, error.message);
                });
            } else {
                toaster.pop('error', "status: " + data.status + " " + data.name, data.message);
            }
        };

        $scope.save = function () {
            rest.postModel($scope.post).success(function (data) {

                toaster.pop('success', "Saved");

                $window.setTimeout(function () {
                    $window.location = '/#!/post/' + data.id;
                }, 1000);

            }).error(errorCallback);
        };
    }])

    .controller('PostEdit', ['$scope', 'rest', 'toaster', '$window', function ($scope, rest, toaster, $window) {

        var errorCallback = function (data) {
            toaster.clear();
            if (data.status == undefined) {
                angular.forEach(data, function (error) {
                    toaster.pop('error', "Field: " + error.field, error.message);
                });
            } else {
                toaster.pop('error', "status: " + data.status + " " + data.name, data.message);
            }
        };

        rest.path = 'v1/posts';

        $scope.post = {};

        $scope.icons = [
            {value: '1', label: 'Draft'},
            {value: '2', label: 'Published'},
        ];

        rest.model().success(function (data) {
            $scope.post = data;
            $scope.post.status = $scope.post.status.toString();
        }).error(errorCallback);

        $scope.save = function () {
            rest.putModel($scope.post).success(function () {

                toaster.pop('success', "Saved");

                $window.setTimeout(function () {
                    $window.location = '/#!/post/' + $scope.post.id;
                }, 1000);
            }).error(errorCallback);
        };

    }])

    .controller('PostDelete', ['$scope', 'rest', 'toaster', '$window', function ($scope, rest, toaster, $window) {

        $scope.post = {};

        var errorCallback = function (data) {
            toaster.clear();
            if (data.status == undefined) {
                angular.forEach(data, function (error) {
                    toaster.pop('error', "Field: " + error.field, error.message);
                });
            } else {
                toaster.pop('error', "status: " + data.status + " " + data.name, data.message);
            }
        };

        rest.path = 'v1/posts';

        rest.model().success(function (data) {
            $scope.post = data;
        }).error(errorCallback);


        $scope.deleteModel = function () {

            rest.path = 'v1/posts/' + $scope.post.id;

            rest.deleteModel().success(function () {

                toaster.pop('success', "Deleted!");

                $window.setTimeout(function () {
                    $window.location = '/';
                }, 1000);

            }).error(errorCallback);
        }

    }]);