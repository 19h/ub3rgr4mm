exports.paths = [
	"reinit"
];

var trusted = [ "apexpredator" ];

exports.main = function ( from, to, text, message, arg, bot, _arg, del ) {
	if ( trusted[from] === void 0 ) return false;

	if ( _arg == "reinit" ) {
		for ( var _m in logic ) delete require.cache[logic[_m][1]];
		return _init(function (v) {
			return bot.say(to, from + "—" + to)//JSON.stringify(v))
		});
	}
}