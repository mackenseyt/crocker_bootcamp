document.getElementById("lightForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const durationInput = document.getElementById("duration");
    const durationInMinutes = durationInput.value;
    const durationInSeconds = durationInMinutes * 60;

    // Prepare the payload
    const payload = {
        duration: durationInSeconds,
    };

    console.log('Payload being sent:', payload);  // Log payload to check

    // Send the POST request to the backend
    try {
        const response = await fetch("http://127.0.0.1:5001/control-light", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const responseData = await response.json();
        console.log('Response from server:', responseData);  // Log response from backend

        // Display the message from the backend in the statusMessage div
        const statusMessage = document.getElementById("statusMessage");
        if (response.ok) {
            statusMessage.textContent = responseData.message; // Show success message
            statusMessage.style.color = "green";
        } else {
            statusMessage.textContent = responseData.error; // Show error message
            statusMessage.style.color = "red";
        }
    } catch (error) {
        // Display any network or server error
        const statusMessage = document.getElementById("statusMessage");
        statusMessage.textContent = "An error occurred while sending the request.";
        statusMessage.style.color = "red";
    }

    // Clear the input field after submission
    durationInput.value = "";
});
