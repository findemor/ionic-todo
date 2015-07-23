app.controller('HomeCtrl', ['$rootScope', '$scope', 'SessionFactory', 'API', '$ionicModal', function($rootScope, $scope, sf, api, $ionicModal) {

  $scope.todos = [];


  $rootScope.$on('load-todos', function(event) {
    $rootScope.showLoading('Fetching Todos..');
    var user = sf.getSession();

    api.getTodos(user._id).success(function(data) {
      $scope.todos = data.data;
      $rootScope.hideLoading();
    }).error(function(data) {
      $rootScope.hideLoading();
      $rootScope.toast('Oops.. Something went wrong');
    });
  });

  $rootScope.$broadcast('load-todos');

  $rootScope.createNew = function() {
    $scope.modal.show();
  }

  $ionicModal.fromTemplateUrl('/templates/new.html', function(modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true
  });

}]);
