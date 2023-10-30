/**
 Copyright 2014 Gordon Williams (gw@pur3.co.uk)

 This Source Code is subject to the terms of the Mozilla Public
 License, v2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.
 
 ------------------------------------------------------------------
  An Button that send tine and timezone
 ------------------------------------------------------------------
**/
"use strict";
(function(){

  Espruino.Core.App.addIcon({ 
    id: "sendTime",
    icon: "star",
    title : "Send the current Time and Timezone", 
    order: 300,
    area: { 
      name: "code",
      position: "bottom"
    },
    click: sendTime
  });

  function sendTime() {
    var time = new Date();
    var code = "setTime("+(time.getTime()/1000)+");E.setTimeZone("+(-time.getTimezoneOffset()/60)+")";

    Espruino.Core.Serial.write(`\x03\x10${code}\n`, false, function() {
      Espruino.Core.Notifications.success(`Sen­t the time and timezome`, true);
    });
  }

  Espruino.Plugins.ExamplePlugin = {
    init : init,
  };
}());