app.factory('SessionFactory', ['$window', '$rootScope', function($window, $rootScope) {

  var _sessionFactory = {
    createSession: function(user) {
      $rootScope.authktd = false;
      return $window.localStorage.user = JSON.stringify(user);
    },
    getSession: function(user) {
      return JSON.parse($window.localStorage.user);
    },
    deleteSession: function() {
      delete $window.localStorage.user;
      $rootScope.authktd = false;
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
