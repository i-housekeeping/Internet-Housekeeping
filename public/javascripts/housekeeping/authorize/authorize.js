///////////// Authorize Windows config Object
var config = {	closable : false,
				maximizable : false,
				resizable: false,
				buttonAlign: 'right',
				width : 525,
				height : 280,
				border : false,
				plain : false,
				shadow : false,
				layout : 'border',
				xbloney : 'default',
				Authorize : null
			};
					
///////////// Authorize Login Window 
Login = function(config) {
	Ext.apply(this, config);
	
	this.login = new Ext.FormPanel({
		bodyStyle:'padding: 0px 0 0 100px;background:#FFFFFF none repeat scroll 0%;',
		defaults : {
			autoScroll : true,
			width: 150
		},
		border : false,
		id: 'login-form',
		xtype : 'form',
		defaultType: 'textfield',
		region: 'south',
		height: 120,
		url: '/user_session',
		labelWidth:120,
		layoutConfig: {
	        labelSeparator: ''
	    },
		items : [{
				id : 'login',
				disabled : false,
				fieldLabel : "<b>username</b>",
				name : "login",
				allowBlank : false,
				//value : 'welcome',
				blankText : "Please fill the Login"
			}, {
				id : 'password',
				fieldLabel : "<b>password</b>",
				name : "password",
				disabled : false,
				allowBlank : false,
				//value : '1111',
				blankText : "Please fill the Password",
				inputType : 'password'
			},{
				xtype : "checkbox",
				id : 'remember_me',
				disabled : false,
				fieldLabel : "rememeber me",
				name : "remember_me",
				height: 20
			}
		]
	});
	
	this.logo = new Ext.Panel({
		id: 'login-logo',
		bodyStyle : 'background:#FFFFFF none repeat scroll 0%;',
		region: 'center',
		border : false,
		html : '<div id="header-content"><h2 id="slogan">new order in the house</h2><h1 id="logo-text">i-housekeeping</h1><div id="home"><div id="formhome"></div></div></div>'
	});

	Login.superclass.constructor.call(this, {
		title : 'Login',
		id: 'login-win',
		iconCls: 'lock-icon',
		keys: {
		        	key: [13], // enter key
			        fn: this.onLogin,
			        scope:this
		},
		items : [this.logo, this.login],
		buttons : [		
	            {
					text : 'Internet Housekeeping',	
					iconCls : 'interenet-icon',
					disabled : false,				
					handler : function(){
						window.location = 'http://www.i-housekeeping.com'
					}
				},{
					text : 'Get Housekeeper',
					iconCls : 'lock-icon',	
					disabled : true,				
					handler : function(){
						window.location = '/desktop/download' //'http://rubyforge.org/frs/download.php/54667/homeagentsetup.exe'
					}
				},{
					text : 'Get password',	
					disabled : false,				
					handler : function(){
						Ext.getCmp('login-win').close();
						config.xbloney = 'forgot_password';
						var forgot_passwordWin = new AuthorizeWnd(config);
						forgot_passwordWin.show();
					}
				},{
					text : 'Signup',
					handler : function(){
						Ext.getCmp('login-win').close();
						var signupWin = new Signup(config);
						signupWin.show();
					}
				},{
					text : 'Login',
					disabled : false,
					scope : 'Login',
					handler : this.onLogin
			}
		]
	});

};

