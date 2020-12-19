/******************************************
    FOREVER functions
******************************************/

//ajax, send async request to server side
function ajax(url, data, parameters){
    $.ajax({ url: url, data: data})
    .done(function(data){
        parameters.c(data);
    });
}

//validate_input, client side validation
function validate_input(type, value){
    //object having different regex pattern for each input type
    const regex = {
        username: /^[a-zA-Z]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*?])(?=.{8,})/,
        email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        phone: /^5[0-9]{7}/,
        none: /.*/,
        // construct a regex from the previous password field
        confirm_password: new RegExp($("[name='pass']").val())
    };

    //throws an error if the input type does not have a regex pattern
    if(!regex.hasOwnProperty(type))
        throw `Given input type does not exist, type: ${type}`;

    //if field empty, evaluate the field as valid else test for regex pattern
    return (value == '')?true:regex[type].test(value);
}

function toggle_input_state(input, state){
    //always remove previously injected element
    $(input).parent().find('.error').remove();
    $(input).data('input_valid', true);

    if(!state){
        var error_node = document.createElement('p');
        $(error_node).addClass('error');
        $(error_node).text($(input).attr('data-error'));
        $(input).parent().append(error_node);
        $(input).data('input_valid', false);
    }
}

function form_valid (form){
    var bools = [];

    $(form).find('input').each(function(index, node){
        //Used the double-not operator to type cast the values to boolean
        bools.push(!!$(node).data('input_valid'));
    });

    //evaluate the array (input state transformed as boolean based on validity)
    for(const bool of bools){
        if(!bool){
            return false;
        }
    }

    return true;
}
