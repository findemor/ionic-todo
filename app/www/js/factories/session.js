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
      $window.localStorage.user = JSON.stringify(user)
      return this.autoLogin();
    },
    getSession: function(user) {
      return JSON.parse($window.localStorage.user);
    },
    deleteSession: function() {
      delete $window.localStorage.user;
      return !this.autoLogin();
    },
    checkSession: function() {
      if ($window.localStorage.user) {
        return true;
      } else {
        return false;
      }
    },
    autoLogin: function() {
      if (this.checkSession())
      {
        var user = this.getSession();
        $http.defaults.headers.common.Authorization = 'Basic ' + getBasicAuth(user);
        $rootScope.authktd = true;
      } else {
        $http.defaults.headers.common.Authorization = '';
        $rootScope.authktd = false;
      }
      return $rootScope.authktd;
    }
  };

  return _sessionFactory;

}]);
