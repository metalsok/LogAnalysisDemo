var classes = ["Anatomy", "Disease", "Drug", "Investigation"];
var intervals = ["Auto", "Daily", "Weekly", "Monthly", "Yearly"];

function loadSels() {
	getSels("professions");
	getSels("countries");
	setAnnoClasses();
	setDefaultDates();
	setIntervals();
}

function getSels(value) {
	var xmlhttp = new XMLHttpRequest();
	var feedurl = backendurl + value + "?hashcode=" + hash;

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var resp = JSON.parse(xmlhttp.responseText);
	        setSels(resp, value);
	    }
	};
	xmlhttp.open("GET", feedurl, true);
	xmlhttp.send();
}

function setSels(resp, value) {
	if (value == "professions") {
		var buckets = resp[0].aggregations.professions.buckets;
	} else {
		var buckets = resp[0].aggregations.countries.buckets;
	}
	var sel = document.getElementsByName(value);
	for (var i = 0; i < sel.length; i++) {
		var opt = document.createElement('option');
		opt.innerHTML = "Any";
		sel[i].appendChild(opt);
		for (var j = 0; j < buckets.length; j++) {
			var opt = document.createElement('option');
			opt.innerHTML = buckets[j].key;
			sel[i].appendChild(opt);
		}
	}
}

function setAnnoClasses() {
	var sel = document.getElementsByName('anno');
	for (var i = 0; i < sel.length; i++) {
		for (var j = 0; j < classes.length; j++) {
			var opt = document.createElement('option');
			opt.innerHTML = classes[j];
			sel[i].appendChild(opt);
		}
	}
}

function setDefaultDates() {
	var from = document.getElementsByName('datefrom');
	var to = document.getElementsByName('dateto');
	
	for (var i = 0; i < from.length; i++) {
		from[i].value = "2010-01-01";
		to[i].value = getToday();
	}
	
	var occfrom = document.getElementById('occfrom');
	occfrom.value = "2014-01-01";
	
	var occto = document.getElementById('occto');
	occto.value = "2015-03-01";
	
	var sessfrom = document.getElementById('sessfrom');
	sessfrom.value = "2014-01-01";
	
	var sessto = document.getElementById('sessto');
	sessto.value = "2014-12-31";
}

function setIntervals() {
	var sel = document.getElementsByName('interval');
	for (var i = 0; i < sel.length; i++) {
		for (var j = 0; j < intervals.length; j++) {
			var opt = document.createElement('option');
			opt.innerHTML = intervals[j];
			sel[i].appendChild(opt);
		}
		sel[i].selectedIndex = 3;
	}
}