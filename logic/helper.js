exports.paths = [
	"reinit"
];

exports.main = function ( from, to, text, message, arg, bot, _arg, del ) {
	console.log(from, message);

	if ( _arg == "reinit" ) {
		for ( var _m in logic ) delete require.cache[logic[_m][1]];
		return _init(function (v) {
			return bot.say(to, JSON.stringify(v))
		});
	}
}