/**
 * @author chander
 */

Countries = new Ext.data.SimpleStore({
						fields: ['country', 'country_name'],
						data: [['Afghanistan','Afghanistan'],
		['Aland Islands','Aland Islands'],
		['Albania','Albania'],
		['Algeria','Algeria'],
		['American Samoa','American Samoa'],
		['Andorra','Andorra'],
		['Angola','Angola'],
		['Anguilla','Anguilla'],
		['Antarctica','Antarctica'],
		['Antigua and Barbuda','Antigua and Barbuda'],
		['Argentina','Argentina'],
		['Armenia','Armenia'],
		['Aruba','Aruba'],
		['Australia','Australia'],
		['Austria','Austria'],
		['Azerbaijan','Azerbaijan'],
		['Bahamas','Bahamas'],
		['Bahrain','Bahrain'],
		['Bangladesh','Bangladesh'],
		['Barbados','Barbados'],
		['Belarus','Belarus'],
		['Belgium','Belgium'],
		['Belize','Belize'],
		['Benin','Benin'],
		['Bermuda','Bermuda'],
		['Bhutan','Bhutan'],
		['Bolivia','Bolivia'],
		['Bosnia and Herzegovina','Bosnia and Herzegovina'],
		['Botswana','Botswana'],
		['Bouvet Island','Bouvet Island'],
		['Brazil','Brazil'],
		['British Indian Ocean territory','British Indian Ocean territory'],
		['Brunei Darussalam','Brunei Darussalam'],
		['Bulgaria','Bulgaria'],
		['Burkina Faso ','Burkina Faso'],
		['Burundi','Burundi'],
		['Cambodia','Cambodia'],
		['Cameroon','Cameroon'],
		['Canada','Canada'],
		['Cape Verde','Cape Verde'],
		['Cayman Islands','Cayman Islands'],
		['Central African Republic','Central African Republic'],
		['Chad','Chad'],
		['Chile','Chile'],
		['China','China'],
		['Christmas Island','Christmas Island'],
		['Cocos (Keeling) Islands','Cocos (Keeling) Islands'],
		['Colombia','Colombia'],
		['Comoros','Comoros'],
		['Congo','Congo'],
		['Congo','Congo'],
		['Democratic Republic','Democratic Republic'],
		['Cook Islands','Cook Islands'],
		['Costa Rica','Costa Rica'],
		['Croatia (Hrvatska)','Croatia (Hrvatska)'],
		['Cuba','Cuba'],
		['Cyprus','Cyprus'],
		['Czech Republic','Czech Republic'],
		['Denmark','Denmark'],
		['Djibouti','Djibouti'],
		['Dominica','Dominica'],
		['Dominican Republic','Dominican Republic'],
		['East Timor','East Timor'],
		['Ecuador','Ecuador'],
		['Egypt','Egypt'],
		['El Salvador','El Salvador'],
		['Equatorial Guinea','Equatorial Guinea'],
		['Eritrea','Eritrea'],
		['Estonia','Estonia'],
		['Ethiopia','Ethiopia'],
		['Falkland Islands','Falkland Islands'],
		['Faroe Islands','Faroe Islands'],
		['Fiji','Fiji'],
		['Finland','Finland'],
		['France','France'],
		['French Guiana','French Guiana'],
		['French Polynesia','French Polynesia'],
		['French Southern Territories','French Southern Territories'],
		['Gabon','Gabon'],
		['Gambia','Gambia'],
		['Georgia','Georgia'],
		['Germany','Germany'],
		['Ghana','Ghana'],
		['Gibraltar','Gibraltar'],
		['Greece','Greece'],
		['Greenland','Greenland'],
		['Grenada','Grenada'],
		['Guadeloupe','Guadeloupe'],
		['Guam','Guam'],
		['Guatemala','Guatemala'],
		['Guinea','Guinea'],
		['Guinea-Bissau','Guinea-Bissau'],
		['Guyana','Guyana'],
		['Haiti','Haiti'],
		['Heard and McDonald Islands','Heard and McDonald Islands'],
		['Honduras','Honduras'],
		['Hong Kong','Hong Kong'],
		['Hungary','Hungary'],
		['Iceland','Iceland'],
		['India','India'],
		['Indonesia','Indonesia'],
		['Iran','Iran'],
		['Iraq','Iraq'],
		['Ireland','Ireland'],
		['Israel','Israel'],
		['Italy','Italy'],
		['Jamaica','Jamaica'],
		['Japan','Japan'],
		['Jordan','Jordan'],
		['Kazakhstan','Kazakhstan'],
		['Kenya','Kenya'],
		['Kiribati','Kiribati'],
		['North Korea','North Korea'],
		['South Korea','South Korea'],
		['Kuwait','Kuwait'],
		['Kyrgyzstan','Kyrgyzstan'],
		['Latvia','Latvia'],
		['Lebanon','Lebanon'],
		['Lesotho','Lesotho'],
		['Liberia','Liberia'],
		['Libyan Arab Jamahiriya','Libyan Arab Jamahiriya'],
		['Liechtenstein','Liechtenstein'],
		['Lithuania','Lithuania'],
		['Luxembourg','Luxembourg'],
		['Macao','Macao'],
		['Macedonia','Macedonia'],
		['Madagascar','Madagascar'],
		['Malawi','Malawi'],
		['Malaysia','Malaysia'],
		['Maldives','Maldives'],
		['Mali','Mali'],
		['Malta','Malta'],
		['Marshall Islands','Marshall Islands'],
		['Martinique','Martinique'],
		['Mauritania','Mauritania'],
		['Mauritius','Mauritius'],
		['Mayotte','Mayotte'],
		['Mexico','Mexico'],
		['Micronesia','Micronesia'],
		['Moldova','Moldova'],
		['Monaco','Monaco'],
		['Mongolia','Mongolia'],
		['Montserrat','Montserrat'],
		['Morocco','Morocco'],
		['Mozambique','Mozambique'],
		['Myanmar','Myanmar'],
		['Namibia','Namibia'],
		['Nauru','Nauru'],
		['Nepal','Nepal'],
		['Netherlands','Netherlands'],
		['Netherlands Antilles','Netherlands Antilles'],
		['New Caledonia','New Caledonia'],
		['New Zealand','New Zealand'],
		['Nicaragua','Nicaragua'],
		['Niger','Niger'],
		['Nigeria','Nigeria'],
		['Niue','Niue'],
		['Norfolk Island','Norfolk Island'],
		['Northern Mariana Islands','Northern Mariana Islands'],
		['Norway','Norway'],
		['Oman','Oman'],
		['Pakistan','Pakistan'],
		['Palau','Palau'],
		['Palestinian Territories','Palestinian Territories'],
		['Panama','Panama'],
		['Papua New Guinea','Papua New Guinea'],
		['Paraguay','Paraguay'],
		['Peru','Peru'],
		['Philippines','Philippines'],
		['Pitcairn','Pitcairn'],
		['Poland','Poland'],
		['Portugal','Portugal'],
		['Puerto Rico','Puerto Rico'],
		['Qatar','Qatar'],
		['Reunion','Reunion'],
		['Romania','Romania'],
		['Russian Federation','Russian Federation'],
		['Rwanda','Rwanda'],
		['Saint Helena','Saint Helena'],
		['Saint Kitts and Nevis','Saint Kitts and Nevis'],
		['Saint Lucia','Saint Lucia'],
		['Saint Pierre and Miquelon','Saint Pierre and Miquelon'],
		['Saint Vincent and the Grenadines','Saint Vincent and the Grenadines'],
		['Samoa','Samoa'],
		['San Marino','San Marino'],
		['Sao Tome and Principe','Sao Tome and Principe'],
		['Saudi Arabia','Saudi Arabia'],
		['Senegal','Senegal'],
		['Serbia and Montenegro','Serbia and Montenegro'],
		['Seychelles','Seychelles'],
		['Sierra Leone','Sierra Leone'],
		['Singapore','Singapore'],
		['Slovakia','Slovakia'],
		['Slovenia','Slovenia'],
		['Solomon Islands','Solomon Islands'],
		['Somalia','Somalia'],
		['South Africa','South Africa'],
		['Spain','Spain'],
		['Sri Lanka','Sri Lanka'],
		['Sudan','Sudan'],
		['Suriname','Suriname'],
		['Svalbard and Jan Mayen Islands','Svalbard and Jan Mayen Islands'],
		['Swaziland','Swaziland'],
		['Sweden','Sweden'],
		['Switzerland','Switzerland'],
		['Syria','Syria'],
		['Taiwan','Taiwan'],
		['Tajikistan','Tajikistan'],
		['Tanzania','Tanzania'],
		['Thailand','Thailand'],
		['Togo','Togo'],
		['Tokelau','Tokelau'],
		['Tonga','Tonga'],
		['Trinidad and Tobago','Trinidad and Tobago'],
		['Tunisia','Tunisia'],
		['Turkey','Turkey'],
		['Turkmenistan','Turkmenistan'],
		['Turks and Caicos Islands','Turks and Caicos Islands'],
		['Tuvalu','Tuvalu'],
		['Uganda','Uganda'],
		['Ukraine','Ukraine'],
		['United Arab Emirates','United Arab Emirates'],
		['United Kingdom','United Kingdom'],
		['United States of America','United States of America'],
		['Uruguay','Uruguay'],
		['Uzbekistan','Uzbekistan'],
		['Vanuatu','Vanuatu'],
		['Vatican City','Vatican City'],
		['Venezuela','Venezuela'],
		['Vietnam','Vietnam'],
		['Virgin Islands (British)','Virgin Islands (British)'],
		['Virgin Islands (US)','Virgin Islands (US)'],
		['Wallis and Futuna Islands','Wallis and Futuna Islands'],
		['Western Sahara','Western Sahara'],
		['Yemen','Yemen'],
		['Zaire','Zaire'],
		['Zambia','Zambia'],
		['Zimbabwe','Zimbabwe']]
})

Ext.ux.MultiGroupingStore = Ext.extend(Ext.data.GroupingStore, {
    sortInfo: [],
    
    sort: function(field, dir){
        //alert('sort MultiGroupingStore');
        var f = [];
        
        if (Ext.isArray(field)) {
            for (i = 0, len = field.length; i < len; ++i) {
                f.push(this.fields.get(field[i]));
            }
        }
        else {
            f.push(this.fields.get(field));
        }
        
        if (f.length < 1) {
            return false;
        }
        
        if (!dir) {
            if (this.sortInfo && this.sortInfo.length > 0 && this.sortInfo[0].field == f[0].name) { // toggle sort dir
                dir = (this.sortToggle[f[0].name] || "ASC").toggle("ASC", "DESC");
            }
            else {
                dir = f[0].sortDir;
            }
        }
        
        var st = (this.sortToggle) ? this.sortToggle[f[0].name] : null;
        var si = (this.sortInfo) ? this.sortInfo : null;
        
        this.sortToggle[f[0].name] = dir;
        this.sortInfo = [];
        for (i = 0, len = f.length; i < len; ++i) {
            this.sortInfo.push({
                field: f[i].name,
                direction: dir
            });
        }
        
        if (!this.remoteSort) {
            this.applySort();
            this.fireEvent("datachanged", this);
        }
        else {
            if (!this.load(this.lastOptions)) {
                if (st) {
                    this.sortToggle[f[0].name] = st;
                }
                if (si) {
                    this.sortInfo = si;
                }
            }
        }
    },
    
    setDefaultSort: function(field, dir){
        //alert('setDefault sort MultiGroupingStore '+field + dir);
        dir = dir ? dir.toUpperCase() : "ASC";
        this.sortInfo = [];
        
        if (!Ext.isArray(field)) 
            this.sortInfo.push({
                field: field,
                direction: dir
            });
        else {
            for (i = 0, len = field.length; i < len; ++i) {
                this.sortInfo.push({
                    field: field[i].field,
                    direction: dir
                });
                this.sortToggle[field[i]] = dir;
            }
        }
    },
    
    constructor: function(config){
        Ext.ux.MultiGroupingStore.superclass.constructor.apply(this, arguments);
    },
    
    
    groupBy: function(field, forceRegroup){
        //alert('in groupby '+this.groupField+'  '+field);
        if (!forceRegroup && this.groupField == field) {
            return; // already grouped by this field
        }
        
        
        if (this.groupField) {
            for (z = 0; z < this.groupField.length; z++) 
                if (field == this.groupField[z]) 
                    return;
            this.groupField.push(field);
        }
        else 
            this.groupField = [field];
        
        if (this.remoteGroup) {
            if (!this.baseParams) {
                this.baseParams = {};
            }
            this.baseParams['groupBy'] = field;
        }
        if (this.groupOnSort) {
            this.sort(field);
            return;
        }
        if (this.remoteGroup) {
            this.reload();
        }
        else {
            var si = this.sortInfo || [];
            if (si.field != field) {
                this.applySort();
            }
            else {
                this.sortData(field);
            }
            this.fireEvent('datachanged', this);
        }
    },
    
    applySort: function(){
        //alert('applysort MultiGroupingStore');
        var si = this.sortInfo;
        
        if (si && si.length > 0 && !this.remoteSort) {
            this.sortData(si, si[0].direction);
        }
        
        if (!this.groupOnSort && !this.remoteGroup) {
            var gs = this.getGroupState();
            if (gs && gs != this.sortInfo) {
                //alert('group on Sort');
                this.sortData(this.groupField);
            }
        }
    },
    
    getGroupState: function(){
        //alert('getGroupState');
        //alert('this.groupOnSort '+ this.groupOnSort+"\n this.groupField "+this.groupField+'\nthis.sortInfo '+this.sortInfo+ '\n this.groupField '+this.groupField)
        //alert('Condition1: this.groupOnSort && this.groupField !== false '+ (this.groupOnSort && this.groupField !== false));
        //alert('condition 2: this.sortInfo '+ this.sortInfo);
        //var fi =this.sortInfo;;
        //fi.push(this.groupField);
        return this.groupOnSort && this.groupField !== false ? (this.sortInfo ? this.sortInfo : undefined) : this.groupField;
    },
    
    sortData: function(flist, direction){
        //alert(' In sortData '+ flist.length +"  "+flist);
        direction = direction || 'ASC';
        
        var st = [];
        
        var o;
        for (i = 0, len = flist.length; i < len; ++i) {
            o = flist[i];
          //  alert('o.field ' + o.field);
            
            st.push(this.fields.get(o.field ? o.field : o).sortType);
        }
        //alert('fn start');
        
        var fn = function(r1, r2){
        
            var v1 = [];
            var v2 = [];
            var len = flist.length;
            var o;
            var name;
            //alert('len '+len);
            for (i = 0; i < len; ++i) {
                o = flist[i];
                name = o.field ? o.field : o;
                //alert('In fn r1.data[name] '+ r1.data[name]+'r2.data[name] '+ r2.data[name]);
                v1.push(st[i](r1.data[name]));
                v2.push(st[i](r2.data[name]));
            }
            
            var result;
            for (i = 0; i < len; ++i) {
                result = v1[i] > v2[i] ? 1 : (v1[i] < v2[i] ? -1 : 0);
                if (result != 0) 
                    return result;
            }
            
            return result; //if it gets here, that means all fields are equal
        };
        ////////alert('fn finished');
        this.data.sort(direction, fn);
        if (this.snapshot && this.snapshot != this.data) {
            this.snapshot.sort(direction, fn);
        }
    }
    
});


Ext.ux.MultiGroupingView = Ext.extend(Ext.grid.GroupingView, {
    displayEmptyFields: false,
    displayFieldSeperator: ', ',
    
    renderRows: function(){
        var groupField = this.getGroupField();
        var eg = !!groupField;
        // if they turned off grouping and the last grouped field is hidden
        if (this.hideGroupedColumn) {
            var colIndexes = [];
            for (i = 0, len = groupField.length; i < len; ++i) {
                colIndexes.push(this.cm.findColumnIndex(groupField[i]));
            }
            if (!eg && this.lastGroupField !== undefined) {
                this.mainBody.update('');
                for (i = 0, len = this.lastGroupField.length; i < len; ++i) {
                    this.cm.setHidden(this.cm.findColumnIndex(this.lastGroupField[i]), false);
                }
                delete this.lastGroupField;
            }
            else 
                if (eg && colIndexes.length > 0 && this.lastGroupField === undefined) {
                    this.lastGroupField = groupField;
                    for (i = 0, len = colIndexes.length; i < len; ++i) {
                        this.cm.setHidden(colIndexes[i], true);
                    }
                }
                else 
                    if (eg && this.lastGroupField !== undefined && groupField !== this.lastGroupField) {
                        this.mainBody.update('');
                        for (i = 0, len = this.lastGroupField.length; i < len; ++i) {
                            this.cm.setHidden(this.cm.findColumnIndex(this.lastGroupField[i]), false);
                        }
                        this.lastGroupField = groupField;
                        for (i = 0, len = colIndexes.length; i < len; ++i) {
                            this.cm.setHidden(colIndexes[i], true);
                        }
                    }
        }
        return Ext.ux.MultiGroupingView.superclass.renderRows.apply(this, arguments);
    },
	getRows : function(){
		//alert('getRows');
        if(!this.enableGrouping){
            return Ext.grid.GroupingView.superclass.getRows.call(this);
        }
		var groupField=this.getGroupField();
        var r = [];
        var g, gs = this.getGroups();
		//alert(groupField[groupField.length-1]);
        for(var i = 0, len = gs.length; i < len; i++){
			//alert(gs[i].childNodes[1].childNodes);
			//alert(i+"    "+gs[i].innerHTML );
			//var groupName=gs[i].childNodes[0].childNodes[0].innerHTML;
//
//user();
			//alert(groupName.substring(0,groupName.indexOf(':')))
			//alert(gs[i].childNodes[0].childNodes[0].innerHTML);
			//alert(groupName.substring(0,groupName.indexOf(':'))+"    "+groupField[groupField.length-1])
			//var ingroups;
			//var 
			
			var groupName=gs[i].childNodes[0].childNodes[0].innerHTML;
			if(groupName.substring(0,groupName.indexOf(':'))==groupField[groupField.length-1])
			{
            g = gs[i].childNodes[1].childNodes;
            for(var j = 0, jlen = g.length; j < jlen; j++){
				
                r[r.length] = g[j];
            }
			}
			else
			{
				r=getRowsFromGroup(r,gs[i].childNodes[1].childNodes,groupField[groupField.length-1])
			}
        }
        return r;
    }
    ,
    doRender: function(cs, rs, ds, startRow, colCount, stripe){
       // alert('do Renderer MULTI GPU');
        if (rs.length < 1) {
            return '';
        }
		//alert(cs);
        var groupField = this.getGroupField();
        this.enableGrouping = !!groupField;
        
        if (!this.enableGrouping || this.isUpdating) {
            return Ext.grid.GroupingView.superclass.doRender.apply(this, arguments);
        }
        
        var gstyle = 'width:' + this.getTotalWidth() + ';';
        
        var gidPrefix = this.grid.getGridEl().id;
        
        var groups = [], curGroup, i, len, gid;
        var lastvalues = [];
        //alert(rs.length);
        for (i = 0, len = rs.length; i < len; i++) {
            var rowIndex = startRow + i;
            var r = rs[i];
            
            var gvalue = [];
            var fieldName;
            var grpDisplayValues = [];
            var v;
            var changed = 0;
            //alert('groupField.length '+groupField.length);
            for (j = 0, gfLen = groupField.length; j < gfLen; j++) {
            
                fieldName = groupField[j];
                //alert(fieldName);
                v = r.data[fieldName];
                
                //alert(rowIndex+'       v  '+ fieldName+'  '+r.data[fieldName]);
                
                if (v) {
                
                    if (i == 0) {
                        lastvalues[j] = v;
                        gvalue.push(v);
                        grpDisplayValues.push(fieldName + ': ' + v);
                        gvalue.push(v);
                    }
                    else {//alert((lastvalues[j] != v)+ "   "+j+"  " + (rowIndex-1)+"    "+ lastvalues[j]+  "  "+v);
                        if (lastvalues[j] != v) {
                            changed = 1;
                            gvalue.push(v);
                            grpDisplayValues.push(fieldName + ': ' + v);
                            lastvalues[j] = v;
                        }
                        else {
                            //lastvalues[j] = v;
                            //gvalue.push(v);
                            if (groupField.length - 1 == j) 
                                curGroup.rs.push(r);
                            //if(j==groupField.length-1)
                            if (changed == 1) 
                                grpDisplayValues.push(fieldName + ': ' + v);
                        }
                        
                    }
                }
                else 
                    if (this.displayEmptyFields) {
                        grpDisplayValues.push(fieldName + ': ');
                    }
            }
            
            //alert(rowIndex-1 +"  "+grpDisplayValues.length);
            //g = this.getGroup(gvalue, r, groupRenderer, rowIndex, colIndexes[index], ds);
            if (gvalue.length < 1 && this.emptyGroupText) 
                g = this.emptyGroupText;
            else 
                g = grpDisplayValues;//.join(this.displayFieldSeperator);
            //alert(rowIndex +"  "+grpDisplayValues.length);
            for (k = 0; k < grpDisplayValues.length; k++) {
                //alert(grpDisplayValues[k]);
                g = grpDisplayValues[k];
                //alert((!curGroup || curGroup.group != g)+ g+"  " +k);
                if (!curGroup || curGroup.group != g) {
                
                    gid = gidPrefix + '-gp-' + groupField[k] + '-' + Ext.util.Format.htmlEncode(g);
                    //alert(gid);
                    
                    // if state is defined use it, however state is in terms of expanded
                    // so negate it, otherwise use the default.
                    var isCollapsed = typeof this.state[gid] !== 'undefined' ? !this.state[gid] : this.startCollapsed;
                    var gcls = isCollapsed ? 'x-grid-group-collapsed' : '';
					var jjj
					for (jjj = 0; jjj < groupField.length; jjj++) {
							if (g.substring(0, g.indexOf(':')) == groupField[jjj]) 
								break;
						}
                    if (k == grpDisplayValues.length - 1) {
                        curGroup = {
                            group: g,
                            gvalue: gvalue[k],
                            text: g,
                            groupId: gid,
                            startRow: rowIndex,
                            rs: [r],
                            cls: gcls,
                            style: gstyle+'padding-left:'+(jjj*12)+'px;',
                        };
                    }
                    else {
                        curGroup = {
                            group: g,
                            gvalue: gvalue[k],
                            text: g,
                            groupId: gid,
                            startRow: rowIndex,
                            rs: [],
                            cls: gcls,
                            style: gstyle+'padding-left:'+(jjj*12)+'px;',
                        };
                    }
                    groups.push(curGroup);
                }
                else {
                    curGroup.rs.push(r);
                }
                r._groupId = gid;
            }
        }
        var buf = [];
		var toEnd=0;
        for (i = 0, len = groups.length; i < len; i++) {
			toEnd++;
			
            var g = groups[i];
		//	alert(g.group.substring(0,g.group.indexOf(':'))+ "   "+groupField[groupField.length-1]);
            this.doGroupStart(buf, g, cs, ds, colCount);
           // if(g.rs.length!=0)
            buf[buf.length] = Ext.grid.GroupingView.superclass.doRender.call(this, cs, g.rs, ds, g.startRow, colCount, stripe);
		
          //  if ((i+1) % groupField.length == 0 && i != 0) {
		 // alert('sdlfs');
				if(g.group.substring(0,g.group.indexOf(':'))==groupField[groupField.length-1])
				{
				var jj;
				//alert('sdfdsfds');
				var gg=groups[i+1];
				//alert(gg);
					if(gg!=null)
					{
						
						for (jj = 0; jj < groupField.length; jj++) {
							if (gg.group.substring(0, gg.group.indexOf(':')) == groupField[jj]) 
								break;
						}
						//alert(jj+"  "+gg.group.substring(0,gg.group.lastIndexOf(':')));
						toEnd=groupField.length-jj;
					}
				for (k = 0; k < toEnd; k++) {
					this.doGroupEnd(buf, g, cs, ds, colCount);
					
				}
				toEnd=jj;
			
			}
        
        }
       // alert('Group End');
        return buf.join('');
    }
});
function getRowsFromGroup(r,gs,lsField)
{
	for(var i = 0, len = gs.length; i < len; i++){
				
			var groupName=gs[i].childNodes[0].childNodes[0].innerHTML;
			//alert(groupName.substring(0,groupName.indexOf(':')));
			if(groupName.substring(0,groupName.indexOf(':'))==lsField)
			{
            g = gs[i].childNodes[1].childNodes;
            for(var j = 0, jlen = g.length; j < jlen; j++){
				
                r[r.length] = g[j];
            }
			}
			else
			{
				r=getRowsFromGroup(r,gs[i].childNodes[1].childNodes,lsField);
			}
        }
	return r;
}

Ext.BLANK_IMAGE_URL = 'images/s.gif';

Ext.ux.Portlet = Ext.extend(Ext.Panel, {
    anchor: '100%',
    frame:true,
    collapsible:true,
    draggable:true,
    cls:'x-portlet'
});
Ext.reg('portlet', Ext.ux.Portlet);

/****************************************************************************************************/

Ext.ux.PortalColumn = Ext.extend(Ext.Container, {
    layout: 'anchor',
    autoEl: 'div',
    defaultType: 'portlet',
    cls:'x-portal-column'
});
Ext.reg('portalcolumn', Ext.ux.PortalColumn);

/****************************************************************************************************/

Ext.ux.Portal = Ext.extend(Ext.Panel, {
    layout: 'column',
    autoScroll:true,
    cls:'x-portal',
    defaultType: 'portalcolumn',

    initComponent : function(){
        Ext.ux.Portal.superclass.initComponent.call(this);
        this.addEvents({
            validatedrop:true,
            beforedragover:true,
            dragover:true,
            beforedrop:true,
            drop:true
        });
    },

    initEvents : function(){
        Ext.ux.Portal.superclass.initEvents.call(this);
        this.dd = new Ext.ux.Portal.DropZone(this, this.dropConfig);
    }
});
Ext.reg('portal', Ext.ux.Portal);


Ext.ux.Portal.DropZone = function(portal, cfg){
    this.portal = portal;
    Ext.dd.ScrollManager.register(portal.body);
    Ext.ux.Portal.DropZone.superclass.constructor.call(this, portal.bwrap.dom, cfg);
    portal.body.ddScrollConfig = this.ddScrollConfig;
};

