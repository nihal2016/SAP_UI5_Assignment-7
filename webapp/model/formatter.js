sap.ui.define([], function () {
	"use strict";

	var res;
	var formattedDate;
	return {
		date: function (sStatus) {
			res = null;
			formattedDate = "";

			res = sStatus.toString().split(" ");
			for (var i = 0; i < 4; i++) {
				formattedDate += res[i] + " ";
			}
			return formattedDate;

		},
		discontinued: function (dStatus) {
			if (dStatus)
				return "Available";
			else
				return "Discontinued";
		}
	};
});