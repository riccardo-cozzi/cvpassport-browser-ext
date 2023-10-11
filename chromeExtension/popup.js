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
        }, 
        [])
    }

    static download() {
        inject(() => {
            var element = document.createElement('a');
            var html = document.getElementsByTagName("html")[0].innerHTML
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html));
            element.setAttribute('download', "page.html");
          
            element.style.display = 'none';
            document.body.appendChild(element);
          
            element.click();
          
            document.body.removeChild(element);
        }, [])
    }

    static action() {
        document.getElementById("logger").innerHTML = document.getElementsByTagName("html")[0].innerHTML
        
        
        inject(() => {
            var html = document.getElementsByTagName("html")[0].innerHTML
            var serverUrl = "https://boyscaverna.mooo.com/compile"
            console.log("Requesting url...", serverUrl)

            // Send the request
            fetch(serverUrl, {
                method: "POST",
                body: JSON.stringify({ "html": html }),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => {
                console.log("Response received:\n", response)
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) })
                }
                console.log("Response ok")
                return response.json()
            })
            .then(response => {
                let data = response.result
                // Fill the form
                for (const [id, field] of Object.entries(data)) {
                    var element = document.getElementById(id)
                    if (!element) {
                        console.error("Element not found: " + id)
                    } else {
                        element.value = field
                    }
                }
            })
            .catch(err => {
                console.error('Errore dal server:', err);
             });
            
        },
        [])
    }

    static fillField(args) {
        
        var fieldId = args[0].value
        var fieldValue = args[1].value
        
        inject((id, val) => {
            var element = document.getElementById(id)
            if (!element) {
                alert("Element not found: " + id)
            } else {
                element.value = val
            }
        }, [fieldId, fieldValue])
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
var logger = document.getElementById("popup_logger")
if (logger === null) {
    alert("Logger not found. Extension can't work")
}
var popupActionBtn = document.getElementById("popup_actionButton")
if (popupActionBtn === null) logger.innerHTML += "\n[ERROR] Main button not found"
var settginsLink = document.getElementById("popup_settingsLink")
if (settginsLink === null) logger.innerHTML += "\n[ERROR] Settings link not found"
var download = document.getElementById("download_btn")
if (download === null) logger.innerHTML += "\n[ERROR] Download button not found"

var tagNameField = document.getElementById("popup_tagName")
if (tagNameField === null) logger.innerHTML += "\n[ERROR] Tag name field not found"
var tagValueField = document.getElementById("popup_tagValue")
if (tagValueField === null) logger.innerHTML += "\n[ERROR] Tag value field not found"

var fillFieldBtn = document.getElementById("popup_fillFieldButton")
if (fillFieldBtn === null) logger.innerHTML += "\n[ERROR] Fill field button not found"



onClick(popupActionBtn, Page.action)
onClick(settginsLink, Page.openWebapp)
onClick(download, Page.download)
onClick(fillFieldBtn, Page.fillField, [tagNameField, tagValueField])
