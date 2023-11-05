/**
 Copyright 2014 Gordon Williams (gw@pur3.co.uk)

 This Source Code is subject to the terms of the Mozilla Public
 License, v2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.

 ------------------------------------------------------------------
  An Button to send time and timezone
 ------------------------------------------------------------------
**/
"use strict";
(function(){

  var icon;

  function init() {
    Espruino.Core.Config.add("SHOW_SEND_TIME_ICON", {
      section : "General",
      name : "Show Send Time Icon",
      description : "Show an icon that will send time and timezone",type : "boolean",
      defaultValue : false,
      onChange : function(newValue) { showIcon(newValue); }
    });

    showIcon(Espruino.Config.SHOW_SEND_TIME_ICON);
  }

  function showIcon(show) {
    if (show) {
      icon = Espruino.Core.App.addIcon({ 
        id: "sendTime",
        icon: "ui-icon-clock",
        title : "Send current time and timezone",
        order: 300,
        area: {
          name: "code",
          position: "bottom"
        },
        click: sendTime
      });
    } else {
      if (icon!==undefined) icon.remove();
    }
  }

  function sendTime() {
    var time = new Date();
    var code = "setTime("+(time.getTime()/1000)+");E.setTimeZone("+(-time.getTimezoneOffset()/60)+")";

    Espruino.Core.Serial.write(`\x03\x10${code}\n`, false, function() {
      Espruino.Core.Notifications.success(`Send current time and timezome`, true);
    });
  }

  Espruino.Plugins.sendTime = {
    init : init,
  };
}());
