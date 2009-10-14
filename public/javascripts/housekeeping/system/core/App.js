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
 * Secure Hash Algorithm (SHA1)
 * http://www.webtoolkit.info/
 * License: unknown, public domain assumed
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

Ext.BLANK_IMAGE_URL = 'images/s.gif';


// replaced when the app is initialized
Ext.apply( window.app, {
    
    connection: '/desktop/connect',
    apps: [],
    poweredby: [ 'Ext/'+Ext.version ],
    browserOS: __getBrowserOS(),

    register: function( cfg ) {
        app.apps.push( cfg );
    },

    addAppVersion: function( appVersion ) {
        if ( appVersion !== undefined )
            app.poweredby.push( appVersion );
  
        if ( !Ext.Ajax.defaultHeaders )
            Ext.Ajax.defaultHeaders = {};

        Ext.Ajax.defaultHeaders['X-Powered-By'] = app.poweredby.join( '; ' );
    }

});

app.addAppVersion( 'CometDesktop/'+app.version + ' + i-housekeeping' );

Ext.app.App = function(cfg) {
    Ext.apply(this, cfg);
    Ext.apply(this, app);

    this.addEvents({
        'ready': true,
        'beforeunload': true
    });
    window.app = this;

    Ext.onReady(this.initApp, this);
};


