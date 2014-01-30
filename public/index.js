var WIAB = (function (document) {
    var WIAB = {};

    return WIAB;
})(document);

// data related submodule
var WIAB.data = (function (document, WIAB) {
    return {};
})(document, WIAB);

// view related submodule
var WIAB.view = (function (document, WIAB) {
    return {};
})(document, WIAB);

// Boot the application
WIAB.boot = function boot () {
};

// In a jQuery world, you would use `$(function(){...})`
// But in modern browsers you only need this:
document.addEventListener('DOMContentLoaded',function(){
    WIAB.boot();
});
