/**
 * @author Administrator
 */
/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

tx = {data:{},ui:{}};

tx.data.homeagent_url = "http://localhost:3000"

// Grab a SQL connection instance
tx.data.authorize_con = {login_url: tx.data.homeagent_url + "/authorize/login"}; 

tx.data.tasks_con = {url: tx.data.homeagent_url + "/tasks/index_remote"}; 

tx.data.tasklists_con = {url: tx.data.homeagent_url + "/tasklists/index_remote",
	update_remote_url :  tx.data.homeagent_url + "/tasklists/update_remote",
	destroy_remote_url :  tx.data.homeagent_url + "/tasklists/destroy_remote",
	create_remote_url :  tx.data.homeagent_url + "/tasklists/create_remote",
	graphics_url: tx.data.homeagent_url + "/tasklists/graphics"}; 

tx.data.notes_con = {url: tx.data.homeagent_url + "/notes/index_remote",
	update_remote_url :  tx.data.homeagent_url + "/notes/update_remote",
	destroy_remote_url :  tx.data.homeagent_url + "/notes/destroy_remote",
	create_remote_url :  tx.data.homeagent_url + "/notes/create_remote"}; 

tx.data.collaborates_con = {
	url: tx.data.homeagent_url + "/collaborates/index_remote",
	update_remote_url :  tx.data.homeagent_url + "/collaborates/update_remote",
	destroy_remote_url :  tx.data.homeagent_url + "/collaborates/destroy_remote",
	create_remote_url :  tx.data.homeagent_url + "/collaborates/create_remote"
}; 

tx.data.cashrecords_con = {url: tx.data.homeagent_url + "/cashrecords/index_remote",
	update_remote_url :  tx.data.homeagent_url + "/cashrecords/update_remote",
	destroy_remote_url :  tx.data.homeagent_url + "/cashrecords/destroy_remote",
	create_remote_url :  tx.data.homeagent_url + "/cashrecords/create_remote",
	postdirectory_remote_url :  tx.data.homeagent_url + "/cashrecords/postdirectory",
	adoptdirectory_remote_url :  tx.data.homeagent_url + "/cashrecords/adoptdirectory",
	cleandirectory_remote_url :  tx.data.homeagent_url + "/cashrecords/cleandirectory",
	cashrecords_sharelist_remote_url :  tx.data.homeagent_url + "/cashrecords/cashrecords_sharelist"}; 

tx.data.contacts_con = {url: tx.data.homeagent_url + "/contacts/index_remote",
	update_remote_url :  tx.data.homeagent_url + "/contacts/update_remote",
	destroy_remote_url :  tx.data.homeagent_url + "/contacts/destroy_remote",
	create_remote_url :  tx.data.homeagent_url + "/contacts/create_remote",
	postdirectory_remote_url :  tx.data.homeagent_url + "/contacts/postdirectory",
	adoptdirectory_remote_url :  tx.data.homeagent_url + "/contacts/adoptdirectory",
	cleandirectory_remote_url :  tx.data.homeagent_url + "/contacts/cleandirectory",
	contacts_sharelist_remote_url :  tx.data.homeagent_url + "/contacts/contacts_sharelist"}; 

tx.data.accounts_con = {url: tx.data.homeagent_url + "/accounts/index_remote",
	update_remote_url :  tx.data.homeagent_url + "/accounts/update_remote",
	destroy_remote_url :  tx.data.homeagent_url + "/accounts/destroy_remote",
	create_remote_url :  tx.data.homeagent_url + "/accounts/create_remote",
	postdirectory_remote_url :  tx.data.homeagent_url + "/accounts/postdirectory",
	adoptdirectory_remote_url :  tx.data.homeagent_url + "/accounts/adoptdirectory",
	cleandirectory_remote_url :  tx.data.homeagent_url + "/accounts/cleandirectory",
	accounts_sharelist_remote_url :  tx.data.homeagent_url + "/accounts/accounts_sharelist"}; 

tx.data.banks_con = {url: tx.data.homeagent_url + "/banks/index_remote",
	update_remote_url :  tx.data.homeagent_url + "/banks/update_remote",
	destroy_remote_url :  tx.data.homeagent_url + "/banks/destroy_remote",
	create_remote_url :  tx.data.homeagent_url + "/banks/create_remote",
	postdirectory_remote_url :  tx.data.homeagent_url + "/banks/postdirectory",
	adoptdirectory_remote_url :  tx.data.homeagent_url + "/banks/adoptdirectory",
	cleandirectory_remote_url :  tx.data.homeagent_url + "/banks/cleandirectory",
	banks_sharelist_remote_url :  tx.data.homeagent_url + "/banks/banks_sharelist"};  

tx.data.documents_con = {url: tx.data.homeagent_url + "/documents/index_remote",
	update_remote_url :  tx.data.homeagent_url + "/documents/update_remote",
	destroy_remote_url :  tx.data.homeagent_url + "/documents/destroy_remote",
	create_remote_url :  tx.data.homeagent_url + "/documents/create_remote",
	postdirectory_remote_url :  tx.data.homeagent_url + "/documents/postdirectory",
	adoptdirectory_remote_url :  tx.data.homeagent_url + "/documents/adoptdirectory",
	cleandirectory_remote_url :  tx.data.homeagent_url + "/documents/cleandirectory",
	documents_sharelist_remote_url :  tx.data.homeagent_url + "/documents/documents_sharelist",
	documents_upload_url :   tx.data.homeagent_url + "/documents/upload_remote"};  
	
	
// Unique task ids, if the time isn't unique enough, the addition 
// of random chars should be
Ext.uniqueId = function(){
	var t = String(new Date().getTime()).substr(4);
	var s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for(var i = 0; i < 4; i++){
		t += s.charAt(Math.floor(Math.random()*26));
	}
	return t;
}

/*
 * ****************************************** STAGE 1 *****************************************************
 */ 

// Define the Task data type - stored in Task
tx.data.Task = Ext.data.Record.create([
    {name: 'taskId', type:'string'},
    {name: 'listId', type:'string'},
    {name: 'title', type:'string'},
    {name: 'description', type:'string'},
    {name: 'dueDate', type:'date', dateFormat: "d-m-Y H:i:s"},
    {name: 'completed', type:'boolean'},
    {name: 'completedDate', type:'date', dateFormat: "d-m-Y H:i:s"},
    {name: 'reminder', type:'date', dateFormat: "d-m-Y H:i:s"}
]);

// Define the List data type - stored in Tasklist
tx.data.List = Ext.data.Record.create([
    {name: 'listId', type:'string'},
	{name: 'user_id', type:'string'},
    {name: 'parentId', type:'string'},
    {name: 'listName', type:'string'},
	{name: 'listType', type:'string'},
	{name: 'description', type:'string'},
    {name: 'isFolder', type:'boolean'}
]);

// Define the Note data type - stored in Note
tx.data.Note = Ext.data.Record.create([
    {name: 'noteId', type:'string'},
	{name: 'user_id', type:'string'},
    {name: 'title', type:'string'},
    {name: 'note', type:'string'},
    {name: 'note_type', type:'string'},
    {name: 'last_update', type:'date', dateFormat: "m-d-Y H:i:s"}
]);

// Define the Collaborate data type - stored in Collaborate
tx.data.Collaborate = Ext.data.Record.create([
    {name: 'collaborateId', type:'string'},
	{name: 'user_id', type:'string'},
	{name: 'listId', type:'string'},
	{name: 'listName', type:'string'},
    {name: 'title', type:'string'},
	{name: 'link_to', type:'string'},
	{name: 'action_to', type:'string'},
	{name: 'auth_type', type:'string'},
	{name: 'login', type:'string'},
	{name: 'password', type:'string'}
]);
					
