app.controller('HomeCtrl',
  ['$rootScope', '$scope', 'SessionFactory', 'API', '$ionicModal',
  function($rootScope, $scope, sf, api, $ionicModal) {

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

  $rootScope.$on('onResumeCordova', function(event) {
    $rootScope.$broadcast('load-todos');
  });

  $rootScope.$broadcast('load-todos');


  $scope.doRefresh = function() {
    $rootScope.$broadcast('load-todos');
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply();
  };

  $rootScope.createNew = function() {
    $scope.modal.show();
  };

  $scope.deleteItem = function(itemId) {
    var user = sf.getSession();

    api.deleteTodo(user._id, itemId)
    .success(function(data) {
      $rootScope.$broadcast('load-todos');
    }).error(function(data) {
      $rootScope.toast('Oops.. Something went wrong');
    });
  };

  $ionicModal.fromTemplateUrl('/templates/new.html', function(modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true
  });

}]);
