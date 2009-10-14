// ---------------------------------
// Bloney People
// ---------------------------------
BloneyPeople = {};

BloneyPeople.PeopleGrid = function(config){
	Ext.apply(this, config);

	this.store =  new Ext.data.GroupingStore({
		proxy: new Ext.data.HttpProxy({url: '/authorize/user_list', method: 'GET'}),
		reader: new Ext.data.JsonReader({
				id: 'id'
			}, [
				'id',
				'login',
				'email',
				'role',
				'domain',
				'active'				
			]),
		remoteSort: false,
        sortInfo:{field: 'login', direction: "ASC"},
		groupField:'domain'
	});

	
	
	this.rolesstore = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url: '/authorize/roles', method: 'GET'}),
		reader: new Ext.data.JsonReader({
				id: 'title'
			}, ['title', 'description']),
			remoteSort: false
	});
	this.rolesstore.baseParams = {format : 'json'};
	this.rolesstore.load();
	
	this.comboRoleslist = new Ext.form.ComboBox({
							store: this.rolesstore,
							displayField:'description',
							valueField: 'title',
							hiddenName: 'description',
							typeAhead: true,
							//fieldLabel: 'Account Owner',
							id:'cs_roleslist',
							//width : config.width*0.21,
							//labelWidth : config.width*0.07,
							mode: 'local',
							triggerAction: 'all',
							//emptyText:'Contact Name...',
							selectOnFocus:true,
							allowBlank:true
					});

	// define a custom summary function
	Ext.grid.GroupSummary.Calculations['totalUsers'] = function(v, record, field){			
	        return '45';
	}

	this.summary = new Ext.grid.GroupSummary();

	if(config.columnmodel == 'checkbox')				
	{
		this.selmodel = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
		this.columns = [this.selmodel,{
				   id: 'login',
				   header: "Login",
				   dataIndex: 'login',
				   width: 120
				},{
				   header: "Email",
				   dataIndex: 'email',
				   width: 150
				},{
				   header: "Role",
				   dataIndex: 'role',
				   width: 80
				},{
				   header: "Domain",
				   dataIndex: 'domain',
				   width: 80
				},{
				   header: "Status",
				   dataIndex: 'active',
				   width: 80
				}];
	}
	
	if(config.columnmodel == null)
	{
		this.selmodel = new Ext.grid.RowSelectionModel({
					singleSelect:true
			});
		this.columns = [{
				   id: 'Login',
				   header: "Login",
				   dataIndex: 'login',
				   width: 120
				},{
				   header: "Email",
				   dataIndex: 'email',
				   width: 150
				},{
				   header: "Role",
				   dataIndex: 'role',
				   width: 80,
				   editor : this.comboRoleslist
				},{
				   header: "Domain",
				   dataIndex: 'domain',
				   width: 80
				}];
	}

	this.view = new Ext.grid.GroupingView({
			            forceFit:true,
			            showGroupName: false,
			            enableNoGroups:false, // REQUIRED!
			            hideGroupedColumn: true,
						autoExpandColumn: 'email',
						groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Users" : "User"]})'
			        });

	BloneyPeople.PeopleGrid.superclass.constructor.call(this, {
		
		loadMask: {msg:'Loading People...'},
		plugins: this.summary,
		sm: new Ext.grid.RowSelectionModel({
			singleSelect:true
		})
	});

	this.on('rowcontextmenu', this.onContextClick, this);
	this.on('rowclick', this.onRowClick, this);	
};

