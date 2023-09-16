console.log("popup.js loaded")

var btn = document.getElementById("btn")
var nome = document.getElementById("nome")
var cognome = document.getElementById("cognome")

console.log("btn found")

try {
    chrome.tabs.query({ active: true, lastFocusedWindow: true })    
    .then((result) => {
        btn.addEventListener('click', function(){
            chrome.scripting.executeScript({
                target : {tabId : result[0].id},
                files : [ "injector.js" ],
            })
        })
    })
} catch (error) {
    console.log("Btn not found on the popup")
}
