$(document).ready(function () {

    $.validator.addMethod('validateDob', function(value, element) {
       var selectedDate = new Date($('input[name="dob"]').val()).getFullYear();
       var currentDate = new Date().getFullYear();
       if(currentDate - selectedDate >= 18 && currentDate - selectedDate <= 40){
           return true;
       } else {
         return false;
       }
    }, 'Age must be between 18 - 40');

    $.validator.addMethod('validateName', function(value, element){
       var name = $('input[name="name"]').val();
       if(/[a-zA-Z]/.test(name)){
          return true;
       } else {
          return false;
       }
    }, 'Only characters are allowed');

    $.validator.addMethod('validateEmail', function(value, element) {
       var email = $('input[name="email"]').val();
       if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email)) {
          return true;
       } else {
          return false;
       }
    }, 'abc@example.com');

    $('form').validate({
        rules : {
            name : {
                required : true,
                validateName : true
            },

            email : {
                email : true,
                required : true,
                validateEmail : true
            },

            mob : {
                digits : true,
                maxlength : 10,
                minlength : 10,
                required : true
            },

            dob : {
                required : true,
                validateDob : true
            },
            course: {
                required: true
            }
        },

        messages : {
            name : {
                required : 'Please enter your name'
            },
            email : {
                required : 'This field is required',
                email : 'Email must be in a proper format'
            },
            mob : {
                digits : 'Enter digits only'
            },
            course: {
                required: 'Select a course'
            }
        }
    });
});
