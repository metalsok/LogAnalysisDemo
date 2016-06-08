app.controller('homeCtrl', ['$scope', 'client', 'esFactory', 'homeService', homeCtrl]);


function homeCtrl($scope, client, esFactory, homeService) {

    var baseURL = "http://kronos.ifs.tuwien.ac.at:5601/app/kibana#/visualize/create?embed&";
    var hash = "x35ten7";
    var vm = this;

    client.search({
        index: 'x35ten7',
        size: 0,
        body: {
            // Begin query.
            query: {
                match_all: {}
            },
            // Aggregate on the results
            aggs: {
                professions: {
                    terms: {
                        field: "profession.raw",
                        // order by quarter, ascending
                        order: {"_term": "asc"},
                        size: 0
                    }
                }
            }
            // End query.
        }
    }).then(function (resp) {
        vm.professions = resp.aggregations.professions.buckets
        vm.professions.push({key: "Any"});

    });

    client.search({
        index: 'x35ten7',
        size: 0,
        body: {
            // Begin query.
            query: {
                match_all: {}
            },
            // Aggregate on the results
            aggs: {
                countries: {
                    terms: {
                        field: "country.raw",
                        // order by quarter, ascending
                        order: {"_term": "asc"},
                        size: 0
                    }
                }
            }
            // End query.
        }
    }).then(function (resp) {
        vm.countries = resp.aggregations.countries.buckets
        vm.countries.push({key: "Any"});

    });
    vm.intervals = [
        {value: "Auto", key: "auto"},
        {value: "Daily", key: "d"},
        {value: "Weekly", key: "w"},
        {value: "Monthly", key: "M"},
        {value: "Yearly", key: "y"}];

    vm.classes = [
        {value: "All Keywords", key: ""},
        {value: "All Medical", key: "annos.aaa"},
        {value: "Anatomy", key: "Anatomy"},
        {value: "Disease", key: "Disease"},
        {value: "Drug", key: "Drug"},
        {value: "Investigation", key: "Investigation"}];

    var date;
    var query;
    var filters;
    vm.startDate1 = new Date("2014-01-01");
    vm.endDate1 = new Date("2015-03-01");

    vm.startDate2 = new Date("2013-03-01");
    vm.endDate2 = new Date("2016-03-01");

    vm.startDate3 = new Date("2013-03-01");
    vm.endDate3 = new Date("2016-03-01");

    vm.startDate4 = new Date("2013-03-01");
    vm.endDate4 = new Date("2016-03-01");

    vm.startDate5 = new Date("2013-03-01");
    vm.endDate5 = new Date("2016-03-01");

    vm.occuranceOfKeywords = function () {


        date = homeService.createDate(vm.startDate1, vm.endDate1);
        
        if (vm.keyword1 != null) {
            filters = homeService.createFilters(vm.keyword1, vm.keyword2, vm.keyword3);
            query = homeService.createQuery("", vm.profession1, vm.country1);
            console.log(vm.keyword1, vm.keyword2, vm.keyword3, filters);
            vm.kibanaFrameLink = baseURL + "type=line&indexPattern=" + hash + "&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(" + date + "))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'" + query + "')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:" + vm.interval + ",min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(filters:!(" + filters + ")),schema:group,type:filters)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,drawLinesBetweenPoints:!t,interpolate:linear,radiusRatio:9,scale:linear,setYExtents:!f,shareYAxis:!t,showCircles:!t,smoothLines:!f,times:!(),yAxis:()),type:line))";

        }


    };

    vm.sesionId = function () {
        date = homeService.createDate(vm.startDate2, vm.endDate2);

        query = homeService.createQuery(vm.query2, "", "");
        vm.kibanaFrameLink2 = baseURL + "type=pie&indexPattern=" + hash + "&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(" + date + "))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'" + query + "')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:session,order:desc,orderBy:'1',size:" + vm.size2 + "),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!f,shareYAxis:!t),type:pie))";
    };

    vm.mostCommonKeywords = function () {
        date = homeService.createDate(vm.startDate3, vm.endDate3);
        query = homeService.createQuery("", vm.profession3, vm.country3);
        vm.kibanaFrameLink3 = baseURL + "type=pie&indexPattern=" + hash + "&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(" + date + "))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'" + query + "')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:query" + vm.class3.toLowerCase() + ".aaa,order:desc,orderBy:'1',size:" + vm.size3 + "),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!f,shareYAxis:!t),type:pie))";

    };

    vm.setAssosiated = function () {

        date = homeService.createDate(vm.startDate4, vm.endDate4);
        query = homeService.createQuery(vm.keywords, vm.profession4, vm.country4);

        if (vm.keywords != null) {
            vm.keywords = vm.keywords.replace(" ", "|");
        }

        var field = homeService.getField(vm.class4);

        vm.kibanaFrameLink4 = baseURL + "type=pie&indexPattern=" + hash + "&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(" + date + "))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'" + query + "')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(exclude:(pattern:'" + vm.keywords + "'),field:query" + field + ",order:desc,orderBy:'1',size:" + vm.size4 + "),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!f,shareYAxis:!t),type:pie))";

    };

    vm.domains = function () {

        date = homeService.createDate(vm.startDate5, vm.endDate6);
        query = homeService.createQuery(vm.domainQuery, vm.profession5, vm.country5);
        vm.kibanaFrameLink5 = baseURL + "type=pie&indexPattern=" + hash + "&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(" + date + "))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'" + query + "')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(field:URL.raw,order:desc,orderBy:'1',size:" + vm.size5 + "),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!f,shareYAxis:!t),type:pie))";


    }

}