

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

QoDesk.Notepad = Ext.extend(Ext.app.Module, {

	moduleType : 'app',
	moduleId : 'notepad',
	
	init : function() {		
		this.launcher = {
			handler: this.createWindow,
			iconCls: 'notepad-icon',
			scope: this,
			shortcutIconCls: 'notepad-shortcut',
			text: 'Notepad',
			tooltip: '<b>Notepad</b><br />Jot down notes'
		};
        this.currentId = 0;
        //this.fetchNotes();
	},

    fetchNotes: function() {
        Ext.Ajax.request({
            url: app.connection,
            success: function(r) {
                var data = {};
                if ( r && r.responseText )
                    data = Ext.decode( r.responseText );
                if ( data.success ) {
                    var len = data.notes.length;
                    for (var i = 0; i < len; i++)
                        this.openNote( 'notepad-win-'+data.notes[ i ].id, data.notes[ i ].note );
                }
            },
            failure: function() {
                // TODO
            },
            params: {
                moduleId: 'notepad',
                task: 'fetch',
                what: 'notes'
            },
            scope: this
        });
    },

    createId: function() {
        this.currentId++;
        // windows with ext- aren't saved in the registry
        return 'ext-notepad-win-'+this.currentId;
    },

	createWindow : function() {
        this.openNote();
    },

    openNote: function( id, taskId ) {
        if ( !id )
            id = this.createId();
        
		var win_height = app.desktop.getWinHeight()*0.6;
		var win_width = app.desktop.getWinWidth()*0.5;
		
		var tp =  new Ext.TabPanel({
                    autoTabs:true,
                    activeTab:0,
					id : 'note_tabs',
                    border:false,
					region : 'center',
					tabPosition : 'bottom',
                    defaults: {
                        autoScroll: true,
                        bodyStyle:'padding:5px'
                    },
                    items: [
	                   	new Mashup.TaskForm({
							win_id : id,
							taskId : taskId,
							win_height : win_height,
							win_width : win_width
						}),
                    
                        new Mashup.CashForm({
							win_id : id,
							taskId : taskId,
							win_height : win_height,
							win_width : win_width
						}),
                    	
						new Mashup.CollaborateForm({
							win_id : id,
							taskId : taskId,
							win_height : win_height,
							win_width : win_width
						})
                    ]
                });
				    
        var cfg = {
            title: 'Notepad',
            iconCls: 'notepad-icon',
            maximizable: true,
            width: win_width ,
            height: win_height ,
            layout: 'border',
            stateId: id,
            id: id,
			items:[tp] 
        };

	    var win = app.desktop.createWindow(cfg);
		
        win.on('close',function() {
            // clear the setting
            // confirm close
            //this.deleteNote(win.id);
			if(Ext.getCmp('notes_win'))
				Ext.getCmp('notes_win').close();
        }, this);
		
        win.show();
    },

    saveNote:function( id, note ) {
        var newNote = false;
        var m = id.match( /^notepad-win-(\d+)/ );
        if ( m && m[ 1 ] )
            id = m[ 1 ];
        else
            newNote = true;
        Ext.Ajax.request({
            url: app.connection,
            success: function(r) {
                var data = {};
                if ( r && r.responseText )
                    data = eval( "(" + r.responseText + ")" );
                if ( data.success ) {
                    if ( data.noteId ) {
                        if ( newNote ) {
		                    var w = app.desktop.getWindow(id);
                            if ( w ) {
                                w.id = w.stateId = 'notepad-win-'+data.noteId;
                                // fire state update?
                                w.fireEvent('show',w);
                            }
                        }
                    }
                }
            },
            failure: function() {
            },
            params: {
                moduleId: 'notepad',
                task: 'save',
                what: newNote ? 'new' : id,
                note: note
            },
            scope: this
        });
    },
    
    deleteNote:function( id ) {
        var m = id.match( /notepad-win-(\d+)/ );
        if ( m && m[ 1 ] )
            id = m[ 1 ];
        else
            return;
        Ext.Ajax.request({
            url: app.connection,
            success: function() {
            },
            failure: function() {
            },
            params: {
                moduleId: 'notepad',
                task: 'delete',
                what: id
            },
            scope: this
        });
    }
    
});

Mashup = {};

