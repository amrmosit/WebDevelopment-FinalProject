
import wixUsers from 'wix-users';
import wixData from 'wix-data';

$w.onReady(function () {
    // Add an event handler for the click event of button2
    $w("#submitButtonBallOrder").onClick(submitButton_click);
    const user = wixUsers.currentUser;
    if (user.loggedIn) {
        const userId = user.id; // Get the current user's ID

        // Filter the dataset to show only items where the _owner matches the current user's ID
        $w("#dataset3").setFilter(wixData.filter()
            .eq("_owner", userId))
        .then(() => {
            console.log("Dataset filtered successfully by owner.");
        })
        .catch((err) => {
            console.error("Error filtering dataset: ", err);
        });
    } else {
        console.log("User not logged in.");
    }
});

function submitButton_click(event) {
    // Get the current item ID from the dataset
    const currentItem = $w("#dataset3").getCurrentItem();
    const itemId = currentItem._id; // Extract the item ID from the current item
    const isUploaded = true; // Set the receiptUploadedCheck to true

    // Save the changes to the dataset
    $w("#dataset3").save()
        .then(() => {
            console.log("Data submitted successfully");
            // Call the function to update the receiptUploadedCheck status
            updateReceiptUploadedStatus(itemId, isUploaded);
        })
        .catch((err) => {
            console.error("Error submitting data", err);
            // Optional: Show an error message
        });
}

function updateReceiptUploadedStatus(itemId, isUploaded) {
    const BallOrderSubmittedCollection = "BallOrderSubmitted";

    // Log the item ID to the console
    console.log("Updating receiptUploadedCheck status for item ID:", itemId);

    // Fetch the existing item
    wixData.get(BallOrderSubmittedCollection, itemId)
        .then((item) => {
            // Update the receiptUploadedCheck field
            item.receiptUploadedCheck = isUploaded;

            // Save the updated item back to the collection
            return wixData.save(BallOrderSubmittedCollection, item);
        })
        .then((result) => {
            console.log("Receipt uploaded status saved:", result);
        })
        .catch((err) => {
            console.error("Error updating receipt uploaded status:", err);
        });
}