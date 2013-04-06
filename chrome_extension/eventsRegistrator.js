$('body').mouseup(function(e) {
	if (! e.ctrlKey) { return; }
	var text = window.getSelection().toString();
  	console.log(text);

  	$('#liberator_map_container').text(text);
  	$('#liberator_map_container').dialog('open');
  	$('#liberator_map_container').dialog("option", "position", { my: "center", at: "center", of: window });

});


$('body').append('<div id="liberator_map_container"></div>');
$('#liberator_map_container').dialog(
		{
			title: "In place map",
			width: 400,
			height: 400,
			autoOpen: false
		}
	);
