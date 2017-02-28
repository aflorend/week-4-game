	//Setting variables.
	var winCount = 0;

	var lossCount = 0;

	var roundCount = 1;

	var fightCount = 0;

	var action = 0;

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

	//Clicking character sets as attacker, 2nd click sets as 1st defender
	$('.charDiv').on('click', function(){
		if (action === 0) {
			$(this).addClass("attacker");
			$(this).removeClass("charDiv");
			console.log("attacker set");
			action++;

			$('.charDiv').on('click', function(){
				if (action === 1) {
					$(this).addClass("defender");
					$(this).removeClass("charDiv");
					console.log("defender set");
					action++
					fightReady = true;
				}
			});
		};
	});

	//Attack button actions
	$('.attackBtn').on('click', function() {
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

		if ($('.defender').data('healthPoints') <= 0) {
			$('.defender').remove();
			console.log("removed defender");
			fightReady = false;
			action = 1;
			fightCount++;
		}

		if ($('.attacker').data('healthPoints') <= 0) {
			console.log("Attacker dead");
			fightReady = false;
		}

		if (fightCount === 3) {
			console.log("You Win");
		}
	});

	