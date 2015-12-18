function writeHeader(){
	$.ajax({
		url: "./components/header.html", //index.htmlの階層が基準
		cache: false,
		async: false,
		success: function(html) {
			document.write(html);
		}
	});
}

function writeNavbar(){
	$.ajax({
		url: "./components/navbar.html", //index.htmlの階層が基準
		cache: false,
		async: false,
		success: function(html) {
			document.write(html);
		}
	});
}

function writeFooter(){
	$.ajax({
		url: "./components/footer.html", //index.htmlの階層が基準
		cache: false,
		async: false,
		success: function(html) {
			document.write(html);
		}
	});
}
