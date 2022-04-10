import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image} from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Content, ListItem, List } from 'native-base';
import { connect } from 'react-redux';
import ComingSoon from './ComingSoon';

class Profile extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            user : this.props.user
		};
		
	} /* End constructor. */

	goToAccounts = () => {
		let names = this.state.user.firstname+' '+this.state.user.lastname;
		this.props.navigation.navigate('Account', {names : names, email: this.state.user.email, phone: this.state.user.phone, password: this.state.user.password});
		// this.props.navigation.navigate('Profile');
	}

	goToSecurity = () => {
		this.props.navigation.navigate('Security');
	}

	componentDidMount() {
		
  	}; /* End componentDidMount(). */

	render() {        		
        return(
            <ComingSoon/>
        )
	}
}

const styles = StyleSheet.create({	
    
});

/**
 * Function to map state to Component props.
 */
 const mapStateToProps = (inState) => {
	return {
		coin: inState.coinReducer.coin,
		user: inState.authReducer.user
	};
};


// Export components.
export default connect(mapStateToProps)(Profile);