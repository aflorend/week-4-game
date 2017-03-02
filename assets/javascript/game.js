	var winCount = 0;

	var lossCount = 0;

	var roundCount = 1;

	var fightCount = 0;

	var fightReady = false;

	var action = 0;

function reset() {

	//Resetting Variables to inital values.
	winCount = 0;

	lossCount = 0;

	roundCount = 1;

	fightCount = 0;

	fightReady = false;

	action = 0;


	//Empties last game's character divs.
	$('.charactersRow, .attackerBox, .defenderBox').empty();
	
	//Setting character objects.
	var characters = [
	{
		healthPoints: 100,

		attackPoints: 5,

		counterPoints: 5,

		image: '.../images/1.jpg',

		name: 'char0',

		title: 'char0'
	},

	{
		healthPoints: 100,

		attackPoints: 5,

		counterPoints: 5,

		image: '.../images/2.jpg',

		name: 'char1',

		title: 'char1'
	},

	{
		healthPoints: 100,

		attackPoints: 5,

		counterPoints: 5,

		image: '.../images/3.jpg',

		name: 'char2',

		title: 'char2'
	},

	{
		healthPoints: 100,

		attackPoints: 5,

		counterPoints: 5,

		image: '.../images/4.jpg',

		name: 'char3',

		title: 'char3'
	}];

	//Creating character divs for character objects.
	for (i=0; i < characters.length; i++) {
		var newDiv = $('<div>');
		newDiv.appendTo('.charactersRow').addClass('col-md-3 charBox');
		newDiv.append('<div class="charDiv" id="char' + i + '"></div>')
		$("#char" + i).data(characters[i]).text("Health Points :" + characters[i].healthPoints);
	};

	//Associating character data with their respective elements.
	// $('#char1').data(char1);
	// $('#char2').data(char2);
	// $('#char3').data(char3);
	// $('#char4').data(char4);

	$('.attackBtn').css('visibility', 'hidden');

	$('.resetBtn').css('visibility', 'hidden');

	game();
};

//Starting game with reset values.
reset();

function game() {
$('#info').text('Select your character!');

//Clicking character sets it as user's attacker, 2nd click sets as 1st defender.
$('.charDiv').on('click', function(){
	if ( $(this).hasClass('attacker') || $(this).hasClass('defender') ) {
		return false;
	};

	if (action === 0) {
		$(this).addClass('attacker').appendTo('.attackerBox');
		$('#info').text('Select your enemy!');
		action++;
	};
});

$('.charDiv').on('click', function(){
	if ( $(this).hasClass('attacker') || $(this).hasClass('defender') ) {
		return false;
	};
	if (action === 1) {
		$(this).addClass('defender').appendTo('.defenderBox');
		$('.attackBtn').css('visibility', 'visible');
		$('#info').text('Attack!');
		action++
		fightReady = true;
	}
});

//Attack button actions
$('.attackBtn').on('click', function() {
	//Only allows attacking if both attacker and defender are set.
	if (fightReady === true) {
		console.log('attacked');
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
		$('.defender').text('Health Points :' + $('.defender').data('healthPoints'));
		$('.attacker').text('Health Points :' + $('.attacker').data('healthPoints'));
		$('#info').text('You attacked ' + $('.defender').data('title') + ' for ' + attackDamage + ' damage. ' + $('.defender').data('title') + ' counter attacked you for ' + defCP + ' damage.' );
	};

	//Removes defender if they have no HP left and waits for user to select new defender.
	if ($('.defender').data('healthPoints') <= 0) {
		$('.defender').remove();
		$('#info').text('You defeated the enemy! Move on to the next round and select another enemy!');
		$('.attackBtn').css('visibility', 'hidden');
		fightReady = false;
		action = 1;
		fightCount++;
	};

	//User is dead if HP is depleted
	if ($('.attacker').data('healthPoints') <= 0) {
		console.log('Attacker dead');
		lossCount++;
		$('.attackBtn').css('visibility', 'hidden');
		$('.resetBtn').css('visibility', 'visible');
	}

	//If user goes through all 3 rounds, they win. Allows for user to reset.
	if (fightCount === 3) {
		$('#info').text('You defeated all enemies! Do you want to try again?');
		winCount++;
		$('.attackBtn').css('visibility', 'hidden');
		$('.resetBtn').css('visibility', 'visible');
	}
});

};

//Reset Button
$('.resetBtn').on('click', function(){
	reset();
});