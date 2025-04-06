import wixLocation from 'wix-location';
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import { sendSimpleEmail } from 'backend/emailServiceVoteCaptainAwardUser';
import { sendAdminEmail } from 'backend/emailServiceVoteCaptainAwardAdmin';

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
        "#dateOfMatch",
        "#homeTeam",
        "#awayTeam",
		"#playerOneVote",
        "#playerOneName",
        "#playerOneClub",
		"#playerTwoVote",
        "#playerTwoName",
        "#playerTwoClub",
		"#playerThreeVote",
        "#playerThreeName",
        "#playerThreeClub",
		"#captainName",
        "#captainClub"
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
		const Division = $w('#division').value;
        const DateOfMatch = $w('#dateOfMatch').value ? $w('#dateOfMatch').value.toLocaleDateString() : '';
        const HomeTeam = $w('#homeTeam').value;
        const AwayTeam = $w('#awayTeam').value;
        const PlayerOneVote = $w('#playerOneVote').value;
        const PlayerOneName = $w('#playerOneName').value;
        const PlayerOneClub = $w('#playerOneClub').value;
        const PlayerTwoVote = $w('#playerTwoVote').value;
        const PlayerTwoName = $w('#playerTwoName').value;
        const PlayerTwoClub = $w('#playerTwoClub').value;
        const PlayerThreeVote = $w('#playerThreeVote').value;
        const PlayerThreeName = $w('#playerThreeName').value;
        const PlayerThreeClub = $w('#playerThreeClub').value;
        const CaptainName = $w('#captainName').value;
        const CaptainClub = $w('#captainClub').value;


        const emailVariables = {
            name: Name,
			division: Division,
            roundNo: RoundNo,
            dateOfMatch: DateOfMatch,
			homeTeam: HomeTeam,
			awayTeam: AwayTeam,
			playerOneVote: PlayerOneVote,
			playerOneName: PlayerOneName ,
			playerOneClub:  PlayerOneClub,
			playerTwoVote: PlayerTwoVote,
			playerTwoName: PlayerTwoName,
			playerTwoClub: PlayerTwoClub,
			playerThreeVote: PlayerThreeVote,
			playerThreeName: PlayerThreeName,
			playerThreeClub: PlayerThreeClub,
			captainName: CaptainName,
			captainClub: CaptainClub,

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
		$w("#dataset1").setFieldValue("division", Division);
        $w("#dataset1").setFieldValue("dateOfMatch", DateOfMatch);
        $w("#dataset1").setFieldValue("homeTeam", HomeTeam);
        $w("#dataset1").setFieldValue("awayTeam", AwayTeam);
        $w("#dataset1").setFieldValue("playerOneVote", PlayerOneVote);
        $w("#dataset1").setFieldValue("playerOneName", PlayerOneName);
        $w("#dataset1").setFieldValue("playerOneClub", PlayerOneClub);
        $w("#dataset1").setFieldValue("playerTwoVote", PlayerTwoVote);
        $w("#dataset1").setFieldValue("playerTwoName", PlayerTwoName);
        $w("#dataset1").setFieldValue("playerTwoClub", PlayerTwoClub);
        $w("#dataset1").setFieldValue("playerThreeVote", PlayerThreeVote);
        $w("#dataset1").setFieldValue("playerThreeName", PlayerThreeName);
        $w("#dataset1").setFieldValue("playerThreeClub", PlayerThreeClub);
        $w("#dataset1").setFieldValue("captainName", CaptainName);
        $w("#dataset1").setFieldValue("captainClub", CaptainClub);

        
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