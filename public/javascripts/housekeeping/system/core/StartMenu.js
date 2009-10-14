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
 * qWikiOffice Desktop v0.7.1
 * Copyright(c) 2007-2008, Integrated Technologies, Inc.
 * licensing@qwikioffice.com
 * http://www.qwikioffice.com/license.php
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

/**
 * @class Ext.ux.StartMenu
 * @extends Ext.menu.Menu
 * A start menu object.
 * @constructor
 * Creates a new StartMenu
 * @param {Object} config Configuration options
 *
 * SAMPLE USAGE:
 *
 * this.startMenu = new Ext.ux.StartMenu({
 *		iconCls: 'user',
 *		height: 300,
 *		shadow: true,
 *		title: get_cookie('memberName'),
 *		toolPanelWidth: 110,
 *		width: 300
 *	});
 *
 * this.startMenu.add({
 *		text: 'Grid Window',
 *		iconCls:'icon-grid',
 *		handler : this.createWindow,
 *		scope: this
 *	});
 *
 * this.startMenu.addTool({
 *		text:'Logout',
 *		iconCls:'logout',
 *		handler:function(){ window.location = "logout.pl"; },
 *		scope:this
 *	});
 */

Ext.namespace("Ext.ux");

Ext.ux.StartMenu = function(config){
	Ext.ux.StartMenu.superclass.constructor.call(this, config);
    
    var tools = this.toolItems;
    this.toolItems = new Ext.util.MixedCollection();
    if(tools){
        this.addTool.apply(this, tools);
    }
};

