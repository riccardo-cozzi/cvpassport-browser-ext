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
            console.log("Requesting...")

            // Send the request
            fetch("https://34.252.236.219/compile", {
                method: "POST",
                body: JSON.stringify({ "html": html }),
                headers: { "Content-Type": "application/json" }
            })
            .then((response) => response.json())
            .then(response => {
                let data = response.result
                // Fill te form
                console.log("Injecting data", data)
                for (const [field, id] of Object.entries(data)) {
                    var element = document.getElementById(id)
                    if (!element) {
                        console.error("Element not found: " + id)
                    } else {
                        element.value = field
                    }
                }
            })
            // fetch("https://official-joke-api.appspot.com/random_joke")
            // .then(response => console.log(response))
            // .then(response => {
            //     data = {
            //         "form_title": "Dr",
            //         "form_name": "Riccardo",
            //         "form_surname": "Cozzi",
            //         "form_email": "ricardo.cozzi@gmail.com",
            //         "form_gender": "male",
            //         "form_phone": "+39 333 1234567",
            //         "form_address": "Via Roma 1, 20100 Milano",
            //     }
            //     // Fill te form
            //     console.log("Injecting data", data)
            //     for (const [id, value] of Object.entries(data)) {
            //         var element = document.getElementById(id)
            //         if (!element) {
            //             console.error("Element not found: " + id)
            //         } else {
            //             element.value = value
            //         }
            //     }
            // })
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