Mashup.Notes = function( config) {

    Ext.apply(this, config);

	this.store = tx.data.notes;

	this.columns = [{
					   id: 'story',
					   header: "Note",
					   dataIndex: 'note',
					   width: 250
					   ,renderer: Mashup.Notes.NotesRenderers.notes
					},{
					   header: "Author",
					   dataIndex: 'user_name',
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
					   ,renderer: Mashup.Notes.NotesRenderers.lastPost
				}];

    Mashup.Notes.superclass.constructor.call(this, {
        id:'topic-grid',
        frame:true,
        loadMask: {msg:'Loading Notes...'},
        sm: new Ext.grid.RowSelectionModel({
            singleSelect:true
        }),
		trackMouseOver:false,
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
};


Ext.extend(Mashup.Notes, Ext.grid.GridPanel, {

    loadRecords : function(notableId) {
        this.store.init();
    }
});


Mashup.Notes.NotesRenderers = {
    note : function(value, p, record){
        return String.format(
                '<div class="topic"><b>{0}</b><hr></hr><span class="post-date">{1}</span></div>',
                record.data.title, record.data.last_update);
    },

    lastPost : function(value, p, r){
        return String.format('by {0}',r.data.user);
    }
};

Mashup.TaskForm = function (config){
	Ext.apply(config);
	
	this.isNew = !config.taskId;
	this.completed = false;
	this.currentId++;
	this.taskId = config.taskId || "";
	
	this.tb = new Ext.Toolbar({
		region: 'north',
		height:26,
		id:'main-tb',
		items:[{
			id:'cpl-btn', 
			iconCls: 'icon-mark-complete', 
			text: 'Mark Complete',
			handler: function(){
				var tp = Ext.getCmp('tasks_mashup');
				tp.setCompleted(!tp.completed);
				if(tp.completed) {
					this.publish( '/desktop/notify',{
			            title: 'Task Completed',
			            iconCls: 'icon-kwrite',
			            html: 'This task was completed on ' + new Date().format('l, F d, Y')
			        });
				}
				if(tp.validate()) {
					(function(){
						tp.saveData();
						if (tp.completed) {
							if(Ext.getCmp('notes_win'))
								Ext.getCmp('notes_win').close();
							
							Ext.getCmp(config.win_id).close();
						}
					}).defer(250);
				}
			}
			},'-',
			{
				iconCls: 'icon-delete-task',
				text: 'Delete',
				handler: function(){
						var tp = Ext.getCmp('tasks_mashup');
						
						if(tp.validate()){	
							Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete this task?', function(btn){
							if(btn == 'yes'){
									var task = tp.getTask();
									tx.data.tasks.removeTask(task.data);
								}
							});
						}
					
				}
			},'->',
			{
				iconCls : 'icon-import',
				text: 'Import Deatails',
				handler: function(){ 
						
			 	}
			},
/*
			{
				iconCls: 'icon-view-tree',
				text: 'Show List',
				handler: function(){ 
						var position  = Ext.getCmp(config.win_id).getPosition();
						var y_offset = Ext.getCmp(config.win_id).getSize().height;
						var x_offset = Ext.getCmp(config.win_id).getSize().width;
											
						var win = new Ext.Window({
							id : 'task_list_win',
							title : 'Tasks List',
							iconCls : 'icon-view-tree',
							width:  app.desktop.getWinWidth()*0.2,
	            			height: app.desktop.getWinHeight()*0.6,
							items : [
								new Mashup.Notes()
							]	
						});
						
						win.setPosition(position[0]-app.desktop.getWinWidth()*0.18, position[1]);
					    win.show.defer(500, win);
			 	}
			},

*/			{
				iconCls: 'icon-view-detailed',
				text: 'Show Notes',
				handler: function(){ 
						var position  = Ext.getCmp(config.win_id).getPosition();
						var y_offset = Ext.getCmp(config.win_id).getSize().height;
						var x_offset = Ext.getCmp(config.win_id).getSize().width;
						var notes = new Mashup.Notes();					
						var win = new Ext.Window({
							id : 'notes_win',
							iconCls : 'icon-view-detailed',
							title : 'Task Notes',
							width:  app.desktop.getWinWidth()*0.23,
	            			height: app.desktop.getWinHeight()*0.6,
							items : [notes]	
						});
						
						notes.loadRecords();
						
						win.setPosition(position[0]+x_offset, position[1]);
					    win.show.defer(500, win);
			 	}
			}
		]
	});
	
	this.subject = new Ext.form.TextField({
		fieldLabel: 'Task Subject',
        name: 'title',
        anchor: '100%'
    });
		
	this.dueDate = new Ext.form.DateField({
		fieldLabel: 'Due Date',
		name: 'dueDate',
		width: 135,
		format: 'm/d/Y'
	});
	

	this.list = new ListSelector({
        fieldLabel: 'Task List',
		name: 'listId',
		store: tx.data.tasklists,
		anchor: '100%'
    });
	
	this.list.on('render', function(){
		var tp = Ext.getCmp('tasks_mashup');
		this.menu.on('beforeshow', function(m){
			tp.list.tree.setWidth(Math.max(180, tp.list.getSize().width));
		});
	});

		
	this.hasReminder = new Ext.form.Checkbox({
		boxLabel: 'Reminder:',
		checked: false
	});
	
	this.reminder = new Ext.ux.form.DateTime({
		name: 'reminder',
		disabled: true,
		timeFormat: 'g:i A',
		dateFormat: 'm/d/Y',
		timeConfig: {
			//tpl: opener.Templates.timeField,
			listClass:'x-combo-list-small',
			maxHeight:100
		}
	});
	
	this.description = new Ext.form.HtmlEditor({
        hideLabel: true,
        name: 'description',
        anchor: '100% -95',  // anchor width by percentage and height by raw adjustment
        onEditorEvent : function(e){
	        var t;
	        if(e.browserEvent.type == 'mousedown' && (t = e.getTarget('a', 3))){
	            t.target = '_blank';
	        }
	        this.updateToolbar();
	    }
    });
	
	
	
	this.form = new Ext.form.FormPanel({
		region:'center',
        baseCls: 'x-plain',
        labelWidth: 75,
        margins:'10 10 5 10',
		
		buttonAlign: 'right',
		minButtonWidth: 80,
		buttons:[{
			text: 'Save',
			handler: function(){
				var tp = Ext.getCmp('tasks_mashup');
				if(tp.validate()) {
					tp.saveData();
					if(Ext.getCmp('notes_win'))
						Ext.getCmp('notes_win').close();
					Ext.getCmp(config.win_id).close();
				}
			}
		},{
			text: 'Cash Note',
			handler: function(){ 
					Ext.getCmp('note_tabs').setActiveTab( 'cash_note_tab' ); 
				}
		},{
			text: 'Close Note',
			handler: function(){ 
					if(Ext.getCmp('notes_win'))
						Ext.getCmp('notes_win').close();
					
					Ext.getCmp(config.win_id).close(); 
				}
		}],
				
		
        items: [
		this.subject,{
			layout: 'column',
			anchor: '100%',
			baseCls: 'x-plain',
			items: [{
				width: 250,
				layout: 'form',
				baseCls: 'x-plain',
				items: this.dueDate
			}, {
				columnWidth: 1,
				layout: 'form',
				baseCls: 'x-plain',
				labelWidth:55,
				items: this.list
			}]
		},{
			xtype:'box',
			autoEl: {cls:'divider'}
		},{
			layout: 'column',
			anchor: '100%',
			baseCls: 'x-plain',
			items: [{
				width: 80,
				layout: 'form',
				baseCls: 'x-plain',
				hideLabels: true,
				items: this.hasReminder
			}, {
				columnWidth: 1,
				layout: 'form',
				baseCls: 'x-plain',
				hideLabels: true,
				items: this.reminder
			}]
		}, 	this.description
		]
    });
	
	Mashup.TaskForm.superclass.constructor.call(this, {
		title: 'Task Note',
		layout:'border',
		id : 'tasks_mashup',
		items:[this.tb, this.form]
	});
	
	this.task = this.getTask();
	
	if(this.task && this.task.data.completedDate){
		this.publish( '/desktop/notify',{
            title: 'Task Completed',
            iconCls: 'icon-kwrite',
            html: 'This task was completed on ' + this.task.data.completedDate.format('l, F d, Y')
        });
	}	
	
	this.hasReminder.on('check', function(cb, checked){
		var tp = Ext.getCmp('tasks_mashup');
		tp.reminder.setDisabled(!checked);
		if(tp.checked && !tp.reminder.getValue()){
			tp.reminder.setValue(tx.data.getDefaultReminder(tp.getTask()));
		}
	});
	
	this.refreshData.defer(100);
	this.subject.focus();
}

