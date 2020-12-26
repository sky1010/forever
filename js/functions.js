/******************************************
    FOREVER functions
******************************************/
var userSnapshot;
var productSnapshot;
var product_ = $("#product_dataset [data-product-id]");

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

            $("#add_text_product").css("display", "block");
            $("#update_text_product").css("display", "none");

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
                $("#form_product input").each(function(index, node){
                    $(node).data('input_valid', true);
                });

                $("#product_submit").css("display", "none");
                $("#product_update").css("display", "block");

                $("#add_text_product").css("display", "none");
                $("#update_text_product").css("display", "block");

                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const prod_id = urlParams.get('id');
                $("#product_id").val(prod_id);
                ajax(
                    '../../builder/bridge.php',
                    { request_type: 'get_product', data:  prod_id},
                    {c: updateproduct}
                );
            }
            break;
        case 'shop.html':
            ajax(
                '../builder/bridge.php',
                { request_type: 'allProducts'},
                {c: showProducts}
            );

            // console.log(user_metadata.cart_id);
            if (sessionStorage.length != 0){
                const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
                ajax(
                    '../builder/bridge.php',
                    { request_type: 'usercart', data:user_metadata.cart_id },
                    {c: showusercart}
                );
            }
            break;
        case 'index.html':
            if (sessionStorage.length != 0){
                const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
                ajax(
                    'builder/bridge.php',
                    { request_type: 'usercart', data:user_metadata.cart_id },
                    {c: showusercart}
                );
            }
            $("#displaymen").click();
            break;
        case 'contact.html':
                if (sessionStorage.length != 0){
                    const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'usercart', data:user_metadata.cart_id },
                        {c: showusercart}
                    );
                }
            break;
        case 'shopping-cart.html':
                if (sessionStorage.length != 0){
                    const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'usercart', data:user_metadata.cart_id },
                        {c: showusercart}
                    );
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'usercart', data:user_metadata.cart_id },
                        {c: shoppingusercart}
                    );
                    $( "#remove_all" ).click(function() {
                        emptyContent("#shopping_dataset");
                        emptyContent("#cart_dataset");
                        ajax(
                            '../builder/bridge.php',
                            { request_type: 'deleteAll', data:user_metadata.cart_id },
                            {c: shoppingusercart}
                        );
                        ajax(
                            '../builder/bridge.php',
                            { request_type: 'deleteAll', data:user_metadata.cart_id },
                            {c: showusercart}
                        );
                      });


                }
            break;
            case 'check-out.html':
                if (sessionStorage.length != 0){
                    const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'usercart', data:user_metadata.cart_id },
                        {c: showusercart}
                    );
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'fetchuserpayment', data:user_metadata.user_id },
                        {c: fetchuserpayment}
                    );
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'usercart', data:user_metadata.cart_id },
                        {c: paymentcart}
                    );
                }
            break;
        case 'product.html':
            var product_id = window.localStorage.getItem('product_in_view');
            ajax(
                '../builder/bridge.php',
                { request_type: 'get_product', data:  product_id},
                {c: renderSpecificProduct}
            );
            if (sessionStorage.length != 0){
                const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
                ajax(
                    '../builder/bridge.php',
                    { request_type: 'usercart', data:user_metadata.cart_id },
                    {c: showusercart}
                );
            }
            break;
        case 'collection.html':
                if (sessionStorage.length != 0){
                    const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'usercart', data:user_metadata.cart_id },
                        {c: showusercart}
                    );
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'paid_item_list', cart_id:user_metadata.cart_id},
                        {c: paid_item_list}
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
        if(parameters.hasOwnProperty('o'))
            parameters.c(data, ...parameters.o);
        else
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
        number: /^[0-9]*$/,
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
    const input_type_exception = ['file', 'checkbox', 'hidden', 'radio', 'color'];

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

		$(btnNode).addClass("btn btn-success");
		$(suspendBtn).addClass("btn btn-danger");

        $(btnNode).css('margin', '10px auto');
        $(suspendBtn).css('margin', '10px auto');

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
    console.log(dataset);
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

		$(editNode).addClass("btn btn-success");
		$(deleteNode).addClass("btn btn-danger");

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
    $(document).ready(function () {
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


function showProducts(obj, inject_prod_only = false){
    var deserialized_data = JSON.parse(obj);
    var price = []; // GLOBAL price, holds all price from all products respectively
    // console.log(deserialized_data);
    $('#product_dataset').children().remove();

    if(deserialized_data.length > 0){
        if(!inject_prod_only)
            $('#cat_product, #cat_gender, #product_brand, #product_size').children().remove();
        for(var i = 0; i < deserialized_data.length; i++){
            var root_node = $('<div></div>').addClass("col-lg-4 col-sm-6").attr('data-product-id', deserialized_data[i].product_id);
            var product_item_node = $('<div></div>').addClass('product-item');
            var pi_pic_node = $('<div></div>').addClass("pi-pic");
            var pi_text_div = $('<div></div>').addClass('pi-text');
            var category_name = $('<div></div>').addClass('catagory-name').text(deserialized_data[i].cat_desc);
            var product_price = $('<div></div>').addClass('product-price').text("MUR "+deserialized_data[i].inv_price);
            var sale_node = $('<div></div>').addClass('sale pp-sale').text('Sale');
            var ul_node = $('<ul></ul>');
            var li_node_first = $('<li></li>').addClass('w-icon active').append($('<a id= "product_id_'+ deserialized_data[i].product_id+ '" href="#"><i class="icon_bag_alt"></i></a>'));
            var li_node_second = $('<li></li>').addClass('quick-view').append($('<a href="#">+ Quick View</a>').attr('id', deserialized_data[i].product_id));
            var pi_text_a = $("<a href='#'></a>").append($('<h5></h5>').text(deserialized_data[i].prod_name));
            var img_node = $('<img>').attr('src', "." + deserialized_data[i].prod_image);

            $(ul_node).append(li_node_first).append(li_node_second);
            $(pi_pic_node).append(img_node).append(sale_node).append(ul_node);
            $(pi_text_div).append(category_name).append(pi_text_a).append(product_price);
            $(product_item_node).append(pi_pic_node).append(pi_text_div);
            $(root_node).append(product_item_node);
            $('#product_dataset').append(root_node);

            if(!inject_prod_only){
                var data_ref = deserialized_data[i].prod_age_group;
                if($('#cat_gender').find("input[id='"+ data_ref +"']").length == 0){
                    var bc_item_node = $('<div></div>').addClass("bc-item");
                    var label_node = $('<label></label>').text(data_ref).attr('for', data_ref)
                        .append($("<input type='checkbox'>").attr('id', data_ref).attr('name', data_ref.toLowerCase()))
                        .append($('<span></span>').addClass('checkmark'));
                    $(bc_item_node).append(label_node);
                    $('#cat_gender').append(bc_item_node);
                }

                var data_ref = deserialized_data[i].cat_desc;
                if($('#cat_product').find("input[id='"+ data_ref +"']").length == 0){
                    var bc_item_node = $('<div></div>').addClass("bc-item");
                    var label_node = $('<label></label>').text(data_ref).attr('for', data_ref)
                        .append($("<input type='checkbox'>").attr('id', data_ref).attr('name', data_ref))
                        .append($('<span></span>').addClass('checkmark'));
                    $(bc_item_node).append(label_node);
                    $('#cat_product').append(bc_item_node);
                }

                var data_ref = deserialized_data[i].prod_brand;
                if($('#product_brand').find("input[id='"+ data_ref +"']").length == 0){
                    var bc_item_node = $('<div></div>').addClass("bc-item");
                    var label_node = $('<label></label>').text(data_ref).attr('for', data_ref)
                        .append($("<input type='checkbox'>").attr('id', data_ref).attr('name', data_ref.toLowerCase()))
                        .append($('<span></span>').addClass('checkmark'));
                    $(bc_item_node).append(label_node);
                    $('#product_brand').append(bc_item_node);
                }

                $("#product_id_"+deserialized_data[i].product_id).click(function(event){
                    event.preventDefault();
                    var prodID = $(this).parent().parent().parent().parent().parent();
                    if (sessionStorage.length != 0){
                        const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
                        ajax(
                            '../builder/bridge.php',
                            { request_type: 'checkCart', cart_id:user_metadata.cart_id , prod_id:$(prodID).attr("data-product-id") },
                            {c: checkCart, o:[ user_metadata.cart_id ,$(prodID).attr("data-product-id")]}
                        );

                    }else{
                        console.error('You must login');
                    }

                });

                $(li_node_second).find('a').click(function(){
                    event.preventDefault();
                    console.log($(this));
                    window.localStorage.setItem('product_in_view', $(this).attr('id'));
                    window.location.href = 'product.html';
                });

                price.push(deserialized_data[i].inv_price);
                //spread the array to single element using the spread operator
                $('#range_slider').attr('data-min', Math.min(...price)).attr('data-max', Math.max(...price));

                var data_ref = deserialized_data[i].inv_size;
                if($('#product_size').find("input[id='"+ data_ref +"']").length == 0){
                    if(data_ref != null){
                        var sc_item = $("<div></div>").addClass("sc-item")
                            .append($("<input type='radio'>").attr('id', data_ref).attr('name', 'size').attr('value', data_ref))
                            .append($("<label></label>").attr('for',data_ref).text(data_ref));
                        $('#product_size').append(sc_item);
                    }
                }
            }
        }
        //save a snapshot of the real DOM
        product_ = $("#product_dataset [data-product-id]");
        reloadDOM(paginateDOM(product_, "#product_dataset", 6), "#product_dataset");
    }
}


function showusercart(obj){

    // console.log(obj);
    var path = window.location.pathname;
    var page = path.split("/").pop();
    const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
    if(obj === "[]"){
        // console.log('empty');
        $('#card_count').text('0');
        $('#sum_cart').text('Rs 0' );
        $('#sum_cart_2').text('Rs 0' );
    }else{
        // console.log('not empty');
        const cart_data = JSON.parse(obj);
        // console.log(cart_data);
        $('#card_count').text(cart_data.length);
        var sum = 0;
        var inc_prod = 0;
        for(var i = 0; i < cart_data.length; i++){
            var tr_Node = $('<tr></tr>').attr('data-product-id', cart_data[i].product_id);
            var td_si_pic = $('<td></td>').addClass('si-pic');
            if(page == 'index.html'){
                var img_node = $('<img>').attr('src', "forerver/." + cart_data[i].prod_image).attr('height','90px').attr('width', '90px');
            }else{
                var img_node = $('<img>').attr('src', "." + cart_data[i].prod_image).attr('height','90px').attr('width', '90px');
            }
            var td_si_text = $('<td></td>').addClass("si-text");
            var product_selected_div = $('<div></div>').addClass('product-selected');
            inc_prod = parseInt(cart_data[i].inv_price * cart_data[i].prod_qty );
            var c_price = $('<p></p>').text("Rs "+cart_data[i].inv_price+ ' x '+ cart_data[i].prod_qty);
            var c_name = $('<h6></h6>').text(cart_data[i].prod_name);
            var td_close = $('<td></td>').addClass('si-close');
            var li_close = $('<li></li>').addClass('ti-close').attr("id", "btn-remove-"+cart_data[i].product_id);

            $(td_si_pic).append(img_node);
            $(product_selected_div).append(c_price).append(c_name);
            $(td_si_text).append(product_selected_div);
            $(td_close).append(li_close);
            $(tr_Node).append(td_si_pic).append(td_si_text).append(td_close);
            $('#cart_dataset').append(tr_Node);
             sum += inc_prod;
             if(page == 'index.html'){
                $("#btn-remove-"+cart_data[i].product_id).click(function(){
                    var prodID = $(this).parent().parent();
                    emptyContent("#cart_dataset");
                    ajax(
                        'builder/bridge.php',
                        { request_type: 'cart_delete_product', data:$(prodID).attr("data-product-id"), cart_id:user_metadata.cart_id },
                        {c: showusercart}
                    );
                    // emptyContent("#shopping_dataset");
                    // ajax(
                    //     'builder/bridge.php',
                    //     { request_type: 'cart_delete_product', data:$(prodID).attr("data-product-id"), cart_id:user_metadata.cart_id },
                    //     {c: shoppingusercart}
                    // );
                });
            }else{
                $("#btn-remove-"+cart_data[i].product_id).click(function(){
                    var prodID = $(this).parent().parent();
                    emptyContent("#cart_dataset");
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'cart_delete_product', data:$(prodID).attr("data-product-id"), cart_id:user_metadata.cart_id },
                        {c: showusercart}
                    );
                    emptyContent("#shopping_dataset");
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'cart_delete_product', data:$(prodID).attr("data-product-id"), cart_id:user_metadata.cart_id },
                        {c: shoppingusercart}
                    );
                    emptyContent("#payment_cart_dataset");
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'cart_delete_product', data:$(prodID).attr("data-product-id"), cart_id:user_metadata.cart_id },
                        {c: paymentcart}
                    );
                });
            }


        }
        $('#sum_cart').text('Rs ' +sum);
        $('#sum_cart_2').text('Rs ' +sum);

   }
}

