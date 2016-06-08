function upload() {
	window.location = backendurl + "upload.html?x=" + hash;
}

function results() {
	window.location = backendurl + "results.html?x=" + hash;
}

function checkinput(form) {
	if (form.user.value == "" || form.user.value.length < 4) {
		alert("Username must contain at least 4 characters");
		return false;
	}
	
	if (form.pass.value != form.passconf.value || form.pass.value == "") {
		alert("Passwords do not match");
		return false;
	}
	
	return true;
}

function getToday() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = yyyy + '-' + mm + '-' + dd;
	
	return today;
}


function createQuery(keyw, prof, coun) {
	var query = "";
	
	if (keyw == "" && (prof == "Any" || prof == "") && (coun == "Any" || coun == "")) {
		query = "*";
	}
	
	if (keyw != "") {
		query = "query:\"" + keyw + "\"";
	}
	
	if (!(prof == "Any" || prof == "")) {
		if (keyw != "") {
			query += " AND ";
		}
		query += "profession:\"" + prof + "\"";
	}
	
	if (!(coun == "Any" || coun == "")) {
		if (!(keyw == "" && (prof == "Any" || prof == ""))) {
			query += " AND ";
		}
		query += "country:\"" + coun + "\"";
	}
	
	return query;
}

function createDate(from, to) {
	var date = "from:'" + from + "',mode:absolute,to:'" + to + "'";
	
	return date;
}

function createFilters(keyw1, keyw2, keyw3) {
	var filters = "(input:(query:(query_string:(analyze_wildcard:!t,query:'query:\"" + keyw1 + "\"'))),label:'" + keyw1 + "')";
	
	if (keyw2 != "") {
		filters += ",(input:(query:(query_string:(analyze_wildcard:!t,query:'query:\"" + keyw2 + "\"'))),label:'" + keyw2 + "')";
	}
	
	if (keyw3 != "") {
		filters += ",(input:(query:(query_string:(analyze_wildcard:!t,query:'query:\"" + keyw3 + "\"'))),label:'" + keyw3 + "')";
	}
	
	return filters;
}

function getInterval(interval) {
	if (interval == "Auto") {
		return "auto";
	} else if (interval == "Daily") {
		return "d";
	} else if (interval == "Weekly") {
		return "w";
	} else if (interval == "Monthly") {
		return "M";
	} else {
		return "y";
	}
}