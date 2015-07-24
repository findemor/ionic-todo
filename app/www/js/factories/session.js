app.factory('SessionFactory', ['$window', '$rootScope', '$http', 'Base64', function($window, $rootScope, $http, Base64) {


  function getBasicAuth(user)
  {
    var authdata;
    //if (_sessionFactory.checkSession()) user = _sessionFactory.getSession();
    if (user && user._id && user.password)
      authdata = Base64.encode(user._id + ':' + user.password);

    return authdata;
  }

  var _sessionFactory = {
    createSession: function(user) {
      $rootScope.authktd = true;
        $http.defaults.headers.common.Authorization = 'Basic ' + getBasicAuth(user);
      return $window.localStorage.user = JSON.stringify(user);
    },
    getSession: function(user) {
      return JSON.parse($window.localStorage.user);
    },
    deleteSession: function() {
      $http.defaults.headers.common.Authorization = '';
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