Ext.extend(Ext.ux.Portal.DropZone, Ext.dd.DropTarget, {
    ddScrollConfig : {
        vthresh: 50,
        hthresh: -1,
        animate: true,
        increment: 200
    },

    createEvent : function(dd, e, data, col, c, pos){
        return {
            portal: this.portal,
            panel: data.panel,
            columnIndex: col,
            column: c,
            position: pos,
            data: data,
            source: dd,
            rawEvent: e,
            status: this.dropAllowed
        };
    },

    notifyOver : function(dd, e, data){
        var xy = e.getXY(), portal = this.portal, px = dd.proxy;

        // case column widths
        if(!this.grid){
            this.grid = this.getGrid();
        }

        // handle case scroll where scrollbars appear during drag
        var cw = portal.body.dom.clientWidth;
        if(!this.lastCW){
            this.lastCW = cw;
        }else if(this.lastCW != cw){
            this.lastCW = cw;
            portal.doLayout();
            this.grid = this.getGrid();
        }

        // determine column
        var col = 0, xs = this.grid.columnX, cmatch = false;
        for(var len = xs.length; col < len; col++){
            if(xy[0] < (xs[col].x + xs[col].w)){
                cmatch = true;
                break;
            }
        }
        // no match, fix last index
        if(!cmatch){
            col--;
        }

        // find insert position
        var p, match = false, pos = 0,
            c = portal.items.itemAt(col),
            items = c.items.items;

        for(var len = items.length; pos < len; pos++){
            p = items[pos];
            var h = p.el.getHeight();
            if(h !== 0 && (p.el.getY()+(h/2)) > xy[1]){
                match = true;
                break;
            }
        }

        var overEvent = this.createEvent(dd, e, data, col, c,
                match && p ? pos : c.items.getCount());

        if(portal.fireEvent('validatedrop', overEvent) !== false &&
           portal.fireEvent('beforedragover', overEvent) !== false){

            // make sure proxy width is fluid
            px.getProxy().setWidth('auto');

            if(p){
                px.moveProxy(p.el.dom.parentNode, match ? p.el.dom : null);
            }else{
                px.moveProxy(c.el.dom, null);
            }

            this.lastPos = {c: c, col: col, p: match && p ? pos : false};
            this.scrollPos = portal.body.getScroll();

            portal.fireEvent('dragover', overEvent);

            return overEvent.status;;
        }else{
            return overEvent.status;
        }

    },

    notifyOut : function(){
        delete this.grid;
    },

    notifyDrop : function(dd, e, data){
        delete this.grid;
        if(!this.lastPos){
            return;
        }
        var c = this.lastPos.c, col = this.lastPos.col, pos = this.lastPos.p;

        var dropEvent = this.createEvent(dd, e, data, col, c,
                pos !== false ? pos : c.items.getCount());

        if(this.portal.fireEvent('validatedrop', dropEvent) !== false &&
           this.portal.fireEvent('beforedrop', dropEvent) !== false){

            dd.proxy.getProxy().remove();
            dd.panel.el.dom.parentNode.removeChild(dd.panel.el.dom);
            if(pos !== false){
                c.insert(pos, dd.panel);
            }else{
                c.add(dd.panel);
            }
            
            c.doLayout();

            this.portal.fireEvent('drop', dropEvent);

            // scroll position is lost on drop, fix it
            var st = this.scrollPos.top;
            if(st){
                var d = this.portal.body.dom;
                setTimeout(function(){
                    d.scrollTop = st;
                }, 10);
            }

        }
        delete this.lastPos;
    },

    // internal cache of body and column coords
    getGrid : function(){
        var box = this.portal.bwrap.getBox();
        box.columnX = [];
        this.portal.items.each(function(c){
             box.columnX.push({x: c.el.getX(), w: c.el.getWidth()});
        });
        return box;
    }
});
/****************************************************************************************/
/*                          groupsummary                                                */
/****************************************************************************************/
/*
 * Ext JS Library 2.0
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.grid.GroupSummary = function(config){
    Ext.apply(this, config);
};

Ext.extend(Ext.grid.GroupSummary, Ext.util.Observable, {
    init : function(grid){
        this.grid = grid;
        this.cm = grid.getColumnModel();
        this.view = grid.getView();

        var v = this.view;
        v.doGroupEnd = this.doGroupEnd.createDelegate(this);

        v.afterMethod('onColumnWidthUpdated', this.doWidth, this);
        v.afterMethod('onAllColumnWidthsUpdated', this.doAllWidths, this);
        v.afterMethod('onColumnHiddenUpdated', this.doHidden, this);
        v.afterMethod('onUpdate', this.doUpdate, this);
        v.afterMethod('onRemove', this.doRemove, this);

        if(!this.rowTpl){
            this.rowTpl = new Ext.Template(
                '<div class="x-grid3-summary-row" style="{tstyle}">',
                '<table class="x-grid3-summary-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
                    '<tbody><tr>{cells}</tr></tbody>',
                '</table></div>'
            );
            this.rowTpl.disableFormats = true;
        }
        this.rowTpl.compile();

        if(!this.cellTpl){
            this.cellTpl = new Ext.Template(
                '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}">',
                '<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on">{value}</div>',
                "</td>"
            );
            this.cellTpl.disableFormats = true;
        }
        this.cellTpl.compile();
    },

    toggleSummaries : function(visible){
        var el = this.grid.getGridEl();
        if(el){
            if(visible === undefined){
                visible = el.hasClass('x-grid-hide-summary');
            }
            el[visible ? 'removeClass' : 'addClass']('x-grid-hide-summary');
        }
    },

    renderSummary : function(o, cs){
        cs = cs || this.view.getColumnData();
        var cfg = this.cm.config;

        var buf = [], c, p = {}, cf, last = cs.length-1;
        for(var i = 0, len = cs.length; i < len; i++){
            c = cs[i];
            cf = cfg[i];
            p.id = c.id;
            p.style = c.style;
            p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
            if(cf.summaryType || cf.summaryRenderer){
                p.value = (cf.summaryRenderer || c.renderer)(o.data[c.name], p, o);
            }else{
                p.value = '';
            }
            if(p.value == undefined || p.value === "") p.value = "&#160;";
            buf[buf.length] = this.cellTpl.apply(p);
        }

        return this.rowTpl.apply({
            tstyle: 'width:'+this.view.getTotalWidth()+';',
            cells: buf.join('')
        });
    },

    calculate : function(rs, cs){
        var data = {}, r, c, cfg = this.cm.config, cf;
        for(var j = 0, jlen = rs.length; j < jlen; j++){
            r = rs[j];
            for(var i = 0, len = cs.length; i < len; i++){
                c = cs[i];
                cf = cfg[i];
                if(cf.summaryType){
                    data[c.name] = Ext.grid.GroupSummary.Calculations[cf.summaryType](data[c.name] || 0, r, c.name, data);
                }
            }
        }
        return data;
    },

    doGroupEnd : function(buf, g, cs, ds, colCount){
        var data = this.calculate(g.rs, cs);
        buf.push('</div>', this.renderSummary({data: data}, cs), '</div>');
    },

    doWidth : function(col, w, tw){
        var gs = this.view.getGroups(), s;
        for(var i = 0, len = gs.length; i < len; i++){
            s = gs[i].childNodes[2];
            s.style.width = tw;
            s.firstChild.style.width = tw;
            s.firstChild.rows[0].childNodes[col].style.width = w;
        }
    },

    doAllWidths : function(ws, tw){
        var gs = this.view.getGroups(), s, cells, wlen = ws.length;
        for(var i = 0, len = gs.length; i < len; i++){
            s = gs[i].childNodes[2];
            s.style.width = tw;
            s.firstChild.style.width = tw;
            cells = s.firstChild.rows[0].childNodes;
            for(var j = 0; j < wlen; j++){
                cells[j].style.width = ws[j];
            }
        }
    },

    doHidden : function(col, hidden, tw){
        var gs = this.view.getGroups(), s, display = hidden ? 'none' : '';
        for(var i = 0, len = gs.length; i < len; i++){
            s = gs[i].childNodes[2];
            s.style.width = tw;
            s.firstChild.style.width = tw;
            s.firstChild.rows[0].childNodes[col].style.display = display;
        }
    },

    // Note: requires that all (or the first) record in the 
    // group share the same group value. Returns false if the group
    // could not be found.
    refreshSummary : function(groupValue){
        return this.refreshSummaryById(this.view.getGroupId(groupValue));
    },

    getSummaryNode : function(gid){
        var g = Ext.fly(gid, '_gsummary');
        if(g){
            return g.down('.x-grid3-summary-row', true);
        }
        return null;
    },

    refreshSummaryById : function(gid){
        var g = document.getElementById(gid);
        if(!g){
            return false;
        }
        var rs = [];
        this.grid.store.each(function(r){
            if(r._groupId == gid){
                rs[rs.length] = r;
            }
        });
        var cs = this.view.getColumnData();
        var data = this.calculate(rs, cs);
        var markup = this.renderSummary({data: data}, cs);

        var existing = this.getSummaryNode(gid);
        if(existing){
            g.removeChild(existing);
        }
        Ext.DomHelper.append(g, markup);
        return true;
    },

    doUpdate : function(ds, record){
        this.refreshSummaryById(record._groupId);
    },

    doRemove : function(ds, record, index, isUpdate){
        if(!isUpdate){
            this.refreshSummaryById(record._groupId);
        }
    },

    showSummaryMsg : function(groupValue, msg){
        var gid = this.view.getGroupId(groupValue);
        var node = this.getSummaryNode(gid);
        if(node){
            node.innerHTML = '<div class="x-grid3-summary-msg">' + msg + '</div>';
        }
    }
});

Ext.grid.GroupSummary.Calculations = {
    'sum' : function(v, record, field){
        return v + (record.data[field]||0);
    },

    'count' : function(v, record, field, data){
        return data[field+'count'] ? ++data[field+'count'] : (data[field+'count'] = 1);
    },

    'max' : function(v, record, field, data){
        var v = record.data[field];
        var max = data[field+'max'] === undefined ? (data[field+'max'] = v) : data[field+'max'];
        return v > max ? (data[field+'max'] = v) : max;
    },

    'min' : function(v, record, field, data){
        var v = record.data[field];
        var min = data[field+'min'] === undefined ? (data[field+'min'] = v) : data[field+'min'];
        return v < min ? (data[field+'min'] = v) : min;
    },

    'average' : function(v, record, field, data){
        var c = data[field+'count'] ? ++data[field+'count'] : (data[field+'count'] = 1);
        var t = (data[field+'total'] = ((data[field+'total']||0) + (record.data[field]||0)));
        return t === 0 ? 0 : t / c;
    }
}

Ext.grid.HybridSummary = Ext.extend(Ext.grid.GroupSummary, {
    calculate : function(rs, cs){
        var gcol = this.view.getGroupField();
        var gvalue = rs[0].data[gcol];
        var gdata = this.getSummaryData(gvalue);
        return gdata || Ext.grid.HybridSummary.superclass.calculate.call(this, rs, cs);
    },

    updateSummaryData : function(groupValue, data, skipRefresh){
        var json = this.grid.store.reader.jsonData;
        if(!json.summaryData){
            json.summaryData = {};
        }
        json.summaryData[groupValue] = data;
        if(!skipRefresh){
            this.refreshSummary(groupValue);
        }
    },

    getSummaryData : function(groupValue){
        var json = this.grid.store.reader.jsonData;
        if(json && json.summaryData){
            return json.summaryData[groupValue];
        }
        return null;
    }
});

/****************************************************************************************/

/****************************************************************************************/
/*                          calculator                                                  */
/****************************************************************************************/
//
// Ext.ux.Calculator
// 
// ---------------------------------------------------------------------------------------
// Version History
// ---------------------------------------------------------------------------------------
//
// 1.3		Fixes					22 Aug 2007		Nullity
//		- Fixed bug with performing operations when including number in memory
//		- Decimal number less than 1 now leads with a 0 (i.e. 0.52)
//		- Changed some element ids to allow more than one calculator on a page
//		  to work correctly
//      - Fixed bug when pressing backspace after loading initial number
//         via setValue (eg. setting intial value via trigger field) [Toby Stuart]
//
// 1.2		Enhancements				21 Aug 2007		Nullity
//		- Added Memory buttons/functions (store, add, recall, clear)
//		- Added Backspace button/function
//		- Added some Quicktips (can be enabled/disabled)
//		- Several CSS changes/additions
//
// 1.1		Enhancements				14 Aug 2007		Toby Stuart
//		- Added 'CE' button
//		- Added visual feedback when keyboard used
//
// 1.0		Release					31 July 2007		Toby Stuart
// 
//
//

Ext.namespace("Ext.ux");

Ext.ux.Calculator = function(config) {
	Ext.ux.Calculator.superclass.constructor.call(this, config);
	this.id = this.id || Ext.id();
};


Ext.extend(Ext.ux.Calculator, Ext.Component, {
	number: '0',
	num1: '',
	num2: '',
	operator: '',
	memValue: '0',
	addToNum: 'no', // yes, no, reset
	showOkBtn: true,
	showTips: false,
	
	onRender : function() {
		var elDom = Ext.get(document.body).createChild({tag: 'div', cls: 'ux-calc'});
		el = new Ext.Layer({constrain: true}, elDom);

		this.standardDiv = el.createChild({tag: 'div', id: 'standardCalc_' + this.id, style: 'float: left;'});
		this.stTable = this.standardDiv.createChild({tag: 'table', cellspacing: 0, cellpadding: 0, width: 150, cls: 'ux-calc-container'});

		var maxCols = 5;

		var stBtns =
		[
			[{label: '&nbsp;', func: 'memStore', id: 'memStore_' + this.id}, {label: 'C', func: 'clear', keys: [27], tip: 'Clear All'}, {label: 'CE', func: 'clear', tip: 'Clear Entry'}, {label: 'BS', func: 'clear', keys: [22], tip: 'Backspace'}, {label: '/', func: 'operation', keys: [111, 191]}],
			[{label: 'MC', func: 'memory', tip: ' Memory Clear'}, {label: '7', func: 'enterDigit', keys: [55, 103]}, {label: '8', func: 'enterDigit', keys: [56, 104]}, {label: '9', func: 'enterDigit', keys: [57, 105]}, {label: '*', func: 'operation', keys: [106]}],
			[{label: 'MR', func: 'memory', tip: 'Memory Recall'}, {label: '4', func: 'enterDigit', keys: [52, 100]}, {label: '5', func: 'enterDigit', keys: [53, 101]}, {label: '6', func: 'enterDigit', keys: [54, 102]}, {label: '-', func: 'operation', keys: [109]}],
			[{label: 'MS', func: 'memory', tip: 'Memory Store'}, {label: '1', func: 'enterDigit', keys: [49, 97]}, {label: '2', func: 'enterDigit', keys: [50, 98]}, {label: '3', func: 'enterDigit', keys: [51, 99]}, {label: '+', func: 'operation', keys: [107]}],
			[{label: 'M+', func: 'memory', tip: 'Memory Add'}, {label: '+/-', func: 'plusminus'}, {label: '0', func: 'enterDigit', keys: [48, 96]}, {label: '.', func: 'enterDot', keys: [110, 190]}, {label: '=', func: 'equals', keys: [10, 13]}],
			[{label: 'OK', func: 'ok'}]
		];

		this.keyMap = new Ext.KeyMap(el, {});

		var row = this.stTable.createChild({tag: 'tr'}).child('tr');
		var cell = Ext.get(row.dom.appendChild(document.createElement('td')));
		cell.dom.colSpan = maxCols;

		this.inputBox = new Ext.form.TextField({
			id: this.id,
			name: this.id,
			width: 150,
			readOnly: true,
			cls: 'ux-calc-input',
			value: '0'
		});
		this.inputBox.render(cell);

		for (i = 0; i < stBtns.length; i++) {
			if (!this.showOkBtn && i == stBtns.length - 1) {
				break;
			}

			var btn = stBtns[i];
			var row = this.stTable.createChild({tag:'tr'}).child('tr');

			for (j = 0; j < btn.length; j++) {
				var cell = Ext.get(row.dom.appendChild(document.createElement('td')));
				cell.dom.id = btn[j].id || Ext.id();
				cell.dom.innerHTML = btn[j].label;
				cell.dom.width = '30';
				cell.dom.align = 'center';
				cell.dom.valign = 'center';

				switch (btn[j].func) {
					case 'enterDigit':
						var cls = 'ux-calc-digit';
						break;
					case 'operation':
						var cls = 'ux-calc-operator';
						break;
					case 'equals':
						var cls = 'ux-calc-equals';
						break;
					case 'clear':
						var cls = 'ux-calc-memory';
						break;
					case 'memory':
						var cls = 'ux-calc-memory';
						break;
					case 'memStore':
						var cls = 'ux-calc-memstore';
						break;
					case 'ok':
						var cls = 'ux-calc-ok';
						break;
					default:
						cls = 'ux-calc-misc';
					
				}

				cell.dom.className = cls;

				if (j == btn.length - 1 && j < maxCols - 1) {
					cell.dom.colSpan = (maxCols - j+1);
				}

				if (btn[j].func != 'memStore') {
					cell.addClassOnOver('ux-calc-btn-hover');
					cell.on('click', this.onClick, this, {button: btn[j]});
				}

				if (btn[j].keys) {
					this.keyMap.addBinding({
						key: btn[j].keys,
						fn: this.onClick.createDelegate(this, [null, this, {button: btn[j], viaKbd: true, cell: cell}]),
						scope: this
					});
				}

				if (this.showTips && btn[j].tip) {
					Ext.QuickTips.register({
						target: cell,
						text: btn[j].tip
					});
				}
			}
		}

		this.keyMap.enable();
		this.el = el;
	},

	getValue : function() {
		return this.inputBox.getValue();
	},

	setValue : function(value) {
		this.number = value;
		this.inputBox.setValue(this.number);
	},

	onClick : function(e, el, opt) {
		if (opt.viaKbd) {
			Ext.get(opt.cell).highlight('FF0000', {attr: 'color', duration: .3});
		}

		var s = 'this.' + opt.button.func + '(\'' + opt.button.label + '\');';
		eval(s);
	},

	updateDisplay : function() {
		if (this.number == 'Infinity') {
			this.number = '0';
		}

		this.inputBox.setValue(this.number);
	},

	enterDigit : function(n) {
		if (this.addToNum == 'yes') {
			this.number += n;

			if (this.number.charAt(0) == 0 && this.number.indexOf('.') == -1) {
				this.number = this.number.substring(1);
			}
		}
		else {
			if (this.addToNum == 'reset') {
				this.reset();
			}

			this.number = n;
			this.addToNum = 'yes';
		}
		this.updateDisplay();
	},

	enterDot : function() {
		if (this.addToNum == 'yes') {
			if (this.number.indexOf('.') != -1) {
				return;
			}

			this.number += '.';
		}
		else {
			if (this.addToNum == 'reset') {
				this.reset();
			}

			this.number = '0.';
			this.addToNum = 'yes';
		}

		this.updateDisplay();
	},

	plusminus : function() {
		if (this.number == '0') {
			return;
		}

		this.number = (this.number.charAt(0) == '-') ? this.number.substring(1) : '-' + this.number;
		this.updateDisplay();
	},

	reset : function() {
		this.number = '0';
		this.addToNum = 'no';
		this.num1 = '';
		this.num2 = '';
		this.operator = '';
	},

	clear : function(o) {
		switch(o) {
			case 'C':
				this.clearAll();
				break;
			case 'CE':
				this.clearEntry();
				break;
			case 'BS':
				this.backspace();
				break;
			default:
				break;
		}
	},

	clearAll : function() {
		this.reset();
		this.updateDisplay();
	},

	clearEntry : function() {
		this.number = '0';
		this.addToNum = 'no';
		this.updateDisplay();
	},

	backspace : function() {
		var n = this.number + '';

		if (n == '0') {
			return;
		}

		this.number = n.substring(0, n.length-1);
		this.updateDisplay();
	},

	memory : function(o) {
		switch(o) {
			case 'M+':
				this.memStore(true);
				break;
			case 'MS':
				this.memStore();
				break;
			case 'MR':
				this.memRecall();
				break;
			case 'MC':
				this.memClear();
				break;
			default:
				break;
		}
	},

	memStore : function(add) {
		if (!this.number || this.number == '0') {
			return;
		}
		else {
			this.memValue = (add === true) ? this.calculate(this.number, this.memValue, '+') : this.number;

			var memDiv = Ext.get('memStore_' + this.id);
			memDiv.dom.innerHTML = 'M';

			if (this.showTips) {
				Ext.QuickTips.register({
					target: memDiv,
					text: 'Memory: <b>' + this.memValue + '</b>'
				});
			}
		}
	},

	memRecall : function() {
		if (this.memValue != '0') {
			this.number = this.memValue;

			if (this.num1) {
				this.num2 = this.memValue;
			}

			this.updateDisplay();
		}
	},

	memClear : function() {
		this.memValue = '0';
		var memDiv = Ext.get('memStore_' + this.id);
		memDiv.dom.innerHTML = '&nbsp;';

		if (this.showTips) {
			Ext.QuickTips.unregister(memDiv);
		}
	},

	accuracyCheck : function(result) {
		var i, n, j, k;
		var check;

		for (i = 0; i < 9; i++) {
			check = result * Math.pow(10, i);
			k = i + 1;
			n = Math.abs(Math.round(check) - check);
			j = Math.pow(10, -(12-i));

			if (n < j) {
				return Math.round(check) * Math.pow(10, -i);
			}
		}

		return result;
	},

	calculate : function(o1, o2, op) {
		var result;

		if (op == '=') {
			result = o1 = o2;
			o2 = '';
		}
		else {
			result = eval('o1 + op + o2');
			result = eval(result);
		}

		return result;
	},

	operation : function(op) {
		if (this.num1 == '' && typeof(this.num1) == 'string') {
			this.num1 = parseFloat(this.number);
			this.operator = op;
			this.addToNum = 'no';
		}
		else {
			if (this.addToNum == 'yes') {
				this.num2 = parseFloat(this.number);
				this.num1 = this.calculate(this.num1, this.num2, this.operator);
				this.number = this.accuracyCheck(this.num1) + '';
				this.updateDisplay();
				this.operator = op;
				this.addToNum = 'no';
			}
			else {
				this.operator = op;
				this.addToNum = 'no';
			}
		}
	},

	equals : function() {
		if (this.addToNum == 'yes') {
			if (this.num1 == '' && typeof(this.num1) == 'string') {
				this.operator = '=';
				this.num1 = parseFloat(this.number);
				this.addToNum = 'no';
			}
			else {
				this.num2 = parseFloat(this.number);
				this.num1 = this.calculate(this.num1, this.num2, this.operator);
				this.number = this.accuracyCheck(this.num1) + '';
				this.updateDisplay();
				this.addToNum = 'reset';
			}
		}
		else {
			if (this.num1 == '' && typeof(this.num1) == 'string') {
				return;
			}
			else {
				if (this.num2 == '' && typeof(this.num2) == 'string') {
					this.num2 = this.num1;
				}

				this.num1 = this.calculate(this.num1, this.num2, this.operator);
				this.number = this.accuracyCheck(this.num1) + '';
				this.updateDisplay();
				this.addToNum = 'reset';
			}
		}
	},
	
	alignTo : function(el, pos) {
		if (this.el) {
			this.el.alignTo(el, pos);
		}
	},

	ok : function() {
		this.fireEvent('hide', this);
	},

	show : function() {
		if (this.el) {
			this.el.show();
			this.inputBox.el.dom.focus();
		}
	},

	hide : function() {
		if (this.el && this.el.isVisible()) {
			this.el.hide();
		}
	}
});


/****************************************************************************************/

/****************************************************************************************/
/*                          ColumnNodeUI                                                */
/****************************************************************************************/
/*
 * Ext JS Library 2.2.1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.tree.ColumnTree = Ext.extend(Ext.tree.TreePanel, {
    lines:false,
    borderWidth: Ext.isBorderBox ? 0 : 2, // the combined left/right border for each cell
    cls:'x-column-tree',
    
    onRender : function(){
        Ext.tree.ColumnTree.superclass.onRender.apply(this, arguments);
        this.headers = this.body.createChild(
            {cls:'x-tree-headers'},this.innerCt.dom);

        var cols = this.columns, c;
        var totalWidth = 0;

        for(var i = 0, len = cols.length; i < len; i++){
             c = cols[i];
             totalWidth += c.width;
             this.headers.createChild({
                 cls:'x-tree-hd ' + (c.cls?c.cls+'-hd':''),
                 cn: {
                     cls:'x-tree-hd-text',
                     html: c.header
                 },
                 style:'width:'+(c.width-this.borderWidth)+'px;'
             });
        }
        this.headers.createChild({cls:'x-clear'});
        // prevent floats from wrapping when clipped
        this.headers.setWidth(totalWidth);
        this.innerCt.setWidth(totalWidth);
    }
});

Ext.tree.ColumnNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    focus: Ext.emptyFn, // prevent odd scrolling behavior

    renderElements : function(n, a, targetNode, bulkRender){
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';

        var t = n.getOwnerTree();
        var cols = t.columns;
        var bw = t.borderWidth;
        var c = cols[0];

        var buf = [
             '<li class="x-tree-node"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf ', a.cls,'">',
                '<div class="x-tree-col" style="width:',c.width-bw,'px;">',
                    '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
                    '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow">',
                    '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on">',
                    '<a hidefocus="on" class="x-tree-node-anchor" href="',a.href ? a.href : "#",'" tabIndex="1" ',
                    a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '>',
                    '<span unselectable="on">', n.text || (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),"</span></a>",
                "</div>"];
         for(var i = 1, len = cols.length; i < len; i++){
             c = cols[i];

             buf.push('<div class="x-tree-col ',(c.cls?c.cls:''),'" style="width:',c.width-bw,'px;">',
                        '<div class="x-tree-col-text">',(c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),"</div>",
                      "</div>");
         }
         buf.push(
            '<div class="x-clear"></div></div>',
            '<ul class="x-tree-node-ct" style="display:none;"></ul>',
            "</li>");

        if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin",
                                n.nextSibling.ui.getEl(), buf.join(""));
        }else{
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(""));
        }

        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1];
        var cs = this.elNode.firstChild.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        this.anchor = cs[3];
        this.textNode = cs[3].firstChild;
    }
});


// old school cookie functions grabbed off the web
var Cookies = {};
	Cookies.set = function(name, value){
     var argv = arguments;
     var argc = arguments.length;
     var expires = (argc > 2) ? argv[2] : null;
     var path = (argc > 3) ? argv[3] : '/';
     var domain = (argc > 4) ? argv[4] : null;
     var secure = (argc > 5) ? argv[5] : false;
     document.cookie = name + "=" + escape (value) +
       ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
       ((path == null) ? "" : ("; path=" + path)) +
       ((domain == null) ? "" : ("; domain=" + domain)) +
       ((secure == true) ? "; secure" : "");
};

Cookies.get = function(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	var j = 0;
	while(i < clen){
		j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return Cookies.getCookieVal(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if(i == 0)
			break;
	}
	return null;
};

Cookies.clear = function(name) {
  if(Cookies.get(name)){
    document.cookie = name + "=" +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
};

Cookies.getCookieVal = function(offset){
   var endstr = document.cookie.indexOf(";", offset);
   if(endstr == -1){
       endstr = document.cookie.length;
   }
   return unescape(document.cookie.substring(offset, endstr));
};

/****************************************************************************************/
/**
 * Makes a ComboBox more closely mimic an HTML SELECT.  Supports clicking and dragging
 * through the list, with item selection occurring when the mouse button is released.
 * When used will automatically set {@link #editable} to false and call {@link Ext.Element#unselectable}
 * on inner elements.  Re-enabling editable after calling this will NOT work.
 *
 * @author Corey Gilmore
 * http://extjs.com/forum/showthread.php?t=6392
 *
 * @history 2007-07-08 jvs
 * Slight mods for Ext 2.0
 */
