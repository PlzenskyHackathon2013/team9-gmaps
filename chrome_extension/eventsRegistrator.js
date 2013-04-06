$('body').mouseup(function(e) {
	if (! e.ctrlKey) { return; }
	var selection = window.getSelection();
	var text = selection.toString();
	bExecuteScript("("+shit.toString()+")(\""+text+"\")");

  	$('#liberator_map_container')
  		.dialog('open')
  		.dialog("option", "position", { my: "top", at: "center", of: e });

});


function shit(text) {
	if (! window.googleMapaID) {
		
	  	window.googleMapaID = window.googleMapsRenderer.addMap({
			canvas: document.getElementById('liberator_map_container'),
			zoom: 8
		});

  	}	

  	window.googleMapsRenderer.geocode(text, function (results) {
			for (var i = 0; i < results.length; i++) {
				var loc = results[i].geometry.location;
				window.googleMapsRenderer.addMarker(window.googleMapaID, {
					title: results[i].formatted_address,
					position: [loc.lat(), loc.lng()]
				});
			}
		}, function (status) {
			alert('error occured because of '+ status);
		}
	);

	return 0;
}


$('body').append('<div id="liberator_map_container"></div>');
$('#liberator_map_container').dialog(
		{
			title: "In place map",
			width: 600,
			height: 400,
			autoOpen: false,
			zIndex: 10000
		}
	);


function toGoollback(containerID, q) {
	bExecuteScript("("+toGoolbackShit.toString()+")(\""+containerID+"\",\"" +q +"\")");
}

function toGoolbackShit(containerID, q) {
	if (! window.googlbackShitMapaID) {
		
	  	window.googleMapaShitID = window.googleMapsRenderer.addMap({
			canvas: document.getElementById(containerID),
			zoom: 8
		});

  	}	

  	window.googleMapsRenderer.geocode(q, function (results) {
			for (var i = 0; i < results.length; i++) {
				var loc = results[i].geometry.location;
				window.googleMapsRenderer.addMarker(window.googleMapaShitID, {
					title: results[i].formatted_address,
					position: [loc.lat(), loc.lng()]
				});
			}
		}, function (status) {
			alert('error occured because of '+ status);
		}
	);

	return 0;
}