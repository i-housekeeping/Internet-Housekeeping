
DashboardPanel = function(config){

	Ext.apply(this, config);
	//var rightpanel = 0.17;
	

	this.tools = [{
		id:'gear',
		handler: function(){
		    	Ext.Msg.alert('Message', 'The Settings tool was clicked.');
			}
	    },{
		id:'close',
		handler: function(e, target, panel){
		    panel.ownerCt.remove(panel, true);
		}
    	}];

	this.accountsSummary = new AccountsPanel(config);
	this.cashrecordsSummary = new CahrecordsPanel();
		
	this.chart_store = new Ext.data.Store({
            proxy: new Ext.ux.CssProxy({ url: tx.data.tasklists_con.graphics_url }),
            reader: new Ext.data.JsonReader({
		            root: 'Graphics',
		            fields: [
							{name: 'category', type: 'string'},
							{name: 'amount', type: 'float'} ]
		        })
        });

	this.chart_store.load({
		params: {
			format: 'jsonc',
			type : 'categories'
		},
        callback: function()
        {
                Ext.getCmp('chart').onLoadCallback();
        }
	});

	this.chartPanel = new Ext.ux.GVisualizationPanel({
	    id: "chart",
	    width: 450,
	    height: 300,
	    visualizationPkg: "piechart",         
	    visualizationCfg: {is3D: true, title : 'Budget Spread'},  
	    store: this.chart_store,
	    columns: [{
				      dataIndex: "category",
				      label: "category"
			      },{
				      dataIndex: "amount",
				      label: "amount"
			    }]
	  });
	 
	 
	  
	 this.cash_store = new Ext.data.GroupingStore({
            proxy: new Ext.ux.CssProxy({ url: tx.data.cashrecords_con.url }),
            reader: new Ext.data.JsonReader({
            root: 'Cashrecords',
            fields: [
						{name: 'date', mapping : 'date' , type:'date', dateFormat: "Y-m-d"},
					    {name: 'debit', type:'float'},
					    {name: 'credit', type:'float'},
						{name: 'details', type: 'string'}
					]
        		}),
            sortInfo:{field: 'date', direction: "ASC"}
        });

		this.cash_store.load({
			params: {
				format: 'jsonc'
			},
            callback: function()
            {
                    Ext.getCmp('timeline').onLoadCallback();
            }
		});	

	   this.vpanel = new Ext.ux.GVisualizationPanel({
								    id: 'timeline',
									visualizationPkg: {'annotatedtimeline': 'AnnotatedTimeLine'},
									visualizationCfg: {
										allowHtml: true,
										displayAnnotations: true,
										displayExactValues: true,
										height: 200,
									    width: 500,
										wmode: 'transparent'
									},
									//title: 'Greatest DJIA Daily Point Gains',
									store: this.cash_store,
									height: 300,
									width: 600,
									columns: [
										{
											dataIndex: 'date',
											label: 'Date'
										},
										{
											dataIndex: 'debit',
											label: 'Debit'
										},
										{
											dataIndex: 'credit',
											label: 'Credit'
										},										
										{
											dataIndex: 'details'
										}
									]

                    });
	
	
	

	DashboardPanel.superclass.constructor.call(this, {
		id:'dashboard',
        title: 'Dashboard',
        autoScroll:true,
		layout:'border',
		listeners: {activate: this.handleActivate},
		items:
			{
			  xtype:'portal',
			  region:'center',
			  width : config.viewwidth,
			  margins:'1 1 1 1',
			  id:'dashboard_main',
			  items:[{
					columnWidth: 0.45,
					style:'padding:5px 5px 5px 5px',
					items:[{
							title: 'Accounts summary',
							layout:'fit',
							iconCls:'accounts-icon',
							tools: this.tools,
							items : [this.accountsSummary]
						},{
							title: 'Comapany Current Balance',
							tools: this.tools,
							layout:'fit',
							autoScroll: true,            
        					items : [this.chartPanel],
							bbar : [new Ext.Button({id: 'soemthing', text : 'test'})]
						}
						
					]
				},{
					columnWidth: 0.55,
					style:'padding:5px 5px 5px 0px',
					items:[{
							title: 'Categories usage',
							layout:'fit',
							id : 'vpanel',
							tools: this.tools,
							items: [this.vpanel]
						},{
							title: 'Cashrecords summary',
							layout:'fit',
							tools: this.tools,
							iconCls:'cashrecord-icon',
							items : this.cashrecordsSummary
						}
						]
				}
			  ]
			}
    });
	
};

