sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/yash/Assignment-7/model/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Sorter",
	"sap/ui/core/UIComponent"
], function (Controller, formatter, JSONModel, Fragment, Sorter, UIComponent) {
	"use strict";

	var employeeModel;
	var totalRecords;
	return Controller.extend("com.yash.Assignment-7.controller.EmployeesList", {
		formatter: formatter,
		onInit: function () {
			employeeModel = new JSONModel();
			employeeModel.loadData("model/employees.json");
			this.getView().byId("employeesListTable").setModel(employeeModel);

		},
		countTotalEmployees: function () {
			totalRecords = employeeModel.getProperty("/EmployeesData").length;
			this.getView().byId("totalRecords").setText("Total Records : " + totalRecords);
		},
		showLoggedInUserDetails: function (oEvent) {
			var oButton = oEvent.getSource();
			var oEmployeeModel = new JSONModel();
			oEmployeeModel.setData({
				"EmployeeInfo": [{
					Name: "Nihal Pandey",
					YashEmail: "nihal.pandey@yash.com",
					Id: "1",
					Designation: "Trainee Programmer",
					EmployeeId: "1010246"
				}]
			});

			Fragment.load({
				name: "com.yash.Assignment-7.fragments.EmployeeInfoDisplay",
				controller: this
			}).then(function (pPopover) {
				this._oPopover = pPopover;
				this.getView().addDependent(this._oPopover);
				this._oPopover.setModel(oEmployeeModel);
				this._oPopover.bindElement("");
				this._oPopover.openBy(oButton);
			}.bind(this));
		},
		showLanguages: function (oEvent) {

			var oButton = oEvent.getSource();
			var oLanguageModel = new JSONModel();
			oLanguageModel.setData({
				"Languages": [{
					language: "Germany"
				}, {
					language: "US"
				}, {
					language: "UK"
				}, {
					language: "India"
				}, {
					language: "France"
				}]
			});

			Fragment.load({
				name: "com.yash.Assignment-7.fragments.Languages",
				controller: this
			}).then(function (pPopover) {
				this._oPopover = pPopover;
				this.getView().addDependent(this._oPopover);
				this._oPopover.setModel(oLanguageModel);
				this._oPopover.bindElement("");
				this._oPopover.openBy(oButton);
			}.bind(this));
		},
		getDialogFragment: function (oDialogName) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.yash.Assignment-7.fragments." + oDialogName, this.getView().getController());
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
		onCloseDialog: function () {
			this.getDialogFragment("CreateUser").close();
		},
		addUser: function (oEvent) {
			this.getDialogFragment("CreateUser").open();
		},
		saveUser: function (oEvent) {
			var employee = {
				EmployeeID: employeeModel.getProperty("/EmployeesData")[totalRecords - 1].EmployeeID + 1,
				FirstName: sap.ui.getCore().byId("FirstName").getValue(),
				LastName: sap.ui.getCore().byId("LastName").getValue(),
				Title: sap.ui.getCore().byId("Title").getValue(),
				BirthDate: sap.ui.getCore().byId("BirthDate").getValue(),
				Address: sap.ui.getCore().byId("Address").getValue(),
				City: sap.ui.getCore().byId("City").getValue(),
				Region: sap.ui.getCore().byId("Region").getValue(),
				PostalCode: sap.ui.getCore().byId("PostalCode").getValue(),
				Country: sap.ui.getCore().byId("Country").getValue(),
				HomePhone: sap.ui.getCore().byId("HomePhone").getValue(),
				Extension: sap.ui.getCore().byId("Extension").getValue(),
				HireDate: sap.ui.getCore().byId("HireDate").getValue()
			};

			var modelData = employeeModel.getProperty("/EmployeesData");
			modelData.push(employee);
			employeeModel.setData({
				EmployeesData: modelData
			});
			this.getView().byId("employeesListTable").setModel(employeeModel);

		},
		showEdit: function () {
			this.getView().byId("deleteUser").setVisible(true);
			this.getView().byId("toggelEditButton").setVisible(false);
			this.getView().byId("employeesListTable").setMode("MultiSelect");
		},
		deleteUser: function (oEvent) {
			var oTable = this.getView().byId("employeesListTable");
			var tableRows = employeeModel.getData().EmployeesData;
			var aContexts = oTable.getSelectedContexts();

			for (var i = aContexts.length - 1; i >= 0; i--) {
				var tableRow = aContexts[i].getObject();
				var index = $.map(tableRows, function (obj, index) {
					if (obj === tableRow) {
						return index;
					}
				});
				tableRows.splice(index, 1);
			}
			employeeModel.setData({
				EmployeesData: tableRows
			});
			this.getView().byId("deleteUser").setVisible(false);
			this.getView().byId("toggelEditButton").setVisible(true);
			this.getView().byId("toggelEditButton").setPressed(false);
			this.getView().byId("employeesListTable").setMode("None");

			this.getView().byId("employeesListTable").setModel(employeeModel);
		},
		handleSortButtonPressed: function () {
			this.openSettingDialog("SortEmployeeListTable").open();
		},
		openSettingDialog: function (oDialogName) {
			return sap.ui.xmlfragment("com.yash.Assignment-7.fragments." + oDialogName, this);
		},
		handleSortDialogConfirm: function (oEvent) {
			var oTable = this.byId("employeesListTable"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				aSorters = [];

			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));
			oBinding.sort(aSorters);
		},
		handleActionPress: function () {
			this._oPopover.close();
		},
		onNext: function (oEvent) {
			UIComponent.getRouterFor(this).navTo("RouteCategoryList");
		}
	});
});