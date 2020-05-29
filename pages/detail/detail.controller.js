sap.ui.controller("pages.detail.detail", {
/**
* Synchronous requests model in method loadData with parameter FALSE
* @memberOf pages.detail.detail
*/
	onShowPositionPress: function(oEvent){
		var oHeadersTable = sap.ui.getCore().byId("idHeadersTable");
		var aCustomData = sap.ui.getCore().byId("idSelNodeTypeCustomData");
		var oHeadSelectedItems = oHeadersTable.getSelectedItems();
		var oData = [];
		if (oHeadSelectedItems.length){
			var oItemModel = new sap.ui.model.json.JSONModel();
			switch(aCustomData.getValue()){
				case "PDO headers": {
					oItemModel.loadData("models/pdo/items.json", "", false);
					break;
				}
				case "PDI headers": {
					oItemModel.loadData("models/pdi/items.json", "", false);
					break;
				}			
			};
			oData = sap.ui.getCore().byId('idDetailPage').getController().filterItemForHead(oHeadSelectedItems, oItemModel);			
		}else{
			sap.m.MessageToast.show("Необходимо выделить документ");
		}
		sap.ui.getCore().byId("idItemsPanel").addContent(
			sap.ui.getCore().byId("idItemsTable").setModel(
				new sap.ui.model.json.JSONModel(oData)
			).setHeaderText(
				sap.ui.getCore().getModel("i18n").getProperty("tablePositionHeaderText")
			)
		);
	},
/**
* Filtering Items For Selected Head Data
* @memberOf pages.detail.detail
*/
	filterItemForHead: function(oHeadSelectedItems, oItemModel){
		var oData = [];
		for (var i = 0; i < oHeadSelectedItems.length; i++) {
			var sDocno = oHeadSelectedItems[i].getBindingContext().getProperty("docno");
			for (var j = 0; j < oItemModel.oData.length; j++) {
				if (sDocno == oItemModel.oData[j].docno) {
					oData.push(oItemModel.oData[j]);
				}
			}
		}
		return oData;
	}
});