function loadOpts() {
	var names = ["-", "Country", "Date/Timestamp", "Document ID", "Doc/Webpage Title", "Profession", "Query", "Session ID", "User ID", "URL Clicked", "Other..."];
	var values = ["none", "country", "date", "docid", "title", "profession", "query", "session", "user", "url", "other"];
	
	var allsel = document.getElementsByTagName('select');
	
	for (var i = 0; i < allsel.length; i++) {
		for (var j = 0; j < names.length; j++) {
			var opt = document.createElement('option');
			opt.innerHTML = names[j];
			opt.value = values[j];
			allsel[i].appendChild(opt);
		}
	}
	
	var url = window.location.href;
	var hash = url.substring(url.indexOf("x=")+2);
	document.getElementById('hash').value = hash;
}