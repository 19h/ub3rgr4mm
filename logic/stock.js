exports.paths = [
	"stock"
];

var sd = require("stock-data-ub3rgr4mm"), _smpl = function (a) {
        c = function (a, c, e) {
                var d = 1;
                a = (a + "").replace(/[^0-9+\-Ee.]/g, "");
                a = !isFinite(+a) ? 0 : +a;
                d = !isFinite(+d) ? 0 : Math.abs(d);
                e = "undefined" === typeof e ? "," : e;
                c = "undefined" === typeof c ? "." : c;
                var b = "",
                        b = function (a, b) {
                                var c = Math.pow(10, b);
                                return "" + Math.round(a * c) / c
                        }, b = (d ? b(a, d) : "" + Math.round(a)).split(".");
                3 < b[0].length && (b[0] = b[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, e));
                if ((b[1] || "").length < d) b[1] = b[1] || "", b[1] += Array(d - b[1].length + 1).join("0");
                return b.join(c)
        }
        if (1023 >= a) return a;
        if (1024 <= a && 1048575 > a) return c(a /
                        1E3, ".", "") + " T";
        if (1048576 <= a && a < 1073741823) return c(a / 1E6) + " M";
        if (1073741824 <= a && a < 1099511627775) return c(a / 1E9) + " B";
        if (1099511627776 <= a && a < 1125899906842623) return c(a / 1E12) + " T";
        if (1125899906842624 <= a) return c(a / 1E15) + " Q"
};

exports.main = function ( from, to, text, message, arg, bot, _arg, del ) {
	var query = arg.split(del + _arg + " ")[1] || "";

	query = query.trim().toLowerCase();
	query = query.toUpperCase();

	var qparts = query.split(" ");

	var market = qparts.length > 1 ? qparts[0] : "NASDAQ";
	query = qparts.length > 1 ? qparts[1] : qparts[0];

	sd.fundamentals(market, query, function(err, data){
		if ( err || data.price == 0 ) return false;

		var price = data.price, csign;

		switch(data.currency) {
			case "GBX":
				csign = "£";
				price = "£" + ( data.price / 100 );
				break;
			case "EUR":
				csign = "€";
				price = "€" + data.price;
				break;
			default:
				csign = "$";
				price = "$" + data.price;
		}

		return bot.say(to, market + "/" + query +  ": Price " + price + " Capitalization " + csign + _smpl(data.marketCap))
	});
}