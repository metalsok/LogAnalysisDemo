var vizurl = "http://kronos.ifs.tuwien.ac.at:5601/app/kibana#/visualize/create?embed&";

function occurrence() {
	var keyw1 = document.getElementById('occkeyw1').value;
	var keyw2 = document.getElementById('occkeyw2').value;
	var keyw3 = document.getElementById('occkeyw3').value;
	var prof = document.getElementById('occprof').value;
	var coun = document.getElementById('occcoun').value;
	var from = document.getElementById('occfrom').value;
	var to = document.getElementById('occto').value;
	var interval = document.getElementById('occint').value;
	
	var date = createDate(from, to);
	
	interval = getInterval(interval);
	
	if (keyw1 != "") {
		var query = createQuery("", prof, coun);
		var filters = createFilters(keyw1, keyw2, keyw3);
		document.getElementById('occfrm').src = vizurl + "type=line&indexPattern=" + hash + "&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(" + date + "))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'" + query + "')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:" + interval + ",min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(filters:!(" + filters + ")),schema:group,type:filters)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,drawLinesBetweenPoints:!t,interpolate:linear,radiusRatio:9,scale:linear,setYExtents:!f,shareYAxis:!t,showCircles:!t,smoothLines:!f,times:!(),yAxis:()),type:line))";
	}
}

function keyword() {
	var keyw = document.getElementById('keywquer').value;
	var prof = document.getElementById('keywprof').value;
	var coun = document.getElementById('keywcoun').value;
	var size = document.getElementById('keywsize').value;
	var from = document.getElementById('keywfrom').value;
	var to = document.getElementById('keywto').value;
	
	var date = createDate(from, to);
	
	var query = createQuery(keyw, prof, coun);
	if (keyw != "") {
		keyw = "|" + keyw.replace(" ", "|");
	}
	document.getElementById('keywfrm').src = vizurl + "type=pie&indexPattern=" + hash + "&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(" + date + "))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'" + query + "')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(exclude:(pattern:'and%7Cor%7Cfrom%7Cin%7Cof%7Cto%7C%5B0-9%5D.*%7Cfor%7Cwith%7Cthe%7Cnot%7Cnon%7Cno%7Can%7Con" + keyw + "'),field:query,order:desc,orderBy:'1',size:" + size + "),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!f,shareYAxis:!t),type:pie))";	
}

function domains() {
	var keyw = document.getElementById('domquer').value;
	var prof = document.getElementById('domprof').value;
	var coun = document.getElementById('domcoun').value;
	var size = document.getElementById('domsize').value;
	var from = document.getElementById('domfrom').value;
	var to = document.getElementById('domto').value;
	
	var date = createDate(from, to);
	
	var query = createQuery(keyw, prof, coun);
	document.getElementById('domfrm').src = vizurl + "type=pie&indexPattern=" + hash + "&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(" + date + "))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'" + query + "')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:URL.raw,order:desc,orderBy:'1',size:" + size + "),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!f,shareYAxis:!t),type:pie))";
}

function annotated() {
	var annoclass = document.getElementById('annoclass').value;
	var prof = document.getElementById('annoprof').value;
	var coun = document.getElementById('annocoun').value;
	var size = document.getElementById('annosize').value;
	var from = document.getElementById('annofrom').value;
	var to = document.getElementById('annoto').value;
	
	var date = createDate(from, to);

	var query = createQuery("", prof, coun);
	document.getElementById('annofrm').src = vizurl + "type=pie&indexPattern=" + hash + "&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(" + date + "))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'" + query + "')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:query" + annoclass.toLowerCase() + ".aaa,order:desc,orderBy:'1',size:" + size + "),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!f,shareYAxis:!t),type:pie))";
}

function associated() {
	var assocon = document.getElementById('assocon').value;
	var assoclass = document.getElementById('assoclass').value;
		
	setConcept(assocon, assoclass);
}

function setConcept(assocon, assoclass) {
	var xmlhttp = new XMLHttpRequest();
	var feedurl = backendurl + "concept?hashcode=" + hash + "&concept=" + assocon + "&type=" + assoclass.toLowerCase();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var resp = JSON.parse(xmlhttp.responseText);
	        document.getElementById('assotitle').innerHTML = resp[0].aggregations.concepts.buckets[0].key;
	        setAsso(assocon, assoclass, resp);
	    }
	};
	xmlhttp.open("GET", feedurl, true);
	xmlhttp.send();
}

function setAsso(assocon, assoclass, resp) {
	var assotarget = document.getElementById('assotarget').value;
	var prof = document.getElementById('assoprof').value;
	var coun = document.getElementById('assocoun').value;
	var size = document.getElementById('assosize').value;
	var from = document.getElementById('assofrom').value;
	var to = document.getElementById('assoto').value;
	
	var date = createDate(from, to);
	
	var concept = resp[0].aggregations.concepts.buckets[0].key.split(";")[1];

	var conquery = "query" + assoclass.toLowerCase() + ".aaa.concept:\"" + concept + "\"";
	        	
	var query = createQuery("", prof, coun);
	if (query != "") {
		conquery += " AND " + query;
	}
				
	document.getElementById('assofrm').src = vizurl + "type=pie&indexPattern=" + hash + "&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(" + date + "))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'" + conquery + "')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(exclude:(pattern:'.*" + concept + ".*'),field:query" + assotarget.toLowerCase() + ".aaa,order:desc,orderBy:'1',size:" + size + "),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!f,shareYAxis:!t),type:pie))";
}

function sessions() {
	var keyw = document.getElementById('sessquer').value;
	var size = document.getElementById('sesssize').value;
	var from = document.getElementById('sessfrom').value;
	var to = document.getElementById('sessto').value;
	
	var date = createDate(from, to);
	
	var query = createQuery(keyw, "", "");
	
	document.getElementById('sessfrm').src = vizurl + "type=pie&indexPattern=" + hash + "&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(" + date + "))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'" + query + "')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:session,order:desc,orderBy:'1',size:" + size + "),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!f,shareYAxis:!t),type:pie))";
}