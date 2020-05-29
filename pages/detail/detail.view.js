sap.ui.jsview("pages.detail.detail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf twopageapp.first
	*/ 
	getControllerName : function() {
		return "pages.detail.detail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf twopageapp.first
	*/ 
	createContent : function(oController) {
		var oHeadersTable = new sap.m.Table("idHeadersTable", {
			mode: sap.m.ListMode.MultiSelect,
			columns: [
				new sap.m.Column({
					header: new sap.m.Label({
						text: "{i18n>documentNumber}"
					})
				}),
				new sap.m.Column({
					header: new sap.m.Label({
						text: "{i18n>documentCategory}"
					})
				}),
				new sap.m.Column({
					header: new sap.m.Label({
						text: "{i18n>documentDescription}"
					})
				}),
			]
		}).bindItems({
			path: "/",
			template: new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({
						text: "{docno}"
					}),
					new sap.m.Text({
						text: "{doccat}"
					}),
					new sap.m.Text({
						text: "{description}"
					}),
				]
			})
		});	
		var oItemsTable = new sap.m.Table("idItemsTable", {
			columns: [
				new sap.m.Column({
					header: new sap.m.Label({
						text: "{i18n>documentNumber}"
					})
				}),
				new sap.m.Column({
					header: new sap.m.Label({
						text: "{i18n>documentItemNumber}"
					})
				}),
				new sap.m.Column({
					header: new sap.m.Label({
						text: "{i18n>documentCategory}"
					})
				}),
				new sap.m.Column({
					header: new sap.m.Label({
						text: "{i18n>product}"
					})
				}),
				new sap.m.Column({
					header: new sap.m.Label({
						text: "{i18n>batchno}"
					})
				}),
			]
		}).bindItems({
			path: "/",
			template: new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({
						text: "{docno}"
					}),
					new sap.m.Text({
						text: "{itemno}"
					}),
					new sap.m.Text({
						text: "{doccat}"
					}),
					new sap.m.Text({
						text: "{matnr}"
					}),
					new sap.m.Text({
						text: "{charg}"
					}),
				]
			})
		});		
 		var oPage = new sap.m.Page({
			content: [
				new sap.ui.layout.Splitter("idDetailScreenSplitter", {
					orientation: sap.ui.core.Orientation.Vertical,
					contentAreas: [
						new sap.m.Panel("idHeadersPanel", {
							headerToolbar: new sap.m.Toolbar({
								content: [
									new sap.m.Button("idShowPositionButton", {
										icon: "sap-icon://activity-items",
										text: "{i18n>showPositionButtonText}",
										press: [oController.onShowPositionPress, oController]
									})
								]
							})
						}),
						new sap.m.Panel("idItemsPanel")
					]
				})
			]
		});
 		return oPage;
	}
});