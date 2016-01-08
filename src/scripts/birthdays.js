module.exports = {
    month: function(){
        var months = [];

        months.push({
            value: '',
            label: 'Month'
        });

        for (var i = 1; i < 13; i++) {
            months.push({value: i});    
        };

        return months;
    },
    day: function(){
        var days = [];
        days.push({
            value: '',
            label: 'Day'
        });

        for (var i = 1; i < 32; i++) {
            days.push({value: i});
        };

        return days;
    },
    year: function(){
        var years = [];
        var d = new Date();
        var currentYear = d.getFullYear();

        years.push({
            value: '',
            label: 'Year'
        });

        for (var i = 0; i < 100; i++) {
            years.push({value: currentYear - i});
        };

        return years;
    }
}