Ext.extend(BloneyPeople.PeopleGrid,Ext.grid.EditorGridPanel,{
	
	onRowClick : function(grid, rowIndex, e){
		var record = grid.getStore().getAt(rowIndex);  // Get the Record
        Ext.getCmp('peopleform').form.setValues( [
        							  {id:'id', value:record.data.id},
        							  {id:'plogin_name', value:record.data.login},
									  {id:'titleId', value:record.data.role},
									  {id:'domainId', value:record.data.domain},
									  {id:'pemail', value:record.data.email},
									  {id:'ppassword', value:record.data.email},
									  {id:'pconfirm', value:record.data.email}]);
	},
 	onContextClick : function(grid, index, e){
	        if(!this.menu){ // create context menu on first right click
	            this.menu = new Ext.menu.Menu({
	                id:'grid-ctx',
	                items: [
					// stick any markup in a menu
		            '<b class="x-toolbar x-small-editor">Filter People Context</b>',
		            '-',{
		                text: 'Filter',
		                menu: {// <-- submenu by nested config object
		                    items: [
		                        // stick any markup in a menu
		                        '<b class="x-toolbar x-small-editor">Filter</b>','-',
		                        {
		                            text: 'by Name',
		                            checked: true,
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'by Role',
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                        }]
		                }
		            }]
	            });
	            this.menu.on('hide', this.onContextHide, this);
	        }
	        e.stopEvent();
	        if(this.ctxRow){
	            Ext.fly(this.ctxRow).removeClass('x-node-ctx');
	            this.ctxRow = null;
	        }
	        this.ctxRow = this.view.getRow(index);
	        this.ctxRecord = this.store.getAt(index);
	        Ext.fly(this.ctxRow).addClass('x-node-ctx');
	        this.menu.showAt(e.getXY());
    },

	onContextHide : function(){
	        if(this.ctxRow){
	            Ext.fly(this.ctxRow).removeClass('x-node-ctx');
	            this.ctxRow = null;
	        }
    },

    loadRecords : function(role_type) {
		
    	this.store.baseParams = {
			format: 'json',
			role_type : role_type == null ? '' : role_type
		};
        this.store.load();
    },
    
    onItemCheck : function(item, checked) {
    	Ext.Msg.alert('onItemCheck', 'The Settings tool was clicked.');
    }
});

