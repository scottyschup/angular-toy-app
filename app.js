Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
}

var app = angular.module('toy-app', []);

app.controller('BodyCtrl', ($interval, $scope) => {
  $scope.colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'brown'
  ];

  $scope.smoothChange = (i, j) => {
    $scope.bgColor = $scope.colors[i];
    $scope.color = $scope.colors[j];
  };

  $scope.randomColors = () => {
    var c1 = $scope.colors.sample(),
        c2 = $scope.colors.sample();
    while (c1 === c2) {
      c2 = $scope.colors.sample();
    }
    $scope.bgColor = c1;
    $scope.color = c2;
  };

  $scope.toggleAutoChange = () => {
    if ($scope.interval) {
      $interval.cancel($scope.interval);
      $scope.interval = null;
    } else {
      var i = $scope.colors.length - 1,
          j = Math.floor($scope.colors.length / 2);
      $scope.smoothChange(i, j);
      $scope.interval = $interval(() => {
        i = (i + 1) % $scope.colors.length;
        j = (j + 1) % $scope.colors.length;
        $scope.smoothChange(i, j);
      }, 2000)
    }
  };

  $scope.isAutoChanging = () => {
    return $scope.interval;
  };

  $scope.$on('Change:background', (_ev, color) => {
    $scope.bgColor = color;
  });
  $scope.$on('Change:text', (_ev, color) => {
    $scope.color = color;
  });
});

app.controller('ToyButtonCtrl', ($scope, $rootScope) => {
  $scope.changeColor = (color, colorType) => {
    $rootScope.$broadcast('Change:' + colorType, color);
  }
});

app.component('toyButton', {
  templateUrl: 'toyButton.html',
  controller: 'ToyButtonCtrl',
  bindings: {
    color: '=',
    colorType: '='
  }
});
