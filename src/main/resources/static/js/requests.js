$(document).on("click", "#create-task", function (event) {
    let task = {
        id: 0,
        title: $('#new-task-text').val(),
        isDone: false
    }
    if (!(task.title.length === 0 || !task.title.trim())){
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/tasks',
            data: JSON.stringify(task),
            success: function success() {
                reloadPage();
            }
        });
    }
});
$(document).on("click", ".set-task-is-done", function (el) {
    let parent = $(el.target).closest('.div-with-content');
    let task = {
        id: $(parent.find('.task-id')).text(),
        title: $(parent.find('.task-title')).text(),
        isDone: true
    };
    console.log(task);
    editTask(task.id, task);
});
$(document).on("click", ".set-task-is-undone", function (el) {
    let parent = $(el.target).closest('.div-with-content');
    let task = {
        id: $(parent.find('.task-id')).text(),
        title: $(parent.find('.task-title')).text(),
        isDone: false
    };
    console.log(task);
    editTask(task.id, task);
});
$(document).on("click", ".delete-task", function (el) {
    let id = $($(el.target).closest('.div-with-content').find('.task-id')).text();
    $.ajax({
        type: 'DELETE',
        url: '/tasks/' + id,
        success: function success() {
            reloadPage();
        }
    });
});
function editTask(id, task) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: '/tasks/' + id + '/edit',
        data: JSON.stringify(task),
        success: function success() {
            reloadPage();
        }
    });
}
$(document).on("click", "#done-tasks", function () {
    let buttonDone = $('#done-tasks');
    if (buttonDone.hasClass('selected')) {
        buttonDone.removeClass('selected');
    } else {
        buttonDone.addClass('selected');
        $('#undone-tasks').removeClass('selected');
    }
    reloadPage();
});
$(document).on("click", "#undone-tasks", function () {
    let button = $('#undone-tasks');
    if (button.hasClass('selected')) {
        button.removeClass('selected');
    } else {
        button.addClass('selected');
        $('#done-tasks').removeClass('selected');
    }
    reloadPage();
});

function reloadPage() {
    let filter = $('#undone-tasks').hasClass('selected') ? '?filter=undone' :
        $('#done-tasks').hasClass('selected') ? '?filter=done' : '';
    window.location.href = 'tasks' + filter;
}