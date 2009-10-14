/*
 * Borrowed from ExtJs forum thread :  http://extjs.com/forum/showthread.php?t=17691
*/
Ext.override(Ext.data.Connection, {
   request : function(o){
       if(this.fireEvent("beforerequest", this, o) !== false){
           var p = o.params;

           if(typeof p == "function"){
               p = p.call(o.scope||window, o);
           }
           if(typeof p == "object"){
               p = Ext.urlEncode(p);
           }
           if(this.extraParams){
               var extras = Ext.urlEncode(this.extraParams);
               p = p ? (p + '&' + extras) : extras;
           }

           var url = o.url || this.url;
           if(typeof url == 'function'){
               url = url.call(o.scope||window, o);
           }

           if(o.form){
               var form = Ext.getDom(o.form);
               url = url || form.action;

               var enctype = form.getAttribute("enctype");
               if(o.isUpload || (enctype && enctype.toLowerCase() == 'multipart/form-data')){
                   return this.doFormUpload(o, p, url);
               }
               var f = Ext.lib.Ajax.serializeForm(form);
               p = p ? (p + '&' + f) : f;
           }

           var hs = o.headers;
           if(this.defaultHeaders){
               hs = Ext.apply(hs || {}, this.defaultHeaders);
               if(!o.headers){
                   o.headers = hs;
               }
           }

           var cb = {
               success: this.handleResponse,
               failure: this.handleFailure,
               scope: this,
               argument: {options: o},
               timeout : this.timeout
           };

           var method = o.method||this.method||(p ? "POST" : "GET");

           if(method == 'GET' && (this.disableCaching && o.disableCaching !== false) || o.disableCaching === true){
               url += (url.indexOf('?') != -1 ? '&' : '?') + '_dc=' + (new Date().getTime());
           }

           if(typeof o.autoAbort == 'boolean'){ // options gets top priority
               if(o.autoAbort){
                   this.abort();
               }
           }else if(this.autoAbort !== false){
               this.abort();
           }
           if((method == 'GET' && p) || o.xmlData || o.jsonData){
               url += (url.indexOf('?') != -1 ? '&' : '?') + p;
               p = '';
           }
           if (o.scriptTag || this.scriptTag) {
              this.transId = this.scriptRequest(method, url, cb, p, o);
           } else {
              this.transId = Ext.lib.Ajax.request(method, url, cb, p, o);
           }
           return this.transId;
       }else{
           Ext.callback(o.callback, o.scope, [o, null, null]);
           return null;
       }
   },
   scriptRequest : function(method, url, cb, data, options) {
       var transId = ++Ext.data.ScriptTagProxy.TRANS_ID;
       var trans = {
           id : transId,
           cb : options.callbackName || "stcCallback"+transId,
           scriptId : "stcScript"+transId,
           options : options
       };

       url += (url.indexOf("?") != -1 ? "&" : "?") + data + String.format("&{0}={1}", options.callbackParam || this.callbackParam || 'callback', trans.cb);

       var conn = this;
       window[trans.cb] = function(o){
           conn.handleScriptResponse(o, trans);
       };

//      Set up the timeout handler
       trans.timeoutId = this.handleScriptFailure.defer(cb.timeout, this, [trans]);

       var script = document.createElement("script");
       script.setAttribute("src", url);
       script.setAttribute("type", "text/javascript");
       script.setAttribute("id", trans.scriptId);
       document.getElementsByTagName("head")[0].appendChild(script);

       return trans;
   },

   handleScriptResponse : function(o, trans){
       this.transId = false;
       this.destroyScriptTrans(trans, true);
       var options = trans.options;
       //      Attempt to parse a string parameter as XML.
       var doc;
       if (typeof o == 'string') {
           if (window.ActiveXObject) {
               var doc = new ActiveXObject("Microsoft.XMLDOM");
               doc.async = "false";
               doc.loadXML(o);
           } else {
               var doc = new DOMParser().parseFromString(o,"text/xml");
           }
       }

//      Create the bogus XHR
       response = {
           responseObject: o,
           responseText: (typeof o == "object") ? Ext.util.JSON.encode(o) : String(o),
           responseXML: doc,
           argument: options.argument
       }
       this.fireEvent("requestcomplete", this, response, options);
       Ext.callback(options.success, options.scope, [response, options]);
       Ext.callback(options.callback, options.scope, [options, true, response]);
   },

   handleScriptFailure: function(trans) {
       this.trans = false;
       this.destroyScriptTrans(trans, false);
       var options = trans.options;
       response = {
           argument:  options.argument,
           status: 500,
           statusText: 'Server failed to respond',
           responseText: ''
       };
       this.fireEvent("requestexception", this, response, options, {
           status: -1,
           statusText: 'communication failure'
       });
       Ext.callback(options.failure, options.scope, [response, options]);
       Ext.callback(options.callback, options.scope, [options, false, response]);
   },
   
   // private
   destroyScriptTrans : function(trans, isLoaded){
       document.getElementsByTagName("head")[0].removeChild(document.getElementById(trans.scriptId));
       clearTimeout(trans.timeoutId);
       if(isLoaded){
           window[trans.cb] = undefined;
           try{
               delete window[trans.cb];
           }catch(e){}
       }else{
           // if hasn't been loaded, wait for load to remove it to prevent script error
           window[trans.cb] = function(){
               window[trans.cb] = undefined;
               try{
                   delete window[trans.cb];
               }catch(e){}
           };
       }
   }
});




