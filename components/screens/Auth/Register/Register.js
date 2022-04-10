import React from 'react';
import { ActivityIndicator, StyleSheet, StatusBar, View, Image, TouchableWithoutFeedback, PermissionsAndroid} from "react-native";
import { Card, Text, Input, Icon, Button, Layout, Divider, CheckBox, Spinner } from '@ui-kitten/components';
import { Dialog } from 'react-native-paper';
import { COLORS, SIZES } from '../../../../constants/index';
import { connect } from 'react-redux';
import { setUserData } from "../../../../store/actions/authActions";
import { registerUserAPI } from '../../../../api';
import { MomentDateService } from '@ui-kitten/moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geolocation from 'react-native-geolocation-service';

class Register extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            longitude: null,
            latitude: null,
            visible: false,
            email: '',
            names: '',
            phone: '',
            username: '',
            passLower: false,
            passUpper: false,
            passSymbol: false,
            passNum: false,
            passLen: false,
            password: '',
            cPassword: '',
            secureTextEntry: true,
            activeChecked: false,
            errMsg: '',
            alertVisible: false,
            spinnerVisible: false
		};
		
	} /* End constructor. */

	onChangeText  = (key, val) => {
        if(key === 'password'){
            if(val.length > 11){
                this.setState({passLen: true});
            }

            if(/\d/.test(val)){
                this.setState({passNum: true});
            }

            let format = /[!@#$%^*_?]+/;

            if(format.test(val)){
                this.setState({passSymbol: true});
            } 

            if(/[a-z]/.test(val)){
                // passUpper
                this.setState({passLower: true});
            }

            if(/[A-Z]/.test(val)){
                //passLower
                this.setState({passUpper: true});
            }
        }
        
		this.setState({[key]: val });
	}

    toLogin = () => {
		this.props.navigation.navigate('Login');
	}

    toVerifyEmail = () => {
        this.props.navigation.navigate('VerifyEmail');
    }

    currentLocation = async  () => {
        const hasLocationPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    this.setState({latitude: position.coords.latitude });
                    this.setState({longitude: position.coords.longitude });
                    console.log(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                  // See error code charts below.
                  console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    }

	onSubmit = (e) => {	
        this.setState({spinnerVisible: true});
        this.setVisible(true);
        if(this.state.latitude === null || this.state.longitude === null){
            this.setState({spinnerVisible: false});
            this.setState({errMsg: 'Please permit app to use GPS to continue.' });
            this.setState({alertVisible: true });
        } else {
            let email = this.state.email.trim();
            let names = this.state.names.trim();
            let longitude = this.state.longitude;
            let latitude = this.state.latitude;
            let phone = this.state.phone.trim();
            let username = this.state.username.trim();
            let password = this.state.password.trim();
            let cPassword = this.state.cPassword.trim();

            if(email == ''){
                this.setState({spinnerVisible: false});
                this.setState({errMsg: 'Please provide your email.' });
                this.setState({alertVisible: true });
                // alert('Please provide your email.')
            } else if(username == ''){
                this.setState({spinnerVisible: false});
                this.setState({errMsg: 'Please provide your username.' });
                this.setState({alertVisible: true });
            } else if(phone == ''){
                this.setState({spinnerVisible: false});
                this.setState({errMsg: 'Please provide your phone number.' });
                this.setState({alertVisible: true });
            } else if(names == ''){
                this.setState({spinnerVisible: false});
                this.setState({errMsg: 'Please provide your names.' });
                this.setState({alertVisible: true });
            } else if(password == '' || !this.state.passLower || !this.state.passUpper || !this.state.passSymbol || !this.state.passNum || !this.state.passLen){
                this.setState({spinnerVisible: false});
                this.setState({errMsg: 'Invalid password!' });
                this.setState({alertVisible: true });
            } else if(password != cPassword ) {
                this.setState({spinnerVisible: false});
                this.setState({errMsg: 'passwords do not match!' });
                this.setState({alertVisible: true });
            } else if(!this.state.activeChecked){
                this.setState({spinnerVisible: false});
                this.setState({errMsg: 'Terms and Conditions Please!' });
                this.setState({alertVisible: true });
            } else {
                let userReg = {
                    username: username,
                    latitude: latitude,
                    longitude: longitude,
                    phone: phone,
                    names: names,
                    email: email,
                    password: password,
                }

                registerUserAPI(userReg).then(
                    ({ data, status }) => {
                        if(status == 200){
                            if(data.msg == 'User Exists'){
                                this.setState({spinnerVisible: false});
                                this.setState({errMsg: 'Pls go back and login!' });
                                this.setState({alertVisible: true });

                                setTimeout(() => {
                                    this.setState({errMsg: '' });
                                    this.setState({alertVisible: false });
                                    this.props.navigation.navigate('Login');
                                }, 4000);
                            } else {
                                let userData = {
                                    id: data.user._id,
                                    longitude: data.user.longitude,
                                    latitude: data.user.latitude,
                                    email: data.user.email,
                                    names: data.user.names,
                                    username: data.user.username,
                                    phone: data.user.phone,
                                    emailVerified: data.user.emailVerified,
                                    phoneVerified: data.user.phoneVerified,
                                    password: data.user.password,
                                    token: data.token
                                }
                                
                                this.props.setUserData(userData);
                                this.setState({spinnerVisible: false});
                                this.setVisible(false);
                                this.props.navigation.navigate('Welcome');
                            }
                        }
                        
                    },
                    (err) => {
                        this.setState({spinnerVisible: false});
                        console.log(err);
                        this.setState({errMsg: 'User not registered!' });
                        this.setState({alertVisible: true });
                        // alert('User not registered. Please login if you already own an account or try again later.');
                    }
                )
            }
        }        
	}

    hideDialog = () => {
        this.setState({alertVisible: false });
    }

    agreeTandC = () => {
        this.setState({activeChecked: !this.state.activeChecked});
    }

	setVisible(val){
		this.setState({visible: val });
	}

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

    passLenInstruction = () => {
        if(this.state.passLen){
            return(
                [styles.passwordInstructions, styles.greenInstruction]
            )
        } else {
            return(
                [styles.passwordInstructions, styles.grayInstruction]
            )
        }
    }

    passNumInstruction = () => {
        if(this.state.passNum){
            return(
                [styles.passwordInstructions, styles.greenInstruction]
            )
        } else {
            return(
                [styles.passwordInstructions, styles.grayInstruction]
            )
        }
    }

    passSymbolInstruction = () => {
        if(this.state.passSymbol){
            return(
                [styles.passwordInstructions, styles.greenInstruction]
            )
        } else {
            return(
                [styles.passwordInstructions, styles.grayInstruction]
            )
        }
    }

    passUpperInstruction = () => {
        if(this.state.passUpper){
            return(
                [styles.passwordInstructions, styles.greenInstruction]
            )
        } else {
            return(
                [styles.passwordInstructions, styles.grayInstruction]
            )
        }
    }

    passLowerInstruction = () => {
        if(this.state.passLower){
            return(
                [styles.passwordInstructions, styles.greenInstruction]
            )
        } else {
            return(
                [styles.passwordInstructions, styles.grayInstruction]
            )
        }
    }
	
	componentDidMount() {
		StatusBar.setBarStyle('light-content');
		StatusBar.setBackgroundColor(COLORS.primary);

        this.currentLocation();
  	}; /* End componentDidMount(). */

	render() {
        const toggleSecureEntry = () => {
            this.setState({ secureTextEntry: !this.state.secureTextEntry });
        };
    
        const renderIcon = (props) => (
            <TouchableWithoutFeedback onPress={toggleSecureEntry}>
                <Icon {...props} name={this.state.secureTextEntry ? 'eye-off' : 'eye'}/>
            </TouchableWithoutFeedback>
        );
            
        return(
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={styles.container} scrollEnabled={false}>
                <Layout style={styles.banner}>
                    <Image source={require("../../../../img/japtini.png")} style={styles.image} />
                </Layout>
                <Card>                   
                    <Text style={styles.heading}>Create Login Details</Text>

                    <Input
                        placeholder='Names'
                        onChangeText={val => this.onChangeText('names', val)} 
                        style={styles.input}
                    />
                    <Input
                        placeholder='Username'
                        onChangeText={val => this.onChangeText('username', val)} 
                        style={styles.input}
                    />
                    <Input
                        placeholder='Phone Number'
                        onChangeText={val => this.onChangeText('phone', val)} 
                        style={styles.input}
                    />
                    <Input
                        placeholder='Email'
                        onChangeText={val => this.onChangeText('email', val)} 
                        style={styles.input}
                    />

                    <Input
                        placeholder='Password'
                        accessoryRight={renderIcon}
                        secureTextEntry={this.state.secureTextEntry}
                        onChangeText={val => this.onChangeText('password', val)} 
                        style={styles.input}
                    />

                    <Input
                        placeholder='Confirm Password'
                        accessoryRight={renderIcon}
                        secureTextEntry={this.state.secureTextEntry}
                        onChangeText={val => this.onChangeText('cPassword', val)} 
                        style={styles.input}
                    />
                    
                    <Divider style={styles.divider}/>
                    <Layout>
                        <View style={styles.instructionWrapper}>
                            <Text style={this.passLenInstruction()}>12 Characters, Minimum</Text> 
                            <Text style={this.passNumInstruction()}>Number</Text>
                            <Text style={this.passSymbolInstruction()}>Symbols !@#$%^*_?</Text>
                            <Text style={this.passUpperInstruction()}>Upper-Case Letter</Text>
                            <Text style={this.passLowerInstruction()}>Lower-Case Letter</Text>
                        </View>
                        
                    </Layout>
                    
                    <Layout style={styles.bottomSection}>
                        <CheckBox
                            style={styles.radio}
                            checked={this.state.activeChecked}
                            onChange={() => {this.agreeTandC()}}>
                            <Text style={styles.termsAndCond}>By clicking on the sign up button, you are acknowledging to our terms and conditions.</Text>
                        </CheckBox>
                        
                        <Button style={styles.button} status='primary' onPress={() => {this.onSubmit()}}>
                            Create
                        </Button>
                    </Layout>
                    
                    <Dialog visible={this.state.alertVisible} onDismiss={this.hideDialog}>
                        <Dialog.Content style={[styles.red, styles.dialog]}>
                            <Text style={[styles.alertInnerText]}>{this.state.errMsg}</Text>
                            <TouchableWithoutFeedback onPress={this.hideDialog} style={styles.alertIcon}>
                                <Icon
                                    style={[styles.icon]}
                                    fill={COLORS.white}
                                    name='close-outline'
                                />
                            </TouchableWithoutFeedback>
                        </Dialog.Content>
                    </Dialog>

                    {this.spinner()}
                </Card>
            </KeyboardAwareScrollView>            
        )
	}
}

const styles = StyleSheet.create({	
    container: {
        height: SIZES.height,
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
    heading: {
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 5,
        marginTop: 0,
        marginBottom: 10
    },
    instructionWrapper: {
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },  
    passwordInstructions: {
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginHorizontal: 7,
        marginBottom: 7
    },
    grayInstruction: {
        backgroundColor: '#E5E5E5'
    },
    greenInstruction: {
        backgroundColor: '#35AA45'
    },
    bottomSection: {
        marginTop: SIZES.height * 0.13,
    },
    termsAndCond: {
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 12,
    },
    input: {
        marginVertical: 6,
        marginHorizontal: 5
    },
    button: {
        margin: 2,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary        
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
    radio: {
        marginBottom: 12
    },
    icon: {
        width: 20,
        height: 20,
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
    }
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
export default connect(mapStateToProps, {setUserData})(Register);