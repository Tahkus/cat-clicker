
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
		admin.init();
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
	},

	// Update data with new input from admin popup and display
	newInfo: function() {
		if (admin.nameInput.value !== "") {
			model.activeCat.name = admin.nameInput.value;
		}
		if (admin.urlInput.value !== "") {
			model.activeCat.source = admin.urlInput.value;
		}
		if (admin.clicksInput.value !== "") {
			model.activeCat.clicks = admin.clicksInput.value;
		}
		displayView.render();
	}
};
// * VIEW *
// Create thumbnail elements on page with event listener to change displayed cat when thumbnail is clicked.

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
					displayView.render();
					admin.render();
				};
			})(cat));
		}
	}
};

// Display selected cat with info displayed and event listener for updating clicks.
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

// Create event listeners for showing admin popup and add placeholders in input fields
var admin = {

	init: function() {
		this.adminBttn = document.querySelector('.admin-bttn');
		this.cancel = document.querySelector('.cancel');
		this.save = document.querySelector('.save');
		let popup = document.querySelector('.popup');
		//Event listener to show admin popup when button is clicked
		this.adminBttn.addEventListener('click', function() {
			popup.classList.toggle('show');
		});
		this.cancel.addEventListener('click', function() {
			popup.classList.remove('show');
		});
		this.save.addEventListener('click', function() {
			octopus.newInfo();
			popup.classList.remove('show');
		})
		this.render();
	},

	render: function() {
		const currentCat = octopus.getActiveCat();
		this.nameInput = document.getElementById('name');
		this.urlInput = document.getElementById('url');
		this.clicksInput = document.getElementById('clicks');

		this.nameInput.placeholder = currentCat.name;
		this.urlInput.placeholder = currentCat.source;
		this.clicksInput.placeholder = currentCat.clicks;
	}

};


octopus.init();

