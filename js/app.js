/*
 * Create a list that holds all of your cards
 */
let cardArray = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'],
    opened = [],
    match = 0,
    moves = 0,
    delay = 800,
    $deck = $('.deck'),
    $moveNum = $('.moves'),
    $ratingStars = $('i'),
    gameCardsQTY = cardArray.length / 2,
	rank3stars = gameCardsQTY + 2,
  	rank2stars = gameCardsQTY + 6,
    rank1stars = gameCardsQTY + 10;
    min = 0;
    sec = 0;
    stopTimer = 0;

/**
*@description Timer function. When a player starts a game, a displayed timer should also starts. Timer stops when player wins.
*@param {number}
*@returns {number} returns the time in seconds and minutes
*/

window.onload = function() {
    setInterval(function() {
        if (stopTimer !== 1) {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            $('.timer').html(min + ':' + sec);
            console.log(min);
            console.log(sec);
        }

    }, 1000);
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/**
* @description Card shuffle Here the cards are shuffled according to this setup and code from http://stackoverflow.com/a/2450976
* @param {array}  - Array is parsed
* @returns {array} Array values are shuffled 
*/

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

 /**
* @description Game setup: Cards are placed inside the grid.
* @param {array}  - Shuffled values are parsed into grid
* @returns {array} - Cards are generated on the grid blank side up
*/

function initGame() {
	let cards = shuffle(cardArray);
  	$deck.empty();
    $moveNum.text('0');
  	$ratingStars.removeClass('fa-star-o').addClass('fa-star');  
		for (i = 0; i < cards.length; i++) {
			$deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
		}

}

/**
* @description Set Rating: Displays Star Rating and score
* @param {array}  - Full stars are calculated
* @returns {array} - Three stars are displayed and the score is 0
*/
function setRating(moves) {
	let rating = 3;
	if (moves > rank3stars && moves < rank2stars) {
		$ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
		rating = 2;
	} else if (moves > rank2stars && moves < rank1stars) {
		$ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
		rating = 1;
	} else if (moves > rank1stars) {
		$ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
		rating = 0;
	}	
	return { score: rating };
};

/**
* @description Flip first card: Card displays symbol
* @param {click}  - User clicks in grid
* @returns {open show} - Card is turned around and kept open.
*/

$deck.on('click', '.card:not(".match, .open")', function() {
	if($('.show').length > 1) { return true; }	
	    let $this = $(this),
			card = $this.context.innerHTML;
  	$this.addClass('open show');
        opened.push(card);
/**
* @description Flip second card: Compare with first card
* @param {.open}  - Second click occurs. Any click is logged and compared 
* @returns {open show} - If the card has same value as in the index then card stays open. If the value is not the same as in index card closes
*/
    if (opened.length > 1) {
        if (card === opened[0]) {
            $deck.find('.open').addClass('match animated infinite rubberBand');
            setTimeout(function() {
                $deck.find('.match').removeClass('open show animated infinite rubberBand');
            }, delay);
            match++;
        } else {
            $deck.find('.open').addClass('notmatch animated infinite wobble');
                setTimeout(function() {
                    $deck.find('.open').removeClass('animated infinite wobble');
                }, delay / 1.5);
            setTimeout(function() {
                $deck.find('.open').removeClass('open show notmatch animated infinite wobble');
            }, delay);
        }
        opened = [];
            moves++;
            $moveNum.html(moves);
            setRating(moves);
    }
});

initGame();
