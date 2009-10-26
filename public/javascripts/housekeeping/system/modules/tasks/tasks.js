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
 * -----
 *
 * This is a port from one of the samples that come with Extjs
 * http://extjs.com/deploy/dev/examples/samples.html
 * http://extjs.com/deploy/dev/examples/tasks/tasks.html
 */

QoDesk.TasksList = Ext.extend(Ext.app.Module, {

	moduleType : 'app',
	moduleId : 'tasks',
	
	init : function() {
		this.launcher = {
			handler: this.createWindow,
			iconCls: 'tasks-icon',
			scope: this,
			shortcutIconCls: 'tasks-shortcut',
			text: 'Tasks List',
			tooltip: '<b>Tasks List</b><br />'
		}
		
	},

	createWindow : function(){
		var win = app.desktop.getWindow('tasks-list-win');

		if(!win) {

			var grid = new TaskGrid();
			var selections = grid.getSelectionModel();

			// Shared actions used by Ext toolbars, menus, etc.
			var actions = {
				newTask: new Ext.Action({
					text: 'New Task',
					iconCls: 'icon-active',
					tooltip: 'New Task',
					handler: function(node){
						node.select();
						taskHeader.ntTitle.focus();
						taskHeader.ntCat.setValue(node.id);
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
						var id = tx.data.tasklists.newList(false, tree.getActiveFolderId(),'TASK','').id;
						tree.startEdit(id, true, 'TASK');
						tree.getLoader().load(root);
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
						var id = tx.data.tasklists.newList(true, tree.getActiveFolderId(),'TASK','').id;
						tree.startEdit(id, true);
						tree.getLoader().load(root);
					}
				}),

				deleteFolder: new Ext.Action({
					itemText: 'Delete',
					tooltip: 'Delete Folder',
					iconCls: 'icon-folder-delete',
					disabled: true,
					handler: function(s){
						tree.removeList(tree.getSelectionModel().getSelectedNode());
						tree.getLoader().load(root);
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
					id : 'tasks-tree',
					actions: actions,
					title:'Lists of Notes',
					store: tx.data.tasklists,
					region:'west',
					width:200,
					bbar : [
								tx.actions.newList, 
								tx.actions.deleteList, 
								'-', 
								tx.actions.newFolder,
								tx.actions.deleteFolder
							]
				});

			var root = tree.getRootNode();	

			var listSm = tree.getSelectionModel();
			
			tx.data.tasklists.bindTree(tree);
			tx.data.tasklists.on('update', function(){
				tx.data.tasks.applyGrouping();
				if(grid.titleNode){
					grid.setTitle(grid.titleNode.text);
				}
			});
			
			var tb = new Ext.Toolbar({
				id:'main-tb',
				height:26,
				region : 'north',
				items: [
					{
						xtype:'splitbutton',
						iconCls:'icon-kwrite',
						text:'What to-do',
						//handler: actions.newTask.initialConfig.handler,
						menu: [	actions.newTask, 
								actions.newList, 
								actions.newFolder, 
								'-',{
									text:'Import...',
									disabled : true,
									handler: function(){
										var importer = new tx.Importer();
										importer.doImport(function(){
											tx.data.tasklists.load();
											root.reload();
											loadList('root');
											Ext.Msg.hide();
										});
									}
								},{
									text:'Export...',
									disabled : true,
									handler: function(){
										new tx.Exporter();
									}
								},
								'-', 
								{
									iconCls : 'icon-about-todo',
									text: 'About',
									handler: function(){
									    Ext.WindowMgr.getAboutWindow().show();
									}
							    },
								actions.quit
							   ]
						},'-',
						actions.deleteTask,
						actions.complete,
						actions.active,
						'->',{
							xtype:'switch',
							id:'filter',
			                activeItem:0,
							items: [{
						        tooltip:'All Tasks',
								filter: 'all',
						        iconCls:'icon-all',
						        menuIndex: 0
			                },{
						        tooltip:'Active Tasks',
						        filter: false,
						        iconCls:'icon-active',
			                    menuIndex: 1
						    },{
						        tooltip:'Completed Tasks',
								filter: true,
						        iconCls:'icon-complete',
			                    menuIndex: 2
						    }]
,
							listeners: {
								change: function(btn, item){
									tx.data.tasks.applyFilter(item.filter);
								},
								delay: 10 // delay gives user instant click feedback before filtering tasks
							}
						}, ' ', ' ', ' '		
				]
			});
			
			width  = (app.desktop.getWinWidth()*0.95 - 250)/2;

			var calendar = this.calendar =  new GCalendarPanel({
							id		    : 'calendar',
							iconCls     : 'cashrecord-now-icon',
							margins     : '3 3 3 0',
							title		: 'Tasks Calendar',
							region      : 'east',
							defaultSrc :      '<iframe src="http://www.google.com/calendar/embed?title=%D7%9E%D7%A1%D7%99%D7%9E%D7%95%D7%AA&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=i.housekeeping%40gmail.com&amp;color=%2328754E&amp;ctz=Asia%2FJerusalem" style=" border-width:0 " width="'+ width +'" height="600" frameborder="0" scrolling="no"></iframe>',
							html :      '<iframe src="http://www.google.com/calendar/embed?title=%D7%9E%D7%A1%D7%99%D7%9E%D7%95%D7%AA&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=i.housekeeping%40gmail.com&amp;color=%2328754E&amp;ctz=Asia%2FJerusalem" style=" border-width:0 " width="'+ width +'" height="600" frameborder="0" scrolling="no"></iframe>',
							loadMask	: {msg:'Loading Calendar...'},
							scope 		: this
						});
			
			win = app.desktop.createWindow({
				title: 'Tasks List',
				id: 'tasks-list-win',
				iconCls: 'tasks-icon',
				maximizable: true,
				width:  app.desktop.getWinWidth()*0.95,
				height: app.desktop.getWinHeight()*0.85,
				minWidth: 300,
				minHeight: 200,
				layout: 'border',
				items: [tb, tree,  grid, calendar]
			});
			
			grid.on('keydown', function(e){
			         if(e.getKey() == e.DELETE && !grid.editing){
			             actions.deleteTask.execute();
			         }
			 });

		    tree.el.on('keydown', function(e){
		         if(e.getKey() == e.DELETE && !tree.editor.editing){
		             actions.deleteList.execute();
		         }
		    });

		    selections.on('selectionchange', function(sm){
		    	var disabled = sm.getCount() < 1;
		    	actions.complete.setDisabled(disabled);
		    	actions.active.setDisabled(disabled);
		    	actions.deleteTask.setDisabled(disabled);
		    });

			var taskHeader = new TaskHeader(grid);
			root.listType = 'TASK';
			root.text = "Ecco Tasks";
			tx.data.tasklists.init(tree,root);
			tx.data.tasks.init();
			
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
						//if (node.attributes.isFolder) {
						//var lists = [];
						//node.cascade(function(n){
						//	if (!n.attributes.isFolder) {
						//		lists.push(n.attributes.id);
						//	}
						//});
						//tx.data.tasks.loadList(lists);
					//}
					//else {
						tx.data.tasks.loadList(node.id);
					//}
					grid.titleNode = node;
					grid.setTitle(node.text);
					grid.setIconClass(node.attributes.iconCls);
				}
			}
		
			listSm.on('selectionchange', function(t, node){
				loadList(node ? node.id : null);
			});
		
		
			if(Ext.state.Manager.get('defaultReminder') === undefined){
				Ext.state.Manager.set('defaultReminder', 9 * 60); // default to 9am
			}
		
			tx.ReminderManager.init();
			
			
			
			grid.body.on('dragover', function(e){
				if(e.hasFormat(grid.ddText)){
					e.preventDefault();
				}
			});
		
			grid.body.on('drop', function(e){
				if(e.hasFormat(grid.ddText)){
					var text = e.getData(grid.ddText);
					try{
						// from outlook
						if(text.indexOf("Subject\t") != -1){
							var tasks = text.split("\n");
							for(var i = 1, len = tasks.length; i < len; i++){
								var data = tasks[i].split("\t");
								var list = tx.data.tasklists.findList(data[2]);
								tx.data.tasks.addTask({
					                taskId: Ext.uniqueId(),
					                title: Ext.util.Format.htmlEncode(data[0]),
					                dueDate: Date.parseDate(data[1], 'D n/j/Y') || '',
					                description: '', 
					                listId: list ? list.id : tx.data.getActiveListId('TASK'),
					                completed: false, 
									reminder: ''
					            });
							}
						}else{
							tx.data.tasks.addTask({
				                taskId: Ext.uniqueId(),
				                title: Ext.util.Format.htmlEncode(text),
				                dueDate: new Date(),
				                description: '', 
				                listId: tx.data.getActiveListId('TASK'),
				                completed: false, 
								reminder: ''
				            });
						}
					}catch(e){
						this.publish( '/desktop/notify',{
				            title: 'Task Import',
				            iconCls: 'icon-kwrite',
				            html: 'An error occured trying to import drag drop tasks.'
				        });
						
					}
					}
				});
          
        	}
        
        	win.show();
    	}
    
});

