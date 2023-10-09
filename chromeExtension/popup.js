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
        })
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
                console.log("Injecting data", data)
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
var download = document.getElementById("download_btn")
if (download === null) {
    document.getElementById("logger").innerHTML = "[ERROR] Main button not found"
}

onClick(popupActionBtn, Page.action)
onClick(settginsLink, Page.openWebapp)
onClick(download, Page.download)
