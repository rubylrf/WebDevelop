// Test
describe("ItemListController:", function() {
  var $scope, $httpBackend;

  beforeEach(module('ToyotaTCheck'));
  beforeEach(module('ToyotaTCheck.controllers.ItemListController'));
  beforeEach(module('ToyotaTCheck.services.ItemList'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('./backend/checklist.json').
      respond([{"id": 5022,"title": "Introduction","type": "category","items": [{"id": "5022_0","title": "Model year","value": 2007,"status": "na"}, {"id": "5022_1","title": "Version information","type": "subsub-category","value": "1.0.0","status": "","items": [{"id": "5022_1_0","title": "Release date","value": "20/03/2014","status": "flag"}]}]}, {"id": 5023,"title": "Features","type": "category","items": [{"id": "5023_0","title": "Exterior features","type": "sub-category","status": "","items": [{"id": "5023_0_0","title": "See through roof","value": "Lorem","status": ""}, {"id": "5023_0_1","title": "Solar powered roof panel","value": "Lorem","status": "flag"}, {"id": "5023_0_3","title": "Doors","value": "Lorem","type": "subsub-category","status": "","items": [{"id": "5002_0_3_1","title": "door type","value": "Lorem","status": "na"}, {"id": "5002_0_3_2","title": "door close system","value": "Lorem","status": "flag"}, {"id": "5002_0_3_3","title": "electric doors","value": "Lorem","status": ""}]}]}]}]);
    
    $scope = $rootScope.$new();
    
    $controller('ItemListController', {
      $scope: $scope
    });
  }));

  it('should get correct categories from backend', function() {
    expect($scope.categories).toEqual([]);
    $httpBackend.flush();
    expect($scope.categories).toEqual([{"id": 5022,"title": "Introduction","type": "category","items": [{"id": "5022_0","title": "Model year","value": 2007,"status": "na"}, {"id": "5022_1","title": "Version information","type": "subsub-category","value": "1.0.0","status": "","items": [{"id": "5022_1_0","title": "Release date","value": "20/03/2014","status": "flag"}]}]}, {"id": 5023,"title": "Features","type": "category","items": [{"id": "5023_0","title": "Exterior features","type": "sub-category","status": "","items": [{"id": "5023_0_0","title": "See through roof","value": "Lorem","status": ""}, {"id": "5023_0_1","title": "Solar powered roof panel","value": "Lorem","status": "flag"}, {"id": "5023_0_3","title": "Doors","value": "Lorem","type": "subsub-category","status": "","items": [{"id": "5002_0_3_1","title": "door type","value": "Lorem","status": "na"}, {"id": "5002_0_3_2","title": "door close system","value": "Lorem","status": "flag"}, {"id": "5002_0_3_3","title": "electric doors","value": "Lorem","status": ""}]}]}]}]);
  });

  it('should set correct default values', function() {
    expect($scope.itemStatus).toBe('all');

    expect($scope.loadingOverlay).toEqual({
      isShow: 0
    });
    
  });
});