// Define the Cashrecord data type - stored in Cashrecord
/*  Full  attributes list
tx.data.Cashrecord = Ext.data.Record.create([
    {name: 'cashrecordId', type:'string'},
	{name: 'user_id', type:'string'},
	{name: 'taskId', type:'string'},
    {name: 'cashrec_type', type:'string'},
	{name: 'reference', type:'string'},
	{name: 'dr_account_id', type:'string'},
	{name: 'debit_amount', type:'string'},
    {name: 'dr_value_date', type:'date', dateFormat: "m-d-Y H:i:s"},
	{name: 'cr_account_id', type:'string'},
	{name: 'credit_amount', type:'string'},
	{name: 'cr_value_date', type:'date', dateFormat: "m-d-Y H:i:s"},
	{name: 'original_balance', type:'string'},
	{name: 'repetitive_type', type:'string'},
	{name: 'record_sequence', type:'string'},
	{name: 'repetitive_amount', type:'string'},
	{name: 'starting_date', type:'date', dateFormat: "m-d-Y H:i:s"},
	{name: 'details', type:'string'},
]);
*/
tx.data.Cashrecord = Ext.data.Record.create([
	{name: 'date', type:'date', dateFormat: "m-d-Y"},
    {name: 'day', type:'string'},
    {name: 'debit', type:'string'},
    {name: 'credit', type:'string'},
    {name: 'antidebit', type:'string'},
    {name: 'anticredit', type:'string'},
    {name: 'total', type:'string'}
]);

// Define the Contact data type - stored in Contact
tx.data.Contact = Ext.data.Record.create([
    {name: 'contactId', type:'string'},
    {name: 'contact_name', type:'string'},
    {name: 'contact_type', type:'string'},
	{name: 'address', type:'string'},
	{name: 'city', type:'string'},
	{name: 'country', type:'string'},
	{name: 'phone', type:'string'},
	{name: 'fax', type:'string'},
	{name: 'email', type:'string'},
	{name: 'url', type:'string'}
]);

// Define the Account data type - stored in Account
tx.data.Account = Ext.data.Record.create([
    {name: 'accountId', type:'string'},
	{name: 'contact_id', type:'string'},
    {name: 'account_no', type:'string'},
    {name: 'account_type', type:'string'},
	{name: 'currency', type:'string'},
	{name: 'balance', type:'string'},
	{name: 'balance_date', type:'date', dateFormat: "m-d-Y H:i:s"},
	{name: 'credit_limit', type:'string'} 
]);

// Define the Bank data type - stored in Bank
tx.data.Bank = Ext.data.Record.create([
	{name: 'bankId', type:'string'},
    {name: 'name', type:'string'},
    {name: 'branch', type:'string'},
    {name: 'address', type:'string'},
	{name: 'city', type:'string'},
	{name: 'country', type:'string'},
	{name: 'phone', type:'string'},
	{name: 'fax', type:'string'},
	{name: 'email', type:'string'},
	{name: 'url', type:'string'},
	{name: 'conn_person', type:'string'},
	{name: 'businessdate', type:'date', dateFormat: "m-d-Y H:i:s"}
]);

/*
 * ****************************************** STAGE 2 *****************************************************
 */

tx.data.TaskStore = Ext.extend(Ext.data.GroupingStore, {
	constructor: function(){
		tx.data.TaskStore.superclass.constructor.call(this, {
	        sortInfo:{field: 'dueDate', direction: "ASC"},
	        groupField:'dueDate',
	        taskFilter: 'all',
	        reader: new Ext.data.JsonReader({
	                totalProperty: "Total",
					root: "Tasks",
					id: 'taskId',
		        	fields: tx.data.Task
	        })
	    });
	    this.conn = tx.data.tasks_con;
	    this.proxy =  new Ext.ux.CssProxy(tx.data.tasks_con);
	},

	applyFilter : function(filter){
    	if(filter !== undefined){
    		this.taskFilter = filter;
    	}
        var value = this.taskFilter;
        if(value == 'all'){
            return this.clearFilter();
        }
        return this.filterBy(function(item){
            return item.data.completed === value;
        });
    },
	
	addRemote : function(data){
		this.suspendEvents();
		Ext.Ajax.request({
					    url: 'http://localhost:3000/tasks/create_remote',
					    scriptTag: true,
					    callbackParam: 'jsoncallback',
					    timeout: 10,
							params: {
								format: 'js',
								task : Ext.util.JSON.encode(data)
					    },
					    success: function(r) {
							   var aff;
					    },
					    failure : function(r) {
					       	   var fas2;
					    },
					    scope: this
					});	
					
		Ext.Ajax.request({
				url: '/googlecalendar/add_task',
				timeout: 10,
				params: {
					task: Ext.util.JSON.encode(data)
				},
				success: function(response){
					var fas;
				},
				failure: function(){
					var fas2;
				},
				scope: this
			});
	    this.resumeEvents();	
	},
	
    addTask : function(data){
        this.suspendEvents();
        this.clearFilter();
        this.resumeEvents();
        this.loadData({Tasks:[data]}, true);
		this.addRemote(data);
		this.commitChanges();
        this.suspendEvents();
        this.applyFilter();
        this.applyGrouping(true);
        this.resumeEvents();
        this.fireEvent('datachanged', this);
    },
	
	removeTask : function(data){
		this.suspendEvents();
		Ext.Ajax.request({
					    url: 'http://localhost:3000/tasks/destroy_remote',
					    scriptTag: true,
					    callbackParam: 'jsoncallback',
					    timeout: 10,
							params: {
								format: 'js',
								id : data.taskId
					    },
					    success: function(response) {
							   var fas;
					    },
					    failure : function() {
						 var fas2;
					    },
					    scope: this
					});
		this.resumeEvents();
	},

    updateTask : function(data){
		this.suspendEvents();
		if (data.dueDate && data.dueDate != "") {
			data.dueDate = data.dueDate.format('d-m-Y H:i:s');
			data.reminder = data.reminder == "" ? "" : data.reminder.format('d-m-Y H:i:s');
			Ext.Ajax.request({
				url: 'http://localhost:3000/tasks/update_remote',
				scriptTag: true,
				callbackParam: 'jsoncallback',
				timeout: 10,
				params: {
					format: 'js',
					task: Ext.util.JSON.encode(data)
				},
				success: function(response){
					var fas;
				},
				failure: function(){
					var fas2;
				},
				scope: this
			});
			
		}
		this.reload();
		this.resumeEvents();
    },
	reload : function(){
		 Ext.getCmp('calendar').setHtml(Ext.getCmp('calendar').defaultSrc);
	},
	
	loadList: function(listId){
		var multi = Ext.isArray(listId);
		this.activeList = multi ? listId[0] : listId;
		this.suspendEvents();
        if(multi){
			var ps = [];
			for(var i = 0, len = listId.length; i < len; i++){
				ps.push('?');
			}
			this.load({
				params: {
					format : 'jsonc',
					tasklist_id: ps
				}
			});
		}else{
			this.load({params: {
				format : 'jsonc',
				tasklist_id: listId
			}});
		}		
        this.applyFilter();
        this.applyGrouping(true);
        this.resumeEvents();
        this.fireEvent('datachanged', this);
	},
	
	removeList: function(listId){
		//this.conn.execBy('delete from task where listId = ?', [listId]);
		this.suspendEvents();
		Ext.Ajax.request({
					    url: 'http://localhost:3000/tasklists/destroy_remote',
					    scriptTag: true,
					    callbackParam: 'jsoncallback',
					    timeout: 10,
							params: {
								format: 'js',
								id : listId
					    },
					    success: function(response) {
							   var fas;
					    },
					    failure : function() {
						 var fas2;
					    },
					    scope: this
					});
		this.reload();
		this.resumeEvents();
		
	},
	
    createTask : function(title, listText, dueDate, description, completed){
		if(!Ext.isEmpty(title)){
			var listId = '';
			if(!Ext.isEmpty(listText)){
				listId = tx.data.tasklists.addList(Ext.util.Format.htmlEncode(listText)).id;
			}else{
				listId = tx.data.tasklists.newList(false).id;
			}
			var cur_date = new Date();
			dueDate.setHours(cur_date.getHours()-2);
			dueDate.setMinutes(cur_date.getMinutes()+2);
			dueDate.setSeconds(cur_date.getSeconds());
			this.addTask({
					                taskId: Ext.uniqueId(),
					                title: Ext.util.Format.htmlEncode(title),
					                dueDate: dueDate.format('d-m-Y H:i:s')||'',
					                description: description||'',
					                listId: listId,
					                completed: completed || false
			});		
            
			
        }
	},
	
	afterEdit : function(r){
        if(r.isModified(this.getGroupState())){
			this.applyGrouping();
		}
		//workaround WebKit cross-frame date issue
		fixDateMember(r.data, 'completedDate');
		fixDateMember(r.data, 'reminder');
		fixDateMember(r.data, 'dueDate');
		if(r.isModified('completed')){
			r.editing = true;
			r.set('completedDate', r.data.completed ? new Date() : '');
			r.editing = false;
		}
		tx.data.TaskStore.superclass.afterEdit.apply(this, arguments);
    },
	
	init : function(){
		this.load({
			params : {
				format : 'jsonc',
				description : 'TASK'},
			scope: this,
			callback : function(){
				this.reload();
			}});
	},
	
	lookup : function(id){
		this.suspendEvents();
		var task;
		if(task = this.getById(id)){
			this.resumeEvents();
			return task;
		}
		var data = this.proxy.table.lookup(id);
		if (data) {
			var result = this.reader.readRecords([data]);
			this.resumeEvents();
			return result.records[0];
		}
		this.resumeEvents();
		return null; 
	}	
});

