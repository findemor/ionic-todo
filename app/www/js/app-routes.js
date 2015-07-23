app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: '/templates/signup.html',
      controller: 'SignupCtrl'
    })

    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'HomeCtrl'
    })

    .state('new', {
      url: '/new',
      templateUrl: '/templates/new.html',
      controller: 'NewTodoCtrl'
    })
    ;

  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/login');


});