Ext.extend(Login, Ext.Window, {
	onLogin : function() {
			Ext.getCmp('login-win').Authorize.showMask('Please wait Login is proceeded.');
			
			Ext.Ajax.request({
							    url: "http://localhost:3000/authorize/login",
							    scriptTag: true,
							    callbackParam: 'jsoncallback',
							    timeout: 10000,
								params: {
										format: 'js'
							    },
							    success: function(r) {
									   	Ext.getCmp('login-form').getForm().submit({
											//waitMsg:'Please Wait...',
											reset:true,
											method : 'POST',
											success:function(f,a){									    
													if(a && a.result){					
														Ext.getCmp('login-win').destroy(true);
														window.location = a.result.url;				
												}
											},
											failure : function(f,a){									
												if(a && a.result){										
													Ext.getCmp('login-win').Authorize.msg('Login', ' {0}.</br>i-housekeeping ', a.result.notice);
												}
											}
										});
							    },
							    failure : function(r) {
							       	    Ext.getCmp('login-win').Authorize.msg('Login', 'Housekeer is not found on your local device');
							    },
							    scope: this
							});
			
			
			
			Ext.getCmp('login-win').Authorize.hideMask();
	},
	
	
});


///////////// Authorize SignUp Window
Signup = function(config) {
	
	Ext.apply(this, config);
	
	if(config.xbloney == 'reset_password')
	{
		this.signup = new Ext.FormPanel({
			bodyStyle:'padding: 30px 0 0 100px; background:#FFFFFF none repeat scroll 0%;',
			defaults : {
				autoScroll : true,
				width: 150
			},
			layoutConfig: {
		        labelSeparator: ''
		    },
			border : false,
			id: 'signup-form',
			xtype : 'form',
			region: 'center',
			url:  '/authorize/reset_password',
			labelWidth:170,
			height : 120,
			items : [ {
				xtype : "textfield",
				id : 'password',
				fieldLabel : "<b>Password</b> <i>(min 4 characters)</i>",
				name : "password",
				allowBlank : false,
				inputType : 'password',
				blankText : "Please complete the password"
			}, {
				xtype : "textfield",
				id : 'password_confirmation',
				fieldLabel : "<b>Confirm Password</b>",
				name : "password_confirmation",
				allowBlank : false,
				inputType : 'password',
				blankText : "Please complete the password"
			}]
		});
	}
	else
	{
		this.signup = new Ext.FormPanel({
			baseCls : 'x-panel',
			bodyStyle:'padding: 30px 0 30px 80px; background:#FFFFFF none repeat scroll 0%;',
			defaults : {
				autoScroll : true,
				width: 150
			},
			layoutConfig: {
		        labelSeparator: ''
		    },
			border : false,
			id: 'signup-form',
			xtype : 'form',
			region: 'center',
			url: '/authorize/signup',
			labelWidth:170,
			height : 200,
			items : [{
				xtype : "textfield",
				id : 'login',
				fieldLabel : "<b>Login</b> <i>(min 3 characters)</i>",
				name : "login",
				allowBlank : (config.xbloney == 'reset_password') ? true : false,
				blankText : "Please complete the login"
			}, {
				xtype : "textfield",
				id : 'email',
				fieldLabel : "<b>Email</b> <i>(min 4 characters)</i>",
				name : "email",
				allowBlank : (config.xbloney == 'reset_password') ? true : false,
				inputType : 'email',
				blankText : "Please complete the email"
			}, {
				xtype : "textfield",
				id : 'password',
				fieldLabel : "<b>Password</b> <i>(min 4 characters)</i>",
				name : "password",
				allowBlank : false,
				inputType : 'password',
				blankText : "Please complete the password"
			}, {
				xtype : "textfield",
				id : 'password_confirmation',
				fieldLabel : "<b>Confirm Password</b>",
				name : "password_confirmation",
				allowBlank : false,
				inputType : 'password',
				blankText : "Please complete the password"
			}/*
,{
				xtype : "textfield",
				id : 'domain',
				fieldLabel : "<b>Domain</b>",
				name : "domain",
				allowBlank : (config.xbloney == 'reset_password') ? true : false,
				blankText : "Please provide the domain"
			}
*/]
		});
	}
	
	this.logo = new Ext.Panel({
		id: 'signup-logo',
		bodyStyle : 'background:#FFFFFF none repeat scroll 0%;',
		region: 'north',
		border : false,
		height : 55,
		html : '<div id="header-content"><h2 id="slogan">mashup for my house</h2><h1 id="logo-text">i-housekeeping</h1><div id="home"><div id="formhome"></div></div></div>'
	});
	
	this.title = (config.xbloney == 'reset_password')? 'Save Changes' : 'Signup';
	this.titleWnd = (config.xbloney == 'reset_password')? 'Reset Password' : 'Signup';
	
	Signup.superclass.constructor.call(this, {
		title : this.titleWnd,
		id: 'signup-win',
		iconCls: 'lock-icon',
		items : [ this.signup,this.logo],
		keys: {
		        	key: [13], // enter key
			        fn: this.onSignup,
			        scope:this
		},
		buttons : [
				{
					text : 'Abort',
					scope : 'Signup',
					handler : function(){
							Ext.getCmp('signup-win').close();
							var loginWin = new Login(config);
							loginWin.show();
					}
				},{
					text : this.title,
					scope : 'Signup',
					handler : this.onSignup
				}			
			]
	});

};

