import React from 'react';
import { StyleSheet, StatusBar, View, TouchableWithoutFeedback, Image, TouchableOpacity, ActivityIndicator, PermissionsAndroid} from "react-native";
import { Card, Text, Input, Icon, Button, Layout, Divider } from '@ui-kitten/components';
import { Dialog } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TouchID from 'react-native-touch-id';
import Socket from "../../../../api/socket";
import { connect } from 'react-redux';
import { setUserData } from "../../../../store/actions/authActions";
import { loginUserAPI, loginUserWithBiometricsAPI } from '../../../../api';
import { COLORS, SIZES } from '../../../../constants/index';
import SplashScreen from 'react-native-splash-screen';
import { setCoinData } from "../../../../store/actions/coinAction";
import Geolocation from 'react-native-geolocation-service';

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
);
const SendIcon = (props) => (
    <Icon {...props} name='arrow-forward-outline'/>
);

class Login extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            longitude: null,
            latitude: null,
            email: '',
			password: '',
            secureTextEntry: true,
            errMsg: '',
            alertVisible: false,
            spinnerVisible: false,
            biometricSupport: false,
            coinDataRecieved: false
		};
		
	} /* End constructor. */

	onChangeText  = (key, val) => {
		this.setState({ [key]: val })
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

    hideDialog = () => {
        this.setState({alertVisible: false });
    }

    toRegister = () => {
		this.props.navigation.navigate('Register');
	}
    toForgotPassword = () => {
		this.props.navigation.navigate('ForgotPassword');
	}

	onSubmit = (type) => {	
        this.setState({spinnerVisible: true});

        if(this.state.latitude === null || this.state.longitude === null){
            this.setState({spinnerVisible: false});
            this.setState({errMsg: 'Please permit app to use GPS to continue.' });
            this.setState({alertVisible: true });
        } else {
            if(type === 'biometry'){
                if(this.props.user && this.props.user.id){
                    let userLogin = {
                        id: this.props.user.id,
                    }

                    loginUserWithBiometricsAPI(userLogin).then(
                        ({ data, status }) => {
                            if(data.status == 200){                            
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

                                this.props.navigation.navigate('app');
                            } else {
                                this.setState({spinnerVisible: false});
                                this.setState({errMsg: data.msg });
                                this.setState({alertVisible: true });
                            }
                        },
                        (err) => {
                            this.setState({spinnerVisible: false});
                            this.setState({errMsg: 'Invalid Login.' });
                            this.setState({alertVisible: true });
                        }
                    )
                }
            } else {
                let email = this.state.email.trim();
                let password = this.state.password.trim()
                if(email != '' && password != ''){
                    let userLogin = {
                        email: email,
                        password: password,
                    }

                    loginUserAPI(userLogin).then(
                        ({ data, status }) => {
                            if(data.status == 200){                            
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

                                this.props.navigation.navigate('app');
                            } else {
                                this.setState({spinnerVisible: false});
                                this.setState({errMsg: data.msg });
                                this.setState({alertVisible: true });
                            }
                        },
                        (err) => {
                            // alert('Invalid Username/password.');
                            this.setState({spinnerVisible: false});
                            this.setState({errMsg: 'Invalid Username/password.' });
                            this.setState({alertVisible: true });
                        }
                    )
                } else {
                    this.setState({spinnerVisible: false});
                    this.setState({errMsg: 'Please enter email & password.' });
                    this.setState({alertVisible: true });
                }
            }
        }
	}

	isBiometricsSupported = () => {
        const optionalConfigObject = {
            title: 'Unlock to access japtini', // Android
            imageColor: COLORS.yelo, // Android
            imageErrorColor: '#ff0000', // Android
            sensorDescription: 'Touch sensor', // Android
            sensorErrorDescription: 'Failed', // Android
            cancelText: 'Cancel', // Android
            fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
            unifiedErrors: false, // use unified error messages (default false)
            passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
        };

        TouchID.isSupported(optionalConfigObject)
        .then(biometryType => {
            
            // Success code
            if (biometryType === true && this.props.user.id) {
                TouchID.authenticate('You can cancel to login with your email.', optionalConfigObject)
                .then(success => {
                    this.onSubmit('biometry')
                })
                .catch(error => {
                    this.setState({spinnerVisible: false});
                    this.setState({errMsg: 'Authentication Failed'});
                    this.setState({alertVisible: true });
                });
            } 

            SplashScreen.hide();
        })
        .catch(error => {
            // Failure code
            console.log(error);
        });
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
	
	componentDidMount() {
		StatusBar.setBarStyle('light-content');
		StatusBar.setBackgroundColor(COLORS.primary);

        this.currentLocation();

        this.isBiometricsSupported();  
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
                <Card style={styles.card}>
                    <Text style={styles.heading}>Login in to your account</Text>
                    <Input
                        placeholder='Email'
                        onChangeText={val => this.onChangeText('email', val)} 
                        style={styles.input}
                    />

                    <Input
                        placeholder='Password'
                        // caption={renderCaption}
                        accessoryRight={renderIcon}
                        secureTextEntry={this.state.secureTextEntry}
                        onChangeText={val => this.onChangeText('password', val)} 
                        style={styles.input}
                    />
                
                
                    <Divider style={styles.divider}/>
                    <Layout style={styles.layoutContainer}>
                        <Layout style={styles.layout} level='1'>
                            <TouchableOpacity onPress={() => {this.toRegister()}}> 
                                <Text style = {styles.navBtnText}>
                                    Create an account
                                </Text>
                            </TouchableOpacity>
                        </Layout>
                        <Layout style={styles.layout} level='1'>
                            <TouchableOpacity onPress={() => {this.toForgotPassword()}}> 
                                <Text style = {styles.navBtnText}>
                                Forgot Password?
                                </Text>
                            </TouchableOpacity>
                        </Layout>

                    </Layout>
                    <Divider style={styles.divider}/>
                    <Button style={styles.button} status='primary' accessoryRight={SendIcon} onPress={() => {this.onSubmit('normal')}}>
                        Continue
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
            </KeyboardAwareScrollView>		    
        )
	}
}

const styles = StyleSheet.create({	
    container: {
        height: SIZES.height,
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        height: SIZES.height * 0.455
    },
    banner: {
        backgroundColor: COLORS.primary,
        flex: 1,
        justifyContent: 'center'
    },
	image: {
        width: SIZES.width, 
        resizeMode: 'contain',
        
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 5,
        marginBottom: 10
    },
    navBtn: {
        flex: 1, 
        paddingVertical: 15, 
    },
    navBtnText: {
        color: COLORS.primary,
        fontSize: 14
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
    input: {
        margin: 5,
    },
    tranparentBtn: {
        color: COLORS.primary
    },
    button: {
        margin: 2,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        marginBottom: 28
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
export default connect(mapStateToProps, {setUserData, setCoinData})(Login);