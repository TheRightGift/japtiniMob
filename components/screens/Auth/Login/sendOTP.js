import React from 'react';
import { StyleSheet, StatusBar, View, ActivityIndicator, TouchableWithoutFeedback, Image, TouchableOpacity} from "react-native";
import { Card, Text, TopNavigation, Input, Icon, Button, Layout, Divider } from '@ui-kitten/components';
import { Dialog } from 'react-native-paper';
import { connect } from 'react-redux';
import { setUserData } from "../../../../store/actions/authActions";
import { verifyPhone } from '../../../../api';
import { COLORS, SIZES } from '../../../../constants/index';

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
);
const SendIcon = (props) => (
    <Icon {...props} name='paper-plane-outline'/>
);

class SendOTP extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            phone: null,
            prefix: '+234',
            errMsg: '',
            alertVisible: false,
            spinnerVisible: false
		};
		
	} /* End constructor. */

	onChangeText  = (key, val) => {
        if(isNaN(val)){
            alert('Numbers only');
            this.setState({phone: null});
        } else {
            if(val.charAt(0) == 0){
                val = val.substring(1);;
            }
            this.setState({ [key]: val })
        }		
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

	onSubmit = (e) => {	
        this.setState({spinnerVisible: true});
        if(this.state.phone != null){
            let phone = this.state.prefix+this.state.phone;
            
            let userData = {
                userId: this.props.user.id,
                phone: phone,
                type: 'phone'
            }

            // TODO: setup config for token
            
            verifyPhone(userData).then(
                ({ data, status }) => {
                    console.log(data, status);
                    if(data.status == 401){
                        this.setState({spinnerVisible: false});
                        this.setState({errMsg: data.msg });
                        this.setState({alertVisible: true });
                    }

                    if(data.status == 200){
                        this.setState({spinnerVisible: false});
                        this.props.navigation.navigate('ActivateAccount');
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
                    <Text style={styles.heading}>Welcome</Text>
                    <Text style={styles.instruction}>Type in your phone number to Sign Up</Text>
                    
                    <Layout style={styles.layoutContainer}>
                        <Layout style={styles.oneThird} level='1'>
                            <Input
                                placeholder='+234'
                                onChangeText={val => this.onChangeText('prefix', val)} 
                                style={styles.input} 
                                value={this.state.prefix} 
                                disabled
                            />
                        </Layout>
                        <Layout style={styles.layout} level='1'>
                            <Input
                                placeholder='80312345678'
                                onChangeText={val => this.onChangeText('phone', val)} 
                                style={styles.input} 
                                maxLength={10} 
                                keyboardType={'numeric'} 
                                value={this.state.phone} 
                            />
                        </Layout>
                    </Layout>
                    <Divider style={styles.divider}/>
                    <Button style={styles.button} status='primary' accessoryRight={SendIcon} onPress={() => {this.onSubmit()}}>
                        Send OTP
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
export default connect(mapStateToProps, {setUserData})(SendOTP);