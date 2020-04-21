$(document).ready(function () {
    $('#modal').hide();
});
$(document).on("click", "#open-modal", function (event) {
    if ($('#modal').css("display") === "none") {
        $('#modal').show();
    }
    $('#user-id').val(0);
    $('#user-name').val("");
    $('#user-age').val(0);
    $('#create-user').show();
    $('#update-user').hide();
});
$(window).click(function (event) {
    if (event.target === document.getElementById("modal")) {
        $('#modal').hide();
    }
});