Ext.ux.SelectBox = function(config){
	this.searchResetDelay = 1000;
	config = config || {};
	config = Ext.apply(config || {}, {
		editable: false,
		forceSelection: true,
		rowHeight: false,
		lastSearchTerm: false,
        triggerAction: 'all',
        mode: 'local'
    });

	Ext.ux.SelectBox.superclass.constructor.apply(this, arguments);

	this.lastSelectedIndex = this.selectedIndex || 0;
};

Ext.extend(Ext.ux.SelectBox, Ext.form.ComboBox, {
    lazyInit: false,
	initEvents : function(){
		Ext.ux.SelectBox.superclass.initEvents.apply(this, arguments);
		// you need to use keypress to capture upper/lower case and shift+key, but it doesn't work in IE
		this.el.on('keydown', this.keySearch, this, true);
		this.cshTask = new Ext.util.DelayedTask(this.clearSearchHistory, this);
	},

	keySearch : function(e, target, options) {
		var raw = e.getKey();
		var key = String.fromCharCode(raw);
		var startIndex = 0;

		if( !this.store.getCount() ) {
			return;
		}

		switch(raw) {
			case Ext.EventObject.HOME:
				e.stopEvent();
				this.selectFirst();
				return;

			case Ext.EventObject.END:
				e.stopEvent();
				this.selectLast();
				return;

			case Ext.EventObject.PAGEDOWN:
				this.selectNextPage();
				e.stopEvent();
				return;

			case Ext.EventObject.PAGEUP:
				this.selectPrevPage();
				e.stopEvent();
				return;
		}

		// skip special keys other than the shift key
		if( (e.hasModifier() && !e.shiftKey) || e.isNavKeyPress() || e.isSpecialKey() ) {
			return;
		}
		if( this.lastSearchTerm == key ) {
			startIndex = this.lastSelectedIndex;
		}
		this.search(this.displayField, key, startIndex);
		this.cshTask.delay(this.searchResetDelay);
	},

	onRender : function(ct, position) {
		this.store.on('load', this.calcRowsPerPage, this);
		Ext.ux.SelectBox.superclass.onRender.apply(this, arguments);
		if( this.mode == 'local' ) {
			this.calcRowsPerPage();
		}
	},

	onSelect : function(record, index, skipCollapse){
		if(this.fireEvent('beforeselect', this, record, index) !== false){
			this.setValue(record.data[this.valueField || this.displayField]);
			if( !skipCollapse ) {
				this.collapse();
			}
			this.lastSelectedIndex = index + 1;
			this.fireEvent('select', this, record, index);
		}
	},

	render : function(ct) {
		Ext.ux.SelectBox.superclass.render.apply(this, arguments);
		if( Ext.isSafari ) {
			this.el.swallowEvent('mousedown', true);
		}
		this.el.unselectable();
		this.innerList.unselectable();
		this.trigger.unselectable();
		this.innerList.on('mouseup', function(e, target, options) {
			if( target.id && target.id == this.innerList.id ) {
				return;
			}
			this.onViewClick();
		}, this);

		this.innerList.on('mouseover', function(e, target, options) {
			if( target.id && target.id == this.innerList.id ) {
				return;
			}
			this.lastSelectedIndex = this.view.getSelectedIndexes()[0] + 1;
			this.cshTask.delay(this.searchResetDelay);
		}, this);

		this.trigger.un('click', this.onTriggerClick, this);
		this.trigger.on('mousedown', function(e, target, options) {
			e.preventDefault();
			this.onTriggerClick();
		}, this);

		this.on('collapse', function(e, target, options) {
			Ext.getDoc().un('mouseup', this.collapseIf, this);
		}, this, true);

		this.on('expand', function(e, target, options) {
			Ext.getDoc().on('mouseup', this.collapseIf, this);
		}, this, true);
	},

	clearSearchHistory : function() {
		this.lastSelectedIndex = 0;
		this.lastSearchTerm = false;
	},

	selectFirst : function() {
		this.focusAndSelect(this.store.data.first());
	},

	selectLast : function() {
		this.focusAndSelect(this.store.data.last());
	},

	selectPrevPage : function() {
		if( !this.rowHeight ) {
			return;
		}
		var index = Math.max(this.selectedIndex-this.rowsPerPage, 0);
		this.focusAndSelect(this.store.getAt(index));
	},

	selectNextPage : function() {
		if( !this.rowHeight ) {
			return;
		}
		var index = Math.min(this.selectedIndex+this.rowsPerPage, this.store.getCount() - 1);
		this.focusAndSelect(this.store.getAt(index));
	},

	search : function(field, value, startIndex) {
		field = field || this.displayField;
		this.lastSearchTerm = value;
		var index = this.store.find.apply(this.store, arguments);
		if( index !== -1 ) {
			this.focusAndSelect(index);
		}
	},

	focusAndSelect : function(record) {
		var index = typeof record === 'number' ? record : this.store.indexOf(record);
		this.select(index, this.isExpanded());
		this.onSelect(this.store.getAt(record), index, this.isExpanded());
	},

	calcRowsPerPage : function() {
		if( this.store.getCount() ) {
			this.rowHeight = Ext.fly(this.view.getNode(0)).getHeight();
			this.rowsPerPage = this.maxHeight / this.rowHeight;
		} else {
			this.rowHeight = false;
		}
	}

});
/****************************************************************************************/
/**
 * @author Shea Frederick
 */

Ext.namespace('Ext.ux');
 
/**
 *
 * @class GMapPanel
 * @extends Ext.Panel
 */
Ext.ux.GMapPanel = Ext.extend(Ext.Panel, {
    initComponent : function(){
        
        var defConfig = {
        	plain: true,
        	zoomLevel: 3,
        	yaw: 180,
        	pitch: 0,
        	zoom: 0,
        	gmapType: 'map',
            border: false
        }
        
        Ext.applyIf(this,defConfig);
        
		Ext.ux.GMapPanel.superclass.initComponent.call(this);        

    },
    afterRender : function(){
        
        var wh = this.ownerCt.getSize();
        Ext.applyIf(this, wh);
        
		Ext.ux.GMapPanel.superclass.afterRender.call(this);	
        
		if (this.gmapType === 'map'){
			this.gmap = new GMap2(this.body.dom);
		}
		
		if (this.gmapType === 'panorama'){
			this.gmap = new GStreetviewPanorama(this.body.dom);
		}
		
		if (typeof this.addControl === 'object' && this.gmapType === 'map') {
			this.gmap.addControl(this.addControl);
		}
		
		if (typeof this.setCenter === 'object') {
			if (typeof this.setCenter.geoCodeAddr === 'string'){
				this.geoCodeLookup(this.setCenter.geoCodeAddr);
			}else{
				if (this.gmapType === 'map'){
					var point = new GLatLng(this.setCenter.lat,this.setCenter['long']);
					this.gmap.setCenter(point, this.zoomLevel);	
				}
				if (typeof this.setCenter.marker === 'object' && typeof point === 'object'){
					this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear);
				}
			}
			if (this.gmapType === 'panorama'){
				this.gmap.setLocationAndPOV(new GLatLng(this.setCenter.lat,this.setCenter['long']), {yaw: this.yaw, pitch: this.pitch, zoom: this.zoom});
			}
		}
		
        var dt = new Ext.util.DelayedTask();
        dt.delay(300, function(){
            this.addMarkers(this.markers);
        }, this);

	},
    onResize : function(w, h){

        if (typeof this.gmap == 'object') {
            this.gmap.checkResize();
        }
		
		Ext.ux.GMapPanel.superclass.onResize.call(this, w, h);

    },
    setSize : function(width, height, animate){
        
        if (typeof this.gmap == 'object') {
            this.gmap.checkResize();
        }
		
		Ext.ux.GMapPanel.superclass.setSize.call(this, width, height, animate);
        
    },
	getMap: function(){
		
		return this.gmap;
		
	},
	addMarkers: function(markers) {
		
		if (Ext.isArray(markers)){
			for (var i = 0; i < markers.length; i++) {
				var mkr_point = new GLatLng(markers[i].lat,markers[i]['long']);
				this.addMarker(mkr_point,markers[i].marker,false,markers[i].setCenter);
			}
		}
		
	},
	addMarker: function(point, marker, clear, center){
		
		Ext.applyIf(marker,G_DEFAULT_ICON);

		if (clear === true){
			this.gmap.clearOverlays();
		}
        if (center === true) {
            this.gmap.setCenter(point, this.zoomLevel);
        }
        
		var mark = new GMarker(point,marker);
   		this.gmap.addOverlay(mark);

	},
	geoCodeLookup : function(addr) {
		
		this.geocoder = new GClientGeocoder();
		this.geocoder.getLocations(addr, this.addAddressToMap.createDelegate(this));
		
	},
    addAddressToMap : function(response) {
		
		if (!response || response.Status.code != 200) {
			Ext.MessageBox.alert('Error', 'Code '+response.Status.code+' Error Returned');
  		} else {
    		place = response.Placemark[0];
			addressinfo = place.AddressDetails;
			accuracy = addressinfo.Accuracy;
			if (accuracy === 0) {
				Ext.MessageBox.alert('Unable to Locate Address', 'Unable to Locate the Address you provided');
			}else{
				if (accuracy < 7) {
					Ext.MessageBox.alert('Address Accuracy', 'The address provided has a low accuracy.<br><br>Level '+accuracy+' Accuracy (8 = Exact Match, 1 = Vague Match)');
				}else{
	        		point = new GLatLng(place.Point.coordinates[1], place.Point.coordinates[0]);
					if (typeof this.setCenter.marker === 'object' && typeof point === 'object'){
						this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear,true);
					}
				}
			}
	  	}
		
	}
 
});

Ext.reg('gmappanel',Ext.ux.GMapPanel);
/****************************************************************************************/
/**
 * RowActions plugin for Ext grid
 *
 * Contains renderer for icons and fires events when an icon is clicked
 *
 * @author    Ing. Jozef Sakáloš
 * @date      22. March 2008
 * @version   $Id: Ext.ux.grid.RowActions.js 150 2008-04-08 21:50:58Z jozo $
 *
 * @license Ext.ux.grid.RowActions is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

Ext.ns('Ext.ux.grid');

/**
 * @class Ext.ux.grid.RowActions
 * @extends Ext.util.Observable
 *
 * CSS rules from Ext.ux.RowActions.css are mandatory
 *
 * Important general information: Actions are identified by iconCls. Wherever an <i>action</i>
 * is referenced (event argument, callback argument), the iconCls of clicked icon is used.
 * In another words, action identifier === iconCls.
 *
 * Creates new RowActions plugin
 * @constructor
 * @param {Object} config The config object
 */
Ext.ux.grid.RowActions = function(config) {
	Ext.apply(this, config);

	// {{{
	this.addEvents(
		/**
		 * @event beforeaction
		 * Fires before action event. Return false to cancel the subsequent action event.
		 * @param {Ext.grid.GridPanel} grid
		 * @param {Ext.data.Record} record Record corresponding to row clicked
		 * @param {String} action Identifies the action icon clicked. Equals to icon css class name.
		 * @param {Integer} rowIndex Index of clicked grid row
		 * @param {Integer} colIndex Index of clicked grid column that contains all action icons
		 */
		 'beforeaction'
		/**
		 * @event action
		 * Fires when icon is clicked
		 * @param {Ext.grid.GridPanel} grid
		 * @param {Ext.data.Record} record Record corresponding to row clicked
		 * @param {String} action Identifies the action icon clicked. Equals to icon css class name.
		 * @param {Integer} rowIndex Index of clicked grid row
		 * @param {Integer} colIndex Index of clicked grid column that contains all action icons
		 */
		,'action'
		/**
		 * @event beforegroupaction
		 * Fires before group action event. Return false to cancel the subsequent groupaction event.
		 * @param {Ext.grid.GridPanel} grid
		 * @param {Array} records Array of records in this group
		 * @param {String} action Identifies the action icon clicked. Equals to icon css class name.
		 * @param {String} groupId Identifies the group clicked
		 */
		,'beforegroupaction'
		/**
		 * @event groupaction
		 * Fires when icon in a group header is clicked
		 * @param {Ext.grid.GridPanel} grid
		 * @param {Array} records Array of records in this group
		 * @param {String} action Identifies the action icon clicked. Equals to icon css class name.
		 * @param {String} groupId Identifies the group clicked
		 */
		,'groupaction'
	);
	// }}}

	// call parent
	Ext.ux.grid.RowActions.superclass.constructor.call(this);
};

Ext.extend(Ext.ux.grid.RowActions, Ext.util.Observable, {

	// configuration options
	// {{{
	/**
	 * @cfg {Array} actions Mandatory. Array of action configuration objects. The following
	 * configuration options of action are recognized:
	 *
	 * - @cfg {Function} callback Optional. Function to call if the action icon is clicked.
	 *   This function is called with same signature as action event and in its original scope.
	 *   If you need to call it in different scope or with another signature use 
	 *   createCallback or createDelegate functions. Works for statically defined actions. Use
	 *   callbacks configuration options for store bound actions.
	 *
	 * - @cfg {Function} cb Shortcut for callback.
	 *
	 * - @cfg {String} iconIndex Optional, however either iconIndex or iconCls must be
	 *   configured. Field name of the field of the grid store record that contains
	 *   css class of the icon to show. If configured, shown icons can vary depending
	 *   of the value of this field.
	 *
	 * - @cfg {String} iconCls. css class of the icon to show. It is ignored if iconIndex is
	 *   configured. Use this if you want static icons that are not base on the values in the record.
	 *
	 * - @cfg {Boolean} hide Optional. True to hide this action while still have a space in 
	 *   the grid column allocated to it. IMO, it doesn't make too much sense, use hideIndex instead.
	 *
	 * - @cfg (string} hideIndex Optional. Field name of the field of the grid store record that
	 *   contains hide flag (falsie [null, '', 0, false, undefined] to show, anything else to hide).
	 *
	 * - @cfg {String} qtipIndex Optional. Field name of the field of the grid store record that 
	 *   contains tooltip text. If configured, the tooltip texts are taken from the store.
	 *
	 * - @cfg {String} tooltip Optional. Tooltip text to use as icon tooltip. It is ignored if 
	 *   qtipIndex is configured. Use this if you want static tooltips that are not taken from the store.
	 *
	 * - @cfg {String} qtip Synonym for tooltip
	 *
	 * - @cfg {String} textIndex Optional. Field name of the field of the grids store record
	 *   that contains text to display on the right side of the icon. If configured, the text
	 *   shown is taken from record.
	 *
	 * - @cfg {String} text Optional. Text to display on the right side of the icon. Use this
	 *   if you want static text that are not taken from record. Ignored if textIndex is set.
	 *
	 * - @cfg {String} style Optional. Style to apply to action icon container.
	 */

	/**
	 * @cfg {String} actionEvnet Event to trigger actions, e.g. click, dblclick, mouseover (defaults to 'click')
	 */
	 actionEvent:'click'

	/**
	 * @cfg {Boolean} autoWidth true to calculate field width for iconic actions only.
	 */
	,autoWidth:true

	/**
	 * @cfg {Array} groupActions Array of action to use for group headers of grouping grids.
	 * These actions support static icons, texts and tooltips same way as actions. There is one
	 * more action config recognized:
	 * - @cfg {String} align Set it to 'left' to place action icon next to the group header text.
	 *   (defaults to undefined = icons are placed at the right side of the group header.
	 */

	/**
	 * @cfg {Object} callbacks iconCls keyed object that contains callback functions. For example:
	 * callbacks:{
	 *      'icon-open':function(...) {...}
	 *     ,'icon-save':function(...) {...}
	 * }
	 */

	/**
	 * @cfg {String} header Actions column header
	 */
	,header:''

	/**
	 * @cfg {Boolean} menuDisabled No sense to display header menu for this column
	 */
	,menuDisabled:true

	/**
	 * @cfg {Boolean} sortable Usually it has no sense to sort by this column
	 */
	,sortable:false

	/**
	 * @cfg {String} tplGroup Template for group actions
	 * @private
	 */
	,tplGroup:
		 '<tpl for="actions">'
		+'<div class="ux-grow-action-item<tpl if="\'right\'===align"> ux-action-right</tpl> '
		+'{cls}" style="{style}" qtip="{qtip}">{text}</div>'
		+'</tpl>'

	/**
	 * @cfg {String} tplRow Template for row actions
	 * @private
	 */
	,tplRow:
		 '<div class="ux-row-action">'
		+'<tpl for="actions">'
		+'<div class="ux-row-action-item {cls} <tpl if="text">'
		+'ux-row-action-text</tpl>" style="{hide}{style}" qtip="{qtip}">'
		+'<tpl if="text"><span qtip="{qtip}">{text}</span></tpl></div>'
		+'</tpl>'
		+'</div>'

	/**
	 * @private {Number} widthIntercept constant used for auto-width calculation
	 */
	,widthIntercept:4

	/**
	 * @private {Number} widthSlope constant used for auto-width calculation
	 */
	,widthSlope:21
	// }}}

	// methods
	// {{{
	/**
	 * Init function
	 * @param {Ext.grid.GridPanel} grid Grid this plugin is in
	 */
	,init:function(grid) {
		this.grid = grid;
		
		// {{{
		// setup template
		if(!this.tpl) {
			this.tpl = this.processActions(this.actions);

		} // eo template setup
		// }}}

		// calculate width
		if(this.autoWidth) {
			this.width =  this.widthSlope * this.actions.length + this.widthIntercept;
			this.fixed = true;
		}

		// body click handler
		var view = grid.getView();
		var cfg = {scope:this};
		cfg[this.actionEvent] = this.onClick;
		grid.on({
			render:{scope:this, fn:function() {
				view.mainBody.on(cfg);
			}}
		});

		// setup renderer
		if(!this.renderer) {
			this.renderer = function(value, cell, record, row, col, store) {
				cell.css += (cell.css ? ' ' : '') + 'ux-row-action-cell';
				return this.tpl.apply(this.getData(value, cell, record, row, col, store));
			}.createDelegate(this);
		}

		// actions in grouping grids support
		if(view.groupTextTpl && this.groupActions) {
			view.interceptMouse = view.interceptMouse.createInterceptor(function(e) {
				if(e.getTarget('.ux-grow-action-item')) {
					return false;
				}
			});
			view.groupTextTpl = 
				 '<div class="ux-grow-action-text">' + view.groupTextTpl +'</div>' 
				+this.processActions(this.groupActions, this.tplGroup).apply()
			;
		}
		
	} // eo function init
	// }}}
	// {{{
	/**
	 * Returns data to apply to template. Override this if needed.
	 * @param {Mixed} value 
	 * @param {Object} cell object to set some attributes of the grid cell
	 * @param {Ext.data.Record} record from which the data is extracted
	 * @param {Number} row row index
	 * @param {Number} col col index
	 * @param {Ext.data.Store} store object from which the record is extracted
	 * @returns {Object} data to apply to template
	 */
	,getData:function(value, cell, record, row, col, store) {
		return record.data || {};
	} // eo function getData
	// }}}
	// {{{
	/**
	 * Processes actions configs and returns template.
	 * @param {Array} actions
	 * @param {String} template Optional. Template to use for one action item.
	 * @return {String}
	 * @private
	 */
	,processActions:function(actions, template) {
		var acts = [];

		// actions loop
		Ext.each(actions, function(a, i) {
			// save callback
			if(a.iconCls && 'function' === typeof (a.callback || a.cb)) {
				this.callbacks = this.callbacks || {};
				this.callbacks[a.iconCls] = a.callback || a.cb;
			}

			// data for intermediate template
			var o = {
				 cls:a.iconIndex ? '{' + a.iconIndex + '}' : (a.iconCls ? a.iconCls : '')
				,qtip:a.qtipIndex ? '{' + a.qtipIndex + '}' : (a.tooltip || a.qtip ? a.tooltip || a.qtip : '')
				,text:a.textIndex ? '{' + a.textIndex + '}' : (a.text ? a.text : '')
				,hide:a.hideIndex ? '<tpl if="' + a.hideIndex + '">visibility:hidden;</tpl>' : (a.hide ? 'visibility:hidden;' : '')
				,align:a.align || 'right'
				,style:a.style ? a.style : ''
			};
			acts.push(o);

		}, this); // eo actions loop

		var xt = new Ext.XTemplate(template || this.tplRow);
		return new Ext.XTemplate(xt.apply({actions:acts}));

	} // eo function processActions
	// }}}
	// {{{
	/**
	 * Grid body actionEvent event handler
	 * @private
	 */
	,onClick:function(e, target) {

		var view = this.grid.getView();
		var action = false;

		// handle row action click
		var row = e.getTarget('.x-grid3-row');
		var col = view.findCellIndex(target.parentNode.parentNode);

		var t = e.getTarget('.ux-row-action-item');
		if(t) {
			action = t.className.replace(/ux-row-action-item /, '');
			if(action) {
				action = action.replace(/ ux-row-action-text/, '');
				action = action.trim();
			}
		}
		if(false !== row && false !== col && false !== action) {
			var record = this.grid.store.getAt(row.rowIndex);

			// call callback if any
			if(this.callbacks && 'function' === typeof this.callbacks[action]) {
				this.callbacks[action](this.grid, record, action, row.rowIndex, col);
			}

			// fire events
			if(true !== this.eventsSuspended && false === this.fireEvent('beforeaction', this.grid, record, action, row.rowIndex, col)) {
				return;
			}
			else if(true !== this.eventsSuspended) {
				this.fireEvent('action', this.grid, record, action, row.rowIndex, col);
			}

		}

		// handle group action click
		t = e.getTarget('.ux-grow-action-item');
		if(t) {
			// get groupId
			var group = view.findGroup(target);
			var groupId = group ? group.id.replace(/ext-gen[0-9]+-gp-/, '') : null;

			// get matching records
			var records;
			if(groupId) {
				var re = new RegExp(groupId);
				records = this.grid.store.queryBy(function(r) {
					return r._groupId.match(re);
				});
				records = records ? records.items : [];
			}
			action = t.className.replace(/ux-grow-action-item (ux-action-right )*/, '');

			// call callback if any
			if('function' === typeof this.callbacks[action]) {
				this.callbacks[action](this.grid, records, action, groupId);
			}

			// fire events
			if(true !== this.eventsSuspended && false === this.fireEvent('beforegroupaction', this.grid, records, action, groupId)) {
				return false;
			}
			this.fireEvent('groupaction', this.grid, records, action, groupId);
		}
	} // eo function onClick
	// }}}

});

// registre xtype
Ext.reg('rowactions', Ext.ux.grid.RowActions);

/**
 * Ext.ux.HttpProvider extension
 *
 * @author	Ing. Jozef Sakalos
 * @copyright (c) 2008, Ing. Jozef Sakalos
 * @version $Id: Ext.ux.HttpProvider.js 82 2008-03-21 00:17:40Z jozo $
 *
 * @license Ext.ux.HttpProvider is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

/*global Ext, console */

// {{{
// Define clone function if it is not already defined
if('function' !== Ext.type(Ext.ux.clone)) {
	Ext.ux.clone = function(o) {
		if('object' !== typeof o) {
			return o;
		}
		var c = 'function' === typeof o.pop ? [] : {};
		var p, v;
		for(p in o) {
			if(o.hasOwnProperty(p)) {
				v = o[p];
				if('object' === typeof v) {
					c[p] = Ext.ux.clone(v);
				}
				else {
					c[p] = v;
				}
			}
		}
		return c;
	};
} // eo clone
// }}}

/**
 * @class Ext.ux.HttpProvider
 * @extends Ext.state.Provider
 * @constructor
 * @param {Object} config Configuration object
 */
// {{{
Ext.ux.HttpProvider = function(config) {

	this.addEvents(
		/**
		 * @event readsuccess
		 * Fires after state has been successfully received from server and restored
		 * @param {HttpProvider} this
		 */
		 'readsuccess'
		/**
		 * @event readfailure
		 * Fires in the case of an error when attempting to read state from server
		 * @param {HttpProvider} this
		 */
		,'readfailure'
		/**
		 * @event savesuccess
		 * Fires after the state has been successfully saved to server
		 * @param {HttpProvider} this
		 */
		,'savesuccess'
		/**
		 * @event savefailure
		 * Fires in the case of an error when attempting to save state to the server
		 * @param {HttpProvider} this
		 */
		,'savefailure'
	);

	// call parent 
	Ext.ux.HttpProvider.superclass.constructor.call(this);

	Ext.apply(this, config, {
		// defaults
		 delay:750 // buffer changes for 750 ms
		,dirty:false
		,started:false
		,autoStart:true
		,autoRead:true
		,user:'user'
		,id:1
		,session:'session'
		,logFailure:false
		,logSuccess:false
		,queue:[]
		,url:'.'
		,readUrl:undefined
		,saveUrl:undefined
		,method:'post'
		,saveBaseParams:{}
		,readBaseParams:{}
		,paramNames:{
			 id:'id'
			,name:'name'
			,value:'value'
			,user:'user'
			,session:'session'
			,data:'data'
		}
	}); // eo apply

	if(this.autoRead) {
		this.readState();
	}

	this.dt = new Ext.util.DelayedTask(this.submitState, this);
	if(this.autoStart) {
		this.start();
	}
}; // eo constructor
// }}}