Ext.extend(Mashup.TaskForm, Ext.Panel, {
	
	refreshData :function (){
		var tm = Ext.getCmp('tasks_mashup');
		try {
			if (!tm.isNew) {
				var task = tm.getTask();
				tm.hasReminder.setValue(task.data.reminder);
				tm.form.getForm().loadRecord(task);
				tm.setCompleted(task.data.completed);
			}
		}catch(e){
			var f = e;
		}
	},
	
	saveData : function(){
		var task;
		if(this.isNew){
			task = tx.data.tasks.createTask(
						this.subject.getValue(), 
						this.list.getRawValue(), 
						this.dueDate.getValue(), 
						this.description.getValue(),
						this.completed
					);
		}else{
			task = this.getTask();
			task.set('completed', this.completed);
		}
		if(!this.hasReminder.getValue()){
			this.reminder.setValue('');
		}
		this.form.getForm().updateRecord(task);
		tx.data.tasks.updateTask(task.data);
	},
	
	 setCompleted : function(value){
	 	var tp = Ext.getCmp('tasks_mashup');
		tp.completed = value;
		var cplBtn = Ext.getCmp('cpl-btn');
		if (tp.completed) {
			cplBtn.setText('Mark Active');
			cplBtn.setIconClass('icon-mark-active');
			tp.hasReminder.disable();
			tp.reminder.disable();
		}
		else {
			cplBtn.setText('Mark Complete');
			cplBtn.setIconClass('icon-mark-complete');
			tp.hasReminder.enable();
			tp.reminder.setDisabled(!tp.hasReminder.checked);
		}
	},
	
	 validate: function(){
	 	var tp = Ext.getCmp('tasks_mashup');
		if(Ext.isEmpty(tp.subject.getValue(), false)){
			    Ext.Msg.alert('Warning', 'Unable to save changes. A subject is required.', function(){
				tp.subject.focus();
			});
			return false;
		}
		return true;
	},
	
	getTask : function(){
		var t;
		if (!this.isNew) {
			t = tx.data.tasks.lookup(this.taskId);
			if(t){
				//workaround WebKit cross-frame date issue
				fixDateMember(t.data, 'completedDate');
				fixDateMember(t.data, 'reminder');
				fixDateMember(t.data, 'dueDate');
			}
		}
		
		return t;
	}
});

