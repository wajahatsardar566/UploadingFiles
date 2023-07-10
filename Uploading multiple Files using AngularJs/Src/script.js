angular.module('myApp', [])
    .controller('fileUploadController', function ($scope, $http) {
        $scope.uploadFile = function () {
            $scope.filename = "";
            var files = document.getElementById('files').files;

            if (!files || files.length === 0) {
                let message = 'No file selected.'
                $scope.filename = message;
                // console.log(message);
                return;
            }

            var fileSizeLimit = 20 * 1024 * 1024; // 20MB limit in bytes
            var totalSize = 0;
            for (var i = 0; i < files.length; i++) {
                totalSize += files[i].size;
            }

            if (totalSize > fileSizeLimit) {
                let message = 'File size exceeds the limit of 20MB.';
                $scope.filename = message;
                // console.log(message);
                return;
            }

            var formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            var path = 'https://localhost:7096/api/File/UploadFiles';

            $http({
                method: 'POST',
                url: path,
                data: formData,
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            })
                .then(function (response) {
                    var data = JSON.stringify(response.data);
                    $scope.filename = data;
                    console.log(response.data);
                })
                .catch(function (error) {
                    var data = JSON.stringify(error.data);
                    $scope.filename = data;
                });
        };
    });
