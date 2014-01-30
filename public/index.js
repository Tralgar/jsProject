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
	return {getCharactersList : getCharacters}; // objet pour exposer notre API public
})(document, WIAB);

WIAB.view = (function (document, WIAB) {
	var renderCharacterList = (function (characters) {
		var doc = document.getElementById("liste");
		var ul = document.createElement('ul');
		doc.appendChild(ul);
		characters.forEach(function (element, index, array) {
			var li = document.createElement('li');
			var text = document.createTextNode(element.name);
			ul.appendChild(li);
			li.appendChild(text);
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