Mashup.CashForm = function (config){
	Ext.apply(config);
	
	this.isNew = !config.taskId;
	this.balanced = false;
	this.currentId++;
	this.cashId = config.cashId || "";
	
	this.tb = new Ext.Toolbar({
		region: 'north',
		height:26,
		id:'main-tb-cash',
		items:[{
			id:'cpl-btn-cash', 
			iconCls: 'icon-mark-complete', 
			text: 'Mark Balanced',
			handler: function(){
				var tp = Ext.getCmp('cash_mashup');
				tp.setCompleted(!tp.completed);
				if(tp.completed) {
					this.publish( '/desktop/notify',{
			            title: 'Transaction Balanced',
			            iconCls: 'icon-kwrite',
			            html: 'This  money movement was balanced on ' + new Date().format('l, F d, Y')
			        });
				}
				if(tp.validate()) {
					(function(){
						tp.saveData();
						if (tp.completed) {
							if(Ext.getCmp('notes_win'))
								Ext.getCmp('notes_win').close();
							
							Ext.getCmp(config.win_id).close();
						}
					}).defer(250);
				}
			}
			},'-',
			{
				iconCls: 'icon-delete-task',
				text: 'Delete',
				handler: function(){
						var tp = Ext.getCmp('tasks_mashup');
						
						if(tp.validate()){	
							Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete this task?', function(btn){
							if(btn == 'yes'){
									var task = tp.getTask();
									tx.data.tasks.removeTask(task.data);
								}
							});
						}
					
				}
			},'->',
			{
				iconCls : 'icon-import',
				text: 'Import Deatails',
				handler: function(){ 
						
			 	}
			},
/*
			{
				iconCls: 'icon-view-tree',
				text: 'Show List',
				handler: function(){ 
						var position  = Ext.getCmp(config.win_id).getPosition();
						var y_offset = Ext.getCmp(config.win_id).getSize().height;
						var x_offset = Ext.getCmp(config.win_id).getSize().width;
											
						var win = new Ext.Window({
							id : 'task_list_win',
							title : 'Tasks List',
							iconCls : 'icon-view-tree',
							width:  app.desktop.getWinWidth()*0.2,
	            			height: app.desktop.getWinHeight()*0.6,
							items : [
								new Mashup.Notes()
							]	
						});
						
						win.setPosition(position[0]-app.desktop.getWinWidth()*0.18, position[1]);
					    win.show.defer(500, win);
			 	}
			},

*/			{
				iconCls: 'icon-view-detailed',
				text: 'Show Notes',
				handler: function(){ 
						var position  = Ext.getCmp(config.win_id).getPosition();
						var y_offset = Ext.getCmp(config.win_id).getSize().height;
						var x_offset = Ext.getCmp(config.win_id).getSize().width;
						var notes = new Mashup.Notes();					
						var win = new Ext.Window({
							id : 'notes_win',
							iconCls : 'icon-view-detailed',
							title : 'Task Notes',
							width:  app.desktop.getWinWidth()*0.23,
	            			height: app.desktop.getWinHeight()*0.6,
							items : [notes]	
						});
						
						notes.loadRecords();
						
						win.setPosition(position[0]+x_offset, position[1]);
					    win.show.defer(500, win);
			 	}
			}
		]
	});
	
	this.subject = new Ext.form.TextField({
		fieldLabel: 'Task Subject',
        name: 'title',
        anchor: '100%'
    });
		
	this.dueDate = new Ext.form.DateField({
		fieldLabel: 'Due Date',
		name: 'dueDate',
		width: 135,
		format: 'm/d/Y'
	});
	

	this.list = new ListSelector({
        fieldLabel: 'Task List',
		name: 'listId',
		store: tx.data.categorylists,
		anchor: '100%'
    });
	
	this.list.on('render', function(){
		var tp = Ext.getCmp('tasks_mashup');
		this.menu.on('beforeshow', function(m){
			tp.list.tree.setWidth(Math.max(180, tp.list.getSize().width));
		});
	});

		
	this.hasReminder = new Ext.form.Checkbox({
		boxLabel: 'Reminder:',
		checked: false
	});
	
	this.reminder = new Ext.ux.form.DateTime({
		name: 'reminder',
		disabled: true,
		timeFormat: 'g:i A',
		dateFormat: 'm/d/Y',
		timeConfig: {
			//tpl: opener.Templates.timeField,
			listClass:'x-combo-list-small',
			maxHeight:100
		}
	});
	
	this.description = new Ext.form.HtmlEditor({
        hideLabel: true,
        name: 'description',
        anchor: '100% -95',  // anchor width by percentage and height by raw adjustment
        onEditorEvent : function(e){
	        var t;
	        if(e.browserEvent.type == 'mousedown' && (t = e.getTarget('a', 3))){
	            t.target = '_blank';
	        }
	        this.updateToolbar();
	    }
    });
	
	
	
	this.form = new Ext.form.FormPanel({
		region:'center',
        baseCls: 'x-plain',
        labelWidth: 75,
        margins:'10 10 5 10',
		
		buttonAlign: 'right',
		minButtonWidth: 80,
		buttons:[{
			text: 'Save',
			handler: function(){
				var tp = Ext.getCmp('tasks_mashup');
				if(tp.validate()) {
					tp.saveData();
					if(Ext.getCmp('notes_win'))
						Ext.getCmp('notes_win').close();
					Ext.getCmp(config.win_id).close();
				}
			}
		},{
			text: 'Cash Note',
			handler: function(){ 
					Ext.getCmp('note_tabs').setActiveTab( 'cash_note_tab' ); 
				}
		},{
			text: 'Close Note',
			handler: function(){ 
					if(Ext.getCmp('notes_win'))
						Ext.getCmp('notes_win').close();
					
					Ext.getCmp(config.win_id).close(); 
				}
		}],
				
		
        items: [
		this.subject,{
			layout: 'column',
			anchor: '100%',
			baseCls: 'x-plain',
			items: [{
				width: 250,
				layout: 'form',
				baseCls: 'x-plain',
				items: this.dueDate
			}, {
				columnWidth: 1,
				layout: 'form',
				baseCls: 'x-plain',
				labelWidth:55,
				items: this.list
			}]
		},{
			xtype:'box',
			autoEl: {cls:'divider'}
		},{
			layout: 'column',
			anchor: '100%',
			baseCls: 'x-plain',
			items: [{
				width: 80,
				layout: 'form',
				baseCls: 'x-plain',
				hideLabels: true,
				items: this.hasReminder
			}, {
				columnWidth: 1,
				layout: 'form',
				baseCls: 'x-plain',
				hideLabels: true,
				items: this.reminder
			}]
		}, 	this.description
		]
    });
	
	Mashup.CashForm.superclass.constructor.call(this, {
		title: 'Cash Note',
		layout:'border',
		id : 'cash_mashup',
		items:[this.tb, this.form]
	});
	
	this.task = this.getTask();
	
	if(this.task && this.task.data.completedDate){
		this.publish( '/desktop/notify',{
            title: 'Task Completed',
            iconCls: 'icon-kwrite',
            html: 'This task was completed on ' + this.task.data.completedDate.format('l, F d, Y')
        });
	}	
	
	this.hasReminder.on('check', function(cb, checked){
		var tp = Ext.getCmp('tasks_mashup');
		tp.reminder.setDisabled(!checked);
		if(tp.checked && !tp.reminder.getValue()){
			tp.reminder.setValue(tx.data.getDefaultReminder(tp.getTask()));
		}
	});
	
	this.refreshData.defer(100);
	this.subject.focus();
}

