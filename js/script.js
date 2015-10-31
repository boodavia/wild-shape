$(document).ready(function(){

	var moonCircle  = ($('#moonCircle').attr('class') == 'active' ) ? true : false;
	var currentLvl = $('#currentLvl').val();

	monsterLvl(currentLvl,moonCircle);

	//Show/Collapse Beast Lists
	$('body').on('click', '.cr-header', function(){
		$('.cr-group ul').slideUp();
		if ($(this).next('ul').is(':hidden')){
			$(this).next('ul').slideDown();
		}
	});
	//Show Beast Block
	$(document).on( "click", ".beast", function() {
		var beastName = $(this).find('h3').text();
		monsterBlock(beastName);
		$('#beastModal').css('display','flex').animate({
			'opacity' : '1'
		},200);
	});
	//Hide Beast Block
	$(document).on( "click", "#modalClose", function() {
		$('#beastModal').animate({
			'opacity' : '0'
		},200, function(){
			$('#beastModal').css('display','none');
		});
	});
	//Select/Deselect Circle of the Moon
	$('#moonCircle').click(function(){
		($('#moonCircle').attr('class') == 'active' ) ? $('#moonCircle').attr('class', '')  : $('#moonCircle').attr('class','active') ;
		var moonCircle  = ($('#moonCircle').attr('class') == 'active' ) ? true : false;
		var currentLvl = $('#currentLvl').val();
		$('#monList').html('');
		monsterLvl(currentLvl,moonCircle);
	});
	//Adjust Level
	$( "#currentLvl" ).change(function() {
		var moonCircle  = ($('#moonCircle').attr('class') == 'active' ) ? true : false;
		var currentLvl = $('#currentLvl').val();
		$('#monList').html('');
		monsterLvl(currentLvl,moonCircle);
	});

});

//Create a Monster Stat Block
function monsterList(cr){
	var currentLvl = $('#currentLvl').val();
	if (currentLvl < 2){
		$('#monList').html('<div class="error"><h1>Your Kung Fu is weak.</h1>(You are not druid enough for Wild Shape yet)</div>');
	} else if (currentLvl > 20){
		$('#monList').html('<div class="error"><h1>Whoa there nature boy</h1>(You are too much druid)</div>)');
	} else {
		$.ajax({
			type: "get",
			url: "beast_data/beasts.xml",
			dataType: "xml",
			success: function(xml){
				var monList = '';
				i = 0;
				var items = $(xml).find("monster").filter(function(){
					if ( currentLvl >=2 && currentLvl < 4 ) {
		              		return $('cr', this).text() == cr && $('swim', this).text() == "" && $('fly', this).text() == "";
		   			} else if ( currentLvl >=4 && currentLvl < 8 ) {
		   				return $('cr', this).text() == cr && $('fly', this).text() == "";
					} else {
						return $('cr', this).text() == cr;
					}
		          	});
				items.each(function(index, item){
					icons = '';
					if(!$(item).find("swim").text() == ''){icons += '<svg><use xlink:href="css/fonts/icons.svg#icon-swim" /></svg>';}
					if(!$(item).find("fly").text() == ''){icons += '<svg><use xlink:href="css/fonts/icons.svg#icon-fly" /></svg>';}
					if(!$(item).find("climb").text() == ''){icons += '<svg><use xlink:href="css/fonts/icons.svg#icon-climb" /></svg>';}
					if(!$(item).find("burrow").text() == ''){icons += '<svg><use xlink:href="css/fonts/icons.svg#icon-burrow" /></svg>';}

		           	monList += '<li class="beast"><h3>' + $(item).find("name").text() + '</h3><div><svg><use xlink:href="css/fonts/icons.svg#icon-paw" /></svg>'+icons+'</div></li>';
		           	i++;
		          });
				$('.cr-group[data-cr="'+cr+'"]').find('ul').html(monList)
				$('.cr-group[data-cr="'+cr+'"]').find('span').html(i)

			},
			error: function(xhr, status) {
				console.log(status); //handle error here
			}
		});
	}

}

//Get CR array based on level and circle
function monsterLvl(level, moon){
	if ( moon == true ){
		if ( level >=2 && level < 6 ) {
			var crList = ['0','1/8','1/4','1/2','1'];
		} else {
			var preList = ['0','1/8','1/4','1/2','1'];
			var crList = [];
			for (i = 6; i <= level; i++) {
				var foo = Math.floor(i/3);
				preList.push(''+foo+'');
			}
			$.each(preList, function(i, el){
				if($.inArray(el, crList) === -1) crList.push(el);
			});
		}
	} else {
		if ( level >=2 && level < 4 ) {
			var crList = ['0','1/8','1/4'];
		} else if ( level >=4 && level < 8 ) {
			var crList = ['0','1/8','1/4','1/2'];
		} else {
			var crList = ['0','1/8','1/4','1/2','1'];
		}
	}
	//console.log(crList);
	addMonsters(crList)
}

