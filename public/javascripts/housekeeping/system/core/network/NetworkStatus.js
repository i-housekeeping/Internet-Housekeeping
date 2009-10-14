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

Ext.app.NetworkStatus = Ext.extend(Ext.app.Module, {

    moduleType : 'core', // core apps don't show up in preferences
    moduleId : 'network-status',
    
    init : function() {
        this.launcher = {
            iconCls: 'network-status-icon',
            scope: this,
            text: 'Network Status',
            tooltip: '<b>Network Status</b><br />Red: Inactive  Green: Request pending'
        };
        this.isOn = false;
        Ext.Ajax.on('beforerequest', this.beforeRequest, this);
        Ext.Ajax.on('requestcomplete', this.requestComplete, this);
        Ext.Ajax.on('requestexception', this.requestException, this);
    },

    beforeRequest: function(conn) {
        if ( !conn.defaultHeaders )
            conn.defaultHeaders = {};
        conn.defaultHeaders['X-Client-Time'] = ( new Date ).dateFormat('c/U');
        conn.defaultHeaders['X-Session-Duration'] = ( new Date ).dateFormat('U') - app.startTime.dateFormat('U');
        this.activity();
    },
    
    requestComplete: function() {
        this.activity( true );
        // TODO track bytes, and add it to the tooltip
    },

    requestException: function(conn,res,o) {
        // remotely logged out
        if ( res.status && res.status == 401 )
            return window.location = 'logout.pl';
        
        this.activity( true );
                            
        // set to yellow or red?
        this.publish( '/desktop/notify',{
            title: 'AJAX Error',
            iconCls: 'network-status-icon',
            html: 'AJAX Request Failed'+( ( Ext.log || window.console ) ? '<br>See the log for more info' : '' )
        });
        log('AJAX Request Failed');
    },
    
    activity: function( off ) {
        if ( off || this.isOn ) {
            this.isOn = false;
            if ( this.trayButton )
                this.trayButton.setIconClass('network-status-icon');
        } else {
            this.isOn = true;
            if ( this.trayButton )
                this.trayButton.setIconClass('network-status-act-icon');
            /*
            if ( this.timer )
                clearTimeout( this.timer );

            var _this = this;
            this.timer = window.setTimeout(function() {
                _this.activity( true );
            }, 400);
            */
        }
    }


});
    
app.register('Ext.app.NetworkStatus');