Ext.extend(Signup, Ext.Window, {
	onSignup : function() {
			Ext.getCmp('signup-win').Authorize.showMask('Please wait, Application is saving provided info.');
			Ext.getCmp('signup-form').getForm().submit({
					reset:true,
					method:'POST',
					success:function(f,a){
							if(a && a.result){
								Ext.getCmp('signup-win').destroy(true);
								window.location = a.result.url;
						}
					},
					failure : function(f,a){				
						if(a && (a.result || a.response)){
							Ext.getCmp('signup-win').Authorize.msg('Signup', 'Provided data is invalid. ', a.result.notice);
						}
					}
				});
			Ext.getCmp('signup-win').Authorize.hideMask();
	}
});

///////////// Authorize general Purpose Window
AuthorizeWnd = function(config) {
	
	Ext.apply(this, config);

	this.logo = new Ext.Panel({
		id: 'login-logo',
		bodyStyle : 'background:#FFFFFF none repeat scroll 0%;',
		region: 'center',
		border : false,
		html : '<div id="header-content"><h2 id="slogan">new order in the house</h2><h1 id="logo-text">i-housekeeping</h1><div id="home"><div id="formhome"></div></div></div>'
	});

	if((config.xbloney == 'welcome'))
	{
		this.southregion = new Ext.Panel({
			bodyStyle:'padding-left:30px; background:#FFFFFF none repeat scroll 0%;',
			border: false,
			id: 'welcome-form',
			xtype : 'border',
			region: 'south',
			height: 100,
			html: "<h1>Welcome to i-housekeeping - mashups for my family and house needs.</h1></br></br><p>You are just signup for the new service. An account confirmation mail has been sent to email address you provided. Follow the instructions in it to activate your account.</br>Thanks, Internet Housekeeping</p>"
			});
	}
	else
	{	
		this.southregion = new Ext.FormPanel({
			bodyStyle:'padding: 30px 0 0 100px; background:#FFFFFF none repeat scroll 0%; ',
			defaults : {
				autoScroll : true,
				width: 150
			},
			border: false,
			id: 'forget-form',
			xtype : 'form',
			defaultType: 'textfield',
			region: 'south',
			height: 120,
			url: '/authorize/forgot_password',
			labelWidth:170,
			layoutConfig: {
		        labelSeparator: ''
		    },
			items : [{
				id : 'email',
				fieldLabel : "<b>Please fill an email</b>",
				name : "email",
				allowBlank : false,
				inputType : 'email',
				blankText : "Please complete the email"
			}]
		});
	}
	
	this.titleWnd = (config.xbloney == 'welcome')? 'Welcome' : 'Forget password';
	
	AuthorizeWnd.superclass.constructor.call(this, {
		title : this.titleWnd,
		id: 'welcome-win',
		iconCls: 'lock-icon',
		keys: {
		        	key: [13], // enter key
			        fn: this.onForget,
			        scope:this
		},
		items : [this.logo,this.southregion],
		buttons : [{
					text :  ((config.xbloney == 'welcome') ? 'Continue' : 'Abort'),
					scope : 'BloneySignup',
					handler : function(){
							Ext.getCmp('welcome-win').close();
							if (config.xbloney == 'welcome') {
								window.location = '/';
							}
							else {
								var loginWin = new Login(config);
								loginWin.show();
							}
					}
				},
					{
					text : 'Request Password',
					hidden : ((config.xbloney == 'welcome') ? true : false),
					scope : 'AuthorizeWnd',
					handler : this.onForget
				}		
		]
	});

};

