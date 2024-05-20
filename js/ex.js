$(document).ready(
    function () {
        for (var i = 2024; i > 1930; i--) {
            $('#year').append('<option value="' + i + '">' + i + '</option>');
        }
        for (var i = 1; i < 13; i++) {
            $('#month').append('<option value="' + i + '">' + i + '</option>');
        }
        for (var i = 1; i < 32; i++) {
            $('#day').append('<option value="' + i + '">' + i + '</option>');
        }
    }
);