tx.data.ListStore = Ext.extend(Ext.data.Store, {
	constructor: function(){
		tx.data.ListStore.superclass.constructor.call(this, {
	        sortInfo:{field: 'listName', direction: "ASC"},
	        reader: new Ext.data.JsonReader({
	            id: 'listId',
				totalProperty: "Total",
				root: "Tasklists",
				fields: tx.data.List
	        })
	    });
		this.boundTrees = {};
	    this.conn = tx.data.tasklists_con;
		this.proxy =  new Ext.ux.CssProxy(tx.data.tasklists_con);
	},
	
    getName : function(id){
		var l = this.data.map[id];
		return l ? l.data.listName : '';
	},
	
	addRemote : function(data){
		Ext.Ajax.request({
					    url: tx.data.tasklists_con.create_remote_url,
					    scriptTag: true,
					    callbackParam: 'jsoncallback',
					    timeout: 10,
							params: {
								format: 'js',
								tasklist : Ext.util.JSON.encode(data)
					    },
					    success: function(r) {
							    this.publish( '/desktop/notify',{
								            title: 'Create List',
								            html: r.responseObject.notice
								        });
					    },
					    failure : function(r) {
					       			 this.publish( '/desktop/notify',{
								            title: 'Create List',
								            html: r.responseObject.notice
								        });
					    },
					    scope: this
					});		
	},
	
	removeList : function(id){
		Ext.Ajax.request({
					    url:  tx.data.tasklists_con.destroy_remote_url,
					    scriptTag: true,
					    callbackParam: 'jsoncallback',
					    timeout: 10,
							params: {
								format: 'js',
								listId : id
					    },
					    success: function(r) {
							    this.publish( '/desktop/notify',{
								            title: 'Remove List',
								            html: r.responseObject.notice
								        });
					    },
					    failure : function(r) {
						 	 this.publish( '/desktop/notify',{
								            title: 'Remove List',
								            html: r.responseObject.notice
								        });
					    },
					    scope: this
					});
	},

    updateList : function(node){
		var l =  new tx.data.List({listId: node.id, listName: node.text,listType: node.listType,description: node.description , isFolder: node.attributes.leaf, parentId: node.parentNode.id || 'root'}, node.id);
		Ext.Ajax.request({
					    url: tx.data.tasklists_con.update_remote_url,
					    scriptTag: true,
					    callbackParam: 'jsoncallback',
					    timeout: 10,
							params: {
								format: 'js',
								tasklist : Ext.util.JSON.encode(l.data)
					    },
					    success: function(r) {
							   this.publish( '/desktop/notify',{
								            title: 'Update List',
								            html: r.responseObject.notice
								        });
					    },
					    failure : function(r) {
					           this.publish( '/desktop/notify',{
								            title: 'Update List',
								            html: r.responseObject.notice
								        });
					    },
					    scope: this
					});
    },
	
	addList : function(name, id, listType, description, isFolder, parentId){
		var l = this.findList(name);
		if(!l){
			var id = id || Ext.uniqueId();
			l = new tx.data.List({listId: id, listName: name, listType:listType, description: description, isFolder: isFolder === true, parentId: parentId || 'root'}, id);
			this.addRemote(l.data);
			this.add(l);
		}
		return l;
	},
	
	newList : function(isFolder, parentId, listType, description){
		var i = 1;
		var text = isFolder ? 'New Folder ' : 'New List '; 
		while(this.findList(text + i)){
			i++;
		}
		return this.addList(text + i, undefined, listType, description ,isFolder, parentId);
	},
	
	findList : function(name){
		var d = this.data;
		for(var i = 0, len = d.length; i < len; i++){
			if(d.items[i].data.listName === name){
				return d.items[i];
			}
		}
		return null;
	},
	
	bindRoot : function(root){
		var d = this.data;
		for(var i = 0, len = d.length; i < len; i++){
			if(d.items[i].data.listType === root.listType && 
			   d.items[i].data.parentId === "root"){
				return null;
			}
		}
		
		this.addList(root.text, undefined, root.listType, '' ,true, root.id);
	},
	
	bindTree : function(tree){
		this.boundTrees[tree.id] = {
			add: function(ls, records){
				var pnode = tree.getNodeById(records[0].data.parentId);
				if(pnode){
					pnode.reload();
				}
			},
			
			remove: function(ls, record){
				var node = tree.getNodeById(record.id);
				if(node && node.parentNode){
					node.parentNode.removeChild(node);
				}
			},
			
			update: function(ls, record){
				var node = tree.getNodeById(record.id);
				if(node){
					node.setText(record.data.listName);
				}
			},
			active_tree : tree
		};
		
		this.on(this.boundTrees[tree.id]);
	},
	
	unbindTree : function(tree){
		var h = this.boundTrees[tree.id];
		if (h) {
			this.un('add', h.add);
			this.un('remove', h.remove);
			this.un('update', h.update);
		}
	},
	
	init : function(tree, root){
		if (tree && root) {
			this.load({
				params: {
					format: 'jsonc',
					listType: root.listType
				},
				scope: this,
				callback: function(){
					this.bindRoot(root);
					this.boundTrees[tree.id].active_tree.getLoader().load(root);
				}
			});
		}
	}
});

