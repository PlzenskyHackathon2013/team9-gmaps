function mapyToGoogle() {
	var tiles = 'mapserver.mapy.cz/'; // /https?:\/\//;
	$('.smap').each(function(i, map) {
		var markers = new Array();
		map = $(map);
		var w = map.width();
		var h = map.height();
		var imgs = map.find('img');
		var x = null;
		var y = null;
		var z;
		var t;
		imgs.each(function(j, img) {
			img = $(img);
			var src = img.attr('src');
			if(src.indexOf(tiles) >= 0) {
				// dlazdice
				var tid = src.substring(src.lastIndexOf('/') + 1).split('_');
				z = tid[0];
				var pos = img.position();
				if(x == null || (pos.left != 0 && Math.abs(w/2 - x.scr) > Math.abs(w/2 - pos.left))) {
					x = {
						'scr':pos.left,
						'pp':parseInt(tid[1], 16)
					};
				}
				t = pos.top + 256;
				if(y == null || (pos.top != 0 && Math.abs(h/2 - y.scr) > Math.abs(h/2 - t))) {
					y = {
						'scr':t,
						'pp':parseInt(tid[2], 16)
					};
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
		////////
		//var ll = bExecuteScript('SMap.Coords.fromPP('+pp.x+', '+pp.y+').toWGS84(2)');
		var ll = bExecuteScript('('+duplicateMap.toString()+')('+map.width()+','+map.height()+','+z+',{pp:'+x.pp+',scr:'+x.scr+'}'+',{pp:'+y.pp+',scr:'+y.scr+'}'+',[]'+')');
		//var ll = bExecuteScript('SMap.Coords.fromPP('+x1.pp+', '+y1.pp+').toWGS84(2)');
		
		//var ll = JAK.fromPP(pp.x, pp.y).toWGS84(2);
		alert(ll);
	});
}

function duplicateMap(w,h,z,cx,cy,m) {
	var id = Math.round(100*Math.random());
	var mc = document.createElement('div');
	mc.style.width=w+'px';
	mc.style.height=h+'px';
	//mc.style.display = 'none';
	mc.id = 'map-liberator-map-'+id;
	document.getElementsByTagName('body')[0].appendChild(mc);
	var c = SMap.Coords.fromPP(cx.pp,cy.pp);
	var map = new SMap(JAK.gel('map-liberator-map-'+id), c, z);
	map.addDefaultLayer(SMap.DEF_BASE).enable();
	var res = document.createElement('span');
	res.id = 'map-liberator-result-'+id;
	res.className = 'map-liberator-result';
	
	var px = c.toPixel(map, z);
	
	var oc = new SMap.Pixel(px.x-w/2+cx.scr, px.y+h/2-cy.scr).toCoords(map);
	map.$destructor();
	mc.parentNode.removeChild(mc);
	//var oc = new SMap.Coords(c.x, c.y);
	return(oc.toWGS84(2));
}

function randomString(length) {

    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';


    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function initMapyCZ() {
	mapyToGoogle();
}
initMapyCZ();
