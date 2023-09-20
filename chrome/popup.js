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

    static fillForm() {
        inject(() => {
            let data = {
                nome_form: "loll5", 
                email_form: "lollo@gmail.com"
            }
        
            console.log("Injecting data", data)
        
            for (const [id, value] of Object.entries(data)) {
                var element = document.getElementById(id)
                if (element != null) {
                    element.value = value
                } else {
                    console.error("Element not found: " + id)
                }
            }
        },
        [])
    }

}

function listen() {

    var formButton = document.getElementById("fill_form_btn")
    var htmlBtn = document.getElementById("get_html_btn")
    if (formButton === null || htmlBtn === null) {
        document.getElementById("error").innerHTML = "ops"
        console.error("form btn not found")
    }
    
    Page.log("This message is on the web page")
    onClick(formButton, Page.fillForm)
    console.log("html btn found")
    onClick(htmlBtn, Page.log, ["html"])

}

listen()