Ext.extend(AuthorizeWnd, Ext.Window, {
	onForget : function(){
			Ext.getCmp('welcome-win').Authorize.showMask('Please wait the requested info is retrived.');
			Ext.getCmp('forget-form').getForm().submit({
					waitMsg:'Please Wait...',
					reset:true,
					method:'POST',
					success:function(f,a){
							if(a && a.result){
								Ext.getCmp('welcome-win').destroy(true);
								window.location = a.result.url;
						}
					},
					failure : function(f,a){				
						if(a && (a.result || a.response)){
							Ext.getCmp('welcome-win').Authorize.msg('Authorize', 'You {0}.</br>i.Housekeeping ', a.result.notice);
						}
					}
				});
			Ext.getCmp('welcome-win').Authorize.hideMask();
	}
});


/*------------------------------------------------------------------------------------*/
/*         Main Authorize Object                                                      */
/*------------------------------------------------------------------------------------*/


Authorize = function() {
	var msgCt;
	
	function createBox(t, s){
        return ['<div class="msg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }

	return {
		initAuthorize: function(){
			Ext.QuickTips.init();
			config.Authorize = this;
			
			var path = document.location.pathname;
			var activeWin;
			
			if ((path.lastIndexOf("/") == path.indexOf("/")) || path.match("login")) {
				activeWin = new Login(config);
			}
			else if (path.match("signup")) {
				activeWin = new Signup(config);
			}
			else if (path.match("activate")) {
				config.xbloney = 'activate';
				// must be redesigned in next review.
				//Ext.example.msg('Activate', '{0}.', Ext.get("notice").dom.title);
				activeWin = (Ext.get("success").dom.title == "true") ? new Login(config) : new Signup(config);
			}
			else if (path.match("reset_password")) {
				config.xbloney = 'reset_password';
				activeWin = new Signup(config);
				activeWin.signup.getForm().baseParams = {
					id: path.substring(path.lastIndexOf("/") + 1)
				};
			}
			else if (path.match("forgot_password")) {
				config.xbloney = 'forgot_password';
				activeWin = new AuthorizeWnd(config);
			}
			else if (path.match("welcome")) {
				config.xbloney = 'welcome';
				activeWin = new AuthorizeWnd(config);
			}
			else if (path.match("logout")) {
				activeWin = new Login(config);
			}
			else if (path.match("")) {
				activeWin = new Login(config);
			}
			
			activeWin.show();
		},
		
		msg: function(title, format){
			if (!msgCt) 
				msgCt = Ext.DomHelper.insertFirst(document.body, {
					id: 'msg-div'
				}, true);
			msgCt.alignTo(document, 'b-t');
			var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
			var m = Ext.DomHelper.append(msgCt, {
				html: createBox(title, s)
			}, true);
			m.slideIn('t').pause(5).ghost("t", {
				remove: true
			});
		},
		
		hideMask : function(){
			this.pMask.hide();
		},
		
		showMask : function(msg){
			if(!this.pMask){
				// using this.pMask, seems that using this.mask caused conflict
		        // when this dialog is modal (uses this.mask also)
		        this.pMask = new Ext.LoadMask(Ext.getBody(), {
		        	msg: 'Please wait...'
		        });
			}
			
			if(msg){
				this.pMask.msg = msg;
			}
	    	this.pMask.show();
	    }
	};
}();

Ext.onReady(Authorize.initAuthorize, Authorize, true);
