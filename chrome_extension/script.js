function mapyToGoogle() {
	var tiles = 'mapserver.mapy.cz/'; // /https?:\/\//;
	$('.smap').each(function(i, map) {
		var markers = new Array();
		map = $(map);
		var imgs = map.find('img');
		var x0 = null;
		var x1 = null;
		var y0 = null;
		var y1 = null;
		imgs.each(function(j, img) {
			img = $(img);
			var src = img.attr('src');
			if(src.indexOf(tiles)) {
				if(x1 != null && y1 != null) {
					return;
				}
				// dlazdice
				var tid = src.substring(src.lastIndexOf('/') + 1).split('_');
				var pos = img.position();
				var pm = {
					'scr':pos.left,
					'pp':parseInt(tid[1], 16)
				};
				if(x0 == null) {
					x0 = pm;
				} else if(x1 == null && pm.scr != x0.scr) {
					x1 = pm;
				}
				pm = {
					'scr':(pos.top + img.height()),
					'pp':parseInt(tid[2], 16)
				};
				if(y0 == null) {
					y0 = pm;
				} else if(y1 == null && pm.scr != y0.scr) {
					y1 = pm;
				}
			} else {
				// znacka
				markers.push({
					'url':src,
					'x':img.css('left'),
					'y':img.css('top'),
					'title':img.attr('title')
				});
			}
		});
		//map = $(map);
		var pp = {
			'x':x0.pp + (map.width()/2-x0.scr)*((x1.pp-x0.pp)/(x1.scr-x0.scr)),
			'y':y0.pp + (map.height()/2-y0.scr)*((y1.pp-y0.pp)/(y1.scr-y0.scr))
			//'x':x0.pp + ((x1.pp-x0.pp)/(x1.scr-x0.scr))*(map.width()/2-x0.scr),
			//'y':y0.pp + ((y1.pp-y0.pp)/(y1.scr-y0.scr))*(map.height()/2-y0.scr)
		};
		
		////////
		var ll = bExecuteScript('SMap.Coords.fromPP('+pp.x+', '+pp.y+').toWGS84(2)');
		//var ll = bExecuteScript('SMap.Coords.fromPP('+x1.pp+', '+y1.pp+').toWGS84(2)');
		
		//var ll = JAK.fromPP(pp.x, pp.y).toWGS84(2);
		alert(ll);
	});
}

function bExecuteScript(txt) {
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
	var sc = document.createElement('script');
	sc.type='text/javascript';
	sc.textContent =(src);
	(document.head || document.documentElement).appendChild(sc);
	sc.parentNode.removeChild(sc);
	//*/
	return($('#'+id).remove().text());
}

function randomString(length) {

    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';


    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function initMapyCZ() {
	mapyToGoogle();
	/*
	$.ajax({
		type:'GET',
		url:'http://api4.mapy.cz/loader.js',
		async:false,
		success:function(txt) {
			var sc = $(document.createElement('script'));
			sc.attr({
				//'src':'http://api4.mapy.cz/loader.js',
				'type':'text/javascript'
			}).load(function() {
			});
			sc.text(txt);
			$('head').append(sc);
			//eval(txt);
			Loader.load();
			//JAK.Timekeeper.prototype.removeListener=function(a){};
			alert("ok");
		}
	});
	*/
	/*
	$.get(, function(data) {
		
		alert('a');
		Loader.load();
		alert('b');
	});
	//*/
}
initMapyCZ();