function checkCart(obj, cart_id, prod_id){
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == 'index.html'){
        console.log(cart_id, prod_id);
        const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
        // console.log(obj);
        if(obj === "[]"){
            const cart_data = JSON.parse(obj)
            // console.log('Not exist');
            emptyContent("#cart_dataset");
            ajax(
                'builder/bridge.php',
                { request_type: 'addtocart', cart_id:cart_id , prod_id:prod_id },
                {c: showusercart}
            );

        }else{
            // console.log('exist');
            emptyContent("#cart_dataset");
            ajax(
                'builder/bridge.php',
                { request_type: 'IncrementCart', cart_id:cart_id,  prod_id:prod_id},
                {c: showusercart}
            );
        }
        }else{
        console.log(cart_id, prod_id);
        const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
        // console.log(obj);
        if(obj === "[]"){
            const cart_data = JSON.parse(obj)
            // console.log('Not exist');
            emptyContent("#cart_dataset");
            ajax(
                '../builder/bridge.php',
                { request_type: 'addtocart', cart_id:cart_id , prod_id:prod_id },
                {c: showusercart}
            );

        }else{
            // console.log('exist');
            emptyContent("#cart_dataset");
            ajax(
                '../builder/bridge.php',
                { request_type: 'IncrementCart', cart_id:cart_id,  prod_id:prod_id},
                {c: showusercart}
            );
        }
    }
}

