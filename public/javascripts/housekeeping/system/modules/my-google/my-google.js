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
//google.load("gdata", "1");

QoDesk.MyGoogle = Ext.extend(Ext.app.Module, {

	moduleType : 'app',
	moduleId : 'my-google',
	
	init : function(){		
		this.launcher = {
			handler: this.createWindow,
			iconCls: 'my-google-icon',
			scope: this,
			shortcutIconCls: 'my-google-shortcut',
			text: 'My Google',
			tooltip: '<b>Google Personal Mashup</b>'
		}
		
		
	},
	
	createWindow : function(){
		var win = app.desktop.getWindow('my-google-win');

		if (!win) {
           
		   var tb = new Ext.Toolbar({
				id:'main-tb',
				height:26,
				region : 'north',
				items: [
					{
						xtype:'splitbutton',
						iconCls:'icon-collaborate',
						text:'My Google',
						//handler: actions.newTask.initialConfig.handler,
						menu: [	{
									text:'Import...',
									handler: function(){
										
									}
								},{
									text:'Export...',
									handler: function(){
										
									}
								},
								'-', 
								{
									iconCls : 'icon-about',
									text: 'About',
									handler: function(){
									   
									}
							    }
							   ]
						}		
				]
			});
		   
		   var tabs = new Ext.TabPanel({
	                    activeTab:0,
	                    border:false,
						region : 'center',
						tabPosition :'bottom',
	                    defaults: {
	                        autoScroll: true
	                    },
	                    items: [
	                     {
							id		    : 'calendar',
							title		: 'google calendar',
							defaultSrc	: 'http://www.google.com/calendar/embed?title=i.housekeeping%20private%20calendar&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;hl=en&amp;bgcolor=%23FFFFFF&amp;src=i.housekeeping%40gmail.com&amp;color=%232952A3&amp;ctz=Asia%2FJerusalem" style=" border-width:0 " width="800" height="600" frameborder="0" scrolling="no',
							xtype		: 'iframepanel',
							loadMask	: {msg:'Loading Calendar...'},
							scope 		: this
						},
	                    {
	                        id		    : 'gmail',
							title		: 'google gmail',
							defaultSrc	: 'https://www.google.com/accounts/ServiceLogin?service=mail&passive=true&rm=false&continue=http%3A%2F%2Fmail.google.com%2Fmail%2F%3Fui%3Dhtml%26zy%3Dl&bsv=zpwhtygjntrz&scc=1&ltmpl=default&ltmplcache=2',
							xtype		: 'iframepanel',
							loadMask	: {msg:'Loading Gmail...'},
							scope 		: this
							
	                    }
	                    ]
	                });
		   
		    win = app.desktop.createWindow({
                title: 'My Google Personal Mashup',
                id: 'my-google-win',
                 layout: 'border',
				width:  app.desktop.getWinWidth()*0.8,
            	height: app.desktop.getWinHeight()*0.8,
                iconCls: 'collaborate-icon',
                bodyStyle:'color:#000',
                plain: true,
                items: [tb, tabs]});
        }
        win.show();
    },
	
	/**
	 * Callback function for the Google data JS client library to call when an error
	 * occurs during the retrieval of the feed.  Details available depend partly
	 * on the web browser, but this shows a few basic examples. In the case of
	 * a privileged environment using ClientLogin authentication, there may also
	 * be an e.type attribute in some cases.
	 *
	 * @param {Error} e is an instance of an Error 
	 */
	handleGDError: function(e) {
	  document.getElementById('jsSourceFinal').setAttribute('style', 
	      'display:none');
	  if (e instanceof Error) {
	    /* alert with the error line number, file and message */
	    alert('Error at line ' + e.lineNumber +
	          ' in ' + e.fileName + '\n' +
	          'Message: ' + e.message);
	    /* if available, output HTTP error code and status text */
	    if (e.cause) {
	      var status = e.cause.status;
	      var statusText = e.cause.statusText;
	      alert('Root cause: HTTP error ' + status + ' with status text of: ' + 
	            statusText);
	    }
	  } else {
	    alert(e.toString());
	  }
}


});
