app.controller('LoginCtrl', ['$rootScope', '$location', '$scope', 'API', 'SessionFactory', '$ionicHistory', function($rootScope, $location, $scope, api, sf, $ionicHistory) {
  $scope.login = {
    _id: '',
    password: ''
  }

  $ionicHistory.nextViewOptions({
      disableBack: true
  });

  $scope.loginUser = function() {
    $rootScope.showLoading("Authenticating..");
    api.login($scope.login).success(function(data) {
      sf.createSession(data.data);
      $location.path('/home');
      $rootScope.hideLoading();
    }).error(function(data) {
      $rootScope.hideLoading();
      $rootScope.toast('Invalid Credentials');
    })
  }


}]);
