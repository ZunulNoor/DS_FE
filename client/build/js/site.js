$(document).ready(function () {
    $('.select2').select2({ width: '100%'});

    $('.datepicker-autoclose').flatpickr({
        dateFormat: "d-M-Y",
        //dateFormat: "d-F-Y"
    });
    
})

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function Notification(caption, type) {
    //types: { success, info, warn, error}
    $.notify(caption, type, { position: "right" });
    
}

toastr.options = {
    "closeButton": true,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function populateSelect(selectName, seq, data) {
    var model = data
    //console.log(data)
    $(`#${selectName}_${seq}`).select2({ width: '100%' });
    for (var i = 0; i < model.length; i++) {
        $(`#${selectName}_${seq}`).append('<option value="' + model[i].Value + '">' + model[i].Text + '</option>');
    }
}




