
import wixUsers from 'wix-users';

$w.onReady(function () {
    const user = wixUsers.currentUser;

    // Check if the user is logged in
    if (user.loggedIn) {
        user.getRoles()
            .then((roles) => {
                console.log("Roles object:", roles); // Log the entire roles object to inspect its structure

                // Check if roles is an array, log its length
                if (Array.isArray(roles)) {
                    console.log("Number of roles found:", roles.length);
                    
                    // Find if the user has specific roles
                    const hasClubRepRole = roles.some((role) => role.name === "Club rep");
                    const hasCaptainRole = roles.some((role) => role.name === "Captain");
                    const hasCollaboratorRole = roles.some((role) => role.name === "Collaborator");
                    const hasVTCAandSparkwareRole = roles.some((role) => role.name === "VTCA & Sparkware Team");

                    console.log("Club Rep Role:", hasClubRepRole);
                    console.log("Captain Role:", hasCaptainRole);
                    console.log("Collaborator Role:", hasCollaboratorRole);
                    console.log("VTCA & Sparkware Team Role:", hasVTCAandSparkwareRole);

                    // Expand/collapse sections based on roles
                    if (hasCaptainRole || hasCollaboratorRole || hasVTCAandSparkwareRole) {
                        $w("#captainSpaceSection").expand();
                    } else {
                        $w("#captainSpaceSection").collapse();
                    }

                    if (hasClubRepRole || hasCollaboratorRole || hasVTCAandSparkwareRole) {
                        $w("#clubSpaceSection").expand();
                    } else {
                        $w("#clubSpaceSection").collapse();
                    }
                } else {
                    console.error("Roles is not an array. Received:", roles);
                }
            })
            .catch((err) => {
                console.error("Error retrieving user roles:", err);
            });
    } else {
        console.log("User not logged in.");
        $w("#captainSpaceSection").collapse(); // Collapse sections if not logged in
        $w("#clubSpaceSection").collapse();
    }
});
