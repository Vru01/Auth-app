const socket = io("http://localhost:3001");

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const messageForm = document.getElementById("message-form");

socket.on("connect", () => {
    displayMessage(`Connected with ID: ${socket.id}`);
});

socket.on("disconnect", () => {
    displayMessage("Disconnected from server");
});

socket.on("receive-message", (message) => {
    displayMessage(message);
});


messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;

    if (message === "") return;

    socket.emit("send-message", message);
    messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value;
    if (room === "") return;
    
    socket.emit("join-room", room);
    displayMessage(`Joined room: ${room}`);
});

function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    document.getElementById("message-container").append(div);
    div.scrollIntoView({ behavior: "smooth" });
}
