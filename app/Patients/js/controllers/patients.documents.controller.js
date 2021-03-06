(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsDocumentsCtrl', PatientsDocumentsCtrl);

    PatientsDocumentsCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account', 'ngDialog', '$stateParams'];

    function PatientsDocumentsCtrl($scope, Patient, $state, $rootScope, Account, ngDialog, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        Initialize();

        $scope.upsertDocuments = UpsertDocuments;
        $scope.openDocument = OpenDocument;
        $scope.uploader = {};

        function Initialize() {
            $scope.sortType = ''; // set the default sort type
            $scope.sortReverse = false;  // set the default sort order
            GetDocuments();
        }

        function UpsertDocuments(index) {
            $scope.document = {};
            $scope.document.date = new Date();
            $scope.readOnly = false;//Show Save button as its editable view
            var upsertDocumentDialog = ngDialog.open({
                template: 'Patients/partials/patients.upsert-document.html',
                className: 'ngdialog-theme-default custom-width-1',
                scope: $scope,
                showClose: false,
                closeByEscape: false,
                closeByDocument: false,
                controller: 'PatientUpsertDocumentsCtrl'
            });
//
            upsertDocumentDialog.closePromise.then(function (data) {
                if (data.value == "Add" || data.value == "View") {
                    //Save the data..
                    SaveDocument('Document', "userDcoument");
                }
            });
        }

        function OpenDocument(documentObj) {
            //Get Patient Details from server and populate patient object..
            Patient.getDocumentById({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userDcoument',
                did: documentObj.did,
                columnsToGet: ""
            }, function (response) {
                $scope.document = response;
                $scope.readOnly = true;//Do Not Save button as its read only view
                ngDialog.open({
                    template: 'Patients/partials/patients.upsert-document.html',
                    className: 'ngdialog-theme-default custom-width-1',
                    scope: $scope,
                    showClose: false,
                    closeByEscape: false,
                    closeByDocument: false,
                    controller: 'PatientUpsertDocumentsCtrl'
                });
            });
        }

        function SaveDocument(section, detailType) {
            if (angular.isUndefined($scope.patient.patientId)) {
                //if patient has not been created yet, then show an alert..
                $scope.showAlert = true;
                $scope.section = section;
                $scope.alertMessage = "Please create Patient before saving " + section + "!";
                $scope.alertClass = "alert-danger";
                return;
            }
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $scope.patient.patientId,
                detailType: detailType,
                userDocument: $scope.document
            };

            $scope.myPromise = Patient.upsertDocument(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving Patient's " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = "Patient's " + section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                    //Refresh the Documents section from backend only when success is there..
                    GetDocuments();
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function GetDocuments() {
            Patient.getDocuments({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userDcoument',
                columnsToGet: "did,date,documentName,tag"
            }, function (response) {
                $scope.documentsList = response;
            });
        }
    }
})();