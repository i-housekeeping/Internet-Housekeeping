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

Ext.namespace("Ext.ux");

Ext.ux.Shortcuts = function(config){
    var desktopEl = Ext.get(config.renderTo)
        ,taskbarEl = config.taskbarEl;
    
    // TODO share this common record globally
    var shortcutRecord = Ext.data.Record.create(['id', 'name', 'cls', {name:'size', type: 'float'}, {name:'lastmod', type:'date', dateFormat:'timestamp'}]);
    // TODO load shortcuts remotely
    var store = new Ext.data.JsonStore({
        url: '',
        root: 'files',
        fields: shortcutRecord
    });
    //store.load();

    var dbg = Ext.getCmp('x-debug-browser');
    var extra = dbg ? dbg.el.getHeight() : 0;
    var iconHeight = 96;

    var sizes = {
        desktopHeight: ( Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight() - extra )
    };
                
	function isOverflow(y){
		if(y > sizes.desktopHeight){
			return true;
		}
		return false;
	}

    var tpl = new Ext.XTemplate(
        '<tpl for=".">',
           '<tpl if="(xindex &gt; 1) && !((xindex - 1) % this.cols(xindex))">',
                '<div style="clear:left"></div>',
            '</tpl>',
            '<div class="thumb-wrap ux-shortcut-item-btn {cls}-shortcut" id="shortcut-{id}">',
            '<div class="thumb ux-shortcut-btn"><img src="images/s.gif" title="{name}"/></div>',
            '<span class="x-editable ux-shortcut-btn-text">{shortName}</span></div>',
        '</tpl>',
        '<div class="x-clear"></div>',
        {
            cols: function(idx) {
                var j = 0;
                for ( var i = 0, len = store.getCount(); i < len; i++ ) {
                    if ( ( j * iconHeight ) >= sizes.desktopHeight ) {
                        j--;
                        break;
                    }
                    j++;
                }
//                log('j:'+j+' cols:'+( Math.ceil( store.getCount() / j ) )+' total:'+store.getCount()+' desktop:'+sizes.desktopHeight);
                return Math.ceil( store.getCount() / j );
            }
        }
    );
    
    var view = new Ext.DataView({
        id: config.viewId,
        store: store,
        tpl: tpl,
        width: '100%',
        height: '100%',
//        autoHeight: true,
        multiSelect: true,
        overClass: 'x-view-over',
        itemSelector: 'div.thumb-wrap',
        emptyText: '',

        plugins: [
//            new Ext.DataView.LabelEditor({dataIndex: 'name'}),
            new Ext.DataView.DragSelector({dragSafe: true})
        ],

        prepareData: function(data){
            if ( data.iconCls )
                data.iconCls = data.iconCls.replace( /-shortcut$/, '' );
            data.shortName = Ext.util.Format.ellipsis(data.name, 30);
            data.sizeString = Ext.util.Format.fileSize(data.size||0);
            data.dateString = data.lastmod.format("m/d/Y g:i a");
            return data;
        },
        
        listeners: {
            selectionchange: {
                fn: function(dv,nodes){
                    var l = nodes.length;
                    try {
                        window.status = l+' item'+( l != 1 ? 's' : '' )+' selected';
                    } catch(e) {};
                }
            },
            dblclick: {
                fn: function(dv) {
                    var records = dv.getSelectedRecords();
                    var record = records[0];
                    if ( !record )
                        return false;
                    log('launching '+record.data.id);
                    var module = app.getModule( record.data.id );
                    if ( module && module.launcher && module.launcher.handler )
                        module.launcher.handler.call(module.launcher.scope);
                }
            }
        }
    });
    this.desktopPanel = new Ext.Panel({
        renderTo: config.renderTo,
        id: 'desktop-view',
        frame: false,
        border: false,
        width: '100%',
        height: sizes.desktopHeight,
        //autoHeight:true,
        layout:'fit',
        items: view
    });

    this.addShortcut = function(config) {
        if ( config.iconCls )
            config.iconCls = config.iconCls.replace( /-shortcut$/, '' );
        var date = new Date();
        var record = new shortcutRecord({
            id: config.id,
            name: config.text,
            cls: config.iconCls,
            lastmod: date,
            launcher: config
        });
        store.add([record]);
        view.refresh();
        return record;
    };

    this.removeShortcut = function(shortcut) {
        var record = store.getById(shortcut.id);
        if ( record ) {
            var node = view.getNode(store.find('id',shortcut.data.id));
            app.desktop.config.launchers.shortcut.remove(shortcut.data.id);
            // it should always find it, but we'll be careful
            if ( node )
                Ext.fly( node ).ghost('l',{ duration: .5, callback: function() { store.remove(record); view.refresh(); } });
            else {
                store.remove(record);
                view.refresh();
            }
        }
    };

    this.handleUpdate = function() {
        var dbg = Ext.getCmp('x-debug-browser');
        var extra = dbg ? dbg.el.getHeight() : 0;
        sizes.desktopHeight = Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight() - extra;
        this.desktopPanel.setHeight( sizes.desktopHeight );
        view.refresh();
    };
    Ext.EventManager.onWindowResize(this.handleUpdate, this, {delay:500});
    
    var dragZone = new Ext.app.FileDragZone(view,{
        containerScroll: false,
        ddGroup: 'file-manager-group'
    });

    var dropTarget = new Ext.dd.DropTarget(this.desktopPanel.body.dom, {
        ddGroup    : 'file-manager-group',
        copy       : false,
        notifyDrop : function(ddSource, e, odata){
            /* double drop bug */
            if ( ddSource.dragData._done )
                return true;
            ddSource.dragData._done = true;
            
            // cancel the drag if the source and dest are the same
            if ( ddSource.view && ddSource.view.store === store )
                return false;
            
            function addRow(data, index, allItems) {
                
                if ( ddSource.grid )
                    ddSource.grid.store.remove(data);
                else
                    ddSource.view.store.remove(data);

                var record = new shortcutRecord(data.data);
                store.add(record);
            }

            try {
                Ext.each(ddSource.dragData.selections,addRow);
            } catch(e) {
                log('desktop:'+e);
            };
                
            if ( ddSource.grid )
                ddSource.grid.refresh();
            else
                ddSource.view.refresh();
            view.refresh();

            return (true);
        }
    });     
};

