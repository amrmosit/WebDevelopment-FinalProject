
import wixUsers from 'wix-users';
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';

const autoLogoutTime = 900* 1000; // Set inactivity time to 15 minutes
let timeout;

const memberPages = ["/vote-captains-award,/protest-report ,/admin-dashboard", "/ball-order-form", "/club-space", "/dashboard-members", "/captain-space", "/match-report-captain", "/match-report", "/account-settings"];

$w.onReady(function () {
    // First check if the user is logged in and on a member page before starting the inactivity handling
    if (wixUsers.currentUser.loggedIn && isMemberPage()) {
        console.log("User is logged in and on a member page, starting inactivity timer...");
        resetTimer(); // Reset timer once to start
        setupGlobalInactivityHandlers(); // Set up global event listeners for inactivity tracking
    } else {
        console.log("User is not logged in or not on a member page. No inactivity tracking.");
        clearTimeout(timeout); // Clear any timer if not logged in or not on a member page
    }
});

// Function to check if the current page is a member page
function isMemberPage() {
    const currentPage = wixLocation.path.join('/');
    return memberPages.includes(`/${currentPage}`);
}

// Function to reset the inactivity timer
function resetTimer() {
    // Clear previous timer
    clearTimeout(timeout);

    // Only reset the timer if the user is logged in and on a member page
    if (wixUsers.currentUser.loggedIn && isMemberPage()) {
        timeout = setTimeout(logoutSequence, autoLogoutTime); // Set new timer
        console.log("Inactivity timer set for 15 minutes.");
    } else {
        console.log("User is either not logged in or not on a member page. No inactivity timer set.");
        clearTimeout(timeout); // Ensure no timer is running if the user is logged out or not on a member page
    }
}


function logoutSequence() {
    // Double check if the user is still logged in and on a member page
    if (wixUsers.currentUser.loggedIn && isMemberPage()) {
        // Log out the user
            clearTimeout(timeout); // Clear the inactivity timer to prevent further triggers
            wixUsers.logout();
            wixLocation.to("/login");

    } else {
        console.log("User is already logged out or not on a member page. No need to show lightbox.");
        clearTimeout(timeout); // Ensure the timer is cleared even if the user is already logged out
    }
}
// Function to set up global inactivity event listeners
function setupGlobalInactivityHandlers() {
    // Only set up event listeners if the user is logged in and on a member page
    if (wixUsers.currentUser.loggedIn && isMemberPage()) {
        $w("Page").onMouseIn(() => resetTimer());  // Track mouse movement anywhere on the page
        $w("TextBox").onKeyPress(() => resetTimer());   // Track key presses globally
        $w("Page").onClick(() => resetTimer());      // Track clicks anywhere on the page
        console.log("Inactivity event handlers set up for member page.");
    } else {
        console.log("User is either not logged in or not on a member page. No event handlers set.");
        clearTimeout(timeout); // Clear any timer if not on a member page
    }
}

