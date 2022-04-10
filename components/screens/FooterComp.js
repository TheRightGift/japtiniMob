import React from 'react';
import { StyleSheet} from "react-native";
import {appColorSecondary, appColorPrimary, appColorTertiary} from '../../app.json';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

class FooterComp extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {
		super(inProps);
		this.state = {
            
		};
	} /* End constructor. */
		
	componentDidMount() {
		
  	}; /* End componentDidMount(). */

	render() {     
        
        return(
            <Footer>
                <FooterTab style={styles.footer}>
                    <Button vertical>
                        <Icon style={styles.secAppThemeText} type="MaterialCommunityIcons" name="wallet" />
                        {/* <Text style={styles.secAppThemeText}>Wallet</Text> */}
                    </Button>
                    <Button vertical>
                        <Icon style={styles.secAppThemeTextLite} type="MaterialCommunityIcons" name="account-outline" />
                        {/* <Text style={styles.secAppThemeTextLite}>Profile</Text> */}
                    </Button>
                    <Button vertical>
                        <Icon style={styles.secAppThemeTextLite} type="MaterialCommunityIcons" name='bell-outline' />
                        {/* <Text style={styles.secAppThemeTextLite}>Updates</Text> */}
                    </Button>
                </FooterTab>
            </Footer>
        )
	}
}

const styles = StyleSheet.create({	
    footer: {
        backgroundColor: '#fff'
    },
    secAppThemeText: {
        color: appColorSecondary
    },
    secAppThemeTextLite: {
        color: '#a7a2e0'
    }
});

// Export components.
export default FooterComp;