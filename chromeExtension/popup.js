

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
    
    /**
     * Print the given message in the console
     * @param {*} message 
     */
    static log(message) {
        inject(print, [message])
    }

    /**
     * Open the webapp page in a new tab
     */
    static openWebapp() {
        inject(() => {
            window.open("https://riccardo-cozzi.github.io/cvpassport-browser-ext", '_blank');
        }, 
        [])
    }

    /**
     * Download the current page html
     */
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

    /**
     * Call the API to get the data and fill the form
     */
    static callAPI() {

        document.getElementById("popup_logger").innerHTML = document.getElementsByTagName("html")[0].innerHTML
        inject(() => {
            var html = document.getElementsByTagName("html")[0].innerHTML
            console.log("HTML body check:", html.length, " chars")
            // get the title tag value
            let pageName = ""
            try {
                pageName = document.getElementsByTagName("title")[0].innerHTML
            } catch (error) {
                pageName = location.href
            }
            console.log("Page name:", pageName)
            
            
            var serverUrl = "https://boyscaverna.mooo.com/compile"
            console.log("Requesting url...", serverUrl)

            // Send the request
            fetch(serverUrl, {
                method: "POST",
                
                body: JSON.stringify({ 
                    html: html, 
                    user_id: "1", // TODO: <----------- remove from here. Use the field in the metadata instead
                    metadata: {
                        page: pageName,
                        page_lenght: html.length,
                        user_id: "1"
                    }
                }),
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
                
                console.log("Initial number of tokens: " + response.initial_tokens)
                console.log("Final number of tokens: " + response.final_tokens)
                console.log("Data received:\n", response.result)
                let result = response.result

                // check if result is a json 
                if (typeof result === 'string' || result instanceof String) {
                    result = JSON.parse(result)
                }

                // Check if the result is empty
                if (Object.keys(result).length === 0 && result.constructor === Object) {
                    console.log("Empty result")
                    return
                }

                // Fill the form with the data received
                for (const [id, value] of Object.entries(result)) {

                    
                    console.log("Filling field: " + id + " with value: " + value)

                    var element = document.getElementById(id)
                    if (!element) {
                        console.error("While filling the form, this element was not found: " + id)
                    } else {
                        // get the element type
                        var type = element.type
                        element.value = value
                        element.style.border = "2px solid green"
                    }
                }
            })
            .catch(err => {
                console.error('Errore dal server:', err);
             });
        },
        [])
    }

    /**
     * Fill the field with the given value
     * @param {*} args args = [fieldId, fieldValue]
     */
    static fillField(args) {
        inject((id, val) => {
            var element = document.getElementById(id)
            if (!element) {
                alert("Element not found: " + id)
            } else {
                element.value = val
            }
        }, [args[0].value, args[1].value])
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
} else {
    alert("Extension working\nVersion: " + chrome.runtime.getManifest().version)
}
var popupActionBtn = document.getElementById("popup_actionButton")
if (popupActionBtn === null) 
logger.innerHTML += "\n[ERROR] Main button not found"
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

// Set the listeners to the components of the popup
onClick(popupActionBtn, Page.callAPI)
onClick(settginsLink, Page.openWebapp)
onClick(download, Page.download)
onClick(fillFieldBtn, Page.fillField, [tagNameField, tagValueField])
