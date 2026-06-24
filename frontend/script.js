async function sendMessage() {


const input =
document.getElementById("userInput");

const message =
input.value.trim();

if (!message) return;

const chatbox =
document.getElementById("chatbox");

// User Message

chatbox.innerHTML += `
    <div class="user-message">
        ${message}
    </div>
`;

input.value = "";

// Emergency Detection

const emergencyWords = [
    "chest pain",
    "heart attack",
    "stroke",
    "difficulty breathing",
    "can't breathe",
    "unconscious",
    "suicide",
    "severe bleeding"
];

if (
    emergencyWords.some(word =>
        message.toLowerCase().includes(word)
    )
) {

    chatbox.innerHTML += `
        <div class="emergency">
            🚨 Medical Emergency Detected!
            Please seek immediate medical attention.
        </div>
    `;
}

// Typing Animation

const typingDiv =
document.createElement("div");

typingDiv.className =
"bot-message";

typingDiv.id =
"typing";

typingDiv.innerHTML = `
    <b>🐶 Chikoo</b><br><br>
    Typing...
`;

chatbox.appendChild(
    typingDiv
);

chatbox.scrollTop =
chatbox.scrollHeight;

try {

    const response =
    await fetch(
        "http://localhost:3000/chat",
        {
            method: "POST",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        }
    );

    const data =
    await response.json();

    document
    .getElementById("typing")
    ?.remove();

    chatbox.innerHTML += `
        <div class="bot-message">
            <b>🐶 Chikoo</b><br><br>
            ${data.reply}
        </div>
    `;

}
catch(error){

    console.error(error);

    document
    .getElementById("typing")
    ?.remove();

    chatbox.innerHTML += `
        <div class="bot-message">
            <b>🐶 Chikoo</b><br><br>
            Sorry! I'm having trouble connecting right now.
        </div>
    `;
}

// Save Chat History

localStorage.setItem(
    "chatHistory",
    chatbox.innerHTML
);

chatbox.scrollTop =
chatbox.scrollHeight;


}

// ENTER KEY SUPPORT

document
.getElementById("userInput")
.addEventListener(
"keypress",
function(event){


    if(event.key === "Enter"){

        sendMessage();

    }

}


);

// NEW CHAT

function newChat(){

    const chatbox =
    document.getElementById("chatbox");

    chatbox.innerHTML = `
        <div class="bot-message">
            <b>🐶 Chikoo</b><br><br>
            Hi! I'm Chikoo.
            Tell me your symptoms and I'll help with
            general health information.
        </div>
    `;

    localStorage.setItem(
        "chatHistory",
        chatbox.innerHTML
    );
}
// LOAD CHAT HISTORY

window.onload = () => {

    const history =
    localStorage.getItem(
        "chatHistory"
    );

    const chatbox =
    document.getElementById(
        "chatbox"
    );

    if(history){

        chatbox.innerHTML =
        history;

    } else {

        chatbox.innerHTML = `
            <div class="bot-message">
                <b>🐶 Chikoo</b><br><br>
                Hi! I'm Chikoo.
                Tell me your symptoms and I'll help with
                general health information.
            </div>
        `;
    }
};

// VOICE INPUT

function startVoice(){


const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if(!SpeechRecognition){

    alert(
        "Voice recognition works best in Google Chrome."
    );

    return;
}

const recognition =
new SpeechRecognition();

recognition.lang =
"en-US";

recognition.interimResults =
false;

recognition.maxAlternatives =
1;

recognition.start();

recognition.onstart = () => {

    console.log(
        "🎤 Listening..."
    );

};

recognition.onresult =
function(event){

    document
    .getElementById("userInput")
    .value =
    event.results[0][0]
    .transcript;
};

recognition.onerror =
function(event){

    console.log(
        event.error
    );

    alert(
        "Please allow microphone access."
    );
};


}

// DARK MODE

function toggleTheme(){


document.body
.classList.toggle(
    "dark-mode"
);


}
