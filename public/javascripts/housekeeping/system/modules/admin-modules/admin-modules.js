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

QoDesk.AdminModules = Ext.extend(Ext.app.Module, {

	moduleType : 'system',
	moduleId : 'admin-modules',
	
	init : function(){		
		this.launcher = {
			handler: this.createWindow,
			iconCls: 'admin-modules-icon',
			scope: this,
			shortcutIconCls: 'admin-modules-shortcut',
			text: 'Module Admin',
			tooltip: '<b>Module Admin</b><br />Configure the desktop modules'
		}
	},

    notifyDone: function( title, msg ) {
        this.notifyWin.setIconClass('x-icon-done');
        this.notifyWin.setTitle( title );
        this.notifyWin.setMessage( msg );
        app.desktop.hideNotification( this.notifyWin );
        this.notifyWin = null;
    },

	createWindow : function(){
		var win = app.desktop.getWindow('admin-modules-win');

		if (!win) {
            var reader = new Ext.data.JsonReader({
                root: 'modules',
                fields: [
                    {name: 'id'},
                    {name: 'moduleId'},
                    {name: 'moduleName'},
                    {name: 'moduleType'},
                    {name: 'version'},
                    {name: 'author'},
                    {name: 'path'},
                    {name: 'active'},
                    {name: 'description'}
                ]
            });
            var store = new Ext.data.GroupingStore({
                reader: reader,
                url: '/adminmodule/fetch',
				baseParams: {
                    moduleId: 'admin-modules',
                    task: 'fetch',
                    what: 'all'
                },
                sortInfo: { field: 'active', direction: 'DESC' },
                groupField: 'active'
            });
            store.load();

            // create the Grid
            var grid = new Ext.grid.GridPanel({
                store: store,
                border : false,
                columns: [
                    {header: "Name", width: 120, sortable: true, dataIndex: 'moduleName'},
                    {header: "Enabled", width: 55, sortable: true, dataIndex: 'active'},
                    {header: "Type", width: 75, sortable: true, dataIndex: 'moduleType'},
                    {header: "Version", width: 55, sortable: true, dataIndex: 'version'},
                    {header: "Author", width: 125, sortable: true, dataIndex: 'author'}
                ],
                view: new Ext.grid.GroupingView({
                    forceFit: true,
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Modules" : "Module"]})'
                }),
                stripeRows       : true,
                autoExpandColumn : 'moduleName'
            });


            var formPanel = new Ext.form.FormPanel({
                title: 'Edit Module',
                labelWidth  : 50,
                border      : false,
                autoScroll  : true,
                bodyStyle   : 'padding: 2px;',
                defaultType : 'textfield',
                defaults    : {
                    anchor: '96%'
                },
                items       : [
                    {
                        fieldLabel : 'Name',
                        name       : 'moduleName'
                    },
                    {
                        fieldLabel : 'Enabled',
                        xtype: 'checkbox',
                        name       : 'active'
                    },
                    {
                        fieldLabel : 'Type',
                        name       : 'moduleType'
                    },
                    {
                        fieldLabel : 'Version',
                        name       : 'version'
                    },
                    {
                        fieldLabel : 'Author',
                        name       : 'author'
                    },
                    {
                        fieldLabel : 'Path',
                        name       : 'path'
                    },
                    {
                        fieldLabel : 'Desc',
                        xtype      : 'textarea',
                        name: 'description'
                    },{
                        xtype: 'hidden',
                        name: 'id'
                    }
                ],
                buttons : [
                    {
                        text    : 'Save',
                        handler : function() {
                            var vals = formPanel.form.getValues();
                            var record = grid.selModel.getSelected();
                            if ( !vals.active )
                                vals.active = 'off';
                            this.notifyWin = app.desktop.showNotification({
                                html: 'Saving...',
                                title: 'Please wait'
                            });
                            Ext.Ajax.request({
                                url: app.connection,
                                params: {
                                    moduleId: this.moduleId,
                                    task: 'save',
                                    what: Ext.encode( vals )
                                },
                                success: function(o){
                                    if ( o && o.responseText && Ext.decode(o.responseText).success ) {
                                        this.notifyDone('Done','Saved');
                                        for (name in vals) {
                                            record.set(name, vals[name]);
                                        }
                                        win.drawers.e.hide();
                                        record.commit();
                                    } else {
                                        this.notifyDone('Error','Error saving data');
                                    }
                                },
                                failure: function(){
                                    this.notifyDone('Error','Error saving data');
                                },
                                scope: this
                            });
                        },
                        scope: this
                    },
                    {
                        text    : 'Cancel',
                        handler : function() {
                            win.drawers.e.hide();
                        }
                    }
                ]
            });
            
            
            grid.on('rowclick', function(grid, rowIndex, eventObj) {
                var record = grid.getStore().getAt(rowIndex);
                win.drawers.e.show();
                formPanel.form.setValues(record.data);
            });
            
            
            var rightDrawer = new drawer({
                size      : 320,
                side      : 'e', // Can be n e s w (North, East, South, West)
                //animate   : true,
                resizable: true,
                plain     :  true,
                layout    : 'fit',
                items     : formPanel
            });
 
            win = app.desktop.createWindow({
                title: 'Module Admin',
                id: 'admin-modules-win',
                iconCls: 'admin-modules-icon',
                maximizable: false,
                width: 500,
                height:300,
                minWidth: 300,
                minHeight: 200,
                layout: 'fit',
                constrain: true,
                bodyStyle:'padding:5px;',
                buttonAlign:'center',
                items: grid,
                plugins: [ rightDrawer ]
            });
        }
        
        win.show();
    }
    
});

