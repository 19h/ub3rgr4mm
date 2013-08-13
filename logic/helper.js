exports.paths = [
	"reinit"
];

var trusted = [ "kenansulayman.users.quakenet.org" ];

exports.main = function ( from, to, text, message, arg, bot, _arg, del ) {
	if ( !~trusted.indexOf(message.host) ) return false;

	if ( _arg == "reinit" ) {
		for ( var _m in logic ) delete require.cache[logic[_m][1]];
		return _init(function (v) {
			return bot.say(to, from + "—" + to)//JSON.stringify(v))
		});
	}
}