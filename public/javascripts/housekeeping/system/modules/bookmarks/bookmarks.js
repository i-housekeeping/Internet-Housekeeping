
Bookmarks.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
    	
		Bookmarks.SearchField.superclass.initComponent.call(this);
		this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },

    validationEvent:false,
    validateOnBlur:false,
    trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
    hideTrigger1:true,
    width:180,
    hasSearch : false,
    paramName : 'query',

    onTrigger1Click : function(){
        if(this.hasSearch){
        	
			this.el.dom.value = '';
            this.triggers[0].hide();
            this.hasSearch = false;
			this.focus();
			Ext.getCmp('bookmarks-tree').getRootNode().reload();
        }
    },

    onTrigger2Click : function(){
        var v = this.getRawValue();
        if(v.length < 1){
            this.onTrigger1Click();
            return;
        }
		if(v.length < 2){
			Ext.Msg.alert('Invalid Search', 'You must enter a minimum of 2 characters to search the Bookmark');
			return;
		}
		var criteria = Ext.getCmp('search-type').getValue();
		if(criteria.length == 0){
			Ext.Msg.alert('Invalid Search', 'You must enter a search criteria');
			return;
		}
		
		var nodes = Ext.getCmp('bookmarks-tree').nodeHash;
		
		var listIds = "";
		tx.data.collaborates.findBy(function(record){
			if( (record.get(criteria).indexOf(v)!= -1) && 
				(listIds.indexOf(record.get('listId')) == -1))
			{
				listIds = listIds + record.get('listId') + ";";
			}
		});
		
		for(var i in nodes){
			if(i != "root" && nodes[i].attributes.leaf == true && 
				(listIds.indexOf(nodes[i].attributes.id) == -1)){				
				nodes[i].ui.hide();
			};
		}       
	    this.hasSearch = true;
        this.triggers[0].show();
		this.focus();
		
    }
});


 