function shoppingusercart(obj){
    // console.log(obj);
    const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
    if(obj === "[]"){
        // console.log('empty');
        $('#total_shopping_cart').text('Rs 0');
        $('#remove_all').css('display', 'none');

    }else{
        // console.log('not empty');
        const cart_data = JSON.parse(obj);
        var sum = 0;
        var inc_prod = 0;

        for(var i = 0; i < cart_data.length; i++){
            var tr_Node = $('<tr></tr>').attr('data-product-id', cart_data[i].product_id);
            var td_cart_pic = $('<td></td>').addClass('cart-pic');
            var img_node = $('<img>').attr('src', "." + cart_data[i].prod_image).attr('height','180px').attr('width', '180px');
            var td_card_title = $('<td></td>').addClass('cart-title');
            var h6_title =  $('<p></p>').text(cart_data[i].prod_name);
            var price =  $('<td></td>').addClass('p-price ').text("Rs "+cart_data[i].inv_price);
            var td_qty =  $('<td></td>').addClass('qua-col');
            var div_quantity = $('<div></div>').addClass('quantity');
            var div_pro_qty = $('<div></div>').addClass('pro-qty');
            var input = $('<input type="text">').val( cart_data[i].prod_qty);
            var td_total = $('<td></td>').addClass('total-price').text('Rs ' +parseInt(cart_data[i].inv_price * cart_data[i].prod_qty ));
            var td_close =  $('<td></td>').addClass('close-td');
            var li_close = $('<li></li>').addClass('ti-close').attr("id", "btn-remove-shop-"+cart_data[i].product_id);

            $(td_cart_pic).append(img_node);
            $(td_card_title).append(h6_title);
            $(div_pro_qty).append(input);
            $(div_quantity).append(div_pro_qty);
            $(td_qty).append(div_quantity);
            $(td_close).append(li_close);
            $(tr_Node).append(td_cart_pic).append(td_card_title).append(price).append(td_qty).append(td_total).append(td_close)
            $('#shopping_dataset').append(tr_Node);
            inc_prod = parseInt(cart_data[i].inv_price * cart_data[i].prod_qty );
            sum += inc_prod;


                $("#btn-remove-shop-"+cart_data[i].product_id).click(function(){
                    var prodID = $(this).parent().parent();
                    emptyContent("#shopping_dataset");
                    emptyContent("#cart_dataset");
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'cart_delete_product', data:$(prodID).attr("data-product-id"), cart_id:user_metadata.cart_id },
                        {c: showusercart}
                    );
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'cart_delete_product', data:$(prodID).attr("data-product-id"), cart_id:user_metadata.cart_id },
                        {c: shoppingusercart}
                    );
                });


        }
            var proQty = $('.pro-qty');
            proQty.prepend('<span class="dec qtybtn">-</span>');
            proQty.append('<span class="inc qtybtn">+</span>');


            proQty.on('click', '.qtybtn', function () {
                var $button = $(this);
                var oldValue = $button.parent().find('input').val();
                if ($button.hasClass('inc')) {
                    var newVal = parseFloat(oldValue) + 1;
                    var prodID = $(this).parent().parent().parent().parent();
                    emptyContent("#shopping_dataset");
                    emptyContent("#cart_dataset");
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'IncrementShoppingCart', cart_id:user_metadata.cart_id,  prod_id:$(prodID).attr("data-product-id"), prod_qty:newVal},
                        {c: shoppingusercart}
                    );
                    ajax(
                        '../builder/bridge.php',
                        { request_type: 'IncrementShoppingCart', cart_id:user_metadata.cart_id,  prod_id:$(prodID).attr("data-product-id"), prod_qty:newVal},
                        {c: showusercart}
                    );
                } else {
                    // Don't allow decrementing below zero
                    if (oldValue > 1) {
                        var prodID = $(this).parent().parent().parent().parent();
                        var newVal = parseFloat(oldValue) - 1;
                        emptyContent("#shopping_dataset");
                        emptyContent("#cart_dataset");
                        ajax(
                            '../builder/bridge.php',
                            { request_type: 'IncrementShoppingCart', cart_id:user_metadata.cart_id,  prod_id:$(prodID).attr("data-product-id"), prod_qty:newVal},
                            {c: shoppingusercart}
                        );
                        ajax(
                            '../builder/bridge.php',
                            { request_type: 'IncrementShoppingCart', cart_id:user_metadata.cart_id,  prod_id:$(prodID).attr("data-product-id"), prod_qty:newVal},
                            {c: showusercart}
                        );
                    } else {
                        newVal = 0;
                        var prodID = $(this).parent().parent().parent().parent();
                        emptyContent("#shopping_dataset");
                        emptyContent("#cart_dataset");
                        ajax(
                            '../builder/bridge.php',
                            { request_type: 'cart_delete_product', data:$(prodID).attr("data-product-id"), cart_id:user_metadata.cart_id },
                            {c: showusercart}
                        );
                        ajax(
                            '../builder/bridge.php',
                            { request_type: 'cart_delete_product', data:$(prodID).attr("data-product-id"), cart_id:user_metadata.cart_id },
                            {c: shoppingusercart}
                        );
                    }
                }
                $button.parent().find('input').val(newVal);
            });
        $('#total_shopping_cart').text('Rs ' +sum);

    }

}

