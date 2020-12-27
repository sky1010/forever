/*  ---------------------------------------------------
    Template Name: Fashi
    Description: Fashi eCommerce HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com/
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
    $(".hero-items").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });

    /*------------------
        Product Slider
    --------------------*/

    /*------------------
       logo Carousel
    --------------------*/
    $(".logo-carousel").owlCarousel({
        loop: false,
        margin: 30,
        nav: false,
        items: 5,
        dots: false,
        navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        mouseDrag: false,
        autoplay: true,
        responsive: {
            0: {
                items: 3,
            },
            768: {
                items: 5,
            }
        }
    });

    /*-----------------------
       Product Single Slider
    -------------------------*/
    $(".ps-slider").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        items: 3,
        dots: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });

    /*------------------
        CountDown
    --------------------*/
    // For demo preview
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    if(mm == 12) {
        mm = '01';
        yyyy = yyyy + 1;
    } else {
        mm = parseInt(mm) + 1;
        mm = String(mm).padStart(2, '0');
    }
    var timerdate = mm + '/' + dd + '/' + yyyy;
    // For demo preview end

    console.log(timerdate);


    // Use this for real timer date
    /* var timerdate = "2020/01/01"; */

	$("#countdown").countdown(timerdate, function(event) {
        $(this).html(event.strftime("<div class='cd-item'><span>%D</span> <p>Days</p> </div>" + "<div class='cd-item'><span>%H</span> <p>Hrs</p> </div>" + "<div class='cd-item'><span>%M</span> <p>Mins</p> </div>" + "<div class='cd-item'><span>%S</span> <p>Secs</p> </div>"));
    });

    /*----------------------------------------------------
     Language Flag js
    ----------------------------------------------------*/
    $(document).ready(function(e) {
    //no use
    try {
        var pages = $("#pages").msDropdown({on:{change:function(data, ui) {
            var val = data.value;
            if(val!="")
                window.location = val;
        }}}).data("dd");

        var pagename = document.location.pathname.toString();
        pagename = pagename.split("/");
        pages.setIndexByValue(pagename[pagename.length-1]);
        $("#ver").html(msBeautify.version.msDropdown);
    } catch(e) {
        // console.log(e);
    }
    $("#ver").html(msBeautify.version.msDropdown);

    //convert
    $(".language_drop").msDropdown({roundedBorder:false});
        $("#tech").data("dd");
    });
    /*-------------------
		Range Slider
	--------------------- */
    setTimeout(function(){;
    	var rangeSlider = $(".price-range"),
    		minamount = $("#minamount"),
    		maxamount = $("#maxamount"),
    		minPrice = rangeSlider.data('min'),
    		maxPrice = rangeSlider.data('max');
    	    rangeSlider.slider({
    		range: true,
    		min: minPrice,
            max: maxPrice,
    		values: [minPrice, maxPrice],
    		slide: function (event, ui) {
    			minamount.val(ui.values[0]);
    			maxamount.val(ui.values[1]);
    		}
    	});
    	minamount.val(rangeSlider.slider("values", 0));
        maxamount.val(rangeSlider.slider("values", 1));

        /*-------------------
            Radio Btn
        --------------------- */
        $(".fw-size-choose .sc-item label, .pd-size-choose .sc-item label").on('click', function () {
            $(".fw-size-choose .sc-item label, .pd-size-choose .sc-item label").removeClass('active');
            $(this).addClass('active');
        });

    }, 500);

    /*------------------
		Single Product
	--------------------*/
	$('.product-thumbs-track .pt').on('click', function(){
		$('.product-thumbs-track .pt').removeClass('active');
		$(this).addClass('active');
		var imgurl = $(this).data('imgbigurl');
		var bigImg = $('.product-big-img').attr('src');
		if(imgurl != bigImg) {
			$('.product-big-img').attr({src: imgurl});
			$('.zoomImg').attr({src: imgurl});
		}
	});

    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
	proQty.prepend('<span class="dec qtybtn">-</span>');
	proQty.append('<span class="inc qtybtn">+</span>');
	proQty.on('click', '.qtybtn', function () {
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();
		if ($button.hasClass('inc')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		$button.parent().find('input').val(newVal);
	});

    //add listeners, triggered when the specified input moves out of focus
    $(".group-input input").focusout(function(){
        var is_valid = validate_input($(this).attr('data-type'), $(this).val());
        toggle_input_state($(this), is_valid);
    });

    $(".form-row input").focusout(function(){
        var is_valid = validate_input($(this).attr('data-type'), $(this).val());
        toggle_input_state($(this), is_valid);
    });

    $('#form_register').on("submit", function(event){
        event.preventDefault(); //prevent form submission
        var serialized_form =  $('#form_register').serialize();

        if(form_valid($('#form_register'))){
            ajax(
                '../builder/bridge.php'+"?"+serialized_form,
                { request_type: 'db_insert_user'},
                {c: initialize_user}
            );
        }else{
            $('#form_register').find('input').each(function(index, node){
                toggle_input_state($(node), !!$(node).data('input_valid'));
            })
        }
    });

    $('#form-register-btn').on("click", function(event){
        event.preventDefault(); //prevent form submission

        if(form_valid($('#form-edit'))){
            var session = JSON.parse(window.sessionStorage.getItem('user_metadata'));
            $("#user_id").val(session.user_id);
            $(this).submit();
        }else{
            $('#form-edit').find('input').each(function(index, node){
                toggle_input_state($(node), !!$(node).data('input_valid'));
            })
        }
    });

    $("#product_submit").click(function(){
        $("#form_product").attr("action", "../../builder/bridge.php?request_type=db_insert_product");
        event.preventDefault(); //prevent formproduct_name submission

        if(form_valid($('#form_product'))){
            var tags = {
                prod_name: $("[name='product_name']").val(),
                prod_brand: $("[name='product_brand']").val(),
                prod_category: $("[name='category'] option:selected").text(),
                prod_size: ($(".radio_btn_foot").css("display") == "none")?$("[name=clothing_size]").val():$("[name=foot_size]").val(),
                prod_color: $("[name='product_color']").val(),
                prod_price: $("[name='product_price']").val(),
                prod_gender: $("[name='product_gender_cat']").val()
            };

            if($("[name='category']").val() > 2)
                delete tags.prod_size;

            $("[name='product_tags']").val(JSON.stringify(tags));
            $(this).submit();
        }else{
            $('#form_product').find('input').each(function(index, node){
                toggle_input_state($(node), !!$(node).data('input_valid'), 'Field cannot be empty');
            })
        }
    });

    $("#form_login").on("submit", function(event){
        event.preventDefault();
        var serialized_form =  $('#form_login').serialize();

        if(form_valid($('#form_login'))){
            ajax(
                '../builder/bridge.php'+"?"+serialized_form,
                { request_type: 'db_user_login'},
                {c: initialize_user}
            );
        }else{
            $('#form_login').find('input').each(function(index, node){
                toggle_input_state($(node), !!$(node).data('input_valid'));
            });
        }
    });

    function initialize_user(dataset){
        $("#account_suspended").parent().css("display", "none");

        if(JSON.parse(dataset).length != 0){
            const deserialized_data = JSON.parse(dataset);
            const user_metadata = {
                user_id: deserialized_data[0].user_id,
                username: deserialized_data[0].username,
                avatar: deserialized_data[0].avatar,
                role: deserialized_data[0].role,
                account_status: deserialized_data[0].account_status,
                cart_id: deserialized_data[0].cart_id
            };

            if(user_metadata.account_status == 'active'){
                $('#profile_avatar').css('display', 'block');
                $(".nav-right").css('display', 'block');
                window.sessionStorage.setItem("user_metadata", JSON.stringify(user_metadata));
                const path = (user_metadata.role == 'client')?"../htmlpages/shop.html":"../htmlpages/admin/admin.html";
                window.location.href = path;
            }else{
                $("#account_suspended").parent().css("display", "flex");
            }
        }else{
            $('#form_login').find('input').each(function(index, node){
                toggle_input_state($(node), false, 'Invalid username / password');
            });
        }
    }

    $(document).ready(function(){
        if(window.sessionStorage.getItem("user_metadata") != null){
            const user_metadata = JSON.parse(window.sessionStorage.getItem("user_metadata"));
            // [QUIRK] different path directory level, changes relative path structure
            if (window.location.pathname.split("/").pop() == "index.html"){
                var split_path = user_metadata.avatar.split("/");
                split_path.shift();
                user_metadata.avatar = split_path.join("/");
            }
``
            $("#profile_avatar").css("background-image", "url('"+ user_metadata.avatar +"')");
            $("#profile_name").text(user_metadata.username);
            $("#f-profile").attr("src", user_metadata.avatar);
            $('#user_login').data('islogged', true);

            if($('#user_login').data('islogged')){
                $('#user_register').parent().css('display', 'none');
                $('#user_login').text('LOGOUT');
            }
        }
    });

    $('#user_login').click(function(){
        var url_append = "../htmlpages/login.html";
        $('#user_login').data('islogged', false);
        $('#profile_avatar').css('display', 'none');
        window.sessionStorage.removeItem("user_metadata");
        if(window.location.pathname.split("/").pop() == "admin.html")
            url_append = "../login.html";
        window.location.href = url_append;
    });

    $("#to-profile-page").click(function(){
        $("#form-edit").parent().css("display", "flex");
        if(window.location.pathname.split('/').pop() == 'index.html'){
            window.location.href = "htmlpages/collection.html";
        }else{
            window.location.href = "collection.html";
        }
    });

    $("#product_update").click(function(){
        $("#form_product").attr("action", "../../builder/bridge.php?request_type=db_update_product");
        event.preventDefault();

        if(form_valid($("#form_product"))){
            $("#form_product").submit();
        }else{
            $("#form_product input").each(function(index, node){
                toggle_input_state($(node), !!$(node).data('input_valid'));
            });
        }
    });

    $("#submit_search_form").click(function(event){
        event.preventDefault();
        var serialized_form = $("#search_form").serialize();

        if($("#product_size input[type='radio']:checked").length != 0){
            serialized_form += '&product_size=' + $("#product_size input[type='radio']:checked").val();
        }else{
            serialized_form += "&product_size=S, M, L";
        }

        console.log(serialized_form);
        ajax(
            '../builder/bridge.php'+"?"+serialized_form,
            { request_type: 'search_product'},
            {c: showProducts, o: [true]}
        );
    });

    $("[name='seach_box']").keyup(function(e){
        searchProduct($(this).val());
    });

    $("#sorting_options").change(function(){
        sortDom($(this).val());
    });

    $('#load_more_product').click(function(e){
        e.preventDefault();
        $("#product_dataset .hidden").first().css('display', 'flex').removeClass('hidden');

        if($("#product_dataset .hidden").length == 0){
            $(this).parent().addClass('hidden');
        }
    });

    $('#pagination_count_selector').change(function(){
        reloadDOM(paginateDOM(product_, "#product_dataset", $(this).val()), "#product_dataset");
    });

    $("#uploadImage").change(function(){
        $("#f-profile").attr("src", window.URL.createObjectURL($(this)[0].files[0]));
    });
    $("#product_img").change(function(){
        $("#ch_img_product").attr("src", window.URL.createObjectURL($(this)[0].files[0]));
    });
    $("#profile_avatar").click(function(){
        $("#form-edit").parent().css("display", "flex");
    });

    $(".dismiss").click(function(){
        $(this).parent().parent().css("display", "none");
    });

    $(".cart-icon").hover(function(){
        $('.cart-hover').css({'opacity': '1','display': 'block', 'top': '30px'});
    }, function(){
        $('.cart-hover').css({'opacity': '1','display': 'none', 'top': '30px'});
    });

    $('[data-toggle="tooltip"]').tooltip();


    // INDEX
    $("#displaymen").click(function() {
        $("#hero-img").css('background-image', "url(img/banner-1.jpg)");
        ajax(
            'builder/bridge.php'+"?"+"minimum_price=25&maximum_price=1475&product_size=S, M, L&man=on",
            { request_type: 'search_product'},
            {c: build_index}
        );
    });

    $("#displaywomen").click(function() {
        $("#hero-img").css('background-image', "url(img/banner-2.jpg)");
        ajax(
            'builder/bridge.php'+"?"+"minimum_price=25&maximum_price=1475&product_size=S, M, L&women=on",
            { request_type: 'search_product'},
            {c: build_index}
        );
    });

    $("#displaykid").click(function() {
        $("#hero-img").css('background-image', "url(img/banner-3.jpg)");
        ajax(
            'builder/bridge.php'+"?"+"minimum_price=25&maximum_price=1475&product_size=S, M, L&kid=on",
            { request_type: 'search_product'},
            {c: build_index}
        );
    });

    if(window.sessionStorage.getItem('user_metadata') == null){
        $(".nav-item a[href='./collection.html']").css('display', 'none');
        $("#profile_avatar").css('display', 'none');
        $(".nav-right").css('display', 'none');
    }

})(jQuery);
