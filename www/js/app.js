// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('accountsManager', ['ionic', 'accountsManager.controllers', 'accountsManager.services', 'ngCordova', 'ionicScroller', 'jett.ionic.scroll.sista'])

.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}])
.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
      }

      if(window.cordova) {
          // App syntax
          db = $cordovaSQLite.openDB("accountManager.db");
      } else {
          // Ionic serve syntax
          db = window.openDatabase("accountManager.db", "1.0", "Accounts Manager", -1);
      }

      //$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS transactionDetails;");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS transactionDetails (id integer primary key AUTOINCREMENT, transactionId integer, categoryId integer, itemId integer, qty REAL, price REAL)");
      //$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS transactions;");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS transactions (id integer primary key AUTOINCREMENT, customerId integer, date text)");
      //$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS stockItem;");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS stockItem (id integer primary key AUTOINCREMENT, categoryid integer, itemname text, itemdesc text, itemqty integer DEFAULT 0, itemprice REAL DEFAULT 0)");
      //$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS stockCategory;");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS stockCategory (id integer primary key AUTOINCREMENT, category text, totalItems integer DEFAULT 0)");
      //$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS user;");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS user (id integer primary key AUTOINCREMENT, username text, password text)");
      //$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS customer;");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS customer (id integer primary key AUTOINCREMENT, name text, shopName text, area text, country text, mobile text,landline text)");

    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    //login and sign-up states
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.customers', {
        url: '/customers',
        views: {
            'tab-customers': {
                templateUrl: 'templates/tab-customers.html',
                controller: 'customerCtrl'
            }
        }
    })

    .state('tab.accounts', {
        url: '/accounts',
        views: {
            'tab-accounts': {
              templateUrl: 'templates/tab-accounts.html',
              controller: 'accountsCtrl'
            }
        }
    })
    /*.state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/category-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })*/

    .state('tab.stock', {
        url: '/stock',
        views: {
            'tab-stock': {
              templateUrl: 'templates/tab-stock.html',
              controller: 'stockCtrl'
            }
        }
    })
      .state('tab.category-detail', {
        url: '/stock/:categoryId',
        views: {
          'tab-stock': {
            templateUrl: 'templates/category-detail.html',
            controller: 'categoryDetailCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