tx.data.HomeAgentStore = Ext.extend(Ext.data.GroupingStore, {
	constructor: function(config){
		Ext.apply(this, config);
		
		tx.data.HomeAgentStore.superclass.constructor.call(this, {
	        sortInfo:{field: config.sort_field, direction: "ASC"},
	        reader: new Ext.data.JsonReader({
	            id: config.host_id,
				totalProperty: "Total",
				root: config.host_root,
				fields: config.record_fields
	        })
	    });
		
		this.conn = config.conn
		this.proxy =  new Ext.ux.CssProxy(config.conn);
	},
	
	
   loadItem: function(listId){
		
		var multi = Ext.isArray(listId);
		this.activeList = multi ? listId[0] : listId;
		this.suspendEvents();
        if(multi){
			var ps = [];
			for(var i = 0, len = listId.length; i < len; i++){
				ps.push('?');
			}
			this.load({
				params: {
					format : 'jsonc',
					tasklist_id: ps
				}
			});
		}else{
			this.load({params: {
				format : 'jsonc',
				tasklist_id: listId
			}});
		}
		


		/*
var index;
		if( (index = this.find(node.attributes.listableType,node.attributes.listableId)) != -1)
		{
			return this.getAt(index)
		}
		else
		{
			return null;
		} 
*/


		
		
	},
	    
	addRemote : function(data){
		Ext.Ajax.request({
					    url: this.conn.create_remote_url,
					    scriptTag: true,
					    callbackParam: 'jsoncallback',
					    timeout: 10,
							params: {
								format: 'js',
								create_data : Ext.util.JSON.encode(data)
					    },
					    success: function(response) {
							   var aff;
					    },
					    failure : function() {
					       			var fas2;
					    },
					    scope: this
					});		
	},
	
	removeRemote : function(id){
		Ext.Ajax.request({
					    url: this.conn.destroy_remote_url,
					    scriptTag: true,
					    callbackParam: 'jsoncallback',
					    timeout: 10,
							params: {
								format: 'js',
								destroyId : id
					    },
					    success: function(r) {
							   var fas;
					    },
					    failure : function(r) {
						 	var fas2;
					    },
					    scope: this
					});
	},

    updateRemote : function(node){
		var l =  new tx.data.List({listId: node.id, listName: node.text, isFolder: node.attributes.leaf, parentId: node.parentNode.id || 'root'}, node.id);
		Ext.Ajax.request({
					    url: this.conn.update_remote_url,
					    scriptTag: true,
					    callbackParam: 'jsoncallback',
					    timeout: 10,
							params: {
								format: 'js',
								update_data : Ext.util.JSON.encode(l.data)
					    },
					    success: function(r) {
							   var fas;
					    },
					    failure : function(r) {
					          var fas2;
					    },
					    scope: this
					});
    }
	
	,
	
	init : function(params){
		this.load({
			params : {
					format : 'jsonc',
					params :params
				},
			scope: this});
	}
});


/*
 * ****************************************** STAGE 3 *****************************************************
 */

// Create App Data objects here:
tx.data.tasks = new tx.data.TaskStore();

tx.data.tasklists = new tx.data.ListStore({id : 'tasklists'});
tx.data.collaboratelists = new tx.data.ListStore({id : 'collaboratelists'});
tx.data.categorylists = new tx.data.ListStore({id : 'categorylists'});

tx.data.collaborates = new tx.data.HomeAgentStore({
	conn : tx.data.collaborates_con,
	host_id : 'id',
	host_root : 'Collaborates',
	record_fields : tx.data.Collaborate,
	sort_field : 'link_to'
});

tx.data.cashrecords = new tx.data.HomeAgentStore({
	conn : tx.data.cashrecords_con,
	host_id : 'id',
	host_root : 'Cashrecords',
	record_fields : tx.data.Cashrecords,
	sort_field : 'date'
});

tx.data.notes = new tx.data.HomeAgentStore({
	conn : tx.data.notes_con,
	host_id : 'id',
	host_root : 'Notes',
	record_fields : tx.data.Note,
	sort_field : 'title'
});


tx.data.accounts = new tx.data.HomeAgentStore({
	conn : tx.data.accounts_con,
	host_id : 'id',
	host_root : 'Accounts',
	record_fields : tx.data.Accounts,
	sort_field : 'account_type'
});

tx.data.banks = new tx.data.HomeAgentStore({
	conn : tx.data.banks_con,
	host_id : 'id',
	host_root : 'Banks',
	record_fields : tx.data.Banks,
	sort_field : 'name'
});


tx.data.getDefaultReminder = function(task){
	var s = task.data.dueDate ? task.data.dueDate.clearTime(true) : new Date().clearTime();
	s = s.add('mi', Ext.state.Manager.get('defaultReminder'));
	return s;
};


tx.data.getActiveListId = function(listType){
    var storage;
	
	if(listType == "TASK")
		storage = tx.data.tasklists;
	else if (listType == "COLLABORATE")
		storage = tx.data.collaboratelists;		
	else if (listType == "STRATEGY")
		storage = tx.data.tasklists;	
	else if (listType == "CATEGORY")
		storage = tx.data.categorylists;
		
	var id = storage.activeList;
    if(!id){
        var first = storage.getAt(0);
        if(first){
            id = first.id;
        }else{
            id = storage.newList().id;
        }
    }
    return id;
};

/************************************************************************************************/
/*  Presentation part is also inlcuded here in order to consolidate the List Tree functionality */
/************************************************************************************************/

/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.namespace('Ext.ux.form');

/**
  * Ext.ux.form.DateTime Extension Class for Ext 2.x Library
  *
  * @author    Ing. Jozef Sakalos
  * @copyright (c) 2008, Ing. Jozef Sakalos
  * @version $Id: Ext.ux.form.DateTime.js 645 2008-01-27 21:53:01Z jozo $
  *
  * @class Ext.ux.form.DateTime
  * @extends Ext.form.Field
  * 
  * @history
  * 2008-1-31 Jack Slocum
  * Updated for reformatting and code edits
  */
