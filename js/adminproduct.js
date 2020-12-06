$( document ).ready(function() {
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
});