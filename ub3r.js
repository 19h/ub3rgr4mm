// Create the configuration
var config = {
	server: "irc.quakenet.org",
	botName: "ub3rgr4mm",
	delimiter: "!",
	debug: false
};

opts = require("./config.js").opts;

var irc = require("irc");

// Load logical modules
var logic = {};
_init = function () {
	require("fs").readdirSync("./logic").forEach(function(file) {
		(file.split(".")[1] === "js") &&
			(logic[file.split(".")[0]] // basename
				= [require("./logic/" + file), require.resolve("./logic/" + file)])
	});
	_c_ = [];
	for ( var _c in logic ) _c_.push("'" + _c + "'");
}

_init();

// Create the bot name
var bot = new irc.Client(config.server, config.botName, opts);

bot.addListener("registered", function() {
	bot.say("Q@CServe.quakenet.org", "AUTH ub3rgr4mm " + opts.password)
	setTimeout(function () {
		bot.send("mode", "ub3rgr4mm", "+x")
	}, 500);
});

bot.addListener("join", function (channel) {
	return config.debug && bot.say(channel, "!!! ub3rgr4mm is running in debug mode !!!");
})

bot.addListener("message", function(from, to, text, message) {
	var arg = message.args[1], _arg = arg.split(" ")[0].split("!")[1];

	if ( _arg == "reinit" ) { // hot reload
		for ( var _m in logic ) delete require.cache[logic[_m][1]];
		return _init();
	}

	for ( var _m in logic )
		if ( ~logic[_m][0].paths.indexOf(_arg) )
			return logic[_m][0].main( from, to, text, message, arg, bot, _arg, config.delimiter );

});

bot.addListener("error", console.log);