 /* global Ext */

 /*
    jit.js 1.0
  ************************************************************************************

   $JIT [Dynamic Resource loader (basex 3.1 support required)]

  ************************************************************************************
  * Author: Doug Hendricks. doug[always-At]theactivegroup.com
  * Copyright 2007-2008, Active Group, Inc.  All rights reserved.
  ************************************************************************************

  License: ext-basex and $JIT are licensed under the terms of : GNU Open Source GPL 3.0 license:

  Commercial use is prohibited without contacting licensing[at]theactivegroup.com.

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see < http://www.gnu.org/licenses/gpl.html>.

   Donations are welcomed: http://donate.theactivegroup.com

  */

   if(typeof Ext == undefined || !Ext.hasBasex)
      {throw "Ext and ext-basex 3.1 or higher required.";}

  (function(){
    //Enable local file access for IE
    Ext.lib.Ajax.forceActiveX = (document.location.protocol == 'file:');

    var L = Ext.Loader = new Ext.ux.ModuleManager({

        modulePath : '',  //adjust for site root
        method : 'DOM',
        depends  : {},  // Ext dependency table

        getMap:function(module){

            var result = [], mods= [].concat(module.module || module);
            var options = typeof module == 'object' ? module : {module:module};

            forEach(mods,
              function(mod){
                var c=arguments.callee;
                var moduleName = typeof mod === 'object' ? mod.module || null : mod;
                var map = moduleName ? this.depends[moduleName.replace("@","")]||false : false;

                map = Ext.apply({path:'',depends:false}, map);

                forEach(map.depends||[] ,
                    function(module,index,dep){
                        //chain dependencies
                        module.substr(0,1)=="@" ?
                            c.call(this, module ):
                               map.none || (result = result.concat(module));

                    },this);

                if(!map.none && moduleName ){result = result.concat((map.path||'') + moduleName.replace("@","")); }
            },this);

            return Ext.applyIf({module:!!result.length ? result.unique() :null},options);

        },

        styleAdjust  : {pattern:/url\(\s*\.\.\//ig, replacement:'url(../../resources/'}

    });

   /* Define our dependency table for module names */

    //define the site layout for Ext packages (most are already built for you!)
    //define for DemoSite's lib/Ext-version

    var libv = 'lib/Ext-'+Ext.version+'/'
    var p = libv + 'package/';
    var l = p + 'layout/';
    var d = p + 'dragdrop/';
    var w = p + 'widgets/';
    var ux= p + 'ux/';

    L.depends = {
    // JS source file   | source location    | Dependencies (in required load order)
      "borderlayout":   {path: l,            depends: [ '@container', l+'containerlayout', p +'splitbar'] }
     ,"button"      :   {path: p+'button/' , depends: [ '@widget-core', '@qtips' ]}
     ,"color-palette":  {path: p ,           depends: [ '@widget-core']}
     ,"container"   :   {path: w,            depends: [ '@widget-core']}
     ,"data"        :   {path: p+'data/',    depends: [  p + 'util'] }
     ,"dataview"    :   {path: w,            depends: [ '@widget-core',p + 'util', '@data']}
     ,"date"        :   {path: p        }
     ,"datepicker"  :   {path: p+'datepicker/',
                                             depends: [ '@menus']}
     ,"dialogs"     :   {path: p+'dialog/' , depends: [ '@button','@progressbar','@window' ]}
     ,"dragdrop"    :   {path: d,            depends: [ '@widget-core']}
     ,"edit-grid"   :   {path: p+'grid/',    depends: [ '@grid', '@form' ]}
     ,"form"        :   {path: p+'form/',    depends: [ '@panel','@dataview']}
     ,"full-grid"   :   {path: p+'grid/',    depends: [ '@grid', '@toolbar','@loadmask' ]}
     ,"grid"        :   {path: p+'grid/',    depends: [ '@dragdrop', '@panel' ,'@data']}
     ,"layouts"     :   {path: l,            depends: [ '@container', l+'containerlayout', p +'splitbar'] }
     ,"loadmask"    :   {path: w }
     ,"menus"       :   {path: p+'menu/',    depends: [ '@widget-core']}
     ,"messagebox"  :   {path: w,            depends: [ '@dialogs']}
     ,"panel"       :   {path: w,            depends: [ '@container', l + 'containerlayout']}
     ,"panelDD"     :   {path: w,            depends: [ '@dragdrop', '@panel' ]}
     ,"progressbar" :   {path: w,            depends: [ '@widget-core']}
     ,"qtips"       :   {path: p+'qtips/',   depends: [ '@panelDD' ] }
     ,"resizable"   :   {path: p,            depends: [ '@container']}
     ,"state"       :   {path: p ,           depends: [  p + 'util' ] }
     ,"tabs"        :   {path: p+'tabs/',    depends: [ '@layouts', '@panel']}
     ,"toolbar"     :   {path: p+'toolbar/' ,depends: [ '@widget-core', '@button' ]}
     ,"tree"        :   {path: p+'tree/',    depends: [ '@dragdrop', '@form']}
     ,"viewport"    :   {path: l,            depends: [ '@layouts','@panelDD']}
     ,"widget-core" :   {path: p,            depends: [  p + 'util', "@xtemplate", '@date']}
     ,"window"      :   {path: w,            depends: [ '@panelDD', '@resizable', w + 'windowmanager'] }
     ,"xtemplate"   :   {path: p }
     /* optionally define your ux dependencies and locations here */
     ,'miframe'     :   {path: ux ,          depends: [ '@panel'] }
     ,'uxmedia'     :   {path: ux ,          depends: [ '@window'] }
     ,'uxflash'     :   {path: ux ,          depends: [ '@uxmedia'] }
     ,'uxfusion'    :   {path: ux ,          depends: [ '@uxflash'] }
     ,'uxofc'       :   {path: ux ,          depends: [ '@uxflash'] }
    };

    /*
     load external resources in dependency order
     alternate load syntax:

     $JIT( 'moduleA', 'path/moduleB'  );

     $JIT( {module:['modA','path/modB'], callback:cbFn, method:'DOM', queue:'fast', ... });

     $JIT( {async    :false,
            listeners: {
                complete: onCompleteFn,
                loadexception: loadExFn
              }
            },
           'moduleA',
           inlineFn,
           {async:true},
           'moduleB',
            inlineFn, .... );

    */

    $JIT = Ext.ux.$JIT = Ext.require = function(){
        var modules = [];

        forEach(Array.prototype.slice.call(arguments, 0),
           function(module){
            modules = modules.concat(typeof module == 'function' ? module : L.getMap(module) );
         }, L);
         L.load.apply(L,modules.flatten());
         return L;
    };

    var on = L.addListener.createDelegate(L),
        un = L.removeListener.createDelegate(L);


    //create a unique flexible dialect for $JIT:
    Ext.apply($JIT,{

            /*Invoke the passed callback when all named modules in the array are available

                eg:  $JIT.onAvailable(['tree','grid'], this.buildWin , scope,  timeout);
            */
            onAvailable : Ext.Loader.onAvailable.createDelegate(L),

            //Logical Registration of a module  eg: $JIT.provide('mainAppStart');
            provide     : Ext.provide = L.provides.createDelegate(L),

            on          : on,
            addListener : on,
            un          : un,
            removeListener : un,
            depends     : L.depends,
            loaded      : L.loaded.createDelegate(L),
            getModule   : L.getModule.createDelegate(L),


            //Set the default module retrieval mechanism (DOM == <script, link> tags, GET,PUT,POST == XHR methods )
            setMethod   : function(method){
                              L.method = (method||'DOM').toUpperCase();
                          },
            //Set the default site path (relative/absolute)
            setModulePath: function(path){
                              L.modulePath = path || '';
                          },
            execScript  : L.globalEval.createDelegate(L),
            lastError   : function(){return L.lastError;},
            applyStyle  : L.applyStyle.createDelegate(L),
            removeStyle  : L.removeStyle.createDelegate(L),

            css         : L.load.createDelegate(L,[
                            {method        :'GET',
                             cacheResponses: true,
                             modulePath    :''
                             }],0),

            script      : L.load.createDelegate(L,[
                            {method        :'DOM',
                             modulePath    :''
                             }],0),

            get         : L.load.createDelegate(L,[
                            {method        :'GET',
                             modulePath    :'',
                             cacheResponses: true
                             }],0)
    });

    $JIT.provide('JIT','ext-basex');


    $JIT.on('loadexception',function(ecode,title){
      if(!ecode)return;

      ecode = ecode.error || ecode;
      var msg = ecode? ecode.message || ecode.description || ecode.name || ecode: null;

      if(msg){
          if(Ext.MessageBox){
              Ext.MessageBox.alert(title,msg);
          } else {
              alert((title?title+'\n':'')+msg );
          }

      }
    });

    /* Add 'require/JIT' support (synchronous only) permitting progressive loads to lazy-loaded component configs
     new Ext.Panel({
        layout:'fit',
        items:{
           JIT : ['tabs','gmap'],    //demand and load 'tabs' and 'gmap' module configs if not already available
           xtype : 'tabpanel',
           items : {title:'Grid', JIT:'edit-grid',...}
         }
     });
    */
    $JIT({method:'GET',async:true},
        'widget-core',
        function(success){

            var mgr = Ext.ComponentMgr,
                load_options =
                    {async    :false,
                     method   :'GET',
                     callback : function(completed){
                         if(!completed){
                             L.fireEvent('loadexception', L, this.currentModule, "Ext.ComponentMgr:$JIT Load Failure");
                             }
                     }
                },
                setAsynch =  function(rm){
                   return typeof rm === 'object' ? Ext.apply({},load_options,rm):
                     typeof rm ==='function' ? rm : rm;
                };

            if(success && mgr){

               //set the default JSON decoder as util.JSON will be available at this point
               Ext.lib.Ajax.decodeJSON = Ext.decode || null;

               mgr.create = mgr.create.createInterceptor( function(config, defaultType){

                       var require;
                       if(require = config.require || config.JIT){
                           require = [load_options].concat(Ext.isArray( require)? require.map( setAsynch ): setAsynch(require));
                           //This synchronous request will block until completed
                           Ext.require.apply(Ext, require );
                       }
                  });


           } else {
               L.fireEvent('loadexception', L, 'widget-core', "Ext.ComponentMgr:$JIT Initialization Failure");
           }


    });

 })();