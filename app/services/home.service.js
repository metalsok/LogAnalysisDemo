app.service('homeService', ['client', '$filter', function (client, $filter) {
    
    this.getToday = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        return today;
    };


    this.createQuery = function (keyw, prof, coun) {

        if (prof === null) {
            prof = "Any"
        }
        if (coun === null) {
            coun = "Any"
        }

        var query = null;

        if (keyw == null && (prof == "Any" || prof == null) && (coun == "Any" || coun == null)) {
            query = "*";
        }

        if (keyw != null) {
            query = "query:\"" + keyw + "\"";
        }

        if (!(prof == "Any" || prof == null)) {
            if (keyw != "") {
                query += " AND ";
            }
            query += "profession:\"" + prof + "\"";
        }

        if (!(coun == "Any" || coun == null)) {
            if (!(keyw == null && (prof == "Any" || prof == null))) {
                query += " AND ";
            }
            query += "country:\"" + coun + "\"";
        }
        return query;
    };

    this.createDate = function (startDate, endDate) {
        var date = "from:'" + $filter('date')(startDate, "yyyy-MM-dd") + "',mode:absolute,to:'" + $filter('date')(endDate, "yyyy-MM-dd") + "'";
        return date;
    };

    this.createFilters = function (keyw1, keyw2, keyw3) {
        var filters = "(input:(query:(query_string:(analyze_wildcard:!t,query:'query:\"" + keyw1 + "\"'))),label:'" + keyw1 + "')";

        if (keyw2 != "") {
            filters += ",(input:(query:(query_string:(analyze_wildcard:!t,query:'query:\"" + keyw2 + "\"'))),label:'" + keyw2 + "')";
        }

        if (keyw3 != "") {
            filters += ",(input:(query:(query_string:(analyze_wildcard:!t,query:'query:\"" + keyw3 + "\"'))),label:'" + keyw3 + "')";
        }

        return filters;
    };


    this.getField = function (asso) {
        if (asso == "All Keywords") {
            return "";
        } else if (asso == "All Medical") {
            return "annos.aaa";
        } else {
            return asso.toLowerCase() + ".aaa";
        }
    }

}]);