Bookmarks.GridFavorits = function(config){
	Ext.apply(this, config);
	var book_app = app.getModule('bookmarks');
	
	var orig_width = Ext.getCmp('tabPanel').getBox().width-10;
	var orig_height = Ext.getCmp('tabPanel').getBox().height-30;
	
	this.comboxcategories = new ListSelector({
        id: 'bookmarkslistcombo',
        store : tx.data.collaboratelists,
		listenForLoad: true,
		width: orig_width*0.2,
		displayField : 'listName',
		root_listType:'COLLABORATE',
		root_text: "Ecco Bookmarks"
    });
	
	this.columns =[
			{
				id:'node',
				header: "List Name",
				dataIndex: 'listName',
				width: orig_width*0.2, 
				editor: this.comboxcategories
			},{
				id:'title',
				header: "Title",
				dataIndex: 'title',
				width: orig_width*0.2,
				editor: new Ext.form.TextField({
					allowBlank: false
				})
			},{
				id:'url',
				header: "URL address",
				dataIndex: 'link_to',
				width: orig_width*0.2,
				editor: new Ext.form.TextField({
					allowBlank: true
				})
			},{
				id:'authentication_type',
				header: "Authentication",
				dataIndex: 'auth_type',
				width: orig_width*0.2,
				renderer: this.formatDate
				, editor: new Ext.form.TextField({
					allowBlank: true
				})
			}
		];

	this.selmodel = new Ext.grid.RowSelectionModel({
				singleSelect:true
		});	
			
	Bookmarks.GridFavorits.superclass.constructor.call(this, {
		store: tx.data.collaborates,
		sm : this.selmodel,
		id : 'bookmarksgrid',
		columns: this.columns,
        frame:true,
		clicksToEdit:1,
		autoExpandColumn:'url',
		stripeRows: true,
		height : orig_height,
		tbar: ['->',{
						text : 'Delete',
						iconCls:'delete-contacts-icon',
						handler : function (){
							
							var sel = Ext.getCmp('bookmarksgrid').getSelectionModel().getSelected();
							if (sel) {
								Ext.Ajax.request({
									url: tx.data.collaborates_con.destroy_remote_url,
									scriptTag: true,
									callbackParam: 'jsoncallback',
									timeout: 10,
									params: {
										format: 'js',
										collaborateId: sel.data.collaborateId
									},
									success: function(r){
										this.publish('/desktop/notify', {
											title: 'Bookmarks Collaborate',
											iconCls: 'bookmarks-icon',
											html: r.responseObject.notice
										});
									},
									failure: function(r){
										this.publish('/desktop/notify', {
											title: 'Bookmarks Collaborate',
											iconCls: 'bookmarks-icon',
											html: r.responseObject.notice
										});
									},
									scope: this
								});
							}
							tx.data.collaborates.init();
							Ext.getCmp('bookmarksgrid').reload();
							Ext.getCmp('tabPanel').activeTab.doLayout();
						}		
				},'-',{
						text : 'Archive',
						iconCls:'archive-contacts-icon',
						disabled : true,
						handler : function (){
							var sel = Ext.getCmp('bookmarksgrid').getSelectionModel().getSelected();
							if (sel) {
								Ext.Ajax.request({
									url: tx.data.collaborates_con.update_remote_url,
									scriptTag: true,
									callbackParam: 'jsoncallback',
									timeout: 10,
									params: {
										format: 'js',
										collaborateId: sel.data.collaborateId,
										task: 'archive'
									},
									success: function(r){
										this.publish('/desktop/notify', {
											title: 'Bookmarks Collaborate',
											iconCls: 'bookmarks-icon',
											html: r.responseObject.notice
										});
									},
									failure: function(r){
										this.publish('/desktop/notify', {
											title: 'Bookmarks Collaborate',
											iconCls: 'bookmarks-icon',
											html: r.responseObject.notice
										});
									},
									scope: this
								});
							}
							tx.data.collaborates.init();
							Ext.getCmp('bookmarksgrid').reload();
							Ext.getCmp('tabPanel').activeTab.doLayout();
						}		
					},{
						text : 'Restore',
						iconCls:'restore-contacts-icon',
						disabled : true,
						handler : function (){
							var sel = Ext.getCmp('bookmarksgrid').getSelectionModel().getSelected();
							if (sel) {
								Ext.Ajax.request({
									url: tx.data.collaborates_con.update_remote_url,
									scriptTag: true,
									callbackParam: 'jsoncallback',
									timeout: 10,
									params: {
										format: 'js',
										collaborateId: sel.data.collaborateId,
										task: 'restore'
									},
									success: function(r){
										this.publish('/desktop/notify', {
											title: 'Bookmarks Collaborate',
											iconCls: 'bookmarks-icon',
											html: r.responseObject.notice
										});
									},
									failure: function(r){
										this.publish('/desktop/notify', {
											title: 'Bookmarks Collaborate',
											iconCls: 'bookmarks-icon',
											html: r.responseObject.notice
										});
									},
									scope: this
								});
							}
							tx.data.collaborates.init();
							Ext.getCmp('bookmarksgrid').reload();
							Ext.getCmp('tabPanel').activeTab.doLayout();
						}		
					}]
	});
	
	this.on('afteredit', this.handleEdit, this);
	this.on('validateedit', this.validEdit, this);
};

Ext.extend(Bookmarks.GridFavorits, Ext.grid.EditorGridPanel, {
	handleEdit: function(editEvent) {
	
				Ext.Ajax.request({
					    url: tx.data.collaborates_con.update_remote_url,
					    scriptTag: true,
					    callbackParam: 'jsoncallback',
					    timeout: 10,
							params: {
								format: 'js',
								collaborate : Ext.util.JSON.encode(editEvent.record.data)
					    },
					    success: function(r) {
							  this.publish( '/desktop/notify',{
						            title: 'Bookmarks Collaborate',
						            iconCls: 'bookmarks-icon',
						            html: r.responseObject.notice
						        });
					    },
					    failure : function(r) {
					       this.publish( '/desktop/notify',{
						            title: 'Bookmarks Collaborate',
						            iconCls: 'bookmarks-icon',
						            html: r.responseObject.notice
						        });
					    },
					    scope: this
			    });
				
				tx.data.collaborates.init();
				Ext.getCmp('bookmarksgrid').reload();
				Ext.getCmp('tabPanel').activeTab.doLayout();
				
				return true;
	},
	
	validEdit: function(e){
		if (e.field == "listName") {
			e.record.data.listId = e.value;
			e.value = tx.data.collaboratelists.getName(e.value);
		}
	},
	
	reload: function(){
		tx.data.collaborates.init();
	}
});

