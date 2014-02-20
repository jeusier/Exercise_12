$(document).ready(function(){

	//listener to create new link
	$('#create').on('submit', function(event) {
		//prevents from pre-refreshing
		console.log("test");
		event.preventDefault();
		//perform ajax request
		$.ajax('/links', {
			type: 'POST',
			data: $('#create').serialize(),
			success: function(result) {
				console.log("in your ajax");
				$('#result').html(result).fadeIn();
			}
		});

	});

	// $('#update').on('submit', function(event) {
	// 	event.preventDefault(); 
	// 	console.log("test");
	// 	$.ajax('/links/#{link._id}', {
	// 		type: 'PUT',
	// 		data: $('#update').serialize(),
	// 		success: function(result) {
	// 			console.log("in your ajax");
	// 			$("#update").remove();
	// 			$("#updateResult").html(result).fadeIn();
	// 		}
	// 	});
	// });


});