function addMonsters(list){
	$.each( list, function( i, val ){
  		html = 	'<div class="cr-group" data-cr="'+val+'">'+
					'<div class="cr-header">'+
						'<h2>CR '+val+'</h2>'+
						'<span></span>'+
					'</div>'+
					'<ul></ul>'+
				'</div>';
		$('#monList').prepend(html);
		monsterList(val);
	});
	$('div.cr-group').eq(0).find('ul').slideDown();
}

//Create a Monster Stat Block
function monsterBlock(name){
	$.ajax({
		type: "get",
		url: "beast_data/beasts.xml",
		dataType: "xml",
		success: function(xml){
			var items = $(xml).find("monster").filter(function(){
	              return $('name', this).text() == name;
	          	});
			statBlock =
			'<h2>'+$(items).find('size').text()+'  '+$(items).find('type').text()+'  '+$(items).find('alignment').text()+'</h2>'+
			'<div class="top-stats">'+
				'<p><span>Armor Class</span> '+$(items).find('ac').text()+' </p>'+
				'<p><span>Hit Points</span> '+$(items).find('hp').text()+' </p>'+
				'<p>'+
					'<span>Speed</span> ' + $(items).find('speed').text();
					if($(items).find('swim').text() !=''){
						statBlock += ', Swim '+$(items).find('swim').text();
					}
					if($(items).find('fly').text() !=''){
						statBlock += ', Fly '+$(items).find('fly').text();
					}
					if($(items).find('burrow').text() !=''){
						statBlock += ', Burrow '+$(items).find('burrow').text();
					}
					if($(items).find('climb').text() !=''){
						statBlock += ', Climb '+$(items).find('climb').text();
					}
			statBlock +='</p>'+
			'</div>'+
			'<ul>'+
				'<li>STR<span> '+$(items).find('str').text()+' ('+Math.floor(($(items).find('str').text()-10)/2)+')</span></li>'+
				'<li>DEX<span> '+$(items).find('dex').text()+' ('+Math.floor(($(items).find('dex').text()-10)/2)+')</span></li>'+
				'<li>CON<span> '+$(items).find('con').text()+' ('+Math.floor(($(items).find('con').text()-10)/2)+')</span></li>'+
				'<li>WIS<span> '+$(items).find('wis').text()+' ('+Math.floor(($(items).find('wis').text()-10)/2)+')</span></li>'+
				'<li>INT<span> '+$(items).find('int').text()+' ('+Math.floor(($(items).find('int').text()-10)/2)+')</span></li>'+
				'<li>CHA<span> '+$(items).find('cha').text()+' ('+Math.floor(($(items).find('cha').text()-10)/2)+')</span></li>'+
			'</ul>'+
			'<div class="mid-stats">';
			if($(items).find('vulnerable').text() !=''){
				statBlock += '<h4>Vulnerable: <span> '+$(items).find('vulnerable').text()+' </span></h4>';
			}
			if($(items).find('immune').text() !=''){
				statBlock += '<h4>Damage Immunities: <span> '+$(items).find('immune').text()+' </span></h4>';
			}
			if($(items).find('conditionImmune').text() !=''){
				statBlock += '<h4>Conditional Immunities: <span> '+$(items).find('conditionImmune').text()+' </span></h4>';
			}
			if($(items).find('senses').text() !=''){
				statBlock += '<h4>Senses: <span> '+$(items).find('senses').text()+' </span></h4>';
			}
			if($(items).find('languages').text() !=''){
				statBlock += '<h4>Languages: <span> '+$(items).find('languages').text()+' </span></h4>';
			}
			statBlock +=
				'<h4>Challenge: <span> '+$(items).find('cr').text()+' </span></h4>'+
			'</div>';
			'<div class="traits-stats">';
			items.each(function(index, item){
				$(item).find('trait').each(function(i){
					statBlock += '<h4>'+$(this).find('trait-name').text()+': <span>';
					$(this).find('text').each(function(){
						statBlock += $.text(this)+'<br><br>';
					});
					statBlock += '</span></h4>';
				});
				statBlock += '<h3>Actions</h3>';
				$(item).find('action').each(function(i){
					statBlock += '<h4>'+$(this).find('action-name').text()+': <span>';
					$(this).find('text').each(function(){
						statBlock += $.text(this)+'<br><br>';
					});
					statBlock += '</span></h4>';
				});
				$(item).find('reaction').each(function(i){
					statBlock += '<h4>'+$(this).find('reaction-name').text()+': <span>';
					$(this).find('text').each(function(){
						statBlock += $.text(this)+'<br><br>';
					});
					statBlock += '</span></h4>';
				});
			});
			if($(items).find('spells').text() !=''){
				statBlock += '<h4>Spells<span> ';
				var spells = $(items).find('spells').text().split(', ');
				for(var i = 0; i < spells.length; i++){
				    statBlock += '<a href="#" class="spell-pop">'+capitalize(spells[i])+'</a>, ';
				}
				statBlock +=  '</span></h4>';
			}
			$('#beastModal header').find('h1').html($(items).find('name').text())
			$('.beast-body').html(statBlock);
		},
		error: function(xhr, status) {
			console.log(status); //handle error here
		}
	});
}
