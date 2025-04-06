import wixWindow from 'wix-window';
import wixLocation from 'wix-location';

import wixUsers from 'wix-users';
import wixData from 'wix-data';




$w.onReady(function () {
    // Initially show only the #matchReport1-Page section and set the default tab color
    $w('#matchReport1Page').expand();
    $w('#matchReport2Page, #protestReportPage, #voteCaptainsAwardPage').collapse();
    setActiveTabNew('#matchReport1'); // Set the initial active tab color

    //################## LISTENERS FOR NEW BUTTONS ####################//
    // Handle clicks on the #matchReport1 button
    $w('#matchReport1').onClick(() => {
        $w('#matchReport1Page').expand();
        $w('#matchReport2Page,#protestReportPage, #voteCaptainsAwardPage').collapse();
        setActiveTabNew('#matchReport1');
    });

    // Handle clicks on the #matchReport2 button
    $w('#matchReport2').onClick(() => {
        $w('#matchReport2Page').expand();
        $w('#matchReport1Page, #protestReportPage, #voteCaptainsAwardPage').collapse();
        setActiveTabNew('#matchReport2');
    });

    // Handle clicks on the #protestReport button
    $w('#protestReport').onClick(() => {
        $w('#protestReportPage').expand();
        $w('#matchReport1Page, #matchReport2Page, #voteCaptainsAwardPage').collapse();
        setActiveTabNew('#protestReport');
    });

    // Handle clicks on the #voteCaptainsAward button
    $w('#voteCaptainsAward').onClick(() => {
        $w('#voteCaptainsAwardPage').expand();
        $w('#matchReport1Page, #matchReport2Page,#protestReportPage').collapse();
        setActiveTabNew('#voteCaptainsAward');
    });

    //################## DATASET FILTERING BASED ON USER ####################//
    const user = wixUsers.currentUser;
    if (user.loggedIn) {
        const userId = user.id; // Get the current user's ID

        // Filter the dataset to show only items where the _owner matches the current user's ID (Match Report 1)
        $w("#dataset4").setFilter(wixData.filter()
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


    if (user.loggedIn) {
        const userId = user.id; // Get the current user's ID

        // Filter the dataset to show only items where the _owner matches the current user's ID (Vote Captains Awards)
        $w("#dataset6").setFilter(wixData.filter()
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

    if (user.loggedIn) {
        const userId = user.id; // Get the current user's ID

        // Filter the dataset to show only items where the _owner matches the current user's ID (Match Report 2)
        $w("#dataset5").setFilter(wixData.filter()
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

    if (user.loggedIn) {
        const userId = user.id; // Get the current user's ID

        // Filter the dataset to show only items where the _owner protest reports the current user's ID (Protest Report)
        $w("#dataset7").setFilter(wixData.filter()
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










//############### COMMON FUNCTIONS FOR NEW SECTIONS #############################
function setActiveTabNew(activeTabId) {
    // Reset all tab colors to default (assuming default is white)
    $w('#matchReport1').style.backgroundColor = 'white';
    $w('#matchReport2').style.backgroundColor = 'white';
    $w('#protestReport').style.backgroundColor = 'white';
    $w('#voteCaptainsAward').style.backgroundColor = 'white';
    

    // Set the active tab color to light blue
    $w(activeTabId).style.backgroundColor = 'lightblue';
}