Ext.extend(Ext.ux.HttpProvider, Ext.state.Provider, {

	// localizable texts
	 saveSuccessText:'Save Success'
	,saveFailureText:'Save Failure'
	,readSuccessText:'Read Success'
	,readFailureText:'Read Failure'
	,dataErrorText:'Data Error'

	// {{{
	/**
	 * Initializes state from the passed state object or array.
	 * This method can be called early during page load having the state Array/Object
	 * retrieved from database by server.
	 * @param {Array/Object} state State to initialize state manager with
	 */
	,initState:function(state) {
		if(state instanceof Array) {
			Ext.each(state, function(item) {
				this.state[item.name] = this.decodeValue(item.value);
			}, this);
		}
		else {
			this.state = state ? state : {};
		}
	} // eo function initState
	// }}}
	// {{{
	/**
	 * Sets the passed state variable name to the passed value and queues the change
	 * @param {String} name Name of the state variable
	 * @param {Mixed} value Value of the state variable
	 */
	,set:function(name, value) {
		if(!name) {
			return;
		}

		this.queueChange(name, value);

	} // eo function set
	// }}}
	// {{{
	/**
	 * Starts submitting state changes to server
	 */
	,start:function() {
		this.dt.delay(this.delay);
		this.started = true;
	} // eo function start
	// }}}
	// {{{
	/**
	 * Stops submitting state changes
	 */
	,stop:function() {
		this.dt.cancel();
		this.started = false;
	} // eo function stop
	// }}}
	// {{{
	/**
	 * private, queues the state change if state has changed
	 */
	,queueChange:function(name, value) {
		var changed = undefined === this.state[name] || this.state[name] !== value;
		var o = {};
		var i;
		var found = false;
		if(changed) {
			o[this.paramNames.name] = name;
			o[this.paramNames.value] = this.encodeValue(value);
			for(i = 0; i < this.queue.length; i++) {
				if(this.queue[i].name === o.name) {
					this.queue[i] = o;
					found = true;
				}
			}
			if(false === found) {
				this.queue.push(o);
			}
			this.dirty = true;
		}
		return changed;
	} // eo function bufferChange
	// }}}
	// {{{
	/**
	 * private, submits state to server by asynchronous Ajax request
	 */
	,submitState:function() {
		if(!this.dirty) {
			this.dt.delay(this.delay);
			return;
		}
		this.dt.cancel();

		var o = {
			 url:this.saveUrl || this.url
			,method:this.method
			,scope:this
			,success:this.onSaveSuccess
			,failure:this.onSaveFailure
			,queue:Ext.ux.clone(this.queue)
			,params:{}
		};

		var params = Ext.apply({}, this.saveBaseParams);
		params[this.paramNames.id] = this.id;
		params[this.paramNames.user] = this.user;
		params[this.paramNames.session] = this.session;
		params[this.paramNames.data] = Ext.encode(o.queue);

		Ext.apply(o.params, params);

		// be optimistic
		this.dirty = false;

		Ext.Ajax.request(o);
	} // eo function submitState
	// }}}
	// {{{
	/**
	 * Clears the state variable
	 * @param {String} name Name of the variable to clear
	 */
	,clear:function(name) {
		this.set(name, undefined);
	} // eo function clear
	// }}}
	// {{{
	/**
	 * private, save success callback
	 */
	,onSaveSuccess:function(response, options) {
		if(this.started) {
			this.start();
		}
		var o = {};
		try {o = Ext.decode(response.responseText);}
		catch(e) {
			if(true === this.logFailure) {
				this.log(this.saveFailureText, e, response);
			}
			this.dirty = true;
			return;
		}
		if(true !== o.success) {
			if(true === this.logFailure) {
				this.log(this.saveFailureText, o, response);
			}
			this.dirty = true;
		}
		else {
			Ext.each(options.queue, function(item) {
				var name = item[this.paramNames.name];
				var value = this.decodeValue(item[this.paramNames.value]);

				if(undefined === value || null === value) {
					Ext.ux.HttpProvider.superclass.clear.call(this, name);
				}
				else {
					// parent sets value and fires event
					Ext.ux.HttpProvider.superclass.set.call(this, name, value);
				}
			}, this);
			if(false === this.dirty) {
				this.queue = [];
			}
			else {
				var i, j, found;
				for(i = 0; i < options.queue.length; i++) {
					found = false;
					for(j = 0; j < this.queue.length; j++) {
						if(options.queue[i].name === this.queue[j].name) {
							found = true;
							break;
						}
					}
					if(true === found && this.encodeValue(options.queue[i].value) === this.encodeValue(this.queue[j].value)) {
						delete(this.queue[j]);
					}
				}
			}
			if(true === this.logSuccess) {
				this.log(this.saveSuccessText, o, response);
			}
			this.fireEvent('savesuccess', this);
		}
	} // eo function onSaveSuccess
	// }}}
	// {{{
	/**
	 * private, save failure callback
	 */
	,onSaveFailure:function(response, options) {
		if(true === this.logFailure) {
			this.log(this.saveFailureText, response);
		}
		if(this.started) {
			this.start();
		}
		this.dirty = true;
		this.fireEvent('savefailure', this);
	} // eo function onSaveFailure
	// }}}
	// {{{
	/**
	 * private, read state callback
	 */
	,onReadFailure:function(response, options) {
		if(true === this.logFailure) {
			this.log(this.readFailureText, response);
		}
		this.fireEvent('readfailure', this);

	} // eo function onReadFailure
	// }}}
	// {{{
	/**
	 * private, read success callback
	 */
	,onReadSuccess:function(response, options) {
		var o = {}, data;
		try {o = Ext.decode(response.responseText);}
		catch(e) {
			if(true === this.logFailure) {
				this.log(this.readFailureText, e, response);
			}
			return;
		}
		if(true !== o.success) {
			if(true === this.logFailure) {
				this.log(this.readFailureText, o, response);
			}
		}
		else {
			try {data = Ext.decode(o[this.paramNames.data]);}
			catch(ex) {
				if(true === this.logFailure) {
					this.log(this.dataErrorText, o, response);
				}
				return;
			}
			if(!(data instanceof Array) && true === this.logFailure) {
				this.log(this.dataErrorText, data, response);
				return;
			}
			Ext.each(data, function(item) {
				this.state[item[this.paramNames.name]] = this.decodeValue(item[this.paramNames.value]);
			}, this);
			this.queue = [];
			this.dirty = false;
			if(true === this.logSuccess) {
				this.log(this.readSuccessText, data, response);
			}
			this.fireEvent('readsuccess', this);
		}
	} // eo function onReadSuccess
	// }}}
	// {{{
	/**
	 * Reads saved state from server by sending asynchronous Ajax request and processing the response
	 */
	,readState:function() {
		var o = {
			 url:this.readUrl || this.url
			,method:this.method
			,scope:this
			,success:this.onReadSuccess
			,failure:this.onReadFailure
			,params:{}
		};

		var params = Ext.apply({}, this.readBaseParams);
		params[this.paramNames.id] = this.id;
		params[this.paramNames.user] = this.user;
		params[this.paramNames.session] = this.session;

		Ext.apply(o.params, params);
		Ext.Ajax.request(o);
	} // eo function readState
	// }}}
	// {{{
	/**
	 * private, logs errors or successes
	 */
	,log:function() {
		if(console) {
			console.log.apply(console, arguments);
		}
	} // eo log
	// }}}

}); // eo extend
/****************************************************************************************/
/**
 * Ext.ux.FileUploader
 *
 * @author  Ing. Jozef Sakáloš
 * @version $Id: Ext.ux.FileUploader.js 302 2008-08-03 20:57:33Z jozo $
 * @date    15. March 2008
 *
 * @license Ext.ux.FileUploader is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

/*global Ext */

/**
 * @class Ext.ux.FileUploader
 * @extends Ext.util.Observable
 * @constructor
 */
Ext.ux.FileUploader = function(config) {
	Ext.apply(this, config);

	// call parent
	Ext.ux.FileUploader.superclass.constructor.apply(this, arguments);

	// add events
	// {{{
	this.addEvents(
		/**
		 * @event beforeallstart
		 * Fires before an upload (of all files) is started. Return false to cancel the event.
		 * @param {Ext.ux.FileUploader} this
		 */
		 'beforeallstart'
		/**
		 * @event allfinished
		 * Fires after upload (of all files) is finished
		 * @param {Ext.ux.FileUploader} this
		 */
		,'allfinished'
		/**
		 * @event beforefilestart
		 * Fires before the file upload is started. Return false to cancel the event.
		 * Fires only when singleUpload = false
		 * @param {Ext.ux.FileUploader} this
		 * @param {Ext.data.Record} record upload of which is being started
		 */
		,'beforefilestart'
		/**
		 * @event filefinished
		 * Fires when file finished uploading.
		 * Fires only when singleUpload = false
		 * @param {Ext.ux.FileUploader} this
		 * @param {Ext.data.Record} record upload of which has finished
		 */
		,'filefinished'
		/**
		 * @event progress
		 * Fires when progress has been updated
		 * @param {Ext.ux.FileUploader} this
		 * @param {Object} data Progress data object
		 * @param {Ext.data.Record} record Only if singleUpload = false
		 */
		,'progress'
	);
	// }}}

}; // eo constructor

Ext.extend(Ext.ux.FileUploader, Ext.util.Observable, {
	
	// configuration options
	// {{{
	/**
	 * @cfg {Object} baseParams baseParams are sent to server in each request.
	 */
	 baseParams:{cmd:'upload',dir:'.'}

	/**
	 * @cfg {Boolean} concurrent true to start all requests upon upload start, false to start
	 * the next request only if previous one has been completed (or failed). Applicable only if
	 * singleUpload = false
	 */
	,concurrent:true

	/**
	 * @cfg {Boolean} enableProgress true to enable querying server for progress information
	 */
	,enableProgress:true

	/**
	 * @cfg {String} jsonErrorText Text to use for json error
	 */
	,jsonErrorText:'Cannot decode JSON object'

	/**
	 * @cfg {Number} Maximum client file size in bytes
	 */
	,maxFileSize:524288

	/**
	 * @cfg {String} progressIdName Name to give hidden field for upload progress identificator
	 */
	,progressIdName:'UPLOAD_IDENTIFIER'

	/**
	 * @cfg {Number} progressInterval How often (in ms) is progress requested from server
	 */
	,progressInterval:2000

	/**
	 * @cfg {String} progressUrl URL to request upload progress from
	 */
	,progressUrl:'/categories/progress'

	/**
	 * @cfg {Object} progressMap Mapping of received progress fields to store progress fields
	 */
	,progressMap:{
		 bytes_total:'bytesTotal'
		,bytes_uploaded:'bytesUploaded'
		,est_sec:'estSec'
		,files_uploaded:'filesUploaded'
		,speed_average:'speedAverage'
		,speed_last:'speedLast'
		,time_last:'timeLast'
		,time_start:'timeStart'
	}
	/**
	 * @cfg {Boolean} singleUpload true to upload files in one form, false to upload one by one
	 */
	,singleUpload:false
	
	/**
	 * @cfg {Ext.data.Store} store Mandatory. Store that holds files to upload
	 */

	/**
	 * @cfg {String} unknownErrorText Text to use for unknow error
	 */
	,unknownErrorText:'Unknown error'

	/**
	 * @cfg {String} url Mandatory. URL to upload to
	 */

	// }}}

	// private
	// {{{
	/**
	 * uploads in progress count
	 * @private
	 */
	,upCount:0
	// }}}

	// methods
	// {{{
	/**
	 * creates form to use for upload.
	 * @private
	 * @return {Ext.Element} form
	 */
	,createForm:function(record) {
		var progressId = parseInt(Math.random() * 1e10, 10);
		var form = Ext.getBody().createChild({
			 tag:'form'
			,action:this.url
			,method:'post'
			,cls:'x-hidden'
			,id:'upload'//Ext.id()
			,cn:[{
				 tag:'input'
				,type:'hidden'
				,name:'APC_UPLOAD_PROGRESS'
				,value:progressId
			},{
				 tag:'input'
				,type:'hidden'
				,name:this.progressIdName
				,value:progressId
			},{
				 tag:'input'
				,type:'hidden'
				,name:'MAX_FILE_SIZE'
				,value:this.maxFileSize
			}]
		});
		if(record) {
			record.set('form', form);
			record.set('progressId', progressId);
		}
		else {
			this.progressId = progressId;
		}
		return form;

	} // eo function createForm
	// }}}
	// {{{
	,deleteForm:function(form, record) {
		form.remove();
		if(record) {
			record.set('form', null);
		}
	} // eo function deleteForm
	// }}}
	// {{{
	/**
	 * Fires event(s) on upload finish/error
	 * @private
	 */
	,fireFinishEvents:function(options) {
		if(true !== this.eventsSuspended && !this.singleUpload) {
			this.fireEvent('filefinished', this, options && options.record);
		}
		if(true !== this.eventsSuspended && 0 === this.upCount) {
			this.stopProgress();
			this.fireEvent('allfinished', this);
		}
	} // eo function fireFinishEvents
	// }}}
	// {{{
	/**
	 * Geg the iframe identified by record
	 * @private
	 * @param {Ext.data.Record} record
	 * @return {Ext.Element} iframe or null if not found
	 */
	,getIframe:function(record) {
		var iframe = null;
		var form = record.get('form');
		if(form && form.dom && form.dom.target) {
			iframe = Ext.get(form.dom.target);
		}
		return iframe;
	} // eo function getIframe
	// }}}
	// {{{
	/**
	 * returns options for Ajax upload request
	 * @private
	 * @param {Ext.data.Record} record
	 * @param {Object} params params to add
	 */
	,getOptions:function(record, params) {
		var o = {
			 url:this.url
			,method:'post'
			,isUpload:true
			,scope:this
			,callback:this.uploadCallback
			,record:record
			,params:this.getParams(record, params)
		};
		return o;
	} // eo function getOptions
	// }}}
	// {{{
	/**
	 * get params to use for request
	 * @private
	 * @return {Object} params
	 */
	,getParams:function(record, params) {
		var p = {path:this.path};
		Ext.apply(p, this.baseParams || {}, params || {});
		return p;
	}
	// }}}
	// {{{
	/**
	 * processes success response
	 * @private
	 * @param {Object} options options the request was called with
	 * @param {Object} response request response object
	 * @param {Object} o decoded response.responseText
	 */
	,processSuccess:function(options, response, o) {
		var record = false;

		// all files uploadded ok
		if(this.singleUpload) {
			this.store.each(function(r) {
				r.set('state', 'done');
				r.set('error', '');
				r.commit();
			});
		}
		else {
			record = options.record;
			record.set('state', 'done');
			record.set('error', '');
			record.commit();
		}

		this.deleteForm(options.form, record);

	} // eo processSuccess
	// }}}
	// {{{
	/**
	 * processes failure response
	 * @private
	 * @param {Object} options options the request was called with
	 * @param {Object} response request response object
	 * @param {String/Object} error Error text or JSON decoded object. Optional.
	 */
	,processFailure:function(options, response, error) {
		var record = options.record;
		var records;

		// singleUpload - all files uploaded in one form
		if(this.singleUpload) {
			// some files may have been successful
			records = this.store.queryBy(function(r){
				var state = r.get('state');
				return 'done' !== state && 'uploading' !== state;
			});
			records.each(function(record) {
				var e = error.errors ? error.errors[record.id] : this.unknownErrorText;
				if(e) {
					record.set('state', 'failed');
					record.set('error', e);
					Ext.getBody().appendChild(record.get('input'));
				}
				else {
					record.set('state', 'done');
					record.set('error', '');
				}
				record.commit();
			}, this);

			this.deleteForm(options.form);
		}
		// multipleUpload - each file uploaded in it's own form
		else {
			if(error && 'object' === Ext.type(error)) {
				record.set('error', error.errors && error.errors[record.id] ? error.errors[record.id] : this.unknownErrorText);
			}
			else if(error) {
				record.set('error', error);
			}
			else if(response && response.responseText) {
				record.set('error', response.responseText);
			}
			else {
				record.set('error', this.unknownErrorText);
			}
			record.set('state', 'failed');
			record.commit();
		}
	} // eof processFailure
	// }}}
	// {{{
	/**
	 * Delayed task callback
	 */
	,requestProgress:function() {
		var records, p;
		var o = {
			 url:this.progressUrl
			,method:'post'
			,params:{}
			,scope:this
			,callback:function(options, success, response) {
				var o;
				if(true !== success) {
					return;
				}
				try {
					o = Ext.decode(response.responseText);
				}
				catch(e) {
					return;
				}
				if('object' !== Ext.type(o) || true !== o.success) {
					return;
				}

				if(this.singleUpload) {
					this.progress = {};
					for(p in o) {
						if(this.progressMap[p]) {
							this.progress[this.progressMap[p]] = parseInt(o[p], 10);
						}
					}
					if(true !== this.eventsSuspended) {
						this.fireEvent('progress', this, this.progress);
					}

				}
				else {
					for(p in o) {
						if(this.progressMap[p] && options.record) {
							options.record.set(this.progressMap[p], parseInt(o[p], 10));
						}
					}
					if(options.record) {
						options.record.commit();
						if(true !== this.eventsSuspended) {
							this.fireEvent('progress', this, options.record.data, options.record);
						}
					}
				}
				this.progressTask.delay(this.progressInterval);
			}
		};
		if(this.singleUpload) {
			o.params[this.progressIdName] = this.progressId;
			o.params.APC_UPLOAD_PROGRESS = this.progressId;
			Ext.Ajax.request(o);
		}
		else {
			records = this.store.query('state', 'uploading');
			records.each(function(r) {
				o.params[this.progressIdName] = r.get('progressId');
				o.params.APC_UPLOAD_PROGRESS = o.params[this.progressIdName];
				o.record = r;
				(function() {
					Ext.Ajax.request(o);
				}).defer(250);
			}, this);
		}
	} // eo function requestProgress
	// }}}
	// {{{
	/**
	 * path setter
	 * @private
	 */
	,setPath:function(path) {
		this.path = path;
	} // eo setPath
	// }}}
	// {{{
	/**
	 * url setter
	 * @private
	 */
	,setUrl:function(url) {
		this.url = url;
	} // eo setUrl
	// }}}
	// {{{
	/**
	 * Starts progress fetching from server
	 * @private
	 */
	,startProgress:function() {
		if(!this.progressTask) {
			this.progressTask = new Ext.util.DelayedTask(this.requestProgress, this);
		}
		this.progressTask.delay.defer(this.progressInterval / 2, this.progressTask, [this.progressInterval]);
	} // eo function startProgress
	// }}}
	// {{{
	/**
	 * Stops progress fetching from server
	 * @private
	 */
	,stopProgress:function() {
		if(this.progressTask) {
			this.progressTask.cancel();
		}
	} // eo function stopProgress
	// }}}
	// {{{
	/**
	 * Stops all currently running uploads
	 */
	,stopAll:function() {
		var records = this.store.query('state', 'uploading');
		records.each(this.stopUpload, this);
	} // eo function stopAll
	// }}}
	// {{{
	/**
	 * Stops currently running upload
	 * @param {Ext.data.Record} record Optional, if not set singleUpload = true is assumed
	 * and the global stop is initiated
	 */
	,stopUpload:function(record) {
		// single abord
		var iframe = false;
		if(record) {
			iframe = this.getIframe(record);
			this.stopIframe(iframe);
			this.upCount--;
			this.upCount = 0 > this.upCount ? 0 : this.upCount;
			record.set('state', 'stopped');
			this.fireFinishEvents({record:record});
		}
		// all abort
		else if(this.form) {
			iframe = Ext.fly(this.form.dom.target);
			this.stopIframe(iframe);
			this.upCount = 0;
			this.fireFinishEvents();
		}

	} // eo function abortUpload
	// }}}
	// {{{
	/**
	 * Stops uploading in hidden iframe
	 * @private
	 * @param {Ext.Element} iframe
	 */
	,stopIframe:function(iframe) {
		if(iframe) {
			try {
				iframe.dom.contentWindow.stop();
				iframe.remove.defer(250, iframe);
			}
			catch(e){}
		}
	} // eo function stopIframe
	// }}}
	// {{{
	/**
	 * Main public interface function. Preforms the upload
	 */
	,upload:function() {
		
		var records = this.store.queryBy(function(r){return 'done' !== r.get('state');});
		if(!records.getCount()) {
			return;
		}

		// fire beforeallstart event
		if(true !== this.eventsSuspended && false === this.fireEvent('beforeallstart', this)) {
			return;
		}
		if(this.singleUpload) {
			this.uploadSingle();
		}
		else {
			records.each(this.uploadFile, this);
		}
		
		if(true === this.enableProgress) {
			this.startProgress();
		}

	} // eo function upload
	// }}}
	// {{{
	/**
	 * called for both success and failure. Does nearly nothing
	 * @private
	 * but dispatches processing to processSuccess and processFailure functions
	 */
	,uploadCallback:function(options, success, response) {

		var o;
		this.upCount--;
		this.form = false;

		// process ajax success
		if(true === success) {
			try {
				o = Ext.decode(response.responseText);
			}
			catch(e) {
				this.processFailure(options, response, this.jsonErrorText);
				this.fireFinishEvents(options);
				return;
			}
			// process command success
			if(true === o.success) {
				this.processSuccess(options, response, o);
			}
			// process command failure
			else {
				this.processFailure(options, response, o);
			}
		}
		// process ajax failure
		else {
			this.processFailure(options, response);
		}

		this.fireFinishEvents(options);

	} // eo function uploadCallback
	// }}}
	// {{{
	/**
	 * Uploads one file
	 * @param {Ext.data.Record} record
	 * @param {Object} params Optional. Additional params to use in request.
	 */
	,uploadFile:function(record, params) {
		// fire beforestart event
		if(true !== this.eventsSuspended && false === this.fireEvent('beforefilestart', this, record)) {
			return;
		}

		// create form for upload
		var form = this.createForm(record);

		// append input to the form
		var inp = record.get('input');
		inp.set({name:inp.id});
		form.appendChild(inp);

		// get params for request
		params = {input_id : inp.id};
		var o = this.getOptions(record, params);
		o.form = form;

		// set state 
		record.set('state', 'uploading');
		record.set('pctComplete', 0);

		// increment active uploads count
		this.upCount++;

		// request upload
		Ext.Ajax.request(o);

		// todo:delete after devel
		this.getIframe.defer(100, this, [record]);

	} // eo function uploadFile
	// }}}
	// {{{
	/**
	 * Uploads all files in single request
	 */
	,uploadSingle:function() {

		// get records to upload
		var records = this.store.queryBy(function(r){return 'done' !== r.get('state');});
		if(!records.getCount()) {
			return;
		}

		// create form and append inputs to it
		var form = this.createForm();
		records.each(function(record) {
			var inp = record.get('input');
			inp.set({name:inp.id});
			form.appendChild(inp);
			record.set('state', 'uploading');
		}, this);

		// create options for request
		var o = this.getOptions();
		o.form = form;

		// save form for stop
		this.form = form;

		// increment active uploads counter
		this.upCount++;

		// request upload
		Ext.Ajax.request(o);
	
	} // eo function uploadSingle
	// }}}

}); // eo extend

// register xtype
Ext.reg('fileuploader', Ext.ux.FileUploader);

 // eof

/************************************************************************************************************/
/**
 * Ext.ux.form.UploadPanel
 *
 * @author  Ing. Jozef Sakáloš
 * @version $Id: Ext.ux.UploadPanel.js 310 2008-08-14 17:23:48Z jozo $
 * @date    13. March 2008
 *
 * @license Ext.ux.form.UploadPanel is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

/*global Ext */

/**
 * @class Ext.ux.UploadPanel
 * @extends Ext.Panel
 */
