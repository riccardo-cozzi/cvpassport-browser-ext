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

const onClick = (element, f, args=[]) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true })    
    .then((result) => {
        element.addEventListener("click", function(){
            chrome.scripting.executeScript({
                target : {tabId : result[0].id},
                func: f,
                args: args
            })
        })
    })
}


function fill_form() {
    
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
                nome_form: "lollo4", 
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

    var btn = document.getElementById("fill_form_btn")
    if (btn === null) {
        document.getElementById("error").innerHTML = "ops"
        console.error("btn not found")
    }
    
    Page.log("This message is on the web page")

    try {
        chrome.tabs.query({ active: true, lastFocusedWindow: true })    
        .then((result) => {
            btn.addEventListener('click', function(){
                chrome.scripting.executeScript({
                    target : {tabId : result[0].id},
                    func: Page.fillForm(),
                })
            })
        })
        // inject(fill_form, [])
        
    } catch (error) { 
        console.error(error)
    }
    
    
}

listen()