Ext.extend(Ext.app.App, Ext.util.Observable, {
    isReady : false,
    modules : [],
    
    initApp : function() {
        // used to calculate how long it took to load the desktop
        this.startTime = new Date();
        this.loadTime = ( parseInt( this.startTime.dateFormat('U') ) - parseInt( this.initTime.dateFormat('U') ) );
        log( 'load time:'+this.loadTime+' seconds' );

        // prevent backspace (history -1) shortcut
        var map = new Ext.KeyMap(document, [{
            key: Ext.EventObject.BACKSPACE,
            stopEvent: false,
            fn: function(key, e) {
                var t = e.target.tagName;
                if ( !t )
                    return;
                t = t.toLowerCase();
                if (t != "input" && t != "textarea") {
                    log( 'stopping backspace for tag: '+t);
                    e.stopEvent();
                }
            }
        }]);
        /* XXX why did this prevent the backspace trap from working?
        {
            key: Ext.EventObject.ESC,
            stopEvent: true,
            fn: Ext.emptyFn
        }
        */

        this.startConfig = this.startConfig || this.getStartConfig();
        this.desktop = new Ext.Desktop(this);
        
        this.getModules();
        if (this.modules.length) {
            this.initModules(this.modules);
            this.initDesktopConfig();
        }
        
        this.init();
        
        if ( Ext.isIE )
            Ext.EventManager.on(window,'beforeunload',this.eventUnloadIE, this);
        else 
            Ext.EventManager.on(window,'beforeunload',this.eventUnload, this, true);
        
        this.removeLoadingMask();
        
        this.isReady = true;
        this.fireEvent('ready', this);
    },

    eventUnloadIE: function(e) {
        var _this = this;

        function unload() {
            return _this.eventUnload(e);
        }
                
        function stop() {
            document.detachEvent('onstop', stop);
            return unload(e);
        }
        
        switch ( document.readyState ) {
            case 'interactive':
                document.attachEvent('onstop', stop);
                window.setTimeout(function() {
                    document.detachEvent('onstop', stop);
                }, 0);
                break;
                
            default:
                return unload(e);
                break;
        }
    },
    
    eventUnload: function(e) {
        var x = Ext.lib.Ajax.createXhrObject();
        x.conn.open('POST','/authorize/logout',false); // sync request
        
        var originalTitle = document.title;
        document.title = 'Please wait...';

        if (this.fireEvent('beforeunload', this, x) === false) {
            if ( e ) e.stopEvent();
            document.title = originalTitle;
            return;
        }
        
        x.conn.setRequestHeader( 'X-SessionTime', this.startTime.dateFormat('c/U') + '~' + ( new Date ).dateFormat('c/U') );
        x.conn.setRequestHeader( 'X-LoadTime', this.loadTime );
        x.conn.onreadystatechange = Ext.emptyFn;
        x.conn.send( 'v'+this.config.version  );
        document.title = originalTitle;
    },

    getModules : Ext.emptyFn,
    getStartConfig : Ext.emptyFn,
    getLogoutButtonConfig : Ext.emptyFn,
    getDesktopConfig : Ext.emptyFn,
    init : Ext.emptyFn,

    initModules : function(ms) {
        for(var i = 0, len = ms.length; i < len; i++) {
            // instead of enabling this, patch your apps to use app globally
//            ms[i].app = this;
            /* attach the ga pageview handler into the app launcher */
            if ( ms[i].launcher && ms[i].launcher.handler )
                ms[i].launcher.handler = this.gaPageview.createDelegate(this,['/app/'+ms[i].moduleId],false).createSequence(ms[i].launcher.handler);
        }
    },
    
    initDesktopConfig : function(o) {
        if (!o) {
            this.getDesktopConfig();
        } else {
            var l = o.launchers;
            
            l.contextmenu = l.contextmenu || [];
            l.startmenu  = l.startmenu || [];
            l.startmenutool = l.startmenutool || [];
            l.quickstart = l.quickstart || [];
            l.shortcut = l.shortcut || [];
            o.styles = o.styles || [];
            l.autorun = l.autorun || [];
        
            this.desktop.config = o;
            this.desktop.initialConfig = o;
            
            this.initContextMenu(l.contextmenu);
            this.initStartMenu(l.startmenu, false);
            this.initStartMenu(l.startmenutool, true);
            this.initLogoutButton();
            this.initQuickStart(l.quickstart);
            this.initShortcuts(l.shortcut);
            this.initNetworkStatus();
            this.initStyles(o.styles);
            this.initAutoRun(l.autorun);

            var name = o.user.first;
            if ( o.user.last != '' )
                name += ' ' + o.user.last;

            this.gaSetVar('id:'+o.user.id+'/name:'+name);
        }
    },

    initNetworkStatus : function() {
        this.desktop.addNotificationButton('network-status', false);
    },
    
    initAutoRun : function(mIds) {
        if (mIds) {
            for(var i = 0, len = mIds.length; i < len; i++) {
                var m = this.getModule(mIds[i]);
                if (m) {
                    m.autorun = true;
                    if ( m.launcher.handler ) {
                        if ( m.launcher.scope )
                            m.launcher.handler.call( m.launcher.scope );
                        else
                            m.launcher.handler();
                    }
                }
            }
        }
    },

    initContextMenu : function(mIds) {
        if (mIds) {
            for(var i = 0, len = mIds.length; i < len; i++) {
                this.desktop.addContextMenuItem(mIds[i]);
            }
        }
    },
    
    initLogoutButton : function() {
        var config = this.getLogoutButtonConfig();
        this.desktop.taskbar.startMenu.addTool(config);
    },

    initShortcuts : function(mIds) {
        if (mIds) {
            for(var i = 0, len = mIds.length; i < len; i++) {
                this.desktop.addShortcut(mIds[i], false);
            }
        }
    },
    
    initStartMenu : function(mIds, tool) {        
        var startMenu = this.desktop.taskbar.startMenu;
        
        if (mIds) {            
            for(var i = 0, len = mIds.length; i < len; i++) {
                var m = this.getModule(mIds[i]);
                if (m) {
                    addItems(startMenu, m);
                }
            }
        }
        
        function addItems(menu, m) { // recursive function, allows sub menus
            if (m.moduleType == 'menu' && m.items) {
                var items = m.items;
                for(var j = 0, len = items.length; j < len; j++) {
                    var item = app.getModule(items[j]);
                    if (item) {
                        addItems(m.menu, item);
                    }
                }
            }
            if (m.launcher) {
                // XXX hack
                m.launcher.moduleId = m.moduleId;
                if (tool === true) {
                    menu.addTool(m.launcher);
                } else {
                    menu.add(m.launcher);
                }
            }        
        }
    },

    initQuickStart : function(mIds) {
        if (mIds) {
            for(var i = 0, len = mIds.length; i < len; i++) {
                this.desktop.addQuickStartButton(mIds[i], false);
            }
        }
    },
    
    initStyles : function(s) {
        this.desktop.setBackgroundColor(s.backgroundcolor);
        this.desktop.setFontColor(s.fontcolor);
        this.desktop.setTheme({
            id: s.themeid,
            name: s.themename,
            pathtofile: s.themefile
        });
        this.desktop.setTransparency(s.transparency);
        this.desktop.setWallpaper({
            id: s.wallpaperid,
            name: s.wallpapername,
            pathtofile: s.wallpaperfile
        }, true);
        this.desktop.setWallpaperPosition(s.wallpaperposition);
    },

    removeLoadingMask: function() {
        Ext.get('x-loading').remove();
        Ext.get('x-loading-mask').fadeOut({ remove: true, duration: 1.5 });
    },
    
    getModule : function(v) {
        var ms = this.modules || [];
        for(var i = 0, len = ms.length; i < len; i++) {
            if (ms[i].moduleId == v || ms[i].moduleType == v) {
                return ms[i];
            }
        }
        return false;
    },
    
    replaceModule : function(v,obj) {
        var ms = this.modules || [];
        for(var i = 0, len = ms.length; i < len; i++) {
            if (ms[i].moduleId == v || ms[i].moduleType == v) {
                ms[i] = obj;
                return true;
            }
        }
        return false;
    },

    onReady : function(fn, scope) {
        if (!this.isReady) {
            this.on('ready', fn, scope);
        } else {
            fn.call(scope, this);
        }
    },

    getDesktop : function() {
        return this.desktop;
    },

    gaSetVar: function(v) {
        if ( window.pageTracker )
            window.pageTracker._setVar(v);
        return true;
    },

    gaPageview: function(id) {
        if ( window.pageTracker ) {
            window.pageTracker._trackPageview(id);
            log('ga pagetrack: '+id);
        }
        return true;
    }

});


