(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
  .controller('PrescriptionUpsertMedicineCtrl', PrescriptionUpsertMedicineCtrl);

  PrescriptionUpsertMedicineCtrl.$inject = ['$scope', '$stateParams', '$state', 'Prescription', 'Account'];

  function PrescriptionUpsertMedicineCtrl($scope, $stateParams, $state, Prescription, Account) {
    var user = Account.getAuthenticatedAccount();

    $scope.frequencies = ['Daily', 'Weekly', 'Monthly', 'Custom'];
    $scope.dispenseUnits = ['Tablet', 'Bottle', 'Injection'];
    $scope.dosageUnits = ['tablet', 'ml', 'mg'];
    $scope.instructions = [
      'After Breakfast',
      'After Defecation',
      'After Dinner',
      'After Lunch',
      'After Meals',
      'At Bed Time',
      'Before Breakfast',
      'Before Dinner',
      'Before Lunch',
      'Before Meals',
      'In Between Food',
      'On Empty Stomach',
      'With Hot Water',
      'With Milk',
      'With Warm Water',
      'With Water'
    ];
    $scope.days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    $scope.times = ['Morning', 'Afternoon', 'Night'];

    $scope.favorites = [
      'Crocin',
      'Glycomed',
      'Disprin',
      'Combiflam',
      'Asprin',
      'Zandu Bam',
      'Digene'
    ];

    $scope.saveBtnName = _.isEmpty($scope.medcine) ? 'Add' : 'Update';
    $scope.dialogTitle = $scope.saveBtnName + " Medicine";

    Init();

    function Init() {
      $scope.medcine = $scope.$parent.medcine;
      $scope.medcine.frequency = $scope.medcine.frequency || {};
      $scope.medcine.frequency.freq = $scope.medcine.frequency.freq || $scope.frequencies[0];
      $scope.medcine.frequency.dType = $scope.medcine.frequency.dType || $scope.dosageUnits[0];
    }

    $scope.search = SearchMedicine;
    $scope.next = AddNext;

    function SearchMedicine(searchText) {
      var params = {
        user        : user.mobile,
        sessionId   : user.sessionId,
        doctorId    : user.userId,
        searchText  : searchText,
        limit       : 5,
        columnsToGet: ""
      };
      $scope.myPromise = Prescription.searchMed(params).$promise;
      return Prescription.searchMed(params).$promise;
    }

    function AddNext() {
      $scope.$parent.prescription.medcines.push($scope.medcine);
      $scope.$parent.medcine = {};
      Init();
    }
  }

}) ();