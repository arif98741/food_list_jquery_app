$(document).ready(function() {

	$('.search-button').click(function(event) {
		var search_value = $('.input-value').val();
		showFoods(search_value,30,100);
	});

	function showFoods(search='',from,to) {
		$.ajax({
		url: 'https://api.edamam.com/search?q='+search+'&app_id=9b0cf149&app_key=3c686265b0d1b1ce84f0a72690453ba1&from='+from+'&to='+to,
		method: 'get',
		dataType: 'json',
		success:function(response)
		{
	
				// console.log(response.hits);
				// return false;
				//$('.search-key').html(response.q);
				var data = '';
				if (response.count == 0) {
					$('.total-result').html(' no  food items for <strong>'+search+'</strong>');
				}else if(response.count == 1){
					$('.total-result').html(response.count+' food item for <strong>'+search+'</strong>');
				}else if(response.count > 1){
					$('.total-result').html(response.count+' food items for <strong>'+search+'</strong>');
				}

				for (var i = 0; i < response.hits.length; i++) {
					//console.log(response.hits[i].recipe.image);
					data += '<div class="col-md-3">'
						+'<div class="card mb-4 box-shadow">'
							+'<img class="card-img-top" src="'+response.hits[i].recipe.image+'" alt="Card image cap">'
							+'<div class="card-body">'
								+'<p class="card-text">'+response.hits[i].recipe.label+'</p>'
								+'<div class="d-flex justify-content-between align-items-center">'
									+'<div class="btn-group">'
										+'<button type="button" class="btn btn-sm btn-outline-secondary">View</button>'
										+'<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>'
									+'</div>'
									+'<small class="text-muted">9 mins</small>'
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>';
				}
				$('.food-items').html(data);
				
			},error:function(e){
				console.log(e);

			}

		});
	}

	showFoods(search='chicken roll',1,100);
	
});