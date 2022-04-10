// Define action types
export const USER_DATA = 'USER_DATA';


//Define action creators
/**
 * For settings the user data.
 *
 * @param uData The userData object returned from DB.
 */
exports.setUserData = (uData) => {
	return {
		type : exports.USER_DATA,
		payload : { user : uData }
	};

}; /* getUserData(). */