Bookmarks.AboutWindow = Ext.extend(Ext.Window, {
	// Prototype Defaults, can be overridden by user's config object

	id: 'winAbout'
	, title: '- About'
	, iconCls: 'help'
	, modal: true

	, layout: 'fit'

	, height: '300'
	, width: '350'

	, closeAction: 'hide'

	, plain: true
	, bodyStyle: 'color:#000'

	, aboutMessage :	'aboutMessage'
	//, moduleAboutURL :	'system/modules/bookmarks/about/about.txt'

	, helpMessage :		'helpMessage'
	, moduleHelpURL :	'system/modules/bookmarks/about/help.txt'

	, moduleCreditsURL :	'system/modules/bookmarks/about/credits.txt'

	, moduleReadmeURL :	'system/modules/bookmarks/about/readme.txt'

	, moduleLicenseURL :	'system/modules/bookmarks/about/license.txt'
	// Other License Options.
	//, moduleLicenseURL	: '../../license.txt' // ExtJS License.
	//, moduleLicenseURL	: 'LICENSE.txt'       // qWikiOffice License.
	//, moduleLicenseURL	: 'system/modules/bookmarks/about/license_LGPL_v2.txt'

 
	, initComponent: function(){
		// Called during component initialization
 
		// Config object has already been applied to 'this' so properties can 
		// be overriden here or new properties (e.g. items, tools, buttons) 
		// can be added, eg:
		Ext.apply(this, {
			/*
items: new Ext.TabPanel({
				id: this.id + 'tabAboutPanel'
				, autoTabs: true
				, activeTab: 0
				, border: false
				, defaults: {
					autoScroll: true
				}
				, items: [{
*/
					id: this.id + 'tabAbout'
					, title: 'About Bookmarks'
					, bodyStyle: 'padding:5px'
					//, html: this.aboutMessage
			/*	}
				
, {
					id: this.id + 'tabHelp'
					, title: 'Help'
					, autoLoad: {
						url: this.moduleHelpURL
					}
					//, bodyStyle: 'padding:5px'
					//, html: this.helpMessage
				}
				, {
					id: this.id + 'tabCredits'
					, title: 'Credits'
					, autoLoad: {
						url: this.moduleCreditsURL
					}
				}
				, {
					id: this.id + 'tabLicense'
					, title: 'License'
					, autoLoad: {
						url: this.moduleLicenseURL
					}
				}
				, {
					id: this.id + 'tabReadme'
					, title: 'Readme.txt'
					, autoLoad: {
						url: this.moduleReadmeURL
					}
				}
				]

			})*/
		});
 
		// Before parent code
 
		// Call parent (required)
		Bookmarks.AboutWindow.superclass.initComponent.apply(this, arguments);
 
		// After parent code
		// e.g. install event handlers on rendered component
	}
 
	// Override other inherited methods 
	, onRender: function(){
		// Before parent code
 
		// Call parent (required)
		Bookmarks.AboutWindow.superclass.onRender.apply(this, arguments);
 
		// After parent code
	}
});


/*
 * qWikiOffice Desktop 1.0.0 Alpha
 * Copyright(c) 2007-2008, Integrated Technologies, Inc.
 * licensing@qwikioffice.com
 * 
 * http://www.qwikioffice.com/license
 */