Ext.ux.form.DateTime = Ext.extend(Ext.form.Field, {
	defaultAutoCreate: {
		tag: 'input',
		type: 'hidden'
	},
	dateWidth: 135,
	timeWidth: 100,
	dtSeparator: ' ',
	hiddenFormat: 'd-m-Y H:i:s',
	otherToNow: true,
	timePosition: 'right',
	
	initComponent: function(){
		// call parent initComponent
		Ext.ux.form.DateTime.superclass.initComponent.call(this);
		
		// create DateField
		var dateConfig = Ext.apply({}, {
			id: this.id + '-date',
			format: this.dateFormat,
			width: this.dateWidth,
			listeners: {
				blur: {
					scope: this,
					fn: this.onBlur
				},
				focus: {
					scope: this,
					fn: this.onFocus
				}
			}
		}, this.dateConfig);
		this.df = new Ext.form.DateField(dateConfig);
		delete (this.dateFormat);
		
		// create TimeField
		var timeConfig = Ext.apply({}, {
			id: this.id + '-time',
			format: this.timeFormat,
			width: this.timeWidth,
			listeners: {
				blur: {
					scope: this,
					fn: this.onBlur
				},
				focus: {
					scope: this,
					fn: this.onFocus
				}
			}
		}, this.timeConfig);
		this.tf = new Ext.form.TimeField(timeConfig);
		delete (this.timeFormat);
		
		// relay events
		this.relayEvents(this.df, ['focus', 'specialkey', 'invalid', 'valid']);
		this.relayEvents(this.tf, ['focus', 'specialkey', 'invalid', 'valid']);
		
	},
	onRender: function(ct, position){
		if (this.isRendered) {
			return;
		}
		
		// render underlying field
		Ext.ux.form.DateTime.superclass.onRender.call(this, ct, position);
		
		// render DateField and TimeField
		// create bounding table
		if ('below' === this.timePosition) {
			var t = Ext.DomHelper.append(ct, {
				tag: 'table',
				style: 'border-collapse:collapse',
				children: [{
					tag: 'tr',
					children: [{
						tag: 'td',
						style: 'padding-bottom:1px',
						cls: 'ux-datetime-date'
					}]
				}, {
					tag: 'tr',
					children: [{
						tag: 'td',
						cls: 'ux-datetime-time'
					}]
				}]
			}, true);
		}
		else {
			var t = Ext.DomHelper.append(ct, {
				tag: 'table',
				style: 'border-collapse:collapse',
				children: [{
					tag: 'tr',
					children: [{
						tag: 'td',
						style: 'padding-right:4px',
						cls: 'ux-datetime-date'
					}, {
						tag: 'td',
						cls: 'ux-datetime-time'
					}]
				}]
			}, true);
		}
		
		this.tableEl = t;
		this.wrap = t.wrap({
			cls: 'x-form-field-wrap'
		});
		this.wrap.on("mousedown", this.onMouseDown, this, {
			delay: 10
		});
		
		// render DateField & TimeField
		this.df.render(t.child('td.ux-datetime-date'));
		this.tf.render(t.child('td.ux-datetime-time'));
		
		if (Ext.isIE && Ext.isStrict) {
			t.select('input').applyStyles({
				top: 0
			});
		}
		
		this.on('specialkey', this.onSpecialKey, this);
		
		this.df.el.swallowEvent(['keydown', 'keypress']);
		this.tf.el.swallowEvent(['keydown', 'keypress']);
		
		// create errorIcon for side invalid
		if ('side' === this.msgTarget) {
			var elp = this.el.findParent('.x-form-element', 10, true);
			this.errorIcon = elp.createChild({
				cls: 'x-form-invalid-icon'
			});
			
			this.df.errorIcon = this.errorIcon;
			this.tf.errorIcon = this.errorIcon;
		}
		
		this.isRendered = true;
		
	},
	getPositionEl: function(){
		return this.wrap;
	},
	getResizeEl: function(){
		return this.wrap;
	},
	
	adjustSize: Ext.BoxComponent.prototype.adjustSize,
	
	alignErrorIcon: function(){
		this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
	},
	
	onSpecialKey: function(t, e){
		if (e.getKey() == e.TAB) {
			if (t === this.df && !e.shiftKey) {
				e.stopEvent();
				this.tf.focus();
			}
			if (t === this.tf && e.shiftKey) {
				e.stopEvent();
				this.df.focus();
			}
		}
	},
	
	setSize: function(w, h){
		if (!w) {
			return;
		}
		if ('below' == this.timePosition) {
			this.df.setSize(w, h);
			this.tf.setSize(w, h)
			if (Ext.isIE) {
				this.df.el.up('td').setWidth(w);
				this.tf.el.up('td').setWidth(w);
			}
		}
		else {
			this.df.setSize(w - this.timeWidth - 4, h);
			this.tf.setSize(this.timeWidth, h);
			
			if (Ext.isIE) {
				this.df.el.up('td').setWidth(w - this.timeWidth - 4);
				this.tf.el.up('td').setWidth(this.timeWidth);
			}
		}
		
	},
	
	setValue: function(val){
		if (!val) {
			this.setDate('');
			this.setTime('');
			this.updateValue();
			return;
		}
		// clear cross frame AIR nonsense
		val = new Date(val.getTime());
		var da, time;
		if (Ext.isDate(val)) {
			this.setDate(val);
			this.setTime(val);
			this.dateValue = new Date(val);
		}
		else {
			da = val.split(this.dtSeparator);
			this.setDate(da[0]);
			if (da[1]) {
				this.setTime(da[1]);
			}
		}
		this.updateValue();
	},
	
	getValue: function(){
		// create new instance of date
		return this.dateValue ? new Date(this.dateValue) : '';
	},
	
	onMouseDown: function(e){
		// just to prevent blur event when clicked in the middle of fields
		this.wrapClick = 'td' === e.target.nodeName.toLowerCase();
	},
	
	onFocus: function(){
		if (!this.hasFocus) {
			this.hasFocus = true;
			this.startValue = this.getValue();
			this.fireEvent("focus", this);
		}
	},
	
	onBlur: function(f){
		// called by both DateField and TimeField blur events
		
		// revert focus to previous field if clicked in between
		if (this.wrapClick) {
			f.focus();
			this.wrapClick = false;
		}
		
		// update underlying value
		if (f === this.df) {
			this.updateDate();
		}
		else {
			this.updateTime();
		}
		this.updateHidden();
		
		// fire events later
		(function(){
			if (!this.df.hasFocus && !this.tf.hasFocus) {
				var v = this.getValue();
				if (String(v) !== String(this.startValue)) {
					this.fireEvent("change", this, v, this.startValue);
				}
				this.hasFocus = false;
				this.fireEvent('blur', this);
			}
		}).defer(100, this);
		
	},
	updateDate: function(){
	
		var d = this.df.getValue();
		if (d) {
			if (!Ext.isDate(this.dateValue)) {
				this.initDateValue();
				if (!this.tf.getValue()) {
					this.setTime(this.dateValue);
				}
			}
			this.dateValue.setFullYear(d.getFullYear());
			this.dateValue.setMonth(d.getMonth());
			this.dateValue.setDate(d.getDate());
		}
		else {
			this.dateValue = '';
			this.setTime('');
		}
	},
	updateTime: function(){
		var t = this.tf.getValue();
		if (t && !Ext.isDate(t)) {
			t = Date.parseDate(t, this.tf.format);
		}
		if (t && !this.df.getValue()) {
			this.initDateValue();
			this.setDate(this.dateValue);
		}
		if (Ext.isDate(this.dateValue)) {
			if (t) {
				this.dateValue.setHours(t.getHours());
				this.dateValue.setMinutes(t.getMinutes());
				this.dateValue.setSeconds(t.getSeconds());
			}
			else {
				this.dateValue.setHours(0);
				this.dateValue.setMinutes(0);
				this.dateValue.setSeconds(0);
			}
		}
	},
	initDateValue: function(){
		this.dateValue = this.otherToNow ? new Date() : new Date(1970, 0, 1, 0, 0, 0);
	},
	updateHidden: function(){
		if (this.isRendered) {
			var value = Ext.isDate(this.dateValue) ? this.dateValue.format(this.hiddenFormat) : '';
			this.el.dom.value = value;
		}
	},
	updateValue: function(){
	
		this.updateDate();
		this.updateTime();
		this.updateHidden();
		
		return;
		
	},
	setDate: function(date){
		this.df.setValue(date);
	},
	setTime: function(date){
		this.tf.setValue(date);
	},
	isValid: function(){
		return this.df.isValid() && this.tf.isValid();
	},
	validate: function(){
		return this.df.validate() && this.tf.validate();
	},
	focus: function(){
		this.df.focus();
	},
	
	onDisable : function(){
		if(this.rendered){
			this.df.disable();
			this.tf.disable();
		}
	},
	
	onEnable : function(){
		if(this.rendered){
			this.df.enable();
			this.tf.enable();
		}
	}
});

// register xtype
Ext.reg('xdatetime', Ext.ux.form.DateTime);



/**
 * @author i-housekeeping
 */
/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.BLANK_IMAGE_URL = 'images/s.gif';

// work around for broken cross frame Dates in Safari
function fixDate(d){
	return d ? new Date(d.getTime()) : d;
}

