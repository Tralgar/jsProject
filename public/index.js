var characters = [
    {"name": "Zombie"},
    {"name": "Dwarf"},
    {"name": "Troll"},
    {"name": "Orc"},
    {"name": "Elf"}
];

var WIAB = (function (document) {
    var WIAB = {};

    return WIAB;
})(document);

WIAB.data = (function (document, WIAB) {
	var getCharacters = (function () {
		return characters;
	});
	return {getCharactersList : getCharacters};
})(document, WIAB);

WIAB.view = (function (document, WIAB) {
	var renderCharacterList = (function (characters) {
		var ul = document.getElementById('character-list');
		characters.forEach(function (element, index, array) {
			var li = document.createElement('li');
			var text = document.createTextNode(element.name);
			var input = document.createElement('input');
			var label = document.createElement('label');
			input.setAttribute('type','checkbox');
			input.setAttribute('name','character-id');
			input.setAttribute('value','10');
			input.setAttribute('id','character-id');
			label.setAttribute('for','character-id');
			label.appendChild(text);
			ul.appendChild(li);
			li.appendChild(input);
			li.appendChild(label);
			attachListEvents(input);
		});
	});
	
	var attachListEvents = (function attachListEvents(element){
		element.addEventListener('click',function(){
			var bar = document.getElementsByClassName('bar-mood')[0];
			console.log(bar);
			bar.innerHTML = "Coucou";
			});
	});
    return {renderCharacterList : renderCharacterList};
})(document, WIAB);

// Boot the application
WIAB.boot = function boot () {
	var data = WIAB.data.getCharactersList();
	var view = WIAB.view.renderCharacterList(data);
};

// In a jQuery world, you would use `$(function(){...})`
// But in modern browsers you only need this:
document.addEventListener('DOMContentLoaded',function(){
    WIAB.boot();
});