BloneyPeople.CollaborateWnd = function(config){
	
	Ext.apply(this, config);
	
	this.comapniessharelist = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url: '/customers/comapanies_sharelist', method: 'GET'}),
		reader: new Ext.data.JsonReader({
				//id: 'id'
			}, [
				'company_name'		
			]),
		remoteSort: false
	});
	this.comapniessharelist.baseParams = {format : 'json'};
	this.comapniessharelist.load();
	
	this.expertssharelist = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url: '/customers', method: 'GET'}),
		reader: new Ext.data.JsonReader({
				//id: 'id'
			}, [
				'customer_name'		
			]),
		remoteSort: false
	});
	this.expertssharelist.baseParams = {format : 'json', 
										customer_type:'EXPERT',
										customer_name: '',
										customer_city: '',
										customer_country: '',
										fields : 'customer_name'};
	this.expertssharelist.load();
	
	this.comboExpertssharelist = new Ext.form.ComboBox({
							//fieldLabel:"Comapnies list",
							width : 140,
							store: this.expertssharelist,
							displayField:'customer_name',
							valueField: 'customer_name',
							hiddenName: 'customer_name',
							typeAhead: true,
							id:'ps_customer_name',
							mode: 'local',
							triggerAction: 'all',
							emptyText:'Expert Name...',
							selectOnFocus:true,
							allowBlank:true
					});
	this.comboExpertssharelist.on('select', this.onSelectET, this);
	
		
	this.postcustomers = new BloneyPeople.PeopleGrid({
						id: 'postpeople',
						title: 'Publish People Directory',
						height: (config.height - 95),
						listeners: {activate: this.handleActivate},
						columnmodel : 'checkbox',
						bbar: ['->',this.comboExpertssharelist,'-',{
								text : 'Share with Expert',
								handler : function() {
									var selItems = Ext.getCmp('postcustomers').getSelectionModel().getSelections();
									var itemsList = "";
									for(var i = 0, n = selItems.length; i < n; i++) {
								     	itemsList = ((itemsList == "") ? "" : (itemsList + ",") ) + selItems[i].id								     	
								    }
								    if (itemsList != "" && Ext.getCmp('ps_customer_name').getValue() != "" )
								    {
								    	Ext.Ajax.request({
								    	   url: '/authorize/postdirectory',
										   method : 'GET',
										   success: function(){
										   		Ext.Msg.alert('Post People Directory', 'People directory posted sucessfully');
										   },
										   failure: function(){
										   		Ext.Msg.alert('Post People Directory', 'People directory posted failed');
										   },
										   params: {items_list : itemsList,
										   			share : false,
										   			expert_name : Ext.getCmp('ps_customer_name').getValue()}
										});
								    }
								}
						},'-',{
								text : 'Publish Directory',
								handler : function() {
									var selItems = Ext.getCmp('postcustomers').getSelectionModel().getSelections();
									var itemsList = "";
									for(var i = 0, n = selItems.length; i < n; i++) {
								     	itemsList = ((itemsList == "") ? "" : (itemsList + ",") ) + selItems[i].id								     	
								    }
									if (itemsList != "")
								    {
									    Ext.Ajax.request({
									    	   url: '/authorize/postdirectory',
											   method : 'GET',
											   success: function(){
											   		Ext.Msg.alert('Post People Directory', 'People directory posted sucessfully');
											   },
											   failure: function(){
											   		Ext.Msg.alert('Post People Directory', 'People directory posted failed');
											   },
											   params: {items_list : itemsList,
											   			share : true}
											});
								    }
								}
						},'-',new Ext.SplitButton({
								id: 'cleandirectory', 
							   	text: 'Clean All Directories',
							   	handler: function() {
							   				Ext.Ajax.request({
									    	   url: '/authorize/cleandirectory',
											   method : 'GET',
											   success: function(){
											   		Ext.Msg.alert('Clean People Directory', 'People directory cleaned sucessfully');
											   },
											   failure: function(){
											   		Ext.Msg.alert('Clean People Directory', 'People directory cleaned failed');
											   },
											   params: { share_type : 'ALL'}
											});}, // handle a click on the button itself
							   	menu: new Ext.menu.Menu({
							        items: [
							        	// these items will render as dropdown menu items when the arrow is clicked:
								        {
									        text: 'Clean Shared Directory', 
									        handler: function() {
									        	Ext.Ajax.request({
										    	   url: '/authorize/cleandirectory',
												   method : 'GET',
												   success: function(){
												   		Ext.Msg.alert('Clean People Directory', 'People directory cleaned sucessfully');
												   },
												   failure: function(){
												   		Ext.Msg.alert('Clean People Directory', 'People directory cleaned failed');
												   },
												   params: { share_type : 'PUBLIC'}
												});
									        	
									        }
								        },{
									        text: 'Clean People Directory', 
									        handler: function() {
										        Ext.Ajax.request({
										    	   url: '/authorize/cleandirectory',
												   method : 'GET',
												   success: function(){
												   		Ext.Msg.alert('Clean People Directory', 'People directory cleaned sucessfully');
												   },
												   failure: function(){
												   		Ext.Msg.alert('Clean People Directory', 'People directory cleaned failed');
												   },
												   params: { share_type : 'PRIVATE'}
												});
									        }
								        }
							        ]
							   	})
							})]
	});
	this.postcustomers.on('rowclick', this.postcustomers.onRowClick, this.postcustomers);
	
	this.adoptcustomers = new BloneyPeople.PeopleGrid({
						id: 'adoptcustomers',
						title: 'Customers list',
						columnmodel : 'checkbox',
						height: (config.height - 160),
						listeners: {activate: this.handleActivate}
	});
	this.adoptcustomers.on('rowclick', this.adoptcustomers.onRowClick, this.adoptcustomers);
	
	this.adoptcustomersfrm = new Ext.FormPanel({
		frame:true,
		id : 'adoptcustfrm',
		title: 'Adopt People Directory',
		//height : 290,
		autoHeight : true,
		listeners: {activate: this.handleActivate},
		items:[
				{
					xtype:"hidden",
					id:'adoptcustomersfrm_id'
				},{
					xtype:"combo",
					fieldLabel:"Comapnies list",
					width : 200,
					store: this.comapniessharelist,
					displayField:'company_name',
					valueField: 'company_name',
					hiddenName: 'company_nameId',
					typeAhead: true,
					id:'cs_company_name',
					mode: 'local',
					triggerAction: 'all',
					emptyText:'Select a comapny ...',
					selectOnFocus:true,
					allowBlank:true
				},
				this.adoptcustomers
		  ],
		  bbar:['->',{	xtype:"textfield",
						id:'activation_key',
						width: 200,
						emptyText:'Enter Activation Key ...',
						name:"activation key",
						allowBlank:true},'-',{
				text:"Load Customers Directory",
				handler : function () {
						
						Ext.getCmp('adoptcustomers').loadFileRecords('',Ext.getCmp('activation_key').getValue());		
				}
			},'-',{
				text:"Adopt Customers Directory",
				id: 'adoptdirectory',
				handler : function () {
						var selItems = Ext.getCmp('adoptcustomers').getSelectionModel().getSelections();
						var itemsList = "";
						for(var i = 0, n = selItems.length; i < n; i++) {
					     	itemsList = ((itemsList == "") ? "," : (itemsList + ",") ) + selItems[i].id
							itemsList += ((i == n-1) ? "," :  "");
					    }
						Ext.Ajax.request({
										   url: '/customers/adoptdirectory',
										   method : 'GET',
										   success: function(){
										   		Ext.Msg.alert('Post Customers Directory', 'Customers directory posted sucessfully');
										   },
										   failure: function(){
										   		Ext.Msg.alert('Post Customers Directory', 'Customers directory posted failed');
										   },
										   params: {customer_name : Ext.getCmp('cs_company_name').getValue(),
										   			items_list : itemsList,
										   			share : true}
										});	
						
				}
			},'-',{
				text:"Clean All",
				handler : function () {
					Ext.getCmp('adoptcustfrm').form.setValues( [ {id:'cs_company_name', value:''}]);
					Ext.getCmp('activation_key').setValue('');		
				}
			}]
	});
	
	this.collaboratetabs = new Ext.TabPanel({
				region: 'center',
				margins:'3 3 3 0',
				//activeTab: 0,
				defaults:{autoScroll:true},
				id: 'collaborate_tabs',
				items:[
					this.postcustomers,
					this.adoptcustomersfrm
				]
			});
	
	BloneyPeople.CollaborateWnd.superclass.constructor.call(this, {
		title : 'Bloney People Collaborate',
		id: 'wndbloneypeoplecollaborate',
		modal : true,
		width : config.width,
		height : config.height,
        items: [this.collaboratetabs],
		buttons: [{
				text: 'Close People Collaborate Window',
				handler : function() {
					Ext.getCmp('wndbloneypeoplecollaborate').close();
				}
			}]
		});
	Ext.getCmp('cs_company_name').on('select', this.onSelectCN, this);
	
};

