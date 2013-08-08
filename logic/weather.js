exports.paths = [
	// Temperature
		"temp",
		"tempf",
		"tempk"
];

var om  = require("openweathermap"),
	geocode = require('geocoder'),
	forecast = require('forecast.io');
	forecast = new forecast({
		APIKey: "becbbeb844cadd7b562cc6db6ef09802"
	});

exports.main = function ( from, to, text, message, arg, bot, _arg, del ) {
	if ( _arg == "temp" ) {
		var query = arg.split(del+_arg+" ")[1];

		if ( !query ) return;
		query = query.replace(/\W/g, '');
		if ( !query ) return;

		query = query.trim().toLowerCase();
		query = query.charAt(0).toUpperCase() + query.slice(1);

		console.log(query)

		return om.find({q: query, cnt:2, units: "metric"}, function (a) {
			a.list.length
				&& bot.say(to, "It's " + a.list[0].main.temp + "°C in " + query + ".");
		})
	}

	if ( _arg == "tempf" ) {
		var query = arg.split(del+_arg+" ")[1];

		if ( !query ) return;
		query = query.replace(/\W/g, '');
		if ( !query ) return;

		query = query.trim().toLowerCase();
		query = query.charAt(0).toUpperCase() + query.slice(1);

		return om.find({q:query, cnt:2, units: "imperial"}, function (a) {
			a.list.length
				&& bot.say(to, "It's " + a.list[0].main.temp + "°F in " + query + ".")
		})
	}

	if ( _arg == "tempk" ) {
		var query = arg.split(del+_arg+" ")[1];

		if ( !query ) return;
		query = query.replace(/\W/g, '');
		if ( !query ) return;

		query = query.trim().toLowerCase();
		query = query.charAt(0).toUpperCase() + query.slice(1);

		return om.find({q:query, cnt:2}, function (a) {
			a.list.length
				&& bot.say(to, "It's " + a.list[0].main.temp + "°K in " + query + ".")
		})
	}
}

/*		if ( arg.substr(0, 5) == "!c4c " ) {
			var query = arg.split("!c4c ")[1];
			query = query.trim().toLowerCase();
			query = query.charAt(0).toUpperCase() + query.slice(1);

			//return om.find({q:query, cnt:2}, function (a) {
				//bot.say(to, "GEOQUERY-Yield: " + query + " [" + a.list[0].coord.lat + ", " + a.list[0].coord.lon + "]")
			//})
			geocode.geocode(query, function (err, v) {
				if (!v.results[0] || err) return;
				
				bot.say(to, "GEOQUERY-Yield: " + query + " [" + v.results[0].geometry.location.lat + ", " + v.results[0].geometry.location.lng + "]")
			})
		}
		if ( arg.substr(0, 5) == "!d4c " ) {
			var query = arg.split("!d4c ")[1];
			query = query.trim().toLowerCase();
			query = query.charAt(0).toUpperCase() + query.slice(1);

			return om.find({q:query, cnt:2}, function (a) {
				bot.say(to, "GEOQUERY-Yield: " + query + " [" + a.list[0].coord.lat + ", " + a.list[0].coord.lon + "]")
				
				forecast.get(a.list[0].coord.lat, a.list[0].coord.lon, function (err, res, data) {
					if (err) throw err;
					//bot.say(to,)
					console.log( require("util").inspect(data))
				});

			})
		}
*/