function fetchuserpayment(obj){
    const user_data = JSON.parse(obj);
    $(document).ready(function () {
        $("#fn").val(user_data[0]['firstname']);
        $("#ln").val(user_data[0]['lastname']);
        $("#con").val(user_data[0]['country']);
        $("#street").val(user_data[0]['street_address']);
        $("#zip").val(user_data[0]['postal_code']);
        $("#town").val(user_data[0]['town']);
        $("#email").val(user_data[0]['email_address']);
        $("#phone").val(user_data[0]['phone_number']);
    });
}

function paymentcart(obj){
    const payment_data = JSON.parse(obj);
    var sum = 0;
    var inc_prod = 0;
    for(var i = 0; i < payment_data.length; i++){
        var li_normal = $('<li></li>').addClass('fw-normal').attr("id", "btn-remove-shop-"+payment_data[i].product_id).text(payment_data[i].prod_name +'  Rs '+ payment_data[i].inv_price +'  x ' +  payment_data[i].prod_qty);
        inc_prod = parseInt(payment_data[i].inv_price * payment_data[i].prod_qty );
        var span_p = $('<span></span>').text(inc_prod)

        $(li_normal).append(span_p);
        $('#payment_cart_dataset').append(li_normal);

        sum += inc_prod;
    }
    $('#total_payment').text('Rs ' +sum);


}

