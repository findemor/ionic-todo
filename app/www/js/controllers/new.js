app.controller('NewTodoCtrl', ['$rootScope', '$scope', 'SessionFactory', 'API', function($rootScope, $scope, sf, api) {

  $scope.todo = {
    name: '',
    category: ''
  };

  $scope.create = function() {
    var user = sf.getSession();

    api.saveTodo(
    user._id,
    {
      name: $scope.todo.name,
      category: $scope.todo.category,
    }).success(function(data) {
      $rootScope.hideLoading();
      $scope.modal.hide();
      $rootScope.$broadcast('load-todos');
    }).error(function(data) {
      $rootScope.hideLoading();
      $rootScope.toast('Oops.. Something went wrong');
    });
  }
}]);
