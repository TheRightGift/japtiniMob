import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Image, TouchableWithoutFeedback, ActivityIndicator} from "react-native";
import { Card, Text, Icon, Button, Layout } from '@ui-kitten/components';
import { Dialog } from 'react-native-paper';
import { connect } from 'react-redux';
import { COLORS, SIZES } from '../../../../constants/index';
import { verifyOTP } from '../../../../api';
// import { BASE_URL } from '../../../../config/';
// import axios from 'axios';

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
);
const SendIcon = (props) => (
    <Icon {...props} name='paper-plane-outline'/>
);

class VerifyEmail extends Component {

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
            errMsg: '',
            alertVisible: false,
            spinnerVisible: false
		};
		
	} /* End constructor. */

    spinner = () => {
        if (this.state.spinnerVisible) {
            return (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size='large' color={COLORS.primary}/>
                </View>
            );
        } else {
            return null;
        }
        
    }

	onChangeText  = (key, val) => {
        
        if(isNaN(val)){
            this.setState({errMsg: 'Numbers only' });
            this.setState({alertVisible: true });
            this.setState({ [key]: ''});
        } else {   
            this.setState({ [key]: val });
        }		
	}

	onSubmit = (e) => {	
        this.setState({spinnerVisible: true});
        if(this.state.otpOne != '' && this.state.otpTwo != '' && this.state.otpThree != '' && this.state.otpFour != '' && this.state.otpFive != '' && this.state.otpSix != ''){
            let otp = this.state.otpOne+this.state.otpTwo+this.state.otpThree+this.state.otpFour+this.state.otpFive+this.state.otpSix
            let otpData = {
                userId: this.props.user.id,
                otp: otp,
                type: 'email'
            }

            // TODO: setup config for token
            
            verifyOTP(otpData, this.props.user.token).then(
                ({ data, status }) => {
                    if(data.status == 401){
                        this.setState({spinnerVisible: false});
                        this.setState({errMsg: data.msg });
                        this.setState({alertVisible: true });
                    }

                    if(status == 200){
                        this.setState({spinnerVisible: false});
                        this.props.navigation.navigate('AddProfile');
                    }
                },
                (err) => {
                    console.log(err);
                }
            )
        } else {
            this.setState({spinnerVisible: false});
            this.setState({errMsg: 'Enter 6-digit OTP' });
            this.setState({alertVisible: true });
        }
        
	}

    processOTP = (otp, pos) => {
        if(otp !== ''){
            return otp.slice(pos, 1);
        } else {
            return '';
        }
        
    }

    hideDialog = () => {
        this.setState({alertVisible: false });
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
                <Card style={styles.container}>
                    <Image source={require("../../../../img/authBackground.png")} style={styles.image} />
                    <Text style={styles.heading}>Verify Email</Text>
                    <Text style={styles.instruction}>Please enter the 6-digits OTP sent to your email to complete verification.</Text>
                    
                    <Layout style={styles.layoutContainer}>
                        <Layout style={styles.oneSixth} level='1'>
                            <TextInput
                                onChangeText={val => this.onChangeText('otpOne', val)} 
                                style={styles.textInput} 
                                maxLength={1} 
                                keyboardType={'numeric'} 
                                value={this.state.otpOne}
                            />
                        </Layout>
                        <Layout style={styles.oneSixth} level='1'>
                            <TextInput
                                onChangeText={val => this.onChangeText('otpTwo', val)} 
                                style={styles.textInput} 
                                maxLength={1} 
                                keyboardType={'numeric'} 
                                value={this.state.otpTwo}
                            />
                        </Layout>
                        <Layout style={styles.oneSixth} level='1'>
                            <TextInput
                                onChangeText={val => this.onChangeText('otpThree', val)} 
                                style={styles.textInput} 
                                maxLength={1} 
                                keyboardType={'numeric'} 
                                value={this.state.otpThree}
                            />
                        </Layout>
                        <Layout style={styles.oneSixth} level='1'>
                            <TextInput
                                onChangeText={val => this.onChangeText('otpFour', val)} 
                                style={styles.textInput} 
                                maxLength={1} 
                                keyboardType={'numeric'} 
                                value={this.state.otpFour}
                            />
                        </Layout>
                        <Layout style={styles.oneSixth} level='1'>
                            <TextInput
                                onChangeText={val => this.onChangeText('otpFive', val)} 
                                style={styles.textInput} 
                                maxLength={1} 
                                keyboardType={'numeric'} 
                                value={this.state.otpFive}
                            />
                        </Layout>
                        <Layout style={styles.oneSixth} level='1'>
                            <TextInput
                                onChangeText={val => this.onChangeText('otpSix', val)} 
                                style={styles.textInput} 
                                maxLength={1} 
                                keyboardType={'numeric'} 
                                value={this.state.otpSix}
                            />
                        </Layout>
                    </Layout>                    
                    <Button style={styles.button} status='primary' onPress={() => {this.onSubmit()}}>
                        Verify
                    </Button>
                    
                </Card>
                <Dialog visible={this.state.alertVisible} onDismiss={this.hideDialog}>
                    <Dialog.Content style={[styles.red]}>
                        <View style={styles.dialog}>
                            <Text style={[styles.alertInnerText]}>{this.state.errMsg}</Text>
                            <TouchableWithoutFeedback onPress={this.hideDialog} style={styles.alertIcon}>
                                <Icon
                                    style={[styles.icon]}
                                    fill={COLORS.white}
                                    name='close-outline'
                                />
                            </TouchableWithoutFeedback>
                        </View>                        
                    </Dialog.Content>
                </Dialog>
                {this.spinner()}
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
    oneSixth: {
        width: SIZES.width * 0.12,
        height: SIZES.height * 0.08,
        marginHorizontal: 5
    },
    textInput: {
        flex: 1,
        borderColor: '#EBEBEB',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#FDFDFD',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 24
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
        margin: 2,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        marginTop: SIZES.height * 0.13,
    },
    layoutContainer: {
        flexDirection: 'row',
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
    dialog: {
        padding: 0,
        flexDirection: 'row'
    },  
    alertInnerText: {
        width: SIZES.width * 0.7,
        lineHeight: 20,
        color: COLORS.white
    },  
    red : {
        backgroundColor: 'red'
    },
    spinnerContainer: {
        height: SIZES.height,
        width: SIZES.width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    icon: {
        width: 20,
        height: 20,
    }
    
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
export default connect(mapStateToProps)(VerifyEmail);