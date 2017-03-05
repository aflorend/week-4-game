$(document).ready(function () {
	//Setting variables.
		var winCount = 0;

		var lossCount = 0;

		var roundCount = 1;

		var fightCount = 0;

		var fightReady = false;

		var action = 0;

		var noHealth = false;


	//Reset function for game.
	function reset() {

		//Resetting Variables to inital values.
		roundCount = 1;

		fightCount = 0;

		fightReady = false;

		action = 0;

		noHealth = false;


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

		//Creating character divs with info from character objects.
		for (i=0; i < characters.length; i++) {
			var newDiv = $('<div>');
			newDiv.appendTo('.charactersRow').addClass('charBox');
			newDiv.append('<div class="charDiv" id="char' + i + '"></div><div class="charHealthPoints">HP: ' + characters[i].healthPoints + '</div>');
			
			$("#char" + i).css('background-image', characters[i].image)
			.append('<div class="charName">' + characters[i].title + '</div>')
			.data(characters[i]);
		};

		//Resetting button visibility and stops previous event listener.
		$('.attackBtn').css('display', 'none');

		$('.resetBtn').css('display', 'none');

		$('.attackBtn').off('click');

		//Drawing characters onto screen.
		$('.charDiv')
		.hide()
		.each(function(i){
	    	$(this).delay(i * 500).fadeIn(1500);
	   	});

	   	$('.charHealthPoints')
		.hide()
		.each(function(i){
	    	$(this).delay(i * 500).fadeIn(1500);
	   	});

	   	//Plays theme audio
		$('#musicSource').attr('src', 'assets/audio/theme.mp3');
		$('#music')[0].pause();
		$('#music')[0].load();
		$('#music')[0].play();

		game();
	};

	function game() {
		$('#info').text('Welcome to 8-bit Overwatch! Select your Hero.').hide().delay(200).fadeIn(400);

		//Clicking 1st character sets it as user's attacker, 
		$('.charDiv').on('click', function(){
			if ( $(this).hasClass('attacker') || $(this).hasClass('defender') ) {
				return false;
			};

			if (action === 0) {
				$(this).addClass('attacker')
				$('.attackerBox').append('<img src="'+ $('.attacker').data('gif') + '">').hide().fadeIn(800);
				$('#info').text('Select your enemy!').hide().delay(200).fadeIn(400);
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
				$('.defenderBox').append('<img src="' + $('.defender').data('gif') + '">').hide().fadeIn(800);
				$('.attackBtn').css('display', 'initial');
				$('#info').text('Prepare to Attack!').hide().delay(200).fadeIn(400);
				action++;
				fightReady = true;
			}
		});

		//Attack button actions
		$('.attackBtn').on('click', function() {
			//Only allows attacking if both attacker and defender are set.
			if (fightReady === true) {
				$('#sfx')[0].pause();
				$('#sfx')[0].play();
				$('#info').empty();
				$('.bottomHalf, .infoRow')
				.fadeOut(280)
				.fadeIn(280);

				//Fight and round calculations.
				var atkAP = $('.attacker').data('attackPoints');
				var atkHP = $('.attacker').data('healthPoints');
				var defCP = $('.defender').data('counterPoints');
				var defHP = $('.defender').data('healthPoints');
				var attackDamage = atkAP * roundCount;
				$('.defender').data('healthPoints', (defHP - attackDamage));
				$('.attacker').data('healthPoints', atkHP - defCP);
				roundCount++;

				//Printing damage and updated health info.
				$('.defender').siblings().text('HP: ' + $('.defender').data('healthPoints'));
				$('.attacker').siblings().text('HP: ' + $('.attacker').data('healthPoints'));
				$('#info').text('You attacked ' + $('.defender').data('title') + ' for ' + attackDamage + ' damage. ' + $('.defender').data('title') + ' counter-attacked you for ' + defCP + ' damage.' ).hide().delay(200).fadeIn(400);
			};

			//User is dead if HP is depleted
			if ($('.attacker').data('healthPoints') <= 0) {
				noHealth = true;
				lossCount++;
				$('.attacker').siblings().remove();
				$('.attacker').remove();
				$('.attackerBox').empty();
				$('#info').text('YOU DIED! DEFEAT! Do you want to try again?').hide().delay(200).fadeIn(400);
				$('#losses').text('Losses: ' + lossCount)
				$('.attackBtn').css('display', 'none');
				$('.resetBtn').css('display', 'initial');

				//Plays defeat music.
				$('#musicSource').attr('src', 'assets/audio/defeat.mp3');
				$('#music')[0].pause();
				$('#music')[0].load();
				$('#music')[0].play();
			}

			//Removes defender if they have no HP left and waits for user to select new defender.
			if ($('.defender').data('healthPoints') <= 0 && noHealth === false) {
				$('.defender').siblings().remove();
				$('.defender').remove();
				$('.defenderBox').empty();
				$('#info').text('You defeated the enemy! Move on to the next round and select another enemy!').hide().delay(200).fadeIn(400);
				$('.attackBtn').css('display', 'none');
				fightReady = false;
				action = 1;
				fightCount++;
			};

			//If user goes through all 3 rounds with health remaining, they win. Allows for user to reset.
			if (fightCount === 3 && noHealth === false) {
				$('#info').text('TEAM KILL! VICTORY! Do you want to try again?');
				winCount++;
				$('#wins').text('Wins: ' + winCount)

				$('.attackBtn').css('display', 'none');
				$('.resetBtn').css('display', 'initial');

				//Plays victory music.
				$('#musicSource').attr('src', 'assets/audio/victory.mp3');
				$('#music')[0].pause();
				$('#music')[0].load();
				$('#music')[0].play();
			};
		});
	};

	//Reset Button
	$('.resetBtn').on('click', function(){
		reset();
	});

	//Starting game with reset values.
	reset();

});

