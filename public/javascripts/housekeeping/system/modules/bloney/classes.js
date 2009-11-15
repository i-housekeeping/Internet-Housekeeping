/*
 * 
 * 
 * 
 * Dashboard
 */
/****************************************************************************************************/

AccountsPanel = function(config){
	Ext.apply(this, config);
	
	var reader = new Ext.data.JsonReader({
            root: 'Accounts',
            fields: [
					{name: 'financial_name', mapping: 'financial_name'},
					{name: 'financialId', mapping: 'financialId'},
					{name: 'financial_type', mapping: 'financial_type'},
					{name: 'account_type', mapping: 'account_type'},
					{name: 'account_alias', mapping: 'account_alias'},
					{name: 'account', mapping: 'account_no'},
					{name: 'balance', mapping: 'balance'},
					{name: 'credit_limit', mapping: 'credit_limit'},
					{name: 'accountId', mapping: 'accountId'},
					{name: 'contactId', mapping: 'contactId'},
					{name: 'currency', mapping: 'currency'},
					{name: 'balance_date', mapping: 'balance_date', type:'date', dateFormat: "Y-m-d"}    ]
        });
	
	this.store = new Ext.data.GroupingStore({
            proxy: new Ext.ux.CssProxy({ url: tx.data.accounts_con.url }),
            reader: reader,
			remoteSort: false,
            sortInfo:{field: 'balance', direction: "ASC"},
			groupField:'financial_name'
        });


	// define a custom summary function
	Ext.grid.GroupSummary.Calculations['totalAmount'] = function(v, record, field){
	        return v + (record.data.balance);
	}

	this.summary = new Ext.grid.GroupSummary();

	this.columns = [
					{
					   header: "Bank",
					   dataIndex: 'financial_name',
					   sortable: true,
					   summaryType:'count',
					   align : 'right',
					   width: 100
					},{
					   header: "Account Type",
					   dataIndex: 'account_type',
					   sortable: true,
					   width: 100
					},{
					   id: 'account',
					   header: "Account",
					   dataIndex: 'account',
					   sortable: true,
					   summaryType: 'count',
					   hideable: false,
					   summaryRenderer: function(v, params, data){
					                       return ((v === 0 || v > 1) ? '(' + v +' Accounts)' : '(1 Account)');
           			   },
					   width: 130,
					   align : 'right'
					},{
					   header: "Credit limit",
					   dataIndex: 'credit_limit',
					   sortable: true,
					   summaryType:'sum',
					   align : 'right',
					   width: 100,
					   renderer: this.amount
					},{
					   header: "Balance",
					   dataIndex: 'balance',
					   width: 100,
					   sortable: true,
					   summaryType:'sum',
					   align : 'right',
					   renderer: this.total_amount
					}
		];


		this.view = new Ext.grid.GroupingView({
			            forceFit:true,
			            showGroupName: false,
			            enableNoGroups:false, // REQUIRED!
			            hideGroupedColumn: true
			        });
	
	BloneyAccount.AccountsList.superclass.constructor.call(this, {
			id: (config.id || 'accounts_panel'),
			loadMask: {msg:'Loading Accounts Summary...'},
        	plugins: this.summary,
			clicksToEdit: 1,
			height: 250,
			collapsible: true,
			animCollapse: false,
        	trackMouseOver: false,
			iconCls: 'icon-grid'
	});
	
	

	
};

Ext.extend (AccountsPanel, Ext.grid.EditorGridPanel,{
	amount : function (val) {
		var ret = Ext.getCmp('accounts_panel').format_amount(val);
		return ((ret == "0.00") ? ret : '<span style="font-weight: bold;">' + ret + '</span>');
	},
	
	total_amount : function (val) {
		var ret = Ext.getCmp('accounts_panel').format_amount(val);
		
		if(ret >= 0){ return '<span style="color:green;font-weight: bold;">' + ret + '</span>';}
		else if(ret < 0){return '<span style="color:red;font-weight: bold;">' + ret + '</span>'; }
        return ret;
	},
	
	format_amount : function (val)
	{
		var ret;
		if (val == "0") {ret = "0.00";}
		else if (val.toString().indexOf(".")<0 ) {ret = val + ".00";}
		else if (val.toString().indexOf(".") == (val.toString().length-2)) {ret = val + "0";}
		else {ret = val;}
		return ret;
	},
	
	loadRecords : function(contactId) {
		//if (this.store == null || this.store.getCount() < 1 ) {
			this.store.load({
				params: {
					format: 'jsonc'//,
					//contactId: Ext.getCmp('tabs_toolbar').global_config.winconfig.mycompany_id
				}
			});
		/*
}
		else {
			this.store.clearFilter();
			this.store.contactId = contactId;
			this.store.filterBy(function(record, id){
				if (record.get('contactId') == this.contactId) 
					return true;
				else 
					return false;
			})
		}
*/
    }
});


/****************************************************************************************************/

CahrecordsPanel = function(config){
	Ext.apply(this, config);
	
	var reader = new Ext.data.JsonReader({
            root: 'Cashrecords',
            fields: [
					 {name: 'cashrec_type', mapping: 'cashrec_type'},
                     {name: 'category_name', mapping: 'category_name'},                  
                     {name: 'dr_account_no', mapping: 'dr_account_no'},
                     {name: 'debit_amount', mapping: 'debit_amount'},
                     {name: 'cr_account_no', mapping: 'cr_account_no'},
                     {name: 'credit_amount', mapping: 'credit_amount'}
					]
        });
	
	this.store = new Ext.data.GroupingStore({
            proxy: new Ext.ux.CssProxy({ url: tx.data.cashrecords_con.url }),
            reader: reader,
            sortInfo:{field: 'cashrec_type', direction: "ASC"},
			groupField:'cashrec_type'
        });

	var value_date = new Date();
		 
	this.store.load({
		params: {
			format: 'jsonc',
			return_type : 'list',
			value_date : value_date.format('Y-m-d') 
		}
	});

		// define a custom summary function
		Ext.grid.GroupSummary.Calculations['totalAmount'] = function(v, record, field){
		        return v + (record.data.credit_amount) - (record.data.debit_amount);
    	}

		this.summary = new Ext.grid.GroupSummary();
		
		this.columns = [{
						header : "Cashflow type",
						dataIndex : 'cashrec_type',
						sortable : true,
						width : 100,
						summaryType : 'count',
						hideable : false,
						summaryRenderer : function(v, params, data) {
							return ((v === 0 || v > 1)
									? '(' + v + ' Cashrecords)'
									: '(1 Cashrecord)');
						},
					},{
						header : "Category",
						dataIndex : 'category_name',
						sortable : true,
						width : 100,
						align : 'right'
					},{
						id : 'account',
						header : "Debit Account",
						dataIndex : 'dr_account_no',
						sortable : true,
						width : 130,
						align : 'right'
					},   {
						header : "Debit Amount",
						dataIndex : 'debit_amount',
						width : 100,
						sortable : true,
						summaryType : 'sum',
						align : 'right',
						renderer: this.debit_amount
					},   {
						id : 'account',
						header : "Credit Account",
						dataIndex : 'cr_account_no',
						sortable : true,
						width : 130,
						align : 'right'
					}, {
						header : "Credit Amount",
						dataIndex : 'credit_amount',
						width : 100,
						sortable : true,
						summaryType : 'sum',
						align : 'right',
						renderer: this.credit_amount
					}];

		this.view = new Ext.grid.GroupingView({
			            forceFit:true,
			            showGroupName: false,
			            enableNoGroups:false, // REQUIRED!
			            hideGroupedColumn: true
			        });

		CahrecordsPanel.superclass.constructor.call(this, {
			id: 'cahrecords_summary',
			loadMask: {msg:'Loading Cashrecords Summary...'},
        	plugins: this.summary,
			height: 250,
        	clicksToEdit: 1,
			collapsible: true,
			animCollapse: false,
        	trackMouseOver: false,
			iconCls: 'icon-grid'
		});

};

Ext.extend (CahrecordsPanel, Ext.grid.EditorGridPanel,{
	 
	 amount : function (val) {
		var ret = Ext.getCmp('cahrecords_summary').format_amount(val);
		return ((ret == "0.00") ? ret : '<span style="font-weight: bold;">' + ret + '</span>');
	},
	
	debit_amount : function(val){
		return '<span style="color:red;font-weight: bold;">' + val + '</span>';
	},
	
	credit_amount : function(val){
		return '<span style="color:green;font-weight: bold;">' + val + '</span>';
	},
	
	total_amount : function (val) {
		var ret = Ext.getCmp('cahrecords_summary').format_amount(val);
		
		if(ret >= 0){ return '<span style="color:green;font-weight: bold;">' + ret + '</span>';}
		else if(ret < 0){return '<span style="color:red;font-weight: bold;">' + ret + '</span>'; }
        return ret;
	},
	
	format_amount : function (val)
	{
		var ret;
		if (val == "0") {ret = "0.00";}
		else if (val.toString().indexOf(".")<0 ) {ret = val + ".00";}
		else if (val.toString().indexOf(".") == (val.toString().length-2)) {ret = val + "0";}
		else {ret = val;}
		return ret;
	},
	
	loadRecords : function(start_day) {
		var value_date;
	 	if(start_day != null)
			{value_date = start_day;}
		else
			{value_date = new Date();}
	
	    this.store.baseParams = {
			format: 'jsonc',
			return_type : 'list',
			value_date : value_date.format('Y-m-d')		
		};
	
	    this.store.load();
    }
});

/****************************************************************************************************/
/*
 * 
 * 
 * 
 * 
 * 
 * Cashflow
 */

var detailsconfig = {	
				maximizable : true,
				collapsible : true,
				width : 920,
				height : 550,
				border : true,
				plain : true,
				shadow : true,
				layout : 'border',
				xbloney : 'default',
				closable:true,
				resizable : true,
				split : true,
				value_date: ''
			};

BloneyCashrecords = {};

BloneyCashrecords.DeatailsGrid = function( config) {

    Ext.apply(this, config);
	
	var reader = new Ext.data.JsonReader({
            root: 'Cashrecords',
            fields: [
					 {name: 'cashrecordId', mapping:'cashrecordId'},
					 {name: 'cashrec_type', mapping: 'cashrec_type'},
					 {name: 'payment_type', mapping: 'payment_type'},
					 {name: 'listId', mapping: 'listId'},
                     {name: 'category_name', mapping: 'category_name'},                  
                     {name: 'dr_value_date', mapping: 'dr_value_date', type:'date', dateFormat: "Y-m-d"},
					 {name: 'dr_account_id', mapping: 'dr_account_id'},
					 {name: 'dr_account_no', mapping: 'dr_account_no'},
                     {name: 'debit_amount', mapping: 'debit_amount'},                  
                     {name: 'cr_value_date', mapping: 'cr_value_date', type:'date', dateFormat: "Y-m-d"},
                     {name: 'cr_account_id', mapping: 'cr_account_id'},
					 {name: 'cr_account_no', mapping: 'cr_account_no'},
					 {name: 'authenticity_token', mapping:'authenticity_token'} ,
                     {name: 'reference', mapping:'reference'},
                     {name: 'original_balance', mapping:'original_balance'},
                     {name: 'repetitive_type', mapping:'repetitive_type'},
                     {name: 'record_sequence', mapping:'record_sequence'},
                     {name: 'total_records', mapping:'total_records'},
                     {name: 'repetitive_amount', mapping:'repetitive_amount'},
                     {name: 'starting_date', mapping:'starting_date', type:'date', dateFormat: "Y-m-d"},
                     {name: 'detail', mapping:'details'},
                     {name: 'credit_amount', mapping: 'credit_amount'}
					]				
        });
	
	this.store = new Ext.data.GroupingStore({
            proxy: new Ext.ux.CssProxy({ url: tx.data.cashrecords_con.url }),
            reader: reader,
            sortInfo:{field: 'cashrec_type', direction: "ASC"},
			groupField:'cashrec_type'
        });

	
	
// define a custom summary function
		Ext.grid.GroupSummary.Calculations['totalAmount'] = function(v, record, field){
		        return v + (record.data.credit_amount) - (record.data.debit_amount);
    	}

		this.summary = new Ext.grid.GroupSummary();
		
		this.columns = [{
						header : "Cashflow type",
						dataIndex : 'cashrec_type',
						sortable : true,
						width : 100,
						summaryType : 'count',
						hideable : false,
						summaryRenderer : function(v, params, data) {
							return ((v === 0 || v > 1)
									? '(' + v + ' Cashrecords)'
									: '(1 Cashrecord)');
						}/*
,
		           editor: new Ext.form.ComboBox({
		               typeAhead: true,
		               triggerAction: 'all',
		               transform:'light',
		               lazyRender:true
		            })
*/
					},{
						header : "Category",
						dataIndex : 'category_name',
						sortable : true,
						width : 100,
						align : 'right'
					},{
			           header: "Due date",
			           dataIndex: 'dr_value_date',
			           width: 80,
					   renderer: this.date,
					   align : 'right'/*
,
			           editor: new Ext.form.DateField({
			                format: 'Y-m-d',
			                minValue: '2009-02-01',
			                disabledDays: [0, 6],
			                disabledDaysText: 'In Busieness working days only'
			            })
*/
			        },{
						id : 'dr_account',
						header : "Debit Account",
						dataIndex : 'dr_account_no',
						sortable : true,
						width : 130,
						align : 'right'/*
,
			            editor: new Ext.form.TextField({
			               allowBlank: false
			           })
*/
					},   {
						header : "Debit Amount",
						dataIndex : 'debit_amount',
						width : 100,
						sortable : true,
						summaryType : 'sum',
						align : 'right',
						renderer: this.amount/*
,
			            editor: new Ext.form.NumberField({
			               allowBlank: false,
			               allowNegative: false,
			               maxValue: 100000
			            }) 
*/
					},/*
{
			           header: "Received at",
			           dataIndex: 'cr_value_date',
			           width: 80,
					   align : 'right',
					   renderer: this.date,
			           editor: new Ext.form.DateField({
			               format: 'Y-m-d',
			                minValue: '02-01-2009',
			                disabledDays: [0, 6],
			                disabledDaysText: 'In Busieness working days only'
			            })
			        }, 
*/  {
						id : 'account',
						header : "Credit Account",
						dataIndex : 'cr_account_no',
						sortable : true,
						width : 130,
						align : 'right'/*
,
			           	editor: new Ext.form.TextField({
			               allowBlank: false
			           })
*/
					}, {
						header : "Credit Amount",
						dataIndex : 'credit_amount',
						width : 100,
						sortable : true,
						summaryType : 'sum',
						align : 'right',
						renderer: this.amount/*
,
			            editor: new Ext.form.NumberField({
			               allowBlank: false,
			               allowNegative: false,
			               maxValue: 100000
			            }) 
*/
					}];

		this.view = new Ext.grid.GroupingView({
			            forceFit:true,
			            showGroupName: false,
			            enableNoGroups:false, // REQUIRED!
			            hideGroupedColumn: true,
						enableRowBody:true,
			            showPreview:true,
			            autoExpandColumn: 'category_name'
			        });

	

		
		
    BloneyCashrecords.DeatailsGrid.superclass.constructor.call(this, {
        //region: 'center',
        loadMask: {msg:'Loading Cashrecords...'},
		plugins: this.summary,
		listeners: {
			rowselect: function(sm, row, rec) {
				//Ext.getCmp("cashrecorddetails").getForm().loadRecord(rec);
		   	}
		},
        sm: new Ext.grid.RowSelectionModel({
            singleSelect:true
        })
		
    });

	this.on('rowcontextmenu', this.onContextClick, this);
	this.on('celldblclick', this.onCellDbClick, this);
	this.on('rowclick', this.onRowClick, this);
};


Ext.extend(BloneyCashrecords.DeatailsGrid, Ext.grid.EditorGridPanel, {
	date : function (val) {
		return  val.dateFormat('Y-m-d') ;
	},
	
	amount : function (val) {
		var ret = Ext.getCmp('cash_grid').format_amount(val);
		return ((ret == "0.00") ? ret : '<span style="font-weight: bold;">' + ret + '</span>');
	},
	
	total_amount : function (val) {
		var ret = Ext.getCmp('cash_grid').format_amount(val);
		
		if(ret >= 0){ return '<span style="color:green;font-weight: bold;">' + ret + '</span>';}
		else if(ret < 0){return '<span style="color:red;font-weight: bold;">' + ret + '</span>'; }
        return ret;
	},
	
	format_amount : function (val)
	{
		var ret;
		if (val == "0") {ret = "0.00";}
		else if (val.toString().indexOf(".")<0 ) {ret = val + ".00";}
		else if (val.toString().indexOf(".") == (val.toString().length-2)) {ret = val + "0";}
		else {ret = val;}
		return ret;
	},
	
    onContextClick : function(grid, index, e){
	        /*
		if(!this.menu){ // create context menu on first right click
	            this.menu = new Ext.menu.Menu({
	                id:'detailedgrid-ctx',
	                items: [
					// stick any markup in a menu
		            '<b class="x-toolbar x-small-editor">Cashrecords Context</b>',
		            '-',{
		                text: 'Audit',
		                menu: {// <-- submenu by nested config object
		                    items: [
		                        // stick any markup in a menu
		                        '<b class="x-toolbar x-small-editor">Filter</b>','-',
		                        {
		                            text: 'by Date',
		                            checked: true,
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'by Category',
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'by Status',
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'Other ...',
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                       }]
		                }
		            }, {
		                text: 'Navigate',
		                menu: {        // <-- submenu by nested config object
		                    items: [
		                        // stick any markup in a menu
		                        '<b class="x-toolbar x-small-editor">Navigate</b>','-',
		                        {
		                            text: 'Tomorow',
		                            checked: true,
		                            group: 'navigate',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'Next Week',
		                            group: 'navigate',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'Yesterday',
		                            group: 'navigate',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'Last Week',
		                            group: 'navigate',
		                            checkHandler: this.onItemCheck
		                        },{
					                text: 'Find by Date',
					                cls: 'calendar',
					                menu: this.dateMenu // <-- submenu by reference
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
*/
    	},

	onContextHide : function(){
	        if(this.ctxRow){
	            Ext.fly(this.ctxRow).removeClass('x-node-ctx');
	            this.ctxRow = null;
	        }
    	},

	onRowClick : function(grid, rowIndex, e){
		var record = grid.getStore().getAt(rowIndex);  // Get the Record
        Ext.getCmp('cashrecordsform').form.setValues( [
									  {id:'cashrecord_id', value:record.data.cashrecordId},
								      {id:'authenticity_token', value:record.data.authenticity_token},
        							  {id:'categoriesfrom', value:record.data.listId},
									  {id:'categoriesto', value:record.data.listId},
									  {id:'payment_type', value:record.data.payment_type},
        							  {id:'reference', value:record.data.reference},
									  {id:'fromaccount', value:record.data.dr_account_id},
									  {id:'amount', value:record.data.debit_amount},
									  {id:'dr_value_date', value:record.data.dr_value_date},
									  {id:'toaccount', value:record.data.cr_account_id},
									  {id:'cr_value_date', value:record.data.cr_value_date},
									  {id:'amount', value:record.data.credit_amount},
									  {id:'amount', value:record.data.original_balance},
									  {id:'repetition', value:record.data.repetitive_type},
									  {id:'numpayments', value:record.data.record_sequence},
									  {id:'numpayments', value:record.data.total_records},
									  {id:'totalamount', value:record.data.repetitive_amount},
									  {id:'startdate', value:record.data.starting_date},
									  {id:'details', value:record.data.details}]);
		
		Ext.getCmp('template').setValue(record.data.cashrec_type);
		
		Ext.getCmp('cashrecordsstories').loadRecords( record.data.cashrecordId,'Cashrecord');
	},
	
	onCellDbClick : function(grid, rowIndex, columnIndex, e){
		
		var data = this.store.data.items[rowIndex].data;
		//var tabs = Ext.getCmp('tabcashrecords').getItem('cashrecord_story');
		//tabs.setTitle("Blog - "+ node.attributes.text);
		//tabs.handleActivate(Ext.getCmp('tabcashrecords').getItem('cashrecord_story'), data);
	},

  	loadRecords : function(value_date) {
		
		if (value_date == null)
		{
			if (this.value_date == null)
				this.value_date  = new Date();	
		}	
		else
		{
			this.value_date  = new Date(value_date);
		}	
		
		
	    
		this.store.load({
			params: {
				format: 'jsonc',
				return_type : 'list',
				value_date : this.value_date.format("Y-m-d"), 
				accountId : Ext.getCmp('cashrecordsgrid').mainaccountId
			}
		});
    }
});

BloneyCashrecords.Search = function( config) {

	Ext.apply(this, config);
	
	this.detailedgrid = new BloneyCashrecords.DeatailsGrid({ title: 'Cashrecords search results', id : 'searchcashrecords'});
	//this.detailedgrid.loadRecords(config.value_date);
	
	
	BloneyCashrecords.Search.superclass.constructor.call(this, {
		frame:true,
		id : 'search',
		title: 'Search & Filter',
		width: 550,
		layout:'form',
		listeners: {activate: this.handleActivate},
		items:[
				{
					xtype:'fieldset',
					title: 'Cashrecords Search',
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
										defaults: {
											width : config.width*(1-config.side_width)/2,
											labelWidth : config.width*0.10
										},
										items:[
												new ListSelector({
											        id: 'categoriessearch',
											        fieldLabel: 'By category',
											        store : tx.data.categorylists,
													listenForLoad: true,
													root_listType:'CATEGORY',
													root_text: "Ecco Categories"
											    }),
												{
													xtype:"combo",
													fieldLabel:"By Cashrecord Status",
													store: new Ext.data.SimpleStore({
														fields: ['state', 'state_name'],
														data : [['ACTV','Active'],
																['ARCH','Archived'],
																['BLNC','Balanced'],
																['INVS','Investigation']]
													    }),
													displayField:'state_name',
													valueField : 'state',
													hiddenName : 'state_name',
													typeAhead: true,
													id: 's_cashrec_status',
													mode: 'local',
													triggerAction: 'all',
													emptyText:'Show me please...',
													selectOnFocus:true,
													//width : this.winconfig.width*0.2
												}
										]
									},{
										columnWidth: 0.5,
										layout: 'form',
										defaults: {
											width : config.width*(1-config.side_width)/2,
											labelWidth : config.width*0.10
										},
										items:[
												{
														store: new Ext.data.SimpleStore({
															fields: ['template', 'template_name'],
															data : [['direct debit','Repeated debit'],
																	['debit','Pay to'],
																	['expected debit','Expected payment'],
																	['direct credit','Repeated credit'],
																	['credit','Receive from'],
																	['expected credit','Expected income']]
														}),
														displayField:'template_name',
														valueField : 'template',
														typeAhead: true,
														mode: 'local',
														triggerAction: 'all',
														emptyText:'Tempalte name...',
														selectOnFocus:true,
														emptyText:'Category...',
														//width:(config.side_width*config.width*0.65),
														xtype:"combo",
														fieldLabel:"Cashflow Type",
														allowBlank:false,
														name : 'template',
														id : 's_template'
												},{
													xtype: "datefield",
													fieldLabel: 'Date from',
													name: 'datefrom',
													allowBlank:false,
													id : 's_datefrom'
												},
												{
													xtype: "datefield",
													fieldLabel: 'Date to',
													name: 'datefrom',
													allowBlank:false,
													id : 's_dateto'
												}
										]
									}
								]
							}
					]
				},
			this.detailedgrid
		  ],
		  buttons:[{
				text:"Clear All"
			},{
				text:"Cancel"
			}]
	});
};

Ext.extend(BloneyCashrecords.Search, Ext.form.FormPanel, {

    handleActivate : function(tab){
			tab.doLayout();
	}
});

BloneyCashrecords.Grid = function(viewer, config) {

    this.viewer = viewer;
    this.start_date = new Date();
	this.mainaccountId = '0';
	
    Ext.apply(this, config);

   	this.dateMenu = new Ext.menu.DateMenu({
		handler : function(dp, date){
			
			Ext.getCmp('cashrecordsgrid').store.baseParams = {
					start_day:date.format('Y-m-d')
			};
			Ext.getCmp('cashrecordsgrid').store.load();
		}
	});

	// Menus can be prebuilt and passed by reference
	this.colorMenu = new Ext.menu.ColorMenu({
		handler : function(cm, color){
			
		}
	});

   	var reader = new Ext.data.JsonReader({
            root: 'Cashrecords',
            fields: [
						{name: 'date', mapping : 'date' , type:'date', dateFormat: "Y-m-d"},
					    {name: 'day', type:'string'},
					    {name: 'debit', type:'string'},
					    {name: 'credit', type:'string'},
					    {name: 'antidebit', type:'string'},
					    {name: 'anticredit', type:'string'},
					    {name: 'total', type:'string'}					
					]
        });
	
	this.store = new Ext.data.GroupingStore({
            proxy: new Ext.ux.CssProxy({ url: tx.data.cashrecords_con.url }),
            reader: reader,
            sortInfo:{field: 'date', direction: "ASC"}
        });
	this.value_date = new Date();
	
	this.store.load({
		params: {
			format: 'jsonc',
			accountId : this.mainaccountId,
			value_date : this.value_date.format("Y-m-d") 
		}
	});


    BloneyCashrecords.Grid.superclass.constructor.call(this, {
        id: 'cashrecordsgrid',
        loadMask: {msg:'Loading Cashrecords...'},
		store : this.store,
        view: new Ext.grid.GroupingView({
                forceFit:true,
                groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
        }),
		columns : [{
			           id: 'date',
			           header: "Date",
			           dataIndex: 'date',
					   align : 'left',
			           width: 75,
					   renderer: this.date
			        },{
			           header: "Day of week",
			           dataIndex: 'day',
					   align : 'right',
			           width: 75
			        },{
			           header: "Debit",
			           dataIndex: 'debit',
			           width: 100,
					   align : 'right',
					   renderer: this.amount
			        },{
			           header: "Budget - Debit",
			           dataIndex: 'antidebit',
			           width: 100,
					   align : 'right',
					   renderer: this.amount
			        },{
			           header: "Credit",
			           dataIndex: 'credit',
			           width: 100,
					   align : 'right',
					   renderer: this.amount
			        },{
			           header: "Budget - Credit",
			           dataIndex: 'anticredit',
			           width: 100,
					   align : 'right',
					   renderer: this.amount
			        },{
					   id : 'total',
			           header: "End Of Day Balance",
			           dataIndex: 'total',
			           width: 150,
					   align : 'right',
					   renderer: this.total_amount
			        }],
        sm: new Ext.grid.RowSelectionModel({
            singleSelect:true
        })
    });

	this.on('rowcontextmenu', this.onContextClick, this);
	this.on('celldblclick', this.onCellDbClick, this);
	this.on('cellclick', this.onCellClick, this);
	this.store.on('load', this.onBeforeShow, this);
};

