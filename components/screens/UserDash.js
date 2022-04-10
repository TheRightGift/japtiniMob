import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView} from "react-native";
import { Card, Text, Input, Icon, Button, Layout, Divider } from '@ui-kitten/components';
import {appColorSecondary, appColorPrimary, appColorTertiary} from '../../app.json';
// import { Container, Button, Icon, Content, Footer, FooterTab } from 'native-base';
import { connect } from 'react-redux';
import Update from './Update/Update';
import Profile from './Profile/Profile';
import Wallet from './Wallet/Wallet';
import { COLORS, SIZES } from '../../constants/index';

let { width, height } = Dimensions.get('window');

class UserDash extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            selectedTab: 'Wallet'
		};
		
	} /* End constructor. */
    
    renderSelectedTab () {
        switch (this.state.selectedTab) {
          case 'Wallet':
            return (<Wallet coin={this.props.coin}/>);
            break;
          case 'Profile':
            return (<Profile user={this.props.user}/>);
            break;
          case 'Update':
            return (<Update />);
            break;
          default:
        }
    }
	componentDidMount() {
		
  	}; /* End componentDidMount(). */

	render() {        
        return(
            <Container>
                {this.renderSelectedTab()}
                <Footer>
                    <FooterTab style={styles.footer}>
                        <Button vertical onPress={() => this.setState({selectedTab: 'Wallet'})}>
                            {/* <Icon style={this.state.selectedTab == 'Wallet' ? styles.secAppThemeText : styles.secAppThemeTextLite} type="MaterialCommunityIcons" name="wallet" /> */}
                            <Icon style={styles.secAppThemeText} type="MaterialCommunityIcons" name="home-outline" />
                            <Text>Home</Text>
                        </Button>
                        <Button vertical onPress={() => this.setState({selectedTab: 'Profile'})}>
                            <Icon style={this.state.selectedTab == 'Profile' ? styles.secAppThemeText : styles.secAppThemeTextLite} type="MaterialCommunityIcons" name="account-outline" />
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Accounts')}>
                            <Icon style={this.state.selectedTab == 'Update' ? styles.secAppThemeText : styles.secAppThemeTextLite} type="MaterialCommunityIcons" name='bell-outline' />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
	}
}

const styles = StyleSheet.create({	
	appThemeText: {
        color: appColorPrimary
    },
    secAppThemeText: {
        color: appColorSecondary
    },
    footer: {
        backgroundColor: '#fff'
    },
    secAppThemeTextLite: {
        color: '#a7a2e0'
    }
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
export default connect(mapStateToProps)(UserDash);