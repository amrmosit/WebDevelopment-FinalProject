import wixLocation from 'wix-location';
import wixUsers from 'wix-users';
import wixData from 'wix-data';
import { sendSimpleEmail } from 'backend/emailServiceMRUser';
import { sendAdminEmail } from 'backend/emailServiceMRAdmin';

$w.onReady(function () {
    // Attach event handlers to the input fields to update the total score
    $w("#consistentGroundScore").onChange(updateTotalScore);
    $w("#mownGrassScore").onChange(updateTotalScore);
    $w("#unevenBounceScore").onChange(updateTotalScore);

    $w("#flatPitchScore").onChange(updateTotalScore);
    $w("#hardPitchScore").onChange(updateTotalScore);
    $w("#consistentBounceScore").onChange(updateTotalScore);
    $w("#evenlyGrassedScore").onChange(updateTotalScore);
    $w("#goodCricketScore").onChange(updateTotalScore);

    $w("#firmBallScore").onChange(updateTotalScore);
    $w("#ballShapeScore").onChange(updateTotalScore);
    $w("#stitchingScore").onChange(updateTotalScore);
    $w("#seamsScore").onChange(updateTotalScore);

    // Automatically convert the captain name to uppercase
    $w("#captainName").onInput(() => {
        let uppercaseName = $w("#captainName").value.toUpperCase();
        $w("#captainName").value = uppercaseName;  // Update the input field with uppercase value
    });


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

// Function to calculate and update the total score for the ball
function updateTotalScore() {
    // Get values of the input fields, default to 0 if not a number
    let consistentGroundScore = parseFloat($w("#consistentGroundScore").value) || 0;
    let mownGrassScore = parseFloat($w("#mownGrassScore").value) || 0;
    let unevenBounceScore = parseFloat($w("#unevenBounceScore").value) || 0;

    let flatPitchScore = parseFloat($w("#flatPitchScore").value) || 0;
    let hardPitchScore = parseFloat($w("#hardPitchScore").value) || 0;
    let consistentBounceScore = parseFloat($w("#consistentBounceScore").value) || 0;
    let evenlyGrassedScore = parseFloat($w("#evenlyGrassedScore").value) || 0;
    let goodCricketScore = parseFloat($w("#goodCricketScore").value) || 0;

    let firmBallScore = parseFloat($w("#firmBallScore").value) || 0;
    let ballShapeScore = parseFloat($w("#ballShapeScore").value) || 0;
    let stitchingScore = parseFloat($w("#stitchingScore").value) || 0;
    let seamsScore = parseFloat($w("#seamsScore").value) || 0;

    // Calculate the total score
    let ballScore = firmBallScore + ballShapeScore + stitchingScore + seamsScore;
    let pitchScore = flatPitchScore  + hardPitchScore + consistentBounceScore+ evenlyGrassedScore + goodCricketScore;
    let outfieldScore = consistentGroundScore + mownGrassScore + unevenBounceScore;

    // Update the #ballScore field with the calculated total
    $w("#outfieldScore").text = outfieldScore.toString();
    $w("#pitchScore").text = pitchScore.toString();
    $w("#ballScore").text = ballScore.toString();
}

// Separate function to validate required fields
function validateRequiredFields() {
    let allValid = true;

    // Check each required field's validity
    const requiredFields = [
        "#roundNo",
        "#division",
        "#homeClub",
        "#captainSelection",
        //"#disputeRadio",
        //"#protestRadio",
        "#consistentGroundScore",
        "#mownGrassScore",
        "#unevenBounceScore",
        "#flatPitchScore",
        "#hardPitchScore",
        "#consistentBounceScore",
        "#evenlyGrassedScore",
        "#goodCricketScore",
        "#firmBallScore",
        "#ballShapeScore",
        "#stitchingScore",
        "#seamsScore",
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
        const admin = '3bf3aca5-0a5e-4270-ab67-450e8e120d53';
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
        const Date1 = $w('#datePicker1').value ? $w('#datePicker1').value.toLocaleDateString() : '';
        const Date2 = $w('#datePicker2').value ? $w('#datePicker2').value.toLocaleDateString() : '';
        const Division = $w('#division').value;
        const HomeClub = $w('#homeClub').value;
        const Visitors = $w('#visitors').value;
        const CaptainName = $w('#captainName').value;
        const CaptainPhoneNumber = $w('#captainPhoneNumber').value;
        const CaptainSelection = $w('#captainSelection').value;
		const HomeInnings1Wickets = $w('#homeInnings1Wickets').value;
		const HomeInnings1Runs = $w('#homeInnings1Runs').value;
		const HomeInnings2Wickets = $w('#homeInnings2Wickets').value;
		const HomeInnings2Runs = $w('#homeInnings2Runs').value;
        const AwayInnings1Wickets = $w('#awayInnings1Wickets').value;
		const AwayInnings1Runs = $w('#awayInnings1Runs').value;
		const AwayInnings2Wickets = $w('#awayInnings2Wickets').value;
		const AwayInnings2Runs = $w('#awayInnings2Runs').value;
		const ConsistentGroundScore = $w('#consistentGroundScore').value;
		const MownGrassScore = $w('#mownGrassScore').value;
		const UnevenBounceScore = $w('#unevenBounceScore').value;
        const OutfieldScore = parseFloat($w('#outfieldScore').text) || 0;
		const FlatPitchScore = $w('#flatPitchScore').value;
		const HardPitchScore = $w('#hardPitchScore').value;
		const ConsistentBounceScore = $w('#consistentBounceScore').value;
		const EvenlyGrassedScore = $w('#evenlyGrassedScore').value;
		const ClippingPercentage = $w('#clippingPercentage').value;
		const GoodCricketScore = $w('#goodCricketScore').value;
        const PitchScore = parseFloat($w('#pitchScore').text) || 0;
		const FirmBallScore = $w('#firmBallScore').value;
		const BallShapeScore = $w('#ballShapeScore').value;
		const StitchingScore = $w('#stitchingScore').value;
		const SeamsScore = $w('#seamsScore').value;
        const BallScore = parseFloat($w('#ballScore').text) || 0;

        const DisputeRadio = $w('#disputeRadio').value;
        const ProtestRadio = $w('#protestRadio').value;
        const ConsistentGroundRadio = $w('#consistentGroundRadio').value;
        const MownGrassRadio = $w('#mownGrassRadio').value;
        const UnevenBounceRadio = $w('#unevenBounceRadio').value;
        const FlatPitchRadio = $w('#flatPitchRadio').value;
        const HardPitchRadio = $w('#hardPitchRadio').value;
        const ConsistentBounceRadio = $w('#consistentBounceRadio').value;
        const EvenlyGrassedRadio = $w('#evenlyGrassedRadio').value;
        const GoodCricketRadio = $w('#goodCricketRadio').value;
        const FirmBallRadio = $w('#firmBallRadio').value;
        const BallShapeRadio = $w('#ballShapeRadio').value;
        const StitchingRadio = $w('#stitchingRadio').value;
        const SeamsRadio = $w('#seamsRadio').value;
        const SignatureImage = $w('#signatureInput1').value;

        const emailVariables = {
            name: Name,
            captainName:CaptainName,
            captainPhoneNumber:CaptainPhoneNumber,
            roundNo: RoundNo,
            date1: Date1,
            date2: Date2,
            division: Division,
            homeClub: HomeClub,
            visitors: Visitors,
            captainSelection: CaptainSelection,
			homeInnings1Wickets: HomeInnings1Wickets,
			homeInnings1Runs: HomeInnings1Runs,
			homeInnings2Wickets: HomeInnings2Wickets,
			homeInnings2Runs: HomeInnings2Runs,
            awayInnings1Wickets: AwayInnings1Wickets,
            awayInnings1Runs: AwayInnings1Runs,
			awayInnings2Wickets: AwayInnings2Wickets,
			awayInnings2Runs: AwayInnings2Runs,
			consistentGroundScore: ConsistentGroundScore,
			mownGrassScore: MownGrassScore,
			unevenBounceScore: UnevenBounceScore,
			outfieldScore: OutfieldScore,
			flatPitchScore: FlatPitchScore,
			hardPitchScore: HardPitchScore,
			consistentBounceScore: ConsistentBounceScore,
			evenlyGrassedScore: EvenlyGrassedScore,
			clippingPercentage: ClippingPercentage,
			goodCricketScore: GoodCricketScore,
			pitchScore: PitchScore,
			firmBallScore: FirmBallScore,
			ballShapeScore: BallShapeScore,
			stitchingScore: StitchingScore,
			seamsScore: SeamsScore,
			ballScore: BallScore,
            disputeRadio: DisputeRadio,
            protestRadio: ProtestRadio,
            consistentGroundRadio: ConsistentGroundRadio,
            mownGrassRadio: MownGrassRadio,
            unevenBounceRadio: UnevenBounceRadio,
            flatPitchRadio: FlatPitchRadio,
            hardPitchRadio: HardPitchRadio,
            consistentBounceRadio: ConsistentBounceRadio,
            evenlyGrassedRadio: EvenlyGrassedRadio,
            goodCricketRadio: GoodCricketRadio,
            firmBallRadio: FirmBallRadio,
            ballShapeRadio: BallShapeRadio,
            stitchingRadio: StitchingRadio,
            seamsRadio: SeamsRadio,
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
        $w("#dataset1").setFieldValue("captainName", CaptainName);
        $w("#dataset1").setFieldValue("captainPoneNumber", CaptainPhoneNumber);
        $w("#dataset1").setFieldValue("phoneNumber", PhoneNumber);
        $w("#dataset1").setFieldValue("emailAddress", Email);
        $w("#dataset1").setFieldValue("roundNumber", RoundNo);
        $w("#dataset1").setFieldValue("date1", Date1);
        $w("#dataset1").setFieldValue("date2", Date2);
        $w("#dataset1").setFieldValue("division", Division);
        $w("#dataset1").setFieldValue("homeClub", HomeClub);
        $w("#dataset1").setFieldValue("visitors", Visitors);
        $w("#dataset1").setFieldValue("captainSelection", CaptainSelection);
		$w("#dataset1").setFieldValue("homeInnings1Wickets", HomeInnings1Wickets);
		$w("#dataset1").setFieldValue("homeInnings1Runs", HomeInnings1Runs);
		$w("#dataset1").setFieldValue("homeInnings2Wickets", HomeInnings2Wickets);
		$w("#dataset1").setFieldValue("homeInnings2Runs", HomeInnings2Runs);
        $w("#dataset1").setFieldValue("awayInnings1Wickets", AwayInnings1Wickets);
        $w("#dataset1").setFieldValue("awayInnings1Runs", AwayInnings1Runs);
		$w("#dataset1").setFieldValue("awayInnings2Wickets", AwayInnings2Wickets);
		$w("#dataset1").setFieldValue("awayInnings2Runs", AwayInnings2Runs);
		$w("#dataset1").setFieldValue("consistentGroundScore", ConsistentGroundScore);
		$w("#dataset1").setFieldValue("mownGrassScore", MownGrassScore);
		$w("#dataset1").setFieldValue("unevenBounceScore", UnevenBounceScore);
		$w("#dataset1").setFieldValue("outfieldScore", OutfieldScore);
		$w("#dataset1").setFieldValue("flatPitchScore", FlatPitchScore);
		$w("#dataset1").setFieldValue("hardPitchScore", HardPitchScore);
		$w("#dataset1").setFieldValue("consistentBounceScore", ConsistentBounceScore);
		$w("#dataset1").setFieldValue("evenlyGrassedScore", EvenlyGrassedScore);
		$w("#dataset1").setFieldValue("clippingPercentage", ClippingPercentage);
		$w("#dataset1").setFieldValue("goodCricketScore", GoodCricketScore);
		$w("#dataset1").setFieldValue("pitchScore", PitchScore);
		$w("#dataset1").setFieldValue("firmBallScore", FirmBallScore);
		$w("#dataset1").setFieldValue("ballShapeScore", BallShapeScore);
		$w("#dataset1").setFieldValue("stitchingScore", StitchingScore);
		$w("#dataset1").setFieldValue("seamsScore", SeamsScore);
		$w("#dataset1").setFieldValue("ballScore", BallScore);
        $w("#dataset1").setFieldValue("disputeRadio", DisputeRadio);
        $w("#dataset1").setFieldValue("protestRadio", ProtestRadio);
        $w("#dataset1").setFieldValue("consistentGroundRadio", ConsistentGroundRadio);
        $w("#dataset1").setFieldValue("mownGrassRadio", MownGrassRadio);
        $w("#dataset1").setFieldValue("unevenBounceRadio", UnevenBounceRadio);
        $w("#dataset1").setFieldValue("flatPitchRadio", FlatPitchRadio);
        $w("#dataset1").setFieldValue("hardPitchRadio", HardPitchRadio);
        $w("#dataset1").setFieldValue("consistentBounceRadio", ConsistentBounceRadio);
        $w("#dataset1").setFieldValue("evenlyGrassedRadio", EvenlyGrassedRadio);
        $w("#dataset1").setFieldValue("goodCricketRadio", GoodCricketRadio);
        $w("#dataset1").setFieldValue("firmBallRadio", FirmBallRadio);
        $w("#dataset1").setFieldValue("ballShapeRadio", BallShapeRadio);
        $w("#dataset1").setFieldValue("stitchingRadio", StitchingRadio);
        $w("#dataset1").setFieldValue("seamsRadio", SeamsRadio);
        $w("#dataset1").setFieldValue("eSignature", SignatureImage);
        // Set the isChecked field to false for new entries
        $w("#dataset1").setFieldValue("isCheckedMatchReport2", false);

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

