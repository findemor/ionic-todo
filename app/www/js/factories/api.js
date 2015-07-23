app.factory('API', ['$http', function($http) {

  var _base = "http://localhost:3000";
  var _api = {

    login: function(user) {
      return $http.post(_base + '/api/auth/login', user);
    },
    signup: function(user) {
      return $http.post(_base + '/api/auth/signup', user);
    },
    getTodos: function(userid) {
      return $http.get(_base + '/api/todos/' + userid);
    },
    saveTodo: function(userid, todo) {
      return $http.post(_base + '/api/todos/' + userid, todo);
    },
    getCategories: function(userid) {
      return $http.get(_base + '/api/categories/' + userid);
    },
    deleteTodo: function(userid, itemId) {
      return $http.delete(_base + '/api/todos/' + userid + '/' + itemId);
    }

  };

  return _api;
}]);
