sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Sorter",
	"sap/ui/core/UIComponent"
], function (Controller, JSONModel, Fragment, Sorter, UIComponent) {
	"use strict";

	return Controller.extend("com.yash.Assignment-7.controller.CategoryList", {

		onInit: function () {

		},
		goBack: function () {
			UIComponent.getRouterFor(this).navTo("RouteEmployeesList");
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
		handleSortButtonPressed: function () {
			this.openSettingDialog("SortCategoryList").open();
		},
		openSettingDialog: function (oDialogName) {
			return sap.ui.xmlfragment("com.yash.Assignment-7.fragments." + oDialogName, this);
		},
		handleSortDialogConfirm: function (oEvent) {
			var oList = this.byId("categoryList"),
				mParams = oEvent.getParameters(),
				oBinding = oList.getBinding("items"),
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
		showTotalRecords: function (oEvent) {
			this.getView().byId("totalRecords").setText("Total Records : " + oEvent.getParameter("total"));
		},
		onCategoryListItemPress: function (oEvent) {
			UIComponent.getRouterFor(this).navTo("RouteProductsList", {
				data: oEvent.getParameter("listItem").getBindingContextPath().substr(1)
			});

		}
	});

});