StorageController.$inject = ['$scope', 'storageService']

export default function StorageController($scope, storage) {
  $scope.storage = storage;
  $scope.watch(storage, (n, o) => {
    storage.update();
  })
}
