({
    doInit : function(cmp, ev) {
        var self=this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(result) {self.gotGeoCode(result, cmp, self);},
                self.error,
                {
                maximumAge: 0,
                timeout:30000,
                enableHighAccuracy: true
                }
            );
        }
    },
    gotGeoCode : function (position, cmp, helper) {  
    	console.log('Latitude = ' + position.coords.latitude + 
              		'Longitude = ' + position.coords.longitude);
        console.log('cmp = ' + cmp);
        cmp.set('v.lat', position.coords.latitude);
        cmp.set('v.long', position.coords.longitude);
        cmp.set('v.showWorking', false);
	},
    recordLocation : function(cmp, ev) {
        var action=cmp.get('c.StoreUserLocation');
        action.setParams({'latitude':cmp.get('v.lat'),
                          'longitude':cmp.get('v.long')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if ( (cmp.isValid()) && state === "SUCCESS") {
                cmp.set('v.recorded', true);
                cmp.set('v.prompt', 'Your location has been recorded - thanks!');
            }
            else if (state === "INCOMPLETE") {
                alert('Incomplete - what to do?');
            }
            //else if (cmp.isValid() && state === "ERROR") {
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
                cmp.set('v.prompt', 'Unable to record location');
            }
            cmp.set('v.showWorking', false);
        });
        console.log('Action = ' + JSON.stringify(action));
		$A.enqueueAction(action);
        cmp.set('v.showWorking', true);
    },
    error : function(result) {
        alert('Error ' + JSON.stringify(result));
    }
 })