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

GCalendarPanel = function(config){
        Ext.apply(this, config);
        
		GCalendarPanel.superclass.constructor.call(this);        
		google.setOnLoadCallback(this.getMyFeed);
};

Ext.extend(GCalendarPanel,	Ext.Panel, {
	refresh :  function(){
		this.setHtml(this.defaultSrc);
	},
	
	getMyFeed : function(){
		// init the Google data JS client library with an error handler
		  google.gdata.client.init(this.handleGDError);
		  // load the code.google.com developer calendar
		  this.loadDeveloperCalendar();

	},
	
	/**
	 * Loads the Google Developers Event Calendar
	 */
	loadDeveloperCalendar : function () {
	  this.loadCalendarByAddress('i.housekeeping@google.com');
	},

	/**
	 * Determines the full calendarUrl based upon the calendarAddress
	 * argument and calls loadCalendar with the calendarUrl value.
	 *
	 * @param {string} calendarAddress is the email-style address for the calendar
	 */ 
	loadCalendarByAddress : function (calendarAddress) {
	  var calendarUrl = 'http://www.google.com/calendar/feeds/' +
	                    calendarAddress + 
	                    '/public/full';
	  this.loadCalendar(calendarUrl);
	},
	
	/**
	 * Uses Google data JS client library to retrieve a calendar feed from the specified
	 * URL.  The feed is controlled by several query parameters and a callback 
	 * function is called to process the feed results.
	 *
	 * @param {string} calendarUrl is the URL for a public calendar feed
	 */  
	loadCalendar : function (calendarUrl) {
	  var service = new 
	      google.gdata.calendar.CalendarService('gdata-js-client-samples-simple');
	  var query = new google.gdata.calendar.CalendarEventQuery(calendarUrl);
	  query.setOrderBy('starttime');
	  query.setSortOrder('ascending');
	  query.setFutureEvents(true);
	  query.setSingleEvents(true);
	  query.setMaxResults(10);
	
	  service.getEventsFeed(query, this.listEvents, this.handleGDError);
	},
	
	/**
	 * Callback function for the Google data JS client library to call when an error
	 * occurs during the retrieval of the feed.  Details available depend partly
	 * on the web browser, but this shows a few basic examples. In the case of
	 * a privileged environment using ClientLogin authentication, there may also
	 * be an e.type attribute in some cases.
	 *
	 * @param {Error} e is an instance of an Error 
	 */
	handleGDError: function (e) {
	  document.getElementById('jsSourceFinal').setAttribute('style', 
	      'display:none');
	  if (e instanceof Error) {
	    /* alert with the error line number, file and message */
	    alert('Error at line ' + e.lineNumber +
	          ' in ' + e.fileName + '\n' +
	          'Message: ' + e.message);
	    /* if available, output HTTP error code and status text */
	    if (e.cause) {
	      var status = e.cause.status;
	      var statusText = e.cause.statusText;
	      alert('Root cause: HTTP error ' + status + ' with status text of: ' + 
	            statusText);
	    }
	  } else {
	    alert(e.toString());
	  }
	},

	/**
	 * Callback function for the Google data JS client library to call with a feed 
	 * of events retrieved.
	 *
	 * Creates an unordered list of events in a human-readable form.  This list of
	 * events is added into a div called 'events'.  The title for the calendar is
	 * placed in a div called 'calendarTitle'
	 *
	 * @param {json} feedRoot is the root of the feed, containing all entries 
	 */ 
	listEvents : function (feedRoot) {
	  var entries = feedRoot.feed.getEntries();
	  var eventDiv = document.getElementById('events');
	  if (eventDiv.childNodes.length > 0) {
	    eventDiv.removeChild(eventDiv.childNodes[0]);
	  }	  
	  /* create a new unordered list */
	  var ul = document.createElement('ul');
	  /* set the calendarTitle div with the name of the calendar */
	  document.getElementById('calendarTitle').innerHTML = 
	    "Calendar: " + feedRoot.feed.title.$t;
	  /* loop through each event in the feed */
	  var len = entries.length;
	  for (var i = 0; i < len; i++) {
	    var entry = entries[i];
	    var title = entry.getTitle().getText();
	    var startDateTime = null;
	    var startJSDate = null;
	    var times = entry.getTimes();
	    if (times.length > 0) {
	      startDateTime = times[0].getStartTime();
	      startJSDate = startDateTime.getDate();
	    }
	    var entryLinkHref = null;
	    if (entry.getHtmlLink() != null) {
	      entryLinkHref = entry.getHtmlLink().getHref();
	    }
	    var dateString = (startJSDate.getMonth() + 1) + "/" + startJSDate.getDate();
	    if (!startDateTime.isDateOnly()) {
	      dateString += " " + startJSDate.getHours() + ":" + 
	          padNumber(startJSDate.getMinutes());
	    }
	    var li = document.createElement('li');
	
	    /* if we have a link to the event, create an 'a' element */
	    if (entryLinkHref != null) {
	      entryLink = document.createElement('a');
	      entryLink.setAttribute('href', entryLinkHref);
	      entryLink.appendChild(document.createTextNode(title));
	      li.appendChild(entryLink);
	      li.appendChild(document.createTextNode(' - ' + dateString));
	    } else {
	      li.appendChild(document.createTextNode(title + ' - ' + dateString));
	    }	    
	
	    /* append the list item onto the unordered list */
	    ul.appendChild(li);
	  }
	  eventDiv.appendChild(ul);
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