QoDesk.Bookmarks = Ext.extend(Ext.app.Module, {
	
	moduleType : 'app',
	moduleId : 'bookmarks',
	
	moduleAboutURL		: '/javascripts/housekeeping/system/modules/bookmarks/about.html',
    moduleHelpURL		: 'javascripts/housekeeping/system/modules/bookmarks/about/help.txt',
	moduleCreditsURL	: 'javascripts/housekeeping/system/modules/bookmarks/about/credits.txt',
	moduleReadmeURL	    : 'javascripts/housekeeping/system/modules/bookmarks/about/readme.txt',
	moduleLicenseURL	: 'javascripts/housekeeping/system/modules/bookmarks/about/license.txt',
	moduleTitle	        : 'Bookmarks Navigateur Module',

	// The php file Default Action to call on Ext.Ajax.request.
	moduleActionPublic	: 'bookmarkPublic',
	moduleActionPrivate	: 'bookmarkPrivate',

	// Module Size Options, absolute/relative.
	//, moduleSize	: 'absolute',  // EX: 500 X 600.
	moduleSize	: 'relative',  // EX: desktop size * (.5=50% X .6=60%).

	// Currently using the 'relative' option to size the module.
	moduleHeight: '.850',
	moduleWidth	: '.950',

	// Used for a new Window option.
	widgetHeight	: '.500',
	widgetWidth	: '.500',


	// Default Bookmark Tab.
	moduleDefaultTabId	: 'Google',
	moduleDefaultTabTitle	: 'Google',
	moduleDefaultTabSrc	: 'http://www.google.com',

	// Attempting to establish language stuff.
	moduleDefaultLanguage	: 'en',

	notifyTitleSend			: 'Please wait',
	notifyMsgSendDefault	: 'Saving your Bookmark data...',
	notifyMsgSendUpdate		: 'Updating your new Title...',
	notifyMsgSendUpdateParent	: 'Updating your new Bookmark Location...',
	notifyMsgSendDelete		: 'Deleting your Bookmark data...',
	notifyMsgSendExport		: 'Getting Bookmark data for export...',

	notifyTitleReturnSuccess	: 'Success',
	notifyTitleReturnError		: 'Error',
	notifyMsgReturnErrorServer	: 'Lost connection to server',
	notifyDeleteLocalError		: 'No match Found',

	// treePanel tbar language stuff.
	treepaneltitle	: 'Bookmarks',

	treeTitle	: 'Favorites',
	treeNewFolderPrefix	: 'A Folder ',

	// tt = tooltip.
	ttTreeTitleFolderAdd 	: 'Add',
	ttTreeTextFolderAdd 	: 'Add New Folder.',

	ttTreeTitleLinkAdd	: 'Add',
	ttTreeTextLinkAdd	: 'Add New Bookmark',

	ttTreeTitleSave	: 'Save',
	ttTreeTextSave 	: 'Save New Bookmark.',

	ttTreeTitleDel 	: 'Delete',
	ttTreeTextDel 	: 'Delete Highlited Bookmark/Folder.',

	ttTreeTitleExp 	: 'Export',
	ttTreeTextExp 	: 'Export Bookmarks - Still creating this one....',

	// region north tbar language stuff.
	ttprevioustitle	: 'Previous',
	ttprevioustext	: 'Previous Page',

	ttnexttitle	: 'Next',
	ttnexttext	: 'Next Page',

	ttfavtitle	: 'Favorites',
	ttfavtext	: 'Show/Hide Favorites',

	tthometitle	: 'Home',
	tthometext	: 'Home - 1st Tab',

	ttnewtabtitle	: 'New Tab',
	ttnewtabtext	: 'Create New Bookmark and Load Tab',

	ttnewwintitle	: 'New Desktop Window',
	ttnewwintext	: 'Load Active Tab in new Desktop Window',

	ttnewwinBrowsertitle: 'New Browser Window',
	ttnewwinBrowsertext	: 'Load Active Tab in new Browser Window',

	ttrefreshtitle	: 'Refresh',
	ttrefreshtext 	: 'Refresh current Active Tab',

	ttgridtabtitle	: 'Grid Tab',
	ttgridtabtext 	: 'Grid Editor for folders.',

	ttdeltabtitle	: 'Delete Tab',
	ttdeltabtext 	: 'Delete Active Tab',

	ttclosetabtitle	: 'Close Tabs',
	ttclosetabtext	: 'Close ALL Tabs',

	ttprinttitle 	: 'Print',
	ttprinttext 	: 'Print Active Tab',
	notifyTitleSendPrint	: 'Please wait',
	notifyMsgSendPrint	: 'Attempting to Print Page ...',
	notifyMsgReturnError	: 'Sorry, Print Failure!<br />',

	ttpreftitle : 'Preferences',
	ttpreftext 	: 'Preferences',

	ttinfotitle 	: 'Information',
	ttinfotext 	: 'Information',


	// form language stuff.
	formpaneltitle	: 'Add New Favorite',

	// ff = form field Label.
	ffLabelNom		: 'Tab Title',
	ffLabelAdresse		: 'URL Address',
	ffLabelCommentaires	: 'Tags/Comments',

	formTitleAddBookmark	: 'Add New Bookmark',

	formTextAddButtonSave	: 'Save',
	formTextAddButtonCancel	: 'Cancel',

	formTitleAddSuccess	: 'Success',
	formTextAddSuccess	: 'New Bookmark Saved!',

	formTitleAddError	: 'Error',
	formTextAddError	: 'An error Occured, New Bookmark did not save?',

	init : function(){		
		this.launcher = {
			handler: this.createWindow,
			iconCls: 'bookmarks-icon',
			scope: this,
			shortcutIconCls: 'bookmarks-shortcut',
			text: 'Bookmarks',
			tooltip: '<b>Bookmarks Navigator Module</b>'
		}
	},
  

	gridTab : function() {
				
				if(!Ext.getCmp('tabPanel').getItem('bookmarks-grid'))
				{
					Ext.getCmp('tabPanel').add({
						id: 'bookmarks-grid',
						title : 'Edit Bookmarks',
						closable : true,
						items : new Bookmarks.GridFavorits()	
					});
					
				}
				Ext.getCmp('tabPanel').setActiveTab('bookmarks-grid');
	},

	
	addTab: function(tabTitle, tabUrl) {
				var tabs = Ext.getCmp('tabPanel');

				tabs.add({
					id	: tabTitle,
					title	: tabTitle,
					iconCls	: 'tabs',

					defaultSrc : tabUrl,
					xtype	: 'iframepanel',

					closable: true,
					loadMask: true,
					tbar : ['->',{
						id: 'tab-add-money',
						iconCls : 'bloney-icon',
						text : 'Add Money'
					},'-',{
						id: 'tab-add-task',
						iconCls : 'tasks-icon',
						text : 'Add Task'
					}]
				}).show();
	},

	newTab: function() {
				var tabTitle = Ext.getCmp('titlefield').getValue();
				if (tabTitle == "") {
					tabTitle = this.moduleDefaultTabTitle + (++tabIndex);
					Ext.getCmp('titlefield').setValue(tabTitle);
				};

				var tabUrl = Ext.getCmp('urlfield').getValue();
				if (tabUrl == "") {
					tabUrl = this.moduleDefaultTabSrc;
					Ext.getCmp('urlfield').setValue(tabUrl);
				};

				var tabs = Ext.getCmp('tabPanel');
				var tabExists = false;
				tabs.items.each(function(item){
					if(item.id != 'bookmarks-grid' && item.iframe.src == tabUrl){
						tabExists = true;
					};
				});

				if (tabExists) {
					Ext.getCmp('tabPanel').setActiveTab(tabTitle);
				} else {
					this.addTab(tabTitle, tabUrl);
				};
	},
	
	createWindow : function(){
		var win = app.desktop.getWindow(this.moduleId);
		var winManager = app.desktop.getManager();
		var desktop = app.desktop;
		
		if(!win){
			// --
			Ext.QuickTips.init();

			// Begin: Module Sizing.
			if (this.moduleSize == 'absolute') {
				var winHeight = parseInt(this.moduleHeight);
				var winWidth = parseInt(this.moduleWidth);
			} else {
				var winHeight = Math.round(desktop.getWinHeight() * this.moduleHeight);
				var winWidth = Math.round(desktop.getWinWidth() * this.moduleWidth);
			}
			// End: Module Sizing.

			moduleAboutHeight = Math.round(winHeight * .5);
			moduleAboutWidth = Math.round(winWidth * .5);

			// Use of Ext.ux.AboutWindow Extension.
			var winAbout = new Bookmarks.AboutWindow({
				id: 'Bookmarks-About'

				, title: this.moduleTitle + ' - About'
				, iconCls: 'icon-info'

				, modal: false
				, layout: 'fit'

				, height: 300
				, width: 350

				, closeAction: 'hide'

				, plain: true
				, bodyStyle: 'color:#000'

				//, aboutMessageURL: this.moduleAboutURL
				//, aboutMessage: '<div id="'+ this.moduleId + '-about"><img src="' + this.moduleLogoURL + '"></div><div id="' + this.moduleId + '-about-info"><b><a href="' + this.moduleLink + '" target="_blank">' + this.moduleTitle + '</a></b><br />Version: ' + this.moduleVersion + '<br />Author: ' + this.moduleAuthor + ' ' + this.moduleCopyright + ',<br /><br />Description: ' + this.moduleDescription + '<br /><br />' + this.moduleAboutMore + '</div>'
				,autoLoad : {url: this.moduleAboutURL}

				//, helpMessageURL: this.moduleHelpURL
				, helpMessage: this.moduleHelp
				, moduleCreditsURL: this.moduleCreditsURL
				, moduleReadmeURL: this.moduleReadmeURL
				, moduleLicenseURL: this.moduleLicenseURL

			});

			// set up the Bookmarks tree
			// Shared actions used by Ext toolbars, menus, etc.
			var actions = {
				newTask: new Ext.Action({
					text: 'New Task',
					iconCls: 'icon-active',
					tooltip: 'New Task',
					handler: function(node){
						//taskHeader.ntTitle.focus();
							node.select();
							//tx.data.collaborates.loadItem(node.id);
							if (tx.data.collaborates.getCount() > 0)
							{
								tx.data.collaborates.data.each(function(item){
									if (node.id == item.data.listId) {
										Ext.getCmp('titlefield').setValue(item.data.title);
										Ext.getCmp('urlfield').setValue(item.data.link_to);
										app.getModule('bookmarks').newTab();
									}
								});
								
							}
					}
				}),

				deleteTask: new Ext.Action({
					itemText: 'Delete',
					iconCls: 'icon-delete-task',
					tooltip: 'Delete Task',
					disabled: true,
					handler: function(){
						Ext.Msg.confirm('Confirm', 'Are you sure you want to delete the selected task(s)?', function(btn){
							if (btn == 'yes') {
								selections.each(function(s){
									tx.data.tasks.removeTask(s.data);
									tx.data.tasks.remove(s);
								});
							}
						});
					}
				}),

				complete: new Ext.Action({
					itemText: 'Mark Complete',
					iconCls: 'icon-mark-complete',
					tooltip: 'Mark Complete',
					disabled: true,
					handler: function(){
						selections.each(function(s){
							s.set('completed', true);
							tx.data.tasks.updateTask(s.data);
						});
						tx.data.tasks.applyFilter();
					}
				}),

				active: new Ext.Action({
					itemText: 'Mark Active',
					tooltip: 'Mark Active',
					iconCls: 'icon-mark-active',
					disabled: true,
					handler: function(){
						selections.each(function(s){
							s.set('completed', false);
							tx.data.tasks.updateTask(s.data);
						});
						tx.data.tasks.applyFilter();
					}
				}),

				newList: new Ext.Action({
					itemText: 'New List',
					tooltip: 'New List',
					iconCls: 'icon-list-new',
					handler: function(){
						var id = tx.data.collaboratelists.newList(false, tree.getActiveFolderId(),'COLLABORATE','').id;
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
						var id = tx.data.collaboratelists.newList(true, tree.getActiveFolderId(),'COLLABORATE','').id;
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
					id : 'bookmarks-tree',
					actions: actions,
					store: tx.data.collaboratelists,
					title:'Bookmarks Lists',
					border	: true,
					region:'west',
					width:200,
					collapseMode	: 'mini',
				    listeners: {
						click: function(node, e){
							node.select();
							if (tx.data.collaborates.getCount() > 0)
							{
								tx.data.collaborates.data.each(function(item){
									if (node.id == item.data.listId) {
										Ext.getCmp('titlefield').setValue(item.data.title);
										Ext.getCmp('urlfield').setValue(item.data.link_to);
										app.getModule('bookmarks').newTab();
									}
								});
								
							}							
						}
					}
				});

			var root = tree.getRootNode();	
			
			var listSm = tree.getSelectionModel();
	
    		tx.data.collaboratelists.bindTree(tree);
			tx.data.collaboratelists.on('update', function(){
				//tx.data.tasks.applyGrouping();
				//if(grid.titleNode){
				//	grid.setTitle(grid.titleNode.text);
				//}
			});
			
			var tb = new Ext.Toolbar({
				id:'main-tb',
				height:26,
				region : 'north',
				items:[
					{
						xtype: 'tbspacer'
					},{
						iconCls	: 'icon-precedent',
						tooltip	: {
							title	: this.ttprevioustitle,
							text	: this.ttprevioustext
						},
						handler	: function(){
							window.history.back();
						},
						scope	: this
					},{
						iconCls	: 'icon-suivant',
						tooltip	: {
							title	: this.ttnexttitle,
							text	: this.ttnexttext
						},
						handler	: function(){
							window.history.forward();
						},
						scope	: this
					},'-',{
						//id 	: 'refresh',
						iconCls : 'icon-refresh',
						tooltip	: {
							title	: this.ttrefreshtitle,
							text 	: this.ttrefreshtext
						},
						handler : function(){
							if(Ext.getCmp('tabPanel').activeTab.id == 'bookmarks-grid'){
								Ext.getCmp('bookmarksgrid').reload();
								Ext.getCmp('tabPanel').activeTab.doLayout();
							}else{
								Ext.getCmp('tabPanel').activeTab.iframe.setSrc();
							}
							
						},
						scope	: this
					},'-',{
						iconCls	: 'icon-favoris',
						tooltip	: {
							title	: this.ttfavtitle,
							text	: this.ttfavtext
						},
						handler	: function() {
							//Ext.getCmp('bookmarks-tree').collapse() ? Ext.getCmp('bookmarks-tree').collapse() : Ext.getCmp('bookmarks-tree').expand();
							app.getModule('bookmarks').gridTab();
						}.createDelegate(this),
						scope	: this
					},'-',{
						iconCls	: 'icon-house',
						tooltip	: {
							title	: this.tthometitle,
							text	: this.tthometext
						},
						handler	: function(btn){
							Ext.getCmp('tabPanel').setActiveTab(0);
						},
						scope	: this
					},'-',
					new Ext.form.TextField({
						id	: 'titlefield',
						value	: this.moduleDefaultTabTitle,
						//width	: 200,
						scope	: this,
						hidden : true
					}),'-',
					new Ext.form.TextField({
						id	: 'urlfield',
						value	: this.moduleDefaultTabSrc,
						width	: 500,
						scope 	: this
					}),'-',
					{
						iconCls	: 'icon-tabGo',
						tooltip	: {
							title	: this.ttnewtabtitle,
							text	: this.ttnewtabtext
						},
						handler	: this.newTab,
						scope	: this
					},'-',
					{
						iconCls: 'icon-linkGo',
						tooltip	: {
							title 	: this.ttTreeTitleLinkAdd,
							text 	: this.ttTreeTextLinkAdd
						},
						handler: function() {
							 var config = {};
							 config.current_url = Ext.getCmp('tabPanel').activeTab.iframe.src;
							 Bookmarks.Favorits.createMashupWnd(config);
						},
						scope: this
					},'-',
					{
						iconCls	: 'icon-printer',
						tooltip	: {
							title 	: this.ttprinttitle,
							text 	: this.ttprinttext
						},
						disabled : true,
						handler	: function(){
							notifyWin = desktop.showNotification({
								title 	: this.notifyTitleSendPrint,
								html	: this.notifyMsgSendPrint,
								scope 	: this
							});
							try{
								Ext.getCmp('tabPanel').activeTab.iframe.print();
							}catch(ex){
								app.getModule('bookmarks').saveComplete(this.notifyTitleReturnError, this.notifyMsgReturnError+ex);
							};
						},
						scope	: this
					},'-',
					{
						iconCls	: 'icon-about',
						tooltip	: {
							title 	: this.ttinfotitle,
							text 	: this.ttinfotext
						},
						handler : function() {
							winAbout.show();
						},
						scope 	: this
					},'->','&nbsp;&nbsp;',
					'Search: ', ' ',
                	new Ext.ux.SelectBox({
	                    listClass:'x-combo-list-small',
	                    width:90,
	                    id:'search-type',
	                    store: new Ext.data.SimpleStore({
	                        fields: ['text','dbfield'],
	                        data : [['title','title'], 
									['url','link_to']]
	                    }),
	                    displayField: 'text',
						valueField: 'dbfield',
						hiddenName: 'text',
						typeAhead: true,
						mode: 'local',
						triggerAction: 'all',
						allowBlank : true
	                }), ' ',
               		new Bookmarks.SearchField({
		                width:200,
						store: tx.data.collaboratelists,
						paramName: 'q'
		            }),{
						xtype: 'tbfill'
					}]
			});
			
			
			win = desktop.createWindow({
				id : this.moduleId,
				title	: 'Bookmarks',
				iconCls	: 'bookmarks-icon',

				width	: winWidth,
				height	: winHeight,

				constrainHeader : true,
				shim		: false,
				animCollapse	: false,

				border	: false,
				layout	: 'border',


				items:[tb ,tree,{
					region	: 'center',
					id	: 'tabPanel',
					xtype	: 'tabpanel',

					tabWidth	: 135,
					margins		: '5 5 5 5',
					bodyStyle	: 'padding: 2px;',

					deferredRender		: true,
					plugins     : new Ext.ux.TabCloseMenu(),
					plain			: true,

					layoutOnTabChange	: true,
					enableTabScroll		: true,
					closeable		: true,

					defaults : {
						border		: false,
						autoScroll	: true,
						loadMask	: true
					},

					listeners : {
						tabchange: function () {
							var ztab = this.getActiveTab();
							var tabTitle = ztab['title'];
							var tabSrc = ztab['defaultSrc'];

							Ext.getCmp('titlefield').setValue(tabTitle);
							Ext.getCmp('urlfield').setValue(tabSrc);
							ztab.doLayout();
						}
					},
					items : [
					{
						id		: this.moduleDefaultTabId,
						title		: this.moduleDefaultTabTitle,
						defaultSrc	: this.moduleDefaultTabSrc,

						xtype		: 'iframepanel',
						loadMask	: {msg:'Loading...'},
						scope 		: this
					}],

					//}]

					activeTab : this.moduleDefaultTabId,
					scope 	  : this
				}],

				taskbuttonTooltip : this.moduleToolTip,
				scope : this
			});
						
			root.listType = 'COLLABORATE';
			root.text = "Ecco Bookmarks";
			tx.data.collaboratelists.init(tree,root);
			tx.data.collaborates.init()
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
						var collab_item = tx.data.collaborates.loadItem(node.id);
						if (collab_item != null)
						{
							Ext.getCmp('titlefield').setValue(node.text);
							Ext.getCmp('urlfield').setValue(collab_item.data.link_to);	
						}
						app.getModule('bookmarks').newTab();
					}
					//grid.titleNode = node;
					//grid.setTitle(node.text);
					//grid.setIconClass(node.attributes.iconCls);
				}
			}
		
			//listSm.on('selectionchange', function(t, node){
			//	loadList(node ? node.id : null);
			//});
			setTimeout( "Ext.getCmp('bookmarks-tree').getRootNode().reload()", 999 );
		}
		
		win.show();	
	}	

});