// a panel that is flash friendly
// this fixes the panel so it doesn't refresh when show() is called in firefox
Ext.FlashPanel = function() {
    Ext.FlashPanel.superclass.constructor.apply(this,arguments);
};
Ext.extend(Ext.FlashPanel, Ext.Panel, {

    hideMode: 'visibility',
    bwrapCfg: { tag:'div', position:'absolute', cls:'x-panel-bwrap' }

});


// drag selection box
Ext.DataView.DragSelector = function(cfg){
    cfg = cfg || {};
    var view, regions, proxy, tracker;
    var rs, bodyRegion, dragRegion = new Ext.lib.Region(0,0,0,0);
    var dragSafe = cfg.dragSafe === true;

    this.init = function(dataView) {
        view = dataView;
        view.on('render', onRender);
    };

    function fillRegions() {
        rs = [];
        view.all.each(function(el){
            rs[rs.length] = el.getRegion();
        });
        bodyRegion = view.el.getRegion();
    }

    function cancelClick() {
        return false;
    }

    function onBeforeStart(e) {
        return !dragSafe || e.target == view.el.dom;
    }

    function onStart(e) {
        view.on('containerclick', cancelClick, view, {single:true});
        if (!proxy)
            proxy = view.el.createChild({cls:'x-view-selector'});
        else
            proxy.setDisplayed('block');
        fillRegions();
        view.clearSelections();
    }

    function onDrag(e) {
        var startXY = tracker.startXY;
        var xy = tracker.getXY();

        var x = Math.min(startXY[0], xy[0]);
        var y = Math.min(startXY[1], xy[1]);
        var w = Math.abs(startXY[0] - xy[0]);
        var h = Math.abs(startXY[1] - xy[1]);

        dragRegion.left = x;
        dragRegion.top = y;
        dragRegion.right = x+w;
        dragRegion.bottom = y+h;

        dragRegion.constrainTo(bodyRegion);
        proxy.setRegion(dragRegion);

        for ( var i = 0, len = rs.length; i < len; i++ ){
            var r = rs[i], sel = dragRegion.intersect(r);
            if (sel && !r.selected) {
                r.selected = true;
                view.select(i, true);
            } else if (!sel && r.selected) {
                r.selected = false;
                view.deselect(i);
            }
        }
    }

    function onEnd(e) {
        if (proxy)
            proxy.setDisplayed(false);
    }

    function onRender(view) {
        tracker = new Ext.dd.DragTracker({
            onBeforeStart: onBeforeStart,
            onStart: onStart,
            onDrag: onDrag,
            onEnd: onEnd
        });
        tracker.initEl(view.el);
    }
};

Ext.app.FileDragZone = function(view, config){
    this.view = view;
    this.scroll = false; // or the desktop scrolls... which is bad
    Ext.app.FileDragZone.superclass.constructor.call(this, view.getEl(), config);
};

Ext.extend(Ext.app.FileDragZone, Ext.dd.DragZone, {
    
    getDragData : function(e) {
        var target = e.getTarget(this.targetCls || '.thumb-wrap');
        if (target) {
            var view = this.view;
            if (!view.isSelected(target)) {
                view.onClick(e);
            }
            var records = view.getSelectedRecords();
            var dragData = {
                selections: records,
                nodes: view.getSelectedNodes()
            };
            if (records.length == 1) {
                dragData.ddel = target;
                dragData.single = true;
            } else {
                var div = document.createElement('div'); // create the multi element drag "ghost"
                div.className = 'multi-proxy';
                /*
                for(var i = 0, len = selNodes.length; i < len; i++){
                    div.appendChild(selNodes[i].firstChild.firstChild.cloneNode(true)); // image nodes only
                    if((i+1) % 3 == 0){
                        div.appendChild(document.createElement('br'));
                    }
                }*/
                var count = document.createElement('div'); // selected image count
                count.innerHTML = records.length + ' selected';
                div.appendChild(count);
                
                dragData.ddel = div;
                dragData.multi = true;
            }
            return dragData;
        }
        return false;
    },

    // box the icon after a failed drag
    afterRepair: function() {
        if ( this.dragData.nodes ) {
            for(var i = 0, len = this.dragData.nodes.length; i < len; i++){
                Ext.fly(this.dragData.nodes[i]).frame('#8db2e3', 1);
            }
        }
        this.dragging = false;    
    },
    
    // override the default repairXY with one offset for the margins and padding
    getRepairXY: function(e) {
        if (!this.dragData.multi) {
            var xy = Ext.Element.fly(this.dragData.ddel).getXY();
            xy[0] += 3; xy[1] += 3;
            return xy;
        }
        return false;
    }

});

