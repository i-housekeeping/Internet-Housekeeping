
/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.BLANK_IMAGE_URL = 'images/s.gif';




/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

// In AIR, XTemplates must be created at load time
Templates = {
	categoryCombo: new Ext.XTemplate(
		'<tpl for="."><div class="x-combo-list-item">{listName}</div></tpl>'
	),
	timeField: new Ext.XTemplate(
		'<tpl for="."><div class="x-combo-list-item">{text}</div></tpl>'
	),

	gridHeader : new Ext.Template(
        '<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
        '<thead><tr class="x-grid3-hd-row">{cells}</tr></thead>',
        '<tbody><tr class="new-task-row">',
            '<td><div id="new-task-icon"></div></td>',
            '<td><div class="x-small-editor" id="new-task-title"></div></td>',
            '<td><div class="x-small-editor" id="new-task-cat"></div></td>',
            '<td><div class="x-small-editor" id="new-task-due"></div></td>',
        '</tr></tbody>',
        "</table>"
    )
};



/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

// Grid column plugin that does the complete/active button in the left-most column
CompleteColumn = function(){
    var grid;

    function getRecord(t){
        var index = grid.getView().findRowIndex(t);
        return grid.store.getAt(index);
    }

    function onMouseDown(e, t){
        if(Ext.fly(t).hasClass('task-check')){
            e.stopEvent();
            var record = getRecord(t);
            record.set('completed', !record.data.completed);
			tx.data.tasks.updateTask(record.data);
            grid.store.applyFilter();
        }
    }

    function onMouseOver(e, t){
        if(Ext.fly(t).hasClass('task-check')){
            Ext.fly(t.parentNode).addClass('task-check-over');
        }
    }

    function onMouseOut(e, t){
        if(Ext.fly(t).hasClass('task-check')){
            Ext.fly(t.parentNode).removeClass('task-check-over');
        }
    }

    Ext.apply(this, {
        width: 22,
        header: '<div class="task-col-hd"></div>',
        fixed: true,
		menuDisabled: true,
        id: 'task-col',
        renderer: function(){
            return '<div class="task-check"></div>';
        },
        init : function(xg){
            grid = xg;
            grid.on('render', function(){
                var view = grid.getView();
                view.mainBody.on('mousedown', onMouseDown);
                view.mainBody.on('mouseover', onMouseOver);
                view.mainBody.on('mouseout', onMouseOut);
            });
        }
    });
};


ReminderColumn = function(){
    var grid, menu, record;

	function getRecord(t){
        var index = grid.getView().findRowIndex(t);
        return grid.store.getAt(index);
    }
	
	function onMenuCheck(item){
		if(item.reminder === false){
			record.set('reminder', '');
		}else{
			var s = record.data.dueDate ? record.data.dueDate.clearTime(true) : new Date().clearTime();
			s = s.add('mi', Ext.state.Manager.get('defaultReminder'));
			s = s.add('mi', item.reminder*-1);
			record.set('reminder', s);
		}
		tx.data.tasks.updateTask(record.data);
	}

	function getMenu(){
		if(!menu){
			menu = new Ext.menu.Menu({
				plain: true,
				items: [{
					text: 'No Reminder',
					reminder: false,
					handler: onMenuCheck
				},'-',{
					text: 'On the Due Date',
					reminder: 0,
					handler: onMenuCheck
				},'-',{
					text: '1 day before',
					reminder: 24*60,
					handler: onMenuCheck
				},{
					text: '2 days before',
					reminder: 48*60,
					handler: onMenuCheck
				},{
					text: '3 days before',
					reminder: 72*60,
					handler: onMenuCheck
				},{
					text: '1 week before',
					reminder: 7*24*60,
					handler: onMenuCheck
				},{
					text: '2 weeks before',
					reminder: 14*24*60,
					handler: onMenuCheck
				},'-',{
					text: 'Set Default Time...',
					handler: function(){
						Ext.WindowMgr.getPrefWindow().show();
					}
				}]
			});
		}
		return menu;
	}

    function onMouseDown(e, t){
        if(Ext.fly(t).hasClass('reminder')){
			e.stopEvent();
            record = getRecord(t);
			if (!record.data.completed) {
				var rmenu = getMenu();
				rmenu.show(t, 'tr-br?');
			}
        }
    }

    function onMouseOver(e, t){
        if(Ext.fly(t).hasClass('reminder')){
            Ext.fly(t.parentNode).addClass('reminder-over');
        }
    }

    function onMouseOut(e, t){
        if(Ext.fly(t).hasClass('reminder')){
            Ext.fly(t.parentNode).removeClass('reminder-over');
        }
    }

    Ext.apply(this, {
        width: 26,
        header: '<div class="reminder-col-hd"></div>',
        fixed: true,
        id: 'reminder-col',
		menuDisabled: true,
        dataIndex:'reminder',
        renderer: function(v){
			return '<div class="reminder '+(v ? 'reminder-active' : '')+'"></div>';
        },
        init : function(xg){
            grid = xg;
            grid.on('render', function(){
                var view = grid.getView();
                view.mainBody.on('contextmenu', onMouseDown);
                view.mainBody.on('mousedown', onMouseDown);
                view.mainBody.on('mouseover', onMouseOver);
                view.mainBody.on('mouseout', onMouseOut);
            });
        }
    });
};
/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

