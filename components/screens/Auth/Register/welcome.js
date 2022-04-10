import React from 'react';
import { StyleSheet, StatusBar, Image, ImageBackground, View} from "react-native";
import { Card, Text, Icon, Button, Layout} from '@ui-kitten/components';
import { COLORS, SIZES } from '../../../../constants/index';
import { connect } from 'react-redux';
import { setUserData } from "../../../../store/actions/authActions";

class Welcome extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            
		};
		
	} /* End constructor. */

	onSubmit = (e) => {	
        this.props.navigation.navigate('app');
	}
	
	componentDidMount() {
		StatusBar.setBarStyle('light-content');
		StatusBar.setBackgroundColor(COLORS.primary);
  	}; /* End componentDidMount(). */

	render() {
            
        return(
            <View style={styles.container}>
                <Layout style={styles.banner}>
                    <Image source={require("../../../../img/japtini.png")} style={styles.image} />
                </Layout>
                <Card style={styles.container}>
                    {/* <Image source={require("../../../../img/authBackground.png")} style={styles.image} /> */}
                    <Text style={styles.heading}>Welcome</Text>

                    <ImageBackground resizeMode='cover' source={require("../../../../img/japtiniWelcomeBackground.png")} style={styles.welcomeImg}>
                        <Layout style={styles.user}>
                            <Image source={require("../../../../img/noProfileImg.png")} style={styles.profileImg} />
                            <Text style={styles.names}>{this.props.user.firstname} {this.props.user.lastname}</Text>
                            <Text style={styles.uName}>@{this.props.user.username}</Text>
                        </Layout>
                    </ImageBackground>
                    
                    
                    <Layout style={styles.bottomSection}>                    
                        <Button style={styles.button} status='primary' onPress={() => {this.onSubmit()}}>
                            Continue
                        </Button>
                    </Layout>              
                    
                </Card>
            </View>
        )
	}
}

const styles = StyleSheet.create({	
    container: {
        flex: 1
    },
	banner: {
        backgroundColor: COLORS.primary,
        width: SIZES.width,
        height: SIZES.height * 0.20,
        alignItems: 'center',
        justifyContent: 'center'
    },
	image: {
        width: SIZES.width * 0.89, 
        resizeMode: 'contain',  
    },
    card: {
        height: SIZES.height
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 5,
        marginTop: 30,
        marginBottom: 15,
        textAlign: 'center'
    },
    user: {
        width: SIZES.width * 0.6,
        height: SIZES.height * 0.25,
        marginHorizontal: SIZES.width * 0.14,
        marginTop: SIZES.height * 0.09,
        marginBottom: SIZES.height * 0.09,
        borderColor: '#000',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImg: {
        width: SIZES.width * 0.16,
        height: SIZES.height * 0.08,
        borderRadius: 50
    },
    names: {
        fontSize: 14,
        color: COLORS.black,
        fontWeight: '700'
    },
    uName: {
        fontSize: 14,
        color: '#6D6E71',
        fontWeight: '600'
    },
    welcomeImg: {
        width: SIZES.width
    },
    
    bottomSection: {
        marginTop: SIZES.height * 0.13,
    },
    
    button: {
        margin: 2,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary        
    },
    
});

/**
 * Function to map state to Component props.
 */
 const mapStateToProps = (inState) => {
	return {
		user: inState.authReducer.user,
	};
};


// Export components.
export default connect(mapStateToProps, {setUserData})(Welcome);