var $output, FirebasePlugin;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    FirebasePlugin = window.FirebasePlugin;
    $output = $('#log-output');
   
    //Register handlers
    FirebasePlugin.onMessageReceived(function(message) {
        try{
            console.log("onMessageReceived");
            alert("onMessageReceived");
            console.dir(message);
            if(message.messageType === "notification"){
                handleNotificationMessage(message);
            }else{
                handleDataMessage(message);
            }
        }catch(e){
            logError("Exception in onMessageReceived callback: "+e.message);
        }

    }, function(error) {
        logError("Failed receiving FirebasePlugin message", error);
    });
    var handleNotificationMessage = function(message){

        var title;
        if(message.title){
            title = message.title;
        }else if(message.notification && message.notification.title){
            title = message.notification.title;
        }else if(message.aps && message.aps.alert && message.aps.alert.title){
            title = message.aps.alert.title;
        }
    
        var body;
        if(message.body){
            body = message.body;
        }else if(message.notification && message.notification.body){
            body = message.notification.body;
        }else if(message.aps && message.aps.alert && message.aps.alert.body){
            body = message.aps.alert.body;
        }
    
        var msg = "Notification message received";
        if(message.tap){
            msg += " (tapped in " + message.tap + ")";
        }
        if(title){
            msg += '; title='+title;
        }
        if(body){
            msg += '; body='+body;
        }
        msg  += ": "+ JSON.stringify(message);
        log(msg);
        console.log("msg : "+msg);
        alert(msg);
    };
    var getID = function(){
        FirebasePlugin.getId(function(id){
            //alert(">> id "+id );
            console.log(">>console token "+id);
            log(">> token "+id);
        }, function(error) {
            alert(">> id "+error );
        });
    };
    // Notifications
    var checkNotificationPermission = function(requested){
        FirebasePlugin.hasPermission(function(hasPermission){
            if(hasPermission){
                log("Remote notifications permission granted");
                // Granted
                getToken();
            }else if(!requested){
                // Request permission
                log("Requesting remote notifications permission");
                FirebasePlugin.grantPermission(checkNotificationPermission.bind(this, true));
            }else{
                // Denied
                logError("Notifications won't be shown as permission is denied");
            }
        });
    };
    var getToken = function(){
        FirebasePlugin.getToken(function(token){
            alert(">> token "+token );
            console.log(">>console token "+token);
            log(">> token "+token);
        }, function(error) {
            alert(">> id "+error );
        });
    };
    checkNotificationPermission(false); // Check permission then get token
    getID();
    getToken();
}
$(document).on('deviceready', onDeviceReady);