TaskGrid = function(){
	
	// custom columns
	var completeColumn = new CompleteColumn();
	var reminderColumn = new ReminderColumn();
	 var ntDue = this.ntDue = new Ext.form.DateField(  {
				id:'dueDate',
                header: "Due Date",
				value: new Date(),
                width: 150,
                sortable: true,
				format : "d/m/Y",
                renderer: Ext.util.Format.dateRenderer('D d/m/Y'),
                dataIndex: 'dueDate',
                groupRenderer: Ext.util.Format.createTextDateRenderer(),
                groupName: 'Due',
                editor: new Ext.form.DateField({
                    format : "d/m/Y"
                })
            });
	
	TaskGrid.superclass.constructor.call(this, {
		id:'tasks-grid',
        store: tx.data.tasks,
        sm: new Ext.grid.RowSelectionModel({moveEditorOnEnter: false}),
        clicksToEdit: 'auto',
        enableColumnHide:false,
        enableColumnMove:false,
		autoEncode: true,
        title:'All Tasks',
        iconCls:'icon-folder',
        region:'center',
        plugins: [completeColumn, reminderColumn],
		margins:'3 3 3 0',
        columns: [
            completeColumn,
            {
                header: "Task",
                width:400,
                sortable: true,
                dataIndex: 'title',
                id:'task-title',
                editor: new Ext.form.TextField({
                    allowBlank: false
                })
            },
            {
                header: "Original List",
                width:150,
                sortable: true,
                dataIndex: 'listId',
                editor: new ListSelector({
			        store:tx.data.tasklists,
					root_listType:'TASK',
					root_text: "Ecco Tasks"
			    }),
				renderer : function(v){
					return tx.data.tasklists.getName(v);
				}
            },
            ntDue,
			reminderColumn
        ],

        view: new TaskView()
	});
	
	// Keep the visible date groups in the grid accurate
	Ext.TaskMgr.start({
		run: function(){
			var col = this.getColumnModel().getColumnById('dueDate');
			if(col.groupRenderer.date.getTime() != new Date().clearTime().getTime()){
				col.groupRenderer = Ext.util.Format.createTextDateRenderer();
				tx.data.tasks.applyGrouping();
			}
		},
		interval: 60000,
		scope: this
	});
	
	this.on('celldblclick', this.onCellDblClick, this);
	this.on('rowcontextmenu', this.onRowContext, this);
	this.on('afteredit', this.onAfterEdit, this);
	this.getColumnModel().on('headerchange', this.onDateChange, this);
};

Ext.extend(TaskGrid, Ext.grid.EditorGridPanel, {
	onDateChange : function(f, index, oldValue){
		var ids = 4;
	},
	
	onCellDblClick: function(grid, rowIndex, columnIndex, e){
		clearTimeout(this.autoEditTimer); // allow dbl click without starting edit
		var id = grid.getStore().getAt(rowIndex).id;
		
		Ext.WindowMgr.getTaskWindow(id).show();
	},

    // private
    onAutoEditClick : function(e, t){
		clearTimeout(this.autoEditTimer);
        if(e.button !== 0){
            return;
        }
        var row = this.view.findRowIndex(t);
        var col = this.view.findCellIndex(t);
        if(row !== false && col !== false){
        	if(this.selModel.isSelected(row) && this.selModel.getCount() === 1){
				this.autoEditTimer = this.startEditing.defer(300, this, [row, col]);
            }
        }
    },
	
	onAfterEdit : function(e){
        tx.data.tasks.updateTask(e.record.data);
		
    },
	
	onRowContext : function(grid, row, e){
		var actv_action;
		if(this.store.data.items[row].data.completed == true)
		  	actv_action = tx.actions.active; 
		else 
			actv_action = tx.actions.complete;
        //if(!this.menu){ // create context menu on first right click
            this.menu = new Ext.menu.Menu({
                id:'tasks-ctx',
				listWidth: 200,
                items: [{
                    text:'Open',
                    scope: this,
                    handler:function(){
							Ext.each(this.selModel.getSelections(), function(r){
								Ext.WindowMgr.getTaskWindow(r.id).show();
							});
                    	}
                	},'-',
					actv_action,
					tx.actions.deleteTask
                ]
            });
        //}
		if(!this.selModel.isSelected(row)){
			this.selModel.selectRow(row);
		}
		
		this.menu.showAt(e.getXY());
    }
})


