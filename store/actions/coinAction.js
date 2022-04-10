// Define action types
export const COIN_DATA = 'COIN_DATA';


//Define action creators
/**
 * For settings the coin data.
 *
 * @param cData The coinData object returned from DB.
 */
exports.setCoinData = (cData) => {
	return {
		type : exports.COIN_DATA,
		payload : { coin : cData }
	};

}; /* getCoinData(). */
