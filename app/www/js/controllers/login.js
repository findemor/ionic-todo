app.controller('LoginCtrl', ['$rootScope', '$location', '$scope', 'API', 'SessionFactory', function($rootScope, $location, $scope, api, sf) {
  $scope.login = {
    _id: '',
    password: ''
  }

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
