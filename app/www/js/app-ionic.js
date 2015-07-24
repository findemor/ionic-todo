// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic']);

app.run(function($ionicPlatform, $rootScope, $ionicLoading, $location, $timeout, SessionFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // System events
  document.addEventListener("resume", resume, false);

  function resume() {
      $rootScope.$apply(function() {
          $rootScope.$broadcast('onResumeCordova');
      });
  };


  $rootScope.authktd = false;

  $rootScope.showLoading = function(msg) {
    $ionicLoading.show({
      template: msg || 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  }

  $rootScope.hideLoading = function() {
    $ionicLoading.hide();
  };

  $rootScope.toast = function(msg) {
    $rootScope.showLoading(msg);
    $timeout(function() {
      $rootScope.hideLoading();
    }, 2999);
  };

  $rootScope.logout = function() {
    SessionFactory.deleteSession();
    $location.path('/login');
  }

  function openApp() {
    $rootScope.authktd = SessionFactory.checkSession();
    if ($rootScope.authktd)
      $location.path('/home');
    else
      $location.path('/login');
  }

  openApp();


});