// Label editor
/*

Ext.DataView.LabelEditor = function(cfg, field){
    Ext.DataView.LabelEditor.superclass.constructor.call(this,
        field || new Ext.form.TextField({
            allowBlank: false,
            growMin:90,
            growMax:240,
            grow:true,
            selectOnFocus:true
        }), cfg
    );
}

Ext.extend(Ext.DataView.LabelEditor, Ext.Editor, {
    alignment: "tl-tl",
    hideEl : false,
    cls: "x-small-editor",
    shim: false,
    completeOnEnter: true,
    cancelOnEsc: true,
    labelSelector: 'span.x-editable',

    init : function(view){
        this.view = view;
        view.on('render', this.initEditor, this);
        this.on('complete', this.onSave, this);
    },

    initEditor : function(){
        this.view.getEl().on('mousedown', this.onMouseDown, this, {delegate: this.labelSelector});
    },

    onMouseDown : function(e, target){
        if(!e.ctrlKey && !e.shiftKey){
            var item = this.view.findItemFromChild(target);
            e.stopEvent();
            var record = this.view.store.getAt(this.view.indexOf(item));
            this.startEdit(target, record.data[this.dataIndex]);
            this.activeRecord = record;
        }else{
            e.preventDefault();
        }
    },

    onSave : function(ed, value){
        this.activeRecord.set(this.dataIndex, value);
    }
});
*/

// patch ext-2.2
if ( Ext.isChrome === undefined ) {
    Ext.apply( Ext, {
        isChrome: Ext.isSafari3 && navigator.userAgent.toLowerCase().indexOf('chrome') != -1
    });
}

function __getBrowserOS() {
    var os = '-unknown';
    if ( Ext.isWindows )
        os = '-Windows';
    else if ( Ext.isMac )
        os = '-Mac';
    else if ( Ext.isLinux )
        os = '-Linux';

    if ( Ext.isSecure )
        os += '[https]';

    if ( Ext.isIE6 )
        return 'IE6'+os;
    else if ( Ext.isIE7 )
        return 'IE7' + os;
    else if ( Ext.isIE )
        return 'IE' + os;
    else if ( Ext.isOpera )
        return 'Opera' + os;
    else if ( Ext.isChrome )
        return 'Chrome' + os;
    else if ( Ext.isSafari3 )
        return 'Safari3' + os;
    else if ( Ext.isSafari2 )
        return 'Safari2' + os;
    else if ( Ext.isSafari )
        return 'Safari' + os;
    else if ( Ext.isGecko3 )
        return 'Gecko3' + os;
    else if ( Ext.isGecko2 )
        return 'Gecko2' + os;
    else if ( Ext.isGecko )
        return 'Gecko' + os;
    else if ( Ext.isAir )
        return 'AIR' + os;

    return 'unknown'+os;
}


/**
*
*  Secure Hash Algorithm (SHA1)
*  http://www.webtoolkit.info/
*  License: unknown, public domain assumed
*
**/

function sha1 (msg) {

    function rotate_left(n,s) {
        var t4 = ( n<<s ) | (n>>>(32-s));
        return t4;
    };

    function lsb_hex(val) {
        var str="";
        var i;
        var vh;
        var vl;

        for( i=0; i<=6; i+=2 ) {
            vh = (val>>>(i*4+4))&0x0f;
            vl = (val>>>(i*4))&0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };

    function cvt_hex(val) {
        var str="";
        var i;
        var v;

        for( i=7; i>=0; i-- ) {
            v = (val>>>(i*4))&0x0f;
            str += v.toString(16);
        }
        return str;
    };


    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0, len = string.length; n < len; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    msg = Utf8Encode(msg);

    var msg_len = msg.length;

    var word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
        j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
        word_array.push( j );
    }

    switch( msg_len % 4 ) {
        case 0:
            i = 0x080000000;
        break;
        case 1:
            i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
        break;

        case 2:
            i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
        break;

        case 3:
            i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;
        break;
    }

    word_array.push( i );

    while( (word_array.length % 16) != 14 ) word_array.push( 0 );

    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff );


    for ( blockstart=0, len = word_array.length; blockstart<len; blockstart+=16 ) {

        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
        for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for( i= 0; i<=19; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=20; i<=39; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=40; i<=59; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=60; i<=79; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;

    }

    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();
}
