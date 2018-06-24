/*
 * Create a list that holds all of your cards
 */
let cardArray = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'],
    opened = [],
    match = 0,
    $deck = $('.deck'),
    $moveNum = $('.moves');


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
		for (i = 0; i < cards.length; i++) {
			$deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
		}

}

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
});

initGame();
