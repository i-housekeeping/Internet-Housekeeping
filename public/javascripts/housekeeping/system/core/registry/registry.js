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

Ext.app.Registry = Ext.extend(Ext.app.Module, {

	moduleType : 'core', // core apps don't show up in preferences
	moduleId : 'registry',
	
	init : function() {
        // XXX
		this.launcher = {
			handler: Ext.emptyFn,
			iconCls: 'no-icon',
			text: 'Registry'
		};

        Ext.state.Manager.setProvider(new Ext.state.RegistryProvider( { state: app.config.registry } ));
	}

});


Ext.state.RegistryProvider = Ext.extend(Ext.state.AJAXProvider, {

    set: function(name, value) {
        if ( name.match( /^ext/ ) )
            return;
        this.publish( '/desktop/registry/set', { key: name, value: value } );
        return Ext.state.RegistryProvider.superclass.set.apply(this, arguments);
    },
    
    get: function(name) {
        if ( name.match( /^ext/ ) )
            return;
        var value = Ext.state.RegistryProvider.superclass.get.apply(this, arguments);
        this.publish( '/desktop/registry/get', { key: name, value: value } );
        return value;
    },

    clear: function(name) {
        if ( name.match( /^ext/ ) )
            return;
        this.publish( '/desktop/registry/clear', { key: name } );
        return Ext.state.RegistryProvider.superclass.clear.apply(this, arguments);
    }

});



