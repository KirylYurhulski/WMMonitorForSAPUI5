sap.ui.controller("pages.master.master", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf pages.master.master
*/
	onInit: function() {
		this.i18nInit();
		this.categoryTreeInit();
	},
/**
* Localization and Internationalization Init function
* @memberOf pages.master.master
*/
	i18nInit: function(){
		sap.ui.getCore().setModel(
			new sap.ui.model.resource.ResourceModel({
				bundleUrl: "i18n/i18n.properties"
			}),
			"i18n"
		);
	},
/**
* Init functiom for Tree Categories
* @memberOf pages.master.master
*/
	categoryTreeInit: function(){
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("models/categories.json");
		var oTree = sap.ui.getCore().byId("idCategoryTree");
		oTree.setModel(oModel);
	},
/**
* @memberOf pages.master.master
*/
	onToggleOpenState: function(oEvent){
		var aItems = sap.ui.getCore().byId("idCategoryTree").getItems();
		var iItemIndex = oEvent.getParameter("itemIndex");
		var oItem = sap.ui.getCore().byId(aItems[iItemIndex].sId);
		if (oItem){
			if (oEvent.getParameter("expanded")) {
				oItem.setIcon("sap-icon://open-folder");
			}else{
				oItem.setIcon("sap-icon://folder-blank");
			}
		}
	},
/**
* 
* @memberOf pages.master.master
*/
	onTreeItemPress: function(oEvent){
		var sItemId = oEvent.getParameter("id");
		var aCustomData = sap.ui.getCore().byId(sItemId).getCustomData();
		if (aCustomData.length){
			var sTitle = sap.ui.getCore().byId(sItemId).getTitle();
			var oController = sap.ui.getCore().byId('idMasterPage').getController();
			var sType;
			var sFileName;
			var sIdPanel;
			var sIdTable;
			for (var i = 0; i < aCustomData.length; i++) {
				switch(aCustomData[i].getKey()){
					case "type":{
						sType = aCustomData[i].getValue();
						break;
					}
					case "filename":{
						sFileName = aCustomData[i].getValue();
						break;
					}
					case "idpanel":{
						sIdPanel = aCustomData[i].getValue();
						break;
					}
					case "idtable":{
						sIdTable = aCustomData[i].getValue();
						break;
					}
				}
			}
			oController.displayTable( sTitle, sFileName, sIdPanel, sIdTable, sType);		}
	},
/**
* @memberOf pages.master.master setHeaderText
*/
	displayTable: function(sTitle, sModelPath, idPanel, idTable, sItemNodeCustomValue){
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData(sModelPath);
		sap.ui.getCore().byId(idPanel).addContent(
			sap.ui.getCore().byId(idTable).setModel(
				oModel
			).addCustomData(			
				new sap.ui.core.CustomData("idSelNodeTypeCustomData", {
						key: "idNodeType",
						value: sItemNodeCustomValue
				})
			).setHeaderText(sTitle)
		);
	}
});