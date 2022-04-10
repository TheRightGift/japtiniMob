import React from 'react';
import { StyleSheet, StatusBar, View, Dimensions, TouchableWithoutFeedback} from "react-native";
import { Card, Text, TopNavigation, Input, Icon, Button, Layout } from '@ui-kitten/components';

let { width, height } = Dimensions.get('window');
const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
);
const SendIcon = (props) => (
    <Icon {...props} name='paper-plane-outline'/>
);

class VerifyDevice extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            email: '',
			phone: '',
            securePhoneEntry: false,
            secureEmailEntry: false,
		};
		
	} /* End constructor. */

	onChangeText  = (key, val) => {
		this.setState({ [key]: val })
	}

    // toLogin = () => {
	// 	this.props.navigation.navigate('Login');
	// }

	onSubmit = (e) => {	
	}

	login(){
	}

	loggedOut = () => {       
    }

	loginErr(){
		
	}
	
	componentDidMount() {
		StatusBar.setBarStyle('light-content');
		StatusBar.setBackgroundColor('#ea4335');
  	}; /* End componentDidMount(). */

	render() {
        const toggleSecureEntryPhone = () => {
            this.setState({ securePhoneEntry: !this.state.securePhoneEntry });
        };
    
        const renderIconPhone = (props) => (
            <TouchableWithoutFeedback onPress={toggleSecureEntryPhone}>
                <Icon {...props} name={this.state.securePhoneEntry ? 'eye-off' : 'eye'}/>
            </TouchableWithoutFeedback>
        );
    
        const renderCaptionPhone = () => {
            return (
                <View style={styles.captionContainer}>
                    {AlertIcon(styles.captionIcon)}
                    <Text style={styles.captionText}>Press 'send' button to send PIN to Phone.</Text>
                </View>
            )
        }
        const toggleSecureEntryEmail = () => {
            this.setState({ secureEmailEntry: !this.state.secureEmailEntry });
        };
    
        const renderIconEmail = (props) => (
            <TouchableWithoutFeedback onPress={toggleSecureEntryEmail}>
                <Icon {...props} name={this.state.secureEmailEntry ? 'eye-off' : 'eye'}/>
            </TouchableWithoutFeedback>
        );
    
        const renderCaptionEmail = () => {
            return (
                <View style={styles.captionContainer}>
                    {AlertIcon(styles.captionIcon)}
                    <Text style={styles.captionText}>Press 'send' button to send PIN to email.</Text>
                </View>
            )
        }
        return(
            <View>
                <TopNavigation alignment='center' title='Device Verification' style={styles.header}/>
                <Card>
                    

                    
                    <Layout style={styles.layoutContainer}>
                        <Layout style={styles.layout, styles.verifyInput} level='1'>
                            <Input
                                label='Verify Email'
                                placeholder='6 digit PIN'
                                caption={renderCaptionEmail}
                                accessoryRight={renderIconEmail}
                                secureTextEntry={this.state.secureEmailEntry}
                                onChangeText={val => this.onChangeText('email', val)} 
                                style={styles.input}
                            />
                        </Layout>
                        <Layout style={styles.layout, styles.verifyBtn} level='1'>
                            <Button style={styles.verifyBtnButton} size='small'>
                                Send
                            </Button>
                        </Layout>
                    </Layout>

                    <Layout style={styles.layoutContainer}>
                        <Layout style={styles.layout, styles.verifyInput} level='1'>
                            <Input
                                label='Verify Phone'
                                placeholder='6 digit PIN'
                                caption={renderCaptionPhone}
                                accessoryRight={renderIconPhone}
                                secureTextEntry={this.state.securePhoneEntry}
                                onChangeText={val => this.onChangeText('phone', val)} 
                                style={styles.input}
                            />
                        </Layout>
                        <Layout style={styles.layout, styles.verifyBtn} level='1'>
                            <Button style={styles.verifyBtnButton} size='small'>
                                Send
                            </Button>
                        </Layout>
                    </Layout>
                </Card>
            </View>
        )
	}
}

const styles = StyleSheet.create({	
	header: {
        backgroundColor: '#ea4335',
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
    },
    layoutContainer: {
        marginTop: 30,
        flexDirection: 'row',
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifyInput: {
        width: '80%'
    },
    verifyBtn: {
        width: '20%'
    },
    verifyBtnButton: {
        paddingVertical: 10,
        marginTop: 25
    }
});

export default VerifyDevice;