TaskView = Ext.extend(Ext.grid.GroupingView, {
	forceFit:true,
    ignoreAdd: true,
    emptyText: 'There are no tasks to show in this list.',

    templates: {
        header: Templates.gridHeader
    },
    getRowClass : function(r){
        var d = r.data;
        if(d.completed){
            return 'task-completed';
        }
        if(d.dueDate && d.dueDate.getTime() < new Date().clearTime().getTime()){
            return 'task-overdue';
        }
        return '';
    }
});


TaskHeader = function(grid){
	grid.on('resize', syncFields);
	grid.on('columnresize', syncFields);
		
    // The fields in the grid's header
    var ntTitle = this.ntTitle = new Ext.form.TextField({
        renderTo: 'new-task-title',
        emptyText: 'Add a task...'
    });

    var ntCat = this.ntCat = new ListSelector({
        renderTo: 'new-task-cat',
        disabled:true,
        store:tx.data.tasklists,
		listenForLoad: true,
		root_listType:'TASK',
		root_text: "Ecco Tasks"
    });

    var ntDue = this.ntDue = new Ext.form.DateField({
        renderTo: 'new-task-due',
        value: new Date(),
        disabled:true,
        format : "d/m/Y",
		//altFormats : "d/m/Y"
    });

    // syncs the header fields' widths with the grid column widths
    function syncFields(){
        var cm = grid.getColumnModel();
        ntTitle.setSize(cm.getColumnWidth(1)-2);
        ntCat.setSize(cm.getColumnWidth(2)-4);
        ntDue.setSize(cm.getColumnWidth(3)-4);
    }
    syncFields();

    var editing = false, focused = false, userTriggered = false;
    var handlers = {
        focus: function(){
            setFocus.defer(20, window, [true]);
        },
        blur: function(){
            focused = false;
            doBlur.defer(250);
        },
        specialkey: function(f, e){
            if(e.getKey()==e.ENTER && (!f.isExpanded || !f.isExpanded())){
                userTriggered = true;
                e.stopEvent();
                f.el.blur();
                if(f.triggerBlur){
                    f.triggerBlur();
                }
            }
        }
    }
    ntTitle.on(handlers);
    ntCat.on(handlers);
    ntDue.on(handlers);

    ntTitle.on('focus', function(){
        focused = true;
        if(!editing){
            ntCat.enable();
            ntDue.enable();
            syncFields();
            editing = true;
			
			ntCat.setValue(tx.data.getActiveListId('TASK'));
        }
    });

    function setFocus(v){
		focused = v;
	}
    // when a field in the add bar is blurred, this determines
    // whether a new task should be created
    function doBlur(){
        if(editing && !focused){
			var title = ntTitle.getValue();
            if(!Ext.isEmpty(title)){
				tx.data.tasks.createTask(title, ntCat.getRawValue(), ntDue.getValue());
            	ntTitle.setValue('');
                if(userTriggered){ // if they entered to add the task, then go to a new add automatically
                    userTriggered = false;
                    ntTitle.focus.defer(100, ntTitle);
                }
            }
            ntCat.disable();
            ntDue.disable();
            editing = false;
        }
    }
};

/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.WindowMgr.getTaskWindow = function(taskId){
	var win, winId = 'wind_task';//'task' + taskId;
	if (win = this.get(winId)) {
		win.instance.orderToFront();
	}
	else {
			var store = tx.data.tasks;
		    var task = store.lookup(taskId);
			
			var win_height = app.desktop.getWinHeight()*0.45;
			var win_width = app.desktop.getWinWidth()*0.4;
			
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
	                   	new TaskForm({
							win_id : id,
							taskId : taskId,
							win_height : win_height,
							win_width : win_width
						}),
						new Notes({})
                    ]
                });
			
					
			win = app.desktop.createWindow({
				id: 'wind_task', //winId,
				title: 'Task - ' + Ext.util.Format.ellipsis(task.data.title, 40),
				width: win_width ,
            	height: win_height ,
				maximizable: false,
				resizable: true,
				layout : 'fit',
				items:[ tp ]
			});
			
			
		
	}
	
	return win;
}

