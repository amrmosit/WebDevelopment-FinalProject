// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { getMembersList } from 'backend/getMembersList'; 
import { deleteMember } from 'backend/deleteMember'; // Adjust the path as needed

$w.onReady(function () {
  // Hide the repeater and message elements initially
  $w('#repeaterList').hide();
  $w('#successMessage').hide();
  $w('#errorMessage').hide();
  
  // Fetch members data
  getMembersList()
    .then(membersData => {
      if (membersData && membersData.members) {
        $w('#repeaterList').data = membersData.members;
        $w('#repeaterList').show();
      }
    })
    .catch(error => {
      console.error('Error fetching members:', error.message || error);
      // Show error message
      $w('#errorMessage').text = 'Error fetching members. Please try again later.';
      $w('#errorMessage').show();
      // Hide error message after a few seconds
      setTimeout(() => $w('#errorMessage').hide(), 5000);
    });

  // Set up onItemReady for the repeater
  $w('#repeaterList').onItemReady(($item, itemData) => {
    // Display the loginEmail in the Text element
    $item('#loginEmail').text = itemData.loginEmail;

    // Add event handler for the delete button
    $item('#deleteButton').onClick(async () => {
      console.log('Delete button clicked for:', itemData.loginEmail); // Debugging line

      try {
        const result = await deleteMember(itemData.loginEmail);
        console.log("Member deleted successfully:", result);

        // Show success message
        $w('#successMessage').text = `Member ${itemData.loginEmail} deleted successfully.`;
        $w('#successMessage').show();
        // Hide success message after a few seconds
        setTimeout(() => $w('#successMessage').hide(), 5000);

        // Refresh the dataset or repeater to reflect the deletion
        const updatedMembersData = await getMembersList(); // Re-fetch updated members list
        if (updatedMembersData && updatedMembersData.members) {
          $w('#repeaterList').data = updatedMembersData.members;
        }
      } catch (error) {
        console.error("Error deleting member:", error.message || error);
        // Show error message
        $w('#errorMessage').text = `Error deleting member: ${error.message || 'Please try again later.'}`;
        $w('#errorMessage').show();
        // Hide error message after a few seconds
        setTimeout(() => $w('#errorMessage').hide(), 5000);
      }
    });
  });
});