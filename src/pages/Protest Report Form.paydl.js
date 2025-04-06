import wixLocation from 'wix-location';
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import { sendSimpleEmail } from 'backend/emailServiceProtestUser';
import { sendAdminEmail } from 'backend/emailServiceProtestAdmin';

$w.onReady(function () {
    // Automatically convert the captain name to uppercase

    // Call validation before setting up event handlers for submission
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
        "#awayClub",
        "#date",
        "#clubProtesting",
        "#captainReportRadio",
        "#protestReason",
        "#signature",
        "#nameOfProtester",
        "#contactNumber"
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
        const admin = '3bf3aca5-0a5e-4270-ab67-450e8e120d53';
        const Name = userDetails.name; // Adjust field name if needed
        const Email = userDetails.loginEmail; // Adjust field name if needed

        // Log the contact ID and userDetails for debugging
        console.log('Retrieved Contact ID:', contactId);
        console.log('User Details:', userDetails);

        // Check if contactId is undefined
        if (!contactId) {
            throw new Error('Contact ID is undefined. Please verify the data source.');
        }

       // Prepare dynamic variables for the email
        const RoundNo = $w('#roundNo').value;
        const Date = $w('#date').value ? $w('#date').value.toLocaleDateString() : '';
        const Division = $w('#division').value;
        const HomeClub = $w('#homeClub').value;
        const AwayClub = $w('#awayClub').value;
        const ClubProtesting = $w('#clubProtesting').value;
        const ContactNumber = $w('#contactNumber').value;
        const ProtesterName = $w('#nameOfProtester').value;
        const CaptainReportRadio = $w('#captainReportRadio').value;
        const ProtestReason = $w('#protestReason').value;
        const SignatureImage = $w('#signature').value;

        const emailVariables = {
            name: Name,
            protesterName: ProtesterName,
            roundNo: RoundNo,
            date: Date,
            division: Division,
            homeClub: HomeClub,
            awayClub: AwayClub,
            clubProtesting: ClubProtesting,
			phoneNumber: ContactNumber,
            captainReportRadio: CaptainReportRadio,
			protestReason: ProtestReason,

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
        $w("#dataset1").setFieldValue("protesterName", ProtesterName);
        $w("#dataset1").setFieldValue("emailAddress", Email);
        $w("#dataset1").setFieldValue("roundNumber", RoundNo);
        $w("#dataset1").setFieldValue("date", Date);
        $w("#dataset1").setFieldValue("division", Division);
        $w("#dataset1").setFieldValue("homeClub", HomeClub);
        $w("#dataset1").setFieldValue("awayClub", AwayClub);
        $w("#dataset1").setFieldValue("clubProtesting", ClubProtesting);
        $w("#dataset1").setFieldValue("phoneNumber", ContactNumber);
        $w("#dataset1").setFieldValue("captainReportRadio", CaptainReportRadio);
		$w("#dataset1").setFieldValue("protestReason", ProtestReason);
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