Ext.WindowMgr.getReminderWindow = function(taskId){
	var win, winId = 'reminder' + taskId;
	if(win = this.get(winId)) {
		win.instance.orderToFront();
	} else {
		var store = tx.data.tasks;
	    var task = store.lookup(taskId);
		/*
bulkUpdate({
			'task-title' : Ext.util.Format.ellipsis(task.data.title, 80),
			'task-due' : task.data.dueDate ? task.data.dueDate.format('F d, Y') : 'None'
		});
		
		function bulkUpdate(o){
			for(var id in o){
				Ext.fly(id).update(o[id]);
			}
		}
*/
		win = app.desktop.createWindow({
			id: winId,
			title: 'Reminder - ' + Ext.util.Format.ellipsis(task.data.title, 40),
			width:400,
			height:140,
			maximizable: false,
			resizable: false,
			buttons : [
						{
							text: 'Dismiss',
							minWidth: 80,
							//renderTo: 'btns',
							handler: function(){
								win.close();
							}
						},{
							text: 'Snooze',
							minWidth: 80,
							//renderTo: 'btns',
							handler: function(){
								var min = parseInt(Ext.get('snooze-time').getValue(), 10);
								var reminder = new Date().add('mi', min);
								var o = tx.data.tasks.getById(taskId);
								if(o){
									o.set('reminder', reminder);
								}else{
									store.proxy.table.updateBy({reminder: reminder}, 'where taskId = ?', [taskId]);
								}
								win.close();
							}
						}	
			]

		});
	}
	return win;
}

Ext.WindowMgr.getAboutWindow = function(){
	var win, winId = 'tasks_about';
	if(win = this.get(winId)) {
		win.instance.orderToFront();
	} else {
		win = app.desktop.createWindow({
			title : 'About Simple Tasks',
			id: winId,
			autoLoad : {url: '/javascripts/housekeeping/system/modules/tasks/about.html?v='+app.version},
			width:350,
			height:300,
			resizable: false
        });
	}
	return win;
}




Ext.WindowMgr.getPrefWindow = function(){
	var win, winId = 'tasks_preferences';
	if(win = this.get(winId)) {
		win.instance.orderToFront();
	} else {
		//var win = window.nativeWindow;
		//var opener = Ext.air.NativeWindow.getRootHtmlWindow();
		
		//var d = new Date().clearTime(true);
		//d = d.add('mi', opener.Ext.state.Manager.get('defaultReminder'));
		
		//var time = new Ext.get('time');
		//time.dom.value = d.format('g:i A');
		
		win = app.desktop.createWindow({
			id: winId,
			width:240,
			height:150,
			resizable: false,
            items : [//{text:'When setting quick reminders, default the time to:'},
						{
									xtype:"combo",
									//fieldLabel:"Country",
									width : '150',
									store: Times,
									displayField:'time',
									valueField: 'time_name',
									hiddenName: 'timeId',
									typeAhead: true,
									id:'s_time',
									mode: 'local',
									triggerAction: 'all',
									selectOnFocus:true,
									allowBlank:false
								}]/*
,
			buttons : [{
				text: 'OK',
				minWidth: 80,
				renderTo: 'btns',
				handler: function(){
					var t = Date.parseDate(time.getValue(), 'g:i A');
					if(t){
						var m = t.getMinutes() + (t.getHours()*60);
						//opener.Ext.state.Manager.set('defaultReminder', m);
					}
					win.close();
				}
			},{
				text: 'Cancel',
				minWidth: 80,
				renderTo: 'btns',
				handler: function(){
					win.close();
				}
			}]
*/
        });
	}
	return win;
}