function fixDateMember(o, name){
	if(o[name]){
		o[name] = new Date((typeof(o[name])=='string') ? new Date(o[name]).getTime() : o[name].getTime());
	}
}
/**
 * Makes a ComboBox more closely mimic an HTML SELECT.  Supports clicking and dragging
 * through the list, with item selection occurring when the mouse button is released.
 * When used will automatically set {@link #editable} to false and call {@link Ext.Element#unselectable}
 * on inner elements.  Re-enabling editable after calling this will NOT work.
 *
 * @author Corey Gilmore
 * http://extjs.com/forum/showthread.php?t=6392
 *
 * @history 2007-07-08 jvs
 * Slight mods for Ext 2.0
 */
Ext.ux.SelectBox = function(config){
	this.searchResetDelay = 1000;
	config = config || {};
	config = Ext.apply(config || {}, {
		editable: false,
		forceSelection: true,
		rowHeight: false,
		lastSearchTerm: false,
        triggerAction: 'all',
        mode: 'local'
    });

	Ext.ux.SelectBox.superclass.constructor.apply(this, arguments);

	this.lastSelectedIndex = this.selectedIndex || 0;
};

Ext.extend(Ext.ux.SelectBox, Ext.form.ComboBox, {
    lazyInit: false,
	initEvents : function(){
		Ext.ux.SelectBox.superclass.initEvents.apply(this, arguments);
		// you need to use keypress to capture upper/lower case and shift+key, but it doesn't work in IE
		this.el.on('keydown', this.keySearch, this, true);
		this.cshTask = new Ext.util.DelayedTask(this.clearSearchHistory, this);
	},

	keySearch : function(e, target, options) {
		var raw = e.getKey();
		var key = String.fromCharCode(raw);
		var startIndex = 0;

		if( !this.store.getCount() ) {
			return;
		}

		switch(raw) {
			case Ext.EventObject.HOME:
				e.stopEvent();
				this.selectFirst();
				return;

			case Ext.EventObject.END:
				e.stopEvent();
				this.selectLast();
				return;

			case Ext.EventObject.PAGEDOWN:
				this.selectNextPage();
				e.stopEvent();
				return;

			case Ext.EventObject.PAGEUP:
				this.selectPrevPage();
				e.stopEvent();
				return;
		}

		// skip special keys other than the shift key
		if( (e.hasModifier() && !e.shiftKey) || e.isNavKeyPress() || e.isSpecialKey() ) {
			return;
		}
		if( this.lastSearchTerm == key ) {
			startIndex = this.lastSelectedIndex;
		}
		this.search(this.displayField, key, startIndex);
		this.cshTask.delay(this.searchResetDelay);
	},

	onRender : function(ct, position) {
		this.store.on('load', this.calcRowsPerPage, this);
		Ext.ux.SelectBox.superclass.onRender.apply(this, arguments);
		if( this.mode == 'local' ) {
			this.calcRowsPerPage();
		}
	},

	onSelect : function(record, index, skipCollapse){
		if(this.fireEvent('beforeselect', this, record, index) !== false){
			this.setValue(record.data[this.valueField || this.displayField]);
			if( !skipCollapse ) {
				this.collapse();
			}
			this.lastSelectedIndex = index + 1;
			this.fireEvent('select', this, record, index);
		}
	},

	render : function(ct) {
		Ext.ux.SelectBox.superclass.render.apply(this, arguments);
		if( Ext.isSafari ) {
			this.el.swallowEvent('mousedown', true);
		}
		this.el.unselectable();
		this.innerList.unselectable();
		this.trigger.unselectable();
		this.innerList.on('mouseup', function(e, target, options) {
			if( target.id && target.id == this.innerList.id ) {
				return;
			}
			this.onViewClick();
		}, this);

		this.innerList.on('mouseover', function(e, target, options) {
			if( target.id && target.id == this.innerList.id ) {
				return;
			}
			this.lastSelectedIndex = this.view.getSelectedIndexes()[0] + 1;
			this.cshTask.delay(this.searchResetDelay);
		}, this);

		this.trigger.un('click', this.onTriggerClick, this);
		this.trigger.on('mousedown', function(e, target, options) {
			e.preventDefault();
			this.onTriggerClick();
		}, this);

		this.on('collapse', function(e, target, options) {
			Ext.getDoc().un('mouseup', this.collapseIf, this);
		}, this, true);

		this.on('expand', function(e, target, options) {
			Ext.getDoc().on('mouseup', this.collapseIf, this);
		}, this, true);
	},

	clearSearchHistory : function() {
		this.lastSelectedIndex = 0;
		this.lastSearchTerm = false;
	},

	selectFirst : function() {
		this.focusAndSelect(this.store.data.first());
	},

	selectLast : function() {
		this.focusAndSelect(this.store.data.last());
	},

	selectPrevPage : function() {
		if( !this.rowHeight ) {
			return;
		}
		var index = Math.max(this.selectedIndex-this.rowsPerPage, 0);
		this.focusAndSelect(this.store.getAt(index));
	},

	selectNextPage : function() {
		if( !this.rowHeight ) {
			return;
		}
		var index = Math.min(this.selectedIndex+this.rowsPerPage, this.store.getCount() - 1);
		this.focusAndSelect(this.store.getAt(index));
	},

	search : function(field, value, startIndex) {
		field = field || this.displayField;
		this.lastSearchTerm = value;
		var index = this.store.find.apply(this.store, arguments);
		if( index !== -1 ) {
			this.focusAndSelect(index);
		}
	},

	focusAndSelect : function(record) {
		var index = typeof record === 'number' ? record : this.store.indexOf(record);
		this.select(index, this.isExpanded());
		this.onSelect(this.store.getAt(record), index, this.isExpanded());
	},

	calcRowsPerPage : function() {
		if( this.store.getCount() ) {
			this.rowHeight = Ext.fly(this.view.getNode(0)).getHeight();
			this.rowsPerPage = this.maxHeight / this.rowHeight;
		} else {
			this.rowHeight = false;
		}
	}

});
/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

ListLoader = function(config){
	Ext.apply(this, config);
};

Ext.extend(ListLoader, Ext.util.Observable, {
	keyAttribute: 'id',
	keyField: 'parentId',
	
	load: function(node, callback){
		var key = this.keyField;
		var v = node.attributes[this.keyAttribute];
		var rs = this.store.queryBy(function(r){
			return r.data[key] === v;
		});
		
		while(node.firstChild) {
    		node.removeChild(node.firstChild);
		}
		
		node.beginUpdate();
        for (var i = 0, d = rs.items, len = d.length; i < len; i++) {
			var n = this.createNode(d[i]);
			if (n) {
				node.appendChild(n);
			}
		}
		node.endUpdate();
		if(typeof callback == "function"){
            callback(this, node);
        }
	},
	
	createNode : function(record){
		var d = record.data, n;
		if(d.isFolder){
			n = new Ext.tree.AsyncTreeNode({
				loader: this,
				id: record.id.toString(),
				text: d.listName,
				leaf: false,
				iconCls: 'icon-folder',
				editable: true,
				expanded: true,
				isFolder: true
			});
		}else{
			n = new Ext.tree.TreeNode({
				id: record.id.toString(),
				text: d.listName,
				leaf: true,
				iconCls: 'icon-list',
				editable: true
			});
		}
		return n;
	}
});
/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

