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

QoDesk = new Ext.app.App({
	
	init :function() {
		Ext.QuickTips.init();
	},
	
	// config for the logout button
	getLogoutButtonConfig : function() {
		return {
			text: 'Logout',
			iconCls: 'logout',
			handler: function(){
				Ext.Ajax.request({
					success: function(o){
						var decoded = Ext.decode(o.responseText);
						
						if (decoded.success) {
							window.location = decoded.url;
						}
						else {
						// error
						}
					},
					failure: function(o){
						// error
					},
					scope: this,
					method : 'DELETE',
					url: '/user_session'
				});
			}
		};
	},

	// modules to initialize (made available to your desktop)
	getModules : function() {
        if ( this.modules && this.modules.length )
            return this.modules;
        var modules = [];

		for(var i = 0, len = this.apps.length; i < len; i++) {
            if ( typeof this.apps[ i ] == 'string' ) {
                var construct = eval("("+this.apps[ i ]+")");
                if ( construct )
                    modules.push( new construct() );
            } else {
                modules.push( new Ext.app.loadOnDemand( this.apps[ i ] ) );
            }
        }

        for ( var i = 0, len = app.config.modules.length; i < len; i++ ) {
            var construct = eval("("+app.config.modules[i]+")");
            if ( construct )
                modules.push( new construct() );
            else
                log('module: '+app.config.modules[i]+' is not loaded, or onDemand');
        }
		return this.modules = modules;
	},
	
	// config for the start menu
    getStartConfig : function() {
    	return {
        	iconCls: 'startmenu-home-icon',
            title: '<span style="float:right">i-housekeeping</span> '+app.config.user.first+' '+app.config.user.last,
			toolPanelWidth: 115
        };
    },
    
    // config for the desktop
    getDesktopConfig : function() {
	    this.initDesktopConfig(app.config);
		
    	// can also call server for saved config
    	
		/*
Ext.Ajax.request({
			success: function(o) {
				var decoded = Ext.decode(o.responseText);
				
				if (decoded.success == "true") {
					this.initDesktopConfig(decoded.config);
				}else{
					// error
				}
			},
			failure: function() {
				// error
			},
			scope: this,
			scriptTag: true,
			callbackParam: 'jsoncallback',
			url: 'http://localhost:3001/desktop/index',
			params: { format: 'json' }
		}); 
*/
		
		/* can also hard code the config as shown here
		 *
		this.initDesktopConfig({
			'autorun' : [
				'docs-win'
			],
			'contextmenu': [
				'qo-preferences'
    		],
    		'quickstart': [
    			'demo-grid',
				'demo-tabs',
				'demo-acc',
				'demo-layout'
			],
			'shortcuts': [
				'demo-grid',
				'demo-tabs',
				'demo-acc'
			],
			'startmenu': [
				'docs-win',
				'demo-grid',
				'demo-tabs',
				'demo-acc',
				'demo-layout',
				'demo-menu'
			],
			'styles': {
				'backgroundcolor': 'f9f9f9',
				'theme': {
					'id': 2,
					'description': 'Vista Black',
					'path': 'resources/themes/xtheme-vistablack/css/xtheme-vistablack.css'
				},
				'transparency': false,
				'wallpaper': {
					'id': 1,
					'description': 'Blue Swirl',
					'path': 'resources/wallpapers/blue-swirl.jpg'
				},
				'wallpaperposition': 'center'
			}
		}); */
    }
});