Ext.ux.UploadPanel = Ext.extend(Ext.Panel, {

	// configuration options overridable from outside
	// {{{
	/**
	 * @cfg {String} addIconCls icon class for add (file browse) button
	 */
	 addIconCls:'icon-plus'

	/**
	 * @cfg {String} addText Text on Add button
	 */
	,addText:'Add'

	/**
	 * @cfg {Object} baseParams This object is not used directly by FileTreePanel but it is
	 * propagated to lower level objects instead. Included here for convenience.
	 */

	/**
	 * @cfg {String} bodyStyle style to use for panel body
	 */
	,bodyStyle:'padding:2px'

	/**
	 * @cfg {String} buttonsAt Where buttons are placed. Valid values are tbar, bbar, body (defaults to 'tbar')
	 */
	,buttonsAt:'tbar'

	/**
	 * @cfg {String} clickRemoveText
	 */
	,clickRemoveText:'Click to remove'

	/**
	 * @cfg {String} clickStopText
	 */
	,clickStopText:'Click to stop'

	/**
	 * @cfg {String} emptyText empty text for dataview
	 */
	,emptyText:'No files'

	/**
	 * @cfg {Boolean} enableProgress true to enable querying server for progress information
	 * Passed to underlying uploader. Included here for convenience.
	 */
	,enableProgress:true

	/**
	 * @cfg {String} errorText
	 */
	,errorText:'Error'

	/**
	 * @cfg {String} fileCls class prefix to use for file type classes
	 */
	,fileCls:'file'

	/**
	 * @cfg {String} fileQueuedText File upload status text
	 */
	,fileQueuedText:'File <b>{0}</b> is queued for upload' 

	/**
	 * @cfg {String} fileDoneText File upload status text
	 */
	,fileDoneText:'File <b>{0}</b> has been successfully uploaded'

	/**
	 * @cfg {String} fileFailedText File upload status text
	 */
	,fileFailedText:'File <b>{0}</b> failed to upload'

	/**
	 * @cfg {String} fileStoppedText File upload status text
	 */
	,fileStoppedText:'File <b>{0}</b> stopped by user'

	/**
	 * @cfg {String} fileUploadingText File upload status text
	 */
	,fileUploadingText:'Uploading file <b>{0}</b>'

	/**
	 * @cfg {Number} maxFileSize Maximum upload file size in bytes
	 * This config property is propagated down to uploader for convenience
	 */
	,maxFileSize:524288

	/**
	 * @cfg {Number} Maximum file name length for short file names
	 */
	,maxLength:18

	/**
	 * @cfg {String} removeAllIconCls iconClass to use for Remove All button (defaults to 'icon-cross'
	 */
	,removeAllIconCls:'icon-cross'

	/**
	 * @cfg {String} removeAllText text to use for Remove All button tooltip
	 */
	,removeAllText:'Remove All'

	/**
	 * @cfg {String} removeIconCls icon class to use for remove file icon
	 */
	,removeIconCls:'icon-minus'

	/**
	 * @cfg {String} removeText Remove text
	 */
	,removeText:'Remove'

	/**
	 * @cfg {String} selectedClass class for selected item of DataView
	 */
	,selectedClass:'ux-up-item-selected'

	/**
	 * @cfg {Boolean} singleUpload true to upload files in one form, false to upload one by one
	 * This config property is propagated down to uploader for convenience
	 */
	,singleUpload:false

	/**
	 * @cfg {String} stopAllText
	 */
	,stopAllText:'Stop All'

	/** 
	 * @cfg {String} stopIconCls icon class to use for stop
	 */
	,stopIconCls:'icon-stop'

	/**
	 * @cfg {String/Ext.XTemplate} tpl Template for DataView.
	 */

	/**
	 * @cfg {String} uploadText Upload text
	 */
	,uploadText:'Upload'

	/**
	 * @cfg {String} uploadIconCls icon class to use for upload button
	 */
	,uploadIconCls:'icon-upload'

	/**
	 * @cfg {String} workingIconCls iconClass to use for busy indicator
	 */
	,workingIconCls:'icon-working'

	// }}}

	// overrides
	// {{{
	,initComponent:function() {

		// {{{
		// create buttons
		// add (file browse button) configuration
		var addCfg = {
			 xtype:'browsebutton'
			,text:this.addText + '...'
			,iconCls:this.addIconCls
			,scope:this
			,handler:this.onAddFile
		};

		// upload button configuration
		var upCfg = {
			 xtype:'button'
			,iconCls:this.uploadIconCls
			,text:this.uploadText
			,scope:this
			,handler:this.onUpload
			,disabled:true
		};

		// remove all button configuration
		var removeAllCfg = {
			 xtype:'button'
			,iconCls:this.removeAllIconCls
			,tooltip:this.removeAllText
			,scope:this
			,handler:this.onRemoveAllClick
			,disabled:true
		};

		// todo: either to cancel buttons in body or implement it
		if('body' !== this.buttonsAt) {
			this[this.buttonsAt] = [addCfg, upCfg, '->', removeAllCfg];
		}
		// }}}
		// {{{
		// create store
		// fields for record
		var fields = [
			 {name:'id', type:'text', system:true}
			,{name:'shortName', type:'text', system:true}
			,{name:'fileName', type:'text', system:true}
			,{name:'filePath', type:'text', system:true}
			,{name:'fileCls', type:'text', system:true}
			,{name:'input', system:true}
			,{name:'form', system:true}
			,{name:'state', type:'text', system:true}
			,{name:'error', type:'text', system:true}
			,{name:'progressId', type:'int', system:true}
			,{name:'bytesTotal', type:'int', system:true}
			,{name:'bytesUploaded', type:'int', system:true}
			,{name:'estSec', type:'int', system:true}
			,{name:'filesUploaded', type:'int', system:true}
			,{name:'speedAverage', type:'int', system:true}
			,{name:'speedLast', type:'int', system:true}
			,{name:'timeLast', type:'int', system:true}
			,{name:'timeStart', type:'int', system:true}
			,{name:'pctComplete', type:'int', system:true}
		];

		// add custom fields if passed
		if(Ext.isArray(this.customFields)) {
			fields.push(this.customFields);
		}

		// create store
		this.store = new Ext.data.SimpleStore({
			 id:0
			,fields:fields
			,data:[]
		});
		// }}}
		// {{{
		// create view
		Ext.apply(this, {
			items:[{
				 xtype:'dataview'
				,itemSelector:'div.ux-up-item'
				,store:this.store
				,selectedClass:this.selectedClass
				,singleSelect:true
				,emptyText:this.emptyText
				,tpl: this.tpl || new Ext.XTemplate(
					  '<tpl for=".">'
					+ '<div class="ux-up-item">'
//					+ '<div class="ux-up-indicator">&#160;</div>'
					+ '<div class="ux-up-icon-file {fileCls}">&#160;</div>'
					+ '<div class="ux-up-text x-unselectable" qtip="{fileName}">{shortName}</div>'
					+ '<div id="remove-{[values.input.id]}" class="ux-up-icon-state ux-up-icon-{state}"'
					+ 'qtip="{[this.scope.getQtip(values)]}">&#160;</div>'
					+ '</div>'
					+ '</tpl>'
					, {scope:this}
				)
				,listeners:{click:{scope:this, fn:this.onViewClick}}

			}]
		});
		// }}}

		// call parent
		Ext.ux.UploadPanel.superclass.initComponent.apply(this, arguments);

		// save useful references
		this.view = this.items.itemAt(0);

		// {{{
		// add events
		this.addEvents(
			/**
			 * Fires before the file is added to store. Return false to cancel the add
			 * @event beforefileadd
			 * @param {Ext.ux.UploadPanel} this
			 * @param {Ext.Element} input (type=file) being added
			 */
			'beforefileadd'
			/**
			 * Fires after the file is added to the store
			 * @event fileadd
			 * @param {Ext.ux.UploadPanel} this
			 * @param {Ext.data.Store} store
			 * @param {Ext.data.Record} Record (containing the input) that has been added to the store
			 */
			,'fileadd'
			/**
			 * Fires before the file is removed from the store. Return false to cancel the remove
			 * @event beforefileremove
			 * @param {Ext.ux.UploadPanel} this
			 * @param {Ext.data.Store} store
			 * @param {Ext.data.Record} Record (containing the input) that is being removed from the store
			 */
			,'beforefileremove'
			/**
			 * Fires after the record (file) has been removed from the store
			 * @event fileremove
			 * @param {Ext.ux.UploadPanel} this
			 * @param {Ext.data.Store} store
			 */
			,'fileremove'
			/**
			 * Fires before all files are removed from the store (queue). Return false to cancel the clear.
			 * Events for individual files being removed are suspended while clearing the queue.
			 * @event beforequeueclear
			 * @param {Ext.ux.UploadPanel} this
			 * @param {Ext.data.Store} store
			 */
			,'beforequeueclear'
			/**
			 * Fires after the store (queue) has been cleared
			 * Events for individual files being removed are suspended while clearing the queue.
			 * @event queueclear
			 * @param {Ext.ux.UploadPanel} this
			 * @param {Ext.data.Store} store
			 */
			,'queueclear'
			/**
			 * Fires after the upload button is clicked but before any upload is started
			 * Return false to cancel the event
			 * @param {Ext.ux.UploadPanel} this
			 */
			,'beforeupload'
		);
		// }}}
		// {{{
		// relay view events
		this.relayEvents(this.view, [
			 'beforeclick'
			,'beforeselect'
			,'click'
			,'containerclick'
			,'contextmenu'
			,'dblclick'
			,'selectionchange'
		]);
		// }}}

		// create uploader
		var config = {
			 store:this.store
			,singleUpload:this.singleUpload
			,maxFileSize:this.maxFileSize
			,enableProgress:this.enableProgress
			,url:this.url
			,path:this.path
		};
		if(this.baseParams) {
			config.baseParams = this.baseParams;
		}
		this.uploader = new Ext.ux.FileUploader(config);

		// relay uploader events
		this.relayEvents(this.uploader, [
			 'beforeallstart'
			,'allfinished'
			,'progress'
		]);

		// install event handlers
		this.on({
			 beforeallstart:{scope:this, fn:function() {
			 	this.uploading = true;
				this.updateButtons();
			}}
			,allfinished:{scope:this, fn:function() {
				this.uploading = false;
				this.updateButtons();
			}}
			,progress:{fn:this.onProgress.createDelegate(this)}
		});
	} // eo function initComponent
	// }}}
	// {{{
	/**
	 * onRender override, saves references to buttons
	 * @private
	 */
	,onRender:function() {
		// call parent
		Ext.ux.UploadPanel.superclass.onRender.apply(this, arguments);

		// save useful references
		var tb = 'tbar' === this.buttonsAt ? this.getTopToolbar() : this.getBottomToolbar();
		this.addBtn = Ext.getCmp(tb.items.first().id);
		this.uploadBtn = Ext.getCmp(tb.items.itemAt(1).id);
		this.removeAllBtn = Ext.getCmp(tb.items.last().id);
	} // eo function onRender
	// }}}

	// added methods
	// {{{
	/**
	 * called by XTemplate to get qtip depending on state
	 * @private
	 * @param {Object} values XTemplate values
	 */
	,getQtip:function(values) {
		var qtip = '';
		switch(values.state) {
			case 'queued':
				qtip = String.format(this.fileQueuedText, values.fileName);
				qtip += '<br>' + this.clickRemoveText;
			break;

			case 'uploading':
				qtip = String.format(this.fileUploadingText, values.fileName);
				qtip += '<br>' + values.pctComplete + '% done';
				qtip += '<br>' + this.clickStopText;
			break;

			case 'done':
				qtip = String.format(this.fileDoneText, values.fileName);
				qtip += '<br>' + this.clickRemoveText;
			break;

			case 'failed':
				qtip = String.format(this.fileFailedText, values.fileName);
				qtip += '<br>' + this.errorText + ':' + values.error;
				qtip += '<br>' + this.clickRemoveText;
			break;

			case 'stopped':
				qtip = String.format(this.fileStoppedText, values.fileName);
				qtip += '<br>' + this.clickRemoveText;
			break;
		}
		return qtip;
	} // eo function getQtip
	// }}}
	// {{{
	/**
	 * get file name
	 * @private
	 * @param {Ext.Element} inp Input element containing the full file path
	 * @return {String}
	 */
	,getFileName:function(inp) {
		return inp.getValue().split(/[\/\\]/).pop();
	} // eo function getFileName
	// }}}
	// {{{
	/**
	 * get file path (excluding the file name)
	 * @private
	 * @param {Ext.Element} inp Input element containing the full file path
	 * @return {String}
	 */
	,getFilePath:function(inp) {
		return inp.getValue().replace(/[^\/\\]+$/,'');
	} // eo function getFilePath
	// }}}
	// {{{
	/**
	 * returns file class based on name extension
	 * @private
	 * @param {String} name File name to get class of
	 * @return {String} class to use for file type icon
	 */
	,getFileCls: function(name) {
		var atmp = name.split('.');
		if(1 === atmp.length) {
			return this.fileCls;
		}
		else {
			return this.fileCls + '-' + atmp.pop().toLowerCase();
		}
	}
	// }}}
	// {{{
	/**
	 * called when file is added - adds file to store
	 * @private
	 * @param {Ext.ux.BrowseButton}
	 */
	,onAddFile:function(bb) {
		if(true !== this.eventsSuspended && false === this.fireEvent('beforefileadd', this, bb.getInputFile())) {
			return;
		}
		var inp = bb.detachInputFile();
		inp.addClass('x-hidden');
		var fileName = this.getFileName(inp);

		// create new record and add it to store
		var rec = new this.store.recordType({
			 input:inp
			,fileName:fileName
			,filePath:this.getFilePath(inp)
			,shortName: Ext.util.Format.ellipsis(fileName, this.maxLength)
			,fileCls:this.getFileCls(fileName)
			,state:'queued'
		}, inp.id);
		rec.commit();
		this.store.add(rec);

		this.syncShadow();

		this.uploadBtn.enable();
		this.removeAllBtn.enable();

		if(true !== this.eventsSuspended) {
			this.fireEvent('fileadd', this, this.store, rec);
		}

	} // eo onAddFile
	// }}}
	// {{{
	/**
	 * destroys child components
	 * @private
	 */
	,onDestroy:function() {

		// destroy uploader
		if(this.uploader) {
			this.uploader.stopAll();
			this.uploader.purgeListeners();
			this.uploader = null;
		}

		// destroy view
		if(this.view) {
			this.view.purgeListeners();
			this.view.destroy();
			this.view = null;
		}

		// destroy store
		if(this.store) {
			this.store.purgeListeners();
			this.store.destroy();
			this.store = null;
		}

	} // eo function onDestroy
	// }}}
	// {{{
	/**
	 * progress event handler
	 * @private
	 * @param {Ext.ux.FileUploader} uploader
	 * @param {Object} data progress data
	 * @param {Ext.data.Record} record
	 */
	,onProgress:function(uploader, data, record) {
		var bytesTotal, bytesUploaded, pctComplete, state, idx, item, width, pgWidth;
		if(record) {
			state = record.get('state');
			bytesTotal = record.get('bytesTotal') || 1;
			bytesUploaded = record.get('bytesUploaded') || 0;
			if('uploading' === state) {
				pctComplete = Math.round(1000 * bytesUploaded/bytesTotal) / 10;
			}
			else if('done' === state) {
				pctComplete = 100;
			}
			else {
				pctComplete = 0;
			}
			record.set('pctComplete', pctComplete);

			idx = this.store.indexOf(record);
			item = Ext.get(this.view.getNode(idx));
			if(item) {
				width = item.getWidth();
				item.applyStyles({'background-position':width * pctComplete / 100 + 'px'});
			}
		}
	} // eo function onProgress
	// }}}
	// {{{
	/**
	 * called when file remove icon is clicked - performs the remove
	 * @private
	 * @param {Ext.data.Record}
	 */
	,onRemoveFile:function(record) {
		if(true !== this.eventsSuspended && false === this.fireEvent('beforefileremove', this, this.store, record)) {
			return;
		}

		// remove DOM elements
		var inp = record.get('input');
		var wrap = inp.up('em');
		inp.remove();
		if(wrap) {
			wrap.remove();
		}

		// remove record from store
		this.store.remove(record);

		var count = this.store.getCount();
		this.uploadBtn.setDisabled(!count);
		this.removeAllBtn.setDisabled(!count);

		if(true !== this.eventsSuspended) {
			this.fireEvent('fileremove', this, this.store);
			this.syncShadow();
		}
	} // eo function onRemoveFile
	// }}}
	// {{{
	/**
	 * Remove All/Stop All button click handler
	 * @private
	 */
	,onRemoveAllClick:function(btn) {
		if(true === this.uploading) {
			this.stopAll();
		}
		else {
			this.removeAll();
		}
	} // eo function onRemoveAllClick

	,stopAll:function() {
		this.uploader.stopAll();
	} // eo function stopAll
	// }}}
	// {{{
	/**
	 * DataView click handler
	 * @private
	 */
	,onViewClick:function(view, index, node, e) {
		var t = e.getTarget('div:any(.ux-up-icon-queued|.ux-up-icon-failed|.ux-up-icon-done|.ux-up-icon-stopped)');
		if(t) {
			this.onRemoveFile(this.store.getAt(index));
		}
		t = e.getTarget('div.ux-up-icon-uploading');
		if(t) {
			this.uploader.stopUpload(this.store.getAt(index));
		}
	} // eo function onViewClick
	// }}}
	// {{{
	/**
	 * tells uploader to upload
	 * @private
	 */
	,onUpload:function() {
		if(true !== this.eventsSuspended && false === this.fireEvent('beforeupload', this)) {
			return false;
		}
		this.uploader.upload();
	} // eo function onUpload
	// }}}
	// {{{
	/**
	 * url setter
	 */
	,setUrl:function(url) {
		this.url = url;
		this.uploader.setUrl(url);
	} // eo function setUrl
	// }}}
	// {{{
	/**
	 * path setter
	 */
	,setPath:function(path) {
		this.uploader.setPath(path);
	} // eo function setPath
	// }}}
	// {{{
	/**
	 * Updates buttons states depending on uploading state
	 * @private
	 */
	,updateButtons:function() {
		if(true === this.uploading) {
			this.addBtn.disable();
			this.uploadBtn.disable();
			this.removeAllBtn.setIconClass(this.stopIconCls);
			this.removeAllBtn.getEl().child(this.removeAllBtn.buttonSelector).dom[this.removeAllBtn.tooltipType] = this.stopAllText;
		}
		else {
			this.addBtn.enable();
			this.uploadBtn.enable();
			this.removeAllBtn.setIconClass(this.removeAllIconCls);
			this.removeAllBtn.getEl().child(this.removeAllBtn.buttonSelector).dom[this.removeAllBtn.tooltipType] = this.removeAllText;
		}
	} // eo function updateButtons
	// }}}
	// {{{
	/**
	 * Removes all files from store and destroys file inputs
	 */
	,removeAll:function() {
		var suspendState = this.eventsSuspended;
		if(false !== this.eventsSuspended && false === this.fireEvent('beforequeueclear', this, this.store)) {
			return false;
		}
		this.suspendEvents();

		this.store.each(this.onRemoveFile, this);

		this.eventsSuspended = suspendState;
		if(true !== this.eventsSuspended) {
			this.fireEvent('queueclear', this, this.store);
		}
		this.syncShadow();
	} // eo function removeAll
	// }}}
	// {{{
	/**
	 * synchronize context menu shadow if we're in contextmenu
	 * @private
	 */
	,syncShadow:function() {
		if(this.contextmenu && this.contextmenu.shadow) {
			this.contextmenu.getEl().shadow.show(this.contextmenu.getEl());
		}
	} // eo function syncShadow
	// }}}

}); // eo extend

// register xtype
Ext.reg('uploadpanel', Ext.ux.UploadPanel);

// eof
/**********************************************************************************************************/
Ext.namespace('Ext.ux.form');

/**
 * @class Ext.ux.form.BrowseButton
 * @extends Ext.Button
 * Ext.Button that provides a customizable file browse button.
 * Clicking this button, pops up a file dialog box for a user to select the file to upload.
 * This is accomplished by having a transparent <input type="file"> box above the Ext.Button.
 * When a user thinks he or she is clicking the Ext.Button, they're actually clicking the hidden input "Browse..." box.
 * Note: this class can be instantiated explicitly or with xtypes anywhere a regular Ext.Button can be except in 2 scenarios:
 * - Panel.addButton method both as an instantiated object or as an xtype config object.
 * - Panel.buttons config object as an xtype config object.
 * These scenarios fail because Ext explicitly creates an Ext.Button in these cases.
 * Browser compatibility:
 * Internet Explorer 6:
 * - no issues
 * Internet Explorer 7:
 * - no issues
 * Firefox 2 - Windows:
 * - pointer cursor doesn't display when hovering over the button.
 * Safari 3 - Windows:
 * - no issues.
 * @author loeppky - based on the work done by MaximGB in Ext.ux.UploadDialog (http://extjs.com/forum/showthread.php?t=21558)
 * The follow the curosr float div idea also came from MaximGB.
 * @see http://extjs.com/forum/showthread.php?t=29032
 * @constructor
 * Create a new BrowseButton.
 * @param {Object} config Configuration options
 */
Ext.ux.form.BrowseButton = Ext.extend(Ext.Button, {
	/*
	 * Config options:
	 */
	/**
	 * @cfg {String} inputFileName
	 * Name to use for the hidden input file DOM element.  Deaults to "file".
	 */
	inputFileName: 'file',
	/**
	 * @cfg {Boolean} debug
	 * Toggle for turning on debug mode.
	 * Debug mode doesn't make clipEl transparent so that one can see how effectively it covers the Ext.Button.
	 * In addition, clipEl is given a green background and floatEl a red background to see how well they are positioned.
	 */
	debug: false,
	
	
	/*
	 * Private constants:
	 */
	/**
	 * @property FLOAT_EL_WIDTH
	 * @type Number
	 * The width (in pixels) of floatEl.
	 * It should be less than the width of the IE "Browse" button's width (65 pixels), since IE doesn't let you resize it.
	 * We define this width so we can quickly center floatEl at the mouse cursor without having to make any function calls.
	 * @private
	 */
	FLOAT_EL_WIDTH: 60,
	
	/**
	 * @property FLOAT_EL_HEIGHT
	 * @type Number
	 * The heigh (in pixels) of floatEl.
	 * It should be less than the height of the "Browse" button's height.
	 * We define this height so we can quickly center floatEl at the mouse cursor without having to make any function calls.
	 * @private
	 */
	FLOAT_EL_HEIGHT: 18,
	
	
	/*
	 * Private properties:
	 */
	/**
	 * @property buttonCt
	 * @type Ext.Element
	 * Element that contains the actual Button DOM element.
	 * We store a reference to it, so we can easily grab its size for sizing the clipEl.
	 * @private
	 */
	buttonCt: null,
	/**
	 * @property clipEl
	 * @type Ext.Element
	 * Element that contains the floatEl.
	 * This element is positioned to fill the area of Ext.Button and has overflow turned off.
	 * This keeps floadEl tight to the Ext.Button, and prevents it from masking surrounding elements.
	 * @private
	 */
	clipEl: null,
	/**
	 * @property floatEl
	 * @type Ext.Element
	 * Element that contains the inputFileEl.
	 * This element is size to be less than or equal to the size of the input file "Browse" button.
	 * It is then positioned wherever the user moves the cursor, so that their click always clicks the input file "Browse" button.
	 * Overflow is turned off to preven inputFileEl from masking surrounding elements.
	 * @private
	 */
	floatEl: null,
	/**
	 * @property inputFileEl
	 * @type Ext.Element
	 * Element for the hiden file input.
	 * @private
	 */
	inputFileEl: null,
	/**
	 * @property originalHandler
	 * @type Function
	 * The handler originally defined for the Ext.Button during construction using the "handler" config option.
	 * We need to null out the "handler" property so that it is only called when a file is selected.
	 * @private
	 */
	originalHandler: null,
	/**
	 * @property originalScope
	 * @type Object
	 * The scope originally defined for the Ext.Button during construction using the "scope" config option.
	 * While the "scope" property doesn't need to be nulled, to be consistent with originalHandler, we do.
	 * @private
	 */
	originalScope: null,
	
	
	/*
	 * Protected Ext.Button overrides
	 */
	/**
	 * @see Ext.Button.initComponent
	 */
	initComponent: function(){
		Ext.ux.form.BrowseButton.superclass.initComponent.call(this);
		// Store references to the original handler and scope before nulling them.
		// This is done so that this class can control when the handler is called.
		// There are some cases where the hidden file input browse button doesn't completely cover the Ext.Button.
		// The handler shouldn't be called in these cases.  It should only be called if a new file is selected on the file system.  
		this.originalHandler = this.handler;
		this.originalScope = this.scope;
		this.handler = null;
		this.scope = null;
	},
	
	/**
	 * @see Ext.Button.onRender
	 */
	onRender: function(ct, position){
		Ext.ux.form.BrowseButton.superclass.onRender.call(this, ct, position); // render the Ext.Button
		this.buttonCt = this.el.child('.x-btn-center em');
		this.buttonCt.position('relative'); // this is important!
		var styleCfg = {
			position: 'absolute',
			overflow: 'hidden',
			top: '0px', // default
			left: '0px' // default
		};
		// browser specifics for better overlay tightness
		if (Ext.isIE) {
			Ext.apply(styleCfg, {
				left: '-3px',
				top: '-3px'
			});
		} else if (Ext.isGecko) {
			Ext.apply(styleCfg, {
				left: '-3px',
				top: '-3px'
			});
		} else if (Ext.isSafari) {
			Ext.apply(styleCfg, {
				left: '-4px',
				top: '-2px'
			});
		}
		this.clipEl = this.buttonCt.createChild({
			tag: 'div',
			style: styleCfg
		});
		this.setClipSize();
		this.clipEl.on({
			'mousemove': this.onButtonMouseMove,
			'mouseover': this.onButtonMouseMove,
			scope: this
		});
		
		this.floatEl = this.clipEl.createChild({
			tag: 'div',
			style: {
				position: 'absolute',
				width: this.FLOAT_EL_WIDTH + 'px',
				height: this.FLOAT_EL_HEIGHT + 'px',
				overflow: 'hidden'
			}
		});
		
		
		if (this.debug) {
			this.clipEl.applyStyles({
				'background-color': 'green'
			});
			this.floatEl.applyStyles({
				'background-color': 'red'
			});
		} else {
			this.clipEl.setOpacity(0.0);
		}
		
		// Cover cases where someone tabs to the button:
		// Listen to focus of the button so we can translate the focus to the input file el.
		var buttonEl = this.el.child(this.buttonSelector);
		buttonEl.on('focus', this.onButtonFocus, this);
		// In IE, it's possible to tab to the text portion of the input file el.  
		// We want to listen to keyevents so that if a space is pressed, we "click" the input file el.
		if (Ext.isIE) {
			this.el.on('keydown', this.onButtonKeyDown, this);
		}
		
		this.createInputFile();
	},
	
	
	/*
	 * Private helper methods:
	 */
	/**
	 * Sets the size of clipEl so that is covering as much of the button as possible.
	 * @private
	 */
	setClipSize: function(){
		if (this.clipEl) {
			var width = this.buttonCt.getWidth();
			var height = this.buttonCt.getHeight();
			// The button container can have a width and height of zero when it's rendered in a hidden panel.
			// This is most noticable when using a card layout, as the items are all rendered but hidden,
			// (unless deferredRender is set to true). 
			// In this case, the clip size can't be determined, so we attempt to set it later.
			// This check repeats until the button container has a size. 
			if (width === 0 || height === 0) {
				this.setClipSize.defer(100, this);
			} else {
				if (Ext.isIE) {
					width = width + 5;
					height = height + 5;
				} else if (Ext.isGecko) {
					width = width + 6;
					height = height + 6;
				} else if (Ext.isSafari) {
					width = width + 6;
					height = height + 6;
				}
				this.clipEl.setSize(width, height);
			}
		}
	},
	
	/**
	 * Creates the input file element and adds it to inputFileCt.
	 * The created input file elementis sized, positioned, and styled appropriately.
	 * Event handlers for the element are set up, and a tooltip is applied if defined in the original config.
	 * @private
	 */
	createInputFile: function(){
		// When an input file gets detached and set as the child of a different DOM element,
		// straggling <em> elements get left behind.  
		// I don't know why this happens but we delete any <em> elements we can find under the floatEl to prevent a memory leak.
		this.floatEl.select('em').each(function(el){
			el.remove();
		});
		this.inputFileEl = this.floatEl.createChild({
			tag: 'input',
			type: 'file',
			size: 1, // must be > 0. It's value doesn't really matter due to our masking div (inputFileCt).  
			name: this.inputFileName || Ext.id(this.el),
			tabindex: this.tabIndex,
			// Use the same pointer as an Ext.Button would use.  This doesn't work in Firefox.
			// This positioning right-aligns the input file to ensure that the "Browse" button is visible.
			style: {
				position: 'absolute',
				cursor: 'pointer',
				right: '0px',
				top: '0px'
			}
		});
		this.inputFileEl = this.inputFileEl.child('input') || this.inputFileEl;
		
		// setup events
		this.inputFileEl.on({
			'click': this.onInputFileClick,
			'change': this.onInputFileChange,
			'focus': this.onInputFileFocus,
			'select': this.onInputFileFocus,
			'blur': this.onInputFileBlur,
			scope: this
		});
		
		// add a tooltip
		if (this.tooltip) {
			if (typeof this.tooltip == 'object') {
				Ext.QuickTips.register(Ext.apply({
					target: this.inputFileEl
				}, this.tooltip));
			} else {
				this.inputFileEl.dom[this.tooltipType] = this.tooltip;
			}
		}
	},
	
	/**
	 * Redirecting focus to the input file element so the user can press space and select files.
	 * @param {Event} e focus event.
	 * @private
	 */
	onButtonFocus: function(e){
		if (this.inputFileEl) {
			this.inputFileEl.focus();
			e.stopEvent();
		}
	},
	
	/**
	 * Handler for the IE case where once can tab to the text box of an input file el.
	 * If the key is a space, we simply "click" the inputFileEl.
	 * @param {Event} e key event.
	 * @private
	 */
	onButtonKeyDown: function(e){
		if (this.inputFileEl && e.getKey() == Ext.EventObject.SPACE) {
			this.inputFileEl.dom.click();
			e.stopEvent();
		}
	},
	
	/**
	 * Handler when the cursor moves over the clipEl.
	 * The floatEl gets centered to the cursor location.
	 * @param {Event} e mouse event.
	 * @private
	 */
	onButtonMouseMove: function(e){
		var xy = e.getXY();
		xy[0] -= this.FLOAT_EL_WIDTH / 2;
		xy[1] -= this.FLOAT_EL_HEIGHT / 2;
		this.floatEl.setXY(xy);
	},
	
	/**
	 * Add the visual enhancement to the button when the input file recieves focus. 
	 * This is the tip for the user that now he/she can press space to select the file.
	 * @private
	 */
	onInputFileFocus: function(e){
		if (!this.isDisabled) {
			this.el.addClass("x-btn-over");
		}
	},
	
	/**
	 * Removes the visual enhancement from the button.
	 * @private
	 */
	onInputFileBlur: function(e){
		this.el.removeClass("x-btn-over");
	},
	
	/**
	 * Handler when inputFileEl's "Browse..." button is clicked.
	 * @param {Event} e click event.
	 * @private
	 */
	onInputFileClick: function(e){
		e.stopPropagation();
	},
	
	/**
	 * Handler when inputFileEl changes value (i.e. a new file is selected).
	 * @private
	 */
	onInputFileChange: function(){
		if (this.originalHandler) {
			this.originalHandler.call(this.originalScope, this);
		}
	},
	
	
	/*
	 * Public methods:
	 */
	/**
	 * Detaches the input file associated with this BrowseButton so that it can be used for other purposed (e.g. uplaoding).
	 * The returned input file has all listeners and tooltips applied to it by this class removed.
	 * @param {Boolean} whether to create a new input file element for this BrowseButton after detaching.
	 * True will prevent creation.  Defaults to false.
	 * @return {Ext.Element} the detached input file element.
	 */
	detachInputFile: function(noCreate){
		var result = this.inputFileEl;
		
		if (typeof this.tooltip == 'object') {
			Ext.QuickTips.unregister(this.inputFileEl);
		} else {
			this.inputFileEl.dom[this.tooltipType] = null;
		}
		this.inputFileEl.removeAllListeners();
		this.inputFileEl = null;
		
		if (!noCreate) {
			this.createInputFile();
		}
		return result;
	},
	
	/**
	 * @return {Ext.Element} the input file element attached to this BrowseButton.
	 */
	getInputFile: function(){
		return this.inputFileEl;
	},
	
	/**
	 * @see Ext.Button.disable
	 */
	disable: function(){
		Ext.ux.form.BrowseButton.superclass.disable.call(this);
		this.inputFileEl.dom.disabled = true;
	},
	
	/**
	 * @see Ext.Button.enable
	 */
	enable: function(){
		Ext.ux.form.BrowseButton.superclass.enable.call(this);
		this.inputFileEl.dom.disabled = false;
	}
});

