app.controller('NewTodoCtrl', ['$rootScope', '$scope', 'SessionFactory', 'API', function($rootScope, $scope, sf, api) {

  $scope.todo = {
    name: '',
    category: ''
  };

  $scope.categories = [];


  $scope.$on('modal.shown',function(){
      var user = sf.getSession();

      api.getCategories(user._id)
      .success(function(data) {
        $scope.categories = data.data;
        $scope.todo.category = data.data[0];
      })
      .error(function(data) {
        $rootScope.toast('Categories load failed');
      });
  });

  $scope.create = function() {
    var user = sf.getSession();

    api.saveTodo(
    user._id,
    {
      name: $scope.todo.name,
      category: $scope.todo.category ? $scope.todo.category._id : null,
      categoryNew: $scope.todo.categoryNew
    }).success(function(data) {

      $scope.todo = {
        name: '',
        category: ''
      };

      $rootScope.hideLoading();
      $scope.modal.hide();
      $rootScope.$broadcast('load-todos');
    }).error(function(data) {
      $rootScope.hideLoading();
      $rootScope.toast('Oops.. Something went wrong');
    });
  }
}]);
