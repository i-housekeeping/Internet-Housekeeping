/**
 * @author Alexp
 */
Bookmarks.Favorits = {
	moduleId : 'bookmarkmashup',
	
	createMashupWnd : function (config){
			this.win = app.desktop.getWindow(this.moduleId);
			
			if (!this.win) {
				Ext.apply(this, config);
				var book_app = app.getModule('bookmarks');
				
				this.comboxcategories = new ListSelector({
					id: 'bookmarkslist',
					fieldLabel: 'Bookmarks',
					store: tx.data.collaboratelists,
					listenForLoad: true,
					width: 230
				});
				
				this.auth_type = new Ext.form.ComboBox({
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
				
				this.saveAuth = new Ext.form.Checkbox({
					fieldLabel: "Save password",
					name: "remember_psw",
					//height: 20,
					checked: false
				});
				
				this.favorits_form = new Ext.FormPanel({
					labelWidth: 105,
					// url:'system/modules/navigateur-win/echo.php',
					frame: true,
					bodyStyle: 'padding:5px 5px 0',
					width: 300,
					defaults: {
						width: 230
					},
					defaultType: 'textfield',
					items: [this.comboxcategories, {
						id: 'bname',
						name: 'Name',
						fieldLabel: book_app.ffLabelNom,
						allowBlank: false,
						scope: this
					}, {
						id: 'burl',
						name: 'url',
						fieldLabel: book_app.ffLabelAdresse,
						value: 'http://',
						allowBlank: false,
						scope: this
					}, this.saveAuth, this.auth_type, {
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
					}]
				});
				
				
				this.win = app.desktop.createWindow({
	            	title: book_app.formTitleAddBookmark,
					width: 380,
					id: 'favorits_wnd',
					height: 280,
					layout: 'fit',
					border: false,
					closeAction: 'hide',
					items: [this.favorits_form],
					tbar: [{
						iconCls: 'icon-linkGo',
						text: book_app.ttTreeTitleSave,
						tooltip: {
							title: book_app.ttTreeTitleSave,
							text: book_app.ttTreeTextSave
						},
						handler: function(){
							var data = {
								collaborateId: '',
								//authenticity_token : Ext.getCmp('authenticity_token').getValue(),
								listId: Ext.getCmp('bookmarkslist').getValue(),
								title: Ext.getCmp('bname').getValue(),
								link_to: Ext.getCmp('burl').getValue(),
								action_to: '',
								auth_type: Ext.getCmp('auth_type').getValue(),
								login: Ext.getCmp('blogin').getValue(),
								password: Ext.getCmp('bpassword').getValue()
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
						}
					}, '->', {
						text: 'Close',
						handler: function(){
							Ext.getCmp('favorits_wnd').close();
						}
					}]
	            });
				
				this.saveAuth.on('check', function(cb, checked){
					var login = Ext.getCmp('blogin');
					var psw = Ext.getCmp('bpassword');
					var auth_type = Ext.getCmp('auth_type');
					login.setDisabled(!checked);
					psw.setDisabled(!checked);
					auth_type.setDisabled(!checked);
				});
			}
			
			 this.win.show();
	}	
}; 