Ext.reg('browsebutton', Ext.ux.form.BrowseButton);

/**
 * Ext.ux.FileTreeMenu
 *
 * @author  Ing. Jozef SakÃ¡loÅ¡
 * @version $Id: Ext.ux.FileTreeMenu.js 520 2009-01-31 02:59:29Z jozo $
 * @date    13. March 2008
 *
 * @license Ext.ux.FileTreeMenu is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

/*global Ext */

/**
 * @class Ext.ux.FileTreeMenu
 * @extends Ext.menu.Menu
 * @constructor
 * Creates new FileTreeMenu object
 * @param {Object} config A configuration object
 */
Ext.ux.FileTreeMenu = function(config) {
	config = config || {};

	var uploadPanelConfig = {
		 contextmenu:this
		,buttonsAt:config.buttonsAt || 'tbar'
		,singleUpload:config.singleUpload || false
		,maxFileSize:config.maxFileSize
		,enableProgress:config.enableProgress
	};
	if(config.baseParams) {
		config.baseParams.cmd = config.baseParams.cmd || 'upload';
		config.baseParams.dir = config.baseParams.dir || '.';
		uploadPanelConfig.baseParams = config.baseParams;
	}

	// {{{
	Ext.apply(config, {
		items:[{
			 text:'&#160'
			,cls:'ux-ftm-nodename'
			,disabledClass:''
			,disabled:true
			,cmd:'nodename'
		},{
			 text:this.openText + ' (Enter)'
			,iconCls:this.openIconCls
			,cmd:'open'
			,menu:{
				items:[{
					 text:this.openSelfText
					,iconCls:this.openSelfIconCls
					,cmd:'open-self'
				},{
					 text:this.openPopupText
					,iconCls:this.openPopupIconCls
					,cmd:'open-popup'
				},{
					 text:this.openBlankText
					,iconCls:this.openBlankIconCls
					,cmd:'open-blank'
				},{
					 text:this.openDwnldText
					,iconCls:this.openDwnldIconCls
					,cmd:'open-dwnld'
				}]
			}
		}
		,new Ext.menu.Separator({cmd:'sep-open'})
		,{
			 text:this.reloadText + ' (Ctrl+E)'
			,iconCls:this.reloadIconCls
			,cmd:'reload'
		},{
			 text:this.expandText + ' (Ctrl+&nbsp;&rarr;)'
			,iconCls:this.expandIconCls
			,cmd:'expand'
		},{
			 text:this.collapseText + ' (Ctrl+&nbsp;&larr;)'
			,iconCls:this.collapseIconCls
			,cmd:'collapse'
		}
		,new Ext.menu.Separator({cmd:'sep-collapse'})
		,{
			 text:this.renameText + ' (F2)'
			,iconCls:this.renameIconCls
			,cmd:'rename'
		},{	
			 text:this.deleteText + ' (' + this.deleteKeyName + ')'
			,iconCls:this.deleteIconCls
			,cmd:'delete'
		},{	
			 text:this.newdirText + '... (Ctrl+N)'
			,iconCls:this.newdirIconCls
			,cmd:'newdir'
		}
		,new Ext.menu.Separator({cmd:'sep-upload'})
		,{
			 text:this.uploadFileText + ' (Ctrl+U)'
			,iconCls:this.uploadIconCls
			,hideOnClick:false
			,cmd:'upload'
		}
			,new Ext.menu.Adapter(new Ext.ux.UploadPanel(uploadPanelConfig), {
				 hideOnClick:false
				,cmd:'upload-panel'
			})
		]
	}); // eo apply
	// }}}

	// call parent
	Ext.ux.FileTreeMenu.superclass.constructor.call(this, config);

	// relay event from submenu
	this.relayEvents(this.getItemByCmd('open').menu, ['click', 'itemclick']);

}; // eo constructor

Ext.extend(Ext.ux.FileTreeMenu, Ext.menu.Menu, {
	// configuration options overridable from outside
	/**
	 * @cfg {String} collapseIconCls icon class for collapse all item
	 */
	 collapseIconCls:'icon-collapse-all'

	 /**
	  * @cfg {String} collapseText text for collapse all item
	  */
	,collapseText: 'Collapse all'

	/**
	 * @cfg {String} deleteIconCls icon class for delete item
	 */
	,deleteIconCls:'icon-cross'

	/**
	 * @cfg {String} deleteKeyName text for delete item shortcut
	 */
	,deleteKeyName:'Delete Key'

	/**
	 * @cfg {String} deleteText text for delete item
	 */
	,deleteText:'Delete'

	/**
	 * @cfg {String} expandIconCls icon class for expand all item
	 */
	,expandIconCls:'icon-expand-all'

	/**
	 * @cfg {String} expandText text for expand all item
	 */
	,expandText: 'Expand all'

	/**
	 * @cfg {String} newdirIconCls icon class for new directory item
	 */
	,newdirIconCls:'icon-folder-add'

	/**
	 * @cfg {String} newdirText text for new directory item
	 */
	,newdirText:'New folder'

	/**
	 * @cfg {String} openBlankIconCls icon class for open in new window item
	 */
	,openBlankIconCls:'icon-open-blank'

	/**
	 * @cfg {String} openBlankText text for open in new window item
	 */
	,openBlankText:'Open in new window'

	/**
	 * @cfg {String} openDwnldIconCls icon class for download item
	 */
	,openDwnldIconCls:'icon-open-download'

	/**
	 * @cfg {String} openDwnldText text for download item
	 */
	,openDwnldText:'Download'

	/**
	 * @cfg {String} openIconCls icon class for open submenu
	 */
	,openIconCls:'icon-open'

	/**
	 * @cfg {String} openPopupIconCls icon class for open in popup item
	 */
	,openPopupIconCls:'icon-open-popup'

	/**
	 * @cfg {String} text for open in poput item
	 */
	,openPopupText:'Open in popup'

	/**
	 * @cfg {String} openSelfIconCls icon class for open in this window item
	 */
	,openSelfIconCls:'icon-open-self'

	/**
	 * @cfg {String} openSelfText text for open in this window item
	 */
	,openSelfText:'Open in this window'

	/**
	 * @cfg {String} openText text for open submenu
	 */
	,openText:'Open'

	/**
	 * @cfg {String} reloadIconCls icon class for reload item
	 */
	,reloadIconCls:'icon-refresh'

	/**
	 * @cfg {String} reloadText text for reload item
	 */
	,reloadText:'R<span style="text-decoration:underline">e</span>load'

	/**
	 * @cfg {String} icon class for rename item
	 */
	,renameIconCls:'icon-pencil'

	/**
	 * @cfg {String} renameText text for rename item
	 */
	,renameText: 'Rename'
	
	/**
	 * @cfg {String} uploadFileText text for upload file item
	 */
	,uploadFileText:'<span style="text-decoration:underline">U</span>pload file'

	/**
	 * @cfg {String} uploadIconCls icon class for upload file item
	 */
	,uploadIconCls:'icon-upload'

	/**
	 * @cfg {String} uploadText text for word 'Upload'
	 */
	,uploadText:'Upload'

	/**
	 * @cfg {Number} width Width of the menu. 
	 * Cannot be empty as we have upload panel inside.
	 */
	,width:190

	// {{{
	/**
	 * Returns menu item identified by cmd. Unique cmd is used to identify menu items.
	 * I cannot use ids as they are applied to underlying DOM elements that would prevent
	 * to have more than one menu on the page.
	 * @param {String} cmd
	 * Valid cmds are:
	 *		- nodename
	 *		- open
	 *		- open-self
	 *		- open-popup
	 *		- open-blank
	 *		- open-dwnld
	 *		- sep-open (for separator after open submenu)
	 *		- reload
	 *		- expand
	 *		- collapse
	 *		- sep-collapse (for separator after collapse item)
	 *		- rename
	 *		- delete
	 *		- newdir
	 *		- sep-upload (for separator before upload panel)
	 *		- upload (for upload file item that does nothing)
	 *		- upload-panel (for upload panel)
	 * @return {Ext.menu.Item} menu item
	 */
	,getItemByCmd:function(cmd) {
		var open;
		var item = this.items.find(function(i) {
			return cmd === i.cmd;
		});
		if(!item) {
			open = this.items.find(function(i) {
				return 'open' === i.cmd;
			});
			if(!open) {
				return null;
			}
			item = open.menu.items.find(function(i) {
				return cmd === i.cmd;
			});
		}
		return item;
	} // eo function getItemByCmd
	// }}}
	// {{{
	/**
	 * Sets/Unsets item identified by cmd to disabled/enabled state
	 * @param {String} cmd Item indentifier, see getItemByCmd for explanation
	 * @param {Boolean} disabled true to disable the item
	 */
	,setItemDisabled:function(cmd, disabled) {
		var item = this.getItemByCmd(cmd);
		if(item) {
			item.setDisabled(disabled);
		}
	} // eo function setItemDisabled
	// }}}
	// {{{
	/**
	 * destroys uploadPanel if we have one
	 * @private
	 */
	,beforeDestroy:function() {
		var uploadPanel = this.getItemByCmd('upload-panel');
		if(uploadPanel && uploadPanel.component) {
			uploadPanel.component.purgeListeners();
			uploadPanel.component.destroy();
			uploadPanel.component = null;
		}
	} // eo function beforeDestroy
	// }}}

}); // eo extend

// register xtype
Ext.reg('filetreemenu', Ext.ux.FileTreeMenu);

// eof
/**
 * Ext.ux.FileTreePanel
 *
 * @author  Ing. Jozef SakÃ¡loÅ¡
 * @version $Id: Ext.ux.FileTreePanel.js 266 2008-05-18 23:24:47Z jozo $
 * @date    13. March 2008
 *
 * @license Ext.ux.FileTreePanel is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

/*global Ext, window, document, setTimeout */

/**
 * @class Ext.ux.FileTreePanel
 * @extends Ext.tree.TreePanel
 */

