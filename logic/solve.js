exports.paths = [
	"solve"
];

var me = function () {
	var symbol = {
		mul: "*",
		div: "/",
		add: "+",
		sub: "-",
		grpbeg: "(",
		grpend: ")"
	};
	var ex = {
		divZero: "divZero",
		isNan: "isNan",
		invalidArgument: "invalidArgument"
	};
	var operator = [symbol.mul, symbol.div, symbol.add, symbol.sub];
	var group = [symbol.grpbeg, symbol.grpend];
	var ns = {
		equation: {
			parse: function (s) {}
		}
	};
	ns.equation.parse = function (s) {
		var split = function (s) {
			var ar = [];
			var len = s.length;
			var i = 0;
			var start = 0;
			for (i = 0; i < len; i++) {
				var ch = s.charAt(i);
				var left = i == 0 ? "" : s.charAt(i - 1);
				if (!Array.contains(operator, ch)) continue;
				if (Array.contains(operator, ch) && Array.contains(operator, left)) continue;
				Array.add(ar, s.substr(start, i - start));
				Array.add(ar, ch);
				start = i + 1
			}
			if (ar.length == 0) return s;
			if (start > 0) Array.add(ar, s.substr(start));
			return mdas(ar)
		};
		var recurse = function (s) {
			var len = s.length;
			var i = 0;
			var start = 0;
			var prevGrp;
			var parsed = "";
			for (i = 0; i < len; i++) {
				var ch = s.charAt(i);
				if (ch === symbol.grpbeg) start = i + 1;
				parsed += ch;
				if (!Array.contains(group, ch)) continue;
				if (prevGrp === symbol.grpbeg && ch === symbol.grpend) {
					var formula = s.substr(start, i -
						start);
					var ans = split(formula);
					var clen = parsed.length - (formula.length + 2);
					parsed = parsed.substr(0, clen);
					parsed += ans
				}
				prevGrp = ch
			}
			if (parsed.indexOf(symbol.grpbeg) != -1 || parsed.indexOf(symbol.grpend) != -1) return recurse(parsed);
			return split(parsed)
		};
		var error = "";
		var ans;
		try {
			ans = recurse(s);
			if (isNaN(ans)) throw ex.isNan;
		} catch (e) {
			ans = "n/a";
			if (e == ex.divZero) error = "Cannot perform division by zero";
			else if (e == ex.isNan) error = "Invalid formula";
			else if (e == ex.invalidArgument) error = "Invalid argument"
		}
		return {
			error: error,
			answer: ans
		}
	};
	var mdas = function (ar) {
		var compute = function (n1, n2, op) {
			switch (op) {
			case symbol.add:
				return Number(n1) + Number(n2);
			case symbol.sub:
				return Number(n1) - Number(n2);
			case symbol.mul:
				return Number(n1) * Number(n2);
			case symbol.div:
				if (Number(n2) == 0) throw ex.divZero;
				return Number(n1) / Number(n2)
			}
			throw ex.invalidArgument;
		};
		var applyRule = function (ar, ops) {
			var len = ar.length;
			var i = 0;
			var prevOp;
			var parsed = [];
			for (i = 0; i < len; i++) {
				var mod = i % 2;
				if (mod == 0) continue;
				var num1 = ar[i - 1];
				var num2 = ar[i + 1];
				var op = ar[i];
				if (!Array.contains(ops,
					op)) {
					if (!Array.contains(ops, prevOp)) Array.add(parsed, num1);
					Array.add(parsed, op)
				} else {
					if (Array.contains(ops, prevOp)) num1 = parsed[parsed.length - 1];
					var ans = compute(num1, num2, op);
					if (Array.contains(ops, prevOp)) parsed[parsed.length - 1] = ans;
					else Array.add(parsed, ans)
				}
				prevOp = op
			}
			if (!Array.contains(ops, prevOp)) Array.add(parsed, ar[len - 1]);
			return parsed
		};
		ar = applyRule(ar, ["*", "/"]);
		ar = applyRule(ar, ["+", "-"]);
		return ar.length == 0 ? 0 : ar[0]
	};
	if (!Array.contains) Array.contains = function (array, o) {
		var len = array.length;
		var i =
			0;
		for (i = 0; i < len; i++)
			if (array[i] === o) return true;
		return false
	};
	if (!Array.add) Array.add = function (array, o) {
		array[array.length] = o
	};
	return ns
}();

exports.main = function ( from, to, text, message, arg, bot, _arg, del ) {
	return bot.say(to, me.equation.parse(arg.split(del+_arg+" ")[1]).answer)
}