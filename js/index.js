$( document ).ready(function() {
	$( "#displaymen" ).click(function() {
		$("#sec_men").css("display", "block");
		$("#sec_women").css("display", "none");
		$("#sec_kid").css("display", "none");
	});
	$( "#displaywomen" ).click(function() {	
		$("#sec_women").css("display", "block");
		$("#sec_men").css("display", "none");
		$("#sec_kid").css("display", "none");
	});

	$( "#displaykid" ).click(function() {
		$("#sec_men").css("display", "none");
		$("#sec_women").css("display", "none");
		$("#sec_kid").css("display", "block");
	});

});