Ext.extend(Mashup.CashForm, Ext.Panel, {
	
	refreshData :function (){
		var tm = Ext.getCmp('tasks_mashup');
		try {
			if (!tm.isNew) {
				var task = tm.getTask();
				tm.hasReminder.setValue(task.data.reminder);
				tm.form.getForm().loadRecord(task);
				tm.setCompleted(task.data.completed);
			}
		}catch(e){
			var f = e;
		}
	},
	
	saveData : function(){
		var task;
		if(this.isNew){
			task = tx.data.tasks.createTask(
						this.subject.getValue(), 
						this.list.getRawValue(), 
						this.dueDate.getValue(), 
						this.description.getValue(),
						this.completed
					);
		}else{
			task = this.getTask();
			task.set('completed', this.completed);
		}
		if(!this.hasReminder.getValue()){
			this.reminder.setValue('');
		}
		this.form.getForm().updateRecord(task);
		tx.data.tasks.updateTask(task.data);
	},
	
	 setCompleted : function(value){
	 	var tp = Ext.getCmp('tasks_mashup');
		tp.completed = value;
		var cplBtn = Ext.getCmp('cpl-btn');
		if (tp.completed) {
			cplBtn.setText('Mark Balanced');
			cplBtn.setIconClass('icon-mark-active');
			tp.hasReminder.disable();
			tp.reminder.disable();
		}
		else {
			cplBtn.setText('Mark Reconciled');
			cplBtn.setIconClass('icon-mark-complete');
			tp.hasReminder.enable();
			tp.reminder.setDisabled(!tp.hasReminder.checked);
		}
	},
	
	 validate: function(){
	 	var tp = Ext.getCmp('tasks_mashup');
		if(Ext.isEmpty(tp.subject.getValue(), false)){
			    Ext.Msg.alert('Warning', 'Unable to save changes. A subject is required.', function(){
				tp.subject.focus();
			});
			return false;
		}
		return true;
	},
	
	getTask : function(){
		var t;
		if (!this.isNew) {
			t = tx.data.tasks.lookup(this.taskId);
			if(t){
				//workaround WebKit cross-frame date issue
				fixDateMember(t.data, 'completedDate');
				fixDateMember(t.data, 'reminder');
				fixDateMember(t.data, 'dueDate');
			}
		}
		
		return t;
	}
});

