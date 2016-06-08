$(document).ready(function() {
    $("[name=datefrom]").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "yy-mm-dd",
      maxDate: "0",
      defaultDate: "2010-01-01"
    });
    $("[name=dateto]").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "yy-mm-dd",
      maxDate: "0",
      defaultDate: 0
    });
});

