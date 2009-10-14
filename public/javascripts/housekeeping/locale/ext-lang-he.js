/**
 * List compiled by mystix on the extjs.com forums.
 * Thank you Mystix!
 *
 * English Translations
 */

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">טוען...</div>';

if(Ext.View){
  Ext.View.prototype.emptyText = "";
}

if(Ext.grid.Grid){
  Ext.grid.Grid.prototype.ddText = "{0} טור/ים נבחרו";
}

if(Ext.TabPanelItem){
  Ext.TabPanelItem.prototype.closeText = "סגור טאב זה";
}

if(Ext.form.Field){
  Ext.form.Field.prototype.invalidText = "הערך בתא זה שגוי.";
}

if(Ext.LoadMask){
  Ext.LoadMask.prototype.msg = "טוען...";
}

Date.monthNames = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר"
];

Date.getShortMonthName = function(month) {
  return Date.monthNames[month].substring(0, 3);
};

Date.monthNumbers = {
  Jan : 0,
  Feb : 1,
  Mar : 2,
  Apr : 3,
  May : 4,
  Jun : 5,
  Jul : 6,
  Aug : 7,
  Sep : 8,
  Oct : 9,
  Nov : 10,
  Dec : 11
};

Date.getMonthNumber = function(name) {
  return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
};

Date.dayNames = [
  "ראשון",
  "שני",
  "שלישי",
  "רביעי",
  "חמישי",
  "שישי",
  "שבת"
];

Date.getShortDayName = function(day) {
  return Date.dayNames[day].substring(0, 3);
};

if(Ext.MessageBox){
  Ext.MessageBox.buttonText = {
    ok     : "אישור",
    cancel : "ביטול",
    yes    : "כן",
    no     : "לא"
  };
}

if(Ext.util.Format){
  Ext.util.Format.date = function(v, format){
    if(!v) return "";
    if(!(v instanceof Date)) v = new Date(Date.parse(v));
    return v.dateFormat(format || "m/d/Y");
  };
}

if(Ext.DatePicker){
  Ext.apply(Ext.DatePicker.prototype, {
    todayText         : "היום",
    minText           : "יום זה קטן מהמינימום האפשרי",
    maxText           : "יום זה מאוחר מהמקסימום האפשרי",
    disabledDaysText  : "",
    disabledDatesText : "",
    monthNames        : Date.monthNames,
    dayNames          : Date.dayNames,
    nextText          : 'חודש הבא (Control+Right)',
    prevText          : 'חודש קודם (Control+Left)',
    monthYearText     : 'בחר חודש (Control+Up/Down לעבור בין השנים)',
    todayTip          : "{0} (רווח)",
    format            : "m/d/y",
    okText            : "&#160;אישור&#160;",
    cancelText        : "ביטול",
    startDay          : 0
  });
}

if(Ext.PagingToolbar){
  Ext.apply(Ext.PagingToolbar.prototype, {
    beforePageText : "עמוד",
    afterPageText  : "מתוך {0}",
    firstText      : "עמוד ראשון",
    prevText       : "עמוד קודם",
    nextText       : "עמוד הבא",
    lastText       : "עמוד אחרון",
    refreshText    : "רענן",
    displayMsg     : "מציג {0} - {1} מתוך {2}",
    emptyMsg       : 'אין נתונים להצגה'
  });
}

if(Ext.form.TextField){
  Ext.apply(Ext.form.TextField.prototype, {
    minLengthText : "מספר התווים המינימלי לשדה זה {0}",
    maxLengthText : "מספר התווים מהקסימלי לשדה זה {0}",
    blankText     : "תא זה חייב להיות מלא",
    regexText     : "",
    emptyText     : null
  });
}

if(Ext.form.NumberField){
  Ext.apply(Ext.form.NumberField.prototype, {
    minText : "הערך המינימלי לשדה זה הינו {0}",
    maxText : "הערך המקסימלי לשדה זה הינו {0}",
    nanText : "{0} אינו מספר חוקי"
  });
}

if(Ext.form.DateField){
  Ext.apply(Ext.form.DateField.prototype, {
    disabledDaysText  : "מבוטל",
    disabledDatesText : "מבוטל",
    minText           : "התאריך בשדה זה חייב להיות לאחר {0}",
    maxText           : "התאריך בשדה זה חייב להיות לפני {0}",
    invalidText       : "{0} אינו תאריך חוקי - הוא חייב להיות מהמבנה {1}",
    format            : "m/d/y",
    altFormats        : "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"
  });
}

