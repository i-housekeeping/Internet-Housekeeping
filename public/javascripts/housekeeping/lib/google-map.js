/**
 * @author Shea Frederick
 * http://www.vinylfox.com
 */

Ext.namespace('Ext.ux');
 
/**
 * This extension adds Google maps functionality to any panel or panel based component (ie: windows).
 * @class Ext.ux.GMapPanel
 * @extends Ext.Panel
 * @param {Object} config The config object
 */
Ext.ux.GMapPanel = Ext.extend(Ext.Panel, {
    respErrors: [{
            code: G_GEO_BAD_REQUEST,
            msg: 'A directions request could not be successfully parsed. For example, the request may have been rejected if it contained more than the maximum number of waypoints allowed.'
        },{
            code: G_GEO_SERVER_ERROR,
            msg: 'A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.'
        },{
            code: G_GEO_MISSING_QUERY,
            msg: 'The HTTP q parameter was either missing or had no value. For geocoding requests, this means that an empty address was specified as input. For directions requests, this means that no query was specified in the input.'
        },{
            code: G_GEO_MISSING_ADDRESS,
            msg: 'Synonym for G_GEO_MISSING_QUERY.'
        },{
            code: G_GEO_UNKNOWN_ADDRESS,
            msg: 'No corresponding geographic location could be found for the specified address. This may be due to the fact that the address is relatively new, or it may be incorrect.'
        },{
            code: G_GEO_UNAVAILABLE_ADDRESS,
            msg: 'The geocode for the given address or the route for the given directions query cannot be returned due to legal or contractual reasons.'
        },{
            code: G_GEO_UNKNOWN_DIRECTIONS,
            msg: 'The GDirections object could not compute directions between the points mentioned in the query. This is usually because there is no route available between the two points, or because we do not have data for routing in that region.'
        },{
            code: G_GEO_BAD_KEY,
            msg: 'The given key is either invalid or does not match the domain for which it was given.'
        },{
            code: G_GEO_TOO_MANY_QUERIES,
            msg: 'The given key has gone over the requests limit in the 24 hour period or has submitted too many requests in too short a period of time. If you\'re sending multiple requests in parallel or in a tight loop, use a timer or pause in your code to make sure you don\'t send the requests too quickly.'
    }],
    respErrorTitle : 'Error',
    geoErrorMsgUnable : 'Unable to Locate the Address you provided',
    geoErrorTitle : 'Address Location Error',
    geoErrorMsgAccuracy : 'The address provided has a low accuracy.<br><br>Level {0} Accuracy (8 = Exact Match, 1 = Vague Match)',
    /**
    * @cfg {String} gmapType
    * The type of map to display, generic options available are: 'map', 'panorama'.
    * More specific maps can be used by specifying the google map type:
    *
    * G_NORMAL_MAP displays the default road map view
    * G_SATELLITE_MAP displays Google Earth satellite images
    * G_HYBRID_MAP displays a mixture of normal and satellite views
    * G_DEFAULT_MAP_TYPES contains an array of the above three types, useful for iterative processing.
    * G_PHYSICAL_MAP displays a physical map based on terrain information.
    * G_MOON_ELEVATION_MAP displays a shaded terrain map of the surface of the Moon, color-coded by altitude.
    * G_MOON_VISIBLE_MAP displays photographic imagery taken from orbit around the moon.
    * G_MARS_ELEVATION_MAP displays a shaded terrain map of the surface of Mars, color-coded by altitude.
    * G_MARS_VISIBLE_MAP displays photographs taken from orbit around Mars.
    * G_MARS_INFRARED_MAP displays a shaded infrared map of the surface of Mars, where warmer areas appear brighter and colder areas appear darker.
    * G_SKY_VISIBLE_MAP displays a mosaic of the sky, as seen from Earth, covering the full celestial sphere.
    *
    * These map types can be used within a configuration like this:  { gmapType: G_MOON_VISIBLE_MAP }
    */
    /**
    * @cfg {Object} setCenter
    * A center starting point for the map. The map needs to be centered before it can be used.
    * The config can contain an address to geocode, and even a marker
    * \{
    *   geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
    *   marker: \{title: 'Fenway Park'\}
    * \}
    * Or it can simply be a lat/lng. Either way, a marker is not required, all we are really looking for here is a starting center point for the map.
    * \{
    *   lat: 42.339641,
    *   lng: -71.094224
    * \}
    */
    /**
     * @cfg {Number} zoomLevel
     * The zoom level to initialize the map at, generally between 1 (whole planet) and 40 (street). Also used as the zoom level for panoramas, zero specifies no zoom at all.
     */
    /**
     * @cfg {Number} yaw
     * The Yaw, or rotational direction of the users perspective in degrees. Only applies to panoramas.
     */
    /**
     * @cfg {Number} pitch
     * The pitch, or vertical direction of the users perspective in degrees. Default is 0 (zero), straight ahead. Valid values are between +90 (straight up) and -90 (straight down).
     */
    /**
     * @cfg {Boolean} displayGeoErrors
     * True to display geocoding errors to the end user via a message box.
     */
    /**
     * @cfg {Boolean} minGeoAccuracy
     * The level (between 1 & 8) to display an accuracy error below. Defaults to seven (7).
     * see: http://code.google.com/apis/maps/documentation/reference.html#GGeoAddressAccuracy
     */
    /**
     * @cfg {Array} mapConfOpts
     * Array of strings representing configuration methods to call, a full list can be found here: http://code.google.com/apis/maps/documentation/reference.html#GMap2
     */
    /**
     * @cfg {Array} mapControls
     * Array of strings representing map controls to initialize, a full list can be found here: http://code.google.com/apis/maps/documentation/reference.html#GControlImpl
     */
    // private
    initComponent : function(){
       
        var defConfig = {
            plain: true,
            zoomLevel: 0,
            yaw: 180,
            pitch: 0,
            gmapType: 'map',
            border: false,
            displayGeoErrors: false,
                        minGeoAccuracy: 7,
                        mapDefined: false,
                        mapDefinedGMap: false
        };
       
        Ext.applyIf(this,defConfig);
       
        Ext.ux.GMapPanel.superclass.initComponent.call(this);        

    },
    // private
    afterRender : function(){
       
        var wh = this.ownerCt.getSize();
        Ext.applyIf(this, wh);
       
        Ext.ux.GMapPanel.superclass.afterRender.call(this);    
       
        if (this.gmapType === 'map'){
            this.gmap = new GMap2(this.body.dom);
                        this.mapDefined = true;
                        this.mapDefinedGMap = true;
        }
       
        if (this.gmapType === 'panorama'){
            this.gmap = new GStreetviewPanorama(this.body.dom);
                        this.mapDefined = true;
        }

                if (!this.mapDefined && this.gmapType){
                        this.gmap = new GMap2(this.body.dom);
                        this.gmap.setMapType(this.gmapType);
                        this.mapDefined = true;
                        this.mapDefinedGMap = true;
                }

        if (typeof this.addControl == 'object' && this.mapDefinedGMap) {
            this.getMap().addControl(this.addControl);
        }
       
        this.addMapControls();
        this.addOptions();
       
        if (typeof this.setCenter === 'object') {
            if (typeof this.setCenter.geoCodeAddr === 'string'){
                this.geoCodeLookup(this.setCenter.geoCodeAddr, this.setCenter.marker, false, true, this.setCenter.listeners);
            }else{
                if (this.gmapType === 'map'){
                    var point = this.fixLatLng(new GLatLng(this.setCenter.lat,this.setCenter.lng));
                    this.getMap().setCenter(point, this.zoomLevel);    
                }
                if (typeof this.setCenter.marker === 'object' && typeof point === 'object'){
                    this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear);
                }
            }
            if (this.gmapType === 'panorama'){
                this.getMap().setLocationAndPOV(new GLatLng(this.setCenter.lat,this.setCenter.lng), {yaw: this.yaw, pitch: this.pitch, zoom: this.zoomLevel});
            }
        }

        GEvent.bind(this.gmap, 'load', this, function(){
            this.onMapReady();
        });

    },
    // private
    onMapReady : function(){
       
        this.addMarkers(this.markers);
        this.addKMLOverlay(this.autoLoadKML);
       
    },
    // private
    onResize : function(w, h){
       
        // check for the existance of the google map in case the onResize fires too early
        if (typeof this.getMap() == 'object') {
            this.getMap().checkResize();
        }
       
        Ext.ux.GMapPanel.superclass.onResize.call(this, w, h);


    },
    // private
    setSize : function(width, height, animate){
       
        // check for the existance of the google map in case setSize is called too early
        if (typeof this.getMap() == 'object') {
            this.getMap().checkResize();
        }
       
        Ext.ux.GMapPanel.superclass.setSize.call(this, width, height, animate);
       
    },
    /**
     * Returns the current google map
     * @return {GMap} this
     */
    getMap : function(){
       
        return this.gmap;
       
    },
    /**
     * Returns the maps center as a GLatLng object
     * @return {GLatLng} this
     */
    getCenter : function(){
       
        return this.fixLatLng(this.getMap().getCenter());
       
    },
    /**
     * Returns the maps center as a simple object
     * @return {Object} this has lat and lng properties only
     */
    getCenterLatLng : function(){
       
        var ll = this.getCenter();
        return {lat: ll.lat(), lng: ll.lng()};
       
    },
    /**
     * Creates markers from the array that is passed in. Each marker must consist of at least lat and lng properties.
     * @param {Array} markers an array of marker objects
     */
    addMarkers : function(markers) {
       
        if (Ext.isArray(markers)){
            for (var i = 0; i < markers.length; i++) {
                if (typeof markers[i].geoCodeAddr == 'string') {
                    this.geoCodeLookup(markers[i].geoCodeAddr, markers[i].marker, false, markers[i].setCenter, markers[i].listeners);
                }else{
                    var mkr_point = this.fixLatLng(new GLatLng(markers[i].lat, markers[i].lng));
                    this.addMarker(mkr_point, markers[i].marker, false, markers[i].setCenter, markers[i].listeners);
                }
            }
        }
       
    },
    /**
     * Creates a single marker.
     * @param {Object} point a GLatLng point
     * @param {Object} marker a marker object consisting of at least lat and lng
     * @param {Boolean} clear clear other markers before creating this marker
     * @param {Boolean} center true to center the map on this marker
     * @param {Object} listeners a listeners config
     */
    addMarker : function(point, marker, clear, center, listeners){
       
        Ext.applyIf(marker,G_DEFAULT_ICON);

        if (clear === true){
            this.getMap().clearOverlays();
        }
        if (center === true) {
            this.getMap().setCenter(point, this.zoomLevel);
        }

        var mark = new GMarker(point,marker);
        if (typeof listeners === 'object'){
            for (evt in listeners) {
                GEvent.bind(mark, evt, this, listeners[evt]);
            }
        }
        this.getMap().addOverlay(mark);

    },
    // private
    addMapControls : function(){
       
        if (this.gmapType === 'map') {
            if (Ext.isArray(this.mapControls)) {
                for(i=0;i<this.mapControls.length;i++){
                    this.addMapControl(this.mapControls[i]);
                }
            }else if(typeof this.mapControls === 'string'){
                this.addMapControl(this.mapControls);
            }else if(typeof this.mapControls === 'object'){
                this.getMap().addControl(this.mapControls);
            }
        }
       
    },
    /**
     * Adds a GMap control to the map.
     * @param {String} mc a string representation of the control to be instantiated.
     */
    addMapControl : function(mc){
       
        var mcf = window[mc];
        if (typeof mcf === 'function') {
            this.getMap().addControl(new mcf());
        }    
       
    },
    // private
    addOptions : function(){
       
        if (Ext.isArray(this.mapConfOpts)) {
            var mc;
            for(i=0;i<this.mapConfOpts.length;i++){
                this.addOption(this.mapConfOpts[i]);
            }
        }else if(typeof this.mapConfOpts === 'string'){
            this.addOption(this.mapConfOpts);
        }        
       
    },
    /**
     * Adds a GMap option to the map.
     * @param {String} mo a string representation of the option to be instantiated.
     */
    addOption : function(mo){
       
        var mof = this.getMap()[mo];
        if (typeof mof === 'function') {
            this.getMap()[mo]();
        }    
       
    },
    /**
     * Loads a KML file into the map.
     * @param {String} kmlfile a string URL to the KML file.
     */
    addKMLOverlay : function(kmlfile){
       
        if (typeof kmlfile === 'string' && kmlfile !== '') {
            var geoXml = new GGeoXml(kmlfile);
            this.getMap().addOverlay(geoXml);
        }
       
    },
    /**
     * Adds a marker to the map based on an address string (ie: "123 Fake Street, Springfield, NA, 12345, USA") or center the map on the address.
     * @param {String} addr the address to lookup.
     * @param {Object} marker the marker to add (optional).
     * @param {Boolean} clear clear other markers before creating this marker
     * @param {Boolean} center true to set this point as the center of the map.
     * @param {Object} listeners a listeners config
     */
    geoCodeLookup : function(addr, marker, clear, center, listeners) {
       
        if (!this.geocoder) {
            this.geocoder = new GClientGeocoder();
        }
        this.geocoder.getLocations(addr, this.addAddressToMap.createDelegate(this, [addr, marker, clear, center, listeners], true));
       
    },
    // private
    addAddressToMap : function(response, addr, marker, clear, center, listeners){
        if (!response || response.Status.code != 200) {
            this.respErrorMsg(response.Status.code);
        }else{
            place = response.Placemark[0];
            addressinfo = place.AddressDetails;
            accuracy = addressinfo.Accuracy;
            if (accuracy === 0) {
                this.geoErrorMsg(this.geoErrorTitle, this.geoErrorMsgUnable);
            }else{
                if (accuracy < this.minGeoAccuracy) {
                    this.geoErrorMsg(this.geoErrorTitle, String.format(this.geoErrorMsgAccuracy, accuracy));
                }else{
                    point = this.fixLatLng(new GLatLng(place.Point.coordinates[1], place.Point.coordinates[0]));
                    if (center){
                        this.getMap().setCenter(point, this.zoomLevel);
                    }
                    if (typeof marker === 'object') {
                        if (!marker.title){
                            marker.title = place.address;
                        }
                        Ext.applyIf(marker, G_DEFAULT_ICON);
                        this.addMarker(point, marker, clear, false, listeners);
                    }
                }
            }
        }
       
    },
    // private
    geoErrorMsg : function(title,msg){
        if (this.displayGeoErrors) {
            Ext.MessageBox.alert(title,msg);
        }
    },
    // private
    respErrorMsg : function(code){
        Ext.each(this.respErrors, function(obj){
            if (code == obj.code){
                Ext.MessageBox.alert(this.respErrorTitle, obj.msg);
            }
        }, this);
    },
        // private
        // used to inverse the lat/lng coordinates to correct locations on the sky map
        fixLatLng : function(llo){
                if (this.getMap().getCurrentMapType().QO == 'visible'){
                        llo.lat(180 - llo.lat());
                        llo.lng(180 - llo.lng());
                }
                return llo;
        }
});


Ext.reg('gmappanel',Ext.ux.GMapPanel); 