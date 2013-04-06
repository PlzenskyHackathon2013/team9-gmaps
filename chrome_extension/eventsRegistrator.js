$('body').mouseup(function(e) {
	if (! e.ctrlKey) { return; }
	var selection = window.getSelection();
	var text = selection.toString();
  	console.log(text);

  	$('#liberator_map_container').text(text);
  	$('#liberator_map_container').dialog('open');
  	$('#liberator_map_container').dialog("option", "position", { my: "top", at: "center", of: e });

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
