exports.paths = [
	"detectlang"
];

var vac = require("vac");

exports.main = function ( from, to, text, message, arg, bot, del ) {
	var v = vac.detect(arg.split(del + arg + " ")[1], 1), z = [];

	for ( var a in v ) { z[0] = a; z[1] = v[a] };

	return bot.say(to, z[0] + ": " + z[1])
}
