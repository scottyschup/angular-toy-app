Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
}

var app = angular.module('toy-app', []);

app.controller('BodyCtrl', $scope => {
  $scope.colors = ['red', 'blue', 'purple', 'black', 'white'];
  $scope.$on('Change:background', (_ev, color) => {
    $scope.bgColor = 'on-' + color;
  });
  $scope.$on('Change:text', (_ev, color) => {
    $scope.color = color;
  });
  $scope.randomColors = () => {
    $scope.bgColor = 'on-' + $scope.colors.sample();
    $scope.color = $scope.colors.sample();
  }
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

app.filter('pretty', function () {
  return function (word) {
    return word.split('-').join(' ');
  };
});