/**
 * Ext.ux.CssProxy
 * Version 1.0
 * Copyright (c) 2009 - David W Davis - http://xant.us/
 *
 * Adapted from CSSHttpRequest for Extjs
 * 
 * CSSHttpRequest
 * Copyright 2008 nb.io - http://nb.io/
 * http://nb.io/hacks/csshttprequest/
 * Licensed under Apache License, Version 2.0 - http://www.apache.org/licenses/LICENSE-2.0.html
 */

/**
 * @class Ext.ux.CssProxy
 * @extends Ext.data.DataProxy
 * An implementation of Ext.data.DataProxy that reads a data object from a URL which may be in a domain
 * other than the originating domain of the running page.<br>
 * <p>
 * <b>Note that if you are retrieving data from a page that is in a domain that is NOT the same as the originating domain
 * of the running page, you must use Ext.data.ScriptTagProxy or this class, rather than HttpProxy.</b><br>
 * <p>
 * The content passed back from a server resource requested by a CssProxy <b>must</b> be specially encoded css.
 * <p>
 * Data is encoded on the server into URI-encoded 2KB chunks and serialized into CSS rules with a modified
 * data: URI scheme. The selector should be in the form #c<N>, where N is an integer index in [0,].
 * The response is decoded and returned to the callback function as a string:
 * <p>
 * <pre><code>
 * #c0 { background: url(data:,Hello%20World!); }
 * #c1 { background: url(data:,I.m%20text%20encoded%20in%20CSS!); }
 * #c2 { background: url(data:,I%20like%20arts%20and%20crafts.); }
 * <pre></code>
 * <p>
 * You can pass a simple reader to Ext.ux.CssProxy and handle the data directly, almost like you would with Ext.Ajax.
 * For example this fetches a json response and returns an object:
 * <pre><code>
 * 
 * SimpleReader = function() {
 *    SimpleReader.superclass.constructor.apply(this, arguments);
 * };
 * Ext.extend(SimpleReader, Ext.data.DataReader, {
 *    read: function(r) { return r.responseText; },
 *    readRecords: function(o) { return o; }
 * });
 *
 * var conn = new Ext.ux.CssProxy({ url: "http://s.nb.io/hacks/csshttprequest/time-json/" });
 * conn.load(
 *     { },                    // params
 *     new SimpleReader(),     // reader
 *     function(r) {           // callback
 *         r = Ext.decode(r);  // convert to json
 *         alert('Happy '+r.year+'!  iso:'+r.isoformat);
 *     }
 * );
 * </pre></code>
 *
 * @constructor
 * @param {Object} config A configuration object.
 */
Ext.namespace('Ext.ux');

Ext.ux.CssProxy = function(config){
    Ext.ux.CssProxy.superclass.constructor.call(this);
    Ext.apply(this, config);
    this.doc = document.documentElement;
    
    /**
     * @event loadexception
     * Fires if an exception occurs in the Proxy during data loading.  This event can be fired for one of two reasons:
     * <ul><li><b>The load call timed out.</b>  This means the load callback did not execute within the time limit
     * specified by {@link #timeout}.  In this case, this event will be raised and the
     * fourth parameter (read error) will be null.</li>
     * <li><b>The load succeeded but the reader could not read the response.</b>  This means the server returned
     * data, but the configured Reader threw an error while reading the data.  In this case, this event will be 
     * raised and the caught error will be passed along as the fourth parameter of this event.</li></ul>
     * Note that this event is also relayed through {@link Ext.data.Store}, so you can listen for it directly
     * on any Store instance.
     * @param {Object} this
     * @param {Object} options The loading options that were specified (see {@link #load} for details).  If the load
     * call timed out, this parameter will be null.
     * @param {Object} arg The callback's arg object passed to the {@link #load} function
     * @param {Error} e The JavaScript Error object caught if the configured Reader could not read the data.
     * If the load call returned success: false, this parameter will be null.
     */
};

