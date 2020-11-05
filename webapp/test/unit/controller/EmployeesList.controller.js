/*global QUnit*/

sap.ui.define([
	"com/yash/Assignment-7/controller/EmployeesList.controller"
], function (Controller) {
	"use strict";

	QUnit.module("EmployeesList Controller");

	QUnit.test("I should test the EmployeesList controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});