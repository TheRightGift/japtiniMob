import React from 'react';
import { StyleSheet, StatusBar, View, Image} from "react-native";
import { Card, Text, Icon, Button, Layout, Input } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { setUserData } from "../../../../store/actions/authActions";
import { COLORS, SIZES } from '../../../../constants/index';

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
);
const SendIcon = (props) => (
    <Icon {...props} name='paper-plane-outline'/>
);

class ForgotPassword extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            otpOne: '',
            otpTwo: '',
            otpThree: '',
            otpFour: '',
            otpFive: '',
            otpSix: '',
		};
		
	} /* End constructor. */

	onChangeText  = (key, val) => {
        
        if(isNaN(val)){
            alert('Numbers only');
            this.setState({ [key]: ''});
        } else {   
            this.setState({ [key]: val });
        }		
	}

	onSubmit = (e) => {	
        this.props.navigation.navigate('ResetPassword');
	}

    processOTP = (otp, pos) => {
        if(otp !== ''){
            return otp.slice(pos, 1);
        } else {
            return '';
        }
        
    }
	
	componentDidMount() {
		StatusBar.setBarStyle('dark-content');
		StatusBar.setBackgroundColor(COLORS.white);
  	}; /* End componentDidMount(). */

	render() {    
        const renderCaption = () => {
            return (
                <View style={styles.captionContainer}>
                    {AlertIcon(styles.captionIcon)}
                    <Text style={styles.captionText}>Should contain at least 8 symbols</Text>
                </View>
            )
        }
        return(
            <View>
                
                {/* <TopNavigation alignment='center' title='Login' style={styles.header}/> */}
                <Card style={styles.container}>
                    <Image source={require("../../../../img/authBackground.png")} style={styles.image} />
                    <Text style={styles.heading}>Forgot Password</Text>
                    <Text style={styles.instruction}>Please enter your email address.</Text>
                    
                    <Layout style={styles.layoutContainer}>
                        <Input
                            placeholder='Email'
                            onChangeText={val => this.onChangeText('email', val)} 
                            style={styles.input}
                        />
                    </Layout>                    
                    <Button style={styles.button} status='primary' onPress={() => {this.onSubmit()}}>
                        Send
                    </Button>
                    
                </Card>
                
            </View>
		    
        )
	}
}

const styles = StyleSheet.create({	
    container: {
        height: SIZES.height
    },
	image: {
        width: SIZES.width, 
        resizeMode: 'cover', 
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 5,
        marginTop: 30,
        marginBottom: 15
    },
    instruction: {
        fontSize: 14,
        fontStyle: 'normal',
        marginLeft: 5,
        marginBottom: 15
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5
    },
    captionText: {
        fontSize: 12,
        fontWeight: "400",
        fontFamily: "opensans-regular",
        color: "#8F9BB3",
    },
    
    button: {
        margin: 4,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        marginTop: SIZES.height * 0.39,
    },
    layoutContainer: {
        marginTop: 15
    },
    input: {
        margin: 5,
    },
    divider: {
        marginTop: 15,
        marginBottom: 20
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
});

/**
 * Function to map state to Component props.
 */
 const mapStateToProps = (inState) => {
	return {
		user: inState.user,
	};
};


// Export components.
export default connect(mapStateToProps, {setUserData})(ForgotPassword);