var timer = setInterval(getFeed, 1000);

function getFeed() {
	var xmlhttp = new XMLHttpRequest();
	var feedurl = backendurl + "feedback?hashcode=" + hash;

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var resp = JSON.parse(xmlhttp.responseText);
	        setFeed(resp);
	    }
	};
	xmlhttp.open("GET", feedurl, true);
	xmlhttp.send();
}

function setFeed(resp) {
		document.getElementById("anno").innerHTML = resp[0].anno;
		document.getElementById("indexing").innerHTML = resp[0].indexing + "/" + resp[0].lines;
		document.getElementById("total").innerHTML = resp[0].total;
		
		if (resp[0].indexing == resp[0].lines) {
			clearInterval(timer);
			loadSels();
		}
}