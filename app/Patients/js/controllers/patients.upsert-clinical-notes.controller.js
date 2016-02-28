(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientUpsertClinicalNotesCtrl', PatientUpsertClinicalNotesCtrl);

    PatientUpsertClinicalNotesCtrl.$inject = ['$scope', '$stateParams', '$state', 'Patient', 'Account'];

    function PatientUpsertClinicalNotesCtrl($scope, $stateParams, $state, Patient, Account) {
        var user = Account.getAuthenticatedAccount();
        $scope.canvasEnabled = user.settings.canvasEnabled;

        $scope.clinicalNotes = $scope.$parent.clinicalNotes;
        $scope.saveBtnName = _.isEmpty($scope.clinicalNotes) ? 'Add' : 'Update';
        $scope.dialogTitle = $scope.saveBtnName + " Clinical Notes";
    }
})();