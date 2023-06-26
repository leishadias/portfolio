var nav = document.querySelectorAll('.nav-scroll');
var skillbars = document.getElementsByClassName('skill-percent');

var scrollId;
let setWidthId;
var widthChanged=[false];

setInitialWidth();

for (let i=0; i<nav.length; i++){
    nav[i].addEventListener('click', smoothscroll);
}

window.addEventListener('scroll', checkScroll);

function smoothscroll(event) {
	event.preventDefault();
	var sec= this.getAttribute('href');
	scrollId = setInterval(scroll, 20, sec);
}

function scroll(sec) {
	let coord=document.getElementById(sec.slice(1)).getBoundingClientRect().top;
	if (coord<=0){
		clearInterval(scrollId);
		return;
	}
	window.scrollBy(0, 50);
}

/*skills*/
function setInitialWidth() {
	for (var i=0; i<skillbars.length; i++){
		skillbars[i].style.width=0;
	}
}

for (let i=0; i<skillbars.length; i++){
	widthChanged[i]=false;
}

function checkScroll() {
	for (let i=0; i<skillbars.length; i++){
		let skillSec = skillbars[i].getBoundingClientRect().top;
		if (!widthChanged[i] && skillSec<= window.innerHeight){
			widthChanged[i]=true;
			skillWidth(skillbars[i]);
		}else if (skillSec> window.innerHeight){
			widthChanged[i]=false;
		}	
	}	
}

function skillWidth(skillbar) {
		let currwidth=0;
		let targetwidth = skillbar.getAttribute('data-value');
		setWidthId=setInterval(function () {
			if (currwidth>targetwidth){
				clearInterval(setWidthId);
				return;
			}
			currwidth++;
			skillbar.style.width=currwidth +'%';
		}, 5);
}