Ext.ux.CssProxy.TRANS_ID = 1000;
Ext.ux.CssProxy.sandbox = function(x) { };
Ext.ux.CssProxy.MATCH_ORDINAL = /#c(\d+)/;
Ext.ux.CssProxy.MATCH_URL = /url\("?data\:[^,]*,([^")]+)"?\)/; // "

Ext.extend(Ext.ux.CssProxy, Ext.data.DataProxy, {
    /**
     * @cfg {String} url The URL from which to request the data object.
     */
    /**
     * @cfg {Number} timeout (optional) The number of milliseconds to wait for a response. Defaults to 30 seconds.
     */
    timeout: 30000,
    /**
     *  @cfg {Boolean} nocache (optional) Defaults to true. Disable caching by adding a unique parameter
     * name to the request.
     */
    nocache: true,

    /**
     * Load data from the configured URL, read the data object into
     * a block of Ext.data.Records using the passed Ext.data.DataReader implementation, and
     * process that block using the passed callback.
     * @param {Object} params An object containing properties which are to be used as HTTP parameters
     * for the request to the remote server.
     * @param {Ext.data.DataReader} reader The Reader object which converts the data
     * object into a block of Ext.data.Records.
     * @param {Function} callback The function into which to pass the block of Ext.data.Records.
     * The function must be passed <ul>
     * <li>The Record block object</li>
     * <li>The "arg" argument from the load function</li>
     * <li>A boolean success indicator</li>
     * </ul>
     * @param {Object} scope The scope in which to call the callback
     * @param {Object} arg An optional argument which is passed to the callback as its second parameter.
     */
    load: function(params, reader, callback, scope, arg){
        if (this.fireEvent('beforeload', this, params) !== false) {

            if (this.autoAbort !== false) {
                this.abort();
            }

            var p = Ext.urlEncode(Ext.apply(params, this.extraParams));

            var url = this.url;
            url += (url.indexOf('?') != -1 ? '&' : '?') + p;
            if (this.nocache) {
                url += '&_dc=' + (new Date().getTime());
            }
            var transId = ++Ext.ux.CssProxy.TRANS_ID;
            
            var trans = {
                id: transId,
                cb: 'chrCallback'+transId,
                frameId: 'chrIframe'+transId,
                params: params,
                arg: arg,
                url: url,
                callback: callback,
                scope: scope,
                reader: reader
            };
            
            var iframe = document.createElement( 'iframe' );
            iframe.setAttribute( 'id', trans.frameId );
            iframe.style.position = 'absolute';
            iframe.style.left = iframe.style.top = '-1000px';
            iframe.style.width = iframe.style.height = 0;
            this.doc.appendChild( iframe );

            trans.document = iframe.contentDocument || iframe.contentWindow.document;
            
            window[trans.cb] = this.handleResponse.createDelegate( this, [trans] );

            trans.document.open('text/html', false);
            trans.document.write("<html><head>");
            trans.document.write("<link rel='stylesheet' type='text/css' media='print, csshttprequest' href='" + Ext.util.Format.htmlEncode(url) + "' />");
            trans.document.write("</head><body>");
            trans.document.write("<script type='text/javascript'>");
            trans.document.write("(function(){var w = window; var p = w.parent; p.Ext.ux.CssProxy.sandbox(w); w.onload = function(){p." + trans.cb + "();};})();");
            trans.document.write("</script>");
            trans.document.write("</body></html>");
            trans.document.close();
            
            trans.timeoutId = this.handleFailure.defer( this.timeout, this, [trans] );

            this.trans = trans;
        }else{
            callback.call(scope||this, null, arg, false);
        }
    },

    // private
    isLoading: function(){
        return this.trans ? true : false;
    },

    /**
     * Abort the current server request.
     */
    abort: function(){
        if(this.isLoading()){
            this.destroyTrans(this.trans);
        }
    },

    // private
    destroyTrans: function(trans, isLoaded){
        window.setTimeout(function() {
            try { 
				 //this.doc.removeChild(document.getElementById(trans.frameId)); 
				var iframe = document.getElementById(trans.frameId);
				iframe.parentNode.removeChild(iframe);
			} catch(e) {
				// check the exception
				var f = e;
			};
        }, 0);
        clearTimeout(trans.timeoutId);
        if(isLoaded){
            window[trans.cb] = undefined;
            try{
                delete window[trans.cb];
            }catch(e){}
        }else{
            // if hasn't been loaded, wait for load to remove it to prevent script error
            window[trans.cb] = function(){
                window[trans.cb] = undefined;
                try{
                    delete window[trans.cb];
                }catch(e){}
            };
        }
    },

    // private
    handleResponse: function(trans){
        var o = this.parseCSS(trans);
        this.trans = false;
        this.destroyTrans(trans, true);
        var result;
        try {
            result = trans.reader.read({ responseText: o });
            //result = trans.reader.read(o);
        }catch(e){
            this.fireEvent('loadexception', this, o, trans.arg, e);
            trans.callback.call(trans.scope||window, null, trans.arg, false);
            return;
        }
        this.fireEvent('load', this, o, trans.arg);
        trans.callback.call(trans.scope||window, result, trans.arg, true);
    },

    // private
    handleFailure: function(trans){
        this.trans = false;
        this.destroyTrans(trans, false);
        this.fireEvent('loadexception', this, null, trans.arg);
        trans.callback.call(trans.scope||window, null, trans.arg, false);
    },
    
    // private
    parseCSS: function(trans) {
        var data = [];
        try {
            // Safari, IE and same-domain Firefox
            var rules = trans.document.styleSheets[0].cssRules || trans.document.styleSheets[0].rules;
            for ( var i = 0, len = rules.length; i < len; i++ ) {
                try {
                    var r = rules.item ? rules.item(i) : rules[i];
                    var ord = r.selectorText.match(Ext.ux.CssProxy.MATCH_ORDINAL)[1];
                    var val = r.style.backgroundImage.match(Ext.ux.CssProxy.MATCH_URL)[1];
                    data[ord] = val;
                } catch(e) {};
            }
        } catch(e) {
            // catch same-domain exception
            trans.document.getElementsByTagName('link')[0].setAttribute('media', 'screen');
            var x = trans.document.createElement('div');
            x.innerHTML = 'x';
            trans.document.body.appendChild(x);
            var ord = 0;
            try {
                while (1) {
                    x.id = 'c' + ord;
                    var style = trans.document.defaultView.getComputedStyle(x, null);
                    var bg = style['background-image'] || style.backgroundImage || style.getPropertyValue('background-image');
                    var val = bg.match(Ext.ux.CssProxy.MATCH_URL)[1];
                    data[ord] = val;
                    ord++;
                }
            } catch(e) {};
        }
        return decodeURIComponent(data.join(''));
    }

});