Mashup.CollaborateForm = function (config){
	Ext.apply(config);
	
	this.isNew = !config.taskId;
	this.balanced = false;
	this.currentId++;
	this.cashId = config.cashId || "";
	
	this.tb = new Ext.Toolbar({
		region: 'north',
		height:26,
		id:'main-tb-cash',
		items:[{
			id:'cpl-btn-cash', 
			iconCls: 'icon-mark-complete', 
			text: 'Mark Balanced',
			handler: function(){
				var tp = Ext.getCmp('cash_mashup');
				tp.setCompleted(!tp.completed);
				if(tp.completed) {
					this.publish( '/desktop/notify',{
			            title: 'Transaction Balanced',
			            iconCls: 'icon-kwrite',
			            html: 'This  money movement was balanced on ' + new Date().format('l, F d, Y')
			        });
				}
				if(tp.validate()) {
					(function(){
						tp.saveData();
						if (tp.completed) {
							if(Ext.getCmp('notes_win'))
								Ext.getCmp('notes_win').close();
							
							Ext.getCmp(config.win_id).close();
						}
					}).defer(250);
				}
			}
			},'-',
			{
				iconCls: 'icon-delete-task',
				text: 'Delete',
				handler: function(){
						var tp = Ext.getCmp('tasks_mashup');
						
						if(tp.validate()){	
							Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete this task?', function(btn){
							if(btn == 'yes'){
									var task = tp.getTask();
									tx.data.tasks.removeTask(task.data);
								}
							});
						}
					
				}
			},'->',
			{
				iconCls : 'icon-import',
				text: 'Import Deatails',
				handler: function(){ 
						
			 	}
			},
/*
			{
				iconCls: 'icon-view-tree',
				text: 'Show List',
				handler: function(){ 
						var position  = Ext.getCmp(config.win_id).getPosition();
						var y_offset = Ext.getCmp(config.win_id).getSize().height;
						var x_offset = Ext.getCmp(config.win_id).getSize().width;
											
						var win = new Ext.Window({
							id : 'task_list_win',
							title : 'Tasks List',
							iconCls : 'icon-view-tree',
							width:  app.desktop.getWinWidth()*0.2,
	            			height: app.desktop.getWinHeight()*0.6,
							items : [
								new Mashup.Notes()
							]	
						});
						
						win.setPosition(position[0]-app.desktop.getWinWidth()*0.18, position[1]);
					    win.show.defer(500, win);
			 	}
			},

*/			{
				iconCls: 'icon-view-detailed',
				text: 'Show Notes',
				handler: function(){ 
						var position  = Ext.getCmp(config.win_id).getPosition();
						var y_offset = Ext.getCmp(config.win_id).getSize().height;
						var x_offset = Ext.getCmp(config.win_id).getSize().width;
						var notes = new Mashup.Notes();					
						var win = new Ext.Window({
							id : 'notes_win',
							iconCls : 'icon-view-detailed',
							title : 'Task Notes',
							width:  app.desktop.getWinWidth()*0.23,
	            			height: app.desktop.getWinHeight()*0.6,
							items : [notes]	
						});
						
						notes.loadRecords();
						
						win.setPosition(position[0]+x_offset, position[1]);
					    win.show.defer(500, win);
			 	}
			}
		]
	});
	
	this.subject = new Ext.form.TextField({
		fieldLabel: 'Task Subject',
        name: 'title',
        anchor: '100%'
    });
		
	this.dueDate = new Ext.form.DateField({
		fieldLabel: 'Due Date',
		name: 'dueDate',
		width: 135,
		format: 'm/d/Y'
	});
	

	this.list = new ListSelector({
        fieldLabel: 'Task List',
		name: 'listId',
		store: tx.data.collaboratelists,
		anchor: '100%'
    });
	
	this.list.on('render', function(){
		var tp = Ext.getCmp('tasks_mashup');
		this.menu.on('beforeshow', function(m){
			tp.list.tree.setWidth(Math.max(180, tp.list.getSize().width));
		});
	});

		
	this.hasReminder = new Ext.form.Checkbox({
		boxLabel: 'Reminder:',
		checked: false
	});
	
	this.reminder = new Ext.ux.form.DateTime({
		name: 'reminder',
		disabled: true,
		timeFormat: 'g:i A',
		dateFormat: 'm/d/Y',
		timeConfig: {
			//tpl: opener.Templates.timeField,
			listClass:'x-combo-list-small',
			maxHeight:100
		}
	});
	
	this.description = new Ext.form.HtmlEditor({
        hideLabel: true,
        name: 'description',
        anchor: '100% -95',  // anchor width by percentage and height by raw adjustment
        onEditorEvent : function(e){
	        var t;
	        if(e.browserEvent.type == 'mousedown' && (t = e.getTarget('a', 3))){
	            t.target = '_blank';
	        }
	        this.updateToolbar();
	    }
    });
	
	
	
	this.form = new Ext.form.FormPanel({
		region:'center',
        baseCls: 'x-plain',
        labelWidth: 75,
        margins:'10 10 5 10',
		
		buttonAlign: 'right',
		minButtonWidth: 80,
		buttons:[{
			text: 'Save',
			handler: function(){
				var tp = Ext.getCmp('tasks_mashup');
				if(tp.validate()) {
					tp.saveData();
					if(Ext.getCmp('notes_win'))
						Ext.getCmp('notes_win').close();
					Ext.getCmp(config.win_id).close();
				}
			}
		},{
			text: 'Cash Note',
			handler: function(){ 
					Ext.getCmp('note_tabs').setActiveTab( 'cash_note_tab' ); 
				}
		},{
			text: 'Close Note',
			handler: function(){ 
					if(Ext.getCmp('notes_win'))
						Ext.getCmp('notes_win').close();
					
					Ext.getCmp(config.win_id).close(); 
				}
		}],
				
		
        items: [
		this.subject,{
			layout: 'column',
			anchor: '100%',
			baseCls: 'x-plain',
			items: [{
				width: 250,
				layout: 'form',
				baseCls: 'x-plain',
				items: this.dueDate
			}, {
				columnWidth: 1,
				layout: 'form',
				baseCls: 'x-plain',
				labelWidth:55,
				items: this.list
			}]
		},{
			xtype:'box',
			autoEl: {cls:'divider'}
		},{
			layout: 'column',
			anchor: '100%',
			baseCls: 'x-plain',
			items: [{
				width: 80,
				layout: 'form',
				baseCls: 'x-plain',
				hideLabels: true,
				items: this.hasReminder
			}, {
				columnWidth: 1,
				layout: 'form',
				baseCls: 'x-plain',
				hideLabels: true,
				items: this.reminder
			}]
		}, 	this.description
		]
    });
	
	Mashup.CashForm.superclass.constructor.call(this, {
		title: 'Collaborate Note',
		layout:'border',
		id : 'collaborate_mashup',
		items:[this.tb, this.form]
	});
	
	this.task = this.getTask();
	
	if(this.task && this.task.data.completedDate){
		this.publish( '/desktop/notify',{
            title: 'Task Completed',
            iconCls: 'icon-kwrite',
            html: 'This task was completed on ' + this.task.data.completedDate.format('l, F d, Y')
        });
	}	
	
	this.hasReminder.on('check', function(cb, checked){
		var tp = Ext.getCmp('tasks_mashup');
		tp.reminder.setDisabled(!checked);
		if(tp.checked && !tp.reminder.getValue()){
			tp.reminder.setValue(tx.data.getDefaultReminder(tp.getTask()));
		}
	});
	
	this.refreshData.defer(100);
	this.subject.focus();
}

