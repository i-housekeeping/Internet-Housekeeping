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

/**
 * @class Ext.state.AJAXProvider
 * @extends Ext.state.Provider
 * An AJAX state Provider implementation which saves state via ajax
 * <br />Usage:
 <pre><code>
   var cp = new Ext.state.AJAXProvider({
       url: "/stateprovider.cgi",
       state: { "foo-window": { "x": 120, "y": 100 } }
   });
   Ext.state.Manager.setProvider(cp);
 </code></pre>
 * @cfg {String} url The url for the AJAXProvider interface
 * @cfg {Object} state The state for the AJAXProvider, if specified, then the initial ajax fetch will be skipped
 * @constructor
 * Create a new AJAXProvider
 * @param {Object} config The configuration object
 */

Ext.state.AJAXProvider = function(config) {
    Ext.state.AJAXProvider.superclass.constructor.call(this);
    /**
     * @event stateloaded
     * Fires when the state is loaded.
     * @param {Provider} this This state provider
     * @param {Object} state The state that was loaded
     */
//    this.addEvents( 'stateloaded' );
    this.url = '/desktop/connect';
    this.state = {};
    Ext.apply(this, config);
    if ( config.state )
        return;
    this.readData();
};

Ext.extend(Ext.state.AJAXProvider, Ext.state.Provider, {

    set: function(name, value) {
        if(typeof value == "undefined" || value === null) {
            this.clear(name);
            return;
        }
        /* avoid duplicate set calls */
//        var currentJSON = Ext.util.JSON.encode( this.state[name] );
        var newJSON = Ext.util.JSON.encode( value );
//        if ( currentJSON !== newJSON )
            this.setData(name, newJSON);
        return Ext.state.AJAXProvider.superclass.set.apply(this, arguments);
    },
    
    get: function(name, defaultValue) {
        return Ext.state.AJAXProvider.superclass.get.apply(this, arguments);
    },

    clear: function(name) {
        this.setData(name,null);
        return Ext.state.AJAXProvider.superclass.clear.apply(this, arguments);
    },

    // private
    readData: function() {
        Ext.Ajax.request({
            url: this.url,
            success: function(r) {
                var data = {};
                if ( r && r.responseText )
                    data = eval( "(" + r.responseText + ")" );
                if ( data.state )
                    this.state = data.state;
//                else
//                    log('read failed '+r);
                this.fireEvent( 'stateloaded', this, this.state );
            },
            failure: function() {
//                log('set fail');
            },
            params: {
                moduleId: 'registry',
                task: 'fetch',
                what: 'all'
            },
            scope: this
        });
    },

    // private
    setData: function(name, value) {
        Ext.Ajax.request({
            url: this.url,
            success: function(r) {
/*                    
                var data = {};
                if ( r && r.responseText )
                    data = eval( "(" + r.responseText + ")" );
                if ( data.success )
                    log('set success for name:'+name);
                else
                    log('failed in set for name:'+name);
*/
            },
            failure: function() {
//                log('set failed');
            },
            params: {
                moduleId: 'registry',
                task: 'set',
                what: name,
                value: value
            }
        });
    }

});