Ext.extend(BloneyCashrecords.Grid, Ext.grid.GridPanel, {
	
	date : function (val) {
		var ret_ind = Ext.getCmp('cashrecordsgrid').getStore().find('date', val);
		var record	= Ext.getCmp('cashrecordsgrid').getStore().getAt(ret_ind);
		var bRecordsExists = (record.get("debit") !=  "0.0" ) ||
							 (record.get("credit") !=  "0.0" ) ||
							 (record.get("antidebit") !=  "0.0" ) ||
							 (record.get("anticredit") !=  "0.0" ) 		;
							 	
		return '<span style="font-weight: '+ (bRecordsExists  ?  'bold' : 'normal') + ';">' + val.dateFormat('Y-m-d') + '</span>';
	},
	amount : function (val) {
		var ret = Ext.getCmp('cashrecordsgrid').format_amount(val);
		return ((ret == "0.00") ? ret : '<span style="font-weight: bold;">' + ret + '</span>');
	},
	total_amount : function (val) {
		var ret = Ext.getCmp('cashrecordsgrid').format_amount(val);
		
		if(ret > 0){ return '<span style="color:green;font-weight: bold;">' + ret + '</span>';}
		else if(ret < 0){return '<span style="color:red;font-weight: bold;">' + ret + '</span>'; }
        return ret;
	},
	format_amount : function (val)
	{
		var ret;
		if (val == "0") {ret = "0.00";}
		else if (val.toString().indexOf(".")<0 ) {ret = val + ".00";}
		else if (val.toString().indexOf(".") == (val.toString().length-2)) {ret = val + "0";}
		else {ret = val;}
		return ret;
	},
	
	onBeforeShow : function (){
		/*
var last = Ext.getCmp('cashrecordsgrid').getStore().data.length;
		Ext.getCmp('smtotalmnthamount').setValue(this.format_amount(Ext.getCmp('cashrecordsgrid').getStore().getAt(0).data.total));
		Ext.getCmp('emtotalmnthamount').setValue(this.format_amount(Ext.getCmp('cashrecordsgrid').getStore().getAt(last-1).data.total));
*/
	},
	
    onContextClick : function(grid, index, e){
	        if(!this.menu){ // create context menu on first right click
	            this.menu = new Ext.menu.Menu({
	                id:'grid-ctx',
	                items: [
					// stick any markup in a menu
		            '<b class="x-toolbar x-small-editor">Cashrecords Context</b>',
		            '-', {
		                text: 'Search',
						cls: 'search',
		                menu: {        // <-- submenu by nested config object
		                    items: [
		                        // stick any markup in a menu
		                        '<b class="x-toolbar x-small-editor">Search</b>','-',
		                        {
		                            text: 'by Date',
		                            checked: true,
		                            group: 'search',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'by Category',
		                            group: 'search',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'Advanced',
		                            group: 'search',
		                            checkHandler: this.onItemCheck
		                       }]
		                }
		            },{
		                text: 'Filter',
						cls: 'filter',
		                menu: {        // <-- submenu by nested config object
		                    items: [
		                        // stick any markup in a menu
		                        '<b class="x-toolbar x-small-editor">Filter</b>','-',
		                        {
		                            text: 'by Date',
		                            checked: true,
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'by Category',
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'by Status',
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'Other ...',
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                       }]
		                }
		            }, {
		                text: 'Navigate',
				cls: 'navigate',
		                menu: {        // <-- submenu by nested config object
		                    items: [
		                        // stick any markup in a menu
		                        '<b class="x-toolbar x-small-editor">Navigate</b>','-',
		                        {
		                            text: 'Next Month',
		                            checked: true,
		                            group: 'navigate',
		                            handler: function() {
										Ext.getCmp('cashrecordsgrid').start_date.setMonth(Ext.getCmp('cashrecordsgrid').start_date.getMonth() + 1) ;
										Ext.getCmp('cashrecordsgrid').store.baseParams = {
												start_day:Ext.getCmp('cashrecordsgrid').start_date.format('Y-m-d')
											};
										Ext.getCmp('cashrecordsgrid').store.load();
									}
		                        },{
		                            text: 'Next Year',
		                            group: 'navigate',
		                            handler: function() {
										Ext.getCmp('cashrecordsgrid').start_date.setFullYear(Ext.getCmp('cashrecordsgrid').start_date.getFullYear()  + 1) ;
										Ext.getCmp('cashrecordsgrid').store.baseParams = {
												start_day:Ext.getCmp('cashrecordsgrid').start_date.format('Y-m-d')
											};
										Ext.getCmp('cashrecordsgrid').store.load();
									}
		                        },{
		                            text: 'Last Month',
		                            group: 'navigate',
		                            handler: function() {
										Ext.getCmp('cashrecordsgrid').start_date.setMonth(Ext.getCmp('cashrecordsgrid').start_date.getMonth() - 1) ;
										Ext.getCmp('cashrecordsgrid').store.baseParams = {
												start_day:Ext.getCmp('cashrecordsgrid').start_date.format('Y-m-d')
											};
										Ext.getCmp('cashrecordsgrid').store.load();
									}
		                        },{
		                            text: 'Last Year',
		                            group: 'navigate',
		                            handler: function() {
										Ext.getCmp('cashrecordsgrid').start_date.setFullYear(Ext.getCmp('cashrecordsgrid').start_date.getFullYear() + 1) ;
										Ext.getCmp('cashrecordsgrid').store.baseParams = {
												start_day:Ext.getCmp('cashrecordsgrid').start_date.format('Y-m-d')
											};
										Ext.getCmp('cashrecordsgrid').store.load();
									}
		                        },{
					                text: 'Find by Date',
					                cls: 'calendar',
					                menu: this.dateMenu // <-- submenu by reference
					           }]
		                }
		            },{
		                text: 'Configure',
						cls: 'configure',
		                menu: {        // <-- submenu by nested config object
		                    items: [
		                        // stick any markup in a menu
		                        '<b class="x-toolbar x-small-editor">Configure</b>','-',
		                        {
					                text: 'Color active',
					                menu: this.colorMenu // <-- submenu by reference
					            },{
		                            text: 'Show messages',
		                            group: 'configure',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'Approval',
		                            group: 'configure',
		                            checkHandler: this.onItemCheck
		                       }]
		                }
		            }
		        ]
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
	onNavigate : function(item, checked){

			Ext.example.msg('Test', 'Test');
		},
	onCellDbClick : function(grid, rowIndex, columnIndex, e){

		this.value_date = grid.getStore().getAt(rowIndex).get("date");
		var position  = Ext.getCmp('cashrecordsgrid').getTopToolbar().getPosition();
		var y_offset = Ext.getCmp('cashrecordsgrid').getTopToolbar().getSize().height;
		var y_height = Ext.getCmp('cashrecordsgrid').getSize().height;
		var x_width = Ext.getCmp('cashrecordsgrid').getSize().width;
		var x_offset = Ext.getCmp('cashrecordsgrid').getColumnModel().getColumnById('date').width;
		
		var cashrecordsWin = ((Ext.getCmp('wndcashrecords') == null )? new BloneyCashrecords.MainWnd(detailsconfig) : Ext.getCmp('wndcashrecords'));
		
		cashrecordsWin.setPosition(position[0]+x_offset, position[1] + y_offset);
		cashrecordsWin.setSize({
				width: x_width - x_offset,
				height: y_height - 2 * y_offset
			});
		
		
		Ext.getCmp('dr_value_date').setValue(this.value_date);
		Ext.getCmp('cr_value_date').setValue(this.value_date);
		Ext.getCmp('startdate').setValue(this.value_date);
		//Ext.getCmp('template').setValue(record_type);
		Ext.getCmp('cash_grid').loadRecords(this.value_date);
		
		cashrecordsWin.show.defer(100, cashrecordsWin);
	},
	
	cashrecordsWnd : function(){
		
		var position  = Ext.getCmp('cashrecordsgrid').getTopToolbar().getPosition();
		var y_offset = Ext.getCmp('cashrecordsgrid').getTopToolbar().getSize().height;
		var y_height = Ext.getCmp('cashrecordsgrid').getSize().height;
		var x_width = Ext.getCmp('cashrecordsgrid').getSize().width;
		var x_offset = Ext.getCmp('cashrecordsgrid').getColumnModel().getColumnById('date').width;
		
		var cashrecordsWin = Ext.getCmp('wndcashrecords') == null ? new BloneyCashrecords.MainWnd(detailsconfig) : Ext.getCmp('wndcashrecords');
		
		cashrecordsWin.setPosition(position[0]+x_offset, position[1] + y_offset);
		cashrecordsWin.setSize({
				width: x_width - x_offset,
				height: y_height - 2 * y_offset
			});
		
		cashrecordsWin.show.defer(100, cashrecordsWin);
	},
	
	onCellClick : function(grid, rowIndex, columnIndex, e){
		
		if (Ext.getCmp('wndcashrecords')) {
			this.value_date = grid.getStore().getAt(rowIndex).get("date");
			Ext.getCmp('cash_grid').loadRecords(this.value_date);			
		}
		
	},
	
	filterByCategory  : function(listId,start_date) {
		
		if(start_date == null || start_date=='')
			this.start_date = new Date();
		else
			this.start_date = start_date;
			
		this.store.baseParams = {
				start_day: this.start_date.format('Y-m-d'),
				listId : listId,
				accountId : this.mainaccountId,
				format : 'jsonc'
        };
        this.store.load();
    },
	
    loadRecords : function(start_date, cashrec_status) {

		if(start_date == null || start_date=='')
			this.start_date = new Date();
		else
			this.start_date = start_date;
		

        this.store.baseParams = {
				start_day: this.start_date.format('Y-m-d'),
				cashrec_status : (cashrec_status == null ? 'ACTV' : cashrec_status),
				accountId : this.mainaccountId,
				format : 'jsonc'
        };
        this.store.load({
				callback: function(){
					var last = Ext.getCmp('cashrecordsgrid').getStore().data.length;
					Ext.getCmp('smtotalmnthamount').setValue(Ext.getCmp('cashrecordsgrid').format_amount(Ext.getCmp('cashrecordsgrid').getStore().getAt(0).data.total));
					Ext.getCmp('emtotalmnthamount').setValue(Ext.getCmp('cashrecordsgrid').format_amount(Ext.getCmp('cashrecordsgrid').getStore().getAt(last - 1).data.total));
				}
			});
    }
});

BloneyCashrecords.CollaborateWnd = function(config){
	
	Ext.apply(this, config);
	this.postcashrecords = new BloneyCashrecords.DeatailsGrid({
						id: 'postcashrecords',
						title: 'Export Cashrecords',
						iconCls : 'export-icon',
						height: (config.height - 95),
						listeners: {activate: this.handleActivate}
	});
	this.postcashrecords.loadRecords(new Date());
	
	this.adoptcashrecords  = new BloneyCashrecords.DeatailsGrid({
						id: 'adoptcashrecords',
						title: 'Import Cashrecords',
						iconCls : 'import-icon',
						height: (config.height - 95),
						listeners: {activate: this.handleActivate}
	});
	this.adoptcashrecords.loadRecords(new Date());
	
	this.collaboratetabs = new Ext.TabPanel({
				region: 'center',
				margins:'3 3 3 0',
				//activeTab: 0,
				defaults:{autoScroll:true},
				id: 'collaborate_tabs',
				items:[
					this.postcashrecords,
					this.adoptcashrecords
				]
			});
			
	BloneyCashrecords.CollaborateWnd.superclass.constructor.call(this, {
		title : 'Bloney Cashrecords Collaborate',
		id: 'wndcashcollaborate',
		iconCls:'collaborate-icon',
		modal : true,
		width : config.width,
		height : config.height,
        items: [this.collaboratetabs],
		buttons: [{
				text: 'Close Cashrecords Collaborate Window',
				handler : function() {
					Ext.getCmp('wndcashcollaborate').close();
				}
			}]
		});
	
	
};

Ext.extend(BloneyCashrecords.CollaborateWnd, Ext.Window,{
	
	handleActivate : function(tab){

		
		tab.doLayout();		
	}
});
/*
 * CashrecordsCategories
 */
BloneyCashrecords.MainWnd = function(config) {
	Ext.apply(this, config);
	
	config.side_width = 0.35;
	config.closable = false;
	var now = new Date();
	
	this.split = false;
	this.receive = false;
	this.expected = false;
	this.source = "";
	
	this.detailedgrid = new BloneyCashrecords.DeatailsGrid(
		{ 
		  title: 'Cashrecords',
		  id: 'cash_grid',
		  region : 'center',
		  listeners: {activate: this.handleActivate}
	});
	
	this.detailedgrid.loadRecords(now);
	
	
	this.search = new BloneyCashrecords.Search(config);
	
	this.stories =new Bloney.Stories({
		id:'cashrecordsstories',
		title:'Cash Movements Blog'
	});
	
	this.documents  = new Ext.ux.FileTreePanel({
		autoWidth:true
		,id:'attachment'
		,title:'Attached Documents'
		//,renderTo:'treepanel'
		,rootPath:'root'
		,topMenu:true
		,autoScroll:true
		,enableProgress:false
		,deleteUrl : tx.data.documents_con.destroy_remote_url
		,renameUrl: tx.data.documents_con.update_remote_url
		,newdirUrl: tx.data.documents_con.create_remote_url
//		,baseParams:{additional:'haha'}
//		,singleUpload:true
	});
	
	 this.documents.on('dblclick', function(node, e){
         if(node.isLeaf() && node.attributes.link){
            e.stopEvent();
            //main.loadClass(node.attributes.link, node.attributes.text);
            //Ext.getCmp('wndbloneydocument').updateDetails(node);
         }
    });
	
	
	this.tabs = new Ext.TabPanel({
		region: 'center',
		//margins:'3 3 3 0',
		id : 'tabcashrecords',
		activeTab: 0,
		tabPosition : 'bottom',
		defaults:{autoScroll:true},
		items:[
			this.detailedgrid,
			this.search,
			this.stories,
			this.documents
		],
		tbar: [{
					text : 'Create New',
					id : 'new_cachrecord',
					iconCls:'cashrecord-icon',
					handler: function(){
						if (Ext.getCmp('template').getValue() != '') {
							var bReceive = Ext.getCmp('wndcashrecords').receive;
							var bSplit = Ext.getCmp('wndcashrecords').split;
							var data = {
								cashrecordId: Ext.getCmp('cashrecord_id').getValue(),
								//authenticity_token : Ext.getCmp('template').getValue(),									
								cashrec_type: Ext.getCmp('template').getValue(),
								listId: bReceive ? Ext.getCmp('categoriesfrom').getValue() : Ext.getCmp('categoriesto').getValue(),
								//reference : Ext.getCmp('reference').getValue(),
								dr_account_id: Ext.getCmp('fromaccount').getValue(),
								debit_amount: bReceive ? "0.00" : (bSplit ? Ext.getCmp('totalamount').getValue() : Ext.getCmp('amount').getValue()),
								dr_value_date: bReceive ? Ext.getCmp('cr_value_date').getValue() : Ext.getCmp('dr_value_date').getValue(),
								cr_account_id: Ext.getCmp('toaccount').getValue(),
								credit_amount: bReceive ? (bSplit ? Ext.getCmp('totalamount').getValue() : Ext.getCmp('amount').getValue()) : "0.00",
								cr_value_date: bReceive ? Ext.getCmp('cr_value_date').getValue() : Ext.getCmp('dr_value_date').getValue(),
								original_balance: Ext.getCmp('amount').getValue(),
								repetitive_type: Ext.getCmp('repetition').getValue(),
								record_sequence: Ext.getCmp('numpayments').getValue(),
								total_records: Ext.getCmp('numpayments').getValue(),
								repetitive_amount: Ext.getCmp('totalamount').getValue(),
								starting_date: Ext.getCmp('startdate').getValue(),
							    //details : Ext.getCmp('details').getValue()
							};
							
							Ext.Ajax.request({
								url: tx.data.cashrecords_con.create_remote_url,
								scriptTag: true,
								callbackParam: 'jsoncallback',
								timeout: 10,
								params: {
									format: 'js',
									cashrecord: Ext.util.JSON.encode(data)
								},
								success: function(r){
									Ext.getCmp('cashrecordsform').form.setValues([{
										id: 'reference',
										value: ("REF_" + now.getYear() + now.getMonth() + now.getDay() + now.getHours() + now.getMinutes() + now.getSeconds())
									}]);
									this.publish('/desktop/notify', {
										title: 'Bloney Cashrecords',
										iconCls: 'bloney-icon',
										html: r.responseObject.notice
									});
								},
								failure: function(r){
									this.publish('/desktop/notify', {
										title: 'Bloney Cashrecords',
										iconCls: 'bloney-icon',
										html: r.responseObject.notice
									});
								},
								scope: this
							});
							Ext.getCmp('wndcashrecords').refresh();
						}else
						{
							Ext.Msg.alert('Attention','Please fill all required fields');
						}
					}		
				},{
					text: 'Save Changes',
					iconCls:'save-contacts-icon',
					handler : function() {
						if (Ext.getCmp('template').getValue() != '') {
							var bReceive = Ext.getCmp('wndcashrecords').receive;
							var bSplit = Ext.getCmp('wndcashrecords').split;
							var data = {
								cashrecordId: Ext.getCmp('cashrecord_id').getValue(),
								//authenticity_token : Ext.getCmp('template').getValue(),									
								cashrec_type: Ext.getCmp('template').getValue(),
								listId: bReceive ? Ext.getCmp('categoriesfrom').getValue() : Ext.getCmp('categoriesto').getValue(),
								//reference : Ext.getCmp('reference').getValue(),
								dr_account_id: Ext.getCmp('fromaccount').getValue(),
								debit_amount: bReceive ? "0.00" : (bSplit ? Ext.getCmp('totalamount').getValue() : Ext.getCmp('amount').getValue()),
								dr_value_date: bReceive ? Ext.getCmp('cr_value_date').getValue() : Ext.getCmp('dr_value_date').getValue(),
								cr_account_id: Ext.getCmp('toaccount').getValue(),
								credit_amount: bReceive ? (bSplit ? Ext.getCmp('totalamount').getValue() : Ext.getCmp('amount').getValue()) : "0.00",
								cr_value_date: bReceive ? Ext.getCmp('cr_value_date').getValue() : Ext.getCmp('dr_value_date').getValue(),
								original_balance: Ext.getCmp('amount').getValue(),
								repetitive_type: Ext.getCmp('repetition').getValue(),
								record_sequence: Ext.getCmp('numpayments').getValue(),
								total_records: Ext.getCmp('numpayments').getValue(),
								repetitive_amount: Ext.getCmp('totalamount').getValue(),
								starting_date: Ext.getCmp('startdate').getValue(),
								//details : Ext.getCmp('details').getValue()
							};
							
							Ext.Ajax.request({
								url: tx.data.cashrecords_con.update_remote_url,
								scriptTag: true,
								callbackParam: 'jsoncallback',
								timeout: 10,
								params: {
									format: 'js',
									cashrecord: Ext.util.JSON.encode(data)
								},
								success: function(r){
									this.publish('/desktop/notify', {
										title: 'Bloney Cashrecords',
										iconCls: 'bloney-icon',
										html: r.responseObject.notice
									});
								},
								failure: function(r){
									this.publish('/desktop/notify', {
										title: 'Bloney Cashrecords',
										iconCls: 'bloney-icon',
										html: r.responseObject.notice
									});
								},
								scope: this
							});
							Ext.getCmp('wndcashrecords').refresh();
						}else
						{
							Ext.Msg.alert('Attention','Please fill all required fields');
						}
					}
				},{
						text : 'Delete',
						iconCls:'delete-contacts-icon',
						handler : function (){
							Ext.Ajax.request({
							    url: tx.data.cashrecords_con.destroy_remote_url,
							    scriptTag: true,
							    callbackParam: 'jsoncallback',
							    timeout: 10,
									params: {
										format: 'js',
										cashrecordId : Ext.getCmp('cashrecord_id').getValue()
							    },
							    success: function(r) {
									   this.publish( '/desktop/notify',{
								            title: 'Bloney Cashrecords',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    failure : function(r) {
								 	this.publish( '/desktop/notify',{
								            title: 'Bloney Cashrecords',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    scope: this
							});
							Ext.getCmp('wndcashrecords').refresh();		
						}		
				},{
					text: 'Clean Form',
					iconCls:'clean-contacts-icon',
					handler: function(){
						Ext.getCmp('cashrecordsform').form.setValues([
									 {id:'cashrecord_id', value:''},
								      {id:'authenticity_token', value:''},
        							  {id:'template', value:''},
        							  {id:'categories', value:''},
        							  {id:'reference', value:''},
									  {id:'fromaccount', value:''},
									  {id:'amount', value:''},
									  {id:'dr_value_date', value:''},
									  {id:'toaccount', value:''},
									  {id:'cr_value_date', value:''},
									  {id:'repetition', value:''},
									  {id:'numpayments', value:''},
									  {id:'totalamount', value:''},
									  {id:'startdate', value:''},
									  {id:'details', value:''}
						]);
						
						//Ext.getCmp('new_contact').setDisable(true);
					}
				}
				,'->'
					,{
											text : 'Attach Document',
											iconCls : 'documents-attachment-icon',
											handler : function (){
												//call documents [attachment_fu AJAX]
											}		
										},'-'
					,{
						text : 'Archive',
						iconCls:'archive-contacts-icon',
						handler : function (){
							Ext.Ajax.request({
							    url: tx.data.cashrecords_con.update_remote_url,
							    scriptTag: true,
							    callbackParam: 'jsoncallback',
							    timeout: 10,
									params: {
										format: 'js',
										contactId : Ext.getCmp('cashrecord_id').getValue(),
										task : 'archive'			
							    },
							    success: function(r) {
									  this.publish( '/desktop/notify',{
								            title: 'Bloney Cashrecord',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    failure : function(r) {
							       this.publish( '/desktop/notify',{
								            title: 'Bloney Cashrecord',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    scope: this
					    });
							Ext.getCmp('wndcashrecords').refresh();	
						}		
					},{
						text : 'Restore',
						iconCls:'restore-contacts-icon',
						handler : function (){
							Ext.Ajax.request({
							    url: tx.data.cashrecords_con.update_remote_url,
							    scriptTag: true,
							    callbackParam: 'jsoncallback',
							    timeout: 10,
									params: {
										format: 'js',
										contactId : Ext.getCmp('cashrecord_id').getValue(),
										task : 'restore'			
							    },
							    success: function(r) {
									  this.publish( '/desktop/notify',{
								            title: 'Bloney Cashrecord',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    failure : function(r) {
							       this.publish( '/desktop/notify',{
								            title: 'Bloney Cashrecord',
								            iconCls: 'bloney-icon',
								            html: r.responseObject.notice
								        });
							    },
							    scope: this
					    });
							Ext.getCmp('wndcashrecords').refresh();		
						}		
					}]
	});
	
	
	this.templates = new Ext.form.ComboBox({
			store: new Ext.data.SimpleStore({
				fields: ['template', 'template_name'],
				data : [['direct debit','Repeated debit'],
						['debit','Pay to'],
						['expected debit','Expected payment'],
						['direct credit','Repeated credit'],
						['credit','Receive from'],
						['expected credit','Expected income']]
			}),
			displayField:'template_name',
			valueField : 'template',
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all',
			emptyText:'Tempalte name...',
			selectOnFocus:true,
			emptyText:'Category...',
			width:(config.side_width*config.width*0.65),
			fieldLabel: '<b>Movement</b>',
			allowBlank:false,
			name : 'template',
			id : 'template'
	});

	this.templates.on('select',this.template_select,this);
		
	this.companiessharelist = new Ext.data.Store({
            proxy: new Ext.ux.CssProxy({ url: tx.data.contacts_con.url }),
            reader: new Ext.data.JsonReader({
            root: 'Contacts',
            fields: [
					    {name: 'contactId', mapping: 'contactId'},
					    {name: 'contact_name', mapping: 'contact_name'}      ]
        	}),
            sortInfo:{field: 'contact_name', direction: "ASC"}
        });

	this.companiessharelist.load({
		params: {
			format: 'jsonc'
		}
	});

	this.combocompaniessharelist = new Ext.form.ComboBox({
							store: this.companiessharelist,
							displayField:'contact_name',
							valueField: 'contactId',
							hiddenName: 'contact_name',
							typeAhead: true,
							fieldLabel: 'Account Owner',
							id:'crcds_contact_name',
							width : config.width*0.21,
							labelWidth : config.width*0.07,
							mode: 'local',
							triggerAction: 'all',
							emptyText:'Contact Name...',
							selectOnFocus:true,
							allowBlank:true
					});
	
	this.myaccountslist = new Ext.data.Store({
            proxy: new Ext.ux.CssProxy({ url: tx.data.accounts_con.url }),
            reader: new Ext.data.JsonReader({
            root: 'Accounts',
            fields: [
					    {name: 'accountId', mapping: 'accountId'},
					    {name: 'account_alias', mapping: 'account_alias'}   ]
        	}),
            sortInfo:{field: 'account_alias', direction: "ASC"}
        });

	this.myaccountslist.load({
		params: {
			format: 'jsonc'
		}
	});
	
	this.combofromaccount = new Ext.form.ComboBox({
							store: this.myaccountslist,
							displayField: 'account_alias',
							valueField: 'accountId',
							hiddenName: 'accountId',
							typeAhead: true,
							fieldLabel: 'From account',
							id:'fromaccount',
							width : config.width*0.21,
							labelWidth : config.width*0.07,
							mode: 'local',
							triggerAction: 'all',
							emptyText:'Account...',
							selectOnFocus:true,
							allowBlank:true
					});
					
	this.combotoaccount = new Ext.form.ComboBox({
							store: this.myaccountslist,
							displayField: 'account_alias',
							valueField: 'accountId',
							hiddenName: 'accountId',
							typeAhead: true,
							fieldLabel: 'To account',
							id:'toaccount',
							width : config.width*0.21,
							labelWidth : config.width*0.07,
							mode: 'local',
							triggerAction: 'all',
							emptyText:'Account...',
							selectOnFocus:true,
							allowBlank:true
					});				
	this.calculatorA;
	this.amountfield = new Ext.form.TriggerField({
				fieldLabel: '<b>Amount</b>',
				name: 'amount',
				value: '0.00',
				id :'amount'
	});
	this.amountfield.onTriggerClick = this.triggerCalcA;
	
	this.calculatorTA;
	this.totalamountfield = new Ext.form.TriggerField({
				fieldLabel: 'Amount',
				name: 'totalamount',
				id: 'totalamount',
				value: '0.00'
				
	});
	this.totalamountfield.onTriggerClick = this.triggerCalcTA;
	
	this.repetetive = new Ext.form.ComboBox({
			store: new Ext.data.SimpleStore({
				fields: ['repetype', 'repedesc'],
				data : [['DAY','Every Day'],
						['WEEK','Every Week'],
						['TWOWEEK','Every Two Weeks'],
						['MONTH','Every Month'],
						['QUARTER','Every Quarter'],
						['HALFYEAR','Every Half Year'],
						['YEAR','Every Year']]
			}),
			displayField:'repedesc',
			valueField: 'repetype',
			hiddenName: 'repetype',
			typeAhead: true,
			mode: 'local',
			triggerAction: 'all',
			emptyText:'Repetition...',
			selectOnFocus:true,
			width:(config.side_width*config.width*0.45),
			fieldLabel: 'Repetition',
			id : 'repetition'
	});

	
	this.comboxcategoriesfrom = new ListSelector({
        id: 'categoriesfrom',
        fieldLabel: 'From category',
        store : tx.data.categorylists,
		listenForLoad: true,
		root_listType:'CATEGORY',
		root_text: "Ecco Categories"
    });
	
	this.comboxcategoriesto = new ListSelector({
        id: 'categoriesto',
        fieldLabel: 'To category',
        store : tx.data.categorylists,
		listenForLoad: true,
		root_listType:'CATEGORY',
		root_text: "Ecco Categories"
    });
	
	
	
	this.cashrecordsform = new Ext.FormPanel({
			labelWidth: config.width*0.1, // label settings here cascade unless overridden
			frame:true,
			width: config.width*config.side_width,
			defaultType: 'textfield',
			region: 'east',
            split: true,
            collapsible: true,
            id:'cashrecordsform',
			title : 'Move Money',
			autoScroll : true,
			defaults : {
				width : config.width*0.21
			},
			items: [{
						xtype:"hidden",
						id:'cashrecord_id'
					},{
						xtype:"hidden",
						id:'authenticity_token'
					},
					this.templates,
					{
						xtype:'fieldset',
						title: 'Receive',
						defaultType: 'textfield',
						checkboxToggle:false,
						collapsible : true,
						width : ( config.side_width*config.width*0.9),
						defaults: {width: config.side_width*config.width*0.50},
						autoHeight:true,
						id : 'moneyfromfields',
						items :[
							this.comboxcategoriesfrom,
							this.combotoaccount,
							{
									fieldLabel: 'By due date',
									xtype:"datefield",
									name: 'accountbalancedate',
									id: 'cr_value_date',
									allowBlank:false,
									format: 'Y-m-d',
						            minValue: '2009-02-01'
							}
						]
					},{
						xtype:'fieldset',
						title: 'Pay',
						defaultType: 'textfield',
						checkboxToggle:false,
						collapsible : true,
						collapsed: true,
						width : ( config.side_width*config.width*0.9),
						defaults: {width: config.side_width*config.width*0.50},
						autoHeight:true,
						id : 'moneytofields',
						items :[
							this.combofromaccount,
							this.comboxcategoriesto,
							{
									fieldLabel: 'By due date',
									id: 'dr_value_date',
									xtype:"datefield",
									name: 'accountbalancedate',
									allowBlank:false,
									format: 'Y-m-d',
						            minValue: '2009-02-01'
							}
						]
					},/*
{
									xtype:"combo",
									fieldLabel:"<b>From or To</b>",
									store: new Ext.data.SimpleStore({
											fields: ['payment_type', 'payment_type_desc'],
											data : [['CASH','Cash'],
													['CREDIT_CARD','Credit Card'],
													['CHECK','Check'], 
													['BANK','Bank Account']]
									}),
									displayField:'payment_type_desc',
									valueField: 'payment_type',
									hiddenName: 'payment_type_desc',
									typeAhead: true,
									mode: 'local',
									triggerAction: 'all',
									emptyText:'Select a type...',
									selectOnFocus:true,
									name: 'payment_type',
									id:'paymenttype',
									allowBlank:false
					},
*/
					
					this.amountfield,
					{
						xtype:'fieldset',
						checkboxToggle:false,
						collapsible : true,
						title: 'Repetitive Amount',
						defaultType: 'textfield',
						width : ( config.side_width*config.width*0.9),
						defaults: {width: config.side_width*config.width*0.50},
						autoHeight:true,
						collapsed: true,
						id : 'splitfileds',
						items :[
								{
										fieldLabel: 'Starting Date',
										id: 'startdate',
										xtype:"datefield",
										name: 'accountbalancedate',
										allowBlank:false,
										format: 'Y-m-d',
							            minValue: '2009-02-01'
								},
								new Ext.ux.form.Spinner({
					                fieldLabel: '# payments',
					                id: 'numpayments',
									value: '1',
					                strategy: new Ext.ux.form.Spinner.NumberStrategy({minValue:'0', maxValue:'10000'})
					            }),
								this.totalamountfield,
								this.repetetive
						]
					},
			/*		
					
{
						fieldLabel: 'Currency',
						name: 'currency',
						emptyText: 'BLN',
						disabled : true
					},
                  {
						fieldLabel: 'Reference',
						name: 'reference',
						hidden : true,
						id: 'reference',
						value : ("REF_" + now.getYear() + now.getMonth() + now.getDay()+ now.getHours()+now.getMinutes()+now.getSeconds())
					},
					{
						xtype:"textarea",
						id:'details',
						hidden : true,
						height : 40,
						maxLength : 250,
						maxLengthText : "Maximum Length of Details is 250 characters",
						fieldLabel:"Note",
						name:"details",
						allowBlank:true
					}
,
					new Ext.ux.form.Spinner({
		                fieldLabel: 'Adjust Balance at',
		                name: 'balanceajustement',
						id :  'balanceajustement',
						//value: detailsconfig.value_date.format('Y-m'),
						//disabled : true,
						strategy: new Ext.ux.form.Spinner.MonthStrategy()
		            })
*/
			],
		bbar:[{
					text : 'Create New',
					id : 'new_cachrecord',
					iconCls:'cashrecord-icon',
					handler: function(){
						if (Ext.getCmp('template').getValue() != '') {
							var bReceive = Ext.getCmp('wndcashrecords').receive;
							var bSplit = Ext.getCmp('wndcashrecords').split;
							var data = {
								cashrecordId: Ext.getCmp('cashrecord_id').getValue(),
								//authenticity_token : Ext.getCmp('template').getValue(),									
								cashrec_type: Ext.getCmp('template').getValue(),
								listId: bReceive ? Ext.getCmp('categoriesfrom').getValue() : Ext.getCmp('categoriesto').getValue(),
								//reference : Ext.getCmp('reference').getValue(),
								dr_account_id: Ext.getCmp('fromaccount').getValue(),
								debit_amount: bReceive ? "0.00" : (bSplit ? Ext.getCmp('totalamount').getValue() : Ext.getCmp('amount').getValue()),
								dr_value_date: bReceive ? Ext.getCmp('cr_value_date').getValue() : Ext.getCmp('dr_value_date').getValue(),
								cr_account_id: Ext.getCmp('toaccount').getValue(),
								credit_amount: bReceive ? (bSplit ? Ext.getCmp('totalamount').getValue() : Ext.getCmp('amount').getValue()) : "0.00",
								cr_value_date: bReceive ? Ext.getCmp('cr_value_date').getValue() : Ext.getCmp('dr_value_date').getValue(),
								original_balance: Ext.getCmp('amount').getValue(),
								repetitive_type: Ext.getCmp('repetition').getValue(),
								record_sequence: Ext.getCmp('numpayments').getValue(),
								total_records: Ext.getCmp('numpayments').getValue(),
								repetitive_amount: Ext.getCmp('totalamount').getValue(),
								starting_date: Ext.getCmp('startdate').getValue(),
							    //details : Ext.getCmp('details').getValue()
							};
							
							Ext.Ajax.request({
								url: tx.data.cashrecords_con.create_remote_url,
								scriptTag: true,
								callbackParam: 'jsoncallback',
								timeout: 10,
								params: {
									format: 'js',
									cashrecord: Ext.util.JSON.encode(data)
								},
								success: function(r){
									Ext.getCmp('cashrecordsform').form.setValues([{
										id: 'reference',
										value: ("REF_" + now.getYear() + now.getMonth() + now.getDay() + now.getHours() + now.getMinutes() + now.getSeconds())
									}]);
									this.publish('/desktop/notify', {
										title: 'Bloney Cashrecords',
										iconCls: 'bloney-icon',
										html: r.responseObject.notice
									});
								},
								failure: function(r){
									this.publish('/desktop/notify', {
										title: 'Bloney Cashrecords',
										iconCls: 'bloney-icon',
										html: r.responseObject.notice
									});
								},
								scope: this
							});
							Ext.getCmp('wndcashrecords').refresh();
						}else
						{
							Ext.Msg.alert('Attention','Please fill all required fields');
						}
					}		
				},{
					text: 'Save Changes',
					iconCls:'save-contacts-icon',
					handler : function() {
						if (Ext.getCmp('template').getValue() != '') {
							var bReceive = Ext.getCmp('wndcashrecords').receive;
							var bSplit = Ext.getCmp('wndcashrecords').split;
							var data = {
								cashrecordId: Ext.getCmp('cashrecord_id').getValue(),
								//authenticity_token : Ext.getCmp('template').getValue(),									
								cashrec_type: Ext.getCmp('template').getValue(),
								listId: bReceive ? Ext.getCmp('categoriesfrom').getValue() : Ext.getCmp('categoriesto').getValue(),
								//reference : Ext.getCmp('reference').getValue(),
								dr_account_id: Ext.getCmp('fromaccount').getValue(),
								debit_amount: bReceive ? "0.00" : (bSplit ? Ext.getCmp('totalamount').getValue() : Ext.getCmp('amount').getValue()),
								dr_value_date: bReceive ? Ext.getCmp('cr_value_date').getValue() : Ext.getCmp('dr_value_date').getValue(),
								cr_account_id: Ext.getCmp('toaccount').getValue(),
								credit_amount: bReceive ? (bSplit ? Ext.getCmp('totalamount').getValue() : Ext.getCmp('amount').getValue()) : "0.00",
								cr_value_date: bReceive ? Ext.getCmp('cr_value_date').getValue() : Ext.getCmp('dr_value_date').getValue(),
								original_balance: Ext.getCmp('amount').getValue(),
								repetitive_type: Ext.getCmp('repetition').getValue(),
								record_sequence: Ext.getCmp('numpayments').getValue(),
								total_records: Ext.getCmp('numpayments').getValue(),
								repetitive_amount: Ext.getCmp('totalamount').getValue(),
								starting_date: Ext.getCmp('startdate').getValue(),
								//details : Ext.getCmp('details').getValue()
							};
							
							Ext.Ajax.request({
								url: tx.data.cashrecords_con.update_remote_url,
								scriptTag: true,
								callbackParam: 'jsoncallback',
								timeout: 10,
								params: {
									format: 'js',
									cashrecord: Ext.util.JSON.encode(data)
								},
								success: function(r){
									this.publish('/desktop/notify', {
										title: 'Bloney Cashrecords',
										iconCls: 'bloney-icon',
										html: r.responseObject.notice
									});
								},
								failure: function(r){
									this.publish('/desktop/notify', {
										title: 'Bloney Cashrecords',
										iconCls: 'bloney-icon',
										html: r.responseObject.notice
									});
								},
								scope: this
							});
							Ext.getCmp('wndcashrecords').refresh();
						}else
						{
							Ext.Msg.alert('Attention','Please fill all required fields');
						}
					}
				},{
					text: 'Clean Form',
					iconCls:'clean-contacts-icon',
					handler: function(){
						Ext.getCmp('cashrecordsform').form.setValues([
									 {id:'cashrecord_id', value:''},
								      {id:'authenticity_token', value:''},
        							  {id:'template', value:''},
        							  {id:'categories', value:''},
        							  {id:'reference', value:''},
									  {id:'fromaccount', value:''},
									  {id:'amount', value:''},
									  {id:'dr_value_date', value:''},
									  {id:'toaccount', value:''},
									  {id:'cr_value_date', value:''},
									  {id:'repetition', value:''},
									  {id:'numpayments', value:''},
									  {id:'totalamount', value:''},
									  {id:'startdate', value:''},
									  {id:'details', value:''}
						]);
					}
				}	
				]		
	});
		
		
	BloneyCashrecords.MainWnd.superclass.constructor.call(this, {
			title: 'Cashrecords Details',
			id: 'wndcashrecords',
			iconCls : 'cashrecord-icon',
	        items: [this.cashrecordsform, this.tabs],
		 	buttons:[
		 			new Ext.SplitButton({
					id: 'button-cashrecords',
					iconCls:'collaborate-icon',
				   	text: 'Cashrecords Exchange',
				   	//handler: optionsHandler, // handle a click on the button itself
				   	menu: new Ext.menu.Menu({
				        items: [
					        	// these items will render as dropdown menu items when the arrow is clicked:
						        {
									text: 'Export Cashrecords', 
									iconCls : 'export-icon',
									handler: function() {
							        	var cashrecordsCollaborateWnd = new BloneyCashrecords.CollaborateWnd({
							        										width: Ext.getCmp('tabcashrecords').getSize().width ,
							        										height:Ext.getCmp('tabcashrecords').getSize().height });
							        	position  = Ext.getCmp('tabcashrecords').getPosition();
							        	cashrecordsCollaborateWnd.setPosition(position[0],position[1]);
							        	Ext.getCmp('collaborate_tabs').setActiveTab(0);
							        	cashrecordsCollaborateWnd.show();
						        	
						        	}
								},
						        {
									text: 'Import Cashrecords',
									iconCls : 'import-icon', 
									handler: function() {
								        var cashrecordsCollaborateWnd = new BloneyCashrecords.CollaborateWnd({
							        										width:Ext.getCmp('tabcashrecords').getSize().width ,
							        										height:Ext.getCmp('tabcashrecords').getSize().height });
							        	
							        	position  = Ext.getCmp('tabcashrecords').getPosition();
							        	cashrecordsCollaborateWnd.setPosition(position[0],position[1]);
							        	Ext.getCmp('collaborate_tabs').setActiveTab(1);
							        	cashrecordsCollaborateWnd.show();
							        }
								}
					        ]
				   	})
				}),{
						text:"Close Cashrecords Window",
						handler: function(){
							Ext.getCmp('wndcashrecords').close();
				}
		  }]
    });
	
	Ext.getCmp('splitfileds').on('beforecollapse', function() {
		Ext.getCmp('wndcashrecords').source = "fieldset";
		}, this);
		
	Ext.getCmp('splitfileds').on('beforeexpand', function() {
		Ext.getCmp('wndcashrecords').source = "fieldset";
		}, this);
		
	Ext.getCmp('splitfileds').on('expand', function() { 
		
		if(Ext.getCmp('wndcashrecords').source == 'template'){
			//Ext.getCmp('wndcashrecords').source = "";
		}else{
			Ext.getCmp('wndcashrecords').split = true;
			//Ext.getCmp('wndcashrecords').expected = false;
			Ext.getCmp('wndcashrecords').template_state();
		}
		if ((Ext.getCmp('wndcashrecords').expected == false)) {
			Ext.getCmp('amount').setDisabled(true);
			Ext.getCmp('dr_value_date').setDisabled(true);
			Ext.getCmp('dr_value_date').setValue('');
			Ext.getCmp('cr_value_date').setDisabled(true);
			Ext.getCmp('cr_value_date').setValue('');
		}
		
	}, this);
	
	Ext.getCmp('splitfileds').on('collapse', function() { 
		
		if(Ext.getCmp('wndcashrecords').source == 'template'){
			//Ext.getCmp('wndcashrecords').source = "";
		}else{
			Ext.getCmp('wndcashrecords').split = false;
			//Ext.getCmp('wndcashrecords').expected = false;
			Ext.getCmp('wndcashrecords').template_state();
		}
		
		Ext.getCmp('amount').setDisabled(false);
		Ext.getCmp('dr_value_date').setDisabled(false);
		Ext.getCmp('dr_value_date').setValue(new Date());
		Ext.getCmp('cr_value_date').setDisabled(false);
		Ext.getCmp('cr_value_date').setValue(new Date());

	}, this);
	
	Ext.getCmp('moneyfromfields').on('beforecollapse', function() {
		Ext.getCmp('wndcashrecords').source = "fieldset";
		}, this);
		
	Ext.getCmp('moneyfromfields').on('beforeexpand', function() {
		Ext.getCmp('wndcashrecords').source = "fieldset";
		}, this);
		
	Ext.getCmp('moneyfromfields').on('expand', function() {
		if(Ext.getCmp('wndcashrecords').source == 'template'){
			//Ext.getCmp('wndcashrecords').source = "";
		}else{
			Ext.getCmp('wndcashrecords').receive = true;
			Ext.getCmp('wndcashrecords').template_state();
		}
		
		Ext.getCmp('fromaccount').setValue('');
	}, this);
	
	Ext.getCmp('moneyfromfields').on('collapse', function() { 
		if(Ext.getCmp('wndcashrecords').source == 'template'){
			//Ext.getCmp('wndcashrecords').source = "";
		}else{
			Ext.getCmp('wndcashrecords').receive = false;
			Ext.getCmp('wndcashrecords').template_state();
		}
		Ext.getCmp('toaccount').setValue('');
	}, this);
	
	Ext.getCmp('moneytofields').on('beforecollapse', function() {
		Ext.getCmp('wndcashrecords').source = "fieldset";
	}, this);
	
	Ext.getCmp('moneytofields').on('beforeexpand', function() {
		Ext.getCmp('wndcashrecords').source = "fieldset";
	}, this);
	
	Ext.getCmp('moneytofields').on('expand', function() { 
		if(Ext.getCmp('wndcashrecords').source == 'template'){
			//Ext.getCmp('wndcashrecords').source = "";
		}else{
			Ext.getCmp('wndcashrecords').receive = false;
			Ext.getCmp('wndcashrecords').template_state();
		}
		Ext.getCmp('fromaccount').setValue('');
	}, this);
	
	Ext.getCmp('moneytofields').on('collapse', function() { 
		if(Ext.getCmp('wndcashrecords').source == 'template'){
			//Ext.getCmp('wndcashrecords').source = "";
		}else{
			Ext.getCmp('wndcashrecords').receive = true;
			Ext.getCmp('wndcashrecords').template_state();
		}
		Ext.getCmp('toaccount').setValue('');
	}, this);
};

Ext.extend(BloneyCashrecords.MainWnd, Ext.Window, {
		
		handleActivate : function(tab){	
			if(tab.id == 'cash_grid')
				Ext.getCmp('cash_grid').loadRecords();
			
			tab.doLayout();		
		},
		
		refresh : function() {
			tab = Ext.getCmp('tabcashrecords').getActiveTab();
			Ext.getCmp('wndcashrecords').handleActivate(tab);	
			Ext.getCmp('cashrecordsgrid').loadRecords(Ext.getCmp('cashrecordsgrid').start_date,'ACTV');
			Ext.getCmp('cash_grid').loadRecords();	
		},
		
		template_select : function(record, index){

			switch(index.data.template.toString()){
				 
				case'direct debit':{
					Ext.getCmp('wndcashrecords').receive = false;
					Ext.getCmp('wndcashrecords').expected = false;
					Ext.getCmp('wndcashrecords').split = true;
					break;
				}
				case'debit':{
					Ext.getCmp('wndcashrecords').receive = false;
					Ext.getCmp('wndcashrecords').expected = false;
					Ext.getCmp('wndcashrecords').split = false;
					break;
				}
				case'expected debit':{
					Ext.getCmp('wndcashrecords').receive = false;
					Ext.getCmp('wndcashrecords').expected = true;
					Ext.getCmp('wndcashrecords').split = false;
					break;
				}
				case'direct credit':{
					Ext.getCmp('wndcashrecords').receive = true;
					Ext.getCmp('wndcashrecords').expected = false;
					Ext.getCmp('wndcashrecords').split = true;
					break;
				}
				case'credit':{
					Ext.getCmp('wndcashrecords').receive = true;
					Ext.getCmp('wndcashrecords').expected = false;
					Ext.getCmp('wndcashrecords').split = false;
					break;
				}		
				case'expected credit':{
					Ext.getCmp('wndcashrecords').receive = true;
					Ext.getCmp('wndcashrecords').expected = true;
					Ext.getCmp('wndcashrecords').split = false;
					break;
				}	
			}
			Ext.getCmp('wndcashrecords').template_state();
  		},
		
		template_state :  function(){
			var bReceive = Ext.getCmp('wndcashrecords').receive;
			var bExpected = Ext.getCmp('wndcashrecords').expected;
			var bSplit = Ext.getCmp('wndcashrecords').split;
			Ext.getCmp('wndcashrecords').source = 'template';
			
			if(bReceive && bExpected){
				Ext.getCmp('template').setValue('expected credit');
				
				Ext.getCmp('moneytofields').collapse(true);
				Ext.getCmp('moneyfromfields').expand(true);
				Ext.getCmp('splitfileds').collapse(true);
			}
			
			if(!bReceive && bExpected){
				Ext.getCmp('template').setValue('expected debit');
				
				Ext.getCmp('moneytofields').expand(true);
				Ext.getCmp('moneyfromfields').collapse(true);
				Ext.getCmp('splitfileds').collapse(true);
			}
			
			if(bReceive && !bExpected){
				Ext.getCmp('moneytofields').collapse(true);
				Ext.getCmp('moneyfromfields').expand(true);
				if(bSplit)
				{
					Ext.getCmp('template').setValue('direct credit');
					Ext.getCmp('splitfileds').expand(true);
					
				}else{
					Ext.getCmp('template').setValue('credit');
					Ext.getCmp('splitfileds').collapse(true);
				}
			}
			
			if(!bReceive && !bExpected){
				Ext.getCmp('moneytofields').expand(true);
				Ext.getCmp('moneyfromfields').collapse(true);
				if(bSplit)
				{
					Ext.getCmp('template').setValue('direct debit');
					Ext.getCmp('splitfileds').expand(true);
				}else{
					Ext.getCmp('template').setValue('debit');
					Ext.getCmp('splitfileds').collapse(true);
				}
			}
		},
		
		triggerCalcA: function() {
		
			var cashObj = Ext.getCmp('wndcashrecords');	
			if (cashObj.calculatorA != null && cashObj.calculatorA.isVisible()) {
				cashObj.calculatorA.hide();
			}
			else {
				if (cashObj.calculatorA == null) {
					cashObj.calculatorA = new Ext.ux.Calculator();
					cashObj.calculatorA.render();
					cashObj.calculatorA.alignTo(cashObj.amountfield.el, 'bl');
					cashObj.calculatorA.show();
				}
				else {
					cashObj.calculatorA.alignTo(cashObj.amountfield.el, 'bl');
					cashObj.calculatorA.show();
				}
				cashObj.calculatorA.setValue(cashObj.amountfield.getValue());
				
				cashObj.calculatorA.on('hide',function(){
					var val = Math.round(cashObj.calculatorA.getValue()*100)/100;
					cashObj.amountfield.setValue(val);cashObj.calculatorA.hide();}, this);
			}
		},
	
	 triggerCalcTA: function() {
		
			var cashObj = Ext.getCmp('wndcashrecords');	
			if (cashObj.calculatorTA != null && cashObj.calculatorTA.isVisible()) {
				cashObj.calculatorTA.hide();
			}
			else {
				if (cashObj.calculatorTA == null) {
					cashObj.calculatorTA = new Ext.ux.Calculator();
					cashObj.calculatorTA.render();
					cashObj.calculatorTA.alignTo(cashObj.totalamountfield.el, 'bl');
					cashObj.calculatorTA.show();
				}
				else {
					cashObj.calculatorTA.alignTo(cashObj.totalamountfield.el, 'bl');
					cashObj.calculatorTA.show();
				}
				cashObj.calculatorTA.setValue(cashObj.totalamountfield.getValue());
				cashObj.calculatorTA.on('hide',function(){
					var val = Math.round(cashObj.calculatorTA.getValue()*100)/100;
					cashObj.totalamountfield.setValue(val);cashObj.calculatorTA.hide();}, this);
			}
		}
});


/*
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Banking
 */

/*********************************************************************************************************/
/*                                      Banking Details Grid                                             */
/*********************************************************************************************************/
BankingGrid = function(config) {

    this.start_date = new Date();
    
    Ext.apply(this, config);

	var reader = new Ext.data.JsonReader({
            root: 'Cashrecords',
            fields: [
					 {name: 'cashrecordId', mapping:'cashrecordId'},
					 {name: 'cashrec_type', mapping: 'cashrec_type'},
                     {name: 'category_name', mapping: 'category_name'},                  
                     {name: 'dr_value_date', mapping: 'dr_value_date', type:'date', dateFormat: "Y-m-d"},
					 {name: 'dr_account_id', mapping: 'dr_account_id'},
					 {name: 'dr_account_no', mapping: 'dr_account_no'},
                     {name: 'debit_amount', mapping: 'debit_amount'},                  
                     {name: 'cr_value_date', mapping: 'cr_value_date', type:'date', dateFormat: "Y-m-d"},
                     {name: 'cr_account_id', mapping: 'cr_account_id'},
					 {name: 'cr_account_no', mapping: 'cr_account_no'},
					 {name: 'authenticity_token', mapping:'authenticity_token'} ,
                     {name: 'reference', mapping:'reference'},
                     {name: 'original_balance', mapping:'original_balance'},
                     {name: 'repetitive_type', mapping:'repetitive_type'},
                     {name: 'record_sequence', mapping:'record_sequence'},
                     {name: 'total_records', mapping:'total_records'},
                     {name: 'repetitive_amount', mapping:'repetitive_amount'},
                     {name: 'starting_date', mapping:'starting_date', type:'date', dateFormat: "Y-m-d"},
                     {name: 'detail', mapping:'details'},
                     {name: 'credit_amount', mapping: 'credit_amount'}
					]				
        });
	
	this.store = new Ext.data.GroupingStore({
            proxy: new Ext.ux.CssProxy({ url: tx.data.cashrecords_con.url }),
            reader: reader,
            sortInfo:{field: 'cashrec_type', direction: "ASC"},
			groupField:'cashrec_type'
        });


	this.selmodel = new Ext.grid.CheckboxSelectionModel();
	
	Ext.grid.GroupSummary.Calculations['totalAmount'] = function(v, record, field){
		        return v + (record.data.credit_amount) - (record.data.debit_amount);
    	}

	this.summary = new Ext.grid.GroupSummary();
	
   	this.columns = [
					this.selmodel,
					{
						header : "Cashflow type",
						dataIndex : 'cashrec_type',
						sortable : true,
						width : 100,
						summaryType : 'count',
						hideable : false,
						summaryRenderer : function(v, params, data) {
							return ((v === 0 || v > 1)
									? '(' + v + ' Cashrecords)'
									: '(1 Cashrecord)');
						}
					},{
						header : "Category",
						dataIndex : 'category_name',
						sortable : true,
						width : 100,
						align : 'right'
					},{
			           header: "Reference",
			           dataIndex: 'reference',
			           width: 120,
			           align : 'right'
			        },{
			           header: "Payed at",
			           dataIndex: 'dr_value_date',
			           width: 80,
					   renderer: this.date,
					   align : 'right'
			        },{
						header : "Debit Amount",
						dataIndex : 'debit_amount',
						width : 100,
						sortable : true,
						summaryType : 'sum',
						align : 'right',
						renderer: this.amount
					},{
			           header: "Received at",
			           dataIndex: 'cr_value_date',
			           width: 80,
					   renderer: this.date,
					   align : 'right'
			        },{
						header : "Credit Amount",
						dataIndex : 'credit_amount',
						width : 100,
						sortable : true,
						summaryType : 'sum',
						align : 'right',
						renderer: this.amount
					}];

		this.view = new Ext.grid.GroupingView({
			            forceFit:true,
			            showGroupName: false,
			            enableNoGroups:false, // REQUIRED!
			            hideGroupedColumn: true,
						enableRowBody:true,
			            showPreview:true,
			            autoExpandColumn: 'category_name'
			        });	

    BankingGrid.superclass.constructor.call(this, {
        region: 'center',
        id: 'banking_grid',
        loadMask: {msg:'Loading Cashrecords for Banking Update...'},
        sm: this.selmodel,
		//plugins: this.summary,
		buttons: [
				{
					text:'Update Account Balance',
					iconCls : 'banking_balance_icon',
					handler : function (){
							var selItems = Ext.getCmp('banking_grid').getSelectionModel().getSelections();
							var itemsList = "";
							for(var i = 0, n = selItems.length; i < n; i++) {
						     	itemsList = ((itemsList == "") ? "" : (itemsList + ",") ) + selItems[i].data.cashrecordId							     	
						    }
						    if (itemsList != "" )
						    {
								Ext.Ajax.request({
										   	url: tx.data.cashrecords_con.update_remote_url,
										   	scriptTag: true,
										    callbackParam: 'jsoncallback',
										    timeout: 10,
												params: {
													format: 'js',
													items_list : itemsList,
								   					banking : true
										    },
										    success: function(r) {
												   this.publish( '/desktop/notify',{
											            title: 'Banking Update',
											            iconCls: 'banking_balance_icon',
											            html: r.responseObject.notice
											        });
										    },
										    failure : function(r) {
											 	this.publish( '/desktop/notify',{
											            title: 'Banking Update',
											            iconCls: 'banking_balance_icon',
											            html: r.responseObject.notice
											        });
										    },
										    scope: this
										  
										});	
						    }
					}
				},
				{
					text:'Reset All',
					iconCls:'clean-contacts-icon',
					handler : function() {
						Ext.getCmp('banking_grid').getSelectionModel().clearSelections() 
					}
				}
				],
		buttonAlign:'right',
		tbar:[{
				    text: 'Pay Money',
					iconCls : 'cashrecord-minus-icon',
				    tooltip: {text:'Account Payable, Expences and etc. ', title:'Pay Money', autoHide:true},
				    cls: 'x-btn-text-icon blist',
					width:100,
					handler: function () {
									Ext.getCmp('cashrecords').addCashrecord("debit")
								}
				},'-',{
				    text: 'Receive Money',
					iconCls : 'cashrecord-plus-icon',
				    tooltip: {text:'Account receivable and etc.', title:'Receive Money', autoHide:true},
				    cls: 'x-btn-text-icon blist',
					width:100,
					handler: function () {
									Ext.getCmp('cashrecords').addCashrecord("credit")
								}
			},'->', 
        new Ext.SplitButton({
					id: 'option-ct', // the container id
				   	text: 'Options',
					iconCls : 'banking_options_icon',
				   	tooltip:'Balance update options',
				   	//handler: optionsHandler, // handle a click on the button itself
				   	menu: new Ext.menu.Menu({
				        items: [
				        	// these items will render as dropdown menu items when the arrow is clicked:
					        {text: 'Match Algorithm', handler: function() {}},
					        {text: 'Change Account', handler: function() {}}
				        ]
				   	})
				})]
    });

	this.on('rowcontextmenu', this.onContextClick, this);
	this.on('celldblclick', this.onCellDbClick, this);

};

Ext.extend(BankingGrid, Ext.grid.EditorGridPanel, {
	date : function (val) {
		return  val.dateFormat('Y-m-d') ;
	},
	
	amount : function (val) {
		var ret = Ext.getCmp('banking_grid').format_amount(val);
		return ((ret == "0.00") ? ret : '<span style="font-weight: bold;">' + ret + '</span>');
	},
	
	total_amount : function (val) {
		var ret = Ext.getCmp('banking_grid').format_amount(val);
		
		if(ret >= 0){ return '<span style="color:green;font-weight: bold;">' + ret + '</span>';}
		else if(ret < 0){return '<span style="color:red;font-weight: bold;">' + ret + '</span>'; }
        return ret;
	},
	
	format_amount : function (val)
	{
		var ret;
		if (val == "0") {ret = "0.00";}
		else if (val.toString().indexOf(".")<0 ) {ret = val + ".00";}
		else if (val.toString().indexOf(".") == (val.toString().length-2)) {ret = val + "0";}
		else {ret = val;}
		return ret;
	},
	
    onContextClick : function(grid, index, e){
	        if(!this.menu){ // create context menu on first right click
	            this.menu = new Ext.menu.Menu({
	                id:'grid-ctx',
	                items: [
					// stick any markup in a menu
		            '<b class="x-toolbar x-small-editor">Banking Context</b>',
		            '-', {
		                text: 'Search',
						cls: 'search',
		                menu: {        // <-- submenu by nested config object
		                    items: [
		                        // stick any markup in a menu
		                        '<b class="x-toolbar x-small-editor">Search</b>','-',
		                        {
		                            text: 'by Date',
		                            checked: true,
		                            group: 'search',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'by Category',
		                            group: 'search',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'by Amount',
		                            group: 'search',
		                            checkHandler: this.onItemCheck
		                       }]
		                }
		            },{
		                text: 'Filter',
						cls: 'filter',
		                menu: {        // <-- submenu by nested config object
		                    items: [
		                        // stick any markup in a menu
		                        '<b class="x-toolbar x-small-editor">Filter</b>','-',
		                        {
		                            text: 'by Date',
		                            checked: true,
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'by Category',
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                        },{
		                            text: 'Advanced',
		                            group: 'filter',
		                            checkHandler: this.onItemCheck
		                       }]
		                }
		            }
		        ]
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

	onCellDbClick : function(grid, rowIndex, columnIndex, e){

		this.balance_date = new Date;
		this.balance_date =Date.parseDate(this.store.data.items[rowIndex].data.date, "Y-m-d");
		this.detailedgrid = new BankingDeatailsGrid({
					title: 'Day Details'
				});
		this.detailedgrid.loadRecords(this.balance_date);

		this.cashform = new Ext.FormPanel({
			labelWidth: 75, // label settings here cascade unless overridden
			url: '/banking/create',
			frame:true,
			title: 'Add Banking',
			width: 300,
			defaults: {width: 150},
			defaultType: 'textfield',
			region: 'west',
            split: true,
            collapsible: true,
            margins:'3 0 3 3',
            cmargins:'3 3 3 3',

			items: [{
					fieldLabel: 'First Name',
					name: 'first',
					allowBlank:false
				},{
					fieldLabel: 'Last Name',
					name: 'last'
				},{
					fieldLabel: 'Company',
					name: 'company'
				}, {
					fieldLabel: 'Email',
					name: 'email',
					vtype:'email'
				}, new Ext.form.TimeField({
					fieldLabel: 'Time',
					name: 'time',
					minValue: '8:00am',
					maxValue: '6:00pm'
				})
			],

			buttons: [{
				text: 'Save'
			},{
				text: 'Cancel'
			}]
		});

		this.tabs = new Ext.TabPanel({
				region: 'center',
				margins:'3 3 3 0',
				activeTab: 0,
				defaults:{autoScroll:true},

				items:[
					this.detailedgrid,
				{
					title: 'Cash Story',
					html: Ext.example.bogusMarkup
				},{
					title: 'Search & Filter',
					html: Ext.example.bogusMarkup
				}]
			});


			var win = new Ext.Window({
				title: 'Layout Window',
				closable:true,
				width:750,
				height:470,
				//border:false,
				plain:true,
				layout: 'border',

				items: [this.cashform, this.tabs],

				buttons: [{
							text:'Submit',
							disabled:true
						},{
							text: 'Close',
							handler: function(){
								win.hide();
							}
				}]
			});

        win.show(this);

	},

	

    loadRecords : function(value_date) {

		if (value_date == null)
		{
			if (this.value_date == null)
				this.value_date  = new Date();	
		}	
		else
		{
			this.value_date  = new Date(value_date);
		}	

	    this.store.load({
			params: {
				format: 'jsonc',
				return_type : 'list',
				reconcile : true,
				value_date : this.value_date.format("Y-m-d") //(value_date != null) ? value_date : ''
			}
		});
    }
});


/**
 * @author Administrator
 */

// ---------------------------------
// Bloney Splash 
// ---------------------------------
BloneySplash = {};
			
BloneySplash.MainWnd = function(config) {
	
	Ext.apply(this, config);

	this.logo = new Ext.Panel({
		id: 'welcome-logo',
		bodyStyle : 'background:#FFFFFF none repeat scroll 0%;',
		region: 'center',
		border : false,
		html : '<div id="header-content"><h2 id="slogan">SOCIAL CASHFLOW</h2><h1 id="logo-text">Bloney</h1><div id="home"><div id="formhome"></div></div></div>'
	});

	this.southregion = new Ext.Panel({	
		baseCls: 'x-plain',
		bodyStyle:'background:#FFFFFF none repeat scroll 0%;padding-left:50px',
		frame: false,
		id: 'welcome-form',
		xtype : 'border',
		region: 'south',
		height: 100,
		border : false,
		html: '<h4>Bloney Social Cashflow</h4></br><p>version 0.1</br> Copyright 2009. Internet Housekeeping company. All rights reserved. </br>Bloney Cashflow Team</p>'
		});
	
	
	
	BloneySplash.MainWnd.superclass.constructor.call(this, {
		title : 'Bloney Cashflow',
		id: 'welcome-win',
		iconCls : 'icon-about-todo',
		maximizable : false,
		minimizable : false,
		width : 470,
		height : 270,
		border : true,
		plain : true,
		shadow : true,
		layout : 'border',
		xbloney : 'default',
		closable:true,
		resizable : false,
		split : true,
		buttonAlign : 'center',
		items : [this.logo
				,this.southregion],
		buttons : [
					{
					text : 'OK',
					scope : 'BloneySplashWnd',
					handler : function(){
						Ext.getCmp('welcome-win').close();	
					}
				}		
		]
	});
};
Ext.extend(BloneySplash.MainWnd, Ext.Window, {
	
});

// ---------------------------------
// Bloney Company
// ---------------------------------
BloneyContact = {};

BloneyContact.ContactsGrid = function(config){
	Ext.apply(this, config);
		
	var reader = new Ext.data.JsonReader({
            root: 'Contacts',
			totalProperty: 'Total',
            id: 'id',
            fields: [
					    {name: 'contactId', type:'string'},
					    {name: 'contact_name', type:'string'},
					    {name: 'contact_type', type:'string'},
						{name: 'address', type:'string'},
						{name: 'city', type:'string'},
						{name: 'country', type:'string'},
						{name: 'phone', type:'string'},
						{name: 'fax', type:'string'},
						{name: 'email', type:'string'},
						{name: 'url', type:'string'},
						{name: 'status', type:'string'}            ]
        });
	
	this.store = new Ext.data.GroupingStore({
            proxy: new Ext.ux.CssProxy({ url: tx.data.contacts_con.url }),
            reader: reader,
            sortInfo:{field: 'contact_name', direction: "ASC"}
        });

	
	if(config.columnmodel == 'story')				
	{
		this.selmodel = new Ext.grid.CheckboxSelectionModel({
					singleSelect:true
			});
		this.columns = [
				this.selmodel,{
				   id: 'contact_name',
				   header: "My Company",
				   dataIndex: 'contact_name',
				   width: 350
				},{
				   header: "Status",
				   dataIndex: 'status',
				   width: 70
				}];
				
		 this.viewConfig = new Ext.grid.GroupingView( {
            forceFit:true,
            enableRowBody:true,
            showPreview:false,
            autoExpandColumn: 'contact_name',
			getRowClass : function(record, rowIndex, p, ds){
				if(this.showPreview){
					p.body = '<p><h2>'+record.data.contact_name+'</h2> Company </br> The company located at '
					+ record.data.country + '</br> in ' 
					+ record.data.city + '</br> and could be reached by phone ' 
					+ record.data.phone + '</br> or by fax' 
					+ record.data.fax +  '</p>';
					return 'x-grid3-row-expanded';
				}
				return 'x-grid3-row-collapsed';
			}
        });
	}
	
	if(config.columnmodel == 'checkbox')			
	{
		this.selmodel = new Ext.grid.CheckboxSelectionModel({
					singleSelect:false
			});
		this.columns = [
				this.selmodel,{
				   id: 'contact_name',
				   header: "Contact",
				   dataIndex: 'contact_name',
				   width: 90
				},{
				   header: "Address",
				   dataIndex: 'address',
				   width: 120
				},{
				   header: "Phone",
				   dataIndex: 'phone',
				   width: 70
				},{
				   header: "Fax",
				   dataIndex: 'fax',
				   width: 70
				},{
				   header: "Status",
				   dataIndex: 'status',
				   width: 70
				}];
				
		this.viewConfig = new Ext.grid.GroupingView({
                forceFit:true,
                groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Contacts" : "Contact"]})'
            });
	}
	
	if(config.columnmodel == null)
	{
		this.selmodel = new Ext.grid.RowSelectionModel({
					singleSelect:true
			});
			this.columns = [{
				   id: 'contact_name',
				   header: "Contact",
				   dataIndex: 'contact_name',
				   width: 90
				},{
				   header: "Address",
				   dataIndex: 'address',
				   width: 120
				},{
				   header: "Phone",
				   dataIndex: 'phone',
				   width: 70
				},{
				   header: "Fax",
				   dataIndex: 'fax',
				   width: 70
				},{
				   header: "Status",
				   dataIndex: 'status',
				   width: 70
				}];
				
		this.viewConfig = new Ext.grid.GroupingView({
                forceFit:true,
                groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Contacts" : "Contact"]})'
            });
	}
	
	
	 this.pagingBar = new Ext.PagingToolbar({
        pageSize: 20,
        store: this.store,
        displayInfo: true,
        displayMsg: 'Displaying contacts {0} - {1} of {2}',
        emptyMsg: "No topics to display",
		/*
items : ['-',
				'Filter by -> ',
				{
					xtype : 'combo',
					id : 'alpha',	
					store : AlphaNumber,
					width : 70,
					displayField:'alpha',
					valueField: 'alpha_name',
					hiddenName: 'alphaId',
					typeAhead: true,
					mode: 'local',
					triggerAction: 'all',
					selectOnFocus:true,
					allowBlank:false
				}]  
*/     
    });
	
	BloneyContact.ContactsGrid.superclass.constructor.call(this, {
		 store: this.store,
		 sm : this.selmodel,
		 columns: this.columns,
         view: this.viewConfig,
		 bbar: this.pagingBar
	});
	
	this.on('rowcontextmenu', this.onContextClick, this);
	
	this.store.load({
		params: {
			format: 'jsonc',
			start:0, 
			limit:20
		}
	});	
};

Ext.extend(BloneyContact.ContactsGrid,Ext.grid.GridPanel,{
	
	onRowClick : function(grid, rowIndex, e){
		var record = grid.getStore().getAt(rowIndex);  // Get the Record
        Ext.getCmp('contactsform').form.setValues( [
									  {id:'contact_id', value:record.data.contactId},
								      {id:'authenticity_token', value:record.data.authenticity_token},
        							  {id:'s_contact_name', value:record.data.contact_name},
        							  {id:'s_contact_type', value:record.data.contact_type},
									  {id:'s_address', value:record.data.address},
									  {id:'s_city', value:record.data.city},
									  {id:'s_country', value:record.data.country},
									  {id:'s_phone', value:record.data.phone},
									  {id:'s_fax', value:record.data.fax},
									  {id:'s_email', value:record.data.email},
									  {id:'s_url', value:record.data.url}]);

		Ext.getCmp('acc_owner').loadRecords(record.data.contactId);
	},
 	onContextClick : function(grid, index, e){
 			var record = grid.getStore().getAt(index);
	        if(!this.menu){ // create context menu on first right click
	            this.menu = new Ext.menu.Menu({
	                id:'grid-ctx',
	                items: [
					// stick any markup in a menu
		            '<b class="x-toolbar x-small-editor">Contacts Context</b>',
		            '-',{
		                text: 'Send Email',
						iconCls:'email-contacts-icon',
		                handler: function() {
		                		Ext.getCmp('contact_tabs').setActiveTab('sendemail');
		                		Ext.getCmp('sendemail').form.setValues( [
									  {id:'to_contact', value:record.data.email}]);
		                	}
		            	}
		             ]
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



    loadRecords : function(contact_type) {
    	this.store.baseParams = {
			contact_type:(contact_type != null )? contact_type : '',
			contact_name: "",
			contact_city: "",
			show_archive: Ext.getCmp('show_archive') == null  ? '' : Ext.getCmp('show_archive').getValue(),
			format: 'jsonc'
		};
       this.store.load();
		
    },
	
    searchRecords : function (searchconfig){
    	this.store.baseParams = {
			contactId : searchconfig.contactId,
			contact_type: searchconfig.contact_type,
			contact_name: searchconfig.contact_name,
			contact_city: searchconfig.contact_city,
			show_archive:  Ext.getCmp('show_archive').getValue(),
			format: 'jsonc'
		};
        this.store.load();
    },
    
    loadFileRecords : function(contactname, activation_key) {

    	this.store.baseParams = {
			contact_type: null ,
			source: "FILE" ,
			contact_name : contactname,
			activation_key : (activation_key != null ? activation_key : ''),
			format: 'jsonc'
		};
        this.store.load();
		
    },
	onBeforeShow : function(){
		
		var record = this.store.getAt(0);  // Get the Record
       
	    if(record != null)
			Ext.getCmp('contactsform').form.setValues( [
										  {id:'contact_id', value:record.data.id},
									      {id:'authenticity_token', value:record.data.authenticity_token},
	        							  {id:'s_contact_name', value:record.data.contact_name},
	        							  {id:'abbrId', value:record.data.contact_type},
										  {id:'s_address', value:record.data.address},
										  {id:'s_city', value:record.data.city},
										  {id:'s_country', value:record.data.country},
										  {id:'s_phone', value:record.data.phone},
										  {id:'s_fax', value:record.data.fax},
										  {id:'s_email', value:record.data.email},
										  {id:'s_url', value:record.data.url}]);
	}
});



BloneyContact.CollaborateWnd = function(config){
	
	Ext.apply(this, config);
	
	this.comapniessharelist = new Ext.data.GroupingStore({
            proxy: new Ext.ux.CssProxy({ url: tx.data.contacts_con.contacts_sharelist_remote_url }),
            reader: new Ext.data.JsonReader({
		            root: 'Contacts',
		            fields: [ {name: 'contact_name', type:'string'} ]
    		}),
            sortInfo:{field: 'contact_name', direction: "ASC"}
        });

	this.comapniessharelist.load({
		params: {
			format: 'jsonc'
		}
	});
	
	this.expertssharelist = new Ext.data.GroupingStore({
            proxy: new Ext.ux.CssProxy({ url: tx.data.contacts_con.url }),
            reader: new Ext.data.JsonReader({
		            root: 'Contacts',
		            fields: [
							    {name: 'contact_name', type:'string'}]
		        	}),
            sortInfo:{field: 'contact_name', direction: "ASC"}
        });

	this.expertssharelist.load({
		params: {
			format: 'jsonc',
			contact_type:'EXPERT'
		}
	});
	
	this.comboExpertssharelist = new Ext.form.ComboBox({
							fieldLabel:"Experts list",
							width : 140,
							store: this.expertssharelist,
							displayField:'contact_name',
							valueField: 'contact_name',
							hiddenName: 'contact_name',
							typeAhead: true,
							id:'es_contact_name',
							mode: 'local',
							triggerAction: 'all',
							emptyText:'Expert Name...',
							selectOnFocus:true,
							allowBlank:true
					});
	this.comboExpertssharelist.on('select', this.onSelectET, this);
	
	this.comboContactType = new Ext.form.ComboBox({
							fieldLabel:"Comapnies list",
							width : 140,
							store: new Ext.data.SimpleStore({
											fields: ['contact_type', 'contact_typedesc'],
											data : [['ALL','All Contacts'],
													['CONTACT','Contacts'],
													['DEBTOR','Debtors'],
													['CREDITOR','Moneylender'],
													['EXPERT','Experts']]
									}),
							displayField:'contact_typedesc',
							valueField: 'contact_type',
							hiddenName: 'contact_typeId',
							typeAhead: true,
							id:'cs_contact_type',
							mode: 'local',
							triggerAction: 'all',
							emptyText:'Comapany Type...',
							selectOnFocus:true,
							allowBlank:false
					});
	this.comboContactType.on('select', this.onSelectCT, this);
	
	this.postcontacts = new BloneyContact.ContactsGrid({
						id: 'postcontacts',
						title: 'Export Contacts',
						iconCls : 'export-icon',
						height: (config.height - 95),
						listeners: {activate: this.handleActivate},
						columnmodel : 'checkbox',
						bbar: ['->',this.comboExpertssharelist,'-',this.comboContactType,'-',{
								text : 'Share with Expert',
								handler : function() {
									var selItems = Ext.getCmp('postcontacts').getSelectionModel().getSelections();
									var itemsList = "";
									for(var i = 0, n = selItems.length; i < n; i++) {
								     	itemsList = ((itemsList == "") ? "" : (itemsList + ",") ) + selItems[i].data.contactId							     	
								    }
								    if (itemsList != "" && Ext.getCmp('es_contact_name').getValue() != "" )
								    {
										Ext.Ajax.request({
												   	url: tx.data.contacts_con.postdirectory_remote_url,
												   	scriptTag: true,
												    callbackParam: 'jsoncallback',
												    timeout: 10,
														params: {
															format: 'js',
															items_list : [itemsList],
										   					share : false,
										   					expert_name : Ext.getCmp('es_contact_name').getValue()
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
								    }
								}
						},'-',{
								text : 'Publish Directory',
								handler : function() {
									var selItems = Ext.getCmp('postcontacts').getSelectionModel().getSelections();
									var itemsList = "";
									for(var i = 0, n = selItems.length; i < n; i++) {
								     	itemsList = ((itemsList == "") ? "" : (itemsList + ",") ) + selItems[i].data.contactId								     	
								    }
									if (itemsList != "")
								    {
										Ext.Ajax.request({
												   	url: tx.data.contacts_con.postdirectory_remote_url,
												   	scriptTag: true,
												    callbackParam: 'jsoncallback',
												    timeout: 10,
														params: {
															format: 'js',
															items_list : [itemsList],
										   					share : true
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
								    }
								}
						},'-',new Ext.SplitButton({
								id: 'cleandirectory', 
							   	text: 'Clean All Directories',
							   	handler: function() {
							   				Ext.Ajax.request({
												   	url: tx.data.contacts_con.cleandirectory_remote_url,
												   	scriptTag: true,
												    callbackParam: 'jsoncallback',
												    timeout: 10,
														params: {
															format: 'js',
															share_type : 'ALL'
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
											
								 }, // handle a click on the button itself
							   	menu: new Ext.menu.Menu({
							        items: [
							        	// these items will render as dropdown menu items when the arrow is clicked:
								        {
									        text: 'Clean Shared Directory', 
									        handler: function() {
									        	Ext.Ajax.request({
												   	url: tx.data.contacts_con.cleandirectory_remote_url,
												   	scriptTag: true,
												    callbackParam: 'jsoncallback',
												    timeout: 10,
														params: {
															format: 'js',
															share_type : 'PUBLIC'
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
									        }
								        },{
									        text: 'Clean Contact Directory', 
									        handler: function() {
										        Ext.Ajax.request({
												   	url: tx.data.contacts_con.cleandirectory_remote_url,
												   	scriptTag: true,
												    callbackParam: 'jsoncallback',
												    timeout: 10,
														params: {
															format: 'js',
															share_type : 'PRIVATE'
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
									        }
								        }
							        ]
							   	})
							})]
	});
	this.postcontacts.on('rowclick', this.postcontacts.onRowClick, this.postcontacts);
	
	this.adoptcontacts = new BloneyContact.ContactsGrid({
						id: 'adoptcontacts',
						title: 'contacts list',
						columnmodel : 'checkbox',
						height: (config.height - 160),
						listeners: {activate: this.handleActivate}
	});
	this.adoptcontacts.on('rowclick', this.adoptcontacts.onRowClick, this.adoptcontacts);
	
	this.adoptcontactsfrm = new Ext.FormPanel({
		frame:true,
		id : 'adoptcustfrm',
		title: 'Import Contacts',
		iconCls : 'import-icon',
		//height : 290,
		autoHeight : true,
		listeners: {activate: this.handleActivate},
		items:[
				{
					xtype:"hidden",
					id:'adoptcontactsfrm_id'
				},{
					xtype:"combo",
					fieldLabel:"Contacts list",
					width : 200,
					store: this.comapniessharelist,
					displayField:'contact_name',
					valueField: 'contact_name',
					hiddenName: 'contact_nameId',
					typeAhead: true,
					id:'cs_contact_name',
					mode: 'local',
					triggerAction: 'all',
					emptyText:'Select a comapny ...',
					selectOnFocus:true,
					allowBlank:true
				},
				this.adoptcontacts
		  ],
		  bbar:['->',{	xtype:"textfield",
						id:'activation_key',
						width: 200,
						emptyText:'Enter Activation Key ...',
						name:"activation key",
						allowBlank:true
					},'-',{
						text:"Load contacts Directory",
						handler : function () {
									Ext.getCmp('adoptcontacts').loadFileRecords('',Ext.getCmp('activation_key').getValue());		
						}
					},'-',{
						text:"Adopt contacts Directory",
						id: 'adoptdirectory',
						handler : function () {
								var selItems = Ext.getCmp('adoptcontacts').getSelectionModel().getSelections();
								var itemsList = "";
								for(var i = 0, n = selItems.length; i < n; i++) {
							     	itemsList = ((itemsList == "") ? "," : (itemsList + ",") ) + selItems[i].data.contactId
									itemsList += ((i == n-1) ? "," :  "");
							    }
								if(itemsList != "" )
									Ext.Ajax.request({
													   	url: tx.data.contacts_con.adoptdirectory_remote_url,
													   	scriptTag: true,
													    callbackParam: 'jsoncallback',
													    timeout: 10,
															params: {
																format: 'js',
																contact_name : Ext.getCmp('cs_contact_name').getValue(),
													   			items_list : itemsList,
													   			share : true
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
						}
					},'-',{
						text:"Clean All",
						handler : function () {
							Ext.getCmp('adoptcustfrm').form.setValues( [ {id:'cs_contact_name', value:''}]);
							Ext.getCmp('activation_key').setValue('');		
						}
					}
			]
	});
	
	this.collaboratetabs = new Ext.TabPanel({
				region: 'center',
				margins:'3 3 3 0',
				//activeTab: 0,
				defaults:{autoScroll:true},
				id: 'collaborate_tabs',
				items:[
					this.postcontacts,
					this.adoptcontactsfrm
				]
			});
	
	BloneyContact.CollaborateWnd.superclass.constructor.call(this, {
		title : 'Bloney Collaborate -- Contacts',
		id: 'wndbloneycontactcollaborate',
		modal : true,
		iconCls:'collaborate-icon',
		width : config.width,
		height : config.height,
        items: [this.collaboratetabs],
		buttons: [{
				text: 'Close Collaborate Window',
				handler : function() {
					Ext.getCmp('wndbloneycontactcollaborate').close();
				}
			}]
		});
	Ext.getCmp('cs_contact_name').on('select', this.onSelectCN, this);
	
};

Ext.extend(BloneyContact.CollaborateWnd, Ext.Window,{
	
	handleActivate : function(tab){

		if(tab.id == 'postcontacts')
			Ext.getCmp('postcontacts').loadRecords();
			
		tab.doLayout();		
	},
	
	onSelectCN : function(o, record, index){
		Ext.getCmp('adoptcontacts').loadFileRecords(record.data.contact_name);
	},
	
	onSelectCT : function(o, record, index){
		
		if("ALL" == record.data.contact_type)
		{
			Ext.getCmp('postcontacts').getStore().clearFilter();
		}
		else
		{
			Ext.getCmp('postcontacts').getStore().filter('contact_type',record.data.contact_type);
		}
		
	}
	,
	
	onSelectET : function(o, record, index){
		
		if("ALL" == record.data.contact_type)
		{
			Ext.getCmp('postcontacts').getStore().clearFilter();
		}
		else
		{
			Ext.getCmp('postcontacts').getStore().filter('contact_type',record.data.contact_type);
		}
		
	}
});

BloneyContact.MainWnd = function(config){
	Ext.apply(this, config);
	
	this.contactAccounts = new AccountsPanel({id:'acc_owner',
											  width: config.width*0.275});
	
	this.contactTypes = new Ext.data.SimpleStore({
								fields: ['contacttype', 'contacttype_name'],
								data : [['CONTACT','Contacts'],
										['DEBTOR','Debtors'],
										['CREDITOR','Moneylender'],
										['EXPERT','Experts']]
						});
	
	this.contactsform = new Ext.FormPanel({
			labelWidth: config.width*0.1, // label settings here cascade unless overridden
			frame:true,
			width: config.width*0.30+10,
			defaultType: 'textfield',
			region: 'west',
            split: true,
            collapsible: true,
			margins:'3 0 3 3',
            cmargins:'3 3 3 3',
			id:'contactsform',
			items: [{
						xtype:"hidden",
						id:'contact_id'
					},{
						xtype:"hidden",
						id:'authenticity_token'
					},{
						fieldLabel: 'Contact',
						name: 's_contact_name',
						id:'s_contact_name',
						width : config.width*0.185,
						allowBlank:false
					},{
						xtype:"combo",
						fieldLabel:"Type",
						width : config.width*0.185,
						store: this.contactTypes,
						displayField:'contacttype_name',
						valueField: 'contacttype',
						hiddenName: 'contacttype_name',
						typeAhead: true,
						id:'s_contact_type',
						mode: 'local',
						triggerAction: 'all',
						emptyText:'Select a contact type...',
						selectOnFocus:true,
						allowBlank:false
					},{
						xtype:'fieldset',
						title: 'Contact Details',
						autoHeight:true,
						collapsible: true,
						defaults : {width: config.width*0.17},
						items :[
								{
									xtype:"textfield",
									fieldLabel:"Address",
									name:"s_address",
									id:'s_address',
									allowBlank:false
								},{
									xtype:"textfield",
									fieldLabel:"City",
									name:"s_city",
									id:'s_city',
									allowBlank:false
								},
								{
									xtype:"combo",
									fieldLabel:"Country",
									//width : config.width*0.17,
									store: Countries,
									displayField:'country',
									valueField: 'country_name',
									hiddenName: 'countryId',
									typeAhead: true,
									id:'s_country',
									mode: 'local',
									triggerAction: 'all',
									selectOnFocus:true,
									allowBlank:false
								}
								,{
									xtype:"field",
									fieldLabel:"Phone",
									name:"s_phone",
									id:'s_phone',
									allowBlank:false
								},{
									xtype:"field",
									fieldLabel:"Fax",
									name:"s_fax",
									id: 's_fax',
									allowBlank:false
								},{
									xtype:"field",
									fieldLabel:"Email",
									name:"s_email",
									id:'s_email',
									allowBlank:false,
									vtype:'email'
								},{
									xtype:"field",
									fieldLabel:"URL",
									name:"s_url",
									id:'s_url',
									allowBlank:false,
									vtype:'url'
								}
						]
				}/*
,{
						xtype:'fieldset',
						title: 'Contact Accounts',
						autoHeight:true,
						collapsible: true,
						items :this.contactAccounts
				}
*/
			]		
		});
	//this.on('',this.contactsform.onXXX, this.contactsform);
	
	this.contacts = new BloneyContact.ContactsGrid({
						id: 'contacts',
						title: 'Contacts',
						listeners: {activate: this.handleActivate}
	});
	this.contacts.on('rowclick', this.contacts.onRowClick, this.contacts);
	
	
	this.debtors = new BloneyContact.ContactsGrid({
						id: 'debtors',
						title: 'Debtors',
						listeners: {activate: this.handleActivate}
	});
	this.debtors.on('rowclick', this.debtors.onRowClick, this.debtors);
	
	this.moneylender = new BloneyContact.ContactsGrid({
						id: 'moneylender',
						title: 'Moneylender',
						listeners: {activate: this.handleActivate}
	});
	this.moneylender.on('rowclick', this.moneylender.onRowClick, this.moneylender);

	this.experts = new BloneyContact.ContactsGrid({
						id: 'experts',
						title: 'Experts',
						listeners: {activate: this.handleActivate}
	});
	this.experts.on('rowclick', this.experts.onRowClick, this.experts);
	
	this.contactsearch = new BloneyContact.ContactsGrid({
						id: 'contactsearch',
						height : config.height*0.5,
						title: 'Search results',
						listeners: {activate: this.handleActivate}
	});
	this.contactsearch.on('rowclick', this.contactsearch.onRowClick, this.contactsearch);
	
	this.search = new Ext.FormPanel({
		frame:true,
		id : 'contactsearch_form',
		title: 'Search & Filter',
		labelWidth : config.width*0.1,
		width: config.width*0.58,
		listeners: {activate: this.handleActivate},
		items:[
				{
					xtype:'fieldset',
					title: 'Contacts Search',
					autoHeight:true,
					width : config.width*0.65,
					collapsible: true,
					items :[
							{
								layout:'column',
								border:false,
								items:[
									{
										columnWidth: 0.5,
										layout: 'form',
										defaults : {width : config.width*0.18},
										labelWidth : config.width*0.1,
										items:[
												{
													xtype:"textfield",
													fieldLabel:"By contact",
													name:"s_contactname",
													id : 's_contactname',
													allowBlank:true
												},{
													xtype:"combo",
													fieldLabel:"By type",
													store: this.contactTypes,
													displayField:'contacttype_name',
													valueField: 'contacttype',
													hiddenName: 'contacttype_name',
													id : 's_contacttype',
													typeAhead: true,
													mode: 'local',
													triggerAction: 'all',
													emptyText:'Contact type...',
													selectOnFocus:true
												}
										]
									},{
										columnWidth: 0.5,
										layout: 'form',
										defaults : {width : config.width*0.18},
										labelWidth : config.width*0.1,
										items:[
												{
													xtype:"textfield",
													fieldLabel:"By city",
													name:"s_city",
													id : 's_contactcity',
													allowBlank:true
												},{
													xtype : "checkbox",
													id : 'show_archive',
													fieldLabel : "Show archived",
													name : "show_archive"
												}
										]
									}
								]
							}
					]
				},
				this.contactsearch
		  ],
		  buttons:[{
				text:"Clean All",
				handler : function () {
					Ext.getCmp('contactsearch_form').form.setValues( [
											{id:'s_contactname', value:''},
											{id:'s_contacttype', value:''},
											{id:'s_contactcity', value:''}]);
					
					//Ext.getCmp('contactsearch').loadRecords();
				}
			},{
				text:"Submit",
				handler : function () {
					var searchconfig = {};
					searchconfig.contact_type = Ext.getCmp('s_contacttype').getValue();
					searchconfig.contact_name = Ext.getCmp('s_contactname').getValue();
					searchconfig.contact_city = Ext.getCmp('s_contactcity').getValue();
					
					Ext.getCmp('contactsearch').searchRecords(searchconfig);	
					
				}
			}]
	});

	this.sendEmail = new Ext.FormPanel({
		url: '/desktop/sendmail',
		title: 'Send Email',
		labelWidth: config.width*0.15,
		id : 'sendemail',
		frame:true,
		defaultType: 'textfield',
		split: true,
		//collapsible: true,
		//margins:'3 0 3 3',
		defaults : {width : config.width*0.50},
		listeners: {activate: this.handleActivate},
            	items: [{
				fieldLabel: 'To ',
				name: 'to_contact',
				id : 'to_contact',
				allowBlank:false,
				vtype:'email'
			},{
				fieldLabel: 'Subject',
				name: 'subject',
				allowBlank:false
			},{
					fieldLabel: 'Text',
                    xtype:'htmleditor',
					height : config.height*0.50,
                    id:'email_editor',
					allowBlank:false
                } 

			],
		buttons: [{
			text: 'Send',
			iconCls:'email-contacts-icon',
			handler : function() {
				Ext.getCmp('sendemail').getForm().submit({
									waitMsg:'Please Wait...',
									reset:true,
									method:'GET',
									success:function(f,a){
											if(a && a.result){
												 this.publish( '/desktop/notify',{
											            title: 'Bloney Contacts',
											            iconCls: 'bloney-icon',
											            html: a.result.notice	
											        });											
										}
									},
									failure : function(f,a){				
										if(a && (a.result || a.response)){
											var notice = (a.result)? a.result.notice : a.response.statusText;
											this.publish( '/desktop/notify',{
											            title: 'Bloney Contacts',
											            iconCls: 'bloney-icon',
											            html: notice	
											        });	
										}
									}
								});	
			}
		}]
	});

	this.tabs = new Ext.TabPanel({
				region: 'center',
				margins:'3 3 3 0',
				activeTab: 0,
				defaults:{autoScroll:true},
				id: 'contact_tabs',
				tabPosition : 'bottom',
				items:[
					this.contacts,
					this.debtors,
					this.moneylender,
					this.experts,
					this.search,
					this.sendEmail
				],
		tbar: [{
					text : 'New Contact',
					id : 'new_contact',
					iconCls:'contacts-icon',
					handler : function (){
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
				,'->'/*
,{
						text : 'Statistics',
						handler : function (){}		
					},'-'
*/,{
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

	BloneyContact.MainWnd.superclass.constructor.call(this, {
		title : 'Bloney Contacts',
		id: 'wndbloneycontact',
		iconCls:'contacts-icon',
        items: [this.contactsform, this.tabs],
		buttons: [new Ext.SplitButton({
					id: 'contactcollbutton', // the container id
				   	text: 'Collaborate with Contacts',
					iconCls:'collaborate-icon',
				   	//handler: optionsHandler, // handle a click on the button itself
				   	menu: new Ext.menu.Menu({
				        items: [
				        	// these items will render as dropdown menu items when the arrow is clicked:
					        {
								text: 'Export Contacts', 
								iconCls : 'export-icon',
								handler: function() {
						        	var comapnyCollaborateWnd = new BloneyContact.CollaborateWnd({
						        										width:config.width - (Ext.getCmp('contactsform').getSize().width + 15),
						        										height:Ext.getCmp('contact_tabs').getSize().height });
						        	position  = Ext.getCmp('contact_tabs').getPosition();
						        	comapnyCollaborateWnd.setPosition(position[0],position[1]);
						        	Ext.getCmp('collaborate_tabs').setActiveTab(0);
						        	comapnyCollaborateWnd.show();
					        	
					        	}
							},
					        {
								text: 'Import Contacts', 
								iconCls : 'import-icon',
								handler: function() {
							        var comapnyCollaborateWnd = new BloneyContact.CollaborateWnd({
						        										width:config.width - (Ext.getCmp('contactsform').getSize().width + 15),
						        										height:Ext.getCmp('contact_tabs').getSize().height });
						        	
						        	position  = Ext.getCmp('contact_tabs').getPosition();
						        	comapnyCollaborateWnd.setPosition(position[0],position[1]);
						        	Ext.getCmp('collaborate_tabs').setActiveTab(1);
						        	comapnyCollaborateWnd.show();
					        	}
							}
				        ]
				   	})
				}),{
				text: 'Close Contacts Window',
				handler : function() {
					Ext.getCmp('wndbloneycontact').close();
				}
			}]
		});
		
		
		setTimeout( "Ext.getCmp('acc_owner').loadRecords('')", 2000 ); 
};


Ext.extend(BloneyContact.MainWnd, Ext.Window,{

	handleActivate : function(tab){

		if(tab.id == 'contacts')
			Ext.getCmp('contacts').loadRecords('CONTACT');

		if(tab.id == 'debtors')
			Ext.getCmp('debtors').loadRecords('DEBTOR');

		if(tab.id == 'moneylender')
			Ext.getCmp('moneylender').loadRecords('CREDITOR');
		
		if(tab.id == 'experts')
		{
			Ext.getCmp('experts').loadRecords('EXPERT');
			//Ext.getCmp('advisorslist').reload();
		}
		
		if(tab.id == 'contactsearch')
		    Ext.getCmp('contactsearch').loadRecords();

		Ext.getCmp('acc_owner').loadRecords('');
		tab.doLayout();		
	}
});

// ---------------------------------
// Bloney Accounts
// ---------------------------------
BloneyAccount = {};

BloneyAccount.AccountsList = function(config){
	Ext.apply(this, config);
		
	var reader = new Ext.data.JsonReader({
            root: 'Accounts',
            fields: [
					{name: 'financial_name', mapping: 'financial_name'},
					{name: 'financialId', mapping: 'financialId'},
					{name: 'financial_type', mapping: 'financial_type'},
					{name: 'account_type', mapping: 'account_type'},
					{name: 'account_alias', mapping: 'account_alias'},
					{name: 'account', mapping: 'account_no'},
					{name: 'balance', mapping: 'balance'},
					{name: 'credit_limit', mapping: 'credit_limit'},
					{name: 'accountId', mapping: 'accountId'},
					{name: 'contactId', mapping: 'contactId'},
					{name: 'currency', mapping: 'currency'},
					{name: 'balance_date', mapping: 'balance_date', type:'date', dateFormat: "Y-m-d"}    ]
        });
	
	this.store = new Ext.data.GroupingStore({
            proxy: new Ext.ux.CssProxy({ url: tx.data.accounts_con.url }),
            reader: reader,
			remoteSort: false,
            sortInfo:{field: 'balance', direction: "ASC"},
			groupField:'financial_type'
        });

	this.store.load({
		params: {
			format: 'jsonc'
		}
	});


	this.bank_reader = new Ext.data.JsonReader({
            root: 'Financials',
            fields: [
					{name: 'financialId', mapping: 'financialId'},
					{name: 'name', mapping: 'name'},
					{name: 'financial_type', mapping: 'financial_type'}    ]
        });
	
	this.banks_store = new Ext.data.Store({
            proxy: new Ext.ux.CssProxy({ url: tx.data.banks_con.url }),
            reader: this.bank_reader,
			remoteSort: false,
            sortInfo:{field: 'name', direction: "ASC"}
        });

	this.banks_store.load({
		params: {
			format: 'jsonc'
		}
	});


	// define a custom summary function
	Ext.grid.GroupSummary.Calculations['totalAmount'] = function(v, record, field){
	        return v + (record.data.balance);
	}

	this.summary = new Ext.grid.GroupSummary();

	this.columns = [
					{
					   header: "Financial",
					   dataIndex: 'financial_type',
					   sortable: true,
					   summaryType:'count',
					   align : 'right',
					   width: 100
					},{
					   header: "Account Name",
					   dataIndex: 'account_alias',
					   sortable: true,
					   width: 100
					},{
					   id: 'account',
					   header: "Account",
					   dataIndex: 'account',
					   sortable: true,
					   summaryType: 'count',
					   hideable: false,
					   summaryRenderer: function(v, params, data){
					                       return ((v === 0 || v > 1) ? '(' + v +' Accounts)' : '(1 Account)');
           			   },
					   width: 130,
					   align : 'right'
					},{
					   header: "Credit limit",
					   dataIndex: 'credit_limit',
					   sortable: true,
					   summaryType:'sum',
					   align : 'right',
					   width: 100,
					   renderer: this.amount
					},{
					   header: "Balance",
					   dataIndex: 'balance',
					   width: 100,
					   sortable: true,
					   summaryType:'sum',
					   align : 'right',
					   renderer: this.total_amount
					}
		];


		this.view = new Ext.grid.GroupingView({
			            forceFit:true,
			            showGroupName: false,
			            enableNoGroups:false, // REQUIRED!
			            hideGroupedColumn: true
			        });
	
	BloneyAccount.AccountsList.superclass.constructor.call(this, {
			id:'accounts_lst',
			loadMask: {msg:'Loading Accounts Summary...'},
        	plugins: this.summary,
			clicksToEdit: 1,
			collapsible: true,
			animCollapse: false,
        	trackMouseOver: false,
			iconCls: 'icon-grid'
	});
	
	this.on('rowcontextmenu', this.onContextClick, this);
		
};

Ext.extend(BloneyAccount.AccountsList,Ext.grid.EditorGridPanel,{
	
	onRowClick : function(grid, rowIndex, e){
		var record = grid.getStore().getAt(rowIndex);  // Get the Record
        
		Ext.getCmp('accounts_form').form.setValues( 
									[ {id:'account_id', value:record.data.accountId},
									  {id:'authenticity_token', value:record.data.authenticity_token},
									  {id:'accountnumber', value:record.data.account},
									  {id:'accounttype', value:record.data.account_type},
									  {id:'accountalias', value:record.data.account_alias},
									  {id:'accountcurrency', value:record.data.currency},
									  {id:'accountbalance', value:record.data.balance},
									  {id:'accountcrlimit', value:record.data.credit_limit},
									  {id:'accountbalancedate', value:record.data.balance_date},
									  {id:'cs_bank_name', value:record.data.financialId},
									  {id:'s_bankname', value:record.data.financial_name},
									  {id:'financialtype', value:record.data.financial_type},
									  {id:'cs_contact_name', value: record.data.contactId}
									 ] );
				
		Ext.getCmp('accountsstories').loadRecords( record.data.accountId,'Account');
		
		Ext.getCmp('accchart').store.load({
			params: {
				format: 'jsonc',
				accountId : record.data.accountId 
			},
	        callback: function()
	        {
	                Ext.getCmp('accchart').onLoadCallback();
	        }
		});
		
	},
 	onContextClick : function(grid, index, e){
 			var record = grid.getStore().getAt(index);
	        if(!this.menu){ // create context menu on first right click
	            this.menu = new Ext.menu.Menu({
	                id:'grid-ctx',
	                items: [
					// stick any markup in a menu
		            '<b class="x-toolbar x-small-editor">Accounts Context</b>',
		            '-',{
		                text: 'Send e-mail to Bank',
						iconCls:'email-contacts-icon',
		                handler: function() {
		                		Ext.getCmp('accounts_tabs').setActiveTab('sendemail');
		                		Ext.getCmp('acc_sendemail').form.setValues( [
									  {id:'to_contact', value:record.data.email}]);
		                	}
		            	}, {
		                text: 'Show Account Owner',
		               	handler: function() {
		               			var bloneyContactsWin = (Ext.getCmp('wndbloneycontact') != null) ? Ext.getCmp('wndbloneycontact') : new BloneyContact.MainWnd(Ext.getCmp('bloneytoolbar').global_config.winconfig);	
								Ext.getCmp('contactsearch').loadRecords();
								var searchconfig = {};
								searchconfig.contactId = record.get('contactId');
								Ext.getCmp('contactsearch').searchRecords(searchconfig);
								Ext.getCmp('acc_owner').loadRecords(record.get('contactId'));
								Ext.getCmp('contact_tabs').setActiveTab('contactsearch_form');	
								bloneyContactsWin.show();
		                	}
		                }
		             ]
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



    loadRecords : function() {
		this.store.baseParams = {
			format : 'jsonc'
		};
		this.store.load();
    },
	
    searchRecords : function (searchconfig){
    	this.store.baseParams = {
			//show_archive:  Ext.getCmp('show_archive').getValue(),
			filter_accounts : true,
			accounttype : searchconfig.accounttype,
			bank_name_search : searchconfig.bank_name_search,
			account_alias : searchconfig.account_alias,
			account_no : searchconfig.account_no,
			current_balance : searchconfig.current_balance,
			credit_limit : searchconfig.credit_limit,
			format: 'jsonc'
		};
        this.store.load();
    },
    
    loadFileRecords : function(contactname, activation_key) {

    	this.store.baseParams = {
			source: "FILE" ,
			contact_name : contactname,
			activation_key : (activation_key != null ? activation_key : ''),
			format: 'jsonc'
		};
        this.store.load();
		
    },
	
	amount : function (val) {
		var ret = Ext.getCmp('accounts_lst').format_amount(val);
		return ((ret == "0.00") ? ret : '<span style="font-weight: bold;">' + ret + '</span>');
	},
	
	total_amount : function (val) {
		var ret = Ext.getCmp('accounts_lst').format_amount(val);
		
		if(ret >= 0){ return '<span style="color:green;font-weight: bold;">' + ret + '</span>';}
		else if(ret < 0){return '<span style="color:red;font-weight: bold;">' + ret + '</span>'; }
        return ret;
	},
	
	format_amount : function (val)
	{
		var ret;
		if (val == "0") {ret = "0.00";}
		else if (val.toString().indexOf(".")<0 ) {ret = val + ".00";}
		else if (val.toString().indexOf(".") == (val.toString().length-2)) {ret = val + "0";}
		else {ret = val;}
		return ret;
	},
	
	onBeforeShow : function(){
	/*
	
		var record = this.store.getAt(0);  // Get the Record
       
	    if(record != null)
			Ext.getCmp('accounts_form').form.reset();
			Ext.getCmp('accounts_form').form.setValues( 
									[ {id:'account_id', value:record.data.id},
									  {id:'authenticity_token', value:record.data.authenticity_token},
									  {id:'accountnumber', value:record.data.account_no},
									  {id:'accounttype', value:record.data.account_type},
									  {id:'accountcurrency', value:record.data.currency},
									  {id:'accountbalance', value:record.data.balance},
									  {id:'accountcrlimit', value:record.data.credit_limit},
									  {id:'accountbalancedate', value:record.data.balance_date}
									 ] );
									 
			Ext.getCmp('banks_form').form.reset();
			Ext.getCmp('banks_form').form.setValues([ {id:'bank_id', value:node.attributes.bank.id},
										  {id:'s_bankname', value:record.data.bank.name},
	        							  {id:'s_bankbranch', value:record.data.bank.branch},
										  {id:'s_contact', value:record.data.bank.conn_person},
										  {id:'s_businessdate', value:record.data.bank.businessdate},
										  {id:'sb_address', value:record.data.bank.address},
										  {id:'sb_city', value:record.data.bank.city},
										  {id:'sb_country', value:record.data.country},
										  {id:'sb_phone', value:record.data.bank.phone},
										  {id:'sb_fax', value:record.data.bank.fax},
										  {id:'sb_email', value:record.data.bank.email},
										  {id:'sb_url', value:record.data.bank.url}
										 ]);
		
		//var tabs = Ext.getCmp('accounts_tabs').getItem('accountsstories');
		//tabs.setTitle("Blog "+ node.attributes.account_no);
		//tabs.handleActivate(Ext.getCmp('accounts_tabs').getItem('accountsstories'));
		//Ext.getCmp('accounts_tabs').setActiveTab('accounts_form');
		
		
*/
			
	}
});

Bloney = {};

Bloney.Stories = function( config) {

    Ext.apply(this, config);
	
	var reader = new Ext.data.JsonReader({
            root: 'Notes',
            fields: [
					{name: 'title', mapping: 'title'},
					{name: 'note', mapping: 'note'},
					{name: 'user', mapping: 'user'},
					{name: 'note_type', mapping: 'note_type'},
					{name: 'last_update', mapping: 'last_update'}   ]
        });
	
	this.store = new Ext.data.GroupingStore({
            proxy: new Ext.ux.CssProxy({ url: tx.data.notes_con.url }),
            reader: reader,
			remoteSort: false,
            sortInfo:{field: 'last_update', direction: "DESC"},
			groupField:'note_type'
        });

	this.store.load({
		params: {
			format: 'jsonc'
		}
	});
	


	this.columns = [{
					   id: 'story',
					   header: "Story",
					   dataIndex: 'note',
					   width: 250
					   ,renderer: Bloney.StoriesRenderers.story
					},{
					   header: "Author",
					   dataIndex: 'user',
					   width: 100,
					   hidden: true
					},{
					   header: "Type",
					   dataIndex: 'note_type',
					   width: 70,
					   align: 'right'
					},{
					   id: 'last',
					   header: "Last Post",
					   dataIndex: 'last_update',
					   width: 120
					   ,renderer: Bloney.StoriesRenderers.lastPost
				}];

    Bloney.Stories.superclass.constructor.call(this, {
       	autoScroll:true,
		frame:true,
        loadMask: {msg:'Loading Stories...'},
        sm: new Ext.grid.RowSelectionModel({
            singleSelect:true
        }),
		trackMouseOver:false,
		listeners: {activate: this.handleActivate},
        viewConfig: {
            forceFit:true,
            enableRowBody:true,
            showPreview:true,
            autoExpandColumn: 'note',
			getRowClass : function(record, rowIndex, p, ds){
				if(this.showPreview){
					p.body = '<p>'+record.data.note+'</p>';
					return 'x-grid3-row-expanded';
				}
				return 'x-grid3-row-collapsed';
			}
        }
    });

	this.current_account = "none";

};


Ext.extend(Bloney.Stories, Ext.grid.EditorGridPanel, {

    loadRecords : function(notableId, notableType) {
		this.store.baseParams = {
			notable_id: notableId,
			notable_type : notableType,
			format : 'jsonc'
		};
		this.store.load();
        
    },

    handleActivate : function(tab){

			tab.doLayout();
	}
});


Bloney.StoriesRenderers = {
    story : function(value, p, record){
        return String.format(
                '<div class="topic"><b>{0}</b><hr></hr><span class="post-date">{1}</span></div>',
                record.data.title, record.data.last_update);
    },

    lastPost : function(value, p, r){
        return String.format('by {0}',r.data.user);
    }
};

BloneyAccount.MainWnd = function(config){
	
	Ext.apply(this, config);
		
	
	
	var reader = new Ext.data.JsonReader({
            root: 'Cashrecords',
            fields: [
						{name: 'date', type:'string'},
					    {name: 'debit', type:'int'},
					    {name: 'credit', type:'int'}				
					]
        });
	
	this.store = new Ext.data.Store({
            proxy: new Ext.ux.CssProxy({ url: tx.data.cashrecords_con.url }),
            reader: reader,
            sortInfo:{field: 'date', direction: "ASC"}
        });
	
	
	this.store.load({
		params: {
			format: 'jsonc',
			accountId : 0 
		},
        callback: function()
        {
                Ext.getCmp('accchart').onLoadCallback();
        }
	});


	this.chartPanel = new Ext.ux.GVisualizationPanel({
	    id: "accchart",
		title: 'Account Utilization',
		layout:'fit',
	    width : config.width*0.60,
	    height:config.height*0.37,
	    visualizationPkg: "columnchart",         
	    visualizationCfg: {legend: "bottom"},  
	    store: this.store,
	    columns: [{
	      dataIndex: "date",
	      label: "date"
	    }, {
	      dataIndex: "credit",
	      label: "Money In"
	    }, {
	      dataIndex: "debit",
	      label: "Money Out"
	    }]
	  });

	this.banks_store = new Ext.data.Store({
            proxy: new Ext.ux.CssProxy({ url: tx.data.banks_con.url }),
            reader: new Ext.data.JsonReader({
	            root: 'Financials',
	            fields: [
						{name: 'financialId', mapping: 'financialId'},
						{name: 'name', mapping: 'name'}]
	        }),
			remoteSort: false,
            sortInfo:{field: 'name', direction: "ASC"}
        });

	this.banks_store.load({
		params: {
			format: 'jsonc'
		}
	});
	
	this.comboBankslist = new Ext.form.ComboBox({
							store: this.banks_store,
							displayField:'name',
							valueField: 'financialId',
							hiddenName: 'name',
							typeAhead: true,
							fieldLabel: 'Financial Institution',
							width : config.width*0.183,
							labelWidth : config.width*0.07,
							id:'cs_bank_name',
							mode: 'local',
							triggerAction: 'all',
							emptyText:'Institution ...',
							selectOnFocus:true,
							allowBlank:true
					});
					
	this.searchcomboBankslist = new Ext.form.ComboBox({
							store: this.banks_store,
							displayField:'name',
							valueField: 'financialId',
							hiddenName: 'name',
							typeAhead: true,
							fieldLabel: 'Financial Institution',
							width : config.width*0.183,
							labelWidth : config.width*0.07,
							id:'cs_bank_name_search',
							mode: 'local',
							triggerAction: 'all',
							emptyText:'Institution ...',
							selectOnFocus:true,
							allowBlank:true
					});
									
	this.contactslist = new Ext.data.Store({
            proxy: new Ext.ux.CssProxy({ url: tx.data.contacts_con.url }),
            reader: new Ext.data.JsonReader({
            root: 'Contacts',
            fields: [
					    {name: 'contactId', mapping: 'contactId'},
					    {name: 'contact_name', mapping: 'contact_name'}      ]
        	}),
            sortInfo:{field: 'contact_name', direction: "ASC"}
        });

	this.contactslist.load({
		params: {
			format: 'jsonc'
		}
	});

	this.comboContactslist = new Ext.form.ComboBox({
							store: this.contactslist,
							displayField:'contact_name',
							valueField: 'contactId',
							hiddenName: 'contact_name',
							typeAhead: true,
							fieldLabel: 'Contacts',
							id:'cs_contact_name',
							width : config.width*0.15,
							labelWidth : config.width*0.07,
							mode: 'local',
							triggerAction: 'all',
							emptyText:'Contact Name...',
							selectOnFocus:true,
							allowBlank:true
					});
	//this.comboContactslist.on('select', this.onSelectET, this);
	this.balanceDate = new Ext.form.DateField({
		fieldLabel: 'Balance Date',
		name: 'accountbalancedate',
		id : 'accountbalancedate',
		allowBlank:false,
		format : "Y-m-d"
	});
	
	this.accountsform = new Ext.FormPanel({
        title: 'Account Details',
		frame:true,
		id : 'accounts_form',
		listeners: {activate: this.handleActivate},
        items: [{
					xtype:"hidden",
					id:'account_id'
				},{
					xtype:"hidden",
					id:'authenticity_token'
				},
				{
					layout : 'column',
					border : false,
					items : [
							{
								columnWidth:.5,
			                	layout: 'form',
			                	border:false,								
			                	items: [{
									fieldLabel: 'Account Name',
									xtype:"textfield",
									name: 'accountalias',
									id:'accountalias',
									allowBlank:false,
									width : config.width*0.19,
									labelWidth : config.width*0.13
								}]
							},{
								columnWidth:.5,
			                	layout: 'form',
			                	border:false,								
			                	items: [{
									fieldLabel: 'Account Number',
									xtype:"textfield",
									name: 'accountnumber',
									id:'accountnumber',
									allowBlank:false,
									width : config.width*0.19,
									labelWidth : config.width*0.13
								}]
							}
					]
				},
				{
					xtype:'fieldset',
					title: 'Account Details',
					autoHeight:true,
					width : config.width*0.60,
					labelWidth : config.width*0.10,
					collapsible: false,
					items :[{
			            layout:'column',	
			            border:false,
			            items:[{
			                columnWidth:.5,
			                layout: 'form',
			                border:false,
							defaults : {width : config.width*0.17},
			                items: [{
									xtype:"combo",
									fieldLabel:"Account Type",
									store: new Ext.data.SimpleStore({
											fields: ['acc_type', 'acc_type_desc'],
											data : [['CASH','Cash'],
													['CHECKING','Checking'],
													['SAVINGS','Savings'],
													['DESPOSIT','Deposit'], 
													['CREDIT_CARD','Credit Card']]
									}),
									displayField:'acc_type_desc',
									valueField: 'acc_type',
									hiddenName: 'acc_type_desc',
									typeAhead: true,
									mode: 'local',
									triggerAction: 'all',
									emptyText:'Select a type...',
									selectOnFocus:true,
									name: 'accounttype',
									id:'accounttype',
									allowBlank:false
								},{
									fieldLabel: 'Currency',
									xtype:"textfield",
									name: 'accountcurrency',
									id:'accountcurrency',
									allowBlank:true,
									disabled : true,
									emptyText : 'BLN'
								},{
									fieldLabel: 'Balance',
									xtype:"textfield",
									name: 'accountbalance',
									id:'accountbalance',
									allowBlank:true,
									value : '0.00'
								},{
									fieldLabel: 'Credit Limit',
									xtype:"textfield",
									name: 'accountcrlimit',
									id:'accountcrlimit',
									allowBlank:true,
									value :  '0.00'
								},
								this.balanceDate
								]
				            },{
				                columnWidth:.5,
				                layout: 'form',
								border:false,
								items: [this.comboBankslist,
										{
											xtype: 'fieldset',
											title: 'New Institution Details',
											autoHeight: true,
											defaults : {width : config.width*0.16},
											collapsible: true,
											collapsed : true,
											id : 'new_institution',
											items: [{
												fieldLabel: 'Finance Name',
												xtype: "textfield",
												name: 's_bankname',
												id: 's_bankname',
												allowBlank: false
											}, {
												xtype: "combo",
												fieldLabel: "Institution Type",
												store: new Ext.data.SimpleStore({
													fields: ['fin_type', 'fin_type_desc'],
													data: [['BANK', 'Bank'], ['CREDIT', 'Credit Comapny'], ['INSUARENCE', 'Insuarence Comapny'], ['INVESTEMENT', 'Invetement Comapny']]
												}),
												displayField: 'fin_type_desc',
												valueField: 'fin_type',
												hiddenName: 'fin_type_desc',
												typeAhead: true,
												mode: 'local',
												triggerAction: 'all',
												emptyText: 'Select a type...',
												selectOnFocus: true,
												name: 'financialtype',
												id: 'financialtype',
												allowBlank: false
											}, 
											this.comboContactslist]
											}
										]
				            }
						]
        }]},this.chartPanel
		]
    });
		
	 this.accountstree = new Ext.tree.TreePanel({
                id:'accountstree',
                animate:true, 
                rootVisible:true,
                autoScroll:true,
                frame : true,
                collapseFirst:false,
                loader : new Ext.tree.XDomainTreeLoader({	dataUrl:tx.data.accounts_con.url, 
															preloadChildren: true,
															clearOnLoad: false,
															baseParams : {format : 'js', 
																		  virtual : true,
																		  virtual_account : ""}
													}),
                enableDD:true,
                containerScroll: true,
                dropConfig: {appendOnly:true},
				root			: new Ext.tree.AsyncTreeNode({
									  text: 'Accounts',
									  id:'0',
									  expanded:true
								  })
            });
            
     new Ext.tree.TreeSorter(this.accountstree,{
				folderSort:false
				,caseSensitive :true
				,property:id
			});
            
	this.vaccountstree = new Ext.tree.TreePanel({
                id:'vaccountstree',
                animate:true,
                autoScroll:true,
                rootVisible: true,
                frame : true,
                loader : new Ext.tree.XDomainTreeLoader({	dataUrl:tx.data.accounts_con.url, 
													preloadChildren: true,
													clearOnLoad: false,
													baseParams : {format : 'js', 
																  virtual : true,
																  virtual_account : "xxxx"}
													}),
                containerScroll: true,
                enableDD:true,
                dropConfig: {appendOnly:true},
                root			: new Ext.tree.AsyncTreeNode({
									  text: 'Virtual Account',
									  id:'0',
									  expanded:true
								  })
            });
                      
  	new Ext.tree.TreeSorter(this.vaccountstree,{
				folderSort:false
				,caseSensitive :true
				,property:id
			});
            
   this.vaccounts_store = new Ext.data.Store({
            proxy: new Ext.ux.CssProxy({ url: tx.data.banks_con.url }),
            reader: new Ext.data.JsonReader({
	            root: 'Banks',
	            fields: [
						{name: 'account_alias', mapping: 'account_alias'}]
	        }),
			remoteSort: false,
            sortInfo:{field: 'account_alias', direction: "ASC"}
        });

	this.vaccounts_store.load({
		params: {
			format: 'jsonc', 
			account_type : 'GROUP'
		}
	});
	
	this.comboVAccountslist = new Ext.form.ComboBox({
							store: this.vaccounts_store,
							displayField:'account_alias',
							valueField: 'account_alias',
							hiddenName: 'account_alias',
							typeAhead: true,
							fieldLabel: 'Account Name',
							width : config.width*0.21,
							labelWidth : config.width*0.07,
							id:'cs_vaccounts',
							mode: 'local',
							triggerAction: 'all',
							emptyText:'Group Account ...',
							selectOnFocus:true,
							allowBlank:true
					});      
	
	this.virtualaccount = new Ext.FormPanel({
		frame:true,
		id : 'virtualaccount',
		title: 'Group Accounts',
		//labelWidth : config.width*0.07,
		listeners: {activate: this.handleActivate},
		layout:'form',
		items:[
				{
						xtype:"hidden",
						id:'contact_id'
					},{
						xtype:"hidden",
						id:'authenticity_token'
					},this.comboVAccountslist,
				{
					xtype:'fieldset',
					title: 'Create Group Account',
					autoHeight:true,
					width : config.width*0.60,
					//labelWidth : config.width*0.07,
					collapsible: true,
					items :[
							{
								layout:'column',
								border:false,
								items:[
									{
										columnWidth: 0.5,
										layout: 'form',
										defaults : {width : config.width*0.28},
										labelWidth : config.width*0.025, 
										items:[
											this.accountstree	
										]
									},{
										columnWidth: 0.5,
										layout: 'form',
										defaults : {width : config.width*0.28},
								        labelWidth : config.width*0.025,
										items:[
											this.vaccountstree	
										]
									}
								]
							}
					]
				}
		  ],
		  buttons:[{
				text:"Submit",
				handler : function () {}
			},{
				text:"Reset",
				handler : function () {}
			}]
	});
	
	this.search = new Ext.Panel({
		frame:true,
		id : 'searchacc',
		title: 'Search & Filter',
		labelWidth : config.width*0.07,
		listeners: {activate: this.handleActivate},
		layout:'form',
		items:[
				{
					xtype:'fieldset',
					title: 'Accounts Filter',
					autoHeight:true,
					width : config.width*0.61,
					//collapsible: true,
					items :[
							{
								layout:'column',
								border:false,
								items:[
									{
										columnWidth: 0.5,
										layout: 'form',
										items:[{
												xtype:"combo",
												fieldLabel:"Account Type",
												store: new Ext.data.SimpleStore({
													fields: ['acc_type', 'acc_type_desc'],
													data : [['CASH','Cash'],
															['CHECKING','Checking'],
															['SAVINGS','Savings'],
															['DESPOSIT','Deposit'], 
															['CREDIT_CARD','Credit Card'],
															['ALL','All Account Types']]
												}),
												displayField:'acc_type_desc',
												valueField: 'acc_type',
												hiddenName: 'acc_type_desc',
												typeAhead: true,
												mode: 'local',
												triggerAction: 'all',
												emptyText:'Select a type...',
												selectOnFocus:true,
												name: 'accounttype',
												id:'s_accounttype',
												allowBlank:false,
												width : config.width*0.183,
												labelWidth : config.width*0.07
											},this.searchcomboBankslist		
										]
									},{
										columnWidth: 0.5,
										layout: 'form',
										defaults : {width : config.width*0.19,
													labelWidth : config.width*0.13},
										items:[
												{
													xtype:"textfield",
													fieldLabel:"Account Name",
													name:"s_account_alias",
													id:"s_account_alias",
													allowBlank:true
												},{
													xtype:"textfield",
													fieldLabel:"Account Number",
													name:"s_caccount_no",
													id:"s_caccount_no",
													allowBlank:true
												},{
													xtype:"textfield",
													fieldLabel:"Current Balance",
													name:"s_current_balance",
													id:"s_current_balance",
													allowBlank:true
												},{
													xtype:"textfield",
													fieldLabel:"Credit Limit",
													name:"s_credit_limit",
													id:"s_credit_limit",
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
				text:"Submit",
				handler : function () {
					var searchconfig = {
						accounttype : Ext.getCmp('s_accounttype').getValue(),
						bank_name_search : Ext.getCmp('cs_bank_name_search').getValue(),
						account_alias : Ext.getCmp('s_account_alias').getValue(),
						account_no : Ext.getCmp('s_caccount_no').getValue(),
						current_balance : Ext.getCmp('s_current_balance').getValue(),
						credit_limit : Ext.getCmp('s_credit_limit').getValue(),
					};
					Ext.getCmp('wndbloneyaccount').accounts_nav.searchRecords(searchconfig);
				}
			},{
				text:"Clear Filter",
				handler : function () {
					Ext.getCmp('s_accounttype').setValue('');
					Ext.getCmp('cs_bank_name_search').setValue(''),
					Ext.getCmp('s_account_alias').setValue('');
					Ext.getCmp('s_caccount_no').setValue('');
					Ext.getCmp('s_current_balance').setValue('');
					Ext.getCmp('s_credit_limit').setValue('');
					Ext.getCmp('wndbloneyaccount').accounts_nav.loadRecords();
				}
			}]
	});
	
	this.accountstories = new Bloney.Stories({
		id:'accountsstories',
		title:'Accounts Blog'
	});
		
	
	this.tabs = new Ext.TabPanel({
        region: 'center',
		margins:'3 3 3 0',
		activeTab: 0,
		defaults:{autoScroll:true},
		id: 'accounts_tabs',
		tabPosition : 'bottom',
        items:[	this.accountsform,
				this.accountstories,
				this.search
			],
		tbar: [{
					text : 'New Account',
					id : 'new_contact',
					iconCls:'accounts-icon',
					handler: function(){
						if (Ext.getCmp('accounts_tabs').getActiveTab().id == 'accounts_form') {
							var data = { 	
					   				accountId:  Ext.getCmp('account_id').getValue(),
									authenticity_token : Ext.getCmp('authenticity_token').getValue(),
									account_no : Ext.getCmp('accountnumber').getValue(),
									account_alias : Ext.getCmp('accountalias').getValue(),
									account_type : Ext.getCmp('accounttype').getValue(),
									currency : Ext.getCmp('accountcurrency').getValue(),
									balance : Ext.getCmp('accountbalance').getValue(),
									credit_limit : Ext.getCmp('accountcrlimit').getValue(),
									balance_date : Ext.getCmp('accountbalancedate').getValue().format("Y-m-d"),
									financialId : Ext.getCmp('cs_bank_name').getValue(),
									financialName : Ext.getCmp('s_bankname').getValue(),
									financialType : Ext.getCmp('financialtype').getValue(),
									contact_id : Ext.getCmp('cs_contact_name').getValue()
								};

							Ext.Ajax.request({
								url: tx.data.accounts_con.create_remote_url,
								scriptTag: true,
								callbackParam: 'jsoncallback',
								timeout: 10,
								params: {
									format: 'js',
									account: Ext.util.JSON.encode(data)
								},
								success: function(r){
									this.publish('/desktop/notify', {
										title: 'Bloney Accounts',
										iconCls: 'bloney-icon',
										html: r.responseObject.notice
									});
								},
								failure: function(r){
									this.publish('/desktop/notify', {
										title: 'Bloney Contacts',
										iconCls: 'bloney-icon',
										html: r.responseObject.notice
									});
								},
								scope: this
							});
							tab = Ext.getCmp('accounts_tabs').getActiveTab();
							Ext.getCmp('wndbloneyaccount').handleActivate(tab);	
						}
					}		
				},{
					text: 'Save Changes',
					iconCls:'save-contacts-icon',
					handler : function() {
						if ((Ext.getCmp('accounts_tabs').getActiveTab().id == 'accounts_form') ) 
						{
							var current_url;
							var parameters = {};
							current_url = tx.data.accounts_con.update_remote_url;
							parameters = {
									format: 'js',
									account: Ext.util.JSON.encode({
											accountId:  Ext.getCmp('account_id').getValue(),
											authenticity_token : Ext.getCmp('authenticity_token').getValue(),
											account_alias : Ext.getCmp('accountalias').getValue(),
											account_no : Ext.getCmp('accountnumber').getValue(),
											account_type : Ext.getCmp('accounttype').getValue(),
											currency : Ext.getCmp('accountcurrency').getValue(),
											balance : Ext.getCmp('accountbalance').getValue(),
											credit_limit : Ext.getCmp('accountcrlimit').getValue(),
											balance_date : Ext.getCmp('accountbalancedate').getValue().format("Y-m-d"),
											financialId : Ext.getCmp('cs_bank_name').getValue(),
											financialName : Ext.getCmp('s_bankname').getValue(),
											financialType : Ext.getCmp('financialtype').getValue(),
											contact_id : Ext.getCmp('cs_contact_name').getValue()
									})
								};
							
							
							Ext.Ajax.request({
								url: current_url,
								scriptTag: true,
								callbackParam: 'jsoncallback',
								timeout: 10,
								params: parameters,
								success: function(r){
									this.publish('/desktop/notify', {
										title: 'Bloney Contacts',
										iconCls: 'bloney-icon',
										html: r.responseObject.notice
									});
								},
								failure: function(r){
									this.publish('/desktop/notify', {
										title: 'Bloney Contacts',
										iconCls: 'bloney-icon',
										html: r.responseObject.notice
									});
								},
								scope: this
							});
							tab = Ext.getCmp('accounts_tabs').getActiveTab();
							Ext.getCmp('wndbloneyaccount').handleActivate(tab);
						}	
					}
				},{
						text : 'Delete',
						iconCls:'delete-contacts-icon',
						handler : function (){
							if(	(Ext.getCmp('accounts_tabs').getActiveTab().id == 'accounts_form')) 
							{
								Ext.Ajax.request({
								    url: tx.data.accounts_con.destroy_remote_url,
								    scriptTag: true,
								    callbackParam: 'jsoncallback',
								    timeout: 10,
										params: {
											format: 'js',
											accountId : Ext.getCmp('account_id').getValue()
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
								tab = Ext.getCmp('accounts_tabs').getActiveTab();
								Ext.getCmp('wndbloneyaccount').handleActivate(tab);	
							}							
						}		
				},{
					text: 'Clean Form',
					iconCls:'clean-contacts-icon',
					handler: function(){
							Ext.getCmp('accounts_form').form.setValues( [
        							  {id:'accountnumber', value:''},
									  {id:'accountalias', value:''},
        							  {id:'accounttype', value:''},
									  {id:'accountcurrency', value:''},
									  {id:'accountbalance', value:''},
									  {id:'accountcrlimit', value:''},
									  {id:'accountbalancedate', value:''},
									  {id:'cs_bank_name', value:''},
									  {id:'cs_contact_name', value:''}]);
						
						
						
					}
				}
				,'->'/*
,{
						text : 'Statistics',
						handler : function (){}		
					},'-'
*/,{
						text : 'Archive',
						iconCls:'archive-contacts-icon',
						handler: function(){
							if ((Ext.getCmp('accounts_tabs').getActiveTab().id == 'accounts_form'))
							 {
								
								Ext.Ajax.request({
									url: tx.data.accounts_con.update_remote_url,
									scriptTag: true,
									callbackParam: 'jsoncallback',
									timeout: 10,
									params: {
										format: 'js',
										accountId: Ext.getCmp('account_id').getValue(),
										task: 'archive'
									},
									success: function(r){
										this.publish('/desktop/notify', {
											title: 'Bloney Contacts',
											iconCls: 'bloney-icon',
											html: r.responseObject.notice
										});
									},
									failure: function(r){
										this.publish('/desktop/notify', {
											title: 'Bloney Contacts',
											iconCls: 'bloney-icon',
											html: r.responseObject.notice
										});
									},
									scope: this
								});
								tab = Ext.getCmp('accounts_tabs').getActiveTab();
								Ext.getCmp('wndbloneyaccount').handleActivate(tab);
							}
						}		
					},{
						text : 'Restore',
						iconCls:'restore-contacts-icon',
						handler : function (){
							if ((Ext.getCmp('accounts_tabs').getActiveTab().id == 'accounts_form') ||
							    (Ext.getCmp('accounts_tabs').getActiveTab().id == 'banks_form'))
							 {
								
								Ext.Ajax.request({
									url: tx.data.accounts_con.update_remote_url,
									scriptTag: true,
									callbackParam: 'jsoncallback',
									timeout: 10,
									params: {
										format: 'js',
										accountId: Ext.getCmp('account_id').getValue(),
										task : 'restore'
									},
									success: function(r){
										this.publish('/desktop/notify', {
											title: 'Bloney Contacts',
											iconCls: 'bloney-icon',
											html: r.responseObject.notice
										});
									},
									failure: function(r){
										this.publish('/desktop/notify', {
											title: 'Bloney Contacts',
											iconCls: 'bloney-icon',
											html: r.responseObject.notice
										});
									},
									scope: this
								});
								tab = Ext.getCmp('accounts_tabs').getActiveTab();
								Ext.getCmp('wndbloneyaccount').handleActivate(tab);
							}
						}		
					}]
    	});
	
	this.accounts_nav = new BloneyAccount.AccountsList({
			frame:true,
			width: config.width*0.35,
			region: 'west',
	        split: true,
	        collapsible: true,
	        title: 'Banks & Accounts'
	});
	
	this.accounts_nav.on('rowclick', this.accounts_nav.onRowClick, this.accounts_nav);
	
	
	
	BloneyAccount.MainWnd.superclass.constructor.call(this, {
		title : 'Bloney Accounts',
		iconCls:'accounts-icon',
		id: 'wndbloneyaccount',
		items: [ this.accounts_nav, this.tabs],
		buttons:[{
				text: 'Close Accounts Window',
				handler : function() {
					Ext.getCmp('wndbloneyaccount').close();
			}
		}]
	});
	
	Ext.getCmp('new_institution').on('expand', function() { Ext.getCmp('cs_bank_name').disable();}, this);
	Ext.getCmp('new_institution').on('collapse', function() { Ext.getCmp('cs_bank_name').enable();}, this);

};

Ext.extend(BloneyAccount.MainWnd, Ext.Window,{
	
	handleActivate : function(tab){
		Ext.getCmp('wndbloneyaccount').accounts_nav.loadRecords();
		Ext.getCmp('accchart').store.load({
			params: {
				format: 'jsonc',
				accountId : 0 
			},
	        callback: function()
	        {
	                Ext.getCmp('accchart').onLoadCallback();
	        }
		});
		tab.doLayout();		
	}
});


// ---------------------------------
// Bloney Report
// ---------------------------------


BloneyReport = {};

BloneyReport.ContentPanel = function(config) {
	
	Ext.apply(this, config);
	
	if(config.checked == true)
	{
		this.loader = new Ext.tree.TreeLoader({
        	dataUrl:'/reports',
        	requestMethod : 'GET',
        	preloadChildren: true,
			clearOnLoad: false,
            baseParams:{format:'json'},
            baseAttrs: {checked: false}
        });
	}
	else
	{
		this.loader = new Ext.tree.TreeLoader({
        	dataUrl:'/reports',
        	requestMethod : 'GET',
        	preloadChildren: true,
			clearOnLoad: false,
            baseParams:{format:'json'}
        });
	}
	
    BloneyReport.ContentPanel.superclass.constructor.call(this, {
        layout:'fit',
        loader: this.loader,
        root: new Ext.tree.AsyncTreeNode({
            text:'Bloney Reports',
            id:'0',
            expanded:true
         }),
        collapsible: true,
        rootVisible:true,
        lines:false,
        autoScroll:true,
        animCollapse:true,
        animate: true,
        collapseMode:'mini',
        collapseFirst:false 
    });
   	
    new Ext.tree.TreeSorter(this,{
		folderSort:false
		,caseSensitive :true
		,property:'id'
	});
	
    this.getSelectionModel().on('beforeselect', function(sm, node){
        return node.isLeaf();
    });
};

Ext.extend(BloneyReport.ContentPanel, Ext.tree.TreePanel, {
    selectClass : function(cls){
        if(cls){
            var parts = cls.split('.');
            var last = parts.length-1;
            for(var i = 0; i < last; i++){ 
                var p = parts[i];
                var fc = p.charAt(0);
                var staticCls = fc.toUpperCase() == fc;
                if(p == 'Ext' || !staticCls){
                    parts[i] = 'pkg-'+p;
                }else if(staticCls){
                    --last;
                    parts.splice(i, 1);
                }
            }
            parts[last] = cls;
        }
    }
});

BloneyReport.SearchPanel = function(config){
	Ext.apply(this, config);
	
	this.searchStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/reports/search'
        }),
        reader: new Ext.data.JsonReader({
	           root: 'data'
	        },
			['text', 'leaf', 'description', 'content', 'link']
		),
		baseParams:{format:'json'},
        listeners: {
            'beforeload' : function(){
                this.baseParams.qt = Ext.getCmp('search-type').getValue();
            }
        }
    });
    
	 var resultTpl = new Ext.XTemplate(
	        '<tpl for=".">',
	        '<div class="search-item">',
	            '<a class="cls" ext:cls="{text}" ext:link="{link}" href="{link}">{text}</a>',
	            '<p>{description}</p>',
	        '</div></tpl>'
	    );
		
	    
		BloneyReport.SearchPanel.superclass.constructor.call(this,{
            id : 'search',
			tpl: resultTpl,
			title : 'Search',
			loadingText:'Searching...',
            store: this.searchStore,
            itemSelector: 'div.search-item',
			emptyText: '<h3>Use the search field above to search the Bloney Cashflow report topics.</h3>'
        });
    
        this.on('click', this.onClick,this);
};

Ext.extend(BloneyReport.SearchPanel, Ext.DataView,{

	 onClick: function(e, target){
        if(target = e.getTarget('a:not(.exi)', 3)){
            var cls = Ext.fly(target).getAttributeNS('ext', 'cls');
            var main = Ext.getCmp('report-body');
            e.stopEvent();
            if(cls){
                var link = Ext.fly(target).getAttributeNS('ext', 'link');
                main.loadClass(link, cls);
            }else if(target.className == 'inner-link'){
                main.getActiveTab().scrollToSection(target.href.split('#')[1]);
            }else{
                window.open(target.href);
            }
        }else if(target = e.getTarget('.micon', 2)){
            e.stopEvent();
            var tr = Ext.fly(target.parentNode);
            if(tr.hasClass('expandable')){
                tr.toggleClass('expanded');
            }
        }
    },
    
    doSearch : function(e){
		var k = e.getKey();
		if(!e.isSpecialKey()){
			var text = e.target.value;
			if(!text){
				this.searchStore.baseParams.q = '';
				this.searchStore.removeAll();
			}else{
				this.searchStore.baseParams.q = text;
				this.searchStore.reload();
			}
		}
	}

});

BloneyReport.DocPanel = function(config){
	
	Ext.apply(this, config);
	
	var reader = new Ext.data.JsonReader({
            root: 'Cashrecords',
            fields: [
					 {name: 'cashrecordId', mapping:'cashrecordId'},
					 {name: 'cashrec_type', mapping: 'cashrec_type'},
                     {name: 'category_name', mapping: 'category_name'},                  
                     {name: 'dr_value_date', mapping: 'dr_value_date', type:'date', dateFormat: "Y-m-d"},
					 {name: 'dr_account_id', mapping: 'dr_account_id'},
					 {name: 'dr_account_no', mapping: 'dr_account_no'},
                     {name: 'debit_amount', mapping: 'debit_amount'},                  
                     {name: 'cr_value_date', mapping: 'cr_value_date', type:'date', dateFormat: "Y-m-d"},
                     {name: 'cr_account_id', mapping: 'cr_account_id'},
					 {name: 'cr_account_no', mapping: 'cr_account_no'},
					 {name: 'authenticity_token', mapping:'authenticity_token'} ,
                     {name: 'reference', mapping:'reference'},
                     {name: 'original_balance', mapping:'original_balance'},
                     {name: 'repetitive_type', mapping:'repetitive_type'},
                     {name: 'record_sequence', mapping:'record_sequence'},
                     {name: 'total_records', mapping:'total_records'},
                     {name: 'repetitive_amount', mapping:'repetitive_amount'},
                     {name: 'starting_date', mapping:'starting_date', type:'date', dateFormat: "Y-m-d"},
                     {name: 'detail', mapping:'details'},
                     {name: 'credit_amount', mapping: 'credit_amount'}
					]				
        });
	

	 var groupStore = new Ext.ux.MultiGroupingStore({                      
            reader: reader,    
            proxy: new Ext.ux.CssProxy({ url: tx.data.cashrecords_con.url }),   
            groupField: ['cashrec_type','category_name','reference'],
            sortInfo: {field: 'cashrec_type', direction: 'DESC'}            
        });
	
	groupStore.load({
			params: {
				format: 'jsonc',
				return_type : 'list'
			}
		});
		
     var groupView = new Ext.ux.MultiGroupingView({
                forceFit: true,
                emptyGroupText: 'All Group Fields Empty',
                displayEmptyFields: true, //you can choose to show the group fields, even when they have no values
                groupTextTpl: '{text} ', //({[values.rs.length]} {[values.rs.length > 1 ? "Records" : "Record"]})',
                                displayFieldSeperator: ', ' //you can control how the display fields are seperated
     });

    var columns = [ {
						header : "Category",
						dataIndex : 'category_name',
						sortable : true,
						width : 100,
						align : 'right'
					},{
						header : "Debit Amount",
						dataIndex : 'debit_amount',
						width : 100,
						sortable : true,
						summaryType : 'sum',
						align : 'right',
						renderer: this.amount,
			            editor: new Ext.form.NumberField({
			               allowBlank: false,
			               allowNegative: false,
			               maxValue: 100000
			            }) 
					}, {
						header : "Credit Amount",
						dataIndex : 'credit_amount',
						width : 100,
						sortable : true,
						summaryType : 'sum',
						align : 'right',
						renderer: this.amount,
			            editor: new Ext.form.NumberField({
			               allowBlank: false,
			               allowNegative: false,
			               maxValue: 100000
			            }) 
					}];
	 var cashrecordsSummary = new Ext.grid.GridPanel({
        store: groupStore,
        columns: columns,
        view: groupView,
        //frame:true,
        //width: 1024,
        height: config.height*0.52,
        //collapsible: true,
        //animCollapse: true,
        //title: 'Grouping Example',
        //iconCls: 'icon-grid',
		id : 'balance-report',
        //renderTo: document.body,

     
     }); 
	
	
	BloneyReport.DocPanel.superclass.constructor.call(this, {
		 frame:true,
		 layout:'form',
		 listeners: {activate: this.handleActivate},
		 items : [
				{
					xtype:'fieldset',
					title: 'Balance Sheet details',
					autoHeight:true,
					width : config.width*0.8,
					collapsible: true,
					items :[
							{
								layout:'column',
								border:false,
								items:[
									{
										columnWidth: 0.33,
										layout: 'form',
										defaults : {width : config.width*0.15},
										labelWidth : config.width*0.07,
										items:[
												{
														fieldLabel: 'Balance Date',
														xtype:"datefield",
														name: 'accountbalancedate',
														id: 'balance_date',
														allowBlank:false,
														format: 'Y-m-d',
											            minValue: '2009-02-01'
												}
										]
									},{
										columnWidth: 0.33,
										layout: 'form',
										defaults : {width : config.width*0.15},
										labelWidth : config.width*0.07,
										items:[
												{
														fieldLabel: 'Compare To',
														xtype:"datefield",
														name: 'accountbalancedate',
														id: 'compater_balance_date',
														disabled : true,
														allowBlank:false,
														format: 'Y-m-d',
											            minValue: '2009-02-01'
												}
										]
									},{
										columnWidth: 0.33,
										layout: 'form',
										defaults : {width : config.width*0.15},
										labelWidth : config.width*0.07,
										items:[
												{
														fieldLabel: 'Compare Period',
														xtype:"datefield",
														name: 'accountbalancedate',
														id: 'period_balance_date',
														disabled : true,
														allowBlank:false,
														format: 'Y-m-d',
											            minValue: '2009-02-01'
												}
										]
									}
								]
							}
					]
				},
				{
							fieldLabel: '<b>Banlance sheet </b>',
							xtype:"textarea",
							name: 'accountbalancedate',
							id: 'header_balance_sheet',
							disabled : true,
							emptyText : 'Demo Company  Global'
					}
				,cashrecordsSummary
		  ],
		  buttons:[{
				text:"Clean All",
				handler : function () {
					Ext.getCmp('report_select_form').form.setValues( [
											{id:'s_contactname', value:''},
											{id:'s_contacttype', value:''},
											{id:'s_contactcity', value:''}]);
					
					//Ext.getCmp('contactsearch').loadRecords();
				}
			},{
				text:"Update",
				handler : function () {
					var searchconfig = {};
					searchconfig.contact_type = Ext.getCmp('s_contacttype').getValue();
					searchconfig.contact_name = Ext.getCmp('s_contactname').getValue();
					searchconfig.contact_city = Ext.getCmp('s_contactcity').getValue();
					
					Ext.getCmp('contactsearch').searchRecords(searchconfig);	
					
				}
			}]
	});
	
};


Ext.extend(BloneyReport.DocPanel, Ext.form.FormPanel, {
   handleActivate : function(tab){
			tab.doLayout();
	}
});




BloneyReport.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
    	var search = Ext.getCmp('search');
        if(!search.store.baseParams){
			search.store.baseParams = {};
		}
		BloneyReport.SearchField.superclass.initComponent.call(this);
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
        	var search = Ext.getCmp('search');
            search.store.baseParams[this.paramName] = '';
			search.store.removeAll();
			this.el.dom.value = '';
            this.triggers[0].hide();
            this.hasSearch = false;
			this.focus();
        }
    },

    onTrigger2Click : function(){
        var v = this.getRawValue();
        if(v.length < 1){
            this.onTrigger1Click();
            return;
        }
		if(v.length < 2){
			Ext.Msg.alert('Invalid Search', 'You must enter a minimum of 2 characters to search the Bloney Cashflow Report');
			return;
		}
		var search = Ext.getCmp('search');
		search.store.baseParams[this.paramName] = v;
        var o = {start: 0};
        search.store.reload({params:o});
        this.hasSearch = true;
        this.triggers[0].show();
		this.focus();
		Ext.getCmp('navigator').setActiveTab('search');
    }
});

BloneyReport.MainPanel = function(config){
	
	this.global_config  = config;
	  
	BloneyReport.MainPanel.superclass.constructor.call(this, {
        id:'report-body',
        region:'center',
        margins:'3 1 1 1',
        resizeTabs: true,
        minTabWidth: 135,
        tabWidth: 135,
        plugins: new Ext.ux.TabCloseMenu(),
        enableTabScroll: true,
        activeTab: 0,
        items:[ {
		    title: 'Home Page',
			iconCls : 'reports-icon',
		    layout:'column',
			html : "<p style = 'padding: 20px 0px 20px 60px;' class = 'reports_image'><font size='5' face='Verdana'><b>Bloney Reports - Home page</b></p>",
		    items: [{
		        columnWidth:.33,
				bodyStyle:'padding:20px 0 5px 5px',
				baseCls:'x-plain',
                items:[{
                    title: 'Performance Reports',
					//iconCls : 'document_upload_icon',
                    html: "<p><font size='3' face='Verdana'>Show how your business is performing based on revenue and expenses.</p>"
                }]
		    },{
		        columnWidth:.33,
				baseCls:'x-plain',
                bodyStyle:'padding:20px 0 5px 5px',
                items:[{
                    title: 'Cash Reports',
					//iconCls : 'document_send_icon',
                    html: "<p><font size='3' face='Verdana'>Show how your cash levels are changing.</p>"
                }]
		    },{
		        columnWidth:.33,
				baseCls:'x-plain',
                bodyStyle:'padding:20px 5px 5px 5px',
                items:[{
                    title: 'Position Reports',
					//iconCls : 'document_archived_icon',
                    html: "<p><font size='3' face='Verdana'>Show how your business is positioned based on assets, liabilities and equity.</p>"
                }]
		    }]
		}]
    });
};

Ext.extend(BloneyReport.MainPanel, Ext.TabPanel, {

	loadClass : function(link, cls, member){
        var id = 'Report_' + cls;
        var tab = this.getComponent(id);
        if(tab){
            this.setActiveTab(tab);
            if(member){
                tab.scrollToMember(member);
            }
        }else{
            //var autoLoad = {url: '/reports/show?link='+link};
            if(member){
                autoLoad.callback = function(){
                    Ext.getCmp(id).scrollToMember(member);
                }
            }
			var ps = cls.split('.');
			Ext.getCmp('report-body').global_config.id = id;
			Ext.getCmp('report-body').global_config.title = ps[ps.length-1];           
            var p = this.add(new BloneyReport.DocPanel(Ext.getCmp('report-body').global_config));
            this.setActiveTab(p);
        }
    }
});

BloneyReport.CollaborateWnd = function(config){
	
	Ext.apply(this, config);
	
	this.reportssharelist = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url: '/reports/reports_sharelist', method: 'GET'}),
		reader: new Ext.data.JsonReader({
				//id: 'id'
			}, [
				'contact_name'		
			]),
		remoteSort: false
	});
	this.reportssharelist.baseParams = {format : 'json'};
	this.reportssharelist.load();
	
	this.expertssharelist = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url: '/contacts', method: 'GET'}),
		reader: new Ext.data.JsonReader({
				//id: 'id'
			}, [
				'contact_name'		
			]),
		remoteSort: false
	});
	this.expertssharelist.baseParams = {format : 'json', 
										contact_type:'EXPERT',
										contact_name: '',
										contact_city: '',
										contact_country: '',
										fields : 'contact_name'};
	this.expertssharelist.load();
	
	this.comboExpertssharelist = new Ext.form.ComboBox({
							width : 180,
							store: this.expertssharelist,
							displayField:'contact_name',
							valueField: 'contact_name',
							hiddenName: 'contact_name',
							typeAhead: true,
							id:'cs_contact_name',
							mode: 'local',
							triggerAction: 'all',
							emptyText:'Expert Name...',
							selectOnFocus:true,
							allowBlank:true
					});
	this.comboExpertssharelist.on('select', this.onSelectET, this);
	
	this.postreporttree = new BloneyReport.ContentPanel({	id : 'postreporttree',
														height: (config.height - 145),
														border : true,
														bodyBorder : true,
														checked : true});
	this.postreporttree.on('click', this.onClick, this.postreporttree);
             
	this.postreporttreefrm = new Ext.FormPanel({
		frame:true,
		id : 'postreporttreefrm',
		title : 'Post Report Directory',	
		layout:'form',
		//height: (config.height - 95),
		autoHeight : true,	
		autoWidth : true,
		listeners: {activate: this.handleActivate},
		items:[{
				layout:'column',
				border:false,
				items:[
					{
						columnWidth: 0.4,
						layout: 'form',
						defaults: {width: 240}, 
						autoScroll : true,
						items:[
							this.postreporttree	
						]
					},{
						columnWidth: 0.6,
						layout: 'form',
						items:[
								{
									xtype:'fieldset',
									title: 'Report Details',
									autoHeight:true,
									collapsible: false,
									labelWidth : 80,
									defaults: {width: 260},
									items :[
											{
												xtype:"textfield",
												id:'ctext',
												fieldLabel:"Topic",
												name:"ctext",
												allowBlank:false
											},{
												xtype:"textarea",
												id:'cdescription',
												height : 100,
												fieldLabel:"Description",
												name:"cdescription",
												allowBlank:true
											},
											{
												xtype:"textarea",
												id:'ccontent',
												height : 140,
												fieldLabel:"Content",
												name:"ccontent",
												allowBlank:true
											}
									]								
								}
						]
					}
				]
			}
		  ],
		 bbar: ['->',this.comboExpertssharelist,'-',{
								text : 'Share with Expert',
								handler : function() {
									var selItems = Ext.getCmp('postreporttree').getChecked();
									var itemsList = "";
									for(var i = 0, n = selItems.length; i < n; i++) {
								     	itemsList = ((itemsList == "") ? "" : (itemsList + ",") ) + selItems[i].attributes.id								     	
								    }
								    if (itemsList != "" && Ext.getCmp('cs_contact_name').getValue() != "" )
								    {
								    	Ext.Ajax.request({
								    	   url: '/reports/postdirectory',
										   method : 'GET',
										   success: function(){
										   		Ext.Msg.alert('Post Reports Directory', 'Reports directory posted sucessfully');
										   },
										   failure: function(){
										   		Ext.Msg.alert('Post Reports Directory', 'Reports directory posted failed');
										   },
										   params: {items_list : itemsList,
										   			share : false,
										   			expert_name : Ext.getCmp('cs_contact_name').getValue()}
										});
								    }
								}
						},'-',{
								text : 'Publish Directory',
								handler : function() {
									var selItems = Ext.getCmp('postreporttree').getChecked();
									var itemsList = "";
									for(var i = 0, n = selItems.length; i < n; i++) {
								     	itemsList = ((itemsList == "") ? "" : (itemsList + ",") ) + selItems[i].attributes.id								     	
								    }
									if (itemsList != "")
								    {
									    Ext.Ajax.request({
									    	   url: '/reports/postdirectory',
											   method : 'GET',
											   success: function(){
											   		Ext.Msg.alert('Post Reports Directory', 'Reports directory posted sucessfully');
											   },
											   failure: function(){
											   		Ext.Msg.alert('Post Reports Directory', 'Reports directory posted failed');
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
									    	   url: '/reports/cleandirectory',
											   method : 'GET',
											   success: function(){
											   		Ext.Msg.alert('Clean Reports Directory', 'Reports directory cleaned sucessfully');
											   },
											   failure: function(){
											   		Ext.Msg.alert('Clean Reports Directory', 'Reports directory cleaned failed');
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
										    	   url: '/reports/cleandirectory',
												   method : 'GET',
												   success: function(){
												   		Ext.Msg.alert('Clean Reports Directory', 'Reports directory cleaned sucessfully');
												   },
												   failure: function(){
												   		Ext.Msg.alert('Clean Reports Directory', 'Reports directory cleaned failed');
												   },
												   params: { share_type : 'PUBLIC'}
												});
									        	
									        }
								        },{
									        text: 'Clean Contact Directory', 
									        handler: function() {
										        Ext.Ajax.request({
										    	   url: '/reports/cleandirectory',
												   method : 'GET',
												   success: function(){
												   		Ext.Msg.alert('Clean Reports Directory', 'Reports directory cleaned sucessfully');
												   },
												   failure: function(){
												   		Ext.Msg.alert('Clean Reports Directory', 'Reports directory cleaned failed');
												   },
												   params: { share_type : 'PRIVATE'}
												});
									        }
								        }
							        ]
							   	})
							})]
	});
	
	this.adoptreporttree_l = new BloneyReport.ContentPanel({	id : 'adoptreporttree_l',
														height: (config.height - 160),
														border : true,
														bodyBorder : true,
														checked : true});
	this.adoptreporttree_l.on('click', this.onClick, this.adoptreporttree_l);
	
	this.adoptreporttree = new BloneyReport.ContentPanel({	id : 'adoptreporttree',
														height: (config.height - 160),
														border : true,
														bodyBorder : true,
														checked : true});
	this.adoptreporttree.on('click', this.onClick, this.adoptreporttree);
	
	this.adoptreportsfrm = new Ext.FormPanel({
		frame:true,
		id : 'adoptreportfrm',
		title: 'Adopt Reports Directory',
		//height : 290,
		autoHeight : true,
		autoWidth : true,
		listeners: {activate: this.handleActivate},
		items:[
				{
					xtype:"hidden",
					id:'adoptreportsfrm_id'
				},{
					xtype:"combo",
					fieldLabel:"Comapnies list",
					width : 200,
					store: this.reportssharelist,
					displayField:'contact_name',
					valueField: 'contact_name',
					hiddenName: 'contact_nameId',
					typeAhead: true,
					id:'cs_contact_name',
					mode: 'local',
					triggerAction: 'all',
					emptyText:'Select a company ...',
					selectOnFocus:true,
					allowBlank:false
				},{xtype : 'hidden', id : 'filler'},{
				layout:'column',
				border:false,
				items:[
					{
						columnWidth: 0.5,
						layout: 'form',
						defaults: {width: 300}, 
						autoScroll : true,
						items:[
							this.adoptreporttree_l	
						]
					},{
						columnWidth: 0.5,
						layout: 'form',
						defaults: {width: 300}, 
						autoScroll : true,
						items:[
								this.adoptreporttree
						]
					}
				]
			}
		  ],
		  bbar:['->',{
				text:"Clean All",
				handler : function () {
					Ext.getCmp('adoptreportfrm').form.setValues( [ {id:'cs_contact_name', value:''}]);
        			
				}
			},'-',{
				text:"Adopt Reports Directory",
				handler : function () {
						var selItems = Ext.getCmp('adoptreportfrm').getSelectionModel().getSelections();
						var itemsList = "";
						for(var i = 0, n = selItems.length; i < n; i++) {
					     	itemsList = ((itemsList == "") ? "," : (itemsList + ",") ) + selItems[i].id
							itemsList += ((i == n-1) ? "," :  "");
					    }
						Ext.Ajax.request({
										   url: '/reports/adoptdirectory',
										   method : 'GET',
										   success: function(){
										   		Ext.Msg.alert('Post Reports Directory', 'Reports directory posted sucessfully');
										   },
										   failure: function(){
										   		Ext.Msg.alert('Post Reports Directory', 'Reports directory posted failed');
										   },
										   params: {contact_name : Ext.getCmp('cs_contact_name').getValue(),
										   			items_list : itemsList}
										});	
						
				}
			}]
	});
	
	this.collaboratetabs = new Ext.TabPanel({
				region: 'center',
				margins:'3 3 3 0',
				autoScroll:true,
				id: 'report_collaborate_tabs',
				items:[
					this.postreporttreefrm,
					this.adoptreportsfrm
				]
			});
	
	BloneyReport.CollaborateWnd.superclass.constructor.call(this, {
		title : 'Bloney Reports Collaborate',
		id: 'wndbloneyreportcollaborate',
		modal : true,
		width : config.width,
		height : config.height,
        items: [this.collaboratetabs],
		buttons: [{
				text: 'Close Report Collaborate Window',
				handler : function() {
					Ext.getCmp('wndbloneyreportcollaborate').close();
				}
			}]
		});
		
	this.postreporttree.expandAll();
	Ext.getCmp('cs_contact_name').on('select', this.onSelectCN, this);
	
};

Ext.extend(BloneyReport.CollaborateWnd, Ext.Window,{
	
	handleActivate : function(tab){
		tab.doLayout();		
	},
	
	onClick : function(node, e){
		e.preventDefault();
		Ext.getCmp('postreporttreefrm').form.setValues( [{id:'ctext', value:node.attributes.text},
									  {id:'cdescription', value:node.attributes.description},
									  {id:'ccontent', value: node.attributes.content}]);
	}
});

BloneyReport.MainWnd = function(config){
	
	Ext.apply(this, config);
	
	var content = new BloneyReport.ContentPanel({id:'report-tree',
        									   title : 'Content',
        									   checked : false});
    content.on('dblclick', function(node, e){
         if(node.isLeaf() && node.attributes.link){
            e.stopEvent();
            main.loadClass(node.attributes.link, node.attributes.text);
            //Ext.getCmp('wndbloneyreport').updateDetails(node);
         }
    });
    
	var main = new BloneyReport.MainPanel(config);
	main.on('tabchange', function(tp, tab){
        content.selectClass(tab.cclass); 
    });
    
	var search = new BloneyReport.SearchPanel();
	
	var navigator = new Ext.TabPanel({
			region: 'west',
			margins:'3 1 1 1',
			id: 'navigator',
	        activeTab: 0,
	        tabPosition : 'bottom',
	        width : 250,
	        autoScroll:true,
			items : [content,search]
		}
	);
	
	
	var head = new Ext.Panel({
        border: false,
        layout:'anchor',
        region:'north',
        cls: 'reports-header',
        height:27,
        items: [
       		new Ext.Toolbar({
            cls:'top-toolbar',
            items:[' ',
	            new Ext.Button({
	            	id : 'button-home',
	            	iconCls: 'icon-house_16',
	            	tooltip: 'Report Home Page',	
					text : 'Home Page',			   	
				   	handler: function(){ main.setActiveTab(0);  }
				}),
				'->',
				'Search: ', ' ',
                new Ext.ux.SelectBox({
                    listClass:'x-combo-list-small',
                    width:90,
                    value:'text',
                    id:'search-type-reports',
                    store: new Ext.data.SimpleStore({
                        fields: ['text'],
                        expandData: true,
                        data : ['text', 'description', 'content']
                    }),
                    displayField: 'text'
                }), ' ',
                new BloneyDocument.SearchField({
	                width:240,
					store: main.searchStore,
					paramName: 'q'
	            })
            ]
        })]
    });
    
	BloneyReport.MainWnd.superclass.constructor.call(this, {
		title : 'Bloney Report',
		id: 'wndbloneyreport',
		iconCls : 'reports-icon',
       	items: [head,main,navigator],
    	buttons : [
    		{
				text: 'Close Reports Window',
				handler : function() {
					Ext.getCmp('wndbloneyreport').close();
				}
			}
    	]
	});
	
	
	//Ext.getCmp('wndbloneyreport').doLayout();
};

Ext.extend(BloneyReport.MainWnd, Ext.Window,{
	
});





// ---------------------------------
// Bloney Document
// ---------------------------------
BloneyDocument = {};

BloneyDocument.SearchPanel = function(config){
	Ext.apply(this, config);
	
	this.searchStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/documents/search'
        }),
        reader: new Ext.data.JsonReader({
	           root: 'data'
	        },
			['text', 'leaf', 'description', 'content', 'link']
		),
		baseParams:{format:'json'},
        listeners: {
            'beforeload' : function(){
                this.baseParams.qt = Ext.getCmp('search-type').getValue();
            }
        }
    });
    
	 var resultTpl = new Ext.XTemplate(
	        '<tpl for=".">',
	        '<div class="search-item">',
	            '<a class="cls" ext:cls="{text}" ext:link="{link}" href="{link}">{text}</a>',
	            '<p>{description}</p>',
	        '</div></tpl>'
	    );
		
	    
		BloneyDocument.SearchPanel.superclass.constructor.call(this,{
            id : 'search',
			tpl: resultTpl,
			title : 'Search',
			loadingText:'Searching...',
            store: this.searchStore,
            itemSelector: 'div.search-item',
			emptyText: '<h3>Use the search field above to search the Bloney Cashflow document topics.</h3>'
        });
    
        this.on('click', this.onClick,this);
};

Ext.extend(BloneyDocument.SearchPanel, Ext.DataView,{

	 onClick: function(e, target){
        if(target = e.getTarget('a:not(.exi)', 3)){
            var cls = Ext.fly(target).getAttributeNS('ext', 'cls');
            var main = Ext.getCmp('document-body');
            e.stopEvent();
            if(cls){
                var link = Ext.fly(target).getAttributeNS('ext', 'link');
                main.loadClass(link, cls);
            }else if(target.className == 'inner-link'){
                main.getActiveTab().scrollToSection(target.href.split('#')[1]);
            }else{
                window.open(target.href);
            }
        }else if(target = e.getTarget('.micon', 2)){
            e.stopEvent();
            var tr = Ext.fly(target.parentNode);
            if(tr.hasClass('expandable')){
                tr.toggleClass('expanded');
            }
        }
    },
    
    doSearch : function(e){
		var k = e.getKey();
		if(!e.isSpecialKey()){
			var text = e.target.value;
			if(!text){
				this.searchStore.baseParams.q = '';
				this.searchStore.removeAll();
			}else{
				this.searchStore.baseParams.q = text;
				this.searchStore.reload();
			}
		}
	}

});

BloneyDocument.DocPanel = Ext.extend(Ext.Panel, {
    closable: true,
    autoScroll:true,

    initComponent : function(){
        var ps = this.cclass.split('.');
        this.title = ps[ps.length-1];

        BloneyDocument.DocPanel.superclass.initComponent.call(this);
    },

    scrollToMember : function(member){
        var el = Ext.fly(this.cclass + '-' + member);
        if(el){
            var top = (el.getOffsetsTo(this.body)[1]) + this.body.dom.scrollTop;
            this.body.scrollTo('top', top-25, {duration:.75, callback: this.hlMember.createDelegate(this, [member])});
        }
    },

	scrollToSection : function(id){
		var el = Ext.getDom(id);
		if(el){
			var top = (Ext.fly(el).getOffsetsTo(this.body)[1]) + this.body.dom.scrollTop;
			this.body.scrollTo('top', top-25, {duration:.5, callback: function(){
                Ext.fly(el).next('h2').pause(.2).highlight('#8DB2E3', {attr:'color'});
            }});
        }
	},

    hlMember : function(member){
        var el = Ext.fly(this.cclass + '-' + member);
        if(el){
            el.up('tr').highlight('#cadaf9');
        }
    }
});

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


BloneyDocument.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
    	var search = Ext.getCmp('search');
        if(!search.store.baseParams){
			search.store.baseParams = {};
		}
		BloneyDocument.SearchField.superclass.initComponent.call(this);
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
        	var search = Ext.getCmp('search');
            search.store.baseParams[this.paramName] = '';
			search.store.removeAll();
			this.el.dom.value = '';
            this.triggers[0].hide();
            this.hasSearch = false;
			this.focus();
        }
    },

    onTrigger2Click : function(){
        var v = this.getRawValue();
        if(v.length < 1){
            this.onTrigger1Click();
            return;
        }
		if(v.length < 2){
			Ext.Msg.alert('Invalid Search', 'You must enter a minimum of 2 characters to search the Bloney Cashflow Document');
			return;
		}
		var search = Ext.getCmp('search');
		search.store.baseParams[this.paramName] = v;
        var o = {start: 0};
        search.store.reload({params:o});
        this.hasSearch = true;
        this.triggers[0].show();
		this.focus();
		Ext.getCmp('navigator').setActiveTab('search');
    }
});

BloneyDocument.MainPanel = function(){
	
	BloneyDocument.MainPanel.superclass.constructor.call(this, {
        id:'document-body',
        region:'center',
        margins:'3 1 1 1',
        resizeTabs: true,
        minTabWidth: 135,
        tabWidth: 135,
        plugins: new Ext.ux.TabCloseMenu(),
        enableTabScroll: true,
        activeTab: 0,
        items: [{
		    title: 'Home Page',
			iconCls : 'document-icon',
		    layout:'column',
			html : "<p style = 'padding: 20px 0px 20px 60px;' class = 'documents_image'><font size='5' face='Verdana'><b>Bloney Documents - Home page</b></p>",
		    items: [{
		        columnWidth:.33,
				bodyStyle:'padding:20px 0 5px 5px',
				baseCls:'x-plain',
                items:[{
                    title: 'Uploaded Documents',
					//iconCls : 'document_upload_icon',
                    html: "<p><font size='3' face='Verdana'>Bloney Docuemnts allows you to upload any type of document into you private space for the future usage.</p>"
                }]
		    },{
		        columnWidth:.33,
				baseCls:'x-plain',
                bodyStyle:'padding:20px 0 5px 5px',
                items:[{
                    title: 'Send Documents',
					//iconCls : 'document_send_icon',
                    html: "<p><font size='3' face='Verdana'>Bloney Docuemtns folows up the document exchange and checks the currents status of the ducments</p>"
                }]
		    },{
		        columnWidth:.33,
				baseCls:'x-plain',
                bodyStyle:'padding:20px 5px 5px 5px',
                items:[{
                    title: 'Archived Documents',
					//iconCls : 'document_archived_icon',
                    html: "<p><font size='3' face='Verdana'>Bloney Documents aloows toy to archive the documents which are currently not in use.</p>"
                }]
		    }]
		}]
    });
};

Ext.extend(BloneyDocument.MainPanel, Ext.TabPanel, {

	loadClass : function(link, cls, member){
        var id = 'Document_' + cls;
        var tab = this.getComponent(id);
        if(tab){
            this.setActiveTab(tab);
            if(member){
                tab.scrollToMember(member);
            }
        }else{
            var autoLoad = {url: "C:/workspace/myhomeagent/db/upload/documents/comet_config.txt"};
            if(member){
                autoLoad.callback = function(){
                    Ext.getCmp(id).scrollToMember(member);
                }
            }
            var p = this.add(new BloneyDocument.DocPanel({
                id: id,
                cclass : cls,
                autoLoad: autoLoad
            }));
            this.setActiveTab(p);
        }
    }
});



BloneyDocument.MainWnd = function(config){
	
	Ext.apply(this, config);
	
	   
	var main = new BloneyDocument.MainPanel();
	main.on('tabchange', function(tp, tab){
        //content.selectClass(tab.cclass); 
    });
    
	

	var fileList  = new Ext.ux.FileTreePanel({
		autoWidth:true
		,id:'ftp'
		,title:'Documents'
		//,renderTo:'treepanel'
		,rootPath:'root'
		,topMenu:true
		,autoScroll:true
		,enableProgress:false
		,deleteUrl : tx.data.documents_con.destroy_remote_url
		,renameUrl: tx.data.documents_con.update_remote_url
		,newdirUrl: tx.data.documents_con.create_remote_url
//		,baseParams:{additional:'haha'}
//		,singleUpload:true
	});
	
	 fileList.on('dblclick', function(node, e){
         if(node.isLeaf() && node.attributes.link){
            e.stopEvent();
            main.loadClass(node.attributes.link, node.attributes.text);
            Ext.getCmp('wndbloneydocument').updateDetails(node);
         }
    });
	
	var search = new BloneyDocument.SearchPanel();
	
	var navigator = new Ext.TabPanel({
			region: 'west',
			margins:'3 1 1 1',
			id: 'navigator',
	        activeTab: 0,
	        tabPosition : 'bottom',
	        width : 250,
	        autoScroll:true,
			items : [fileList, search]
		}
	);
	
    var head = new Ext.Panel({
        border: false,
        layout:'anchor',
        region:'north',
        cls: 'docs-header',
        height:27,
        items: [
       		new Ext.Toolbar({
            cls:'top-toolbar',
            items:[' ',
	            new Ext.Button({
	            	id : 'button-home',
	            	iconCls: 'icon-house_16',
	            	tooltip: 'Document Home Page',	
					text : 'Home Page',			   	
				   	handler: function(){ main.setActiveTab(0);  }
				}),
				'->',
				'Search: ', ' ',
                new Ext.ux.SelectBox({
                    listClass:'x-combo-list-small',
                    width:90,
                    value:'text',
                    id:'search-type',
                    store: new Ext.data.SimpleStore({
                        fields: ['text'],
                        expandData: true,
                        data : ['text', 'description', 'content']
                    }),
                    displayField: 'text'
                }), ' ',
                new BloneyDocument.SearchField({
	                width:240,
					store: main.searchStore,
					paramName: 'q'
	            })
            ]
        })]
    });

	BloneyDocument.MainWnd.superclass.constructor.call(this, {
		title : 'Bloney Document',
		id: 'wndbloneydocument',
		iconCls : 'document-icon',
       	items: [head,main,navigator],
    	buttons : [
    		{
				text: 'Close Documents Window',
				handler : function() {
					Ext.getCmp('wndbloneydocument').close();
				}
			}
    	]
	});
	
	//Ext.getCmp('wndbloneydocument').doLayout();
};

Ext.extend(BloneyDocument.MainWnd, Ext.Window,{
	
	
});
// ---------------------------------
// Bloney Adviser
// ---------------------------------
BloneyAdviser = {};

BloneyAdviser.SearchPanel = function(config){
	Ext.apply(this, config);
	
	this.searchStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '/advisers/search'
        }),
        reader: new Ext.data.JsonReader({
	           root: 'data'
	        },
			['text', 'leaf', 'description', 'content', 'link']
		),
		baseParams:{format:'json'},
        listeners: {
            'beforeload' : function(){
                this.baseParams.qt = Ext.getCmp('search-type').getValue();
            }
        }
    });
    
	 var resultTpl = new Ext.XTemplate(
	        '<tpl for=".">',
	        '<div class="search-item">',
	            '<a class="cls" ext:cls="{text}" ext:link="{link}" href="{link}">{text}</a>',
	            '<p>{description}</p>',
	        '</div></tpl>'
	    );
		
	    
		BloneyAdviser.SearchPanel.superclass.constructor.call(this,{
            id : 'search',
			tpl: resultTpl,
			title : 'Search',
			loadingText:'Searching...',
            store: this.searchStore,
            itemSelector: 'div.search-item',
			emptyText: '<h3>Use the search field above to search the Bloney Cashflow document topics.</h3>'
        });
    
        this.on('click', this.onClick,this);
};

Ext.extend(BloneyAdviser.SearchPanel, Ext.DataView,{

	 onClick: function(e, target){
        if(target = e.getTarget('a:not(.exi)', 3)){
            var cls = Ext.fly(target).getAttributeNS('ext', 'cls');
            var main = Ext.getCmp('document-body');
            e.stopEvent();
            if(cls){
                var link = Ext.fly(target).getAttributeNS('ext', 'link');
                main.loadClass(link, cls);
            }else if(target.className == 'inner-link'){
                main.getActiveTab().scrollToSection(target.href.split('#')[1]);
            }else{
                window.open(target.href);
            }
        }else if(target = e.getTarget('.micon', 2)){
            e.stopEvent();
            var tr = Ext.fly(target.parentNode);
            if(tr.hasClass('expandable')){
                tr.toggleClass('expanded');
            }
        }
    },
    
    doSearch : function(e){
		var k = e.getKey();
		if(!e.isSpecialKey()){
			var text = e.target.value;
			if(!text){
				this.searchStore.baseParams.q = '';
				this.searchStore.removeAll();
			}else{
				this.searchStore.baseParams.q = text;
				this.searchStore.reload();
			}
		}
	}

});

BloneyAdviser.DocPanel = Ext.extend(Ext.Panel, {
    closable: true,
    autoScroll:true,

    initComponent : function(){
        var ps = this.cclass.split('.');
        this.title = ps[ps.length-1];

        BloneyAdviser.DocPanel.superclass.initComponent.call(this);
    },

    scrollToMember : function(member){
        var el = Ext.fly(this.cclass + '-' + member);
        if(el){
            var top = (el.getOffsetsTo(this.body)[1]) + this.body.dom.scrollTop;
            this.body.scrollTo('top', top-25, {duration:.75, callback: this.hlMember.createDelegate(this, [member])});
        }
    },

	scrollToSection : function(id){
		var el = Ext.getDom(id);
		if(el){
			var top = (Ext.fly(el).getOffsetsTo(this.body)[1]) + this.body.dom.scrollTop;
			this.body.scrollTo('top', top-25, {duration:.5, callback: function(){
                Ext.fly(el).next('h2').pause(.2).highlight('#8DB2E3', {attr:'color'});
            }});
        }
	},

    hlMember : function(member){
        var el = Ext.fly(this.cclass + '-' + member);
        if(el){
            el.up('tr').highlight('#cadaf9');
        }
    }
});

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


BloneyAdviser.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function(){
    	var search = Ext.getCmp('search');
        if(!search.store.baseParams){
			search.store.baseParams = {};
		}
		BloneyAdviser.SearchField.superclass.initComponent.call(this);
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
        	var search = Ext.getCmp('search');
            search.store.baseParams[this.paramName] = '';
			search.store.removeAll();
			this.el.dom.value = '';
            this.triggers[0].hide();
            this.hasSearch = false;
			this.focus();
        }
    },

    onTrigger2Click : function(){
        var v = this.getRawValue();
        if(v.length < 1){
            this.onTrigger1Click();
            return;
        }
		if(v.length < 2){
			Ext.Msg.alert('Invalid Search', 'You must enter a minimum of 2 characters to search the Bloney Cashflow Adviser');
			return;
		}
		var search = Ext.getCmp('search');
		search.store.baseParams[this.paramName] = v;
        var o = {start: 0};
        search.store.reload({params:o});
        this.hasSearch = true;
        this.triggers[0].show();
		this.focus();
		Ext.getCmp('navigator').setActiveTab('search');
    }
});

BloneyAdviser.MainPanel = function(){
	
	BloneyAdviser.MainPanel.superclass.constructor.call(this, {
        id:'document-body',
        region:'center',
        margins:'3 1 1 1',
        resizeTabs: true,
        minTabWidth: 135,
        tabWidth: 135,
        plugins: new Ext.ux.TabCloseMenu(),
        enableTabScroll: true,
        activeTab: 0,
        items: [{
		    title: 'Home Page',
			iconCls : 'document-icon',
		    layout:'column',
			html : "<p style = 'padding: 20px 0px 20px 60px;' class = 'advisers_image'><font size='5' face='Verdana'><b>Bloney Advisers - Home page</b></p>",
		    items: [{
		        columnWidth:.33,
				bodyStyle:'padding:20px 0 5px 5px',
				baseCls:'x-plain',
                items:[{
                    title: 'Uploaded Advisers',
					//iconCls : 'document_upload_icon',
                    html: "<p><font size='3' face='Verdana'>Bloney Docuemnts allows you to upload any type of document into you private space for the future usage.</p>"
                }]
		    },{
		        columnWidth:.33,
				baseCls:'x-plain',
                bodyStyle:'padding:20px 0 5px 5px',
                items:[{
                    title: 'Send Advisers',
					//iconCls : 'document_send_icon',
                    html: "<p><font size='3' face='Verdana'>Bloney Docuemtns folows up the document exchange and checks the currents status of the ducments</p>"
                }]
		    },{
		        columnWidth:.33,
				baseCls:'x-plain',
                bodyStyle:'padding:20px 5px 5px 5px',
                items:[{
                    title: 'Archived Advisers',
					//iconCls : 'document_archived_icon',
                    html: "<p><font size='3' face='Verdana'>Bloney Advisers aloows toy to archive the advisers which are currently not in use.</p>"
                }]
		    }]
		}]
    });
};

Ext.extend(BloneyAdviser.MainPanel, Ext.TabPanel, {

	loadClass : function(link, cls, member){
        var id = 'Adviser_' + cls;
        var tab = this.getComponent(id);
        if(tab){
            this.setActiveTab(tab);
            if(member){
                tab.scrollToMember(member);
            }
        }else{
            var autoLoad = {url: '/advisers/show?link='+link};
            if(member){
                autoLoad.callback = function(){
                    Ext.getCmp(id).scrollToMember(member);
                }
            }
            var p = this.add(new BloneyAdviser.DocPanel({
                id: id,
                cclass : cls,
                autoLoad: autoLoad
            }));
            this.setActiveTab(p);
        }
    }
});



BloneyAdviser.MainWnd = function(config){
	
	Ext.apply(this, config);
	
	   
	var main = new BloneyAdviser.MainPanel();
	main.on('tabchange', function(tp, tab){
        //content.selectClass(tab.cclass); 
    });
    
	

	var fileList  = new Ext.ux.FileTreePanel({
		autoWidth:true
		,id:'ftp'
		,title:'Advisers'
		//,renderTo:'treepanel'
		,rootPath:'root'
		,topMenu:true
		,autoScroll:true
		,enableProgress:false
		,deleteUrl : tx.data.advisers_con.destroy_remote_url
		,renameUrl: tx.data.advisers_con.update_remote_url
		,newdirUrl: tx.data.advisers_con.create_remote_url
//		,baseParams:{additional:'haha'}
//		,singleUpload:true
	});
	
	 fileList.on('dblclick', function(node, e){
         if(node.isLeaf() && node.attributes.link){
            e.stopEvent();
            main.loadClass(node.attributes.link, node.attributes.text);
            Ext.getCmp('wndbloneydocument').updateDetails(node);
         }
    });
	
	var search = new BloneyAdviser.SearchPanel();
	
	var navigator = new Ext.TabPanel({
			region: 'west',
			margins:'3 1 1 1',
			id: 'navigator',
	        activeTab: 0,
	        tabPosition : 'bottom',
	        width : 250,
	        autoScroll:true,
			items : [fileList, search]
		}
	);
	
    var head = new Ext.Panel({
        border: false,
        layout:'anchor',
        region:'north',
        cls: 'docs-header',
        height:27,
        items: [
       		new Ext.Toolbar({
            cls:'top-toolbar',
            items:[' ',
	            new Ext.Button({
	            	id : 'button-home',
	            	iconCls: 'icon-house_16',
	            	tooltip: 'Adviser Home Page',	
					text : 'Home Page',			   	
				   	handler: function(){ main.setActiveTab(0);  }
				}),
				'->',
				'Search: ', ' ',
                new Ext.ux.SelectBox({
                    listClass:'x-combo-list-small',
                    width:90,
                    value:'text',
                    id:'search-type',
                    store: new Ext.data.SimpleStore({
                        fields: ['text'],
                        expandData: true,
                        data : ['text', 'description', 'content']
                    }),
                    displayField: 'text'
                }), ' ',
                new BloneyAdviser.SearchField({
	                width:240,
					store: main.searchStore,
					paramName: 'q'
	            })
            ]
        })]
    });

	BloneyAdviser.MainWnd.superclass.constructor.call(this, {
		title : 'Bloney Adviser',
		id: 'wndbloneydocument',
		iconCls : 'document-icon',
       	items: [head,main,navigator],
    	buttons : [
    		{
				text: 'Close Advisers Window',
				handler : function() {
					Ext.getCmp('wndbloneydocument').close();
				}
			}
    	]
	});
	
	//Ext.getCmp('wndbloneydocument').doLayout();
};

Ext.extend(BloneyAdviser.MainWnd, Ext.Window,{
	
	
});


// ---------------------------------
// Bloney Toolbar main
// ---------------------------------
BloneyToolbar = function(config){
	
	Ext.apply(this, config);
	this.global_config = config;
	
	BloneyToolbar.superclass.constructor.call(this,{
							region:'north',
							id:'bloneytoolbar',
							height:28
							});


};

Ext.extend(BloneyToolbar, Ext.Toolbar,{

	renderToolbar: function(){
		
		var toolbarconfig = Ext.getCmp('bloneytoolbar').global_config.winconfig;
		
		this.add({
			xtype:'splitbutton',
			iconCls:'bloney-icon',
			text: 'Bloney Cashflow',
			enableToggle: false,
			pressed: false,
			handler : function(){
										var bloneyPeopleWin = (Ext.getCmp('wndbloneypeople') != null) ? Ext.getCmp('wndbloneypeople') : new BloneyPeople.MainWnd(toolbarconfig);	
										Ext.getCmp('people_tabs').setActiveTab('companies');
										bloneyPeopleWin.show();
									},
			menu:{
					id:'bloney-menu',
					items: [
							{
								text: 'About',
								iconCls : 'icon-about-todo',
								handler : this.bloneySplash
							},{
								text: 'Exit',
								iconCls: 'icon-exit',
								handler : function(){
										Ext.getCmp('bloney-win').close();
										if(Ext.getCmp('wndcashrecords'))
											Ext.getCmp('wndcashrecords').close();
									}
							}]
			}
		});

		this.addFill();
		this.addSpacer();
		this.add({
				xtype:'button',
				iconCls:'contacts-icon',
				text: 'Contacts',
				enableToggle: false,
				pressed: false,
				id:'contact-menu',
				width:200,
				handler : function(){
										var bloneyContactsWin = (Ext.getCmp('wndbloneycontact') != null) ? Ext.getCmp('wndbloneycontact') : new BloneyContact.MainWnd(toolbarconfig);	
										Ext.getCmp('contact_tabs').setActiveTab('my_contacts');
										bloneyContactsWin.show();
									}
		});
		
		this.addSpacer();
		this.addSeparator(); 
		this.add({
				xtype:'button',
				iconCls:'accounts-icon',
				text: 'Accounts',
				enableToggle: false,
				pressed: false,
				id:'accounts-menu',
				width : 200,
				handler : function(){
										var bloneyAccountWin = (Ext.getCmp('wndbloneyaccount') != null) ? Ext.getCmp('wndbloneycontact') : new BloneyAccount.MainWnd(toolbarconfig);
										Ext.getCmp('accounts_tabs').setActiveTab('accounts_form');
										bloneyAccountWin.show();
									}
		});
		this.addSpacer();
		this.addSeparator();
		this.add({
					xtype:'splitbutton',
					iconCls:'reports-icon',
					text: 'Reports',
					enableToggle: false,
					pressed: false,
					id:'reports',
					handler : function(){
											var bloneyReportsWin = (Ext.getCmp('wndbloneyreports') != null) ? Ext.getCmp('wndbloneyreports') : new BloneyReport.MainWnd(toolbarconfig);	
											bloneyReportsWin.show();
										},
					width : 200,
					menu:{
						id:'reports-menu',
						items: [
								{
									text: 'All Reports',
									handler : function(){
											var bloneyReportsWin = (Ext.getCmp('wndbloneyreports') != null) ? Ext.getCmp('wndbloneyreports') : new BloneyReport.MainWnd(toolbarconfig);	
											bloneyReportsWin.show();
										}
								},{
									text: 'Balance Sheet',
									handler : function(){
											var bloneyReportsWin = (Ext.getCmp('wndbloneyreports') != null) ? Ext.getCmp('wndbloneyreports') : new BloneyReport.MainWnd(toolbarconfig);	
											bloneyReportsWin.show();
										}
								},{
									text: 'Cash Summary',
									handler : function(){
											var bloneyReportsWin = (Ext.getCmp('wndbloneyreports') != null) ? Ext.getCmp('wndbloneyreports') : new BloneyReport.MainWnd(toolbarconfig);	
											bloneyReportsWin.show();
										}
								},{
									text: 'Profit and Loss',
									handler : function(){
											var bloneyReportsWin = (Ext.getCmp('wndbloneyreports') != null) ? Ext.getCmp('wndbloneyreports') : new BloneyReport.MainWnd(toolbarconfig);	
											bloneyReportsWin.show();
										}
								}]
			}
		});	
		this.addSpacer();
		this.addSeparator();
		this.add({
					xtype:'button',
					iconCls:'document-icon',
					text: 'Documents',
					id:'documents',
					enableToggle: false,
					pressed: false,
					width : 200,
					handler : function() {
							var bloneyDocumentWin = (Ext.getCmp('wndbloneydocument') != null) ? Ext.getCmp('wndbloneydocument') : new BloneyDocument.MainWnd(toolbarconfig);	
							bloneyDocumentWin.show();
					}/*
,
					menu:{
						id:'documents-menu',
						items: [
								{
									text: 'Upload document',
									handler : function(){
											var bloneyDocumentWin = (Ext.getCmp('wndbloneydocument') != null) ? Ext.getCmp('wndbloneydocument') : new BloneyDocument.MainWnd(toolbarconfig);	
											//Ext.getCmp('document_tabs').setActiveTab('upload_doc');
											bloneyDocumentWin.show();
										}
								},{
									text: 'View existing',
									handler : function(){
											var bloneyDocumentWin = (Ext.getCmp('wndbloneydocuments') != null) ? Ext.getCmp('wndbloneydocuments') : new BloneyDocument.MainWnd(toolbarconfig);	
											//Ext.getCmp('document_tabs').setActiveTab('upload_doc');
											bloneyDocumentWin.show();
										}
								},{
									text: 'Download document',
									handler : function(){
											var bloneyDocumentWin = (Ext.getCmp('wndbloneydocuments') != null) ? Ext.getCmp('wndbloneydocuments') : new BloneyDocument.MainWnd(toolbarconfig);	
											//Ext.getCmp('document_tabs').setActiveTab('upload_doc');
											bloneyDocumentWin.show();
										}
								}]
			}
*/
		});
		
		this.addSpacer();
		/*
this.addSeparator();
		this.add({
					xtype:'splitbutton',
					iconCls:'advisor-icon',
					text: 'Adviser',
					id:'adviser-menu',
					enableToggle: false,
					pressed: false,
					width : 200,
					menu:{
						id:'adviser-menu',
						items: [
								{
									text: 'Budget Manager',
									handler : function(){
											var bloneyAdviserWin = (Ext.getCmp('wndbloneyadvisers') != null) ? Ext.getCmp('wndbloneyadvisers') : new BloneyAdviser.MainWnd(toolbarconfig);	
											Ext.getCmp('adviser_tabs').setActiveTab('all_adviser');
											bloneyAdviserWin.show();
										}
								},{
									text: 'Strategies',
									iconCls : 'strategy-icon',
									handler : function(){
											var bloneyAdviserWin = (Ext.getCmp('wndbloneyadvisers') != null) ? Ext.getCmp('wndbloneyadvisers') : new BloneyAdviser.MainWnd(toolbarconfig);	
											Ext.getCmp('adviser_tabs').setActiveTab('all_adviser');
											bloneyAdviserWin.show();
										}
								},{
									text: 'Savings',
									handler : function(){
											var bloneyAdviserWin = (Ext.getCmp('wndbloneyadvisers') != null) ? Ext.getCmp('wndbloneyadvisers') : new BloneyAdviser.MainWnd(toolbarconfig);	
											Ext.getCmp('adviser_tabs').setActiveTab('all_adviser');
											bloneyAdviserWin.show();
										}
								}]
			}
		});
*/

		this.addSpacer();
		this.addSpacer();
		this.addSpacer();
		this.addSpacer();
		

	},

	bloneySplash : function(){
		var bloneySpalshWin;
		if(!bloneySpalshWin) 
		{
			bloneySpalshWin = new BloneySplash.MainWnd();	
		}
		bloneySpalshWin.show();
	}
,

	bloneyReport : function(){
		var bloneyReportWin = new BloneyReport.MainWnd(toolbarconfig);
		bloneyReportWin.show();
	}

});