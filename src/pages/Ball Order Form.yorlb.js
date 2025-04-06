
import wixLocation from 'wix-location';
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import { sendSimpleEmail } from 'backend/emailServiceBallOrderUser';
import { sendAdminEmail } from 'backend/emailServiceBallOrderAdmin';

$w.onReady(function () {
    const Item1Price = 135;
    const Item2Price = 135;
    const Item3Price = 85;
    const Item4Price = 85;
    const Item5Price = 65;
    const Item6Price = 65;
    const Item7Price = 53;
    const Item8Price = 53;


    // Function to perform the calculation
    function updateResult() {
        // Get the value from the input field and convert it to a number
        let item1QuantityInput = Math.max(0, Number($w("#item1QuantityInput").value));
        let item2QuantityInput = Math.max(0, Number($w("#item2QuantityInput").value));
        let item3QuantityInput = Math.max(0, Number($w("#item3QuantityInput").value));
        let item4QuantityInput = Math.max(0, Number($w("#item4QuantityInput").value));
        let item5QuantityInput = Math.max(0, Number($w("#item5QuantityInput").value));
        let item6QuantityInput = Math.max(0, Number($w("#item6QuantityInput").value));
        let item7QuantityInput = Math.max(0, Number($w("#item7QuantityInput").value));
        let item8QuantityInput = Math.max(0, Number($w("#item8QuantityInput").value));
        
        // Perform the mathematical operation
        let item1QuantityInputTot = item1QuantityInput * Item1Price;
        let item2QuantityInputTot = item2QuantityInput * Item2Price;
        let item3QuantityInputTot = item3QuantityInput * Item3Price;
        let item4QuantityInputTot = item4QuantityInput * Item4Price;
        let item5QuantityInputTot = item5QuantityInput * Item5Price;
        let item6QuantityInputTot = item6QuantityInput * Item6Price;
        let item7QuantityInputTot = item7QuantityInput * Item7Price;
        let item8QuantityInputTot = item8QuantityInput * Item8Price;

        let totalCost = item1QuantityInputTot + item2QuantityInputTot + item3QuantityInputTot + item4QuantityInputTot + item5QuantityInputTot + item6QuantityInputTot + item7QuantityInputTot+ item8QuantityInputTot;
        
        // Display the result in the text element
        $w("#item1QuantityInputTot").text = item1QuantityInputTot.toString();
        $w("#item2QuantityInputTot").text = item2QuantityInputTot.toString();
        $w("#item3QuantityInputTot").text = item3QuantityInputTot.toString();
        $w("#item4QuantityInputTot").text = item4QuantityInputTot.toString();
        $w("#item5QuantityInputTot").text = item5QuantityInputTot.toString();
        $w("#item6QuantityInputTot").text = item6QuantityInputTot.toString();
        $w("#item7QuantityInputTot").text = item7QuantityInputTot.toString();
        $w("#item8QuantityInputTot").text = item8QuantityInputTot.toString();
        $w("#totalCost").text = totalCost.toString();
    }
    
    // Attach an event handler to the input elements to call the updateResult function whenever the input changes
    $w("#item1QuantityInput").onChange(updateResult);
    $w("#item2QuantityInput").onChange(updateResult);
    $w("#item3QuantityInput").onChange(updateResult);
    $w("#item4QuantityInput").onChange(updateResult);
    $w("#item5QuantityInput").onChange(updateResult);
    $w("#item6QuantityInput").onChange(updateResult);
    $w("#item7QuantityInput").onChange(updateResult);
    $w("#item8QuantityInput").onChange(updateResult);

    // Call validation before setting up event handlers
    $w("#submit").onClick(() => {
        if (validateRequiredFields()) {
            submitButton_click();
        } else {
            $w("#errorMessage").text = "Please fill in all required fields.";
            $w("#errorMessage").show();
        }
    });
});

// Separate function to validate required fields
function validateRequiredFields() {
    let allValid = true;

    // Check each required field's validity
    if (!$w("#clubName").valid) {
        $w("#clubName").updateValidityIndication();
        allValid = false;
    }

    if (!$w("#eSignatureInput").valid) {
        $w("#eSignatureInput").updateValidityIndication();
        allValid = false;
    }

    return allValid;
}

