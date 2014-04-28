// ["firebase"] is dependency injection
var gameApp = angular.module('gameApp', ["firebase"]);
gameApp.controller('GameController', function($scope, $firebase){
  var ticTacRef = new Firebase("https://tictacchucknorris.firebaseio.com/game");

  var playerNum = 1;

      var lastGame;
      // Ask for all existing game info from firebase
      ticTacRef.once('value', function(gamesSnapshot) {
        clicks = 0;
        win = false;
        // get the actual games data
        var games = gamesSnapshot.val();
        if(games == null)
        {
          // No games at all, so make a new game -- As if we're Areg
          lastGame = ticTacRef.push( {waiting: true} );
          playerNum = 1;
        }
        else  // I do have at least one game out there...
        {
          var keys = Object.keys(games);
          var lastGameKey = keys[ keys.length - 1 ];
          var lastGame = games[ lastGameKey ];
          console.log("This person's game: " + lastGameKey);
          if(lastGame.waiting)
          {
            // Currently someone is waiting
            // Grab from Firebase its last game object
            lastGame = ticTacRef.child(lastGameKey);
            // Set a new game with the below set
            lastGame.set( {
              waiting: false,
              clicks: 0,
              win: false,
              draw: false,
              rows: [[0,0,0],[0,0,0],[0,0,0]]
            }
            );
            playerNum = 2;
          }
          else
          {
            // Make a new game
            lastGame = ticTacRef.push( {waiting: true} );
            playerNum = 1;
          }
        }
        // Attach the last game to what we're up to, converts game so firebase can understand the javascript
        $scope.game = $firebase(lastGame);
      });
// switches players
  $scope.playerTurn = function(r, c) {
    if ($scope.game.rows[r][c] === 0) {
      $scope.game.clicks++;
      //Chuck
      if ($scope.game.clicks%2!==0)
      {
          $scope.game.rows[r][c] = 1;
      }
    // World
      else
      {
        $scope.game.rows[r][c] = -1;
      }
    }
    else {
      alert("Pick Another One or Chuck Norris Will Roundhouse Kick You");
    }
    // Win possibilities
    if(Math.abs($scope.game.rows[0][0] + $scope.game.rows[0][1] + $scope.game.rows[0][2]) == 3)
      {$scope.playerWon($scope.game.rows[0][0]);
      $scope.game.win = true;}
    if(Math.abs($scope.game.rows[1][0] + $scope.game.rows[1][1] + $scope.game.rows[1][2]) == 3)
      {$scope.playerWon($scope.game.rows[1][0]);
      $scope.game.win = true;}
    if(Math.abs($scope.game.rows[2][0] + $scope.game.rows[2][1] + $scope.game.rows[2][2]) == 3)
      {$scope.playerWon($scope.game.rows[2][0]);
       $scope.game.win = true;}
    if(Math.abs($scope.game.rows[0][0] + $scope.game.rows[1][0] + $scope.game.rows[2][0]) == 3)
      {$scope.playerWon($scope.game.rows[0][0]);
      $scope.game.win = true;}
    if(Math.abs($scope.game.rows[0][1] + $scope.game.rows[1][1] + $scope.game.rows[2][1]) == 3)
      {$scope.playerWon($scope.game.rows[0][1]);
      $scope.game.win = true;}
    if(Math.abs($scope.game.rows[0][2] + $scope.game.rows[1][2] + $scope.game.rows[2][2]) == 3)
      {$scope.playerWon($scope.game.rows[0][2]);
      $scope.game.win = true;}
    if(Math.abs($scope.game.rows[0][0] + $scope.game.rows[1][1] + $scope.game.rows[2][2]) == 3)
      {$scope.playerWon($scope.game.rows[0][0]);
      $scope.game.win = true;}
    if(Math.abs($scope.game.rows[0][2] + $scope.game.rows[1][1] + $scope.game.rows[2][0]) == 3)
      {$scope.playerWon($scope.game.rows[0][2]);
       $scope.game.win = true;}
    if ($scope.game.clicks === 9 && !$scope.game.win)
        alert("Cats Game Sucka!");

      $scope.game.$save();
  };
  // alert winner
  $scope.playerWon = function(player) {
    // ternary operator: condition(col == 1) then if value is true "O" else value if false
    // alert( ((player === 1)?"Chuck Norris" : "The World") + " won! ");
  };
 $scope.reset = function () {
    $scope.game.rows = [[0,0,0],[0,0,0],[0,0,0]];
    $scope.game.waiting = false;
    // $scope.game.turn = false;
    $scope.game.clicks = 0;
    $scope.game.win = false;
    $scope.game.draw = false;
    $scope.game.$save();
  };
});