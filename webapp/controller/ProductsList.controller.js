sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/core/UIComponent",
	"com/yash/Assignment-7/model/formatter"
], function (Controller, JSONModel, Fragment, UIComponent, formatter) {
	"use strict";

	return Controller.extend("com.yash.Assignment-7.controller.ProductsList", {
		formatter: formatter,
		onInit: function () {
			UIComponent.getRouterFor(this).getRoute("RouteProductsList").attachMatched(this._onRouteMatched, this);

		},
		_onRouteMatched: function (oEvent) {
			this.getView().bindElement("/" + oEvent.getParameter("arguments").data);
		},
		goBack: function () {
			UIComponent.getRouterFor(this).navTo("RouteCategoryList");
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
		handleActionPress: function () {
			this._oPopover.close();
		},
		getDialogFragment: function (oDialogName) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.yash.Assignment-7.fragments." + oDialogName, this.getView().getController());
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
		onProductListItemPress: function (oEvent) {
			var path = oEvent.getSource().getBindingContextPath();
			this.getDialogFragment("ProductInfoDisplay").bindElement(path);
			this.getDialogFragment("ProductInfoDisplay").open();
		},
		onCloseDialog: function () {
			this.getDialogFragment("ProductInfoDisplay").close();
		}

	});

});