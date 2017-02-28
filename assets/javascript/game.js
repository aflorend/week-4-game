	//Setting variables.
	var winCount = 0;

	var lossCount = 0;

	var roundCount = 1;

	var fightCount = 0;

	var action = 0;

	$('.attackBtn').css('visibility', 'visible');

	$('.resetBtn').css('visibility', 'hidden');

	//Setting character objects.
	var char1 = {
		healthPoints: 100,

		attackPoints: 5,

		counterPoints: 5,

		image: ".../images/1.jpg",

		name: "1"
	};

	var char2 = {
		healthPoints: 150,

		attackPoints: 5,

		counterPoints: 5,

		image: ".../images/2.jpg",

		name: "2"
	};

	var char3 = {
		healthPoints: 100,

		attackPoints: 5,

		counterPoints: 5,

		image: ".../images/3.jpg",

		name: "3"
	};

	var char4 = {
		healthPoints: 100,

		attackPoints: 5,

		counterPoints: 5,

		image: ".../images/4.jpg",

		name: "4"
	};

	//Associating character data with their respective elements.
	$('#char1').data(char1);
	$('#char2').data(char2);
	$('#char3').data(char3);
	$('#char4').data(char4);

	
	//Clicking character sets it as user's attacker, 2nd click sets as 1st defender.
	$('.charDiv').on('click', function(){
		if ( $(this).hasClass('attacker') || $(this).hasClass('defender') ) {
			return false;
		};

		if (action === 0) {
			$(this).addClass("attacker");
			console.log("attacker set");
			action++;

			$('.charDiv').on('click', function(){
				if ( $(this).hasClass('attacker') || $(this).hasClass('defender') ) {
					return false;
				};
				if (action === 1) {
					$(this).addClass("defender");
					console.log("defender set");
					action++
					fightReady = true;
				}
			});
		};
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

			$('.defender').data('healthPoints', (defHP - (atkAP * roundCount)));
			$('.attacker').data('healthPoints', (atkHP - defCP));
			roundCount++;
			
			console.log(roundCount);
			console.log("Attacker HP: " + $('.attacker').data('healthPoints'));
			console.log("Defender HP: " + $('.defender').data('healthPoints'));

		}

		//Removes defender if they have no HP left and waits for user to select new defender.
		if ($('.defender').data('healthPoints') <= 0) {
			$('.defender').css('display','none');
			$('.defender').removeClass('defender');
			console.log("removed defender");
			fightReady = false;
			action = 1;
			fightCount++;
		}

		//User is dead if HP is depleted
		if ($('.attacker').data('healthPoints') <= 0) {
			console.log("Attacker dead");
			lossCount++;
			$('.attackBtn').css('visibility', 'hidden');
			$('.resetBtn').css('visibility', 'visible');
		}

		//If user goes through all 3 rounds, they win. Allows for user to reset.
		if (fightCount === 3) {
			console.log("You Win");
			winCount++;
			$('.attackBtn').css('visibility', 'hidden');
			$('.resetBtn').css('visibility', 'visible');
		}
	});

//Reseting game and values.
function reset() {
	roundCount = 1;

	fightCount = 0;

	action = 0;

	$('.attackBtn').css('visibility', 'visible');

	$('.resetBtn').css('visibility', 'hidden');

	$('.charDiv').css('display', 'initial');

	$('.attacker').removeClass('attacker');
	
	//Associating character data with their respective elements.
	$('#char1').data(char1);
	$('#char2').data(char2);
	$('#char3').data(char3);
	$('#char4').data(char4);
}

//Reset Button
$('.resetBtn').on('click', function(){
	reset();
});