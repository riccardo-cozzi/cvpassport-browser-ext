// se passo console.log al metodo executeScript, da' errore
const print = (message) => {
    console.log(message)
}

// inject a function in the current tab with the given arguments
const inject = (f, args=[]) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true })    
    .then((result) => {
        chrome.scripting.executeScript({
            target : {tabId : result[0].id},
            func: f,
            args: args
        })
    })
}

/**
 * Execute the given function f when the element is clicked
 * @param {*} element 
 * @param {*} f 
 * @param {*} args 
 */
const onClick = (element, f, args=[]) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true })    
    .then((result) => {
        element.addEventListener("click", function(){
            chrome.scripting.executeScript({
                target : {tabId : result[0].id},
                func: f(args),
                // args: args // qui non ho capito perché ma.. così va
            })
        })
    })
}



class Page {

    constructor() {
        throw new Error("This class cannot be instantiated. Use static methods instead.")
    }
    
    static log(message) {
        inject(print, [message])
    }

    static openWebapp() {
        inject(() => {
            window.open("https://riccardo-cozzi.github.io/cvpassport-browser-ext", '_blank');
        })
    }

    static action() {
        inject(() => {
            var html = document.getElementsByTagName("html")[0].innerHTML
            fetch("http://34.252.236.219:8000/compile", {
                method: "POST",
                body: { html: html },
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(response => response.json())
            .then(data => {
                console.log("Injecting data", data)
                for (const [id, value] of Object.entries(data)) {
                    var element = document.getElementById(id)
                    if (!element) {
                        console.error("Element not found: " + id)
                    } else {
                        element.value = value
                    }
                }
            })
        },
        [])
    }
}

class Popup {
    
        constructor() {
            throw new Error("This class cannot be instantiated. Use static methods instead.")
        }
    
        static log(message) {
            document.getElementById("logger").innerHTML = message
        }
}
// ----------------------------------------------

// Get the components in the popup
var popupActionBtn = document.getElementById("action_btn")
if (popupActionBtn === null) {
    document.getElementById("logger").innerHTML = "[ERROR] Main button not found"
    console.error("form btn not found")
}
var settginsLink = document.getElementById("settings")
if (settginsLink === null) {
    document.getElementById("logger").innerHTML = "[ERROR] Main button not found"
}

onClick(popupActionBtn, Page.action)
onClick(settginsLink, Page.openWebapp)