function searchProduct(search_include){
    var filtered_product = [];

    $(product_).each(function(index, node){
        if($(node).find('.pi-text a').text().includes(search_include))
            filtered_product.push($(node));
    });

    $('#product_dataset').children().detach();
    if(search_include == ''){
        reloadDOM(product_, '#product_dataset');
    }else{
        reloadDOM(filtered_product, '#product_dataset');
    }
}


function sortDom(sorting_option){
    switch(sorting_option){
        case 'none':
            reloadDOM(product_, '#product_dataset');
            break;
        case 'asc_price':
            var price_obj = {};
            var min_price_obj = [];

            $('#product_dataset [data-product-id]').find('.product-price').each(function(index, node){
                price_obj[Math.floor($(node).text().match(/[+-]?\d+(\.\d+)?/g))] = $(node);
            });

            for(const prop in price_obj){
                var price_keys = Object.keys(price_obj);
                var min_price = Math.min(...price_keys);
                min_price_obj.push(price_obj[min_price.toString()].parent().parent().parent());

                delete price_obj[min_price];
            }

            reloadDOM(min_price_obj, '#product_dataset');
            break;
        case 'asc_name':
            var product_name_obj = {};
            var sorted_product_obj = [];

            $('#product_dataset [data-product-id]').find('.pi-text a h5').each(function(index, node){
                product_name_obj[$(node).text()] = $(node).parent().parent().parent().parent();
            });

            var product_name_obj_keys = Object.keys(product_name_obj);
            var sorted_keys = product_name_obj_keys.sort();

            for(const element_key of sorted_keys){
                sorted_product_obj.push(product_name_obj[element_key]);
                delete product_name_obj[element_key];
            }

            reloadDOM(sorted_product_obj, '#product_dataset');
            break;
        default:
            throw new Exception(`Unknown sorting option --> ${sorting_option}`);
    }
}