Ext.extend(DashboardPanel, Ext.Panel,{
	
	handleActivate : function(tab){			
			//this.accountsSummary.loadRecords();
			this.cashrecordsSummary.loadRecords();
			//this.categoriesSummary.loadData("pie");
			this.cash_store.load({
			params: {
				format: 'jsonc'
			}
			});	
			//this.chartPanel.doLayout();
	        //this.vpanel.doLayout();
			
			//if(Ext.getCmp('timeline') == null)
			//	Ext.getCmp('vpanel').add(this.vpanel);
			//else
				//Ext.getCmp('timeline').onLoadCallback();

			this.cash_store.load({
				params: {
					format: 'jsonc'
				},
	            callback: function()
	            {
	                    Ext.getCmp('timeline').onLoadCallback();
	            }
	
			});	
			
			this.chart_store.load({
				params: {
					format: 'jsonc',
					type : 'categories'
				},
		        callback: function()
		        {
		                Ext.getCmp('chart').onLoadCallback();
		        }
			});
			tab.doLayout();
	}
});



CashflowPanel = function(config){

	Ext.apply(this, config);
	this.winconfig = config.winconfig;
	var leftpanel = 0.07;
	var rightpanel = 0.2;
	////////////////////////////////////////////////////////////////////////////
	// Central part of the Tab Cashflow grid and bottom tab
	this.combo = new Ext.form.ComboBox({
		store: new Ext.data.SimpleStore({
			fields: ['state', 'state_name'],
			data : [['ACTV','Cashrecords in Active status'],
					['ARCH','Archived'],
					['BLNC','Balanced'],
					['INVS','Investigation']]
		    }),
		displayField:'state_name',
		valueField : 'state',
		hiddenName : 'state_name',
		typeAhead: true,
		mode: 'local',
		triggerAction: 'all',
		emptyText:'Show me please...',
		selectOnFocus:true,
		//width : this.winconfig.width*0.2
	});

	var dateMenu = new Ext.menu.DateMenu({
		handler : function(dp, date){
			//Ext.example.msg('Date Selected', 'You chose {0}.', date.format('M j, Y'));

			this.store.baseParams = {
					start_day:this.start_date.format('Y-m-d')
			};
			this.store.load();
		}
	});

	
	var menu = new Ext.menu.Menu({
        id: 'mainMenu',
        items: ['<b class="x-toolbar x-small-editor">Cashflow Menu</b>','-',
            {
                text: 'Balance Sheet',
                checked: true,
                group: 'cashrecords'
            },{
                text: 'FX Calculator',
                checked: true,
                group: 'cashrecords',
				handler : function() {
					var win = new Ext.Window({
						id : 'fx_converter',
						title : 'FX Converter',
						items : {
							xtype:'iframepanel',
							layout:'fit',
							defaultSrc:'http://www.hsbcnet.com/treasury/fxcalc-disp',
							loadMask:true,
							border:false,
							split:true,
							height : Ext.getCmp('cashrecords').winconfig.height*0.8,
							
							//width: leftpanel*config.viewwidth,
							//minSize: leftpanel*config.viewwidth,
							//maxSize: leftpanel*config.viewwidth,
							collapsible: true,
							autoScroll:true,
							loadMask:{msg:'Loading FX Converter...'}
						}
						
					});
					win.show();
				}
            }
          ]
    	});

	var grid = new BloneyCashrecords.Grid(this,{
		width : (1.0 - (leftpanel+rightpanel))*config.viewwidth,
		region : 'center',
		tbar: [{
				    text: 'Pay Money',
					iconCls : 'cashrecord-minus-icon',
				    tooltip: {text:'Account Payable, Expences and etc. ', title:'Pay Money', autoHide:true},
				    cls: 'x-btn-text-icon blist',
					width:100,
				    menu:{
						id:'reading-menu',
						cls:'reading-menu',
						//width:100,
						items: [						
							{
								text: 'Debit',
								handler: function () {
									Ext.getCmp('cashrecords').addCashrecord("debit")
								}
							},{
								text: 'Direct Debit',
								handler: function () {
									Ext.getCmp('cashrecords').addCashrecord("direct debit")
								}
							},{
								text: 'Expected Debit',
								handler: function () {
									Ext.getCmp('cashrecords').addCashrecord("expected debit")
								}
							}]
						}
				},{
				    text: 'Receive Money',
					iconCls : 'cashrecord-plus-icon',
				    tooltip: {text:'Account receivable and etc.', title:'Receive Money', autoHide:true},
				    cls: 'x-btn-text-icon blist',
					width:100,
				    menu:{
						id:'reading-menu',
						cls:'reading-menu',
						//width:100,
						items: [
							{
								text: 'Credit',
								handler: function () {
									Ext.getCmp('cashrecords').addCashrecord("credit")
								}
							},{
								text: 'Direct Credit',
								handler: function () {
									Ext.getCmp('cashrecords').addCashrecord("direct credit")
								}
							},{
								text: 'Expected Credit',
								handler: function () {
									Ext.getCmp('cashrecords').addCashrecord("expected credit")
								}
							}]
						}
			},'-',{
				text:'Previous Month',
				iconCls : 'cashrecord-prev-icon',
				handler: function() {
					Ext.getCmp('cashrecordsgrid').start_date.setMonth(Ext.getCmp('cashrecordsgrid').start_date.getMonth() - 1) ;
					Ext.getCmp('cashrecordsgrid').loadRecords(Ext.getCmp('cashrecordsgrid').start_date,'ACTV');
				}
			},{
				text:'Current Month',
				iconCls : 'cashrecord-now-icon',
				handler: function() {
					var now = new Date();
					Ext.getCmp('cashrecordsgrid').loadRecords(now,'ACTV');
				}
			},{
				text:'Next Month',
				iconCls : 'cashrecord-next-icon',
				handler: function() {
					Ext.getCmp('cashrecordsgrid').start_date.setMonth(Ext.getCmp('cashrecordsgrid').start_date.getMonth() + 1) ;
					Ext.getCmp('cashrecordsgrid').loadRecords(Ext.getCmp('cashrecordsgrid').start_date,'ACTV');
				}
			},'->',{
				iconCls : 'export-icon',
				text:'Start of Month Amount',
				handler : function(){
					Ext.getCmp('cashrecordsgrid').getSelectionModel().selectFirstRow();
				}
			},new Ext.form.TextField({
				id: 'smtotalmnthamount',
				width:150,
				
				disabled :true,
				disabledClass : 'align-right',
				emptyText:'0.00'})],
		bbar: [{
		            cls: 'x-btn-text-icon bmenu', // icon and text class
		            text:'Cashrecords Menu',
					iconCls : 'cashrecord-icon',
		            menu: menu  // assign menu by instance
		        },
			{
				text:'Show Cashrecords by ',
				iconCls : 'cashrecord-refresh-icon'
			},
			'-',this.combo, '->',
			{
				iconCls : 'import-icon',
				text:'End of Month Amount',
				handler : function(){
					Ext.getCmp('cashrecordsgrid').getSelectionModel().selectLastRow();
				}
			},
			new Ext.form.TextField({
				id: 'emtotalmnthamount',
				width:150,
				
				disabled :true,
				disabledClass : 'align-right',
				emptyText:'0.00'})			
		]
	});

	this.combo.on('select', function c(record, index) {
          //Ext.example.msg('Cashrecord filter', 'Selected filter "{0}" for cashrecords.',index.data.state);
		  Ext.getCmp('cashrecordsgrid').loadRecords('', index.data.state);
 	});

	

	////////////////////////////////////////////////////////////////////////////
	// West part of the Tab reports, alerts and categories
	// Shared actions used by Ext toolbars, menus, etc.
	var actions = {
		newList: new Ext.Action({
			itemText: 'New List',
			tooltip: 'New List',
			iconCls: 'icon-list-new',
			handler: function(){
				var id = tx.data.categorylists.newList(false, tree.getActiveFolderId(),'CATEGORY','').id;
				tree.startEdit(id, true);
			}
		}),

		deleteList: new Ext.Action({
			itemText: 'Delete',
			tooltip: 'Delete List',
			iconCls: 'icon-list-delete',
			disabled: true,
			handler: function(){
				tree.removeList(tree.getSelectionModel().getSelectedNode());
			}
		}),

		newFolder: new Ext.Action({
			itemText: 'New Folder',
			tooltip: 'New Folder',
			iconCls: 'icon-folder-new',
			handler: function(){
				var id = tx.data.categorylists.newList(true, tree.getActiveFolderId(),'CATEGORY','').id;
				tree.startEdit(id, true);
			}
		}),

		deleteFolder: new Ext.Action({
			itemText: 'Delete',
			tooltip: 'Delete Folder',
			iconCls: 'icon-folder-delete',
			disabled: true,
			handler: function(s){
				tree.removeList(tree.getSelectionModel().getSelectedNode());
			}
		}),

		quit : new Ext.Action({
			text: 'Exit',
			iconCls: 'icon-exit',
			handler: function(){
				win.close();
			}
		})
	};
	tx.actions = actions;

    var tree = new ListTree({
			id : 'bloney-tree',
			actions: actions,
			store: tx.data.categorylists,
			title:'Budget Categories',
			border	: true,
			region:'west',
			width:200,
			collapseMode	: 'mini',
			bbar : [
						tx.actions.newList, 
						tx.actions.deleteList, 
						'-', 
						tx.actions.newFolder,
						tx.actions.deleteFolder
					]
		});

	var root = tree.getRootNode();	

	var listSm = tree.getSelectionModel();

	tx.data.categorylists.bindTree(tree);
	
	tx.data.categorylists.on('update', function(){
		//tx.data.categorylists.applyGrouping();
		//if(grid.titleNode){
		//	grid.setTitle(grid.titleNode.text);
		//}
	});


	CashflowPanel.superclass.constructor.call(this, {
		id:'cashrecords',
		title: 'Cashflow',
		autoScroll:true,
		layout:'border',
		listeners: {activate: this.handleActivate},
        	items:[tree, grid  ]
    });

	root.listType = 'CATEGORY';
	root.text = "Ecco Categories";
	tx.data.categorylists.init(tree,root);
	tx.data.cashrecords.init();
	tree.root.select();
	
	var loadList = function(listId){
		var node = tree.getNodeById(listId);
		if(node && !node.isSelected()){
			node.select();
			return;
		}
		actions.deleteList.setDisabled(!node || !node.attributes.editable);
		actions.deleteFolder.setDisabled(!node || node.attributes.editable === false || !node.attributes.isFolder);
		if(node){
			if (node.attributes.isFolder) {
				//var lists = [];
				//node.cascade(function(n){
				//	if (!n.attributes.isFolder) {
				//		lists.push(n.attributes.id);
				//	}
				//});
				//tx.data.tasks.loadList(lists);
			}
			else {
				//tx.data.collaborates.loadItem(node.id);
				//if (tx.data.collaborates.getAt(0) != null)
				//	addTab(tx.data.collaborates.getAt(0).data.link_to, tx.data.collaborates.getAt(0).data.link_to);	
			}
			//grid.titleNode = node;
			//grid.setTitle(node.text);
			//grid.setIconClass(node.attributes.iconCls);
		}
	}

	listSm.on('selectionchange', function(t, node){
		//loadList();
		Ext.getCmp('cashrecordsgrid').filterByCategory( node.leaf ? node.id : '');
	});
	
};

