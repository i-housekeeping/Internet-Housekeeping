Times = new Ext.data.SimpleStore({
	fields: ['time', 'time_name'],
	data: [['12:00 AM','12:00 AM'],
	['12:15 AM','12:15 AM'],
    ['12:30 AM','12:30 AM'],
    ['12:45 AM','12:45 AM'],
    ['1:00 AM','1:00 AM'],
    ['1:15 AM','1:15 AM'],
    ['1:30 AM','1:30 AM'],
    ['1:45 AM','1:45 AM'],
    ['2:00 AM','2:00 AM'],
    ['2:15 AM','2:15 AM'],
    ['2:30 AM','2:30 AM'],
    ['2:45 AM','2:45 AM'],
    ['3:00 AM','3:00 AM'],
    ['3:15 AM','3:15 AM'],
    ['3:30 AM','3:30 AM'],
    ['3:45 AM','3:45 AM'],
    ['4:00 AM','4:00 AM'],
    ['4:15 AM','4:15 AM'],
    ['4:30 AM','4:30 AM'],
    ['4:45 AM','4:45 AM'],
    ['5:00 AM','5:00 AM'],
    ['5:15 AM','5:15 AM'],
    ['5:30 AM','5:30 AM'],
    ['5:45 AM','5:45 AM'],
    ['6:00 AM','6:00 AM'],
    ['6:15 AM','6:15 AM'],
    ['6:30 AM','6:30 AM'],
    ['6:45 AM','6:45 AM'],
    ['7:00 AM','7:00 AM'],
    ['7:15 AM','7:15 AM'],
    ['7:30 AM','7:30 AM'],
    ['7:45 AM','7:45 AM'],
    ['8:00 AM','8:00 AM'],
    ['8:15 AM','8:15 AM'],
    ['8:30 AM','8:30 AM'],
    ['8:45 AM','8:45 AM'],
    ['9:00 AM','9:00 AM'],
    ['9:15 AM','9:15 AM'],
    ['9:30 AM','9:30 AM'],
    ['9:45 AM','9:45 AM'],
    ['10:00 AM','10:00 AM'],
    ['10:15 AM','10:15 AM'],
    ['10:30 AM','10:30 AM'],
    ['10:45 AM','10:45 AM'],
    ['11:00 AM','11:00 AM'],
    ['11:15 AM','11:15 AM'],
    ['11:30 AM','11:30 AM'],
    ['11:45 AM','11:45 AM'],
    ['12:00 PM','12:00 PM'],
    ['12:15 PM','12:15 PM'],
    ['12:30 PM','12:30 PM'],
    ['12:45 PM','12:45 PM'],
    ['1:00 PM','1:00 PM'],
    ['1:15 PM','1:15 PM'],
    ['1:30 PM','1:30 PM'],
    ['1:45 PM','1:45 PM'],
    ['2:00 PM','2:00 PM'],
    ['2:15 PM','2:15 PM'],
    ['2:30 PM','2:30 PM'],
    ['2:45 PM','2:45 PM'],
    ['3:00 PM','3:00 PM'],
    ['3:15 PM','3:15 PM'],
    ['3:30 PM','3:30 PM'],
    ['3:45 PM','3:45 PM'],
    ['4:00 PM','4:00 PM'],
    ['4:15 PM','4:15 PM'],
    ['4:30 PM','4:30 PM'],
    ['4:45 PM','4:45 PM'],
    ['5:00 PM','5:00 PM'],
    ['5:15 PM','5:15 PM'],
    ['5:30 PM','5:30 PM'],
    ['5:45 PM','5:45 PM'],
    ['6:00 PM','6:00 PM'],
    ['6:15 PM','6:15 PM'],
    ['6:30 PM','6:30 PM'],
    ['6:45 PM','6:45 PM'],
    ['7:00 PM','7:00 PM'],
    ['7:15 PM','7:15 PM'],
    ['7:30 PM','7:30 PM'],
    ['7:45 PM','7:45 PM'],
    ['8:00 PM','8:00 PM'],
    ['8:15 PM','8:15 PM'],
    ['8:30 PM','8:30 PM'],
    ['8:45 PM','8:45 PM'],
    ['9:00 PM','9:00 PM'],
    ['9:15 PM','9:15 PM'],
    ['9:30 PM','9:30 PM'],
    ['9:45 PM','9:45 PM'],
    ['10:00 PM','10:00 PM'],
    ['10:15 PM','10:15 PM'],
    ['10:30 PM','10:30 PM'],
    ['10:45 PM','10:45 PM'],
    ['11:00 PM','11:00 PM'],
    ['11:15 PM','11:15 PM'],
    ['11:30 PM','11:30 PM'],
    ['11:45 PM','11:45 PM']]
});
Notes = function( config) {

    Ext.apply(this, config);

	this.store = tx.data.notes;

	this.columns = [{
					   id: 'story',
					   header: "Note",
					   dataIndex: 'note',
					   width: 250
					   ,renderer: Notes.NotesRenderers.notes
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
					   ,renderer: Notes.NotesRenderers.lastPost
				}];

    Notes.superclass.constructor.call(this, {
        id:'topic-grid',
        frame:true,
		title: 'Task Blog',
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


Ext.extend(Notes, Ext.grid.GridPanel, {

    loadRecords : function(notableId) {
        this.store.init();
    }
});


Notes.NotesRenderers = {
    note : function(value, p, record){
        return String.format(
                '<div class="topic"><b>{0}</b><hr></hr><span class="post-date">{1}</span></div>',
                record.data.title, record.data.last_update);
    },

    lastPost : function(value, p, r){
        return String.format('by {0}',r.data.user);
    }
};

/**
 *
 * @class GCalendarPanel
 * @extends Ext.Panel
 */

Ext.override(Ext.Panel, {
	setHtml : function(html){
		if(this.el){
			this.body.update(html);
		}else{
			this.html = html;
		}
	}
});

GCalendarPanel = Ext.extend(Ext.Panel, {

    /**
    * Cached Iframe.src url to use for refreshes. Overwritten every time setSrc() is called unless "discardUrl" param is set to true.
    * @type String/Function (which will return a string URL when invoked)
     */
    defaultSrc  :null,
    bodyStyle   :{height:'100%',width:'100%', position:'relative'},

    /**
    * @cfg {String/Object} frameStyle
    * Custom CSS styles to be applied to the ux.ManagedIframe element in the format expected by {@link Ext.Element#applyStyles}
    * (defaults to CSS Rule {overflow:'auto'}).
    */
    frameStyle  : {overflow:'auto'},
    frameConfig : null,
    hideMode    : !Ext.isIE?'nosize':'display',
    //shimCls     : Ext.ux.ManagedIFrame.Manager.shimCls,
    shimUrl     : null,
    loadMask    : false,
    stateful    : false,
    animCollapse: Ext.isIE && Ext.enableFx,
    autoScroll  : false,
    closable    : true, /* set True by default in the event a site times-out while loadMasked */
    ctype       : "GCalendarPanel",
    showLoadIndicator : false,

    unsupportedText : 'Inline frames are NOT enabled\/supported by your browser.'

   ,initComponent : function(){


         this.autoScroll = false; //Force off as the Iframe manages this
         this.items = null;

         //setup stateful events if not defined
         if(this.stateful !== false){
             this.stateEvents || (this.stateEvents = ['documentloaded']);
         }
		 
		 GCalendarPanel.superclass.initComponent.call(this);

         this.monitorResize || (this.monitorResize = this.fitToParent);

         
    },

    doLayout   :  function(){
        //only resize (to Parent) if the panel is NOT in a layout.
        //parentNode should have {style:overflow:hidden;} applied.
        if(this.fitToParent && !this.ownerCt){
            var pos = this.getPosition(), size = (Ext.get(this.fitToParent)|| this.getEl().parent()).getViewSize();
            this.setSize(size.width - pos[0], size.height - pos[1]);
        }
        GCalendarPanel.superclass.doLayout.apply(this,arguments);

    } ,
    
	refresh :  function(){
		this.setHtml(this.defaultSrc);
	}
});



Ext.reg('gcakendarpanel',GCalendarPanel);

TaskForm = function (config){
	Ext.apply(config);
	
	this.isNew = !config.taskId;
	this.completed = false;
	this.currentId++;
	this.taskId = config.taskId || "";
	this.config = config;
	
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
			},
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

*/			'->',{
						
						iconCls : 'bloney-icon',
						text : 'Add Money',
						handler : function(){}
					},'-',{
						
						iconCls : 'bookmarks-icon',
						text : 'Add Bookmark',
						handler : function(){
							Bookmarks.Favorits.createMashupWnd();
						}
			}/*
,{
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
*/
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
		format: 'd/m/Y'
	});
	

	this.list = new ListSelector({
        fieldLabel: 'Task List',
		name: 'listId',
		store: tx.data.tasklists,
		anchor: '100%',
		root_listType:'TASK',
		root_text: "Ecco Tasks"
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
		dateFormat: 'd/m/Y',
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
					Ext.getCmp('wind_task').close();
				}
			}
		},{
			text: 'Close',
			handler: function(){
				Ext.getCmp('wind_task').close();
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
	
	TaskForm.superclass.constructor.call(this, {
		title: 'Task Details',
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

Ext.extend(TaskForm, Ext.Panel, {
	
	refreshData :function (){
		var tm = Ext.getCmp('tasks_mashup');
		try {
			if (!tm.isNew) {
				var task = tm.getTask();
				tm.hasReminder.setValue(task.data.reminder);
				tm.form.getForm().loadRecord(task);
				tm.setCompleted(task.data.completed);
				Ext.getCmp('calendar').reset();
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
						this.dueDate.getValue().format('d-m-Y H:i:s'), 
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




