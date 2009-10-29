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

QoDesk.AboutCometDesktop = Ext.extend(Ext.app.Module, {

	moduleType : 'core',
	moduleId : 'about-cometdesktop',
	
	init : function(){		
		this.launcher = {
			handler: this.createWindow,
			iconCls: 'about-cometdesktop-icon',
			scope: this,
			shortcutIconCls: 'about-cometdesktop-shortcut',
			text: 'About',
			tooltip: '<b>About Webtop</b>'
		}
	},

	createWindow : function(){
		var win = app.desktop.getWindow('about-cometdesktop-win');

		if (!win) {
            win = app.desktop.createWindow({
                title: 'About Webtop',
                id: 'about-cometdesktop-win',
                layout:'fit',
                width:460,
                height:320,
                iconCls: 'about-cometdesktop-icon',
                bodyStyle:'color:#000',
                plain: true,
                items: new Ext.TabPanel({
                    autoTabs:true,
                    activeTab:0,
                    border:false,
                    defaults: {
                        autoScroll: true,
                        bodyStyle:'padding:5px'
                    },
                    items: [
                    {
                        title: 'About',
                        autoLoad: {url: '/javascripts/housekeeping/system/modules/about/html/about.html?v='+app.version}
                    },
                    {
                        title: 'Credits',
                        autoLoad: {url: '/javascripts/housekeeping/system/modules/about/html/credits.html?v='+app.version}
                    },
                    {
                        title: 'License',
                        autoLoad: {url: '/javascripts/housekeeping/system/modules/about/html/license.html?v='+app.version}
                    }
                    ]
                })
            });
        }
        win.show();
    }

});
