import React, { Component } from 'react';
import { StyleSheet, Image, View, StatusBar} from "react-native";
import Socket from "../../api/socket";
import { connect } from 'react-redux';
import { COLORS, SIZES } from '../../constants/index';
// import { setCoinData } from "../../store/actions/coinAction";

class Splash extends Component {
    /**
	 * Constructor.
	 */
	constructor(inProps) {
		super(inProps);
		
		this.state = {
			coinDataRecieved: false
		}		
	} /* End constructor. */

    componentDidMount() {
		
		StatusBar.setBarStyle('light-content');
		StatusBar.setBackgroundColor(COLORS.primary);

		Socket.startup();
		
		if(this.props.onBoardingViewed){//user ve viewed onboarding
			this.props.navigation.navigate('auth', { screen: 'Login' });
		} else {//user ve not viewed onboarding
			this.props.navigation.navigate('auth', { screen: 'Login'});
		}
		
		
		// Socket.io.on("coinData", (data) => {
		// 	this.props.setCoinData(data.coinData);
		// 	this.setState({ coinDataRecieved: true });
		// });
	}

    render () {
        return (
            <View style={styles.container}>
                <Image source={{uri: '../../img/japtiniSplash.png'}} style={{}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
	},
	instructions: {
		textAlign: 'center',
		color: '#ea4335',
        fontSize: 30
	},
});

/**
 * Function to map state to Component props.
 */
 const mapStateToProps = (inState) => {
	return {
		user: inState.authReducer.user,
		onBoardingViewed: inState.appReducer.onBoardingViewed,
	};
};


// Export components.
export default connect(mapStateToProps)(Splash);