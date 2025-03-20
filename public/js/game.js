const buttons = document.getElementsByClassName('choice-btn');
const output = document.getElementById('output');
const socket = io("http://localhost:5000");
let decisions = [];
let playerDecision = "";
socket.on('start', (data) => {
    output.innerHTML += `=>  الراوي : ${data.story}`;
    decisions = [...data.decisions]
    updateDesisions(data.decisions);
    enableDisableButtons();
});
socket.on('update', (data) => {
    output.innerHTML += `\n\n=>  الراوي : ${data.situation}`;
    output.scrollTop = output.scrollHeight;
    if(data.end){
        output.innerHTML += "\n\n=> الراوي : النهاية\n";
    }else{
        decisions = [...data.decisions]
        updateDesisions(data.decisions);
        enableDisableButtons();
    }
});

function choosePath(choice) {
    let playerDecision = choice === 'dec1' ? decisions[0] : choice === 'dec2' ? decisions[1] : decisions[2];
    output.innerHTML += "\n\n=> المغامر : " + playerDecision + "\n";
    output.scrollTop = output.scrollHeight;
    enableDisableButtons();
    socket.emit('decision',playerDecision);
}
function enableDisableButtons() {
    for (const button of buttons) {
        button.disabled = !button.disabled;
    }
}
function updateDesisions(decisions) {
    for (let i = 0; i < 3; i++) {
        buttons[i].innerHTML = decisions[i];
    }
}