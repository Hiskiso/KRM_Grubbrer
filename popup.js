document.getElementById("tgw").onclick = toggleView

function popupLog(text){
    time = `[${new Date().toLocaleTimeString()}]: `
    div = document.createElement("div")
    div.innerText = time + text
    document.body.appendChild(div)
}

function toggleView(){
    popupLog("Set diff view")
}