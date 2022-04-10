import React from 'react';
import { StyleSheet, StatusBar, Image, ActivityIndicator, View, TouchableWithoutFeedback} from "react-native";
import { Card, Text, Input, Icon, Button, Layout, Divider, Spinner } from '@ui-kitten/components';
import { Dialog } from 'react-native-paper';
import { COLORS, SIZES } from '../../../../constants/index';
import { connect } from 'react-redux';
import { setUserData } from "../../../../store/actions/authActions";
import { editUser } from '../../../../api';

class AddProfile extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            firstname: '',
            lastname: '',
            username: '',
            errMsg: '',
            alertVisible: false,
            spinnerVisible: false
		};
		
	} /* End constructor. */

	onChangeText  = (key, val) => {
		this.setState({[key]: val });
	}

	onSubmit = (e) => {	
        this.setState({spinnerVisible: true});
        if(this.state.firstname != '' && this.state.lastname != '' && this.state.username != ''){
            let userData = {
                firstname: this.state.firstname.trim(),
                lastname: this.state.lastname.trim(),
                username: this.state.username.trim()
            }

            editUser(userData, this.props.user.id).then(
                ({ data, status }) => {
                    if(data.status == 401){
                        this.setState({spinnerVisible: false});
                        this.setState({errMsg: data.msg });
                        this.setState({alertVisible: true });
                    }

                    if(data.status == 201){
                        let userData = {
                            id: data.user._id,
                            email: data.user.email,
                            emailVerified: data.user.emailVerified,
                            phoneVerified: data.user.phoneVerified,
                            password: data.user.password,
                            token: data.token,
                            username: data.user.username,
                            firstname: data.user.firstname,
                            lastname: data.user.lastname,
                        }
                        
                        this.props.setUserData(userData);
                        this.setState({spinnerVisible: false});
                        this.props.navigation.navigate('Welcome');
                    }
                },
                (err) => {
                    this.setState({spinnerVisible: false});
                    this.setState({errMsg: 'Network/Server error.' });
                    this.setState({alertVisible: true });
                }
            )
        } else {
            this.setState({spinnerVisible: false});
            this.setState({errMsg: 'Please enter your names.' });
            this.setState({alertVisible: true });
        }
     
	}

    hideDialog = () => {
        this.setState({alertVisible: false });
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
	
	componentDidMount() {
		StatusBar.setBarStyle('dark-content');
		StatusBar.setBackgroundColor('#fff');
  	}; /* End componentDidMount(). */

	render() {
            
        return(
            <View>
                <Card style={styles.container}>
                    <Image source={require("../../../../img/authBackground.png")} style={styles.image} />
                    <Text style={styles.heading}>One more Step</Text>
                    <Text style={styles.instruction}>Please Add your profile data</Text>

                    <Input
                        placeholder='First Name'
                        onChangeText={val => this.onChangeText('firstname', val)} 
                        style={styles.input}
                    />

                    <Input
                        placeholder='Last Name'
                        onChangeText={val => this.onChangeText('lastname', val)} 
                        style={styles.input}
                    />

                    <Input
                        placeholder='Unique Userame'
                        onChangeText={val => this.onChangeText('username', val)} 
                        style={styles.input}
                    />
                    <Layout>
                        <Text style={styles.warning}>
                            <Icon style={styles.icon} fill='#8F9BB3' name='alert-circle-outline'/>
                            Please ensure that you type in your correct Name 
                        </Text>
                    </Layout>
                    <Divider style={styles.divider}/>
                    
                    
                    <Layout style={styles.bottomSection}>                    
                        <Button style={styles.button} status='primary' onPress={() => {this.onSubmit()}}>
                            Continue
                        </Button>
                        {/* <TouchableOpacity onPress={() => {}} style={styles.choiceContainer}> 
                            <Text style = {styles.choice}>
                                I’ll do this later
                            </Text>
                        </TouchableOpacity> */}
                    </Layout>              
                    
                </Card>
                <Dialog visible={this.state.alertVisible} onDismiss={this.hideDialog}>
                    <Dialog.Content style={[styles.red]}>
                        <View style={styles.dialog}>
                            <Text style={[styles.alertInnerText]}>{this.state.errMsg}</Text>
                            <TouchableWithoutFeedback onPress={this.hideDialog}>
                                <Icon
                                    style={[styles.alertIcon]}
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
    card: {
        height: SIZES.height
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 5,
        marginTop: 30,
        marginBottom: 15
    },
    warning: {
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 12,
        marginHorizontal: 7,
        marginVertical: 10
    },
    instruction: {
        fontSize: 14,
        fontStyle: 'normal',
        marginLeft: 5,
        marginBottom: 12
    },
    bottomSection: {
        marginTop: SIZES.height * 0.13,
    },
    input: {
        marginVertical: 7,
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
    icon: {
        width: 10,
        height: 10,
        marginRight: 7
    },
    choiceContainer: {
        marginTop: 40,
        fontSize: 18
    },
    choice: {
        textAlign: 'center'
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
    alertIcon: {
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
export default connect(mapStateToProps, {setUserData})(AddProfile);