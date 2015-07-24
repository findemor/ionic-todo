app.controller('SignupCtrl', ['$rootScope', '$location', '$scope', 'API', 'SessionFactory', '$ionicHistory', function($rootScope, $location, $scope, api, sf, $ionicHistory) {

  $scope.reg = {
    _id: '',
    password: ''
  }

  $ionicHistory.nextViewOptions({
      disableBack: true
  });

  $scope.registerUser = function() {
    console.log('register');
    $rootScope.showLoading("Authenticating..");
    api.signup($scope.reg).success(function(data) {
      sf.createSession(data.data);
      $location.path('/home');
      $rootScope.hideLoading();
    }).error(function(data) {
      $rootScope.hideLoading();
      $rootScope.toast('Invalid Credentials');
    })
  }

}]);
