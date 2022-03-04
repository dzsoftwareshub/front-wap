// login request modal
$(document).ready(function(){
	$(".request-login-modal").click(function(e){
		e.preventDefault();
		$("#signup-modal").modal("hide");
		$("#login-modal").modal("show");
	});
});

// request signup modal
$(document).ready(function(){
	$(".request-signup-modal").click(function(e){
		e.preventDefault();
		$("#signup-modal").modal("show");
		$("#login-modal").modal("hide");
	});
});

// signup request
$(document).ready(function(){
	$("#signup-form").submit(function(e){
		e.preventDefault();

		$.ajax({
				type: "POST",
				url: "api/signup",
				data: new FormData(this),
				processData: false,
				contentType: false,
				cache: false,
				success: function(response){
					console.log(response);
				},
				error: function(error){
					console.log(error);
				}
		});

	});
});