Ext.ux.FileTreePanel = Ext.extend(Ext.tree.TreePanel, {
	// config variables overridable from outside
	// {{{
	/**
	 * @cfg {Object} baseParams This object is not used directly by FileTreePanel but it is
	 * propagated to lower level objects instead. Included here for convenience.
	 */

	/**
	 * @cfg {String} confirmText Text to display as title of confirmation message box
	 */
	 confirmText:'Confirm'

	/**
	 * @cfg {Boolean} containerScroll true to register 
	 * this container with ScrollManager (defaults to true)
	 */
	,containerScroll:true

	/**
	 * @cfg {String} deleteText Delete text (for message box title or other displayed texts)
	 */
	,deleteText:'Delete'

	/**
	 * @cfg {String} deleteUrl URL to use when deleting; this.url is used if not set (defaults to undefined)
	 */

	/**
	 * @cfg {String} downloadUrl URL to use when downloading; this.url is used if not set (defaults to undefined)
	 */

	/**
	 * @cfg {Boolean} enableDD true to enable drag & drop of files and folders (defaults to true)
	 */
	,enableDD:true

	/**
	 * @cfg {Boolean) enableDelete true to enable to delete files and directories. 
	 * If false context menu item is not shown (defaults to true)
	 */
	,enableDelete:true

	/**
	 * @cfg {Boolean) enableNewDir true to enable to create new directory. 
	 * If false context menu item is not shown (defaults to true)
	 */
	,enableNewDir:true

	/**
	 * @cfg {Boolean) enableOpen true to enable open submenu
	 * If false context menu item is not shown (defaults to true)
	 */
	,enableOpen:true

	/**
	 * @cfg {Boolean} enableProgress true to enable querying server for progress information
	 * Passed to underlying uploader. Included here for convenience.
	 */
	,enableProgress:true

	/**
	 * @cfg {Boolean) enableRename true to enable to rename files and directories. 
	 * If false context menu item is not shown (defaults to true)
	 */
	,enableRename:true

	/**
	 * @cfg {Boolean} enableSort true to enable sorting of tree. See also folderSort (defaults to true)
	 */
	,enableSort:true

	/**
	 * @cfg {Boolean) enableUpload true to enable to upload files. 
	 * If false context menu item is not shown (defaults to true)
	 */
	,enableUpload:true

	/**
	 * @cfg {String} errorText Text to display for an error
	 */
	,errorText:'Error'

	/**
	 * @cfg {String} existsText Text to display in message box if file exists
	 */
	,existsText:'File <b>{0}</b> already exists'

	/**
	 * @cfg {Boolean} true to expand root node on FileTreePanel render (defaults to true)
	 */
	,expandOnRender:true

	/**
	 * @cfg {String} fileCls class prefix to add to nodes. "-extension" is appended to
	 * this prefix to form filetype class, for example: file-odt, file-pdf. These classes
	 * are used to display correct filetype icons in the tree. css file and icons must
	 * exist of course.
	 */
	,fileCls:'file'

	/**
	 * @cfg {String} fileText
	 */
	,fileText:'Documents'

	/**
	 * @cfg {Boolean} focusPopup true to focus new browser popup window for 'popup' openMode
	 * (defaults to true)
	 */
	,focusPopup:true

	/**
	 * @cfg {Boolean} folderSort true to place directories at the top of the tree (defaults to true)
	 */
	,folderSort:true

	/**
	 * @cfg {String} hrefPrefix Text to prepend before file href for file open command. 
	 * (defaults to '')
	 */
	,hrefPrefix:''

	/**
	 * @cfg {String} hrefSuffix Text to append to file href for file open command. 
	 * (defaults to '')
	 */
	,hrefSuffix:''

	/**
	 * @cfg {String} layout Layout to use for this panel (defaults to 'fit')
	 */
	,layout:'fit'

	/**
	 * @cfg {String} loadingText Text to use for load mask msg
	 */
	,loadingText:'Loading'

	/**
	 * @cfg {Boolean} loadMask True to mask tree panel while loading
	 */
	,loadMask:false

	/**
	 * @cfg {Number} maxFileSize Maximum upload file size in bytes
	 * This config property is propagated down to uploader for convenience
	 */
	,maxFileSize:524288

	/**
	 * @cfg {Number} maxMsgLen Maximum message length for message box (defaults to 2000).
	 * If message is longer Ext.util.Format.ellipsis is used to truncate it and append ...
	 */
	,maxMsgLen:2000

	/**
	 * @cfg {String} method Method to use when posting to server. Other valid value is 'get'
	 * (defaults to 'post')
	 */
	,method:'get'

	/**
	 * @cfg {String} newdirText Default name for new directories (defaults to 'New Folder')
	 */
	,newdirText:'New Folder'

	/**
	 * @cfg {String} newdirUrl URL to use when creating new directory; 
	 * this.url is used if not set (defaults to undefined)
	 */

	/**
	 * @cfg {String} openMode Default file open mode. This mode is used when user dblclicks 
	 * a file. Other valid values are '_self', '_blank' and 'download' (defaults to 'popup')
	 */
	,openMode:'new_tab'

	/**
	 * @cfg {String} overwriteText Text to use in overwrite confirmation message box
	 */
	,overwriteText:'Do you want to overwrite it?'

	/**
	 * @cfg {String} popupFeatures Features for new browser window opened by popup open mode
	 */
	,popupFeatures:'width=800,height=600,dependent=1,scrollbars=1,resizable=1,toolbar=1'

	/**
	 * @cfg {Boolean} readOnly true to disable write operations. treeEditor and context menu
	 * are not created if true (defaults to false)
	 */
	,readOnly:false

	/**
	 * @cfg {String} reallyWantText Text to display for that question
	 */
	,reallyWantText:'Do you really want to'

	/**
	 * @cfg {String} renameUrl URL to use when renaming; this.url is used if not set (defaults to undefined)
	 */

	/**
	 * @cfg {String} rootPath Relative path pointing to the directory that is root of this tree (defaults to 'root')
	 */
	,rootPath:'root'

	/**
	 * @cfg {String} rootText Text to display for root node (defaults to 'Tree Root')
	 */
	,rootText:'Root Folder'

	/**
	 * @cfg {Boolean} rootVisible true = root node visible, false = hidden (defaults to true)
	 */
	,rootVisible:true

	/**
	 * @cfg {Boolean} selectOnEdit true to select the edited text on edit start (defaults to true)
	 */
	,selectOnEdit:true

	/**
	 * @cfg {Boolean} singleUpload true to upload files in one form, false to upload one by one
	 * This config property is propagated down to uploader for convenience
	 */
	,singleUpload:false

	/**
	 * @cfg {Boolean} topMenu true to create top toolbar with menu in addition to contextmenu
	 */
	,topMenu:false

	/**
	 * @cfg {String} url URL to use when communicating with server
	 */
	,url: tx.data.documents_con.documents_upload_url
	// }}}

	// overrides
	// {{{
	/**
	 * called by Ext when instantiating
	 * @private
	 * @param {Object} config Configuration object
	 */
	,initComponent:function() {

		// {{{
		Ext.apply(this, {

			// create root node
			 root:new Ext.tree.AsyncTreeNode({
				 text:this.rootText
				,path:this.rootPath
				,rootVisible:this.rootVisible
				,allowDrag:false
			})

			// create treeEditor
			,treeEditor:!this.readOnly ? new Ext.tree.TreeEditor(this, {
				 allowBlank:false
				,cancelOnEsc:true
				,completeOnEnter:true
				,ignoreNoChange:true
				,selectOnFocus:this.selectOnEdit
			}) : undefined

			// drop config
			,dropConfig:this.dropConfig ? this.dropConfig : {
				 ddGroup:this.ddGroup || 'TreeDD'
				,appendOnly:this.enableSort
				,expandDelay:3600000 // do not expand on drag over node
			}

			// create treeSorter
			,treeSorter:this.enableSort ? new Ext.tree.TreeSorter(this, {folderSort:this.folderSort}) : undefined

			// {{{
			,keys:[{
				// Enter = open
				 key:Ext.EventObject.ENTER, scope:this
				,fn:function(key, e) {
					var sm = this.getSelectionModel();
					var node = sm.getSelectedNode();
					if(node && 0 !== node.getDepth() && node.isLeaf()) {
						this.openNode(node);
					}
			}},{
				// F2 = edit
				 key:113, scope:this
				,fn:function(key, e) {
					var sm = this.getSelectionModel();
					var node = sm.getSelectedNode();
					if(node && 0 !== node.getDepth() && this.enableRename && this.readOnly !== true) {
						this.treeEditor.triggerEdit(node);
					}
			}},{
				// Delete Key = Delete
				 key:46, stopEvent:true, scope:this
				,fn:function(key, e) {
					var sm = this.getSelectionModel();
					var node = sm.getSelectedNode();
					if(node && 0 !== node.getDepth() && this.enableDelete && this.readOnly !== true) {
						this.deleteNode(node);
					}
			}},{
				// Ctrl + E = reload
				 key:69, ctrl:true, stopEvent:true, scope:this
				,fn:function(key, e) {
					var sm = this.getSelectionModel();
					var node = sm.getSelectedNode();
					if(node) {
						node = node.isLeaf() ? node.parentNode : node;
						sm.select(node);
						node.reload();
					}
			}},{
				// Ctrl + -> = expand deep
				 key:39, ctrl:true, stopEvent:true, scope:this
				,fn:function(key, e) {
					var sm = this.getSelectionModel();
					var node = sm.getSelectedNode();
					if(node && !node.isLeaf()) {
						sm.select(node);
						node.expand.defer(1, node, [true]);
					}
				}},{
				// Ctrl + <- = collapse deep
				 key:37, ctrl:true, scope:this, stopEvent:true
				,fn:function(key, e) {
					var sm = this.getSelectionModel();
					var node = sm.getSelectedNode();
					if(node && !node.isLeaf()) {
						sm.select(node);
						node.collapse.defer(1, node, [true]);
					}
				}},{
				// Ctrl + N = New Directory
				 key:78, ctrl:true, scope:this, stopEvent:true
				,fn:function(key, e) {
					var sm, node;
					sm = this.getSelectionModel();
					node = sm.getSelectedNode();
					if(node && this.enableNewDir && this.readOnly !== true) {
						node = node.isLeaf() ? node.parentNode : node;
						this.createNewDir(node);
					}
			}}]
			// }}}

		}); // eo apply
		// }}}
		// {{{
		// create loader
		if(!this.loader) {
			this.loader = new Ext.tree.XDomainTreeLoader({	dataUrl:tx.data.documents_con.url, 
													preloadChildren: true,
													clearOnLoad: false,
													baseParams : {format : 'js', 
																  cmd:'get'},
													listeners:{
															beforeload:{scope:this, fn:function(loader, node) {
																loader.baseParams.path = this.getPath(node);
															}}
														}
													})
		}
		// }}}
		// {{{
		// install top menu if configured
		if(true === this.topMenu) {
			this.tbar = [{
				 text:this.fileText
				,disabled:true
				,scope:this
				,menu:this.getContextMenu()
			}];
		}
		// }}}

		// call parent
		Ext.ux.FileTreePanel.superclass.initComponent.apply(this, arguments);

		// {{{
		// install treeEditor event handlers 
		if(this.treeEditor) {
			// do not enter edit mode on selected node click
			this.treeEditor.beforeNodeClick = function(node,e){return true;};

			// treeEditor event handlers
			this.treeEditor.on({
				 complete:{scope:this, fn:this.onEditComplete}
				,beforecomplete:{scope:this, fn:this.onBeforeEditComplete}
			});
		}
		// }}}
		// {{{
		// install event handlers
		this.on({
			 contextmenu:{scope:this, fn:this.onContextMenu, stopEvent:true}
			,dblclick:{scope:this, fn:this.onDblClick}
			,beforenodedrop:{scope:this, fn:this.onBeforeNodeDrop}
			,nodedrop:{scope:this, fn:this.onNodeDrop}
			,nodedragover:{scope:this, fn:this.onNodeDragOver}
		});

		// }}}
		// {{{
		// add events
		this.addEvents(
			/**
			 * @event beforeopen
			 * Fires before file open. Return false to cancel the event
			 * @param {Ext.ux.FileTreePanel} this
			 * @param {String} fileName name of the file being opened
			 * @param {String} url url of the file being opened
			 * @param {String} mode open mode
			 */
			 'beforeopen'
			/**
			 * @event open
			 * Fires after file open has been initiated
			 * @param {Ext.ux.FileTreePanel} this
			 * @param {String} fileName name of the file being opened
			 * @param {String} url url of the file being opened
			 * @param {String} mode open mode
			 */
			,'open'
			/**
			 * @event beforerename
			 * Fires after the user completes file name editing 
			 * but before the file is renamed. Return false to cancel the event
			 * @param {Ext.ux.FileTreePanel} this
			 * @param {Ext.tree.AsyncTreeNode} node being renamed
			 * @param {String} newPath including file name 
			 * @param {String} oldPath including file name 
			 */
			,'beforerename'
			/**
			 * @event rename
			 * Fires after the file has been successfully renamed
			 * @param {Ext.ux.FileTreePanel} this
			 * @param {Ext.tree.AsyncTreeNode} node that has been renamed
			 * @param {String} newPath including file name 
			 * @param {String} oldPath including file name 
			 */
			,'rename'
			/**
			 * @event renamefailure
			 * Fires after a failure when renaming file
			 * @param {Ext.ux.FileTreePanel} this
			 * @param {Ext.tree.AsyncTreeNode} node rename of which failed
			 * @param {String} newPath including file name 
			 * @param {String} oldPath including file name 
			 */
			,'renamefailure'
			/**
			 * @event beforedelete
			 * Fires before a file or directory is deleted. Return false to cancel the event.
			 * @param {Ext.ux.FileTreePanel} this
			 * @param {Ext.tree.AsyncTreeNode} node being deleted
			 */
			,'beforedelete'
			/**
			 * @event delete
			 * Fires after a file or directory has been deleted
			 * @param {Ext.ux.FileTreePanel} this
			 * @param {String} path including file name that has been deleted
			 */
			,'delete'
			/**
			 * @event deletefailure
			 * Fires if node delete failed
			 * @param {Ext.ux.FileTreePanel} this
			 * @param {Ext.tree.AsyncTreeNode} node delete of which failed
			 */
			,'deletefailure'
			/**
			 * @event beforenewdir
			 * Fires before new directory is created. Return false to cancel the event
			 * @param {Ext.ux.FileTreePanel} this
			 * @param {Ext.tree.AsyncTreeNode} node under which the new directory is being created
			 */
			,'beforenewdir'
			/**
			 * @event newdir
			 * Fires after the new directory has been successfully created
			 * @param {Ext.ux.FileTreePanel} this
			 * @param {Ext.tree.AsyncTreeNode} new node/directory that has been created
			 */
			,'newdir'
			/**
			 * @event newdirfailure
			 * Fires if creation of new directory failed
			 * @param {Ext.ux.FileTreePanel} this
			 * @param {String} path creation of which failed
			 */
			,'newdirfailure'
		); // eo addEvents
		// }}}

	} // eo function initComponent
	// }}}
	// {{{
	/**
	 * onRender override - just expands root node if configured
	 * @private
	 */
	,onRender:function() {
		// call parent
		Ext.ux.FileTreePanel.superclass.onRender.apply(this, arguments);

		if(true === this.topMenu) {
			this.topMenu = Ext.getCmp(this.getTopToolbar().items.itemAt(0).id);
			this.getSelectionModel().on({
				 scope:this
				,selectionchange:function(sm, node) {
					var disable = node ? false : true;
					disable = disable || this.readOnly;
					this.topMenu.setDisabled(disable);
				}
			});
			Ext.apply(this.topMenu, {
				 showMenu:function() {
					this.showContextMenu(false);
				}.createDelegate(this)
//				,menu:this.getContextMenu()
			});
		}

		// expand root node if so configured
		if(this.expandOnRender) {
			this.root.expand();
		}

		// prevent default browser context menu to appear 
		this.el.on({
			contextmenu:{fn:function(){return false;},stopEvent:true}
		});

		// setup loading mask if configured
		if(true === this.loadMask) {
			this.loader.on({
				 scope:this.el
				,beforeload:this.el.mask.createDelegate(this.el, [this.loadingText + '...'])
				,load:this.el.unmask
				,loadexception:this.el.unmask
			});
		}

	} // eo function onRender
	// }}}

	// new methods
	// {{{
	/**
	 * runs after an Ajax requested command has completed/failed
	 * @private
	 * @param {Object} options Options used for the request
	 * @param {Boolean} success true if ajax call was successful (cmd may have failed)
	 * @param {Object} response ajax call response object
	 */
	,cmdCallback:function(options, success, response) {
		var i, o, node;
		var showMsg = true;

		// process Ajax success
		if(true === success) {

			// try to decode JSON response
			try {
				o = Ext.decode(response.responseText);
			}
			catch(ex) {
				this.showError(response.responseText);
			}

			// process command success
			if(true === o.success) {
				switch(options.params.cmd) {
					case 'delete':
						if(true !== this.eventsSuspended) {
							this.fireEvent('delete', this, this.getPath(options.node));
						}
						options.node.parentNode.removeChild(options.node);
					break;

					case 'newdir':
						if(true !== this.eventsSuspended) {
							this.fireEvent('newdir', this, options.node);
						}
					break;

					case 'rename':
						this.updateCls(options.node, options.params.oldname);
						if(true !== this.eventsSuspended) {
							this.fireEvent('rename', this, options.node, options.params.newname, options.params.oldname);
						}
					break;
				}
			} // eo process command success
			// process command failure
			else {
				switch(options.params.cmd) {

					case 'rename':
						// handle drag & drop rename error
						if(options.oldParent) {
							options.oldParent.appendChild(options.node);
						}
						// handle simple rename error
						else {
							options.node.setText(options.oldName);
						}
						// signal failure to onNodeDrop
						if(options.e) {
							options.e.failure = true;
						}
						if(true !== this.eventsSuspended) {
							this.fireEvent('renamefailure', this, options.node, options.params.newname, options.params.oldname);
						}
					break;

					case 'newdir':
						if(false !== this.eventsSuspended) {
							this.fireEvent('newdirfailure', this, options.params.dir);
						}
						options.node.parentNode.removeChild(options.node);
					break;

					case 'delete':
						if(true !== this.eventsSuspended) {
							this.fireEvent('deletefailure', this, options.node);
						}
						options.node.parentNode.reload.defer(1, options.node.parentNode);
					break;

					default:
						this.root.reload();
					break;
				}

				// show default message box with server error
				this.showError(o.error || response.responseText);
			} // eo process command failure
		} // eo process Ajax success

		// process Ajax failure
		else {
			this.showError(response.responseText);
		}
	} // eo function cmdCallback
	// }}}
	// {{{
	/**
	 * displays overwrite confirm msg box and runs passed callback if response is yes
	 * @private
	 * @param {String} filename File to overwrite
	 * @param {Function} callback Function to call on yes response
	 * @param {Object} scope Scope for callback (defaults to this)
	 */
	,confirmOverwrite:function(filename, callback, scope) {
		Ext.Msg.show({
			 title:this.confirmText
			,msg:String.format(this.existsText, filename) + '. ' + this.overwriteText
			,icon:Ext.Msg.QUESTION
			,buttons:Ext.Msg.YESNO
			,fn:callback.createDelegate(scope || this)
		});
	}
	// }}}
	// {{{
	/**
	 * creates new directory (node)
	 * @private
	 * @param {Ext.tree.AsyncTreeNode} node
	 */
	,createNewDir:function(node) {

		// fire beforenewdir event
		if(true !== this.eventsSuspended && false === this.fireEvent('beforenewdir', this, node)) {
			return;
		}

		var treeEditor = this.treeEditor;
		var newNode;

		// get node to append the new directory to
		var appendNode = node.isLeaf() ? node.parentNode : node;

		// create new folder after the appendNode is expanded
		appendNode.expand(false, false, function(n) {
			// create new node
			newNode = n.appendChild(new Ext.tree.AsyncTreeNode({text:this.newdirText, iconCls:'folder'}));

			// setup one-shot event handler for editing completed
			treeEditor.on({
				complete:{
					 scope:this
					,single:true
					,fn:this.onNewDir
				}}
			);

			// creating new directory flag
			treeEditor.creatingNewDir = true;

			// start editing after short delay
			(function(){treeEditor.triggerEdit(newNode);}.defer(10));
		// expand callback needs to run in this context
		}.createDelegate(this));

	} // eo function creatingNewDir
	// }}}
	// {{{
	/**
	 * deletes the passed node
	 * @private
	 * @param {Ext.tree.AsyncTreeNode} node
	 */
	,deleteNode:function(node) {
		// fire beforedelete event
		if(true !== this.eventsSuspended && false === this.fireEvent('beforedelete', this, node)) {
			return;
		}

		Ext.Msg.show({
			 title:this.deleteText
			,msg:this.reallyWantText + ' ' + this.deleteText.toLowerCase()  + ' <b>' + node.text + '</b>?'
			,icon:Ext.Msg.WARNING
			,buttons:Ext.Msg.YESNO
			,scope:this
			,fn:function(response) {
				// do nothing if answer is not yes
				if('yes' !== response) {
					this.getEl().dom.focus();
					return;
				}
				// setup request options
				var options = {
					 url:this.deleteUrl || this.url
					,method:this.method
					,scope:this
					,callback:this.cmdCallback
					,node:node
					,params:{
						 cmd:'delete'
						,file:this.getPath(node)
					}
				};
				Ext.Ajax.request(options);
			}
		});
	} // eo function deleteNode
	// }}}
	// {{{
	/**
	 * requests file download from server
	 * @private
	 * @param {String} path Full path including file name but relative to server root path
	 */
	,downloadFile:function(path) {

		// create hidden target iframe
		var id = Ext.id();
		var frame = document.createElement('iframe');
		frame.id = id;
		frame.name = id;
		frame.className = 'x-hidden';
		if(Ext.isIE) {
			frame.src = Ext.SSL_SECURE_URL;
		}

		document.body.appendChild(frame);

		if(Ext.isIE) {
			document.frames[id].name = id;
		}

		var form = Ext.DomHelper.append(document.body, {
			 tag:'form'
			,method:'post'
			,action:this.downloadUrl || this.url
			,target:id
		});

		document.body.appendChild(form);

		var hidden;

		// append cmd to form
		hidden = document.createElement('input');
		hidden.type = 'hidden';
		hidden.name = 'cmd';
		hidden.value = 'download';
		form.appendChild(hidden);

		// append path to form
		hidden = document.createElement('input');
		hidden.type = 'hidden';
		hidden.name = 'path';
		hidden.value = path;
		form.appendChild(hidden);

		var callback = function() {
			Ext.EventManager.removeListener(frame, 'load', callback, this);
			setTimeout(function() {document.body.removeChild(form);}, 100);
			setTimeout(function() {document.body.removeChild(frame);}, 110);
		};
		
		Ext.EventManager.on(frame, 'load', callback, this);

		form.submit();
	}
	// }}}
	// {{{
	/**
	 * returns (and lazy create) the context menu
	 * @private
	 */
	,getContextMenu:function() {
		// lazy create context menu
		if(!this.contextmenu) {
			var config = {
				 singleUpload:this.singleUpload
				,maxFileSize:this.maxFileSize
				,enableProgress:this.enableProgress
			};
			if(this.baseParams) {
				config.baseParams = this.baseParams;
			}
			this.contextmenu = new Ext.ux.FileTreeMenu(config);
			this.contextmenu.on({click:{scope:this, fn:this.onContextClick}});

			this.uploadPanel = this.contextmenu.getItemByCmd('upload-panel').component;
			this.uploadPanel.on({
				 beforeupload:{scope:this, fn:this.onBeforeUpload}
				,allfinished:{scope:this, fn:this.onAllFinished}
			});
			this.uploadPanel.setUrl(this.uploadUrl || this.url);
		}
		return this.contextmenu;
	} // eo function getContextMenu
	// }}}
	// {{{
	/**
	 * returns file class based on name extension
	 * @private
	 * @param {String} name File name to get class of
	 */
	,getFileCls:function(name) {
		var atmp = name.split('.');
		if(1 === atmp.length) {
			return this.fileCls;
		}
		else {
			return this.fileCls + '-' + atmp.pop().toLowerCase();
		}
	}
	// }}}
	// {{{
	/**
	 * returns path of node (file/directory)
	 * @private
	 */
	,getPath:function(node) {
		var path, p, a;

		// get path for non-root node
		if(node !== this.root) {
			p = node.parentNode;
			a = [node.text];
			while(p && p !== this.root) {
				a.unshift(p.text);
				p = p.parentNode;
			}
			a.unshift(this.root.attributes.path || '');
			path = a.join(this.pathSeparator);
		}

		// path for root node is it's path attribute
		else {
			path = node.attributes.path || '';
		}

		// a little bit of security: strip leading / or .
		// full path security checking has to be implemented on server
		path = path.replace(/^[\/\.]*/, '');
		return path;
	} // eo function getPath
	// }}}
	// {{{
	/**
	 * returns true if node has child with the specified name (text)
	 * @private
	 * @param {Ext.data.Node} node
	 * @param {String} childName
	 */
	,hasChild:function(node, childName) {
		return (node.isLeaf() ? node.parentNode : node).findChild('text', childName) !== null;
	}
	// }}}
	// {{{
	/**
	 * Hides context menu
	 * @return {Ext.ux.FileTreeMenu} this
	 */
	,hideContextMenu:function() {
		if(this.contextmenu && this.contextmenu.isVisible()) {
			this.contextmenu.hide();
		}
		return this;
	} // eo function hideContextMenu
	// }}}
	// {{{
	/**
	 * called before editing is completed - allows edit cancellation
	 * @private
	 * @param {TreeEditor} editor
	 * @param {String} newName
	 * @param {String} oldName
	 */
	,onBeforeEditComplete:function(editor, newName, oldName) {
		if(editor.cancellingEdit) {
			editor.cancellingEdit = false;
			return;
		}
		var oldPath = this.getPath(editor.editNode);
		var newPath = oldPath.replace(/\/[^\\]+$/, '/' + newName);

		if(false === this.fireEvent('beforerename', this, editor.editNode, newPath, oldPath)) {
			editor.cancellingEdit = true;
			editor.cancelEdit();
			return false;
		}
	}
	// }}}
	// {{{
	/**
	 * runs before node is dropped
	 * @private
	 * @param {Object} e dropEvent object
	 */
	,onBeforeNodeDrop:function(e) {

		// source node, node being dragged
		var s = e.dropNode;

		// destination node (dropping on this node)
		var d = e.target.leaf ? e.target.parentNode : e.target;

		// node has been dropped within the same parent
		if(s.parentNode === d) {
			return false;
		}

		// check if same name exists in the destination
		// this works only if destination node is loaded
		if(this.hasChild(d, s.text) && undefined === e.confirmed) {
			this.confirmOverwrite(s.text, function(response) {
				e.confirmed = 'yes' === response;
				this.onBeforeNodeDrop(e);
			});
			return false;
		}
		if(false === e.confirmed) {
			return false;
		}

		e.confirmed = undefined;
		e.oldParent = s.parentNode;

		var oldName = this.getPath(s);
		var newName = this.getPath(d) + '/' + s.text;

		// fire beforerename event
		if(true !== this.eventsSuspended && false === this.fireEvent('beforerename', this, s, newName, oldName)) {
			return false;
		}

		var options = {
			 url:this.renameUrl || this.url
			,method:this.method
			,scope:this
			,callback:this.cmdCallback
			,node:s
			,oldParent:s.parentNode
			,e:e
			,params:{
				 cmd:'rename'
				,oldname:oldName
				,newname:newName
			}
		};
		Ext.Ajax.request(options);
		return true;
	}
	// }}}
	// {{{
	/**
	 * sets uploadPanel's destination path
	 * @private
	 */
	,onBeforeUpload:function(uploadPanel) {

		var menu = this.getContextMenu();
		var path = this.getPath(menu.node);
		if(menu.node.isLeaf()) {
			path = path.replace(/\/[^\/]+$/, '', path);
		}
		uploadPanel.setPath(path);

	} // eo function onBeforeUpload
	// }}}
	// {{{
	/**
	 * reloads tree node on upload finish
	 * @private
	 */
	,onAllFinished:function(uploader) {
		var menu = this.getContextMenu();
		(menu.node.isLeaf() ? menu.node.parentNode : menu.node).reload();
	} // eo function onAllFinished
	// }}}
	// {{{
	/**
	 * @private
	 * context menu click handler
	 * @param {Ext.menu.Menu} context menu
	 * @param {Ext.menu.Item} item clicked
	 * @param {Ext.EventObject} raw event
	 */
	,onContextClick:function(menu, item, e) {
		if(item.disabled) {
			return;
		}
		var node = menu.node;
		if(!node) {
			node = menu.parentMenu.node;
		}
		switch(item.cmd) {
			case 'reload':
				node.reload();
			break;

			case 'expand':
				node.expand(true);
			break;

			case 'collapse':
				node.collapse(true);
			break;

			case 'open':
				this.openNode(node);
			break;

			case 'open-self':
				this.openNode(node, '_self');
			break;

			case 'open-popup':
				this.openNode(node, 'popup');
			break;

			case 'open-blank':
				this.openNode(node, '_blank');
			break;

			case 'open-dwnld':
				this.openNode(node, 'download');
			break;

			case 'rename':
				this.treeEditor.triggerEdit(node);
			break;

			case 'delete':
				this.deleteNode(node);
			break;

			case 'newdir':
				this.createNewDir(node);
			break;

			default:
			break;
		}
	} // eo function onContextClick
	// }}}
	// {{{
	/**
	 * contextmenu event handler
	 * @private
	 */
	,onContextMenu:function(node, e) {
		if(this.readOnly) {
			return false;
		}
		this.showContextMenu(node);

		return false;
	} // eo function onContextMenu
	// }}}
	// {{{
	/**
	 * dblclick handlers
	 * @private
	 */
	,onDblClick:function(node, e) {
		this.openNode(node);
	} // eo function onDblClick
	// }}}
	// {{{
	/**
	 * Destroys the FileTreePanel and sub-components
	 * @private
	 */
	,onDestroy:function() {

		// destroy contextmenu
		if(this.contextmenu) {
			this.contextmenu.purgeListeners();
			this.contextmenu.destroy();
			this.contextmenu = null;
		}

		// destroy treeEditor
		if(this.treeEditor) {
			this.treeEditor.purgeListeners();
			this.treeEditor.destroy();
			this.treeEditor = null;
		}

		// remover reference to treeSorter
		if(this.treeSorter) {
			this.treeSorter = null;
		}

		// call parent
		Ext.ux.FileTreePanel.superclass.onDestroy.call(this);

	} // eo function onDestroy
	// }}}
	// {{{
	/**
	 * runs when editing of a node (rename) is completed
	 * @private
	 * @param {Ext.Editor} editor
	 * @param {String} newName
	 * @param {String} oldName
	 */
	,onEditComplete:function(editor, newName, oldName) {

		var node = editor.editNode;

		if(newName === oldName || editor.creatingNewDir) {
			editor.creatingNewDir = false;
			return;
		}
		var path = this.getPath(node.parentNode);
		var options = {
			 url:this.renameUrl || this.url
			,method:this.method
			,scope:this
			,callback:this.cmdCallback
			,node:node
			,oldName:oldName
			,params:{
				 cmd:'rename'
				,oldname:path + '/' + oldName
				,newname:path + '/' + newName
			}
		};
		Ext.Ajax.request(options);
	}
	// }}}
	// {{{
	/**
	 * create new directory handler
	 * @private
	 * runs after editing of new directory name is completed
	 * @param {Ext.Editor} editor
	 */
	,onNewDir:function(editor) {
		var path = this.getPath(editor.editNode);
		var options = {
			 url:this.newdirUrl || this.url
			,method:this.method
			,scope:this
			,node:editor.editNode
			,callback:this.cmdCallback
			,params:{
				 cmd:'newdir'
				,dir:path
			}
		};
		Ext.Ajax.request(options);
	}
	// }}}
	// {{{
	/**
	 * called while dragging over, decides if drop is allowed
	 * @private
	 * @param {Object} dd event
	 */
	,onNodeDragOver:function(e) {
		e.cancel = e.target.disabled || e.dropNode.parentNode === e.target.parentNode && e.target.isLeaf();
	} // eo function onNodeDragOver
	// }}}
	// {{{
	/**
	 * called when node is dropped
	 * @private
	 * @param {Object} dd event
	 */
	,onNodeDrop:function(e) {

		// failure can be signalled by cmdCallback
		// put drop node to the original parent in that case
		if(true === e.failure) {
			e.oldParent.appendChild(e.dropNode);
			return;
		}

		// if we already have node with the same text, remove the duplicate
		var sameNode = e.dropNode.parentNode.findChild('text', e.dropNode.text);
		if(sameNode && sameNode !== e.dropNode) {
			sameNode.parentNode.removeChild(sameNode);
		}
	}
	// }}}
	// {{{
	/**
	 * Opens node
	 * @param {Ext.tree.AsyncTreeNode} node
	 * @param {String} mode Can be "_self", "_blank", or "popup". Defaults to (this.openMode)
	 */
	,openNode:function(node, mode) {

		if(!this.enableOpen) {
			return;
		}

		mode = mode || this.openMode;

		var url;
		var path;
		if(node.isLeaf()) {
			path = this.getPath(node);
			url = this.hrefPrefix + path + this.hrefSuffix;

			// fire beforeopen event
			if(true !== this.eventsSuspended && false === this.fireEvent('beforeopen', this, node.text, url, mode)) {
				return;
			}

			switch(mode) {
				case 'popup':
					if(!this.popup || this.popup.closed) {
						this.popup = window.open(url, this.hrefTarget, this.popupFeatures);
					}
					this.popup.location = url;
					if(this.focusPopup) {
						this.popup.focus();
					}
				break;

				case '_self':
					window.location = url;
				break;

				case '_blank':
					window.open(url);
				break;

				case 'download':
					this.downloadFile(path);
				break;
				
				case 'new_tab' : 
					Ext.getCmp('document-body').loadClass(url, node.text);
				break;
			}

			// fire open event
			if(true !== this.eventsSuspended) {
				this.fireEvent('open', this, node.text, url, mode);
			}
		}

	}
	// }}}
	// {{{
	/**
	 * Sets/Unsets delete of files/directories disabled/enabled
	 * @param {Boolean} disabled
	 * @return {Ext.ux.FileTreePanel} this
	 */
	,setDeleteDisabled:function(disabled) {
		disabled = !(!disabled);
		if(!this.enableDelete === disabled) {
			return this;
		}
		this.hideContextMenu();
		this.enableDelete = !disabled;
	} // eo function setDeleteDisabled
	// }}}
	// {{{
	/**
	 * Sets/Unsets creation of new directory disabled/enabled
	 * @param {Boolean} disabled
	 * @return {Ext.ux.FileTreePanel} this
	 */
	,setNewdirDisabled:function(disabled) {
		disabled = !(!disabled);
		if(!this.enableNewDir === disabled) {
			return this;
		}
		this.hideContextMenu();
		this.enableNewDir = !disabled;

	} // eo function setNewdirDisabled
	// }}}
	// {{{
	/**
	 * Sets/Unsets open files disabled/enabled
	 * @param {Boolean} disabled
	 * @return {Ext.ux.FileTreePanel} this
	 */
	,setOpenDisabled:function(disabled) {
		disabled = !(!disabled);
		if(!this.enableOpen === disabled) {
			return this;
		}
		this.hideContextMenu();
		this.enableOpen = !disabled;

		return this;
	} // eo function setOpenDisabled
	// }}}
	// {{{
	/**
	 * Sets/Unsets this tree to/from readOnly state
	 * @param {Boolean} readOnly
	 * @return {Ext.ux.FileTreePanel} this
	 */
	,setReadOnly:function(readOnly) {
		readOnly = !(!readOnly);
		if(this.readOnly === readOnly) {
			return this;
		}
		this.hideContextMenu();
		if(this.dragZone) {
			this.dragZone.locked = readOnly;
		}
		this.readOnly = readOnly;

		return this;

	} // eo function setReadOnly
	// }}}
	// {{{
	/**
	 * Sets/Unsets rename of files/directories disabled/enabled
	 * @param {Boolean} disabled
	 * @return {Ext.ux.FileTreePanel} this
	 */
	,setRenameDisabled:function(disabled) {
		disabled = !(!disabled);
		if(!this.enableRename === disabled) {
			return this;
		}
		this.hideContextMenu();
		if(this.dragZone) {
			this.dragZone.locked = disabled;
		}
		this.enableRename = !disabled;

		return this;
	} // eo function setRenameDisabled
	// }}}
	// {{{
	/**
	 * Sets/Unsets uploading of files disabled/enabled
	 * @param {Boolean} disabled
	 * @return {Ext.ux.FileTreePanel} this
	 */
	,setUploadDisabled:function(disabled) {
		disabled = !(!disabled);
		if(!this.enableUpload === disabled) {
			return this;
		}
		this.hideContextMenu();
		this.enableUpload = !disabled;

		return this;
	} // of function setUploadDisabled
	// }}}
	// {{{
	/**
	 * adjusts context menu depending on many things and shows it
	 * @private
	 * @param {Ext.tree.AsyncTreeNode} node Node on which was right-clicked
	 */
	,showContextMenu:function(node) {

		// setup node alignment
		var topAlign = false;
		var alignEl = this.topMenu ? this.topMenu.getEl() : this.body;

		if(!node) {
			node = this.getSelectionModel().getSelectedNode();
			topAlign = true;
		}
		else {
			alignEl = node.getUI().getEl();
		}
		if(!node) {
			return;
		}

		var menu = this.getContextMenu();
		menu.node = node;

		// set node name
		menu.getItemByCmd('nodename').setText(Ext.util.Format.ellipsis(node.text, 22));

		// enable/disable items depending on node clicked
		menu.setItemDisabled('open', !node.isLeaf());
		menu.setItemDisabled('reload', node.isLeaf());
		menu.setItemDisabled('expand', node.isLeaf());
		menu.setItemDisabled('collapse', node.isLeaf());
		menu.setItemDisabled('delete', node === this.root || node.disabled);
		menu.setItemDisabled('rename', this.readOnly || node === this.root || node.disabled);
		menu.setItemDisabled('newdir', this.readOnly || (node.isLeaf() ? node.parentNode.disabled : node.disabled));
		menu.setItemDisabled('upload', node.isLeaf() ? node.parentNode.disabled : node.disabled);
		menu.setItemDisabled('upload-panel', node.isLeaf() ? node.parentNode.disabled : node.disabled);
		
		// show/hide logic
		menu.getItemByCmd('open').setVisible(this.enableOpen);
		menu.getItemByCmd('delete').setVisible(this.enableDelete);
		menu.getItemByCmd('newdir').setVisible(this.enableNewDir);
		menu.getItemByCmd('rename').setVisible(this.enableRename);
		menu.getItemByCmd('upload').setVisible(this.enableUpload);
		menu.getItemByCmd('upload-panel').setVisible(this.enableUpload);
		menu.getItemByCmd('sep-upload').setVisible(this.enableUpload);
		menu.getItemByCmd('sep-collapse').setVisible(this.enableNewDir || this.enableDelete || this.enableRename);

		// select node
		node.select();

		// show menu
		if(topAlign) {
			menu.showAt(menu.getEl().getAlignToXY(alignEl, 'tl-bl?'));
		}
		else {
			menu.showAt(menu.getEl().getAlignToXY(alignEl, 'tl-tl?', [0, 18]));
		}
	} // eo function 
	// }}}
	// {{{
	/**
	 * universal show error function
	 * @private
	 * @param {String} msg message
	 * @param {String} title title
	 */
	,showError:function(msg, title) {
		Ext.Msg.show({
			 title:title || this.errorText
			,msg:Ext.util.Format.ellipsis(msg, this.maxMsgLen)
			,fixCursor:true
			,icon:Ext.Msg.ERROR
			,buttons:Ext.Msg.OK
			,minWidth:1200 > String(msg).length ? 360 : 600
		});
	} // eo function showError
	// }}}
	// {{{
	/**
	 * updates class of leaf after rename
	 * @private
	 * @param {Ext.tree.AsyncTreeNode} node Node to update class of
	 * @param {String} oldName Name the node had before
	 */
	,updateCls:function(node, oldName) {
		if(node.isLeaf()) {
			Ext.fly(node.getUI().iconNode).removeClass(this.getFileCls(oldName));
			Ext.fly(node.getUI().iconNode).addClass(this.getFileCls(node.text));
		}
	}
	// }}}

}); // eo extend

// register xtype
Ext.reg('filetreepanel', Ext.ux.FileTreePanel);

// eof


/**********************************************************************************************************/
/**
 * Copyright (c) 2008, Steven Chim
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * 
 *     * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *     * The names of its contributors may not be used to endorse or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
  * Ext.ux.form.Spinner Class
	*
	* @author  Steven Chim
	* @version Spinner.js 2008-08-27 v0.35
  *
  * @class Ext.ux.form.Spinner
  * @extends Ext.form.TriggerField
  */

Ext.namespace("Ext.ux.form");

Ext.ux.form.Spinner = function(config){
	Ext.ux.form.Spinner.superclass.constructor.call(this, config);
	this.addEvents({
		'spin' : true,
		'spinup' : true,
		'spindown' : true
	});
}

