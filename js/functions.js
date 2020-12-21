/******************************************
    FOREVER functions
******************************************/
var userSnapshot;
var productSnapshot;

$(document).ready(function () {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    switch(page) {
        case 'adminproduct.html':
            ajax(
                '../../builder/bridge.php',
                { request_type: 'allProducts'},
                {c: displayproducts}
            );
          break;
        case 'user.html':
            ajax(
                '../../builder/bridge.php',
                { request_type: 'allUsers'},
                {c: displayuser}
            );
          break;
          case 'admin.html':

            $("#product_submit").css("display", "block");
            $("#product_update").css("display", "none");

            $("#category").change(function() {
                var selected_val = $('#category option:selected').text();
                if (selected_val == 'Footwear') {
                    $(".radio_btn_foot").css("display", "block");
                    $(".radio_btn_cloth").css("display", "none");
                }
                else if (selected_val == 'Clothing') {
                    $(".radio_btn_foot").css("display", "none");
                    $(".radio_btn_cloth").css("display", "block");
                }else{
                    $(".radio_btn_foot").css("display", "none");
                    $(".radio_btn_cloth").css("display", "none");
                }
            });
              if(hasParam('id') == true){

                $("#product_submit").css("display", "none");
                $("#product_update").css("display", "block");

                const queryString = window.location.search;  
                const urlParams = new URLSearchParams(queryString);
                const prod_id = urlParams.get('id');
                ajax(
                    '../../builder/bridge.php',
                    { request_type: 'update_product', data:  prod_id},
                    {c: updateproduct}
                );
              }
          break;
        default:
         
      }

});


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
        number: /[0-9]/,
        // construct a regex from the previous password field
        confirm_password: new RegExp($("[name='pass']").val())
    };

    //throws an error if the input type does not have a regex pattern
    if(!regex.hasOwnProperty(type))
        throw `Given input type does not exist, type: ${type}`;

    //if field empty, evaluate the field as valid else test for regex pattern
    return (value == '')?false:regex[type].test(value);
}

function toggle_input_state(input, state, err = null){
    //always remove previously injected element
    $(input).parent().find('.error').remove();
    $(input).data('input_valid', true);
    const input_type_exception = ['file', 'checkbox', 'hidden', 'radio'];

    if(!state && !input_type_exception.includes($(input).attr('type'))){
        var error_node = document.createElement('p');
        $(error_node).addClass('error');
        $(error_node).text((err == null)?$(input).attr('data-error'):err);
        $(input).parent().append(error_node);
        $(input).data('input_valid', false);
    }
}

