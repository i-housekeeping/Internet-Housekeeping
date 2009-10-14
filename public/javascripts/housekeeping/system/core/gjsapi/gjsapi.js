
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

(function() {


function key() {
    var l = document.location.hostname.split('.').reverse();
    var domain = l[ 0 ];
    if ( l[ 1 ] )
        domain = l[ 1 ] + '.' + domain;
    
    if ( window.gmapKeys && typeof window.gmapKeys == 'object' )
         if ( window.gmapKeys[domain] )
            return window.gmapKeys[domain];
    
    switch ( domain ) {
        case 'i-housekeeping.heroku.com':
            return 'ABQIAAAAFfS6M66WVNZPX95tBbprFhRmmXuyxeQuaxSm4xuvu15Rmn4LuhSyDacBrnV_y2jOdzvinh7np6TxBw';
		case 'i-housekeeping.aptanacloud.com':
            return 'ABQIAAAAFfS6M66WVNZPX95tBbprFhRmmXuyxeQuaxSm4xuvu15Rmn4LuhSyDacBrnV_y2jOdzvinh7np6TxBw';
		case 'moneykeeping.heroku.com':
            return 'ABQIAAAAA1u4IWiwm4a4GMTWkXxLoRTCT40DcovTz3-0atlDHC5w23v8CRQzYWJicK0uo-U4VpO4azPDM4-W9g';
        default:
            /* localhost key */
            return 'ABQIAAAAJDLv3q8BFBryRorw-851MRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxTyuslsNlFqyphYqv1PCUD8WrZA2A';
    }
}

//if ( !app.config.localmode ) {
    document.write('<'+'script src="http'+( Ext.isSecure ? "s" : "" )+'://www.google.com/jsapi?key='+key()+'">'+'<'+'/script>');
	document.write('<script src="http://maps.google.com/maps?file=api&amp;v=2.x&amp;key=ABQIAAAAA1u4IWiwm4a4GMTWkXxLoRTCT40DcovTz3-0atlDHC5w23v8CRQzYWJicK0uo-U4VpO4azPDM4-W9g" type="text/javascript"></script>');
//}

	


	 
})();