ListTree = function(config){

	ListTree.superclass.constructor.call(this, Ext.apply({
		enableDD: false,
		animate:false,
		rootVisible:false,
		split:true,
		autoScroll:true,
		margins: '3 0 3 3',
		cmargins: '3 3 3 3',
		useArrows:true,
		collapsible:true,
		minWidth:120
	}, config));
	
	this.on('contextmenu', this.onContextMenu, this);
	this.on('textchange', this.onTextchange, this);
	this.on('nodedrop', this.onNodeDrop , this, {buffer:100});
	this.on('beforenodedrop', this.onBeforeNodeDrop, this);
	this.on('nodedragover', this.onNodeDragOver, this);
	 
}
Ext.extend(ListTree, Ext.tree.TreePanel, {
	
	initComponent : function(){
		
		this.loader = new ListLoader({
			store: this.store
		});
		ListTree.superclass.initComponent.call(this);

		var root = new Ext.tree.AsyncTreeNode({
	        text: 'All Lists',
			id: 'root',
			leaf: false,
			iconCls: 'icon-folder',
			expanded: true,
			isFolder: true,
			editable: false,
			draggable : false
	    });
	    this.setRootNode(root);
				
		this.editor = new Ext.tree.TreeEditor(this, {
	        allowBlank:false,
	        blankText:'A name is required',
	        selectOnFocus:true
	    });
        this.editor.shadow = false;

        this.editor.on('beforecomplete', function(ed, value, startValue){
			var node = ed.editNode;
			value = Ext.util.Format.htmlEncode(value);
			var r = this.store.getById(node.id);
			r.set('listName', value);
			//ed.editing = false;
            //ed.hide();
			//return false;
		}, this);
		
		this.sorter = new Ext.tree.TreeSorter(this, {
			folderSort:false
			,sortType : function(node){
					return parseInt(node.id, 10);
		}
		});
	},
	
	getActiveFolderId : function(){
		var sm = this.selModel;
		var n = sm.getSelectedNode();
		if(n){
			return n.attributes.isFolder ? n.id : n.attributes.parentId;
		}
		return 'root';
	},
	
	onContextMenu : function(node, e){
        if(!this.menu){ // create context menu on first right click
            this.menu = new Ext.menu.Menu({
                id:'lists-ctx',
				listWidth: 200,
                items: [{
                    iconCls:'icon-edit',
                    text:'Open List Item',
                    scope: this,
                    handler:function(){
						this.ctxNode.select();
						this.actions.newTask.execute(this.ctxNode);
                    }
                },{
                    iconCls:'icon-list-new',
                    text:'New List',
                    scope: this,
                    handler:function(){
						this.ctxNode.select();
						this.actions.newList.execute();
                    }
                },{
                    iconCls:'icon-folder-new',
                    text:'New Folder',
                    scope: this,
                    handler:function(){
						this.ctxNode.select();
						this.actions.newFolder.execute();
                    }
                },'-',{
					text:'Delete',
                    iconCls:'icon-list-delete',
                    scope: this,
                    handler:function(){
                        this.removeList(this.ctxNode);
                    }
                }]
            });
            this.menu.on('hide', this.onContextHide, this);
        }
        if(this.ctxNode){
            this.ctxNode.ui.removeClass('x-node-ctx');
            this.ctxNode = null;
        }
        this.ctxNode = node;
        this.ctxNode.ui.addClass('x-node-ctx');
		
		this.menu.items.get(1).setVisible(!!node.attributes.isFolder);
		this.menu.items.get(2).setVisible(!!node.attributes.isFolder);
		this.menu.items.get(0).setVisible(!node.attributes.isFolder);
		
		this.menu.showAt(e.getXY());
    },

    onContextHide : function(){
        if(this.ctxNode){
            this.ctxNode.ui.removeClass('x-node-ctx');
            this.ctxNode = null;
        }
    },
	
	startEdit : function(node, select){
		if(typeof node == 'string'){
			node = this.getNodeById(node);
		}
		if(select === true){
			node.select();
		}
		var ed = this.editor;
		setTimeout(function(){
			ed.editNode = node;
			ed.startEdit(node.ui.textNode);
		}, 10);
	},
	onTextchange: function (node,text,oldText ){
		if(text != oldText)
		{
			this.loader.store.updateList(node);
		}		
		
	},
	removeList : function(s){
		if (s && s.attributes.editable) {
			Ext.Msg.confirm('Confirm', 'Are you sure you want to delete "' + Ext.util.Format.htmlEncode(s.text) + '"?', function(btn){
				if (btn == 'yes') {
					if (s.nextSibling) {
						s.nextSibling.select();
					}
					else 
						if (s.previousSibling) {
							s.previousSibling.select();
						}					
					s.parentNode.removeChild(s);
					this.store.removeList(s.id);
					this.store.remove(this.store.getById(s.id));
					tx.data.tasks.removeList(s.id);
				}
			}, this);
		}
	},
	
		// update on node drop
	onNodeDrop : function(de) {
		var node = de.target;
		if (de.point != 'above' && de.point != 'below') {
			node = node.parentNode || node;
		}
		//this.updateForm(false, node);
	},

	// copy node on 'ctrl key' drop
	onBeforeNodeDrop : function(de) {
		if (!de.rawEvent.ctrlKey) {
			//this.markUndo("Moved " + de.dropNode.text);
			return true;
		}
		//this.markUndo("Copied " + de.dropNode.text);
        var ns = de.dropNode, p = de.point, t = de.target;
        if(!(ns instanceof Array)){
            ns = [ns];
        }
        var n;
        for(var i = 0, len = ns.length; i < len; i++){
						n = cloneNode(ns[i]);
            if(p == "above"){
                t.parentNode.insertBefore(n, t);
            }else if(p == "below"){
                t.parentNode.insertBefore(n, t.nextSibling);
            }else{
                t.appendChild(n);
            }
        }
        n.ui.focus();
        if(de.tree.hlDrop){ n.ui.highlight(); }
        t.ui.endDrop();
        de.tree.fireEvent("nodedrop", de);
				return false;
	},

	// assert node drop
	onNodeDragOver : function(de) {
		var p = de.point, t= de.target;
		if(p == "above" || t == "below") {
				t = t.parentNode;
		}
		if (!t) { return false; }
		//this.highlightElement(t.fEl.el);
		return (this.canAppend({}, t) === true);
	}
});

/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

// custom menu item to contain Ext trees
Ext.menu.TreeItem = Ext.extend(Ext.menu.Adapter, {
	constructor : function(config){
        Ext.menu.TreeItem.superclass.constructor.call(this, config.tree, config);
        this.tree = this.component;
        this.addEvents('selectionchange');

        this.tree.on("render", function(tree){
            tree.body.swallowEvent(['click','keydown', 'keypress', 'keyup']);
        });

        this.tree.getSelectionModel().on("selectionchange", this.onSelect, this);
    },

    onSelect : function(tree, sel){
        this.fireEvent("select", this, sel, tree);
    }
});


// custom menu containing a single tree
Ext.menu.TreeMenu = Ext.extend(Ext.menu.Menu, {
    cls:'x-tree-menu',
	//keyNav: true,
	hideOnClick:false,
    plain: true,

    constructor : function(config){
        Ext.menu.TreeMenu.superclass.constructor.call(this, config);
        this.treeItem = new Ext.menu.TreeItem(config);
        this.add(this.treeItem);

        this.tree = this.treeItem.tree;
        this.tree.on('click', this.onNodeClick, this);
        this.relayEvents(this.treeItem, ["selectionchange"]);
    },

    // private
    beforeDestroy : function() {
        this.tree.destroy();
    },
	
	onNodeClick : function(node, e){
		if(!node.attributes.isFolder){
			this.treeItem.handleClick(e);
		}
	}
});


