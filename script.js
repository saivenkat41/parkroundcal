let count = 0;
let tracking = false;
let lastY = 0;
let stepThreshold = 3; // Adjust sensitivity for step detection

document.getElementById("startBtn").addEventListener("click", () => {
    tracking = true;
    document.getElementById("status").textContent = "Status: Tracking...";
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;

    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", detectSteps);
    } else {
        alert("Your device does not support motion tracking!");
    }
});

document.getElementById("stopBtn").addEventListener("click", () => {
    tracking = false;
    document.getElementById("status").textContent = "Status: Stopped";
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
    window.removeEventListener("devicemotion", detectSteps);
});

document.getElementById("resetBtn").addEventListener("click", () => {
    count = 0;
    document.getElementById("roundCount").textContent = count;
    document.getElementById("status").textContent = "Status: Not Tracking";
});

function detectSteps(event) {
    let y = event.accelerationIncludingGravity.y;
    
    if (Math.abs(y - lastY) > stepThreshold) {
        count++;
        document.getElementById("roundCount").textContent = Math.floor(count / 50); // Approximate steps per round
    }
    
    lastY = y;
}
