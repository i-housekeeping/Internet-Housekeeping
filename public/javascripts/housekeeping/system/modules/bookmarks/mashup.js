/**
 * @author Alexp
 */
Bookmarks = {};

Bookmarks.Favorits = {
	moduleId : 'bookmarkmashup',
	window : null,
	
	ffLabelNom		: 'Tab Title',
	ffLabelAdresse		: 'URL Address',
	ttTreeTitleSave	: 'Save',
	ttTreeTextSave 	: 'Save New Bookmark.',
	formTitleAddBookmark	: 'Add New Bookmark',
	
	createMashupWnd : function (config){
			//this.win = Ext.getCmp('favorits_wnd');
			
			if (!this.window) {
				Ext.apply(this, config);
				var book_app = app.getModule('bookmarks');
				
				var comboxcategories = new ListSelector({
					id: 'bookmarkslist',
					fieldLabel: 'Bookmarks',
					store: tx.data.collaboratelists,
					listenForLoad: true,
					width: 230,
					root_listType:'COLLABORATE',
					root_text: "Ecco Bookmarks"
				});
				
				var auth_type = new Ext.form.ComboBox({
					store: new Ext.data.SimpleStore({
						fields: ['auth_type', 'auth_type_name'],
						data: [['direct auth', 'Direct Authentication'], ['post', 'POST']]
					}),
					displayField: 'auth_type_name',
					valueField: 'auth_type',
					typeAhead: true,
					mode: 'local',
					triggerAction: 'all',
					emptyText: 'Authentication Type...',
					selectOnFocus: true,
					fieldLabel: 'Authentication Type',
					allowBlank: false,
					name: 'auth_type',
					id: 'auth_type'
				});
				
				var saveAuth = new Ext.form.Checkbox({
					fieldLabel: "Save password",
					name: "remember_psw",
					//height: 20,
					checked: false
				});
				
				var favorits_form = new Ext.FormPanel({
					labelWidth: 105,
					// url:'system/modules/navigateur-win/echo.php',
					frame: true,
					bodyStyle: 'padding:5px 5px 0',
					width: 300,
					defaults: {
						width: 230
					},
					defaultType: 'textfield',
					items: [comboxcategories, {
						id: 'bname',
						name: 'Name',
						fieldLabel: this.ffLabelNom,
						allowBlank: false,
						scope: this
					}, {
						id: 'burl',
						name: 'url',
						fieldLabel: this.ffLabelAdresse,
						value: 'http://',
						allowBlank: false,
						scope: this
					}
					/*
					,this.saveAuth, this.auth_type, {
											id: 'blogin',
											fieldLabel: "username",
											name: "login",
											allowBlank: false,
											disabled: true,
											blankText: "Please fill the Login"
										}, {
											id: 'bpassword',
											fieldLabel: "password",
											name: "password",
											allowBlank: false,
											disabled: true,
											blankText: "Please fill the Password",
											inputType: 'password'
										}
					*/]
				});
				
				
				this.window = app.desktop.createWindow({
	            	title: this.formTitleAddBookmark,
					width: 380,
					id: 'favorits_wnd',
					height: 170,
					layout: 'fit',
					border: false,
					closeAction: 'hide',
					items: [favorits_form],
					tbar: [{
						iconCls: 'icon-linkGo',
						text: this.ttTreeTitleSave,
						tooltip: {
							title: this.ttTreeTitleSave,
							text: this.ttTreeTextSave
						},
						handler: function(){
							var data = {
								collaborateId: '',
								//authenticity_token : Ext.getCmp('authenticity_token').getValue(),
								listId: Ext.getCmp('bookmarkslist').getValue(),
								title: Ext.getCmp('bname').getValue(),
								link_to: Ext.getCmp('burl').getValue()//,
								//action_to: '',
								//auth_type: Ext.getCmp('auth_type').getValue(),
								//login: Ext.getCmp('blogin').getValue(),
								//password: Ext.getCmp('bpassword').getValue()
							};
							
							Ext.Ajax.request({
								url: tx.data.collaborates_con.create_remote_url,
								scriptTag: true,
								callbackParam: 'jsoncallback',
								timeout: 10,
								params: {
									format: 'js',
									collaborate: Ext.util.JSON.encode(data)
								},
								success: function(r){
									this.publish('/desktop/notify', {
										title: 'Bookmarks',
										iconCls: 'icon-linkGo',
										html: r.responseObject.notice
									});
								},
								failure: function(r){
									this.publish('/desktop/notify', {
										title: 'Bookmarks',
										iconCls: 'icon-linkGo',
										html: r.responseObject.notice
									});
								},
								scope: this
							});
							tx.data.collaborates.init();
							Ext.getCmp('bookmarks-tree').getRootNode().reload();
							Ext.getCmp('tabPanel').activeTab.doLayout();
							Bookmarks.Favorits.window.close();
							
						}
					}, '->', {
						text: 'Close',
						iconCls: 'icon-exit',
						handler: function(){
							Bookmarks.Favorits.window.close();
							
						}
					}]
	            });
				
				saveAuth.on('check', function(cb, checked){
					var login = Ext.getCmp('blogin');
					var psw = Ext.getCmp('bpassword');
					var auth_type = Ext.getCmp('auth_type');
					login.setDisabled(!checked);
					psw.setDisabled(!checked);
					auth_type.setDisabled(!checked);
				});
			}
			
			this.window.show();
	}	
}; 
// Very simple plugin for adding a close context menu to tabs
Ext.ux.TabCloseMenu = function(){
    var tabs, menu, ctxItem;
    this.init = function(tp){
        tabs = tp;
        tabs.on('contextmenu', onContextMenu);
    }

    function onContextMenu(ts, item, e){
        if(!menu){ // create context menu on first right click
            menu = new Ext.menu.Menu([{
                id: tabs.id + '-close',
                text: 'Close Tab',
                handler : function(){
                    tabs.remove(ctxItem);
                }
            },{
                id: tabs.id + '-close-others',
                text: 'Close Other Tabs',
                handler : function(){
                    tabs.items.each(function(item){
                        if(item.closable && item != ctxItem){
                            tabs.remove(item);
                        }
                    });
                }
            }]);
        }
        ctxItem = item;
        var items = menu.items;
        items.get(tabs.id + '-close').setDisabled(!item.closable);
        var disableOthers = true;
        tabs.items.each(function(){
            if(this != item && this.closable){
                disableOthers = false;
                return false;
            }
        });
        items.get(tabs.id + '-close-others').setDisabled(disableOthers);
        menu.showAt(e.getPoint());
    }
};