function paginateDOM(DOM_object, selector, amount){
    var iteration_counter = 1;
    var page_counter = 0;
    var page_node = $("<div></div>").attr('data-role', 'pages').attr('data-page-id', ++page_counter).addClass('row').css('width', '100%');
    var pages_collection = [];

    for(var x = 0; x < DOM_object.length; x++){
        if(iteration_counter > amount){
            page_node = $("<div></div>").attr('data-role', 'pages').attr('data-page-id', ++page_counter).addClass('row hidden').css('width', '100%');
            iteration_counter = 1;
        }

        page_node.append(DOM_object[x]);
        pages_collection.push(page_node);
        iteration_counter++;
    }

    for(var i = 0, ap = 6 ; i < page_counter; i++, ap += 6){
        var option_node = $("<option></option>").val(ap).text(`Show: ${ap}`);
        $('#pagination_count_selector').append(option_node);
    }

    if($('div.nice-select.p-show').length == 0)
        $('.sorting, .p-show').niceSelect();

    $('#pagination_desc').text(`Show 01 - ${amount} Of ${DOM_object.length} Product`);
    return pages_collection;
}

function reloadDOM(DOM_object, selector, remove_prev = true){
    if(remove_prev) $(selector).children().detach();

    for(var i = 0; i < DOM_object.length; i++){
        $(selector).append(DOM_object[i]);
    }
}

function renderSpecificProduct(prod_object){
    var deserialized_data = JSON.parse(prod_object);

    $("#product_hero_img, #spec_product_img").attr('src', "." + deserialized_data[0].prod_image);
    $("#product_category").text(`${deserialized_data[0].cat_desc} - ${deserialized_data[0].prod_age_group}`);
    $("#product_name").text(deserialized_data[0].prod_name);
    $("#product_desc").text(deserialized_data[0].prod_desc);
    $("#product_price, #spec_product_price").text(`Rs ${deserialized_data[0].inv_price}`);
    $("#p-code, #spec_product_code").text(`SKU ${"0".repeat(5)}${deserialized_data[0].product_id}`);
    $("#spec_inv_qoh").text(`${deserialized_data[0].inv_qoh} in stock`);
    $("#spec_inv_size").text(deserialized_data[0].inv_size);
    $(".quantity .primary-btn").attr('id', `products_id_${deserialized_data[0].product_id}`);

    ajax(
        '../builder/bridge.php',
        { request_type: 'get_related_product', category_id: deserialized_data[0].cat_id},
        {c: renderRelatedProduct}
    );
    $("#products_id_"+deserialized_data[0].product_id).click(function(event){
        event.preventDefault();
        var prodID = $(this);
        if (sessionStorage.length != 0){
            const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
            ajax(
                '../builder/bridge.php',
                { request_type: 'checkCart', cart_id:user_metadata.cart_id , prod_id:$(prodID).attr("id").replace( /^\D+/g, '') },
                {c: checkCart, o:[ user_metadata.cart_id ,$(prodID).attr("id").replace( /^\D+/g, '')]}
            );

        }else{
            console.error('You must login');
        }

    });
}

