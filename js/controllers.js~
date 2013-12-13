'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);


phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone,gettextCatalog) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
    $scope.gettextCatalog = gettextCatalog;
    $scope.languages = {
        'nl': 'Nederlands',
        'en': 'English'/*,
        'de': 'Deutsch',
        'bg_BG': 'български'*/
    };
}]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
