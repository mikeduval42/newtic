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
      if(turn === true){
        $scope.rows[r][c] = 1;  // O
        value = 1;
        turn = false;
    }
      else
      {
        $scope.rows[r][c] = -1; // X
        value = -1;
        turn = true;
      }
    }
    else {
      alert("pick another one dummie");
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
        //draw = true;
      //}
  };

  // alert winner
  $scope.playerWon = function(player) {
    // if (draw === true) {
    //   //alert("Cats Game Sucka!");
    // }
    // else {
    alert( ((player === 1)?"O" : "X") + " won! ");

  };
});