function renderRelatedProduct(object){
    var deserialized_data = JSON.parse(object);

    for(var i = 0; i < deserialized_data.length; i++){
        var root_node = $('<div></div>').addClass("col-lg-3 col-sm-6").attr('data-product-id', deserialized_data[i].product_id);
        var product_item_node = $('<div></div>').addClass('product-item');
        var pi_pic_node = $('<div></div>').addClass("pi-pic");
        var pi_text_div = $('<div></div>').addClass('pi-text');
        var category_name = $('<div></div>').addClass('catagory-name').text(deserialized_data[i].cat_desc);
        var product_price = $('<div></div>').addClass('product-price').text("MUR "+deserialized_data[i].inv_price);
        var sale_node = $('<div></div>').addClass('sale pp-sale').text('Sale');
        var ul_node = $('<ul></ul>');
        var li_node_first = $('<li></li>').addClass('w-icon active').append($('<a id= "product_id_'+ deserialized_data[i].product_id+ '" href="#"><i class="icon_bag_alt"></i></a>'));
        var li_node_second = $('<li></li>').addClass('quick-view').append($('<a href="#">+ Quick View</a>').attr('id', deserialized_data[i].product_id));
        var pi_text_a = $("<a href='#'></a>").append($('<h5></h5>').text(deserialized_data[i].prod_name));
        var img_node = $('<img>').attr('src', "." + deserialized_data[i].prod_image);

        $(ul_node).append(li_node_first).append(li_node_second);
        $(pi_pic_node).append(img_node).append(sale_node).append(ul_node);
        $(pi_text_div).append(category_name).append(pi_text_a).append(product_price);
        $(product_item_node).append(pi_pic_node).append(pi_text_div);
        $(root_node).append(product_item_node);
        $('#related_product').append(root_node);

        $("#product_id_"+deserialized_data[i].product_id).click(function(event){
            event.preventDefault();
            var prodID = $(this).parent().parent().parent().parent().parent();
            if (sessionStorage.length != 0){
                const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
                ajax(
                    '../builder/bridge.php',
                    { request_type: 'checkCart', cart_id:user_metadata.cart_id , prod_id:$(prodID).attr("data-product-id") },
                    {c: checkCart, o:[ user_metadata.cart_id ,$(prodID).attr("data-product-id")]}
                );

            }else{
                console.error('You must login');
            }

        });

        $(li_node_second).find('a').click(function(){
            event.preventDefault();
            console.log($(this));
            window.localStorage.setItem('product_in_view', $(this).attr('id'));
            window.location.href = 'product.html';
        });
    }
}

function insertpayment(obj){
    console.log(obj);
}