function form_valid (form){
    var bools = [];
    const input_type_exception = ['file', 'checkbox', 'hidden', 'radio'];
    $(form).find('input').each(function(index, node){
        //Used the double-not operator to type cast the values to boolean
        if(!input_type_exception.includes($(node).attr('type')))
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
function displayuser(obj){
	var object = JSON.parse(obj);
	for(var i = 0; i < object.length; i++){
		var trNode = document.createElement("tr");
		var usernameNode = document.createElement("td");
		var emailNode = document.createElement("td");
		// var pwdNode = document.createElement("td");
		var statusNode = document.createElement("td");
		var btnNode = document.createElement("button");
		var suspendBtn =  document.createElement("button");

		$(btnNode).addClass("btn-dark");
		$(suspendBtn).addClass("btn-danger");

		$(trNode).attr("id", object[i].user_id);
		$(usernameNode).text(object[i].username );
		$(emailNode).text(object[i].email_address);
		// $(pwdNode).text(object[i].password);
		$(statusNode).text(object[i].account_status);
		//$(statusNode).attr("id", "statusNode-"+obj[i].USER_ID);
		$(btnNode).text("Approve");
		$(btnNode).attr("id", "btn-approve-"+object[i].user_id);
		$(suspendBtn).text("Suspend");
		$(suspendBtn).attr("id", "btn-suspend-"+object[i].user_id);

		$(trNode).append(usernameNode).append(emailNode).append(statusNode).append(btnNode).append(suspendBtn);
		$("#user_dataset").append(trNode);
		if (($(statusNode).text())=="inactive"){
			$("#btn-approve-"+object[i].user_id).css("display", "flex");
			$("#btn-suspend-"+object[i].user_id).css("display", "none");
		}else{
			$("#btn-approve-"+object[i].user_id).css("display", "none");
			$("#btn-suspend-"+object[i].user_id).css("display", "flex");
		}

		//------Button event to suspend status-----------
		$("#btn-suspend-"+object[i].user_id).click(function(){
			var userID = $(this).parent();
            emptyContent("#user_dataset");
            ajax(
                '../../builder/bridge.php',
                { request_type: 'update_user_suspended', data: $(userID).attr("id") },
                {c: displayuser}
            );
		});

		$("#btn-approve-"+object[i].user_id).click(function(){
			var userID = $(this).parent();
            emptyContent("#user_dataset");
            ajax(
                '../../builder/bridge.php',
                { request_type: 'update_user_approved', data: $(userID).attr("id") },
                {c: displayuser}
            );
		});

	}
	userSnapshot = $("#user_dataset").children();
}

function emptyContent(selector){
	$(selector).children().detach();
}
function search(){
    var text = $("#searchBar input").val();
    emptyContent("#user_dataset");
    for(var index = 0; index < userSnapshot.length; index++){
        if($(userSnapshot[index].children[0]).text().includes(text)){

            if(text == ""){
              	emptyContent("#user_dataset");
               	$("#user_dataset").append($(userSnapshot));
               	// console.log($(userSnapshot));
            }else{
            	emptyContent("#user_dataset");
                $("#user_dataset").append($(userSnapshot[index]));
                	// console.log($(userSnapshot[index]));
            }
            break;
        }
    }
}

function submitForm(oFormElement, args){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(args.o == null){
                args.c(this.responseText);
            }else{
                args.c(this.responseText, args.o);
            }
        }
    }

    xmlhttp.open("POST", oFormElement.action);
    xmlhttp.send(new FormData(oFormElement));
}

// $('#form_product').on("submit", function(event){
//     event.preventDefault(); //prevent form submission
//     var serialized_form =  $('#form_product').serialize();
//     console.log(serialized_form);

//     ajax(
//         '../../builder/bridge.php'+"?"+serialized_form,
//         { request_type: 'db_insert_product'},
//         {c: initialize_product}
//     );

//     // if(form_valid($('#form_product'))){
//     //     ajax(
//     //         '../builder/bridge.php'+"?"+serialized_form,
//     //         { request_type: 'db_insert_product'},
//     //         {c: initialize_user}
//     //     );
//     // }else{
//     //     $('#form_product').find('input').each(function(index, node){
//     //         toggle_input_state($(node), !!$(node).data('input_valid'));
//     //     })
//     // }
// });
// function initialize_product(dataset){
//     // const deserialized_data = JSON.parse(dataset);
//     console.log(dataset);
// }

function updateUser(obj){
    var updated_user = JSON.parse(obj);
    var session = JSON.parse(window.sessionStorage.getItem('user_metadata'));
    session.username = updated_user[0].username;
    session.avatar = updated_user[0].avatar;

    window.sessionStorage.setItem('user_metadata', JSON.stringify(session));
    if (window.location.pathname.split("/").pop() == "index.html"){
        var split_path = session.avatar.split("/");
        split_path.shift();
        session.avatar = split_path.join("/");
    }

    $("#profile_avatar").css("background-image", "url('"+ session.avatar +"')");
    $("#profile_name").text(session.username);

    $(".dismiss").click();
}

function initialize_product(dataset){
    const deserialized_data = JSON.parse(dataset);
    if(deserialized_data != 0 && deserialized_data.data == 'success'){
        window.location.href = "adminproduct.html";
    }
}
function displayproducts (obj) {
    const product_data = JSON.parse(obj)
    for(var i = 0; i < product_data.length; i++){
		var trNodeProduct = document.createElement("tr");
        var prodNameNode = document.createElement("td");
        var editTD = document.createElement("td");
        var deleteTD = document.createElement("td");
		var editNode = document.createElement("button");
		var deleteNode =  document.createElement("button");

		$(editNode).addClass("btn-dark");
		$(deleteNode).addClass("btn-danger");

		$(trNodeProduct).attr("id", product_data[i].product_id);
		$(prodNameNode).text(product_data[i].prod_name );


		$(editNode).text("Edit");
		$(editNode).attr("id", "btn-edit-"+product_data[i].product_id);
		$(deleteNode).text("Delete");
		$(deleteNode).attr("id", "btn-delete-"+product_data[i].product_id);


        $(editTD).append(editNode);
        $(deleteTD).append(deleteNode);
		$(trNodeProduct).append(prodNameNode).append(editTD).append(deleteTD);
		$("#product_dataset").append(trNodeProduct);


		$("#btn-edit-"+product_data[i].product_id).click(function(){
            var prodID = $(this).parent().parent();
            window.location.href = "admin.html?id="+$(prodID).attr("id");
		});

		$("#btn-delete-"+product_data[i].product_id).click(function(){
            var prodID = $(this).parent().parent();
            console.log($(prodID).attr("id"));
            emptyContent("#product_dataset");
            ajax(
                '../../builder/bridge.php',
                { request_type: 'delete_product', data: $(prodID).attr("id") },
                {c: displayproducts}
            );
		});

	}
	productSnapshot = $("#product_dataset").children();
  }
  function searchproduct(){
    var text = $("#searchBarproduct input").val();
    emptyContent("#product_dataset");
    for(var index = 0; index < productSnapshot.length; index++){
        if($(productSnapshot[index].children[0]).text().includes(text)){

            if(text == ""){
              	emptyContent("#product_dataset");
               	$("#product_dataset").append($(productSnapshot));
               	// console.log($(productSnapshot));
            }else{
            	emptyContent("#product_dataset");
                $("#product_dataset").append($(productSnapshot[index]));
                	// console.log($(productSnapshot[index]));
            }
            break;
        }
    }
}

function updateproduct(obj){
    const product_data = JSON.parse(obj);
    console.log(product_data);
    $(document).ready(function () {
        console.log(product_data[0]['prod_name']);
        $("#product_name").val(product_data[0]['prod_name']);
        $("#product_desc").val(product_data[0]['prod_desc']);
        $("#product_price").val(product_data[0]['inv_price']);
        $("#product_brand").val(product_data[0]['prod_brand']);
        $("#product_tags").val(product_data[0]['prod_tags']);
        $("#product_color").val(product_data[0]['inv_color']);
        $("#product_qty").val(product_data[0]['inv_qoh']);
        $('#ch_img_product').attr("src","../."+product_data[0]['prod_image']);
        $("#category").val(product_data[0]['cat_id']);
        $("#product_gender_cat").val(product_data[0]['prod_age_group']);
        if ((product_data[0]['cat_id']) == 1){
            $(".radio_btn_foot").css("display", "none");
            $(".radio_btn_cloth").css("display", "block");
            $( ".radio_btn_cloth input" ).each(function(index, node){
                if($(node).val() == product_data[0]['inv_size']){
                    $(node ).prop('checked',  true);
                }
            });
        }else if ((product_data[0]['cat_id']) == 2) {
            $(".radio_btn_foot").css("display", "block");
            $(".radio_btn_cloth").css("display", "none");

            $( ".radio_btn_foot input" ).each(function(index, node){
                if($(node).val() == product_data[0]['inv_size']){
                    $(node ).prop('checked',  true);
                    
                }
            });
        }else{
            $(".radio_btn_foot").css("display", "none");
            $(".radio_btn_cloth").css("display", "none");
        }
    });
    
}
function hasParam(param){
    var field = param;
    var url = window.location.href;
    if(url.indexOf('?' + field + '=') != -1)
        return true;
    else if(url.indexOf('&' + field + '=') != -1)
        return true;
    return false

}
