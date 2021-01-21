$(function(){
	var categories = new Array('river','park','city','car','camera','birds','money','ocean','sun','party','battleship','hair','tree','mountain','tecnology','world');

	$("#addbtn").on('click', function(){
		var number = parseInt($('input[name="number_imgs"]').val());
		if(number == 0 | number > 15){
			alert('Maximun of 15 imgs exeded');
			return false;
		}
		getImg(number);
	});

	const getImg = async number => {
		var rows = getRows(number);
		var c    = 0;
		var _content = "";
	
		for(let i=0; i<rows.rows.length; i++){
			_content += '<div class="row">';
			for(let j=0; j < rows.rows[i]; j++){
				_content += '<div class="col-md-'+rows.divs+'"><img width="100%" src="" alt="Loading..." id="img-data-'+c+'" ></div>';
				c ++;
			}
			_content+= '</div><br>';
		}

		$("#imgs_result").html(_content);

		for(var i =0; i< number; i++){
			await write_img(i);
		}
	}

	const write_img = (index) => {		
		var random   = Math.floor(Math.random() * categories.length);
		var random_b = Math.floor(Math.random() * categories.length);
		var response = fetch('https://source.unsplash.com/random/320x250/?' + categories[random]);
		categories[random]   = categories[random_b];
		categories[random_b] = categories[random];		
		response.then( response => {
			if(response.ok){
				$('#img-data-'+index).attr("src", response.url);
			}
		});
	}

	const getRows = (length) => {
		if(length > 12){
			rows  = [12, length -12]; // .rows > (.cols * 12), .rows.md-1 > (.cols * length - 12)
			divs  = 1;
		}else if(length > 10){
			rows   = [6, length - 6]; // .rows > (.cols * 6), .rows.md-2 > (.cols * length -6)
			divs   = 2;
		}else if(length == 6){
			rows   = [6];
			divs   = 2;
		}else if(length > 5){
			rows   = [5, length -5]; // .rows > (.cols * 5), .rows.m-d-2 > (.cols * length -5) 
			divs   = Math.round(12/length);
		}else{
			rows   = [length]; // .rows > (.cols.md-2 * length)
			divs   = Math.round(12/length);
		}
		return {rows, divs};
	}
});