function paid_item_list(obj){
    const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
    if(obj === "[]"){
        // console.log('empty');
        $('#total_shopping_cart').text('Rs 0');

    }else{
        // console.log('not empty');
        const cart_data = JSON.parse(obj);
        var sum = 0;
        var inc_prod = 0;

        for(var i = 0; i < cart_data.length; i++){
            var tr_Node = $('<tr></tr>').attr('data-product-id', cart_data[i].product_id);
            var td_cart_pic = $('<td></td>').addClass('cart-pic');
            var img_node = $('<img>').attr('src', "." + cart_data[i].prod_image).attr('height','180px').attr('width', '180px');
            var td_card_title = $('<td></td>').addClass('cart-title');
            var h6_title =  $('<p></p>').text(cart_data[i].prod_name);
            var price =  $('<td></td>').addClass('p-price ').text("Rs "+cart_data[i].product_price);
            var td_qty =  $('<td></td>').addClass('qua-col');
            var div_quantity = $('<div></div>').addClass('quantity');
            var div_pro_qty = $('<div></div>').addClass('pro-qty');
            var input = $('<input type="text" readonly>').val( cart_data[i].prod_qty);
            var td_total = $('<td></td>').addClass('total-price').text('Rs ' +parseInt(cart_data[i].product_price * cart_data[i].prod_qty ));
            var td_close =  $('<td></td>').addClass('close-td').text(cart_data[i].date_purchased);

            $(td_cart_pic).append(img_node);
            $(td_card_title).append(h6_title);
            $(div_pro_qty).append(input);
            $(div_quantity).append(div_pro_qty);
            $(td_qty).append(div_quantity);
            $(td_close);
            $(tr_Node).append(td_cart_pic).append(td_card_title).append(price).append(td_qty).append(td_total).append(td_close)
            $('#paid_dataset').append(tr_Node);
            inc_prod = parseInt(cart_data[i].product_price * cart_data[i].prod_qty );
            sum += inc_prod;



        }

        $('#total_shopping_cart').text('Rs ' +sum);

    }


}

function insertpaidproduct(obj){
    console.log(obj);


}

function build_index(object){
    var deserialized_data = JSON.parse(object);

    $('#product_exhibit').children().remove();
    for(var i = 0; i < deserialized_data.length; i++){
        var root_node = $('<div></div>').addClass("col-lg-3 col-sm-6").attr('data-product-id', deserialized_data[i].product_id).css('max-width', '100%');
        var product_item_node = $('<div></div>').addClass('product-item');
        var pi_pic_node = $('<div></div>').addClass("pi-pic");
        var pi_text_div = $('<div></div>').addClass('pi-text');
        var category_name = $('<div></div>').addClass('catagory-name').text(deserialized_data[i].cat_desc);
        var product_price = $('<div></div>').addClass('product-price').text("MUR "+deserialized_data[i].inv_price);
        var sale_node = $('<div></div>').addClass('sale pp-sale').text('Sale');
        var ul_node = $('<ul></ul>');
        var li_node_first = $('<li></li>').addClass('w-icon active').append($('<a id= "product_id_'+ deserialized_data[i].product_id+ '" href="#"><i class="icon_bag_alt"></i></a>'));
        var li_node_second = $('<li></li>').addClass('quick-view').append($('<a href="#">+ Quick View</a>').attr('id', deserialized_data[i].product_id));
        var pi_text_a = $("<a href='#'></a>").append($('<h5></h5>').text(deserialized_data[i].prod_name));
        var img_node = $('<img>').attr('src', deserialized_data[i].prod_image);

        $(ul_node).append(li_node_first).append(li_node_second);
        $(pi_pic_node).append(img_node).append(sale_node).append(ul_node);
        $(pi_text_div).append(category_name).append(pi_text_a).append(product_price);
        $(product_item_node).append(pi_pic_node).append(pi_text_div);
        $(root_node).append(product_item_node);
        $('#product_exhibit').append(root_node);

        $("#product_id_"+deserialized_data[i].product_id).click(function(event){
            event.preventDefault();
            var prodID = $(this).parent().parent().parent().parent().parent();
            if (sessionStorage.length != 0){
                const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
                ajax(
                    '../forever/builder/bridge.php',
                    { request_type: 'checkCart', cart_id:user_metadata.cart_id , prod_id:$(prodID).attr("data-product-id") },
                    {c: checkCart, o:[ user_metadata.cart_id ,$(prodID).attr("data-product-id")]}
                );

            }else{
                console.error('You must login');
            }

        });

        $(li_node_second).find('a').click(function(){
            event.preventDefault();
            console.log($(this));
            window.localStorage.setItem('product_in_view', $(this).attr('id'));
            window.location.href = 'htmlpages/product.html';
        });
    }

    $(".product-slider").trigger('destroy.owl.carousel');
    $('.product-slider').find('.owl-stage-outer').children().unwrap();
    $(".product-slider").owlCarousel({
        loop: false,
        margin: 25,
        nav: true,
        dots: false,
        navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            992: {
                items: 2,
            },
            1200: {
                items: 3,
            }
        }
    });
}