/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
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
tx.ReminderManager = function(){
	var table;
	
	var run = function(){
	var date =  new Date();		
	table.load({params: {
				format : 'jsonc',
				reminder_time :date.format("d-m-Y H:i:s")
			}});
		for(var i = 0, len = table.data.items.length; i < len; i++){
			showReminder.defer(10, window, [table.data.items[i].data]);
		}	
	   //Ext.getCmp('calendar').setHtml(Ext.getCmp('calendar').defaultSrc);
	};
	
	var showReminder = function(task){

    var o;
		if (o = tx.data.tasks.getById(task.taskId)) { // if currently loaded
			o.set('reminder', '');
			tx.data.tasks.updateTask(o);
		}
		else {   // else update db directly
/*
			
			table.update({
				taskId: task.taskId,
				reminder: ''
			});

*/			
			tx.data.tasks.updateTask(task.data);
		}
		Ext.WindowMgr.getReminderWindow(task.taskId).show();

	}
	
	return {
		init : function(){
			
			table = new tx.data.TaskStore();
			table.init();
			setInterval(run, 10000);
		}
	}	
}();

/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

// generates a renderer function to be used for textual date groups
Ext.util.Format.createTextDateRenderer = function(){
    // create the cache of ranges to be reused
    var today = new Date().clearTime(true);
    var year = today.getFullYear();
    var todayTime = today.getTime();
    var yesterday = today.add('d', -1).getTime();
    var tomorrow = today.add('d', 1).getTime();
    var weekDays = today.add('d', 6).getTime();
    var lastWeekDays = today.add('d', -6).getTime();

    var weekAgo1 = today.add('d', -13).getTime();
    var weekAgo2 = today.add('d', -20).getTime();
    var weekAgo3 = today.add('d', -27).getTime();

    var f = function(date){
        if(!date) {
            return '(No Date)';
        }
        var notime = date.clearTime(true).getTime();

        if (notime == todayTime) {
            return 'Today';
        }
        if(notime > todayTime){
            if (notime == tomorrow) {
                return 'Tomorrow';
            }
            if (notime <= weekDays) {
                return date.format('l');
            }
        }else {
        	if(notime == yesterday) {
            	return 'Yesterday';
            }
            if(notime >= lastWeekDays) {
                return 'Last ' + date.format('l');
            }
        }            
        return date.getFullYear() == year ? date.format('D m/d') : date.format('D m/d/Y');
   };
   
   f.date = today;
   return f;
};
/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.SwitchButton = Ext.extend(Ext.Component, {
	initComponent : function(){
		Ext.SwitchButton.superclass.initComponent.call(this);
		
		var mc = new Ext.util.MixedCollection();
		mc.addAll(this.items);
		this.items = mc;
		
		this.addEvents('change');
		
		if(this.handler){
			this.on('change', this.handler, this.scope || this);
		}
	},
	
	onRender : function(ct, position){
		
		var el = document.createElement('table');
		el.cellSpacing = 0;
		el.className = 'x-rbtn';
		el.id = this.id;
		
		var row = document.createElement('tr');
		el.appendChild(row);
		
		var count = this.items.length;
		var last = count - 1;
		this.activeItem = this.items.get(this.activeItem);
		
		for(var i = 0; i < count; i++){
			var item = this.items.itemAt(i);
			
			var cell = row.appendChild(document.createElement('td'));
			cell.id = this.id + '-rbi-' + i;
			
			var cls = i == 0 ? 'x-rbtn-first' : (i == last ? 'x-rbtn-last' : 'x-rbtn-item');
			item.baseCls = cls;
			
			if(this.activeItem == item){
				cls += '-active';
			}
			cell.className = cls;
			
			var button = document.createElement('button');
			button.innerHTML = '&#160;';
			button.className = item.iconCls;
			button.qtip = item.tooltip;
			
			cell.appendChild(button);
			
			item.cell = cell;
		}
		
		this.el = Ext.get(ct.dom.appendChild(el));
		
		this.el.on('click', this.onClick, this);
	},
	
	getActiveItem : function(){
		return this.activeItem;
	},
	
	setActiveItem : function(item){
		if(typeof item != 'object' && item !== null){
			item = this.items.get(item);
		}
		var current = this.getActiveItem();
		if(item != current){
			if(current){
				Ext.fly(current.cell).removeClass(current.baseCls + '-active');
			}
			if(item) {
				Ext.fly(item.cell).addClass(item.baseCls + '-active');
			}
			this.activeItem = item;
			this.fireEvent('change', this, item);
		}
		return item;
	},
	
	onClick : function(e){
		var target = e.getTarget('td', 2);
		if(!this.disabled && target){
			this.setActiveItem(parseInt(target.id.split('-rbi-')[1], 10));
		}
	}
});

Ext.reg('switch', Ext.SwitchButton);

/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

