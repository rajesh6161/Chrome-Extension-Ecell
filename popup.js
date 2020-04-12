// var arr=document.getElementsByClassName('shot')

// arr.forEach(element => {
//   element.addEventListener("click",()=>{

//   });
// });

///////////////////////////////////////////////////////////////////////
var elements = document.getElementsByClassName("shot");

var myFunction = function() {
    chrome.runtime.sendMessage({ name: 'clicked' }, function(response) {
        console.log(response);
    });
};

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', myFunction, false);
}

//////////////////////////////////////////////////////////////////////////

// var ele=document.getElementsByClassName("close");

// var close_func = function(){
//   $("close").parent().css( "display", "none" );
// }

// for (var i = 0; i < ele.length; i++) {
//   ele[i].addEventListener('click', close_func, false);
// }

//////////////////////////////////////////////////////////////////////////////

window.addEventListener('click', function(e) {
    if (e.target.href !== undefined) {
        chrome.tabs.create({ url: e.target.href })
    }
});