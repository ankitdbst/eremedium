(function() {
  'use strict'

  angular.module('ERemediumWebApp.prescriptions.routes')

  .config([
    '$stateProvider',

    function($stateProvider) {
      $stateProvider

      .state('PrescriptionIndex', {
        url: '/patients/:patientId/prescriptions',
        templateUrl: 'Prescriptions/partials/prescriptions.index.html',
        controller: 'PrescriptionIndexCtrl',
        params: {
            autoActivateChild: 'PrescriptionIndex.List'
        }
      })
      .state('PrescriptionIndex.List', {
        templateUrl: 'Prescriptions/partials/prescriptions.list.html',
        controller: 'PrescriptionListCtrl'
      })
      .state('PrescriptionIndex.Detail', {
        url: '/:prescriptionId',
        templateUrl: 'Prescriptions/partials/prescriptions.detail.html',
        controller: 'PrescriptionDetailCtrl'
      })
      .state('PrescriptionOrder', {
        url: '/patients/:patientId/prescriptions/order/:prescriptionId',
        templateUrl: 'Prescriptions/partials/prescriptions.order.html',
        controller: 'PrescriptionOrderCtrl'
      })
      .state('PrescriptionOrder.PatientNewOrEditAddress', {
        url: '/new-address',
        templateUrl: 'Patients/partials/patients.edit-address.html',
        controller: 'PatientNewOrEditAddressCtrl'
      })
      .state('PrescriptionOrderStatus', {
        url: '/patients/:patientId/prescriptions/order/status/:prescriptionId',
        templateUrl: 'Prescriptions/partials/prescriptions.order-status.html',
        controller: 'PrescriptionOrderStatusCtrl'
      });
    }
  ]);
}) ();
