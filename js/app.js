
// * MODEL *
// Cat objects

var model = {

	activeCat: null,
	cats: [ 
		{ 
			name: 'Major in a box', 
			source: 'img/major-box.jpg', 
			clicks: 0
		},
		{
			name: 'Major and Zoey', 
			source: 'img/major-zoey.jpg', 
			clicks: 0
		},
		{
			name: 'Major with a mouse', 
			source: 'img/major-mouse.jpg', 
			clicks: 0
		},
		{
			name: 'Zoey on a drum', 
			source: 'img/zoey-drum.jpg', 
			clicks: 0
		},
		{
			name: 'Zoey in the jungle', 
			source: 'img/zoey-jungle.jpg', 
			clicks: 0
		},
		{
			name: 'Zoey with a string', 
			source: 'img/zoey-string.jpg', 
			clicks: 0}
	]
};


var octopus = {

	init: function() {
		model.activeCat = model.cats[0];
		thumbView.init();
		displayView.init();
	},

	getActiveCat: function() {
		return model.activeCat;
	},

	getCats: function() {
		return model.cats;
	},

	setActiveCat: function(cat) {
		model.activeCat = cat;
	},

	updateClicks: function() {
		model.activeCat.clicks++;
		displayView.render();
	}
};
// * VIEW *
// Create thumbnail elements on page, display when clicked, and update counter
// when displayed cat is clicked.

var thumbView = {

	init: function() {
		let cats = octopus.getCats();
		this.thumbnails = document.querySelector('.thumbnails')
		for(let i in cats) {
			let cat = cats[i];
			let catThumb = document.createElement('div');
			catThumb.classList.add('cat-thumb');
			catThumb.innerHTML = '<img class="thumbnail" src=' + cat.source + ' alt="' + cat.name + 'thumbnail">';
			this.thumbnails.appendChild(catThumb);
			catThumb.addEventListener('click', (function(catCopy) {
				return function() {
					octopus.setActiveCat(catCopy);
					displayView.init();
				};
			})(cat));
		}
	}
};

var displayView = {

	init: function() {
		this.catDiv = document.querySelector('.display');
		this.catPic = document.querySelector('.big-cat');
		this.catName = document.querySelector('.cat-name');
		this.catCounter = document.querySelector('.counter');
		//Event listener for adding clicks
		this.catPic.addEventListener('click', function() {
			octopus.updateClicks();
		});
		this.render();
	},

	render: function() {
		let displayCat = octopus.getActiveCat();
		this.catPic.src = displayCat.source;
		this.catName.textContent = displayCat.name;
		this.catCounter.innerHTML = '<h3>This cat has received ' + displayCat.clicks + ' pets.</h3>';
	}
};

octopus.init();

