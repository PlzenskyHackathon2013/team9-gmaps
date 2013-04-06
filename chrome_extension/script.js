function mapyToGoogle() {
	var tiles = 'mapserver.mapy.cz/'; // /https?:\/\//;
	$('.smap').each(function(i, map) {
		var markers = new Array();
		var imgs = $('img');
		var x0 = null;
		var x1 = null;
		var y0 = null;
		var y1 = null;
		imgs.each(function(j, img) {
			var src = img.attr('src');
			if(src.indexOf(tiles)) {
				if(x1 != null && y1 != null) {
					continue;
				}
				// dlazdice
				var tid = src.subtring(src.lastIndexOf('/') + 1, src.lastIndexOf('.')).split('_');
				var pos = img.position();
				var pm = {
					'scr':pos.left,
					'pp':parseInt(tid[1], 16);
				};
				if(x0 == null) {
					x0 = pm;
				} else if(x1 == null) {
					x1 = pm;
				}
				pm = {
					'scr':(pos.top + img.height()),
					'pp':parseInt(tid[2], 16);
				};
				if(y0 == null) {
					y0 = pm;
				} else if(y1 == null) {
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
		var pp = {
			'x':((x1.pp-x0.pp)/(x1.scr-x0.scr))*(map.width()/2-x0),
			'x':((y1.pp-y0.pp)/(y1.scr-y0.scr))*(map.height()/2-y0)
		};
		var ll = JAK.fromPP(pp.x, pp.y).toWGS84(2);
		alert(ll);
	});
}