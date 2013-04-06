function bExecuteScript(txt) { // allmighty function
	var id = "map-liberator-result-"+Math.round(100*Math.random());
	var src = 'var res='+txt+';';
	src += 'var elm = document.createElement("span");';
	src += 'elm.id = "'+id+'";';
	src += 'elm.className=".map-liberator-result";';
	src += 'elm.innerHTML = res;';
	src += 'document.getElementsByTagName("body")[0].appendChild(elm);';
	//alert(src);
	//return(src);
	//*
	var sc = bInsertScript(src);
	sc.parentNode.removeChild(sc);
	//*/
	return($('#'+id).remove().text());
}

function bInsertScript(txt) {
	var sc = document.createElement('script');
	sc.type='text/javascript';
	sc.textContent =(txt);
	(document.head || document.documentElement).appendChild(sc);

	return sc;
}

function insertTotalShit() {

	return "window.GoogleMapsRenderer =" + window.GoogleMapsRenderer.toString() + ";" +
	"window.googleMapsInject = " + window.googleMapsInject.toString() + ";";

}

bInsertScript(insertTotalShit());

function injectGooleShit() {
	window.googleMapsRenderer = new GoogleMapsRenderer();
	googleMapsInject('googleMapsRenderer.render');
	return 0;
}

bExecuteScript("("+injectGooleShit.toString()+")()");