Ext.extend(BloneyPeople.CollaborateWnd, Ext.Window,{
	
	handleActivate : function(tab){

		if(tab.id == 'postcustomers')
			Ext.getCmp('postcustomers').loadRecords();
			
		tab.doLayout();		
	},
	
	onSelectCN : function(o, record, index){
		Ext.getCmp('adoptcustomers').loadFileRecords(record.data.company_name);
	},
	
	onSelectCT : function(o, record, index){
		
		if("ALL" == record.data.company_type)
		{
			Ext.getCmp('postcustomers').getStore().clearFilter();
		}
		else
		{
			Ext.getCmp('postcustomers').getStore().filter('customer_type',record.data.company_type);
		}
		
	}
	,
	
	onSelectET : function(o, record, index){
		
		if("ALL" == record.data.company_type)
		{
			Ext.getCmp('postcustomers').getStore().clearFilter();
		}
		else
		{
			Ext.getCmp('postcustomers').getStore().filter('customer_type',record.data.company_type);
		}
		
	}
});

BloneyPeople.MainWnd = function(config){
	
	Ext.apply(this, config);
	
	this.rolesstore = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url: '/authorize/roles', method: 'GET'}),
		reader: new Ext.data.JsonReader({
				//id: 'title'
			}, ['title', 'description']),
			remoteSort: false
	});
	this.rolesstore.baseParams = {format : 'json'};
	this.rolesstore.load();
	
	this.domainsstore = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url: '/authorize/domains', method: 'GET'}),
		reader: new Ext.data.JsonReader({
				//id: 'title'
			}, ['domain','domain_description']),
			remoteSort: false
	});
	this.domainsstore.baseParams = {format : 'json'};
	this.domainsstore.load();
	
	this.users = new BloneyPeople.PeopleGrid({
						id: 'users',
						width : config.width*0.275,
						height : config.height*0.35,
						border : true,
						listeners: {activate: this.handleActivate}
	});
	
	
	this.roles = new BloneyPeople.PeopleGrid({
						id: 'roles',
						title: 'User Permissions',
						listeners: {activate: this.handleActivate}
	});
	
	this.peopleform = new Ext.FormPanel({
			labelWidth: 75, // label settings here cascade unless overridden
			url: '/authorize/update', //signup',
			frame:true,
			width: config.width*0.30,
			defaultType: 'textfield',
			region: 'west',
            split: true,
            collapsible: true,
            margins:'3 0 3 3',
            cmargins:'3 3 3 3',
			id: 'peopleform',
			items: [{
						xtype: 'hidden',
						name: 'id',
						id: 'pid',
						width : 150,
						allowBlank:true
					},{
						fieldLabel: 'Company',
						name: 'company_name',
						id:'company_name',
						width : config.width*0.185,
						allowBlank:false
					},{
						xtype:'fieldset',
						title: 'Company Details',
						autoHeight:true,
						collapsible: true,
						defaults : {width: config.width*0.17},
						items :[
								{
									xtype:"textfield",
									fieldLabel:"Address",
									name:"p_address",
									id:'p_address',
									allowBlank:false
								},{
									xtype:"textfield",
									fieldLabel:"City",
									name:"p_city",
									id:'p_city',
									allowBlank:false
								},{
									xtype:"textfield",
									fieldLabel:"Country",
									name:"p_country",
									id:'p_country',
									allowBlank:false
								},{
									xtype:"field",
									fieldLabel:"Phone",
									name:"p_phone",
									id:'p_phone',
									allowBlank:false
								},{
									xtype:"field",
									fieldLabel:"Fax",
									name:"p_fax",
									id: 'p_fax',
									allowBlank:false
								},{
									xtype:"field",
									fieldLabel:"Email",
									name:"p_email",
									id:'p_email',
									allowBlank:false,
									vtype:'email'
								},{
									xtype:"field",
									fieldLabel:"URL",
									name:"p_url",
									id:'p_url',
									allowBlank:false,
									vtype:'url'
								}
						]
				},{
						xtype:'fieldset',
						title: 'Company Users',
						autoHeight:true,
						collapsible: true,
						items :this.users	
				}
				]
		});

	


	this.search = new Ext.FormPanel({
		frame:true,
		id : 'peoplesearch',
		url: '/authorize/user_list', 
		title: 'Search & Filter',
		layout:'form',
		listeners: {activate: this.handleActivate},
		items:[
				{
					xtype:'fieldset',
					title: 'Search User',
					autoHeight:true,
					collapsible: true,
					items :[
							{
								layout:'column',
								border:false,
								items:[
									{
										columnWidth: 0.5,
										layout: 'form',
										defaults: {width: 100},
										items:[
												{
													xtype:"textfield",
													id:'slogin',
													fieldLabel:"By login",
													name:"login",
													allowBlank:true
												}
										]
									},{
										columnWidth: 0.5,
										layout: 'form',
										defaults: {width: 100},
										items:[
												{
													xtype:"field",
													fieldLabel:"By email",
													id: 'semail',
													name:"email",
													allowBlank:true,
													vtype:'email'
												}
										]
									}
								]
							}
					]
				},{
					xtype:'fieldset',
					checkboxToggle:true,
					title: 'Filter Users',
					autoHeight:true,
					collapsed: true,
					items :[
							{
								layout:'column',
								border:false,
								items:[
									{
										columnWidth: 0.5,
										layout: 'form',
										defaults: {width: 100},
										items:[
												{
													xtype:"combo",
													fieldLabel:"Role",
													id: 'roles_filter',
													width : 100,
													name: 'title',
													store: this.rolesstore,
													displayField:'description',
													valueField: 'title',
													hiddenName: 'titleId',
													typeAhead: true,
													mode: 'local',
													triggerAction: 'all',
													emptyText:'Select a role...'
												},{
													xtype:"combo",
													fieldLabel:"Domain",
													id: 'domain_filter',
													width : 100,
													name: 'domain',
													store: this.domainsstore,
													displayField:'domain_description',
													valueField: 'domain',
													hiddenName: 'domainId',
													typeAhead: true,
													mode: 'local',
													triggerAction: 'all',
													emptyText:'Select a domain...'
												}
										]
									},{
										columnWidth: 0.5,
										layout: 'form',
										defaults: {width: 100},
										items:[
												{
													xtype: "datefield",
													fieldLabel: 'Created At',
													name: 'createdAt',
													id:'sdatecreated',
													allowBlank:true
												}
										]
									}
								]
							}
					]
				}
		  ],
		  buttons:[{
				text:"Clean All",
				handler : function () {
					Ext.getCmp('peoplesearch').form.setValues( [{id:'slogin', value:''},
						  {id:'roles_filter', value:''},
						  {id:'domain_filter', value:''},
						  {id:'semail', value:''},
						  {id:'sdatecreated', value:''}]);
				}
			},{
				text:"Submit",
				handler : function () {
					Ext.getCmp('people_tabs'). setActiveTab(0);
					Ext.getCmp('users').loadRecords(Ext.getCmp('roles_filter').getValue());				
				}
			}]
	});

	this.companies = new BloneyContact.ContactsGrid({
						id: 'companies',
						title: 'My Companies',
						columnmodel : 'story',
						listeners: {activate: this.handleActivate}
	});
	
	//this.companies.on('rowclick', this.companies.onRowClick, this.companies);

	this.tabs = new Ext.TabPanel({
				region: 'center',
				margins:'3 3 3 0',
				activeTab: 0,
				defaults:{autoScroll:true},
				id: 'people_tabs',
				tabPosition : 'bottom',
				items:[
					this.companies,
					//this.users,
					this.roles,
					this.search
				],
		tbar: [{
					text : 'New Company',
					id : 'new_company',
					iconCls:'owner-icon',
					handler : function (){
						var data = { 	
							   				//contactId:  Ext.getCmp('contact_id').getValue(),
											//authenticity_token : Ext.getCmp('authenticity_token').getValue(),
											contact_name : Ext.getCmp('company_name').getValue(),
											contact_type : 'MYCOMPANY',
											address : Ext.getCmp('p_address').getValue(),
											city : Ext.getCmp('p_city').getValue(),
											country : Ext.getCmp('p_country').getValue(),
											phone : Ext.getCmp('p_phone').getValue(),
											fax : Ext.getCmp('p_fax').getValue(),
											email : Ext.getCmp('p_email').getValue(),
											url : Ext.getCmp('p_url').getValue() 
										};
						Ext.Ajax.request({
						    url: tx.data.contacts_con.create_remote_url,
						    scriptTag: true,
						    callbackParam: 'jsoncallback',
						    timeout: 10,
								params: {
									format: 'js',
									contact : Ext.util.JSON.encode(data)
						    },
						    success: function(r) {
								   this.publish( '/desktop/notify',{
								            title: 'Bloney Companies',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
						    },
						    failure : function(r) {
						       	    this.publish( '/desktop/notify',{
								            title: 'Bloney Companies',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
						    },
						    scope: this
						});	
						tab = Ext.getCmp('people_tabs').getActiveTab();
						Ext.getCmp('wndbloneypeople').handleActivate(tab);	
					}		
				},{
					text : 'New User',
					id : 'new_user',
					iconCls:'companyuser-icon',
					handler : function (){
						var data = { 	
							   				contactId:  Ext.getCmp('contact_id').getValue(),
											//authenticity_token : Ext.getCmp('authenticity_token').getValue(),
											contact_name : Ext.getCmp('s_contact_name').getValue(),
											contact_type : 'MYCOMPANY',
											address : Ext.getCmp('s_address').getValue(),
											city : Ext.getCmp('s_city').getValue(),
											country : Ext.getCmp('s_country').getValue(),
											phone : Ext.getCmp('s_phone').getValue(),
											fax : Ext.getCmp('s_fax').getValue(),
											email : Ext.getCmp('s_email').getValue(),
											url : Ext.getCmp('s_url').getValue() 
										};
						Ext.Ajax.request({
						    url: tx.data.contacts_con.create_remote_url,
						    scriptTag: true,
						    callbackParam: 'jsoncallback',
						    timeout: 10,
								params: {
									format: 'js',
									contact : Ext.util.JSON.encode(data)
						    },
						    success: function(r) {
								   this.publish( '/desktop/notify',{
								            title: 'Bloney Companies',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
						    },
						    failure : function(r) {
						       	    this.publish( '/desktop/notify',{
								            title: 'Bloney Companies',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
						    },
						    scope: this
						});	
						tab = Ext.getCmp('people_tabs').getActiveTab();
						//Ext.getCmp('wndbloneycontact').handleActivate(tab);	
					}		
				},{
					text: 'Save Changes',
					iconCls:'save-contacts-icon',
					handler : function() {
						var data = { 	
							   				contactId:  Ext.getCmp('contact_id').getValue(),
											//authenticity_token : Ext.getCmp('authenticity_token').getValue(),
											contact_name : Ext.getCmp('s_contact_name').getValue(),
											contact_type : Ext.getCmp('s_contact_type').getValue(),
											address : Ext.getCmp('s_address').getValue(),
											city : Ext.getCmp('s_city').getValue(),
											country : Ext.getCmp('s_country').getValue(),
											phone : Ext.getCmp('s_phone').getValue(),
											fax : Ext.getCmp('s_fax').getValue(),
											email : Ext.getCmp('s_email').getValue(),
											url : Ext.getCmp('s_url').getValue() 
										};
						Ext.Ajax.request({
							    url: tx.data.contacts_con.update_remote_url,
							    scriptTag: true,
							    callbackParam: 'jsoncallback',
							    timeout: 10,
									params: {
										format: 'js',
										contact : Ext.util.JSON.encode(data)
							    },
							    success: function(r) {
									  this.publish( '/desktop/notify',{
								            title: 'Bloney Contacts',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    failure : function(r) {
							       this.publish( '/desktop/notify',{
								            title: 'Bloney Contacts',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    scope: this
					    });
							tab = Ext.getCmp('contact_tabs').getActiveTab();
							Ext.getCmp('wndbloneycontact').handleActivate(tab);	
					}
				},{
						text : 'Delete',
						iconCls:'delete-contacts-icon',
						handler : function (){
							Ext.Ajax.request({
							    url: tx.data.contacts_con.destroy_remote_url,
							    scriptTag: true,
							    callbackParam: 'jsoncallback',
							    timeout: 10,
									params: {
										format: 'js',
										contactId : Ext.getCmp('contact_id').getValue()
							    },
							    success: function(r) {
									   this.publish( '/desktop/notify',{
								            title: 'Bloney Contacts',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    failure : function(r) {
								 	this.publish( '/desktop/notify',{
								            title: 'Bloney Contacts',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    scope: this
							});
							tab = Ext.getCmp('contact_tabs').getActiveTab();
							Ext.getCmp('wndbloneycontact').handleActivate(tab);	
						}		
				},{
					text: 'Clean Form',
					iconCls:'clean-contacts-icon',
					handler: function(){
						Ext.getCmp('contactsform').form.setValues([{
							id: 's_contact_name',
							value: ''
						}, {
							id: 'abbrId',
							value: ''
						}, {
							id: 's_address',
							value: ''
						}, {
							id: 's_city',
							value: ''
						}, {
							id: 's_country',
							value: ''
						}, {
							id: 's_phone',
							value: ''
						}, {
							id: 's_fax',
							value: ''
						}, {
							id: 's_email',
							value: ''
						}, {
							id: 's_url',
							value: ''
						}]);
						
						//Ext.getCmp('new_contact').setDisable(true);
					}
				}
				,'->',{
						text : 'Change Password',
						iconCls : 'passwordgen-icon',
						handler : function (){
								Ext.Ajax.request({
										   url: '/authorize/forgot_password',
										   success: function(r){
										   		 this.publish( '/desktop/notify',{
											            title: 'Bloney Users',
											            iconCls: 'bloney-icon',
											            html: r.responseObject.notice
											        });
												
										   },
										   failure: function(r){
										   		this.publish( '/desktop/notify',{
											            title: 'Bloney Users',
											            iconCls: 'bloney-icon',
											            html: r.responseObject.notice
											        });
										   },
										   params: { email: Ext.getCmp('pemail').getValue()}
										});
						}		
					},'-',{
						text : 'Archive',
						iconCls:'archive-contacts-icon',
						handler : function (){
							Ext.Ajax.request({
							    url: tx.data.contacts_con.update_remote_url,
							    scriptTag: true,
							    callbackParam: 'jsoncallback',
							    timeout: 10,
									params: {
										format: 'js',
										contactId : Ext.getCmp('contact_id').getValue(),
										task : 'archive'			
							    },
							    success: function(r) {
									  this.publish( '/desktop/notify',{
								            title: 'Bloney Contacts',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    failure : function(r) {
							       this.publish( '/desktop/notify',{
								            title: 'Bloney Contacts',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    scope: this
					    });
							tab = Ext.getCmp('contact_tabs').getActiveTab();
							Ext.getCmp('wndbloneycontact').handleActivate(tab);	
						}		
					},{
						text : 'Restore',
						iconCls:'restore-contacts-icon',
						handler : function (){
							Ext.Ajax.request({
							    url: tx.data.contacts_con.update_remote_url,
							    scriptTag: true,
							    callbackParam: 'jsoncallback',
							    timeout: 10,
									params: {
										format: 'js',
										contactId : Ext.getCmp('contact_id').getValue(),
										task : 'restore'			
							    },
							    success: function(r) {
									  this.publish( '/desktop/notify',{
								            title: 'Bloney Contacts',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    failure : function(r) {
							       this.publish( '/desktop/notify',{
								            title: 'Bloney Contacts',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    scope: this
					    });
							tab = Ext.getCmp('contact_tabs').getActiveTab();
							Ext.getCmp('wndbloneycontact').handleActivate(tab);	
						}		
					}]
			});

	BloneyPeople.MainWnd.superclass.constructor.call(this, {
		title : 'Bloney Company and People',
		iconCls : 'owner-icon',
		id: 'wndbloneypeople',
		items: [this.peopleform, this.tabs],
		buttons:[new Ext.SplitButton({
					id: 'companycollbutton', // the container id
				   	text: 'Collaborate with Users',
					iconCls:'collaborate-icon',
				   	//handler: optionsHandler, // handle a click on the button itself
				   	menu: new Ext.menu.Menu({
				        items: [
				        	// these items will render as dropdown menu items when the arrow is clicked:
					        {text: 'Publish People Directory', handler: function() {
					        	var comapnyCollaborateWnd = new BloneyPeople.CollaborateWnd({
					        										width:toolbarconfig.width - (Ext.getCmp('peopleform').getSize().width + 15),
					        										height:Ext.getCmp('people_tabs').getSize().height });
					        	position  = Ext.getCmp('people_tabs').getPosition();
					        	comapnyCollaborateWnd.setPosition(position[0],position[1]);
					        	Ext.getCmp('collaborate_tabs').setActiveTab(0);
					        	comapnyCollaborateWnd.show();
					        	
					        }},
					        {text: 'Adopt People Directory', handler: function() {
						        var comapnyCollaborateWnd = new BloneyPeople.CollaborateWnd({
					        										width:toolbarconfig.width - (Ext.getCmp('peopleform').getSize().width + 15),
					        										height:Ext.getCmp('people_tabs').getSize().height });
					        	
					        	position  = Ext.getCmp('people_tabs').getPosition();
					        	comapnyCollaborateWnd.setPosition(position[0],position[1]);
					        	Ext.getCmp('collaborate_tabs').setActiveTab(1);
					        	comapnyCollaborateWnd.show();
					        }},
							{text: 'Ask for People Directory', handler: function() {
						        var notificationCommmentWnd = new BloneyNotifications.CommentWnd();
						        notificationCommmentWnd.show();
					        }}
				        ]
				   	})
				}),{
				text: 'Close Companies Window',
				handler : function() {
					Ext.getCmp('wndbloneypeople').close();
				}
			}]
		});
		
		this.users.loadRecords();
};


Ext.extend(BloneyPeople.MainWnd, Ext.Window,{

	handleActivate : function(tab){

		if(tab.id == 'users')
			Ext.getCmp('users').loadRecords();

		if(tab.id == 'roles')
			Ext.getCmp('roles').loadRecords();
		
		if(tab.id == 'companies')
			Ext.getCmp('companies').loadRecords('MYCOMPANY');
			
		tab.doLayout();
		
	}
});
