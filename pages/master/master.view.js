sap.ui.jsview("pages.master.master", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf pages.master.master
	*/ 
	getControllerName : function() {
		return "pages.master.master";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf pages.master.master
	*/ 
	createContent : function(oController) {
		var oTree = new sap.m.Tree("idCategoryTree", {
			toggleOpenState: [oController.onToggleOpenState, oController]
		});
		oTree.bindItems({
			path: "/",
			template: new sap.m.StandardTreeItem({
				title: "{text}",
				icon: "sap-icon://folder-blank",
				customData:[
					new sap.ui.core.CustomData("idNodeTypeCustomData", {
						key: "type",
						value: "{type}"
					}),
					new sap.ui.core.CustomData("idNodeFileNameCustomData", {
						key: "filename",
						value: "{filename}"
					}),
					new sap.ui.core.CustomData("idNodePanelForViewCustomData", {
						key: "idpanel",
						value: "{idpanel}"
					}),
					new sap.ui.core.CustomData("idNodeTableForViewCustomData", {
						key: "idtable",
						value: "{idtable}"
					})
				],
				type: sap.m.ListType.Active,
				press: [oController.onTreeItemPress, oController]
			})
		});
 		var oPage = new sap.m.Page({
			title: "{i18n>categoryPageTitle}",
			content: [
				oTree
			]
		});
 		return oPage;
	}
});