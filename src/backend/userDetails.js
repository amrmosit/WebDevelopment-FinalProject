// backend/userDetails.js
import wixUsers from 'wix-users-backend';

export async function getCurrentUser(userId) {
  try {
    const user = await wixUsers.getUser(userId);
    return user;
  } catch (error) {
    console.error('Error retrieving user details:', error);
    throw error;
  }
}