$(document).ready(function(){
console.log("test1");
	$('form').on('submit', function(event) {
		event.preventDefault();
		console.log("before ajax");
		$.ajax('/links', {
			type: 'POST',
			data: $('form').serialize(),
			success: function(result) {
				console.log("in your ajax");
				$('#result').html(result).fadeIn();
			}
		});

	});


	// $.post("/new",{name: name, url: url, id: links.length}, function(results){
	// 	$("#result").html(result);
	// };

});