// Cat objects

let catPics = {
	majorBox: {name: 'Major in a box', source: 'img/major-box.jpg', clicks: 0},
	majorZoey: {name: 'Major and Zoey', source: 'img/major-zoey.jpg', clicks: 0},
	majorMouse: {name: 'Major with a mouse', source: 'img/major-mouse.jpg', clicks: 0},
	zoeyDrum: {name: 'Zoey on a drum', source: 'img/zoey-drum.jpg', clicks: 0},
	zoeyJungle: {name: 'Zoey in the jungle', source: 'img/zoey-jungle.jpg', clicks: 0},
	zoeyString: {name: 'Zoey with a string', source: 'img/zoey-string.jpg', clicks: 0}
};


// Global variables

let allCats = [];
const display = document.querySelector('.display');
const thumbnails = document.querySelector('.thumbnails')


// Adding cats to the allCats array for accessing

for(let key in catPics) {
	allCats.push(catPics[key]);
};


// Create thumbnail elements on page, display when clicked, and update counter
// when displayed cat is clicked.

for(let i in allCats) {
	let cat = allCats[i];
	let catThumb = document.createElement('div');
	catThumb.classList.add('cat-thumb');
	catThumb.innerHTML = '<img class="thumbnail" src=' + cat.source + ' alt="' + cat.name + 'thumbnail">';
	thumbnails.appendChild(catThumb);
	catThumb.addEventListener('click', function() {
		// Clear any previous images from display
		display.innerHTML = '';
		// Create new image and display
		let bigCat = document.createElement('div');
		bigCat.classList.add('big-cat');
		bigCat.innerHTML = '<img class="cat-display" src=' + cat.source + ' alt="' + cat.name + 'picture"> <h2 class="cat-name">' + cat.name + '</h2>';
		display.appendChild(bigCat);
		// Create counter
		let counter = document.createElement('h3');
		counter.textContent = 'This cat has received ' + cat.clicks + ' pet(s).';
		bigCat.appendChild(counter);
		// Event listener to update counter
		bigCat.addEventListener('click', function() {
			cat.clicks++;
			counter.textContent = 'This cat has received ' + cat.clicks + ' pet(s).';
		})
	});
};


