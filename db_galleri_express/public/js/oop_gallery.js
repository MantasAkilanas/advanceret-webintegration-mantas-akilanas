
// Denne fil må kun indeholde definitionen på gallery objektet.
// Altså må der ikke stå "new OOPGallery()" nogen steder i denne fil.

// Hvis en hjemmeside f.eks. har 3 gallerier på samme underside,
// så må de 3 gallerier IKKE nævnes specifikt her!

// Spørg, hvis du er i tvivl omkring reglerne.

class OOPGallery {
	// Deklarér properties og definér funktioner/metoder her.
	constructor(url) {
		this.currentImages = [];
		this.allImages = [];
		this.wrap = true;
		this.containerElement = null;
		this.currentImgNumber = 0
		this.imageElement = null;
		this.controlElementNext = null;
		this.controlElementPrevious = null;
		this.controlElementFirst = null;
		this.controlElementLast = null;
		this.controlElementWrap = null;
		this.controlElementAuto = null;
		this.controlElementRandom = null;
		this.spanElement = null;
		this.autoRunVar = null;
		this.infocontainer = null;
		this.wrap = true;
		this.auto = true;
		this.NewRandomImage = 0;
		this.imageChangeSpeed = 50;
		this.controlElementspeed;
		this.controlElementspeedinput;
		this.title = null;
		this.author = null;
		this.date = null;
		this.url = url;
		this.selectBox = null;
		this.categoryList = [];
		this.nameAndRatingBox = null;
		this.ratingBox = null;
		this.stars = [];
		this.posted = false;
		this.getData();
	}
	selectContainer(containerSelector) {
		this.containerElement = document.querySelector(containerSelector);
		this.imageElement = this.containerElement.querySelector(`.oopgallery-image`);
		this.controlElementFirst = this.containerElement.querySelector(`.oopgallery-control-first`);
		this.controlElementLast = this.containerElement.querySelector(`.oopgallery-control-last`);
		this.controlElementNext = this.containerElement.querySelector(`.oopgallery-control-next`);
		this.controlElementPrevious = this.containerElement.querySelector(`.oopgallery-control-previous`);
		this.spanElement = this.containerElement.querySelector(`.oopgallery-image-number`);
		this.controlElementWrap = this.containerElement.querySelector(".oopgallery-control-wrap");
		this.controlElementAuto = this.containerElement.querySelector(".oopgallery-control-auto");
		this.controlElementRandom = this.containerElement.querySelector(".oopgallery-control-random");
		this.controlElementspeed = this.containerElement.querySelector(".oopgallery-control-speed");
		this.controlElementspeedinput = this.containerElement.querySelector(".oopgallery-image-speed");
		this.addEvents();
		this.updateImage();
	}
	getData() {
		fetch(this.url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				data.forEach((element) => {
					this.addImage(new image(element))
					if (this.categoryList.indexOf(element.kategori) == -1) {
						this.categoryList.push(element.kategori);
					}
				});
				this.currentImages = this.allImages;
				this.createGaleri();
			})
	}
	gotoImageFirst() {
		this.currentImgNumber = 0;
		this.updateImage();
	}
	gotoImageLast() {
		this.currentImgNumber = this.currentImages.length - 1;
		this.updateImage();
	}
	gotoImagePrevious() {
		if (!this.wrap) {
			if (this.currentImgNumber >= 1) {
				this.currentImgNumber--;
				this.updateImage();
			}
		}
		else if (this.wrap && this.currentImgNumber >= 1) {
			this.currentImgNumber--;
			this.updateImage();
		}
		else {
			this.currentImgNumber = this.currentImages.length - 1;
			this.updateImage();
		}
	}
	gotoImageNext() {
		if (!this.wrap) {
			if (this.currentImgNumber < this.currentImages.length - 1) {
				this.currentImgNumber++;
				this.updateImage();
			}
		}
		else if (this.wrap && this.currentImgNumber < this.currentImages.length - 1) {
			this.currentImgNumber++;
			this.updateImage();
		}
		else {
			this.currentImgNumber = 0;
			this.updateImage();
		}
	}
	gotoImageNextAuto() {
		if (this.currentImgNumber < this.currentImages.length - 1) {
			this.currentImgNumber++;
			this.updateImage();
		}
		else {
			this.currentImgNumber = 0;
			this.updateImage();
		}
	}
	updateImage() {
		this.title.textContent = this.currentImages[this.currentImgNumber].titel
		this.author.textContent = this.currentImages[this.currentImgNumber].fotograf;
		this.date.textContent = this.currentImages[this.currentImgNumber].dato;
		this.imageElement.src = "img/" + this.currentImages[this.currentImgNumber].filnavn;
		this.spanElement.textContent = `${this.currentImgNumber + 1}/${this.currentImages.length}`;
		this.markScore();
	}
	addImage(string) {
		this.allImages.push(new image(string));
	}
	addImages(array) {
		this.allImages = this.allImages.concat(array);
	}
	toggleWrapMode() {
		this.wrap = !this.wrap;
		this.controlElementWrap.textContent = this.wrap ? "wrap" : "nowrap";

	}
	setWrapMode(bool) {
		this.wrap = bool;
		this.controlElementWrap.textContent = this.wrap ? "wrap" : "nowrap";
	}
	toggleAutoMode() {
		this.auto = !this.auto;
		this.controlElementAuto.textContent = this.auto ? "auto" : "noauto";
		this.autoRun();

	}
	setAutoMode(bool) {
		this.auto = bool;
		this.controlElementAuto.textContent = this.auto ? "auto" : "noauto";
		this.autoRun();
	}
	createGaleri() {
		this.containerElement = document.createElement("div");
		this.containerElement.className = "oopgallery-container";
		this.selectBox = document.createElement("select");
		let option = document.createElement("option");
		option.textContent = "all";
		option.value = "all";
		this.selectBox.appendChild(option);
		this.categoryList.forEach((element) => {
			option = document.createElement("option");
			option.textContent = element;
			option.value = element;
			this.selectBox.appendChild(option);
		})
		this.containerElement.appendChild(this.selectBox);
		this.title = document.createElement("h2");
		this.nameAndRatingBox = document.createElement("div");
		this.nameAndRatingBox.className = "nameAndRatingBox";
		this.ratingBox = document.createElement("div");

		for (let i = 0; i < 5; i++) {
			let span = document.createElement("span");
			span.dataset.number = i + 1;
			span.className = "glyphicon glyphicon-star-empty";
			this.stars.push(span);
			this.ratingBox.appendChild(span);
		}
		this.nameAndRatingBox.appendChild(this.title);
		this.nameAndRatingBox.appendChild(this.ratingBox);
		this.containerElement.appendChild(this.nameAndRatingBox);

		this.imageElement = document.createElement("img");
		this.imageElement.className = "oopgallery-image";

		this.containerElement.appendChild(this.imageElement);

		this.infoContainer = document.createElement("div");
		this.infoContainer.className = "infoContainer";
		this.author = document.createElement("p");
		this.date = document.createElement("p");
		this.infoContainer.appendChild(this.author);
		this.infoContainer.appendChild(this.date);
		this.containerElement.appendChild(this.infoContainer);


		let controlDiv = document.createElement("div");
		controlDiv.className = "oopgallery-controls";

		this.controlElementRandom = document.createElement("spawn");
		this.controlElementRandom.textContent = "random";
		this.controlElementRandom.className = "oopgallery-control-random";

		this.controlElementAuto = document.createElement("spawn");
		this.controlElementAuto.textContent = "auto";
		this.controlElementAuto.className = "oopgallery-control-auto";

		this.controlElementWrap = document.createElement("spawn");
		this.controlElementWrap.textContent = "wrap";
		this.controlElementWrap.className = "oopgallery-control-wrap";
		controlDiv.appendChild(this.controlElementRandom);
		controlDiv.appendChild(this.controlElementAuto);
		controlDiv.appendChild(this.controlElementWrap);

		this.controlElementFirst = document.createElement("button");
		this.controlElementFirst.className = "oopgallery-control-first";

		this.controlElementPrevious = document.createElement("button");
		this.controlElementPrevious.className = "oopgallery-control-previous";

		this.controlElementNext = document.createElement("button");
		this.controlElementNext.className = "oopgallery-control-next";

		this.controlElementLast = document.createElement("button");
		this.controlElementLast.className = "oopgallery-control-last";

		this.controlElementFirst.textContent = "<<"

		this.controlElementPrevious.textContent = "<"

		this.controlElementNext.textContent = ">"

		this.controlElementLast.textContent = ">>"

		this.spanElement = document.createElement("span");
		this.spanElement.className = "oopgallery-image-number";

		this.controlElementspeed = document.createElement("input");
		this.controlElementspeed.type = "range";
		this.controlElementspeed.min = 1;
		this.controlElementspeed.max = 1000;
		this.controlElementspeed.value = 50;


		this.controlElementspeedinput = document.createElement("input");
		this.controlElementspeedinput.type = "number";
		this.controlElementspeedinput.value = 50;

		controlDiv.appendChild(this.controlElementFirst);
		controlDiv.appendChild(this.controlElementPrevious);
		controlDiv.appendChild(this.spanElement);
		controlDiv.appendChild(this.controlElementNext);
		controlDiv.appendChild(this.controlElementLast);
		controlDiv.appendChild(this.controlElementspeed);
		controlDiv.appendChild(this.controlElementspeedinput);
		this.containerElement.appendChild(controlDiv);
		document.body.appendChild(this.containerElement);
		this.addEvents();
		this.updateImage();
	}
	addEvents() {
		this.controlElementNext.addEventListener("click", (event) => {
			this.gotoImageNext();
		});
		this.controlElementPrevious.addEventListener("click", (event) => {
			this.gotoImagePrevious();
		});
		this.controlElementFirst.addEventListener("click", (event) => {
			this.gotoImageFirst();
		});
		this.controlElementLast.addEventListener("click", (event) => {
			this.gotoImageLast();
		});
		this.controlElementWrap.addEventListener("click", (event) => {
			this.toggleWrapMode();
		});
		this.controlElementAuto.addEventListener("click", (event) => {
			this.toggleAutoMode();
		});
		this.controlElementRandom.addEventListener("click", (event) => {
			this.randomImage();
		})
		this.controlElementspeed.addEventListener("input", (event) => {
			this.controlElementspeedinput.value = this.controlElementspeed.value;
			this.imageChangeSpeed = this.controlElementspeed.value;
			this.autorunChange();
		})
		this.controlElementspeedinput.addEventListener("input", (event) => {
			this.controlElementspeed.value = this.controlElementspeedinput.value;
			this.imageChangeSpeed = this.controlElementspeedinput.value;
			this.autorunChange();
		})
		this.selectBox.addEventListener("change", (event) => {
			this.changeCategory();
		})
		this.stars.forEach((element) => {
			element.addEventListener("mouseenter", (event) => {
				this.markStars(event.target);
			})
			element.addEventListener("mouseleave", (event) => {
				this.markScore();
			})
			element.addEventListener("click", (event) => {
				if (!this.posted) {
					this.postScore(event.target.dataset.number);
				}
			})
		})

		this.autoRun();
	}
	autoRun() {
		if (this.auto) {
			this.autoRunVar = setInterval(() => {
				this.gotoImageNextAuto()
			}, 100000 / this.imageChangeSpeed);
		}
		else {
			clearInterval(this.autoRunVar);

		}
	}
	restartAutoRun() {
		if (this.auto) {
			clearInterval(this.autoRunVar);
			this.autoRunVar = setInterval(() => {
				this.gotoImageNextAuto()
			}, 100000 / this.imageChangeSpeed);
		}
	}
	autorunChange() {
		clearInterval(this.autoRunVar)
		this.autoRun();
	}
	randomImage() {
		do {
			this.NewRandomImage = Math.floor((Math.random() * this.currentImages.length));
		} while (this.NewRandomImage == this.currentImgNumber)
		this.currentImgNumber = this.NewRandomImage;
		this.updateImage();
	}
	imageChangeSpeed() {
	}
	changeCategory() {
		this.currentImages = [];
		if (this.selectBox.value != "all") {
			this.allImages.forEach((element) => {
				if (this.selectBox.value === element.kategori) {
					this.currentImages.push(element);
				}

			})
			this.currentImgNumber = 0;
		}
		else {
			this.currentImages = this.allImages;
		}
		this.restartAutoRun();
		this.updateImage();
	}
	markStars(targetElement) {
		let target = targetElement;
		target.className = "glyphicon glyphicon-star";
		while (target.previousSibling) {
			target = target.previousSibling;
			target.className = "glyphicon glyphicon-star";
		}
	}
	postScore(score) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let init = {
			method: 'POST',
			headers: headers,
			body: `{"billede":"${this.currentImages[this.currentImgNumber].id}","score":"${score}"}`,
			cache: 'no-cache',
			mode: 'cors'
		};
		fetch("http://localhost:3000/postscore/", init)
	}
	markScore() {
		if (parseInt(this.currentImages[this.currentImgNumber].score) == 5) {
			this.markStars(document.querySelector("[data-number='5']"))
		}
		else if (parseInt(this.currentImages[this.currentImgNumber].score) >= 4) {
			this.markStars(document.querySelector("[data-number='4']"))
		}
		else if (parseInt(this.currentImages[this.currentImgNumber].score) >= 3) {
			this.markStars(document.querySelector("[data-number='3']"))
		}
		else if (parseInt(this.currentImages[this.currentImgNumber].score) >= 2) {
			this.markStars(document.querySelector("[data-number='2']"))
		}
		else if (parseInt(this.currentImages[this.currentImgNumber].score) >= 1) {
			this.markStars(document.querySelector("[data-number='1']"))
		}
		else{
			this.stars.forEach((element) => {
				element.className = "glyphicon glyphicon-star-empty";
			})
		}

	}
}