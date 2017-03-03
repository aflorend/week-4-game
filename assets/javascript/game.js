	var winCount = 0;

	var lossCount = 0;

	var roundCount = 1;

	var fightCount = 0;

	var fightReady = false;

	var action = 0;

function reset() {

	//Resetting Variables to inital values.

	roundCount = 1;

	fightCount = 0;

	fightReady = false;

	action = 0;


	//Empties last game's character divs.
	$('.charactersRow, .attackerBox, .defenderBox').empty();
	
	//Setting character objects.
	var characters = [
		{
			healthPoints: 150,

			attackPoints: 7,

			counterPoints: 16,

			image: 'url(assets/images/char0.jpg)',

			gif: 'assets/images/char0_animation.gif',

			name: 'char0',

			title: 'D.Va'
		},

		{
			healthPoints: 120,

			attackPoints: 14,

			counterPoints: 13,

			image: 'url(assets/images/char1.jpg)',

			gif: 'assets/images/char1_animation.gif',

			name: 'char1',

			title: 'Hanzo'
		},

		{
			healthPoints: 160,

			attackPoints: 6,

			counterPoints: 16,

			image: 'url(assets/images/char2.jpg)',

			gif: 'assets/images/char2_animation.gif',

			name: 'char2',

			title: 'Reinhardt'
		},

		{
			healthPoints: 90,

			attackPoints: 28,

			counterPoints: 12,

			image: 'url(assets/images/char3.jpg)',

			gif: 'assets/images/char3_animation.gif',

			name: 'char3',

			title: 'Zenyatta'
		}];

	//Creating character divs for character objects.
	for (i=0; i < characters.length; i++) {
		var newDiv = $('<div>');
		newDiv.appendTo('.charactersRow').addClass('col-md-3 charBox');
		newDiv.append('<div class="charDiv" id="char' + i + '"></div>')
		$("#char" + i).css('background-image', characters[i].image);
		$("#char" + i).data(characters[i])
		$("#char" + i).append('<div class="charName"><span>' + characters[i].title + '</span></div><div class="charHealthPoints"><span>Health Points: ' + characters[i].healthPoints + '</span></div>');
	};

	//Resetting button visibility and stops previous event listener.
	$('.attackBtn').css('display', 'none');

	$('.resetBtn').css('display', 'none');

	$('.attackBtn').off('click');

	game();
};

//Starting game with reset values.
reset();

function game() {
	$('#info').text('Select your Hero!');

	//Clicking 1st character sets it as user's attacker, 
	$('.charDiv').on('click', function(){
		if ( $(this).hasClass('attacker') || $(this).hasClass('defender') ) {
			return false;
		};

		if (action === 0) {
			$(this).addClass('attacker')
			$('.attackerBox').append('<img src="'+ $('.attacker').data('gif') + '">');
			$('#info').text('Select your enemy!');
			action++;
		};
	});

	//2nd click sets as defender.
	$('.charDiv').on('click', function(){
		if ( $(this).hasClass('attacker') || $(this).hasClass('defender') ) {
			return false;
		};
		if (action === 1) {
			$(this).addClass('defender')
			$('.defenderBox').append('<img src="' + $('.defender').data('gif') + '">');
			$('.attackBtn').css('display', 'initial');
			$('#info').text('Prepare to fight!');
			action++;
			fightReady = true;
		}
	});

	//Attack button actions
	$('.attackBtn').on('click', function() {
		//Only allows attacking if both attacker and defender are set.
		if (fightReady === true) {
			var atkAP = $('.attacker').data('attackPoints');
			var atkHP = $('.attacker').data('healthPoints');
			var defCP = $('.defender').data('counterPoints');
			var defHP = $('.defender').data('healthPoints');

			//Fight and round calculations.
			var attackDamage = atkAP * roundCount;
			$('.defender').data('healthPoints', (defHP - attackDamage));
			$('.attacker').data('healthPoints', atkHP - defCP);
			roundCount++;

			//Printing damage and updated health info.
			$('.defender .charHealthPoints span').text('Health Points: ' + $('.defender').data('healthPoints'));
			$('.attacker .charHealthPoints span').text('Health Points: ' + $('.attacker').data('healthPoints'));
			$('#info').html('<p>You attacked ' + $('.defender').data('title') + ' for ' + attackDamage + ' damage.</p>' + '<p>' + $('.defender').data('title') + ' counter attacked you for ' + defCP + ' damage.</p>' );
		};

		//Removes defender if they have no HP left and waits for user to select new defender.
		if ($('.defender').data('healthPoints') <= 0) {
			$('.defender').remove();
			$('.defenderBox').empty();
			$('#info').text('You defeated the enemy! Move on to the next round and select another enemy!');
			$('.attackBtn').css('display', 'none');
			fightReady = false;
			action = 1;
			fightCount++;
		};

		//If user goes through all 3 rounds, they win. Allows for user to reset.
		if (fightCount === 3) {
			$('#info').text('You defeated all enemies! Do you want to try again?');
			winCount++;
			$('#wins').text('Wins: ' + winCount)

			$('.attackBtn').css('display', 'none');
			$('.resetBtn').css('display', 'initial');
		}

		//User is dead if HP is depleted
		if ($('.attacker').data('healthPoints') <= 0) {
			lossCount++;
			$('.attacker').remove();
			$('.attackerBox').empty();
			$('#info').text('You lost! Do you want to try again?');
			$('#losses').text('Losses: ' + lossCount)
			$('.attackBtn').css('display', 'none');
			$('.resetBtn').css('display', 'initial');
		}
	});

};

//Reset Button
$('.resetBtn').on('click', function(){
	reset();
});