// custom form field for displaying a tree, similar to select or combo
Ext.ux.TreeSelector = Ext.extend(Ext.form.TriggerField, {
	initComponent : function(){
		Ext.ux.TreeSelector.superclass.initComponent.call(this);
		this.addEvents('selectionchange');

		this.tree.getSelectionModel().on('selectionchange', this.onSelection, this);
		this.tree.on({
			'expandnode': this.sync,
			'collapsenode' : this.sync,
			'append' : this.sync,
			'remove' : this.sync,
			'insert' : this.sync,
			scope: this
		});
		this.on('focus', this.onTriggerClick, this);
    },

	sync : function(){
		if(this.menu && this.menu.isVisible()){
			if(this.tree.body.getHeight() > this.maxHeight){
				this.tree.body.setHeight(this.maxHeight);
				this.restricted = true;
			}else if(this.restricted && this.tree.body.dom.firstChild.offsetHeight < this.maxHeight){
				this.tree.body.setHeight('');
				this.restricted = false;
			}
			this.menu.el.sync();
		}
	},

	onSelection : function(tree, node){
		if(!node){
			this.setRawValue('');
		}else{
			this.setRawValue(node.text);
		}
	},

	initEvents : function(){
		Ext.ux.TreeSelector.superclass.initEvents.call(this);
		this.el.on('mousedown', this.onTriggerClick, this);
		this.el.on("keydown", this.onKeyDown,  this);
	},

	onKeyDown : function(e){
		if(e.getKey() == e.DOWN){
			this.onTriggerClick();
		}
	},

    validateBlur : function(){
        return !this.menu || !this.menu.isVisible();
    },

    getValue : function(){
		var sm = this.tree.getSelectionModel();
		var s = sm.getSelectedNode();
        return s ? s.id : '';
    },

    setValue : function(id){
		var n = this.tree.getNodeById(id);
		if(n){
			n.select();
		}else{
			this.tree.getSelectionModel().clearSelections();
		}
    },

    // private
    onDestroy : function(){
        if(this.menu) {
            this.menu.destroy();
        }
        if(this.wrap){
            this.wrap.remove();
        }
        Ext.ux.TreeSelector.superclass.onDestroy.call(this);
    },

	// private
    menuListeners : {
        show : function(){ // retain focus styling
            this.onFocus();
        },
        hide : function(){
            this.focus.defer(10, this);
            var ml = this.menuListeners;
            this.menu.un("show", ml.show,  this);
            this.menu.un("hide", ml.hide,  this);
        }
    },

    onTriggerClick : function(){
		if(this.disabled){
            return;
        }
        this.menu.on(Ext.apply({}, this.menuListeners, {
            scope:this
        }));

        this.menu.show(this.el, "tl-bl?");
		this.sync();
		var sm = this.tree.getSelectionModel();
		var selected = sm.getSelectedNode();
		if(selected){
			selected.ensureVisible();
			sm.activate.defer(250, sm, [selected]);
		}
    },

    beforeBlur : function(){
        //
    },

	onRender : function(){
		Ext.ux.TreeSelector.superclass.onRender.apply(this, arguments);
		this.menu = new Ext.menu.TreeMenu(Ext.apply(this.menuConfig || {}, {tree: this.tree}));
		this.menu.render();

		this.tree.body.addClass('x-tree-selector');
	},

	readOnly: true
});

/*
 * Custom tree keyboard navigation that supports node navigation without selection
 */
Ext.tree.ActivationModel = Ext.extend(Ext.tree.DefaultSelectionModel, {
	select : function(node){
        return this.activate(Ext.tree.ActivationModel.superclass.select.call(this, node));
    },
    
    activate : function(node){
		if(!node){
			return;
		}
		if(this.activated != node) {
			if(this.activated){
				this.activated.ui.removeClass('x-tree-activated');
			}
			this.activated = node;
			node.ui.addClass('x-tree-activated');
		}
		node.ui.focus();
		return node;	
	},
	
	activatePrevious : function(){
        var s = this.activated;
        if(!s){
            return null;
        }
        var ps = s.previousSibling;
        if(ps){
            if(!ps.isExpanded() || ps.childNodes.length < 1){
                return this.activate(ps);
            } else{
                var lc = ps.lastChild;
                while(lc && lc.isExpanded() && lc.childNodes.length > 0){
                    lc = lc.lastChild;
                }
                return this.activate(lc);
            }
        } else if(s.parentNode && (this.tree.rootVisible || !s.parentNode.isRoot)){
            return this.activate(s.parentNode);
        }
        return null;
    },

    activateNext : function(){
        var s = this.activated;
        if(!s){
            return null;
        }
        if(s.firstChild && s.isExpanded()){
             return this.activate(s.firstChild);
         }else if(s.nextSibling){
             return this.activate(s.nextSibling);
         }else if(s.parentNode){
            var newS = null;
            s.parentNode.bubble(function(){
                if(this.nextSibling){
                    newS = this.getOwnerTree().selModel.activate(this.nextSibling);
                    return false;
                }
            });
            return newS;
         }
        return null;
    },

    onKeyDown : function(e){
        var s = this.activated;
        // undesirable, but required
        var sm = this;
        if(!s){
            return;
        }
        var k = e.getKey();
        switch(k){
             case e.DOWN:
                 e.stopEvent();
                 this.activateNext();
             break;
             case e.UP:
                 e.stopEvent();
                 this.activatePrevious();
             break;
             case e.RIGHT:
                 e.preventDefault();
                 if(s.hasChildNodes()){
                     if(!s.isExpanded()){
                         s.expand();
                     }else if(s.firstChild){
                         this.activate(s.firstChild, e);
                     }
                 }
             break;
             case e.LEFT:
                 e.preventDefault();
                 if(s.hasChildNodes() && s.isExpanded()){
                     s.collapse();
                 }else if(s.parentNode && (this.tree.rootVisible || s.parentNode != this.tree.getRootNode())){
                     this.activate(s.parentNode, e);
                 }
             break;
        };
    }
});
/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

// Implementation class for created the tree powered form field
ListSelector = Ext.extend(Ext.ux.TreeSelector, {
	maxHeight:200,
	listenForLoad: false,
    initComponent : function(){
		this.tree = new Ext.tree.TreePanel({
			animate:false,
			border:false,
			rootVisible:false,
			width: this.treeWidth || 180,
			autoScroll:true,
			useArrows:true,
			selModel: new Ext.tree.ActivationModel(),
			loader : new ListLoader({store: this.store})		
		});
		
		var root = this.root = new Ext.tree.AsyncTreeNode({
	        text: 'All Lists',
			id: 'root',
			leaf: false,
			iconCls: 'icon-folder',
			expanded: true,
			isFolder: true
	    });
	    this.tree.setRootNode(root);

        this.tree.on('render', function(){
            this.store.bindTree(this.tree);
        }, this);
		
        ListSelector.superclass.initComponent.call(this);
		
		
		this.root.listType = this.root_listType;
		this.root.text = this.root_text; 
		this.store.init(this.tree,this.root);
					
		// selecting folders is not allowed, so filter them
		this.tree.getSelectionModel().on('beforeselect', this.beforeSelection, this);
		this.tree.getSelectionModel().on('selectionchange', this.selectionChange, this);
		
		// if being rendered before the store is loaded, reload when it is loaded
		if(this.listenForLoad) {
			this.store.on('load', function(){
				root.reload();
			}, this, {
				single: true
			});
		}
    },
	
	beforeSelection : function(tree, node){
		if(node && node.attributes.isFolder){
			node.toggle();
			return false;
		}
	},
	
	selectionChange : function(tree){
		return true;
	}
});