

import wixLocation from 'wix-location';
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import { sendSimpleEmail } from 'backend/emailServiceMatchReportUser';
import { sendAdminEmail } from 'backend/emailServiceMatchReportAdmin';

$w.onReady(function () {
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
    const requiredFields = [
        "#roundNo",
        "#division",
        "#homeClub",
        "#umpireOneName",
        "#umpireTwoName",
        "#captainSelection",
        "#signatureInput1"
    ];

    requiredFields.forEach(fieldId => {
        if (!$w(fieldId).valid) {
            $w(fieldId).updateValidityIndication();
            allValid = false;
        }
    });

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
        const admin = '3bf3aca5-0a5e-4270-ab67-450e8e120d53';// amrm.che@gmail.com ID
        //const admin = 'a07cc128-4f91-4fe9-a9c9-d955018e90c8'; // Role ID
        

        const Name = userDetails.name; // Adjust field name if needed
        const Email = userDetails.loginEmail; // Adjust field name if needed
        const PhoneNumber = userDetails.mainPhone;

        // Log the contact ID and userDetails for debugging
        console.log('Retrieved Contact ID:', contactId);
        console.log('User Details:', userDetails);

        // Check if contactId is undefined
        if (!contactId) {
            throw new Error('Contact ID is undefined. Please verify the data source.');
        }

        // Prepare dynamic variables for the email
        const RoundNo = $w('#roundNo').value;
        const DatePicker1 = $w('#datePicker1').value ? $w('#datePicker1').value.toLocaleDateString() : '';
        const DatePicker2 = $w('#datePicker2').value ? $w('#datePicker2').value.toLocaleDateString() : '';
        const Division = $w('#division').value;
        const HomeClub = $w('#homeClub').value;
        const Visitors = $w('#visitors').value;
        const UmpireOneName = $w('#umpireOneName').value;
        const CaptainSelection = $w('#captainSelection').value;
        const RadioGroup1Umpire1 = $w('#radioGroup1Umpire1').value;
        const RadioGroup2Umpire1 = $w('#radioGroup2Umpire1').value;
        const RadioGroup3Umpire1 = $w('#radioGroup3Umpire1').value;
        const RadioGroup4Umpire1 = $w('#radioGroup4Umpire1').value;
        const RadioGroup5Umpire1 = $w('#radioGroup5Umpire1').value;
        const RadioGroup6Umpire1 = $w('#radioGroup6Umpire1').value;
        const RadioGroup7Umpire1 = $w('#radioGroup7Umpire1').value;
        const UmpireTwoName = $w('#umpireTwoName').value;
        const RadioGroup1Umpire2 = $w('#radioGroup1Umpire2').value;
        const RadioGroup2Umpire2 = $w('#radioGroup2Umpire2').value;
        const RadioGroup3Umpire2 = $w('#radioGroup3Umpire2').value;
        const RadioGroup4Umpire2 = $w('#radioGroup4Umpire2').value;
        const RadioGroup5Umpire2 = $w('#radioGroup5Umpire2').value;
        const RadioGroup6Umpire2 = $w('#radioGroup6Umpire2').value;
        const RadioGroup7Umpire2 = $w('#radioGroup7Umpire2').value;
        const UmpireOneComment = $w('#umpireOneComment').value;
        const UmpireTwoComment = $w('#umpireTwoComment').value;
        const SignatureImage = $w('#signatureInput1').value;

        const emailVariables = {
            name: Name,
            roundNo: RoundNo,
            datePicker1: DatePicker1,
            datePicker2: DatePicker2,
            division: Division,
            homeClub: HomeClub,
            visitors: Visitors,
            umpireOneName: UmpireOneName,
            captainSelection: CaptainSelection,
            radioGroup1Umpire1: RadioGroup1Umpire1,
            radioGroup2Umpire1: RadioGroup2Umpire1,
            radioGroup3Umpire1: RadioGroup3Umpire1,
            radioGroup4Umpire1: RadioGroup4Umpire1,
            radioGroup5Umpire1: RadioGroup5Umpire1,
            radioGroup6Umpire1: RadioGroup6Umpire1,
            radioGroup7Umpire1: RadioGroup7Umpire1,
            umpireTwoName: UmpireTwoName,
            radioGroup1Umpire2: RadioGroup1Umpire2,
            radioGroup2Umpire2: RadioGroup2Umpire2,
            radioGroup3Umpire2: RadioGroup3Umpire2,
            radioGroup4Umpire2: RadioGroup4Umpire2,
            radioGroup5Umpire2: RadioGroup5Umpire2,
            radioGroup6Umpire2: RadioGroup6Umpire2,
            radioGroup7Umpire2: RadioGroup7Umpire2,
            umpireOneComment: UmpireOneComment,
            umpireTwoComment: UmpireTwoComment,
        };

        // Log the email variables for debugging
        console.log('Email Variables:', emailVariables);

        // First, send the email
        await sendSimpleEmail(contactId, emailVariables)
            .then(() => {
                console.log("Email sent successfully with variables");
            })
            .catch((err) => {
                throw new Error("Error sending email: " + err.message);
            });

        await sendAdminEmail(admin, emailVariables)
            .then(() => {
                console.log("Email sent successfully with variables");
            })
            .catch((err) => {
                throw new Error("Error sending email: " + err.message);
            });

        // Then, save the data to the dataset
        $w("#dataset1").setFieldValue("name", Name);
        $w("#dataset1").setFieldValue("phoneNumber", PhoneNumber);
        $w("#dataset1").setFieldValue("emailAddress", Email);
        $w("#dataset1").setFieldValue("roundNumber", RoundNo);
        $w("#dataset1").setFieldValue("datePicker1", DatePicker1);
        $w("#dataset1").setFieldValue("datePicker2", DatePicker2);
        $w("#dataset1").setFieldValue("division", Division);
        $w("#dataset1").setFieldValue("homeClub", HomeClub);
        $w("#dataset1").setFieldValue("visitors", Visitors);
        $w("#dataset1").setFieldValue("umpireOneName", UmpireOneName);
        $w("#dataset1").setFieldValue("captainSelection", CaptainSelection);
        $w("#dataset1").setFieldValue("radioGroup1Umpire1", RadioGroup1Umpire1);
        $w("#dataset1").setFieldValue("radioGroup2Umpire1", RadioGroup2Umpire1);
        $w("#dataset1").setFieldValue("radioGroup3Umpire1", RadioGroup3Umpire1);
        $w("#dataset1").setFieldValue("radioGroup4Umpire1", RadioGroup4Umpire1);
        $w("#dataset1").setFieldValue("radioGroup5Umpire1", RadioGroup5Umpire1);
        $w("#dataset1").setFieldValue("radioGroup6Umpire1", RadioGroup6Umpire1);
        $w("#dataset1").setFieldValue("radioGroup7Umpire1", RadioGroup7Umpire1);
        $w("#dataset1").setFieldValue("umpireTwoName", UmpireTwoName);
        $w("#dataset1").setFieldValue("radioGroup1Umpire2", RadioGroup1Umpire2);
        $w("#dataset1").setFieldValue("radioGroup2Umpire2", RadioGroup2Umpire2);
        $w("#dataset1").setFieldValue("radioGroup3Umpire2", RadioGroup3Umpire2);
        $w("#dataset1").setFieldValue("radioGroup4Umpire2", RadioGroup4Umpire2);
        $w("#dataset1").setFieldValue("radioGroup5Umpire2", RadioGroup5Umpire2);
        $w("#dataset1").setFieldValue("radioGroup6Umpire2", RadioGroup6Umpire2);
        $w("#dataset1").setFieldValue("radioGroup7Umpire2", RadioGroup7Umpire2);
        $w("#dataset1").setFieldValue("umpireOneComment", UmpireOneComment);
        $w("#dataset1").setFieldValue("umpireTwoComment", UmpireTwoComment);
        $w("#dataset1").setFieldValue("eSignature", SignatureImage);
        
        // Set the isChecked field to false for new entries
        $w("#dataset1").setFieldValue("isChecked", false);

        await $w("#dataset1").save()
            .then(() => {
                console.log("Data submitted successfully to dataset");
            })
            .catch((err) => {
                throw new Error("Error submitting data to dataset: " + err.message);
            });

        $w("#successMessage").text = 'Your email has been sent and data saved successfully!';
        $w("#successMessage").show();
        wixLocation.to("/captain-space");

    } catch (err) {
        console.error("Error in operation:", err);
        $w("#errorMessage").text = err.message;
        $w("#errorMessage").show();
    }
}
