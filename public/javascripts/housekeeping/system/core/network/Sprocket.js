
// TODO move to sprocket support file

if ( window.sprocket ) {
    window.sprocket.socketConfig = {
        url:    'http://x.__DOMAIN__/comet/sprocket.socket',
        xurl:   'http://x.__DOMAIN__/comet/iframe.html',
        xdomain: true
    } ;
}

if ( Ext.ux.Sprocket && Ext.ux.Sprocket.Socket )
    app.addAppVersion( 'Sprocket.Socket/'+Ext.ux.Sprocket.Socket.prototype.version );

app.onReady(function() {
    if ( window.sprocket && !window.sprocket.SocketMan )
        window.sprocket.SocketMan = new Ext.ux.Sprocket.SocketManager(window.sprocket.socketConfig);

    this.on('beforeunload', function(x) {
        var sids = ( window.sprocket && sprocket.SocketMan ) ? sprocket.SocketMan.getAllConnectionIds() : [];
        if ( sids.length > 0 ) {
            x.conn.setRequestHeader( 'X-Sprockets', sids.join(',') );
            document.title += 'closing sockets:'+sids.length;
        }
    });

}, app);

