var gameApp = angular.module('gameApp', []);
gameApp.controller('GameController', function($scope){
$scope.rows = [[0,0,0],[0,0,0],[0,0,0]];

  var turn = true;
  var clicks = 0;
  var win = false;
  var draw = false;

// switches players
  $scope.playerTurn = function(r, c) {
    if($scope.rows[r][c] === 0) {
      clicks++;
      console.log(clicks);
      // O
      if(turn === true){
        $scope.rows[r][c] = 1;
        value = 1;
        turn = false;
    }
    // X
      else
      {
        $scope.rows[r][c] = -1;
        value = -1;
        turn = true;
      }
    }
    else {
      alert("Pick Another One or Chuck Norris Will Roundhouse Kick You");
      }
    // Win possibilities
    if(Math.abs($scope.rows[0][0] + $scope.rows[0][1] + $scope.rows[0][2]) == 3)
      {$scope.playerWon($scope.rows[0][0]);
      win = true;}
    if(Math.abs($scope.rows[1][0] + $scope.rows[1][1] + $scope.rows[1][2]) == 3)
      {$scope.playerWon($scope.rows[1][0]);
      win = true;}
    if(Math.abs($scope.rows[2][0] + $scope.rows[2][1] + $scope.rows[2][2]) == 3)
      {$scope.playerWon($scope.rows[2][0]);
       win = true;}
    if(Math.abs($scope.rows[0][0] + $scope.rows[1][0] + $scope.rows[2][0]) == 3)
      {$scope.playerWon($scope.rows[0][0]);
      win = true;}
    if(Math.abs($scope.rows[0][1] + $scope.rows[1][1] + $scope.rows[2][1]) == 3)
      {$scope.playerWon($scope.rows[0][1]);
      win = true;}
    if(Math.abs($scope.rows[0][2] + $scope.rows[1][2] + $scope.rows[2][2]) == 3)
      {$scope.playerWon($scope.rows[0][2]);
      win = true;}
    if(Math.abs($scope.rows[0][0] + $scope.rows[1][1] + $scope.rows[2][2]) == 3)
      {$scope.playerWon($scope.rows[0][0]);
      win = true;}
    if(Math.abs($scope.rows[0][2] + $scope.rows[1][1] + $scope.rows[2][0]) == 3)
      {$scope.playerWon($scope.rows[0][2]);
       win = true;}
    if (clicks === 9 && !win)
        alert("Cats Game Sucka!");
  };
  // alert winner
  $scope.playerWon = function(player) {
    // ternary operator: condition(col == 1) then if value is true "O" else value if false
    alert( ((player === 1)?"Chuck Norris" : "The World") + " won! ");
  };
 $scope.reset = function () {
    $scope.rows = [[0,0,0],[0,0,0],[0,0,0]];
    var turn = true;
    var clicks = 0;
    var win = false;
    var draw = false;
  };
});