// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.services', 'ionic-datepicker', 'ionic-timepicker', 'ionic-multiselect'])

.run(function($ionicPlatform, $rootScope, MainService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    document.addEventListener("offline", onOffline, false);
    function onOffline() {
       $rootScope.connectionStatus = false;
    }  

    document.addEventListener("online", onOnline, false);
    function onOnline() {
        $rootScope.connectionStatus = true;
        //sync unsynced checklists
        MainService.syncChecklists();

    }    
    
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.checklist', {
    url: '/checklist',
    views: {
      'tab-checklist': {
        templateUrl: 'templates/tab-checklist.html',
        controller: 'ChecklistCtrl'
      }
    }
  })

  .state('tab.history', {
      url: '/history',
      views: {
        'tab-history': {
          templateUrl: 'templates/tab-history.html',
          controller: 'HistoryCtrl'
        }
      }
    })
    .state('tab.history-detail', {
      url: '/history/:historyId',
      views: {
        'tab-history': {
          templateUrl: 'templates/history-detail.html',
          controller: 'HistoryDetailCtrl'
        }
      }
    })
    .state('tab.history-draft-detail', {
      url: '/history/draft/:historyId',
      views: {
        'tab-history': {
          templateUrl: 'templates/history-draft-detail.html',
          controller: 'HistoryDraftDetailCtrl'
        }
      }
    })    



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/checklist');

})


.constant('API_URL', 'http://aggchecklist.taylorhamling.com/index.php?key=n3jk42n3kdnsfjsnfjn345j')

;