Ext.extend(Ext.ux.form.Spinner, Ext.form.TriggerField, {
	triggerClass : 'x-form-spinner-trigger',
	splitterClass : 'x-form-spinner-splitter',

	alternateKey : Ext.EventObject.shiftKey,
	strategy : undefined,

	//private
	onRender : function(ct, position){
		Ext.ux.form.Spinner.superclass.onRender.call(this, ct, position);

		this.splitter = this.wrap.createChild({tag:'div', cls:this.splitterClass, style:'width:13px; height:2px;'});
		this.splitter.show().setRight( (Ext.isIE) ? 1 : 2 );
		this.splitter.show().setTop(10);

		this.proxy = this.trigger.createProxy('', this.splitter, true);
		this.proxy.addClass("x-form-spinner-proxy");
		this.proxy.setStyle('left','0px');  
		this.proxy.setSize(14, 1);
		this.proxy.hide();
		this.dd = new Ext.dd.DDProxy(this.splitter.dom.id, "SpinnerDrag", {dragElId: this.proxy.id});

		this.initSpinner();
	},

	//private
	initTrigger : function(){
		this.trigger.addClassOnOver('x-form-trigger-over');
		this.trigger.addClassOnClick('x-form-trigger-click');
	},

	//private
	initSpinner : function(){
		this.keyNav = new Ext.KeyNav(this.el, {
			"up" : function(e){
				e.preventDefault();
				this.onSpinUp();
			},

			"down" : function(e){
				e.preventDefault();
				this.onSpinDown();
			},

			"pageUp" : function(e){
				e.preventDefault();
				this.onSpinUpAlternate();
			},

			"pageDown" : function(e){
				e.preventDefault();
				this.onSpinDownAlternate();
			},

			scope : this
		});

		this.repeater = new Ext.util.ClickRepeater(this.trigger);
		this.repeater.on("click", this.onTriggerClick, this, {preventDefault:true});
		this.trigger.on("mouseover", this.onMouseOver, this, {preventDefault:true});
		this.trigger.on("mouseout",  this.onMouseOut,  this, {preventDefault:true});
		this.trigger.on("mousemove", this.onMouseMove, this, {preventDefault:true});
		this.trigger.on("mousedown", this.onMouseDown, this, {preventDefault:true});
		this.trigger.on("mouseup",   this.onMouseUp,   this, {preventDefault:true});
		this.wrap.on("mousewheel",   this.handleMouseWheel, this);

		this.dd.setXConstraint(0, 0, 10)
		this.dd.setYConstraint(1500, 1500, 10);
		this.dd.endDrag = this.endDrag.createDelegate(this);
		this.dd.startDrag = this.startDrag.createDelegate(this);
		this.dd.onDrag = this.onDrag.createDelegate(this);

        /*
        jsakalos suggestion
        http://extjs.com/forum/showthread.php?p=121850#post121850 */
        if('object' == typeof this.strategy && this.strategy.xtype) {
            switch(this.strategy.xtype) {
                case 'number':
                    this.strategy = new Ext.ux.form.Spinner.NumberStrategy(this.strategy);
	                break;

                case 'date':
                    this.strategy = new Ext.ux.form.Spinner.DateStrategy(this.strategy);
	                break;

                case 'time':
                    this.strategy = new Ext.ux.form.Spinner.TimeStrategy(this.strategy);
                	break;

                default:
                    delete(this.strategy);
                	break;
            }
            delete(this.strategy.xtype);
        }

		if(this.strategy == undefined){
			this.strategy = new Ext.ux.form.Spinner.NumberStrategy();
		}
	},

	//private
	onMouseOver : function(){
		if(this.disabled){
			return;
		}
		var middle = this.getMiddle();
		this.__tmphcls = (Ext.EventObject.getPageY() < middle) ? 'x-form-spinner-overup' : 'x-form-spinner-overdown';
		this.trigger.addClass(this.__tmphcls);
	},

	//private
	onMouseOut : function(){
		this.trigger.removeClass(this.__tmphcls);
	},

	//private
	onMouseMove : function(){
		if(this.disabled){
			return;
		}
		var middle = this.getMiddle();
		if( ((Ext.EventObject.getPageY() > middle) && this.__tmphcls == "x-form-spinner-overup") ||
			((Ext.EventObject.getPageY() < middle) && this.__tmphcls == "x-form-spinner-overdown")){
		}
	},

	//private
	onMouseDown : function(){
		if(this.disabled){
			return;
		}
		var middle = this.getMiddle();
		this.__tmpccls = (Ext.EventObject.getPageY() < middle) ? 'x-form-spinner-clickup' : 'x-form-spinner-clickdown';
		this.trigger.addClass(this.__tmpccls);
	},

	//private
	onMouseUp : function(){
		this.trigger.removeClass(this.__tmpccls);
	},

	//private
	onTriggerClick : function(){
		if(this.disabled || this.getEl().dom.readOnly){
			return;
		}
		var middle = this.getMiddle();
		var ud = (Ext.EventObject.getPageY() < middle) ? 'Up' : 'Down';
		this['onSpin'+ud]();
	},

	//private
	getMiddle : function(){
		var t = this.trigger.getTop();
		var h = this.trigger.getHeight();
		var middle = t + (h/2);
		return middle;
	},
	
	//private
	//checks if control is allowed to spin
	isSpinnable : function(){
		if(this.disabled || this.getEl().dom.readOnly){
			Ext.EventObject.preventDefault();	//prevent scrolling when disabled/readonly
			return false;
		}
		return true;
	},

	handleMouseWheel : function(e){
		//disable scrolling when not focused
		if(this.wrap.hasClass('x-trigger-wrap-focus') == false){
			return;
		}

		var delta = e.getWheelDelta();
		if(delta > 0){
			this.onSpinUp();
			e.stopEvent();
		} else if(delta < 0){
			this.onSpinDown();
			e.stopEvent();
		}
	},

	//private
	startDrag : function(){
		this.proxy.show();
		this._previousY = Ext.fly(this.dd.getDragEl()).getTop();
	},

	//private
	endDrag : function(){
		this.proxy.hide();
	},

	//private
	onDrag : function(){
		if(this.disabled){
			return;
		}
		var y = Ext.fly(this.dd.getDragEl()).getTop();
		var ud = '';

		if(this._previousY > y){ud = 'Up';}         //up
		if(this._previousY < y){ud = 'Down';}       //down

		if(ud != ''){
			this['onSpin'+ud]();
		}

		this._previousY = y;
	},

	//private
	onSpinUp : function(){
		if(this.isSpinnable() == false) {
			return;
		}
		if(Ext.EventObject.shiftKey == true){
			this.onSpinUpAlternate();
			return;
		}else{
			this.strategy.onSpinUp(this);
		}
		this.fireEvent("spin", this);
		this.fireEvent("spinup", this);
	},

	//private
	onSpinDown : function(){
		if(this.isSpinnable() == false) {
			return;
		}
		if(Ext.EventObject.shiftKey == true){
			this.onSpinDownAlternate();
			return;
		}else{
			this.strategy.onSpinDown(this);
		}
		this.fireEvent("spin", this);
		this.fireEvent("spindown", this);
	},

	//private
	onSpinUpAlternate : function(){
		if(this.isSpinnable() == false) {
			return;
		}
		this.strategy.onSpinUpAlternate(this);
		this.fireEvent("spin", this);
		this.fireEvent("spinup", this);
	},

	//private
	onSpinDownAlternate : function(){
		if(this.isSpinnable() == false) {
			return;
		}
		this.strategy.onSpinDownAlternate(this);
		this.fireEvent("spin", this);
		this.fireEvent("spindown", this);
	}

});

Ext.reg('uxspinner', Ext.ux.form.Spinner);
/**********************************************************************************************************/
/**
 * Copyright (c) 2008, Steven Chim
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * 
 *     * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *     * The names of its contributors may not be used to endorse or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/***
 * Abstract Strategy
 */
Ext.ux.form.Spinner.Strategy = function(config){
	Ext.apply(this, config);
};

Ext.extend(Ext.ux.form.Spinner.Strategy, Ext.util.Observable, {
	defaultValue : 0,
	minValue : undefined,
	maxValue : undefined,
	incrementValue : 1,
	alternateIncrementValue : 5,
	validationTask : new Ext.util.DelayedTask(),
	
	onSpinUp : function(field){
		this.spin(field, false, false);
	},

	onSpinDown : function(field){
		this.spin(field, true, false);
	},

	onSpinUpAlternate : function(field){
		this.spin(field, false, true);
	},

	onSpinDownAlternate : function(field){
		this.spin(field, true, true);
	},

	spin : function(field, down, alternate){
		this.validationTask.delay(500, function(){field.validate()});
		//extend
	},

	fixBoundries : function(value){
		return value;
		//overwrite
	}
	
});

/***
 * Concrete Strategy: Numbers
 */
Ext.ux.form.Spinner.NumberStrategy = function(config){
	Ext.ux.form.Spinner.NumberStrategy.superclass.constructor.call(this, config);
};

Ext.extend(Ext.ux.form.Spinner.NumberStrategy, Ext.ux.form.Spinner.Strategy, {

    allowDecimals : true,
    decimalPrecision : 2,
    
	spin : function(field, down, alternate){
		Ext.ux.form.Spinner.NumberStrategy.superclass.spin.call(this, field, down, alternate);

		var v = parseFloat(field.getValue());
		var incr = (alternate == true) ? this.alternateIncrementValue : this.incrementValue;

		(down == true) ? v -= incr : v += incr ;
		v = (isNaN(v)) ? this.defaultValue : v;
		v = this.fixBoundries(v);
		field.setRawValue(v);
	},

	fixBoundries : function(value){
		var v = value;

		if(this.minValue != undefined && v < this.minValue){
			v = this.minValue;
		}
		if(this.maxValue != undefined && v > this.maxValue){
			v = this.maxValue;
		}

		return this.fixPrecision(v);
	},
	
    // private
    fixPrecision : function(value){
        var nan = isNaN(value);
        if(!this.allowDecimals || this.decimalPrecision == -1 || nan || !value){
            return nan ? '' : value;
        }
        return parseFloat(parseFloat(value).toFixed(this.decimalPrecision));
    }
});


/***
 * Concrete Strategy: Date
 */
Ext.ux.form.Spinner.DateStrategy = function(config){
	Ext.ux.form.Spinner.DateStrategy.superclass.constructor.call(this, config);
};

Ext.extend(Ext.ux.form.Spinner.DateStrategy, Ext.ux.form.Spinner.Strategy, {
	defaultValue : new Date(),
	format : "Y-m-d",
	incrementValue : 1,
	incrementConstant : Date.DAY,
	alternateIncrementValue : 1,
	alternateIncrementConstant : Date.MONTH,

	spin : function(field, down, alternate){
		Ext.ux.form.Spinner.DateStrategy.superclass.spin.call(this);

		var v = field.getRawValue();
		
		v = Date.parseDate(v, this.format);
		var dir = (down == true) ? -1 : 1 ;
		var incr = (alternate == true) ? this.alternateIncrementValue : this.incrementValue;
		var dtconst = (alternate == true) ? this.alternateIncrementConstant : this.incrementConstant;

		if(typeof this.defaultValue == 'string'){
			this.defaultValue = Date.parseDate(this.defaultValue, this.format);
		}

		v = (v) ? v.add(dtconst, dir*incr) : this.defaultValue;

		v = this.fixBoundries(v);
		field.setRawValue(Ext.util.Format.date(v,this.format));
	},
	
	//private
	fixBoundries : function(date){
		var dt = date;
		var min = (typeof this.minValue == 'string') ? Date.parseDate(this.minValue, this.format) : this.minValue ;
		var max = (typeof this.maxValue == 'string') ? Date.parseDate(this.maxValue, this.format) : this.maxValue ;

		if(this.minValue != undefined && dt < min){
			dt = min;
		}
		if(this.maxValue != undefined && dt > max){
			dt = max;
		}

		return dt;
	}

});


/***
 * Concrete Strategy: Time
 */
Ext.ux.form.Spinner.TimeStrategy = function(config){
	Ext.ux.form.Spinner.TimeStrategy.superclass.constructor.call(this, config);
};

Ext.extend(Ext.ux.form.Spinner.TimeStrategy, Ext.ux.form.Spinner.DateStrategy, {
	format : "H:i",
	incrementValue : 1,
	incrementConstant : Date.MINUTE,
	alternateIncrementValue : 1,
	alternateIncrementConstant : Date.HOUR
});

/***
 * Concrete Strategy: Month
 */
Ext.ux.form.Spinner.MonthStrategy = function(config){
	Ext.ux.form.Spinner.DateStrategy.superclass.constructor.call(this, config);
};

Ext.extend(Ext.ux.form.Spinner.MonthStrategy, Ext.ux.form.Spinner.DateStrategy, {
	defaultValue : new Date(),
	format : "Y-m",
	incrementValue : 1,
	incrementConstant : Date.MONTH,
	alternateIncrementValue : 1,
	alternateIncrementConstant : Date.YEAR
});
/**********************************************************************************************************/
Ext.tree.TreePanel.prototype.reload = function () {
    // traverse expanded nodes and update baseParams object
    var loader = this.getLoader();
    loader.baseParams.expanded=this.root.getExpandedString();
    loader.load(this.root);
}
Ext.tree.TreeNode.prototype.getExpandedString = function () {
    var tmp="",node;
    for (var i=0; i<this.childNodes.length; i++) {
        node=this.childNodes[i];
        if (node.isExpanded() && !node.isLeaf()) {
            if (tmp.length>0)    tmp+=",";
            tmp+=node.getExpandedString();
        }
    }
    if (tmp.length>0)   return [this.id,":{",tmp,"}"].join('');
    return this.id;
}

/*
 * CategoriesList
 */
BloneyInfra = {};
BloneyInfra.Tree = function(config) {

	Ext.apply(this, config);
	this.lockCategories = false;

	BloneyInfra.Tree.superclass.constructor.call(this, {
				iconCls         : "icon-el",
				collapsible     : false,
				collapseFirst	: false,
				collapseMode	: 'mini',
				animCollapse	: true,
				animate         : true,
				layout			:'fit',
				lines			: false,
				rootVisible		: false,
				autoScroll      : true,
				split           : false,
				enableDD        : true,
				ddGroup         : 'component',
				containerScroll : true
 	});

	new Ext.tree.TreeSorter(this,{
		folderSort:false
		,caseSensitive :false
		//,leafAttr:id
		//,dir : "desc"
		//,property:id
		,sortType : function(node){
					return parseInt(node.id, 10);
		}
	});

	this.getSelectionModel().on('beforeselect', function(sm, node){
	        return node.isLeaf();
    });

	this.contextMenu = new Ext.menu.Menu({items:[{
				text    : 'Delete this category',
				//iconCls : 'icon-deleteEl',
				scope   : this,
				id: 'delete_category',
				handler : this.deleteCategory
			},{
				text    : 'Add new category',
				//iconCls : 'icon-addEl',
				scope   : this,
				id: 'new_category',
				handler : this.addCategory
			},{
				text    : 'Add new sub category',
				//iconCls : 'icon-addEl',
				scope   : this,
				id: 'new_subcategory',
				handler : this.addSubCategory
			},{
				text    : 'Duplicate sub category',
				//iconCls : 'icon-dupEl',
				scope   : this,
				id: 'duplicate_category',
				handler : this.duplicateCategory
			}]
	});
	
	//clone node
	this.cloneNode = function(node) {
			if(this.lockCategories == true) return;
			
			var newNode = new Ext.tree.TreeNode({
												id:Ext.id(),//this is temp id until the node will be saved
												text:(node.text + "_New")
												});
			newNode.attributes = node.attributes;
			
			// clone children
			for(var i = 0; i < node.childNodes.length; i++){
				n = node.childNodes[i];
				if(n) { newNode.appendChild(cloneNode(n)); }
			}
			this.lockCategories = true;
			return newNode;
	}.createDelegate(this);

	this.on('nodedrop', this.onNodeDrop , this, {buffer:100});
	this.on('beforenodedrop', this.onBeforeNodeDrop, this);
	this.on('nodedragover', this.onNodeDragOver, this);
	this.on('click', this.onClick, this);
	this.on('contextmenu', this.onContextClick, this);
};

Ext.extend(BloneyInfra.Tree, Ext.tree.TreePanel, {

	//menu handlers
	deleteCategory : function(item){
			var isChild = this.contextMenu.node.attributes.leaf;
			var category_key = this.contextMenu.node.attributes.id;
			var activation_key = this.contextMenu.node.attributes.fprint;
			
			if(isChild){
				Ext.Msg.show({
						   title:'Deltete Category',
						   msg: 'Your are going to delete the category. Are you sure?',
						   buttons: Ext.Msg.OKCANCEL,
						   fn: function(btn){
						   		if(btn == 'ok'){
									Ext.Ajax.request({
										   url: '/categories/destroy',
										   //method:'POST',
										   success: function(){
										   		Ext.getCmp('categorieslist').removeNode(Ext.getCmp('categorieslist').contextMenu.node);
												Ext.Msg.alert('Delete Category', 'This category was sucessfully deleted');											
										   },
										   failure: function(){
										   		Ext.Msg.alert('Delete Category', 'Could not delete this category since it is in use');
										   },
										   params: { id: category_key,
										   			authenticity_token : activation_key }
										});
								}
						   },
						   animEl: 'elId',
						   icon: Ext.MessageBox.QUESTION
						});
			}
			else{
				Ext.Msg.alert('Delete Category', 'Could not delete this category since this is a parent category');
			}
	},
	duplicateCategory : function(item){
		var node = this.contextMenu.node;
		//this.markUndo("Duplicate " + node.text);
		var newNode = this.cloneNode(node);
		if (node.isLast()) {
			node.parentNode.appendChild(newNode);
		} else {
			node.parentNode.insertBefore(newNode, node.nextSibling);
		}
		this.updateDetails(newNode);
	},
	addCategory : function(item){
		var node = this.appendConfig({}, this.contextMenu.node.parentNode, true, true);
		this.expandPath(node.getPath());
		this.updateDetails(node);
	},
	addSubCategory : function(item){
		var node = this.appendConfig({}, this.contextMenu.node, true, true);
		this.expandPath(node.getPath());
		this.updateDetails(node);
	},

	// update on node drop
	onNodeDrop : function(de) {
		var node = de.target;
		if (de.point != 'above' && de.point != 'below') {
			node = node.parentNode || node;
		}
		//this.updateForm(false, node);
	},

	// copy node on 'ctrl key' drop
	onBeforeNodeDrop : function(de) {
		if (!de.rawEvent.ctrlKey) {
			//this.markUndo("Moved " + de.dropNode.text);
			return true;
		}
		//this.markUndo("Copied " + de.dropNode.text);
        var ns = de.dropNode, p = de.point, t = de.target;
        if(!(ns instanceof Array)){
            ns = [ns];
        }
        var n;
        for(var i = 0, len = ns.length; i < len; i++){
						n = cloneNode(ns[i]);
            if(p == "above"){
                t.parentNode.insertBefore(n, t);
            }else if(p == "below"){
                t.parentNode.insertBefore(n, t.nextSibling);
            }else{
                t.appendChild(n);
            }
        }
        n.ui.focus();
        if(de.tree.hlDrop){ n.ui.highlight(); }
        t.ui.endDrop();
        de.tree.fireEvent("nodedrop", de);
				return false;
	},

	// assert node drop
	onNodeDragOver : function(de) {
		var p = de.point, t= de.target;
		if(p == "above" || t == "below") {
				t = t.parentNode;
		}
		if (!t) { return false; }
		//this.highlightElement(t.fEl.el);
		return (this.canAppend({}, t) === true);
	},

	onClick : function(node, e){
		e.preventDefault();
		//if (!node.fEl || !node.fEl.el) { return; }
		//this.highlightElement(node.fEl.el);
		this.updateDetails(node);
		//this.setCurrentNode(node);
		//window.node = node; // debug
	},

	updateDetails : function(node) {

		Ext.getCmp('categorydetails').form.setValues( [{id:'category', value:node.attributes.text},
									  {id:'description', value:node.attributes.description},
									  {id:'categorygroupId', value:'Both'},
									  {id:'statusId', value:node.attributes.record_sts},
									  {id:'category_id', value:node.attributes.id},
									  {id:'parent_categoryid', value:node.parentNode.attributes.id},
									  {id:'authenticity_token', value:node.attributes.fprint},
									  {id:'story', value:"Please add any comment ... "}]);
		var tabs = Ext.getCmp('tabcategories').getItem('topic-grid');
		tabs.setTitle("Blog - "+ node.attributes.text);
		tabs.handleActivate(Ext.getCmp('tabcategories').getItem('topic-grid'));

	},	
	
	onContextClick : function(node, e) {
			e.preventDefault();
			if (this.lockCategories == false) {
				if(node != this.root){
					var isChild = node.attributes.leaf;

					this.contextMenu.items.get('duplicate_category').setDisabled(!isChild);
					this.contextMenu.items.get('new_category').setDisabled(isChild);
					this.contextMenu.items.get('delete_category').setDisabled(!isChild);
					
					this.contextMenu.node = node;
					this.contextMenu.showAt(e.getXY());
				}
			}
			else{
				Ext.Msg.alert('Message', 'Complete the update !!!');
			}
			//this.menu.show(node.ui.getAnchor());
	},
	// remove a node
	removeNode : function(node) {
			if (!node || node == this.root) { return; }
			// Undo functions
			//Category History update
			//this.markUndo("Remove " + node.text);
			var nextNode = node.nextSibling || node.parentNode;
			var pNode = node.parentNode;
			pNode.removeChild(node);
			// update form with the data
			//this.updateForm(false, pNode);
			//this.setCurrentNode(nextNode, true);
	},

	// node text created from config of el
	configToText : function(c) {
		var txt = [];
		c = c || {};
		if (c.xtype)      { txt.push(c.xtype); }
		if (c.fieldLabel) { txt.push('[' + c.fieldLabel + ']'); }
		if (c.boxLabel)   { txt.push('[' + c.boxLabel + ']'); }
		if (c.layout)     { txt.push('<i>' + c.layout + '</i>'); }
		if (c.title)      { txt.push('<b>' + c.title + '</b>'); }
		if (c.text)       { txt.push('<b>' + c.text + '</b>'); }
		if (c.region)     { txt.push('<i>(' + c.region + ')</i>'); }
		return (txt.length == 0 ? "Category" : txt.join(" "));
	},

	// return true if config can be added to node, or an error message if it cannot
	canAppend : function(config, node) {
		//if (node == this.treePanel.root && this.treePanel.root.hasChildNodes()) {
		//	return "Only one element can be directly under the GUI Builder";
		//}
		//var xtype = node.elConfig.xtype;
		//if (xtype && ['panel','viewport','form','window','tabpanel','toolbar','fieldset'].indexOf(xtype) == -1) {
		//	return 'You cannot add element under xtype "'+xtype+'"';
		//}
		return true;
	},

	// add a config to the tree
	appendConfig : function(config, appendTo, doUpdate, markUndo) {

		if (!appendTo) {
			appendTo = this.getSelectedNode() ||
				this.root;
		}

		var items = config.items;
		delete config.items;
		var id = config.id||(config._node ? config._node.id : Ext.id());
		var newNode = new Ext.tree.TreeNode({id:id,text:(appendTo.text + "_New")});
		//for(var k in config) { if (config[k]===null) { delete config[k]; }}

		appendTo.appendChild(newNode);
		if (items && items.length) {
			for (var i = 0; i < items.length; i++) {
					this.appendConfig(items[i], newNode, false);
			}
		}

		return newNode;
	},

	// update node text & id (if necessary)
	updateNode : function(node) {
		if (!node) { return; }
		node.setText(this.configToText(node.elConfig));
		if (node.elConfig.id && node.elConfig.id != node.id) {
//            node.getOwnerTree().unregisterNode(node);
			node.id = node.elConfig.id;
//            node.getOwnerTree().registerNode(node);
		}
	},

	refresh : function() {
		this.lockCategories = false;
		this.getLoader().load(this.root);
		this.expandAll();
	}

});
/**********************************************************************************************************/
Ext.ux.GDataTableAdapter = function(config) {
    // hashmap to convert from Ext data types
    // datatypes
    var convert = {
        'auto': 'string',
        'string': 'string',
        'int': 'number',
        'float': 'number',
        'boolean': 'boolean',
        'date':'date'    
    };
      
    return {
        adapt: function(config) {
            var store = Ext.StoreMgr.lookup(config.store || config.ds);
            var tbl = new google.visualization.DataTable();
            var cols = config.columns;
            for (var i = 0; i < cols.length; i++) {
                var c = cols[i];
                var id = c.dataIndex || c;
                var f = store.fields.get(id);
                tbl.addColumn(convert[f.type], c.label || c, id);
            }
            var rs = store.getRange();
            tbl.addRows(rs.length);
            for (var i = 0; i < rs.length; i++) {
                for (var j = 0; j < cols.length; j++) {
                    //var fld = store.fields.itemAt(j);   
					var fld = store.fields.get(cols[j].dataIndex);     
                    tbl.setValue(i, j, rs[i].get(fld.name));
                }
            }
            return tbl;
        }
    };
      
}();


Ext.ux.GVisualizationPanel = Ext.extend(Ext.Panel, {
    // These are required by Google API
    // To add more visualizations you can extend
    // visualizationPkgs
    visualizationAPI: 'visualization',
    visualizationAPIVer: '1',
    visualizationPkgs: {
        'intensitymap': 'IntensityMap',
        'orgchart': 'OrgChart',
        'linechart': 'LineChart',
        'piechart': 'PieChart',
        'gauge': 'Gauge',
        'columnchart': 'ColumnChart',
        'barchart': 'BarChart',
        'scatterchart': 'ScatterChart',
		'imageareachart': 'ImageAreaChart',
		'areachart': 'AreaChart'    
    },
    
    /**
     * visualizationPkg {String} 
     * (Required) Valid values are intesitymap, orgchart, gauge and scatterchart
     * The error "Module: 'visualization' with package: '' not found!" will be
     * thrown if you do not use this configuration.
     */
    visualizationPkg: '',
    
    /**
     * html {String}
     * Initial html to show before loading the visualization
     */
    html: 'Loading...',
    
    /**
     * store {Ext.data.Store/String}
     * Any valid instance of a store and/or storeId
     */    
    store: null,

    // Overriden methods
    initComponent: function() {
        if (typeof this.visualizationPkg === 'object') {
            Ext.apply(this.visualizationPkgs, this.visualizationPkg);            
            for (var key in this.visualizationPkg) {
                this.visualizationPkg = key;
                break;
            }
        }
        google.load(
            this.visualizationAPI,
            this.visualizationAPIVer,
            {
                packages: [this.visualizationPkg],
                callback: this.onLoadCallback.createDelegate(this)
            }
        );        
        this.store = Ext.StoreMgr.lookup(this.store);
        Ext.ux.GVisualizationPanel.superclass.initComponent.call(this);
    },
    
    // custom methods
    onLoadCallback: function() {
        var tableCfg = {
            store: this.store,
            columns: this.columns
        };
        this.datatable = Ext.ux.GDataTableAdapter.adapt(tableCfg);
        
        var cls = this.visualizationPkgs[this.visualizationPkg];
        this.body.update('');
        this.visualization = new google.visualization[cls](this.body.dom);
        
        var relaySelect = function() {
            this.fireEvent('select', this, this.visualization);
        };
        google.visualization.events.addListener(this.visualization, 'select', relaySelect.createDelegate(this));
        this.visualization.draw(this.datatable, Ext.apply({}, this.visualizationCfg));
    }    
});
Ext.reg('gvisualization', Ext.ux.GVisualizationPanel);

// Very simple plugin for adding a close context menu to tabs
Ext.ux.TabCloseMenu = function(){
    var tabs, menu, ctxItem;
    this.init = function(tp){
        tabs = tp;
        tabs.on('contextmenu', onContextMenu);
    }

    function onContextMenu(ts, item, e){
        if(!menu){ // create context menu on first right click
            menu = new Ext.menu.Menu([{
                id: tabs.id + '-close',
                text: 'Close Tab',
                handler : function(){
                    tabs.remove(ctxItem);
                }
            },{
                id: tabs.id + '-close-others',
                text: 'Close Other Tabs',
                handler : function(){
                    tabs.items.each(function(item){
                        if(item.closable && item != ctxItem){
                            tabs.remove(item);
                        }
                    });
                }
            }]);
        }
        ctxItem = item;
        var items = menu.items;
        items.get(tabs.id + '-close').setDisabled(!item.closable);
        var disableOthers = true;
        tabs.items.each(function(){
            if(this != item && this.closable){
                disableOthers = false;
                return false;
            }
        });
        items.get(tabs.id + '-close-others').setDisabled(disableOthers);
        menu.showAt(e.getPoint());
    }
};
