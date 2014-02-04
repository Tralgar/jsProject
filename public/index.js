var characters = [
    {"name": "Zombie"},
    {"name": "Dwarf"},
    {"name": "Troll"},
    {"name": "Orc"},
    {"name": "Elf"},
    {"name": "Undead"},
];

var WIAB = (function (document) {
    var WIAB = {};
    
    return WIAB;
})(document);

WIAB.data = (function (document, WIAB) {
    function getCharacters() {
        return characters;
    }

    function getCharactersList(url) {
        var promise = new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                }
                else {
                    reject(getCharacters());
                }
            };
            xhr.onerror = function() { // Si error, on prend le tableau local
                reject(getCharacters());
            };
            xhr.send();
        });
    
        return promise;
    };
    
	return {getCharactersList : getCharactersList};
})(document, WIAB);    

WIAB.view = (function (document, WIAB) {
    var tabCharactersSelected = [];

	var renderCharacterList = (function (characters) {
		var ul = document.getElementById('character-list');
        var nbLi = 0;
		characters.forEach(function (element, index, array) {
			var li = document.createElement('li');
			var text = document.createTextNode(element.name);
			var input = document.createElement('input');
			var label = document.createElement('label');
			input.setAttribute('type','checkbox');
			input.setAttribute('name','character-id');
			input.setAttribute('value','10');
			input.setAttribute('id','character-id-' + nbLi);
			label.setAttribute('for','character-id');
			label.appendChild(text);
			ul.appendChild(li);
			li.appendChild(input);
			li.appendChild(label);
			attachListEvents(input);
            nbLi = nbLi + 1;
		});
	});

    function functionOnEvent() {
        var element = this;
        var bar = document.getElementsByClassName('bar-mood')[0]; // On récupère le premier car il n'y en a qu'un
        var name = element.parentElement.lastElementChild.textContent;
        var listCharacters = '';
        if(element.checked === true) {
            if(tabCharactersSelected.indexOf(name) === -1) {
                tabCharactersSelected.push(name);
            }
        }
        if(element.checked === false) {
            if(tabCharactersSelected.indexOf(name) !== -1) {
                tabCharactersSelected.splice(tabCharactersSelected.indexOf(name), 1);
            }
        }
        tabCharactersSelected.forEach(function (value) {
            listCharacters = [listCharacters, [value, ' '].join('')].join('');
        });
        bar.innerHTML = listCharacters;
        if(tabCharactersSelected.length === 0) {
            bar.innerHTML = 'Nothing selected... STOP BE A NOOB !';
        }
        if(tabCharactersSelected.length === 1) {
            bar.innerHTML = [listCharacters, 'walks into a bar'].join('');
        }
        if(tabCharactersSelected.length > 1) {
            bar.innerHTML = [listCharacters, 'walk into a bar'].join('');
        }
    };

	var attachListEvents = (function () {
        var listElement = document.getElementsByTagName('input');
        Array.prototype.forEach.call(listElement, function (element) {
            element.addEventListener('click', functionOnEvent, false);
        });
    });

    var detachListEvents = (function () {
        var listElement = document.getElementsByTagName('input');
        Array.prototype.forEach.call(listElement, function (element) {
            console.log("detache");
            element.removeEventListener('click', functionOnEvent, false);
        });
    });

    return {renderCharacterList : renderCharacterList, detachListEvents : detachListEvents};
})(document, WIAB);

WIAB.boot = function boot () {
	var data = WIAB.data.getCharactersList("http://edu.muetton.me/characters").then(JSON.parse);
    console.log(data);
	// WIAB.view.renderCharacterList(data);
};

document.addEventListener('DOMContentLoaded', function() {
    WIAB.boot();
});

document.addEventListener('beforeunload ', function() {
    WIAB.view.detachListEvents();
});

