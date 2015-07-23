app.factory('SessionFactory', ['$window', function($window) {

  var _sessionFactory = {
    createSession: function(user) {
      return $window.localStorage.user = JSON.stringify(user);
    },
    getSession: function(user) {
      return JSON.parse($window.localStorage.user);
    },
    deleteSession: function() {
      delete $window.localStorage.user;
      return true;
    },
    checkSession: function() {
      if ($window.localStorage.user) {
        return true;
      } else {
        return false;
      }
    }
  };

  return _sessionFactory;

}]);
