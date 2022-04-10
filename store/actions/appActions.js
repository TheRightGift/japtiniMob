// Define action types
export const MODAL_VISIBILITY = 'MODAL_VISIBILITY';
export const ON_BOARDING_VIEWED = 'ON_BOARDING_VIEWED';


/**
 * For settings the modal visibility.
 *
 * @param visible modal visible.
 */
 exports.setModalVisible = (visible) => {

	return {
		type : exports.MODAL_VISIBILITY,
		payload : { modalVisible : visible }
	};

}; 

/**
 * For settings the on-boarding view.
 *
 * @param viewed on-boarding viewed.
 */
 exports.setOnBoardingViewed = (viewed) => {

	return {
		type : exports.ON_BOARDING_VIEWED,
		payload : { onBoardingViewed : viewed }
	};

}; 
