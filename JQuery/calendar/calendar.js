$(document).ready(function(){
    setCalendarData(new Date());

    $('.previous-btn').click(function () {
        var date = $('#month-name').text().split(' - ');
        if(date[0] === 'January '){
            date[0] = 'December ';
            date[1] = date[1] - 1;
        } else {
            date[0] = getMonthName(new Date(date[1] + ' / ' + date[0] + ' / ' + '1').getMonth() - 1);
        }
        $('#month-name').text(getMonthName(date[0]) + '  -  ' + date[1]);
        $('table tr:first-child').siblings().remove();
        setCalendarData(new Date(date[1] + ' / ' + date[0] + ' / ' + '1'));
    });

    $('.next-btn').click(function () {
        var date = $('#month-name').text().split(' - ');
        if(date[0] === 'December '){
            date[0] = 'January ';
            date[1] = Number(date[1]) + 1 ;
        } else {
            date[0] = getMonthName(new Date(date[1] + ' / ' + date[0] + ' / ' + '1').getMonth() + 1);
        }
        $('#month-name').text(getMonthName(date[0]) + '  -  ' + date[1]);
        $('table tr:first-child').siblings().remove();
        setCalendarData(new Date(date[1] + ' / ' + date[0] + ' / ' + '1'));
    });
});

function getMonthName(index) {
    var month = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return month[index];
};

function getDayName(index) {
    var day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return day[index];
};

function setCalendarData(d) {
    var m = d.getMonth();
    var year = d.getFullYear();
    var firstDay = new Date(year, m, 1);
    var lastDay = new Date(year, m + 1, 0);
    var rows = 0;
    var j = 0, k = 1;
    var totalRows = 5;
    $('#month-name').text(getMonthName(d.getMonth()) + '  -  ' + year);
    $('#calendar-data').append('<tr id="table-header"></tr>');
    for(var i = 0 ; i < 7; i++){
        $('#table-header').append('<th class="cell">' + getDayName(i) + '</th>');
    }

    d = new Date(year, m, firstDay.getDate());
    if(firstDay.getDay() >= 5 && lastDay.getDate() > 28){
        totalRows = 6;
    }
    for(var i = 0; rows < totalRows; i++){
        if(i % 7 === 0 ){
            j = 0;
            $('#calendar-data').append('<tr id="row-' + rows + '"></tr>');
            while(j < 7) {
                $('#row-' + rows).append('<td id="cell-' + (j + i + 1) +'" class="cell"></td>');
                if(j % 7 === 0){
                    $('#cell-' + (j + i + 1)).addClass('sunday');
                } else if(j % 7 === 6){
                      $('#cell-' + (j + i + 1)).addClass('saturday');
                }

                if(d.getDay() == j) {
                    if (new Date().getMonth() == d.getMonth() && new Date().getDate() == d.getDate() && new Date().getFullYear() === d.getFullYear()) {
                        $('#cell-' + (j + i + 1)).text(d.getDate()).addClass('today');
                        d = new Date(year, m, (firstDay.getDate() + k));
                        k++;
                    } else {
                        if(rows >= 4 && (d.getDate() <= 7 && d.getDate() >= 1)){
                            $('#cell-' + (j + i + 1)).text(d.getDate()).addClass('other-days');
                            d = new Date(year, m, (firstDay.getDate() + k));
                            k++;
                        } else {
                            $('#cell-' + (j + i + 1)).text(d.getDate());
                            d = new Date(year, m, (firstDay.getDate() + k));
                            k++;
                        }
                    }
                } else {
                      var previousMonthLastDate = new Date(year, d.getMonth(), 0).getDate() + j;
                      $('#cell-' + (j + i + 1)).text((++previousMonthLastDate - d.getDay())).addClass('other-days');
                }
                j++;
            }
            rows++;
        }
    }
};
