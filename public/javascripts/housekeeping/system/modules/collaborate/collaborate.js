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

QoDesk.Collaborate = Ext.extend(Ext.app.Module, {

	moduleType : 'app',
	moduleId : 'collaborate',
	
	init : function(){		
		this.launcher = {
			handler: this.createWindow,
			iconCls: 'collaborate-icon',
			scope: this,
			shortcutIconCls: 'collaborate-shortcut',
			text: 'About',
			tooltip: '<strong>Collaborate and Share your info</strong>'
		}
	},

	createWindow : function(){
		var win = app.desktop.getWindow('collaborate-win');

		if (!win) {
			
			var tb = new Ext.Toolbar({
				id:'main-tb',
				height:26,
				region : 'north',
				items: [
					{
						xtype:'splitbutton',
						iconCls:'icon-collaborate',
						text:'Collaborate',
						//handler: actions.newTask.initialConfig.handler,
						menu: [	{
									text:'Import...',
									handler: function(){
										
									}
								},{
									text:'Export...',
									handler: function(){
										
									}
								},
								'-', 
								{
									iconCls : 'icon-about',
									text: 'About',
									handler: function(){
									   
									}
							    }
							   ]
						}		
				]
			});
			
			
			var tabs = new Ext.TabPanel({
	                    activeTab:0,
	                    border:false,
						region : 'center',
						tabPosition :'bottom',
	                    defaults: {
	                        autoScroll: true
	                    },
	                    items: [
	                     {
							id		    : 'blog',
							title		: 'Internet Housekeeping - Blog',
							defaultSrc	: 'http://blogtery.wordpress.com/', //'http://i-housekeeping.blogspot.com/',
							xtype		: 'iframepanel',
							loadMask	: {msg:'Loading...'},
							scope 		: this
						},{
							id		    : 'forum',
							title		: 'Internet Housekeeping - Forum',
							defaultSrc	: 'http://i-housekeeping.myforumportal.com',
							xtype		: 'iframepanel',
							loadMask	: {msg:'Loading...'},
							scope 		: this
						},{
							id		    : 'wiki_help',
							title		: 'Internet Housekeeping - Wiki',
							defaultSrc	: 'http://i-housekeeping.pbwiki.com',
							xtype		: 'iframepanel',
							loadMask	: {msg:'Loading...'},
							scope 		: this
						}
	                    ]
	                });
			
            win = app.desktop.createWindow({
                title: 'Collaborate and Share your info',
                id: 'collaborate-win',
                layout: 'border',
				width:  app.desktop.getWinWidth()*0.8,
            	height: app.desktop.getWinHeight()*0.8,
                iconCls: 'collaborate-icon',
                bodyStyle:'color:#000',
                plain: true,
                items: [tb, tabs]
            });
        }
        win.show();
    }

});
