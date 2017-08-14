var htttps = require("https");
var fs = require("fs");

var options = {
	host: "google.com.ua",
	port: 443,
	path: "/search?q=lipton&oq=lipton&gs_l=psy-ab.3..0i67k1j0l3.3241.7720.0.7896.11.9.2.0.0.0.90.702.9.9.0....0...1.1.64.psy-ab..0.11.706.6..35i39k1j0i131k1j0i10k1.OxjG2NHhCDc",
	method: "GET"
};

var req = https.request(options, function(res) {
	
	var responseBody = "";

	console.log("Response from server started");
	console.log('Server Status: $ {res.statusCode}');
	console.log("Response Headers: %j", res.headers);

	res.setEncoding("UTF-8");

	res.once("data", functon(chunk) {
		console.log(chunk);
	});

	res.on("data", function(chunk) {
		console.log('--chunk-- ${chunk.length}');
		responseBody += chunk;
	});

	res.on("end", function() {
		fs.writeFile("liptonRequest.html", responseBody, function(err) {
			if (err) {
				throw err;
			}
			console.log("File Downloaded");
		});
	});
});

req.on("error", function(err) {
	console.log('problem with request: ${err.message}');
});