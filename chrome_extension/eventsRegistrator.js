$('body').mouseup(function(e) {
	if (! e.ctrlKey) { return; }
	var text = window.getSelection().toString();
  	console.log(text);
});