Ext.extend(Ext.ux.StartMenu, Ext.menu.Menu, {
	height : 300,
	toolPanelWidth : 100,
	width : 300,
	
    // private
    render : function(){
        if(this.el){
            return;
        }
        var el = this.el = new Ext.Layer({
            cls: "x-menu ux-start-menu",
            shadow:this.shadow,
            constrain: false,
            parentEl: this.parentEl || document.body,
            zindex:15000
        });
    
        var header = el.createChild({
        	tag: "div",
        	cls: "x-window-header x-unselectable x-panel-icon "+this.iconCls
        });
        header.setStyle('padding', '7px 0 0 0');
        
		this.header = header;
		var headerText = header.createChild({
			tag: "span",
			cls: "x-window-header-text"
		});
		var tl = header.wrap({
			cls: "ux-start-menu-tl"
		});
		var tr = header.wrap({
			cls: "ux-start-menu-tr"
		});
		var tc = header.wrap({
			cls: "ux-start-menu-tc"
		});
		
		this.menuBWrap = el.createChild({
			tag: "div",
			cls: "ux-start-menu-body x-border-layout-ct ux-start-menu-body"
		});
		var ml = this.menuBWrap.wrap({
			cls: "ux-start-menu-ml"
		});
		var mc = this.menuBWrap.wrap({
			cls: "ux-start-menu-mc ux-start-menu-bwrap"
		});
		/*
		this.menuPanel = this.menuBWrap.createChild({
			tag: "div",
			cls: "x-panel x-border-panel ux-start-menu-apps-panel opaque"
		});
        */
        var shortcutRecord = Ext.data.Record.create(['id', 'name', 'cls', {name:'size', type: 'float'}, {name:'lastmod', type:'date', dateFormat:'timestamp'}]);
        var store = new Ext.data.JsonStore({
            fields: shortcutRecord
        });
//        store.load();
        var tpl = new Ext.XTemplate(
            '<ul class="x-menu-list">',
            '<tpl for=".">',
                '<li class="x-menu-list-item"><a href="javascript:void(0);" class="x-menu-item">',
                '<img class="x-menu-item-icon {cls}-icon" src= "images/s.gif"/>{shortName}</a></li>',
            '</tpl>',
            '</ul>'
        );
        
        var view = new Ext.DataView({
            store: store,
            tpl: tpl,
            width: '100%',
            height: '100%',
            multiSelect: true,
            overClass: 'x-menu-item-active',
            itemSelector: '.x-menu-list-item',
            emptyText: '- No Shortcuts -',
            prepareData: function(data){
                if ( data.iconCls )
                    data.iconCls = data.iconCls.replace( /-shortcut$/, '' );
                data.shortName = Ext.util.Format.ellipsis(data.name, 30);
                data.sizeString = Ext.util.Format.fileSize(data.size||0);
                data.dateString = data.lastmod.format("m/d/Y g:i a");
                return data;
            },
            listeners: {
                beforeclick: {
                    fn: function(dv,idx,node,ev) {
                        if ( ev.type && ev.type == 'click' ) {
                            var record = dv.getRecord(node);
                            if ( !record )
                                return false;
                            this.hide();
                            log('launching '+record.data.id);
                            var module = app.getModule( record.data.id );
                            if ( module && module.launcher && module.launcher.handler )
                                module.launcher.handler.call(module.launcher.scope);
                            return false;
                        }
                    },
                    scope: this
                }
            }
        });

        this.menuPanel = new Ext.Panel({
			baseCls: "x-panel x-border-panel ux-start-menu-apps-panel opaque",
            frame: false,
            border: false,
            layout:'fit',
            items: view
        });
        this.menuPanel.render( this.menuBWrap );

		this.toolsPanel = this.menuBWrap.createChild({
			tag: "div",
			cls: "x-panel x-border-panel ux-start-menu-tools-panel"
		});
		
		var bwrap = ml.wrap({cls: "x-window-bwrap"});
		var bc = bwrap.createChild({
			tag: "div",
			cls: "ux-start-menu-bc"
		});
		var bl = bc.wrap({
			cls: "ux-start-menu-bl x-panel-nofooter"
		});
		var br = bc.wrap({
			cls: "ux-start-menu-br"
		});
		
		bc.setStyle({
			height: '0px',
			padding: '0 0 6px 0'
		});
		
        this.keyNav = new Ext.menu.MenuNav(this);

        if(this.plain){
            el.addClass("x-menu-plain");
        }
        if(this.cls){
            el.addClass(this.cls);
        }
        // generic focus element
        this.focusEl = el.createChild({
            tag: "a",
            cls: "x-menu-focus",
            href: "#",
            onclick: "return false;",
            tabIndex:"-1"
        });
        
        var toolsUl = this.toolsPanel.createChild({
        	tag: "ul",
        	cls: "x-menu-list"
        });
        
        var ulListeners = {
        	"click": {
        		fn: this.onClick,
        		scope: this
        	},
        	"mouseover": {
        		fn: this.onMouseOver,
        		scope: this
        	},
        	"mouseout": {
        		fn: this.onMouseOut,
        		scope: this
        	}
        };
        
        this.items.each(
        	function(item){
                if ( item.iconCls )
                    item.iconCls = item.iconCls.replace( /-(shortcut|icon)$/, '' );
                var date = new Date();
                var record = new shortcutRecord({
                    id: item.moduleId,
                    name: item.text,
                    cls: item.iconCls,
                    lastmod: date,
                    launcher: item
                });
                store.add([record]);
	        }, this);
        var dragZone = new Ext.app.FileDragZone(view,{
            containerScroll: false,
            targetCls: 'li.x-menu-list-item',
            ddGroup: 'file-manager-group'
        });
    
        var dropTarget = new Ext.dd.DropTarget(this.menuPanel.body.dom, {
            ddGroup    : 'file-manager-group',
            copy       : false,
            notifyDrop : function(ddSource, e, odata) {
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
                    log('start menu:'+e);
                };
                    
                if ( ddSource.grid )
                    ddSource.grid.refresh();
                else
                    ddSource.view.refresh();
                view.refresh();
    
                return (true);
            }
        });

        this.autoWidth();

        toolsUl.on(ulListeners);
        
        this.toolItems.each(
        	function(item){
	            var li = document.createElement("li");
	            li.className = "x-menu-list-item";
	            toolsUl.dom.appendChild(li);
	            item.render(li, this);
	        }, this);
	        
        this.toolsUl = toolsUl;
        this.autoWidth();
             
        this.menuBWrap.setStyle('position', 'relative');  
        this.menuBWrap.setHeight(this.height);
        
        this.menuPanel.body.setStyle({
        	padding: '2px',
        	position: 'absolute',
        	overflow: 'auto'
        });
        
        this.toolsPanel.setStyle({
        	padding: '2px 4px 2px 2px',
        	position: 'absolute',
        	overflow: 'auto'
        });
        
        this.setTitle(this.title);
    },
    
    // private
    findTargetItem : function(e){
        var t = e.getTarget(".x-menu-list-item", this.menuPanel.dom,  true);
        if(t && t.menuItemId){
        	if(this.items.get(t.menuItemId)){
            	return this.items.get(t.menuItemId);
            }else{
            	return this.toolItems.get(t.menuItemId);
            }
        }
    },

    /**
     * Displays this menu relative to another element
     * @param {Mixed} element The element to align to
     * @param {String} position (optional) The {@link Ext.Element#alignTo} anchor position to use in aligning to
     * the element (defaults to this.defaultAlign)
     * @param {Ext.ux.StartMenu} parentMenu (optional) This menu's parent menu, if applicable (defaults to undefined)
     */
    show : function(el, pos, parentMenu){
        this.parentMenu = parentMenu;
        if(!this.el){
            this.render();
        }

        this.fireEvent("beforeshow", this);
        this.showAt(this.el.getAlignToXY(el, pos || this.defaultAlign), parentMenu, false);
        
        var tPanelWidth = this.toolPanelWidth;      
        var box = this.menuBWrap.getBox();
        this.menuPanel.setWidth(box.width-tPanelWidth);
        this.menuPanel.setHeight(box.height);
        
        this.toolsPanel.setWidth(tPanelWidth);
        this.toolsPanel.setX(box.x+box.width-tPanelWidth);
        this.toolsPanel.setHeight(box.height);
    },
    
    addTool : function(){
        var a = arguments, l = a.length, item;
        for(var i = 0; i < l; i++){
            var el = a[i];
            if(el.render){ // some kind of Item
                item = this.addToolItem(el);
            }else if(typeof el == "string"){ // string
                if(el == "separator" || el == "-"){
                    item = this.addToolSeparator();
                }else{
                    item = this.addText(el);
                }
            }else if(el.tagName || el.el){ // element
                item = this.addElement(el);
            }else if(typeof el == "object"){ // must be menu item config?
                item = this.addToolMenuItem(el);
            }
        }
        return item;
    },
    
    /**
     * Adds a separator bar to the Tools
     * @return {Ext.menu.Item} The menu item that was added
     */
    addToolSeparator : function(){
        return this.addToolItem(new Ext.menu.Separator({itemCls: 'ux-toolmenu-sep'}));
    },

    addToolItem : function(item){
        this.toolItems.add(item);
        if(this.toolsUl){
            var li = document.createElement("li");
            li.className = "x-menu-list-item";
            this.toolsUl.dom.appendChild(li);
            item.render(li, this);
            this.delayAutoWidth();
        }
        return item;
    },

    addToolMenuItem : function(config){
        if(!(config instanceof Ext.menu.Item)){
            if(typeof config.checked == "boolean"){ // must be check menu item config?
                config = new Ext.menu.CheckItem(config);
            }else{
                config = new Ext.menu.Item(config);
                //config = new Ext.menu.Adapter(this.getToolButton(config), {canActivate:true});
            }
        }
        return this.addToolItem(config);
    },
    
    setTitle : function(title, iconCls){
        this.title = title;
        if(this.header.child('span')){
        	this.header.child('span').update(title);
        }
        return this;
    },
    
    getToolButton : function(config){
    	var btn = new Ext.Button({
			handler: config.handler,
			//iconCls: config.iconCls,
			minWidth: this.toolPanelWidth-10,
			scope: config.scope,
			text: config.text
		});
		
    	return btn;
    }
});