Ext.extend(Mashup.CollaborateForm, Ext.Panel, {
	
	refreshData :function (){
		var tm = Ext.getCmp('tasks_mashup');
		try {
			if (!tm.isNew) {
				var task = tm.getTask();
				tm.hasReminder.setValue(task.data.reminder);
				tm.form.getForm().loadRecord(task);
				tm.setCompleted(task.data.completed);
			}
		}catch(e){
			var f = e;
		}
	},
	
	saveData : function(){
		var task;
		if(this.isNew){
			task = tx.data.tasks.createTask(
						this.subject.getValue(), 
						this.list.getRawValue(), 
						this.dueDate.getValue(), 
						this.description.getValue(),
						this.completed
					);
		}else{
			task = this.getTask();
			task.set('completed', this.completed);
		}
		if(!this.hasReminder.getValue()){
			this.reminder.setValue('');
		}
		this.form.getForm().updateRecord(task);
		tx.data.tasks.updateTask(task.data);
	},
	
	 setCompleted : function(value){
	 	var tp = Ext.getCmp('tasks_mashup');
		tp.completed = value;
		var cplBtn = Ext.getCmp('cpl-btn');
		if (tp.completed) {
			cplBtn.setText('Mark Balanced');
			cplBtn.setIconClass('icon-mark-active');
			tp.hasReminder.disable();
			tp.reminder.disable();
		}
		else {
			cplBtn.setText('Mark Reconciled');
			cplBtn.setIconClass('icon-mark-complete');
			tp.hasReminder.enable();
			tp.reminder.setDisabled(!tp.hasReminder.checked);
		}
	},
	
	 validate: function(){
	 	var tp = Ext.getCmp('tasks_mashup');
		if(Ext.isEmpty(tp.subject.getValue(), false)){
			    Ext.Msg.alert('Warning', 'Unable to save changes. A subject is required.', function(){
				tp.subject.focus();
			});
			return false;
		}
		return true;
	},
	
	getTask : function(){
		var t;
		if (!this.isNew) {
			t = tx.data.tasks.lookup(this.taskId);
			if(t){
				//workaround WebKit cross-frame date issue
				fixDateMember(t.data, 'completedDate');
				fixDateMember(t.data, 'reminder');
				fixDateMember(t.data, 'dueDate');
			}
		}
		
		return t;
	}
});