if(Ext.form.ComboBox){
  Ext.apply(Ext.form.ComboBox.prototype, {
    loadingText       : "Loading...",
    valueNotFoundText : undefined
  });
}

if(Ext.form.VTypes){
  Ext.apply(Ext.form.VTypes, {
    emailText    : 'שדה זה חייב להיות אימייל מהצורה "user@domain.com"',
    urlText      : 'שדה זה חייב להיות URL מהצורה "http:/'+'/www.domain.com"',
    alphaText    : 'שדה זה יכול להכיל אך ורק אותיות ו _',
    alphanumText : 'שדה זה יכול להכיל אך ורק אותיות, מספרים ו _'
  });
}

if(Ext.form.HtmlEditor){
  Ext.apply(Ext.form.HtmlEditor.prototype, {
    createLinkText : 'אנא הקש URL בשביל הקישור:',
    buttonTips : {
      bold : {
        title: 'מודגש (Ctrl+B)',
        text: 'הפוך את הקטע הנחבר למודגש',
        cls: 'x-html-editor-tip'
      },
      italic : {
        title: 'נטוי (Ctrl+I)',
        text: 'הפוך את הקטע הנחבר לנטוי.',
        cls: 'x-html-editor-tip'
      },
      underline : {
        title: 'קו-תחתי (Ctrl+U)',
        text: 'הפוך את הקטע הנחבר למסומן בקו-תחתי.',
        cls: 'x-html-editor-tip'
      },
      increasefontsize : {
        title: 'הגדל טקסט',
        text: 'הגדל את הפונט.',
        cls: 'x-html-editor-tip'
      },
      decreasefontsize : {
        title: 'הקטן טקסט',
        text: 'הקטן את הפונט.',
        cls: 'x-html-editor-tip'
      },
      backcolor : {
        title: 'האר את הטקסט',
        text: 'שנה את צבע הרקע של הטקסט.',
        cls: 'x-html-editor-tip'
      },
      forecolor : {
        title: 'צבע הפונט',
        text: 'שנה את הצבע של הטקסט הנבחר.',
        cls: 'x-html-editor-tip'
      },
      justifyleft : {
        title: 'ישר לשמאל',
        text: 'ישר את הטקסט לשמאל.',
        cls: 'x-html-editor-tip'
      },
      justifycenter : {
        title: 'מרכז את הטקסט',
        text: 'מרכז את הטקסט בעורך.',
        cls: 'x-html-editor-tip'
      },
      justifyright : {
        title: 'ישר לימין',
        text: 'ישר את הטקסט לימין.',
        cls: 'x-html-editor-tip'
      },
      insertunorderedlist : {
        title: 'רשימה',
        text: 'התחל רשימה.',
        cls: 'x-html-editor-tip'
      },
      insertorderedlist : {
        title: 'רשימה ממוספרת',
        text: 'התחל רשימה ממוספרת.',
        cls: 'x-html-editor-tip'
      },
      createlink : {
        title: 'קישור',
        text: 'הפוך את הקטע המסומן לקישור.',
        cls: 'x-html-editor-tip'
      },
      sourceedit : {
        title: 'ערוך את המקור',
        text: 'עבור לעריכת המקור.',
        cls: 'x-html-editor-tip'
      }
    }
  });
}

if(Ext.grid.GridView){
  Ext.apply(Ext.grid.GridView.prototype, {
    sortAscText  : "סדר עולה",
    sortDescText : "סדר יורק",
    lockText     : "נעל עמודה",
    unlockText   : "שחרר עמודה",
    columnsText  : "עמודות"
  });
}

if(Ext.grid.GroupingView){
  Ext.apply(Ext.grid.GroupingView.prototype, {
    emptyGroupText : '(ריק)',
    groupByText    : 'קבץ לפי שדה זה',
    showGroupsText : 'הצג בקבוצות'
  });
}

if(Ext.grid.PropertyColumnModel){
  Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
    nameText   : "שם",
    valueText  : "ערך",
    dateFormat : "m/j/Y"
  });
}

if(Ext.layout.BorderLayout.SplitRegion){
  Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
    splitTip            : "גרור לשינוי גודל.",
    collapsibleSplitTip : "גרור לשינוי גודל. לחיצה כפולה להסתרה."
  });
}
