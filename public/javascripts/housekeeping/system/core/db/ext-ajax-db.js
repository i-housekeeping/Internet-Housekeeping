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

Ext.data.AjaxDB = Ext.extend(Ext.data.SqlDB, {

	open : function(db, cb, scope){
		this._db = db;
        this.openState = true;
        Ext.callback(cb,scope,[this]);
        this.fireEvent('open',this);
	},

	close : Ext.emptyFn,

	onOpen : function(cb, scope){
		this.openState = true;
		Ext.callback(cb, scope, [this]);
		this.fireEvent('open', this);
	},

	onClose : function(){
		this.fireEvent('close', this);
	},

	onError : function(e, type, cb, scope, error){
        log('sql error:'+(error ? error : ''));
		Ext.callback(cb, scope, [false, e]);
	},

	onResult : function(e, type, cb, scope, res) {
        log('sql result:'+Ext.encode(res));
	    Ext.callback(cb, scope, [( type == 'exec' ? true : res ), e]);
	},

	doQuery : function(type, cb, scope, sql, args){
        var req;
        var params = {
            moduleId: 'ajax-db',
            task: type,
            what: this._db,
            sql: sql,
			format: 'js'
        };
        if ( args )
            params.args = Ext.encode( args );
        
        log('sql query:'+Ext.encode(params));

        req = Ext.Ajax.request({
            url: 'http://localhost:3001/desktop/connect',
            params: params,
			scriptTag: true,
		    callbackParam: 'jsoncallback',
		    timeout: 10,
            success: function(o) {
                if ( o && o.responseText ) {
                    var data = Ext.decode( o.responseText );
                    if ( data.success )
        		        return this.onResult( req, type, cb, scope, data.result );
                    return this.onError( req, type, cb, scope, data.error );
                }
                this.onError( req, type, cb, scope, 'malformed response' );
            },
            failure: function() {
		        this.onError( req, type, cb, scope, 'ajax error' );
            },
            scope: this
         });

		return req;
	},

	exec : function(sql, cb, scope){
        this.doQuery('exec', cb, scope, sql);
	},

	execBy : function(sql, args, cb, scope){
		this.doQuery('exec', cb, scope, sql, args);
	},

	query : function(sql, cb, scope){
		this.doQuery('query', cb, scope, sql);
	},

	queryBy : function(sql, args, cb, scope){
		this.doQuery('query', cb, scope, sql);
	},

    addParams : function(stmt, args){
		if(!args){ return; }
		for(var key in args){
			if(args.hasOwnProperty(key)){
				if(!isNaN(key)){
					stmt.parameters[parseInt(key)+1] = args[key];
				}else{
					stmt.parameters[':' + key] = args[key];
				}
			}
		}
		return stmt;
	}
});

Ext.data.SqlDB.getInstance = function(db, config){
    return new Ext.data.AjaxDB(config);
};