async function submitButton_click(event) {
    try {
        // Get the current user's ID
        const user = wixUsers.currentUser;
        const userId = user.id;

        // Retrieve user details from the PrivateMembersData collection
        const userDetails = await wixData.get('Members/PrivateMembersData', userId);
        const contactId = userDetails._id; // Ensure this field contains the contact ID
        const admin = '3bf3aca5-0a5e-4270-ab67-450e8e120d53';
        const Name = userDetails.name; // Adjust field name if needed
        const Email = userDetails.loginEmail; // Adjust field name if needed
        const PhoneNumber = userDetails.mainPhone;

        // Prepare dynamic variables for the email
        const Club = $w('#clubName').value;
        const Item1QuantityInput = $w('#item1QuantityInput').value;
        const Item1QuantityInputTot = $w('#item1QuantityInputTot').text;
        const Item2QuantityInput = $w('#item2QuantityInput').value;
        const Item2QuantityInputTot = $w('#item2QuantityInputTot').text;
        const Item3QuantityInput = $w('#item3QuantityInput').value;
        const Item3QuantityInputTot = $w('#item3QuantityInputTot').text;
        const Item4QuantityInput = $w('#item4QuantityInput').value;
        const Item4QuantityInputTot = $w('#item4QuantityInputTot').text;
        const Item5QuantityInput = $w('#item5QuantityInput').value;
        const Item5QuantityInputTot = $w('#item5QuantityInputTot').text;
        const Item6QuantityInput = $w('#item6QuantityInput').value;
        const Item6QuantityInputTot = $w('#item6QuantityInputTot').text;
        const Item7QuantityInput = $w('#item7QuantityInput').value;
        const Item7QuantityInputTot = $w('#item7QuantityInputTot').text;
        const Item8QuantityInput = $w('#item8QuantityInput').value;
        const Item8QuantityInputTot = $w('#item8QuantityInputTot').text;
        const TotalCost = $w("#totalCost").text;

        const SignatureImage = $w('#eSignatureInput').value;
        const PersonOrdering = $w('#personOrdering').value;
        const ContactPhoneNumber = $w('#contactPhoneNumber').value;
        const emailVariables = {
            club: Club,
            name: Name, 
            item1QuantityInput: Item1QuantityInput,
            item1QuantityInputTot: Item1QuantityInputTot,
            item2QuantityInput: Item2QuantityInput,
            item2QuantityInputTot: Item2QuantityInputTot,
            item3QuantityInput: Item3QuantityInput,
            item3QuantityInputTot: Item3QuantityInputTot,
            item4QuantityInput: Item4QuantityInput,
            item4QuantityInputTot: Item4QuantityInputTot,
            item5QuantityInput: Item5QuantityInput,
            item5QuantityInputTot: Item5QuantityInputTot,
            item6QuantityInput: Item6QuantityInput,
            item6QuantityInputTot: Item6QuantityInputTot,
            item7QuantityInput: Item7QuantityInput,
            item7QuantityInputTot: Item7QuantityInputTot,
            item8QuantityInput: Item8QuantityInput,
            item8QuantityInputTot: Item8QuantityInputTot,
            totalCost: TotalCost,
        };

        // Send the email to the user
        await sendSimpleEmail(contactId, emailVariables)
            .then(() => {
                console.log("User email sent successfully.");
            })
            .catch((err) => {
                throw new Error("Error sending user email: " + err.message);
            });

        // Send the email to the admin
        await sendAdminEmail(admin, emailVariables)
            .then(() => {
                console.log("Admin email sent successfully.");
            })
            .catch((err) => {
                throw new Error("Error sending admin email: " + err.message);
            });

        // Save the data to the dataset
        $w("#dataset1").setFieldValue("club", Club);
        $w("#dataset1").setFieldValue("name", Name);
        $w("#dataset1").setFieldValue("phoneNumber", PhoneNumber);
        $w("#dataset1").setFieldValue("emailAddress", Email);
        $w("#dataset1").setFieldValue("item1QuantityInput", Item1QuantityInput);
        $w("#dataset1").setFieldValue("item1QuantityInputTot", Item1QuantityInputTot);
        $w("#dataset1").setFieldValue("item2QuantityInput", Item2QuantityInput);
        $w("#dataset1").setFieldValue("item2QuantityInputTot", Item2QuantityInputTot);
        $w("#dataset1").setFieldValue("item3QuantityInput", Item3QuantityInput);
        $w("#dataset1").setFieldValue("item3QuantityInputTot", Item3QuantityInputTot);
        $w("#dataset1").setFieldValue("item4QuantityInput", Item4QuantityInput);
        $w("#dataset1").setFieldValue("item4QuantityInputTot", Item4QuantityInputTot);
        $w("#dataset1").setFieldValue("item5QuantityInput", Item5QuantityInput);
        $w("#dataset1").setFieldValue("item5QuantityInputTot", Item5QuantityInputTot);
        $w("#dataset1").setFieldValue("item6QuantityInput", Item6QuantityInput);
        $w("#dataset1").setFieldValue("item6QuantityInputTot", Item6QuantityInputTot);
        $w("#dataset1").setFieldValue("item7QuantityInput", Item7QuantityInput);
        $w("#dataset1").setFieldValue("item7QuantityInputTot", Item7QuantityInputTot);
        $w("#dataset1").setFieldValue("item8QuantityInput", Item8QuantityInput);
        $w("#dataset1").setFieldValue("item8QuantityInputTot", Item8QuantityInputTot);
        $w("#dataset1").setFieldValue("totalCost", TotalCost);
        $w("#dataset1").setFieldValue("eSignature", SignatureImage);
        $w("#dataset1").setFieldValue("personOrdering", PersonOrdering);
        $w("#dataset1").setFieldValue("contactPhoneNumber", ContactPhoneNumber);


        // Set the isChecked field to false for new entries
        $w("#dataset1").setFieldValue("isChecked", false);

        await $w("#dataset1").save()
            .then(() => {
                console.log("Data submitted successfully to dataset.");
            })
            .catch((err) => {
                throw new Error("Error submitting data to dataset: " + err.message);
            });
        $w("#successMessage").text = 'Your email has been sent and data saved successfully!';
        $w("#successMessage").show();
        wixLocation.to("/club-space");
    } catch (err) {
        console.error("Error in operation:", err);
        $w("#errorMessage").text = err.message;
        $w("#errorMessage").show();
    }
}