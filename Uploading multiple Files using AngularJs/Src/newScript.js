// angular.module('myApp', [])
//     .controller('fileUploadController', function ($scope, $http) {
//         $scope.uploadFile = function () {
//             var files = $scope.myFiles;
//             var formData = new FormData();

//             for(var i = 0; i < files.length; i++) {
//                 formData.append('file[]', files[i]);
//             }
            
            
//             var path = 'https://localhost:7096/api/File/UploadFiles';

//             // Configure the request
//             $http({
//                 method: 'POST',
//                 url: path,
//                 data: formData,
//                 headers: {
//                     'Content-Type': undefined  
//                 },
//                 transformRequest: angular.identity  
//             })
//                 .then(function (response) {
//                     // Handle the response here
//                     console.log(response.data);
//                 })
//                 .catch(function (error) {
//                     // Handle the error here
//                     console.error(error.data);
//                 });
//         };
//     });
