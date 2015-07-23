app.controller('SignupCtrl', ['$rootScope', '$location', '$scope', 'API', 'SessionFactory', function($rootScope, $location, $scope, api, sf) {

  $scope.reg = {
    _id: '',
    password: ''
  }

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
