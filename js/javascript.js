class ClassWatcher {

    constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
        this.targetNode = targetNode
        this.classToWatch = classToWatch
        this.classAddedCallback = classAddedCallback
        this.classRemovedCallback = classRemovedCallback
        this.observer = null
        this.lastClassState = targetNode.classList.contains(this.classToWatch)

        this.init()
    }

    init() {
        this.observer = new MutationObserver(this.mutationCallback)
        this.observe()
    }

    observe() {
        this.observer.observe(this.targetNode, { attributes: true })
    }

    disconnect() {
        this.observer.disconnect()
    }

    mutationCallback = mutationsList => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let currentClassState = mutation.target.classList.contains(this.classToWatch)
                if(this.lastClassState !== currentClassState) {
                    this.lastClassState = currentClassState
                    if(currentClassState) {
                        this.classAddedCallback()
                    }
                    else {
                        this.classRemovedCallback()
                    }
                }
            }
        }
    }
}
$(document).ready(function () {
	$('#fullpage').fullpage({
		sectionsColor: ['#BD1A3B', '#000'],
		css3: true,
		navigation: true,
		navigationPosition: 'right',
		scrollBar: true,
		controlArrows: false,
		slidesNavigation: true,
		afterRender: function () {
			// show page on ready
			$("#loadingMask").fadeOut("slow");
			let node = document.getElementById("section2");
			let classWatcher = new ClassWatcher(node, 'active', workOnClassAdd, workOnClassRemoval);
		}
	});
	

});



function workOnClassRemoval() {
	clearInterval(accessCountimer);
	clearInterval(timer);
}

var accessCountimer;
var timer;
var typer;

function workOnClassAdd() {
	var Typer = {
		text: null,
		accessCountimer: null,
		index: 0,
		speed: 2,
		file: "",
		accessCount: 0,
		deniedCount: 0,
		init: function () {
			accessCountimer = setInterval(function () { Typer.updLstChr(); }, 500);
			$.get(Typer.file, function (data) {
				Typer.text = data;
				Typer.text = Typer.text.slice(0, Typer.text.length - 1);
			});
		},

		content: function () {
			return $("#console").html();
		},

		write: function (str) {
			$("#console").append(str);
			return false;
		},

		addText: function (key) {

			if (key.keyCode == 18) {
				Typer.accessCount++;

				if (Typer.accessCount >= 3) {
					Typer.makeAccess();
				}
			}

			else if (key.keyCode == 20) {
				Typer.deniedCount++;

				if (Typer.deniedCount >= 3) {
					Typer.makeDenied();
				}
			}

			else if (key.keyCode == 27) {
				Typer.hidepop();
			}

			else if (Typer.text) {
				var cont = Typer.content();
				if (cont.substring(cont.length - 1, cont.length) == "|")
					$("#console").html($("#console").html().substring(0, cont.length - 1));
				if (key.keyCode != 8) {
					Typer.index += Typer.speed;
				}
				else {
					if (Typer.index > 0)
						Typer.index -= Typer.speed;
				}
				var text = Typer.text.substring(0, Typer.index)
				var rtn = new RegExp("\n", "g");

				$("#console").html(text.replace(rtn, "<br/>"));
				window.scrollBy(0, 50);
			}

			if (key.preventDefault && key.keyCode != 122) {
				key.preventDefault()
			};

			if (key.keyCode != 122) { // otherway prevent keys default behavior
				key.returnValue = false;
			}
		},

		updLstChr: function () {
			var cont = this.content();

			if (cont.substring(cont.length - 1, cont.length) == "|")
				$("#console").html($("#console").html().substring(0, cont.length - 1));

			// else
			// 	this.write("|"); // else write it
		}
	}
	

	Typer.speed = 1;
	Typer.file = "hardik.txt"; // add your own name here
	Typer.init();
	accessCountimer = Typer.accessCountimer;
	typer = Typer;

	timer = setInterval("t();", 30);
}

function replaceUrls(text) {
	var http = text.indexOf("http://");
	var space = text.indexOf(".me ", http);

	if (space != -1) {
		var url = text.slice(http, space - 1);
		return text.replace(url, "<a href=\"" + url + "\">" + url + "</a>");
	}

	else {
		return text
	}
}

function t() {
	typer.addText({ "keyCode": 123748 });

	if (typer.index > typer.text.length) {
		clearInterval(timer);
		clearInterval(accessCountimer);
	}
}