Ext.extend(CashflowPanel, Ext.Panel,{

	
	handleActivate : function(tab){	
		Ext.getCmp('bloney-tree').getRootNode().reload();	
		Ext.getCmp('cashrecordsgrid').loadRecords();
		tab.doLayout();
	},
	
	addCashrecord : function(record_type){
		
		if (Ext.getCmp('tabs_toolbar') != null && Ext.getCmp('tabs_toolbar').getActiveTab().getId() == 'cashrecords') {
			
			var position  = Ext.getCmp('cashrecordsgrid').getTopToolbar().getPosition();
			var y_offset = Ext.getCmp('cashrecordsgrid').getTopToolbar().getSize().height;
			var y_height = Ext.getCmp('cashrecordsgrid').getSize().height;
			var x_width = Ext.getCmp('cashrecordsgrid').getSize().width;
			var x_offset = Ext.getCmp('cashrecordsgrid').getColumnModel().getColumnById('date').width;
		
			var cashrecordsWin = new BloneyCashrecords.MainWnd(detailsconfig); //Ext.getCmp('wndcashrecords') == null ? new BloneyCashrecords.MainWnd(detailsconfig) : Ext.getCmp('wndcashrecords');
		
			cashrecordsWin.setPosition(position[0]+x_offset, position[1] + y_offset);
			cashrecordsWin.setSize({
				width: x_width - x_offset,
				height: y_height - 2 * y_offset
			});
			cashrecordsWin.show();
			
			var now = new Date();
			Ext.getCmp('template').setValue(record_type);
			Ext.getCmp('dr_value_date').setValue(now.format('Y-m-d'));
			Ext.getCmp('cr_value_date').setValue(now.format('Y-m-d'));
			Ext.getCmp('startdate').setValue(now.format('Y-m-d'));
			if((record_type.indexOf("direct")>= 0))
			{
				Ext.getCmp('splitfileds').expand(true);
				Ext.getCmp('cashrecordsform').form.setValues([ {id:'amount', value:'0.00'}]);
				
			}
			else
			{
				Ext.getCmp('splitfileds').collapse(true);
				Ext.getCmp('cashrecordsform').form.setValues([
										  {id:'repetition', value:''},
										  {id:'numpayments', value:'1'},
										  {id:'totalamount', value:'0.00'}
							]);
			}
	    	
		}
	}
});