tx.Importer = function(){
	function chooseFile(callback){
		var file = new air.File(air.File.documentsDirectory.nativePath);
		var filter = new air.FileFilter("Tasks XML File", "*.xml");
		
		file.addEventListener('select', function(e){
			doImport(e.target, callback);
		});
		
		file.browseForOpen('Open', [filter]);
	}
	
	
	/*
	 * This import function used to be clean and simple. The addition of asynchronous import and
	 * a progress bar changed that quickly. :) 
	 */
	function doImport(file, callback){
		
		Ext.Msg.progress('Import', 'Reading file...');
		
		var listTable = tx.data.conn.getTable('list', 'listId');
		var taskTable = tx.data.conn.getTable('task', 'taskId');
		var taskCount = 0;
		var visibleIndex = 0;
		var doUpdate = true;
		var f = String.format;
		
		function getProgress(index){
			if(taskCount > 0){
				return (.8 * index) / taskCount;
			}else{
				return .8;
			}
		}
		
		function readFile(){
			var stream = new air.FileStream();
			stream.open(file, air.FileMode.READ);
			var xml = stream.readUTFBytes(stream.bytesAvailable);
			stream.close();
					
			Ext.Msg.updateProgress(.1, 'Parsing...');
			parse.defer(10, null, [xml]);
		}
		
		function parse(xml){
			try {
				var doc = new runtime.flash.xml.XMLDocument();
				doc.ignoreWhite = true;
				doc.parseXML(xml);
				
				var lists = doc.firstChild.childNodes;
				var count = lists.length;
				
				for (var i = 0; i < count; i++) {
					taskCount += lists[i].childNodes.length;
				}	
				Ext.Msg.updateProgress(.15, '', 'Loading Tasks...');
				loadLists(lists, 0);
			}catch(e){
				air.trace(e);
				alert('An error occured while trying to import the selected file.');
			}			
		}
		
		function loadLists(lists, index){
			if(index < lists.length){
				var list = lists[index];
				listTable.save(list.attributes);
				nextTask(list.childNodes, 0, lists, index);
			}
			else {
				Ext.Msg.updateProgress(1, '', 'Completing import...');
				callback.defer(10);
			}				
		}		
		
		function nextTask(tasks, index, lists, listIndex){
			if(index < tasks.length){
				Ext.Msg.updateProgress(
					getProgress(++visibleIndex),
					f('{0} of {1}', visibleIndex, taskCount)
				);
				loadTasks.defer(250, window, [tasks, index, lists, listIndex]);
			}
			else {
				loadLists(lists, ++listIndex);
			}
		}
		
		function loadTasks(tasks, index, lists, listIndex){
			taskTable.save(tasks[index].attributes);
			nextTask(tasks, ++index, lists, listIndex);
		}
		
		readFile.defer(10);
	}
	
	this.doImport = function(callback){
		chooseFile(callback);
	}
};

/*
 * Ext JS Library 0.30
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

tx.Exporter = function(){
	var lists = tx.data.conn.query('select * from list');
	
	var doc = new runtime.flash.xml.XMLDocument();
	
	var root = doc.createElement('simple-tasks');
	doc.appendChild(root);
	
	root.attributes['version'] = '2.0';
	
	for(var i = 0, len = lists.length; i < len; i++){
		var list = lists[i];
		
		var listNode = doc.createElement('list');
		root.appendChild(listNode);
		
		for(var k in list){
			if(list.hasOwnProperty(k)){
				listNode.attributes[k] = String(list[k]);
			}
		}
		
		var tasks = tx.data.conn.queryBy('select * from task where listId = ?', [list.listId]);
		for(var j = 0, jlen = tasks.length; j < jlen; j++){
			var task = tasks[j];
			
			var taskNode = doc.createElement('task');
			listNode.appendChild(taskNode);
			
			for(var t in task){
				if(task.hasOwnProperty(t)){
					taskNode.attributes[t] = String(task[t]);
				}
			}
		}
	}
	
	var file = new air.File(air.File.documentsDirectory.nativePath + air.File.separator + 'tasks.xml');
	
	file.addEventListener('select', function(e){
		var target = e.target;
		var stream = new air.FileStream();
        stream.open(target, air.FileMode.WRITE);
		stream.writeUTFBytes('<?xml version="1.0" encoding="UTF-8"?>');
        stream.writeUTFBytes(doc.toString());
        stream.close();
	});
	
	// I wonder why no filter for Save As?
	// var filter = new air.FileFilter("Tasks XML File", "*.xml");
	file.browseForSave('Save As');
};
