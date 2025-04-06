// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixUsers from 'wix-users';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Add an event listener for the login button
    $w("#loginButton").onClick(() => {
        // Open the Wix Member login modal when the button is clicked
        wixUsers.promptLogin()
            .then((user) => {
                console.log("User logged in successfully");
                
                // After successful login, open the lightbox
                wixWindow.openLightbox("LightboxName").then((data) => {
                    console.log("Lightbox closed", data);
                });
            })
            .catch((err) => {
                console.error("Login failed or canceled", err);
            });
    });
});
