
function listen() {
    try {
        var btn = document.getElementById("btn")
        console.log("btn found")
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
}

listen()


