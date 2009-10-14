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

Ext.app.Module = function(config){
    Ext.apply(this, config);
    Ext.app.Module.superclass.constructor.call(this);
    this.init(config);
}

Ext.extend(Ext.app.Module, Ext.util.Observable, {
    init : Ext.emptyFn
});

// TODO move onDemand to a different module

Ext.app.loadOnDemand = Ext.extend(Ext.app.Module, {
    
    init: function(cfg) {
        this.moduleType = cfg.moduleType;
        this.launcher = cfg;
        this.launcher.handler = this.load;
        this.launcher.scope = this;
        this.loading = false;
    },

    load: function() {
        if ( this.loading )
            return;
        this.loading = true;
        this.publish( '/desktop/notify',{
            title: 'Loading...',
            iconCls: 'info-icon',
            html: 'Loading '+this.text
        });
		Ext.Ajax.request({
			success: function(o) {
                var construct;
                try {
    	            eval( o.responseText );
                    construct = eval("("+this.pkg+")");
                } catch(e) {
                    log('error while loading '+this.moduleId+' '+e);
                };
                this.loading = false;
                if ( !construct ) {
                    this.publish( '/desktop/notify',{
                        title: 'Failed',
                        iconCls: 'error-icon',
                        html: 'App failed to load'
                    });
                    return;
                }
                this.launcher = null;
                var m = new construct();
                this.launcher = m.launcher;
                app.replaceModule( this.moduleId, m );
                
                if ( m.launcher && m.launcher.handler )
                    m.launcher.handler = app.gaPageview.createDelegate(app,['/app/'+m.moduleId],false).createSequence(m.launcher.handler);
                
                if ( m.launcher.scope )
                    m.launcher.handler.call( m.launcher.scope );
                else
                    m.launcher.handler();
                
                if ( this.destroy )
                    this.destroy.defer( 1, this );
			},
			failure: function() {
                this.loading = false;
                this.publish( '/desktop/notify',{
                    title: 'Failed',
                    iconCls: 'error-icon',
                    html: 'App failed to load'
                });
			},
			scope: this,
			url: app.connection,
            params: {
                moduleId: this.moduleId,
                task: 'on-demand',
                what: 'src',
				format: 'js'
            },
			scriptTag: true,
			callbackParam: 'jsoncallback',
			timeout: 10
		});
    }

});


