import wixLocation from 'wix-location';
import wixUsers from 'wix-users';
import wixData from 'wix-data';

$w.onReady(function () {
    // Initially show only the #matchReport section and set the default tab color
    $w("#submit").onClick(submitButton_click);
    $w('#matchReport').expand();
    $w('#ballOrder, #matchReport2, #protestReport, #votesCaptainAwards').collapse();
    setActiveTab('#matchReportDB'); // Set the initial active tab color


    /*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$Section 1 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

    /*THIS BLOCK IS NEEDED FOR EACH FORM */
    //##############LISTNERS#######################//
    //######### FOR MATCH REPORT SECTION ############//

    // Event listeners for input fields for real-time filtering
    $w("#emailInputMatchReport").onInput(() => filterRepeaterMatchReportOnUmpire());
    $w("#roundNoMatchReport").onInput(() => filterRepeaterMatchReportOnUmpire());
    $w("#nameInputMatchReport").onInput(() => filterRepeaterMatchReportOnUmpire());
    $w("#homeClubInputMatchReport").onInput(() => filterRepeaterMatchReportOnUmpire());
    $w("#unreadOnlyMatchReport").onChange(() => filterRepeaterMatchReportOnUmpire());
    initializeRepeaterMatchReport();
    // Trigger the filterRepeater function to apply any existing filters
    filterRepeaterMatchReportOnUmpire();
    // Trigger search on button click
    $w("#searchButtonMatchReport").onClick(() => filterRepeaterMatchReportOnUmpire());
    // Clear filters when clear button is clicked
    $w("#clearButtonMatchReport").onClick(() => clearFiltersMatchReportOnUmpire());
    // Handle clicks on the #matchReportDB tab
    $w('#matchReportDB').onClick(() => {
        $w('#matchReport').expand();
        $w('#ballOrder, #matchReport2, #protestReport').collapse();
        setActiveTab('#matchReportDB');

    });
    //######### END OF MATCH REPORT LISTENERS ############//




    // #########################Handle clicks on the #ballOrderDB tab###################################
    $w('#ballOrderDB').onClick(() => {
        $w('#ballOrder').expand();
        $w('#matchReport, #matchReport2, #protestReport, #votesCaptainAwards').collapse();
        setActiveTab('#ballOrderDB');


         /*THIS BLOCK IS NEEDED FOR EACH FORM */
         //##############LISTNERS#######################//
         //######### FOR BALL ORDER SECTION ############//
        // Event listeners for input fields for real-time filtering
        $w("#emailInputBallOrder").onInput(() => filterRepeaterBallOrder());
        $w("#nameInputBallOrder").onInput(() => filterRepeaterBallOrder());
        $w("#clubNameInputBallOrder").onInput(() => filterRepeaterBallOrder());
        $w("#unreadOnlyBallOrder").onChange(() => filterRepeaterBallOrder());
        initializeRepeaterBallOrder();
        // Trigger the filterRepeater function to apply any existing filters
        filterRepeaterBallOrder();

        // Trigger search on button click
        $w("#searchButtonBallOrder").onClick(() => filterRepeaterBallOrder());

        // Clear filters when clear button is clicked
        $w("#clearButtonBallOrder").onClick(() => clearFiltersBallOrder());
        //######### END OF BALL ORDER LISTNERS ############//
    });

    // #########################Handle clicks on the #protestReportDB tab###################################
    $w('#protestReportDB').onClick(() => {
        $w('#protestReport').expand();
        $w('#matchReport, #matchReport2, #ballOrder, #votesCaptainAwards').collapse();
        setActiveTab('#protestReportDB');


         //THIS BLOCK IS NEEDED FOR EACH FORM 
         //##############LISTNERS#######################//
         //######### FOR Protest Report SECTION ############//

         //Draft get ready for protest Report

        // Event listeners for input fields for real-time filtering
        $w("#filterEmailProtestReport").onInput(() => filterRepeaterProtestReport());
        $w("#filterDateProtestReport").onInput(() => filterRepeaterProtestReport());
        $w("#filterRoundNoProtestReport").onInput(() => filterRepeaterProtestReport());
        $w("#filterNameProtestReport").onInput(() => filterRepeaterProtestReport());
        $w("#filterProtestingClubProtestReport").onInput(() => filterRepeaterProtestReport());
        $w("#itemCheckBoxProtestReport").onChange(() => filterRepeaterProtestReport());
        initializeRepeaterProtestReport();
        // Trigger the filterRepeater function to apply any existing filters
        filterRepeaterProtestReport();
        // Trigger search on button click
        $w("#searchButtonProtestReport").onClick(() => filterRepeaterProtestReport());
        // Clear filters when clear button is clicked
        $w("#clearButtonProtestReport").onClick(() => clearFiltersProtestReport());
        //######### END OF Protest LISTNERS ############//

        
    });



// #########################Handle clicks on the #votesCaptainAwardsDB tab###################################
    $w('#votesCaptainAwardsDB').onClick(() => {
        $w('#votesCaptainAwards').expand();
        $w('#matchReport, #matchReport2, #ballOrder, #protestReport').collapse();
        setActiveTab('#votesCaptainAwardsDB');


         /*THIS BLOCK IS NEEDED FOR EACH FORM */
         //##############LISTNERS#######################//
         //######### FOR Vote Captain Award SECTION ############//

        

        // Event listeners for input fields for real-time filtering
        $w("#filterEmailVoteCaptainsAward").onInput(() => filterRepeaterVoteCaptainsAward());
        $w("#filterRoundNoVoteCaptainsAward").onInput(() => filterRepeaterVoteCaptainsAward());
        $w("#filterNameVoteCaptainsAward").onInput(() => filterRepeaterVoteCaptainsAward());
        $w("#filterCaptainClubVoteCaptainsAward").onInput(() => filterRepeaterVoteCaptainsAward());
        $w("#itemCheckBoxVoteCaptainsAward").onChange(() => filterRepeaterVoteCaptainsAward());
        initializeRepeaterVoteCaptainsAward();
        // Trigger the filterRepeater function to apply any existing filters
        filterRepeaterVoteCaptainsAward();
        // Trigger search on button click
        $w("#searchButtonVoteCaptainsAward").onClick(() => filterRepeaterVoteCaptainsAward());
        // Clear filters when clear button is clicked
        $w("#clearButtonVoteCaptainsAward").onClick(() => clearFiltersVoteCaptainsAward());
        //######### END OF BALL ORDER LISTNERS ############//



        
    });




















    // #########################Handle clicks on the #matchReport2DB tab###################################
    // Handle clicks on the #matchReport2 tab
    $w('#matchReport2DB').onClick(() => {
        $w('#matchReport2').expand();
        $w('#matchReport, #ballOrder, #protestReport, #votesCaptainAwards').collapse();
        setActiveTab('#matchReport2DB');

        // Event listeners for input fields for real-time filtering
    $w("#filterEmailMatchReportTwo").onInput(() => filterRepeaterMatchReportTwo());
    $w("#filterRoundNoMatchReportTwo").onInput(() => filterRepeaterMatchReportTwo());
    $w("#filterNameMatchReportTwo").onInput(() => filterRepeaterMatchReportTwo());
    $w("#filterClubMatchReportTwo").onInput(() => filterRepeaterMatchReportTwo());
    $w("#unreadButtonMatchReportTwo").onChange(() => filterRepeaterMatchReportTwo());
    initializeRepeaterMatchReportTwo();
    // Trigger the filterRepeater function to apply any existing filters
    filterRepeaterMatchReportTwo();
    // Trigger search on button click
    $w("#searchButtonMatchReportTwo").onClick(() => filterRepeaterMatchReportTwo());
    // Clear filters when clear button is clicked
    $w("#clearButtonMatchReportTwo").onClick(() => clearFiltersMatchReportTwo());
});
//######### END OF MATCH REPORT2 LISTENERS ############//













/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$Section 2 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

//Reapeaters on each section/////////////////////////////////////////////////////////////////////////////////////








/* ########### THIS BLOCK TO BE REPEATED FOR EACH FORM#############*/ 
/*1*/ /*MATCH REPORT On Umpire*/
/*############&&&&&&&&&&&& MATCH REPORT On Umpire&&&&&&&&&&&&&&&&####################*/
function initializeRepeaterMatchReport() {
    // This function is called once the dataset is loaded
    $w("#repeater1").onItemReady(($item, itemData, index) => {
        // Set the initial state of the checkbox based on the dataset
        $item("#itemCheckbox").checked = itemData.isChecked;

        // Listener for manual checkbox toggle
        $item("#itemCheckbox").onChange(() => {
            const newCheckedState = $item("#itemCheckbox").checked;

            // Immediately save the new state to the dataset
            saveCheckboxStateMatchReport(itemData._id, newCheckedState);
            
        });

        // Event handler for the showReport button
        $item("#showReport").onClick(() => {
            // Toggle the checkbox state
            if (!$item("#itemCheckbox").checked){
            const newCheckedState = !$item("#itemCheckbox").checked;
            $item("#itemCheckbox").checked = newCheckedState;

            // Save the new checkbox state to the dataset
            saveCheckboxStateMatchReport(itemData._id, newCheckedState);
            }
        });
    });
}

function filterRepeaterMatchReportOnUmpire() {
    let filter = wixData.filter();  // Start with an empty filter

    const email = $w("#emailInputMatchReport").value.trim().toLowerCase();
    const roundNo = $w("#roundNoMatchReport").value.trim();
    const name = $w("#nameInputMatchReport").value.trim().toLowerCase();
    const homeClub = $w("#homeClubInputMatchReport").value.trim().toLowerCase();
    const unreadOnly = $w("#unreadOnlyMatchReport").checked;

    // Apply the email filter if provided
    if (email) {
        filter = filter.contains('emailAddress', email);
    }

    // Apply the round number filter if provided and valid
    if (roundNo) {
        const roundNoAsNumber = Number(roundNo);
        if (!isNaN(roundNoAsNumber)) {
            filter = filter.and(wixData.filter().eq('roundNumber', roundNoAsNumber));
        } else {
            console.log("Round number input is not a valid number.");
        }
    }

    // Apply the name filter if provided
    if (name) {
        filter = filter.and(wixData.filter().contains('name', name));
    }
    // Apply the home Club filter if provided
    if (homeClub) {
        filter = filter.contains('homeClub', homeClub);
    }

    // Apply the unreadOnly filter to show unchecked items only when the checkbox is checked
    if (unreadOnly) {
        filter = filter.and(wixData.filter().eq('isChecked', false));
    }

    // Apply the final filter to the dataset
    $w("#dataset1").setFilter(filter)
        .then(() => {
            console.log("Repeater filtered");
        })
        .catch((err) => {
            console.error("Error filtering repeater: ", err);
        });
}

function clearFiltersMatchReportOnUmpire() {
    $w("#emailInputMatchReport").value = "";
    $w("#roundNoMatchReport").value = "";
    $w("#nameInputMatchReport").value = "";
    $w("#homeClubInputMatchReport").value = "";
    $w("#unreadOnlyMatchReport").checked = false;

    $w("#dataset1").setFilter(wixData.filter())
        .then(() => {
            console.log("Filters cleared and repeater reset");
        })
        .catch((err) => {
            console.log(err);
        });
}
function saveCheckboxStateMatchReport(itemId, isChecked) {
    const captainReportSubmittedCollection = "CaptainReportSubmitted";

    // Log the item ID to the console
    console.log("Saving checkbox state for item ID:", itemId);

    // Fetch the existing item
    wixData.get(captainReportSubmittedCollection, itemId)
        .then((item) => {
            // Update the isChecked field
            item.isChecked = isChecked;

            // Save the updated item back to the collection
            return wixData.save(captainReportSubmittedCollection, item);
        })
        .then((result) => {
            console.log("Checkbox state saved:", result);
        })
        .catch((err) => {
            console.error("Error saving checkbox state:", err);
        });
}
/*END ############END&&&&&&&&&&&& END MATCH REPORT On Umpire&&&&&&&&&&&&&&&&END####################END */






/*2*/ /*MATCH REPORT2*/
/*############&&&&&&&&&&&& MATCH REPORT2 &&&&&&&&&&&&&&&&####################*/
function initializeRepeaterMatchReportTwo() {
    // This function is called once the dataset is loaded
    $w("#repeater2").onItemReady(($item, itemData, index) => {
        // Set the initial state of the checkbox based on the dataset
        $item("#itemCheckBoxMatchReportTwo").checked = itemData.isCheckedMatchReport2;

        // Listener for manual checkbox toggle
        $item("#itemCheckBoxMatchReportTwo").onChange(() => {
            const newCheckedStateMatchReportTwo = $item("#itemCheckBoxMatchReportTwo").checked;

            // Immediately save the new state to the dataset
            saveCheckboxStateMatchReportTwo(itemData._id, newCheckedStateMatchReportTwo);
            
        });

        // Event handler for the showReport button
        $item("#showMatchReportTwo").onClick(() => {
            // Toggle the checkbox state
            if (!$item("#itemCheckBoxMatchReportTwo").checked){
            const newCheckedStateMatchReportTwo = !$item("#itemCheckBoxMatchReportTwo").checked;
            $item("#itemCheckBoxMatchReportTwo").checked = newCheckedStateMatchReportTwo;

            // Save the new checkbox state to the dataset
            saveCheckboxStateMatchReportTwo(itemData._id, newCheckedStateMatchReportTwo);
            }
        });
    });
}
function filterRepeaterMatchReportTwo() {
    let filter = wixData.filter();  // Start with an empty filter

    const email = $w("#filterEmailMatchReportTwo").value.trim().toLowerCase();
    const roundNo = $w("#filterRoundNoMatchReportTwo").value.trim();
    const name = $w("#filterNameMatchReportTwo").value.trim().toLowerCase();
    const homeClub = $w("#filterClubMatchReportTwo").value.trim().toLowerCase();
    const unreadOnly = $w("#unreadButtonMatchReportTwo").checked;

    // Apply the email filter if provided
    if (email) {
        filter = filter.contains('emailAddress', email);
    }

    // Apply the round number filter if provided and valid
    if (roundNo) {
        const roundNoAsNumber = Number(roundNo);
        if (!isNaN(roundNoAsNumber)) {
            filter = filter.and(wixData.filter().eq('roundNumber', roundNoAsNumber));
        } else {
            console.log("Round number input is not a valid number.");
        }
    }

    // Apply the name filter if provided
    if (name) {
        filter = filter.and(wixData.filter().contains('name', name));
    }
    // Apply the home Club filter if provided
    if (homeClub) {
        filter = filter.contains('homeClub', homeClub);
    }

    // Apply the unreadOnly filter to show unchecked items only when the checkbox is checked
    if (unreadOnly) {
        filter = filter.and(wixData.filter().eq('isCheckedMatchReport2', false));
    }

    // Apply the final filter to the dataset
    $w("#dataset4").setFilter(filter)
        .then(() => {
            console.log("Repeater filtered");
        })
        .catch((err) => {
            console.error("Error filtering repeater: ", err);
        });
}

function clearFiltersMatchReportTwo() {
    $w("#filterEmailMatchReportTwo").value = "";
    $w("#filterRoundNoMatchReportTwo").value = "";
    $w("#filterNameMatchReportTwo").value = "";
    $w("#filterClubMatchReportTwo").value = "";
    $w("#unreadButtonMatchReportTwo").checked = false;

    $w("#dataset4").setFilter(wixData.filter())
        .then(() => {
            console.log("Filters cleared and repeater reset");
        })
        .catch((err) => {
            console.log(err);
        });
}
function saveCheckboxStateMatchReportTwo(itemId, isChecked) {
    const matchReportTwoSubmittedCollection = "MatchReports";

    // Log the item ID to the console
    console.log("Saving checkbox state for item ID:", itemId);

    // Fetch the existing item
    wixData.get(matchReportTwoSubmittedCollection, itemId)
        .then((item) => {
            // Update the isChecked field
            item.isCheckedMatchReport2 = isChecked;

            // Save the updated item back to the collection
            return wixData.save(matchReportTwoSubmittedCollection, item);
        })
        .then((result) => {
            console.log("Checkbox state saved:", result);
        })
        .catch((err) => {
            console.error("Error saving checkbox state:", err);
        });
}
/*END ############END&&&&&&&&&&&& END MATCH REPORT2 &&&&&&&&&&&&&&&&END####################END */


/*3*/ /*Protest Report*/
/*############&&&&&&&&&&&& Protest Report &&&&&&&&&&&&&&&&####################*/

function initializeRepeaterProtestReport() {
    // This function is called once the dataset is loaded
    $w("#repeaterProtestReport").onItemReady(($item, itemData, index) => {
        // Set the initial state of the checkbox based on the dataset
        $item("#unreadButtonProtestReport").checked = itemData.isChecked;

        // Listener for manual checkbox toggle
        $item("#unreadButtonProtestReport").onChange(() => {
            const newCheckedStateProtestReport= $item("#unreadButtonProtestReport").checked;

            // Immediately save the new state to the dataset
            saveCheckboxStateProtestReport(itemData._id, newCheckedStateProtestReport);
            
        });

        // Event handler for the showReport button
        $item("#showButtonProtestReport").onClick(() => {
            // Toggle the checkbox state
            if (!$item("#unreadButtonProtestReport").checked){
            const newCheckedStateProtestReport = !$item("#unreadButtonProtestReport").checked;
            $item("#unreadButtonProtestReport").checked = newCheckedStateProtestReport;

            // Save the new checkbox state to the dataset
            saveCheckboxStateProtestReport(itemData._id, newCheckedStateProtestReport);
            }
        });
    });
}
function filterRepeaterProtestReport() {
    let filter = wixData.filter();  // Start with an empty filter

    const email = $w("#filterEmailProtestReport").value.trim().toLowerCase();
    const date = $w("#filterDateProtestReport").value.trim().toLowerCase();
    const roundNo = $w("#filterRoundNoProtestReport").value.trim();
    const name = $w("#filterNameProtestReport").value.trim().toLowerCase();
    const clubProtesting = $w("#filterProtestingClubProtestReport").value.trim().toLowerCase();
    const unreadOnly = $w("#itemCheckBoxProtestReport").checked;

    // Apply the email filter if provided
    if (email) {
        filter = filter.contains('emailAddress', email);
    }
    if (date) {
        filter = filter.contains('date', date);
    }

    // Apply the round number filter if provided and valid
    if (roundNo) {
        const roundNoAsNumber = Number(roundNo);
        if (!isNaN(roundNoAsNumber)) {
            filter = filter.and(wixData.filter().eq('roundNumber', roundNoAsNumber));
        } else {
            console.log("Round number input is not a valid number.");
        }
    }

    // Apply the name filter if provided
    if (name) {
        filter = filter.and(wixData.filter().contains('name', name));
    }
    // Apply the home Club filter if provided
    if (clubProtesting) {
        filter = filter.contains('clubProtesting', clubProtesting);
    }

    // Apply the unreadOnly filter to show unchecked items only when the checkbox is checked
    if (unreadOnly) {
        filter = filter.and(wixData.filter().eq('isChecked', false));
    }

    // Apply the final filter to the dataset
    $w("#datasetProtestReports").setFilter(filter)
        .then(() => {
            console.log("Repeater filtered");
        })
        .catch((err) => {
            console.error("Error filtering repeater: ", err);
        });
}

function clearFiltersProtestReport() {
    $w("#filterEmailProtestReport").value = "";
    $w("#filterRoundNoProtestReport").value = "";
    $w("#filterNameProtestReport").value = "";
    $w("#filterProtestingClubProtestReport").value = "";
    $w("#filterDateProtestReport").value = "";
    $w("#itemCheckBoxProtestReport").checked = false;

    $w("#datasetProtestReports").setFilter(wixData.filter())
        .then(() => {
            console.log("Filters cleared and repeater reset");
        })
        .catch((err) => {
            console.log(err);
        });
}
function saveCheckboxStateProtestReport(itemId, isChecked) {
    const ProtestReports = "ProtestReports";

    // Log the item ID to the console
    console.log("Saving checkbox state for item ID:", itemId);

    // Fetch the existing item
    wixData.get(ProtestReports, itemId)
        .then((item) => {
            // Update the isChecked field
            item.isChecked = isChecked;

            // Save the updated item back to the collection
            return wixData.save(ProtestReports, item);
        })
        .then((result) => {
            console.log("Checkbox state saved:", result);
        })
        .catch((err) => {
            console.error("Error saving checkbox state:", err);
        });
}
/*END ############END&&&&&&&&&&&& END Protest Form&&&&&&&&&&&&&&&&END####################END */




/*4*/ /*VoteCaptainsAward*/
/*############&&&&&&&&&&&& VoteCaptainsAward &&&&&&&&&&&&&&&&####################*/
function initializeRepeaterVoteCaptainsAward() {
    // This function is called once the dataset is loaded
    $w("#repeaterVoteCaptainsAward").onItemReady(($item, itemData, index) => {
        // Set the initial state of the checkbox based on the dataset
        $item("#unreadButtonVoteCaptainsAward").checked = itemData.isChecked;

        // Listener for manual checkbox toggle
        $item("#unreadButtonVoteCaptainsAward").onChange(() => {
            const newCheckedStateVoteCaptainsAward = $item("#unreadButtonVoteCaptainsAward").checked;

            // Immediately save the new state to the dataset
            saveCheckboxStateVoteCaptainsAward(itemData._id, newCheckedStateVoteCaptainsAward);
            
        });

        // Event handler for the showReport button
        $item("#showButtonVoteCaptainsAward").onClick(() => {
            // Toggle the checkbox state
            if (!$item("#unreadButtonVoteCaptainsAward").checked){
            const newCheckedStateVoteCaptainsAward = !$item("#unreadButtonVoteCaptainsAward").checked;
            $item("#unreadButtonVoteCaptainsAward").checked = newCheckedStateVoteCaptainsAward;

            // Save the new checkbox state to the dataset
            saveCheckboxStateVoteCaptainsAward(itemData._id, newCheckedStateVoteCaptainsAward);
            }
        });
    });
}
function filterRepeaterVoteCaptainsAward() {
    let filter = wixData.filter();  // Start with an empty filter

    const email = $w("#filterEmailVoteCaptainsAward").value.trim().toLowerCase();
    const roundNo = $w("#filterRoundNoVoteCaptainsAward").value.trim();
    const name = $w("#filterNameVoteCaptainsAward").value.trim().toLowerCase();
    const captainClub = $w("#filterCaptainClubVoteCaptainsAward").value.trim().toLowerCase();
    const unreadOnly = $w("#itemCheckBoxVoteCaptainsAward").checked;

    // Apply the email filter if provided
    if (email) {
        filter = filter.contains('emailAddress', email);
    }

    // Apply the round number filter if provided and valid
    if (roundNo) {
        const roundNoAsNumber = Number(roundNo);
        if (!isNaN(roundNoAsNumber)) {
            filter = filter.and(wixData.filter().eq('roundNumber', roundNoAsNumber));
        } else {
            console.log("Round number input is not a valid number.");
        }
    }

    // Apply the name filter if provided
    if (name) {
        filter = filter.and(wixData.filter().contains('name', name));
    }
    // Apply the home Club filter if provided
    if (captainClub) {
        filter = filter.contains('captainClub', captainClub);
    }

    // Apply the unreadOnly filter to show unchecked items only when the checkbox is checked
    if (unreadOnly) {
        filter = filter.and(wixData.filter().eq('isChecked', false));
    }

    // Apply the final filter to the dataset
    $w("#datasetVoteCaptainAward").setFilter(filter)
        .then(() => {
            console.log("Repeater filtered");
        })
        .catch((err) => {
            console.error("Error filtering repeater: ", err);
        });
}

function clearFiltersVoteCaptainsAward() {
    $w("#filterEmailVoteCaptainsAward").value = "";
    $w("#filterRoundNoVoteCaptainsAward").value = "";
    $w("#filterNameVoteCaptainsAward").value = "";
    $w("#filterCaptainClubVoteCaptainsAward").value = "";
    $w("#itemCheckBoxVoteCaptainsAward").checked = false;

    $w("#datasetVoteCaptainAward").setFilter(wixData.filter())
        .then(() => {
            console.log("Filters cleared and repeater reset");
        })
        .catch((err) => {
            console.log(err);
        });
}
function saveCheckboxStateVoteCaptainsAward(itemId, isChecked) {
    const VotesCaptainsAward = "VotesCaptainsAward";

    // Log the item ID to the console
    console.log("Saving checkbox state for item ID:", itemId);

    // Fetch the existing item
    wixData.get(VotesCaptainsAward, itemId)
        .then((item) => {
            // Update the isChecked field
            item.isChecked = isChecked;

            // Save the updated item back to the collection
            return wixData.save(VotesCaptainsAward, item);
        })
        .then((result) => {
            console.log("Checkbox state saved:", result);
        })
        .catch((err) => {
            console.error("Error saving checkbox state:", err);
        });
}
/*END ############END&&&&&&&&&&&& END of Vote Captain Award &&&&&&&&&&&&&&&&END####################END */












/*5*/ /*BALL ORDER*/
/*############&&&&&&&&&&&& BALL ORDER &&&&&&&&&&&&&&&&####################*/
function initializeRepeaterBallOrder() {
    // This function is called once the dataset is loaded
    $w("#repeaterBallOrder").onItemReady(($item, itemData, index) => {
        // Set the initial state of the checkbox based on the dataset
        $item("#itemCheckBallOrder").checked = itemData.isChecked;

        // Listener for manual checkbox toggle
        $item("#itemCheckBallOrder").onChange(() => {
            const newCheckedState = $item("#itemCheckBallOrder").checked;

            // Immediately save the new state to the dataset
            saveCheckboxStateBallOrder(itemData._id, newCheckedState);
            
        });

        // Event handler for the showReport button
        $item("#showBallOrder").onClick(() => {
            // Toggle the checkbox state
            if (!$item("#itemCheckBallOrder").checked){
            const newCheckedState = !$item("#itemCheckBallOrder").checked;
            $item("#itemCheckBallOrder").checked = newCheckedState;

            // Save the new checkbox state to the dataset
            saveCheckboxStateBallOrder(itemData._id, newCheckedState);
            }
        });
    });
}



function filterRepeaterBallOrder() {
    let filter = wixData.filter();  // Start with an empty filter

    const email = $w("#emailInputBallOrder").value.trim().toLowerCase();
    const name = $w("#nameInputBallOrder").value.trim().toLowerCase();
    const homeClub = $w("#clubNameInputBallOrder").value.trim().toLowerCase();
    const unreadOnly = $w("#unreadOnlyBallOrder").checked;

    // Apply the email filter if provided
    if (email) {
        filter = filter.contains('emailAddress', email);
    }

    // Apply the name filter if provided
    if (name) {
        filter = filter.and(wixData.filter().contains('name', name));
    }
    // Apply the home Club filter if provided
    if (homeClub) {
        filter = filter.contains('club', homeClub);
    }

    // Apply the unreadOnly filter to show unchecked items only when the checkbox is checked
    if (unreadOnly) {
        filter = filter.and(wixData.filter().eq('isChecked', false));
    }

    // Apply the final filter to the dataset
    $w("#dataset3").setFilter(filter)
        .then(() => {
            console.log("Repeater filtered");
        })
        .catch((err) => {
            console.error("Error filtering repeater: ", err);
        });
}

function clearFiltersBallOrder() {
    $w("#emailInputBallOrder").value = "";
    $w("#nameInputBallOrder").value = "";
    $w("#clubNameInputBallOrder").value = "";
    $w("#unreadOnlyBallOrder").checked = false;
    

    $w("#dataset3").setFilter(wixData.filter())
        .then(() => {
            console.log("Filters cleared and repeater reset");
        })
        .catch((err) => {
            console.log(err);
        });
}
function saveCheckboxStateBallOrder(itemId, isChecked) {
    const BallOrderSubmittedCollection = "BallOrderSubmitted";

    // Log the item ID to the console
    console.log("Saving checkbox state for item ID:", itemId);

    // Fetch the existing item
    wixData.get(BallOrderSubmittedCollection, itemId)
        .then((item) => {
            // Update the isChecked field
            item.isChecked = isChecked;

            // Save the updated item back to the collection
            return wixData.save(BallOrderSubmittedCollection, item);
        })
        .then((result) => {
            console.log("Checkbox state saved:", result);
        })
        .catch((err) => {
            console.error("Error saving checkbox state:", err);
        });
}



/*END ############END&&&&&&&&&&&& END BALL ORDER &&&&&&&&&&&&&&&&END####################END */



//############### COMMON FUNCTIONS#############################
function setActiveTab(activeTabId) {
    // Reset all tab colors to default (assuming default is white)
    $w('#matchReportDB').style.backgroundColor = 'white';
    $w('#ballOrderDB').style.backgroundColor = 'white';
    $w('#matchReport2DB').style.backgroundColor = 'white';
    $w('#protestReportDB').style.backgroundColor = 'white';
    $w('#votesCaptainAwardsDB').style.backgroundColor = 'white';
    
    // Set the active tab color to light blue
    $w(activeTabId).style.backgroundColor = 'lightblue';
}

async function submitButton_click(event) {
    try {
        // Validate required fields
        const titleValue = $w('#title').value;
        const announcementValue = $w('#announcement').value;

        if (!titleValue || !announcementValue) {
            // Show error message if required fields are not filled
            $w("#errorMessage").text = "Please fill in all required fields.";
            $w("#errorMessage").show();
            return; // Stop the function execution
        }

        // Get the current user's ID
        const user = wixUsers.currentUser;
        const userId = user.id;

        // Retrieve user details from the PrivateMembersData collection
        const userDetails = await wixData.get('Members/PrivateMembersData', userId);
        const Name = userDetails.name;
        const Email = userDetails.loginEmail;
        const PhoneNumber = userDetails.mainPhone;
        const Title = titleValue;
        const Announcement = announcementValue;

        // Save the data to the dataset
        $w("#dataset2").setFieldValue("name", Name);
        $w("#dataset2").setFieldValue("phoneNumber", PhoneNumber);
        $w("#dataset2").setFieldValue("email", Email);
        $w("#dataset2").setFieldValue("title", Title);
        $w("#dataset2").setFieldValue("announcement", Announcement);

        await $w("#dataset2").save()
            .then(() => {
                console.log("Data submitted successfully to dataset");
            })
            .catch((err) => {
                throw new Error("Error submitting data to dataset: " + err.message);
            });

        $w("#successMessage").text = 'Your announcement has been published!';
        $w("#successMessage").show();
        wixLocation.to(wixLocation.url);
    } catch (err) {
        console.error("Error in operation:", err);
        $w("#errorMessage").text = err.message;
        $w("#errorMessage").show();
    }
}
});