BankingPanel = function(config){
	
	Ext.apply(this, config);
	var leftpanel = 0.6;
	this.grid = new BankingGrid({width : (1.0 - leftpanel)*config.viewwidth });

	BankingPanel.superclass.constructor.call(this, {
		id:'banking',
        title: 'Banking',
        autoScroll:true,
		layout:'border',
		listeners: {activate: this.handleActivate},
        items:[
        	this.grid ,
		{
			title: 'Bank',
			xtype:'iframepanel',
			region:'west',
			layout:'fit',
			iconCls: 'icon-house_16',
			defaultSrc:'http://www.leumi.co.il',
			loadMask:true,
			border:false,
			split:true,
			width: leftpanel*config.viewwidth,
			minSize: leftpanel*config.viewwidth,
			maxSize: leftpanel*config.viewwidth,
			collapsible: true,
			autoScroll:true,
			loadMask:{msg:'Loading Bank Site...'}
		}
        ]
    });
};

Ext.extend(BankingPanel, Ext.Panel,{

	handleActivate : function(tab){
		
		Ext.getCmp('banking').grid.loadRecords();
		tab.doLayout();
	}
});





BloneyTabPanel = function(config){
	
	Ext.apply(this, config);

	this.global_config = config;
	
	//this.current_title = Ext.get('tab_name').dom.getAttribute('title');
	
	var dashboard = new DashboardPanel(config);
	
	var cashrecords = new CashflowPanel(config); //{	title : 'Cashflow',	xstatus : 'init',	listeners: {activate: this.handleActivate}	};
	
	var banking = new BankingPanel(config);
	
    BloneyTabPanel.superclass.constructor.call(this, {
		region:'center',
		id: 'tabs_toolbar',
		activeTab: 0,//Ext.get('tab_name').dom.getAttribute('tab_index'),
        layoutOnTabChange : true,
		margins:'0 0 0 0',
		resizeTabs:true,
		tabWidth:150,
		minTabWidth: 120,
		enableTabScroll: true,
		deferredRender:false
		,items:[dashboard,cashrecords,banking ]
	 });
	
	//if(tab = Ext.get("dashboard") != null) 	{ this.add(new DashboardPanel(config));	}
	
	//if(tab = Ext.get("cashflow") != null)	{ this.add(new CashflowPanel(config));	}
	
	//if(tab = Ext.get("banking") != null)    { this.add(new BankingPanel(config));  }
	
};