Ext.tree.XDomainTreeLoader = function(config){
  Ext.tree.XDomainTreeLoader.superclass.constructor.call(this, config);
};

Ext.extend(Ext.tree.XDomainTreeLoader, Ext.tree.TreeLoader, {
    getParams: function(node){
      var bp = this.baseParams;
      bp.node = node.id;
      return bp;
    },

    requestData: function(node, callback){
      var url = this.url || this.dataUrl;
      if(url && !this.proxy) {
        this.proxy = new Ext.data.ScriptTagProxy({url: this.url}); 
      }
      this.proxy.url = url;
      
      if(this.fireEvent("beforeload", this, node, callback) !== false) { 
        var p = this.getParams(node);
        var reader = new Ext.data.JsonReader({root:'children'}, ['text', 'id', 'cls', 'href', 'leaf']);
        this.proxy.load(p, reader, this.handleResponse, this, {cb:callback,node:node});
      }
      else{
        // if the load is cancelled, make sure we notify the node that we are done
        if(typeof callback == "function"){
          callback();
        }
      }
    },

    processResponse: function(data, node, callback){
      try {
        var o = data;
        node.beginUpdate();
        for(var i = 0, len = o.length; i < len; i++) {
          var n = this.createNode(o[i].data);
          if(n){
            node.appendChild(n);
          }
        }
        node.endUpdate();
        if(typeof callback == "function") {
          callback(this, node);
        }
      }
      catch(e) {
        this.handleFailure(data);
      }
    },

    handleResponse: function(data, arg, isSuccess) {
      console.log("data: %o\narg: %o\nisSuccess: %o", data, arg, isSuccess);
      data = data.records;
      var o;
      if(this.rootField) {
        o = data[this.rootField];
      }
      else {
        o = data;
      }
      this.processResponse(o, arg.node, arg.cb);
      this.fireEvent("load", this, arg.node, data);
    },

    handleFailure: function(data, node, callback){
      this.transId = false;
      this.fireEvent("loadexception", this, node, data);
      if(typeof callback == "function"){
        callback(this, node);
      }
    }
});