Ext.extend(BloneyTabPanel, Ext.TabPanel, {

    handleActivate : function(tab){	
			if(tab.xstatus && tab.xstatus ==  'init')
			{
				if(tab.title == 'Cashflow')
				{
					Ext.getCmp('tabs_toolbar').remove(tab);
					Ext.getCmp('tabs_toolbar').add(new CashflowPanel(Ext.getCmp('tabs_toolbar').global_config));
				}
			}
				
			
			tab.doLayout();		
	},
		
	addTabLayout : function(config){
        var tab;
        if(!(tab = this.getItem(id))){
            tab = new Ext.Panel(config);
            this.add(tab);
        }
        //this.setActiveTab(tab);
    },

    updateStyle : function(){

    	this.items.each(function(item){
    			item.el.setStyle("font-size","90%");
    	    });
    }
});




/*
 * Comet Desktop
 * Copyright (c) 2008 - David W Davis, All Rights Reserved
 * xantus@cometdesktop.com     http://xant.us/
 * http://code.google.com/p/cometdesktop/
 * http://cometdesktop.com/
 *
 * License: GPL v3
 * http://code.google.com/p/cometdesktop/wiki/License
 *
 * Comet Desktop is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License
 *
 * Comet Desktop is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Comet Desktop.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Comet Desktop is a fork of qWikiOffice Desktop v0.7.1
 *
 * -----
 *
 * Ext JS Library
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 *
 * http://extjs.com/license
 *
 */

QoDesk.Bloney = Ext.extend(Ext.app.Module, {

	moduleType : 'app',
	moduleId : 'bloney',
	
	init : function(){		
		this.launcher = {
			handler: this.createWindow,
			iconCls: 'bloney-icon',
			scope: this,
			shortcutIconCls: 'Bloney-shortcut',
			text: 'About',
			tooltip: '<b>Bloney - Blog your Money</b>'
		}
	},

	createWindow : function(){
		var win = app.desktop.getWindow('bloney-win');
		Ext.QuickTips.init();
		if (!win) {
			
			var balance_date = new Date();
			
			
			var winconfig = {
				maximizable : true,
				collapsible : true,
				width:  app.desktop.getWinWidth()*0.85,
				height: app.desktop.getWinHeight()*0.85,
				minWidth: 300,
				minHeight: 200,
				border : true,
				plain : true,
				shadow : true,
				layout : 'border',
				xbloney : 'default',
				closable:true,
				resizable : true,
				split : true,
				balance_date: balance_date.format('%Y-%m-%d'),
				mycompany_id : Cookies.get('mycomapny_id')
			};
			
			var config = {
				viewheight : app.desktop.getWinHeight()*0.85,
				viewwidth : app.desktop.getWinWidth()*0.85,
				activeTab : 0,
				notification_timeout : 15000000,
				winconfig : winconfig
			};
			var bloneyTabs =  new BloneyTabPanel(config);
		    var bloneyToolbar = new BloneyToolbar(config);
			
            win = app.desktop.createWindow({
                title: 'Bloney - Blog your Money',
                id: 'bloney-win',
                layout:'border',
                width:  app.desktop.getWinWidth()*0.95,
                height: app.desktop.getWinHeight()*0.85,
                iconCls: 'bloney-icon',
                bodyStyle:'color:#000',
                plain: true,
                items: [bloneyToolbar , bloneyTabs]
            });
			
			Ext.getCmp('bloneytoolbar').render('bloney_header');
			Ext.getCmp('bloneytoolbar').renderToolbar();
		
			Ext.getCmp('tabs_toolbar').el.select(".x-tab-strip-text").setStyle("font-size","110%");
			Ext.getCmp("tabs_toolbar").el.select(".x-tab-strip-text").setStyle("font-weight","bold");
        }
		win.show();
    }

});
