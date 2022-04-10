import React from 'react';
import { StyleSheet, View, FlatList, Image, StatusBar, ImageBackground, TouchableWithoutFeedback, ActivityIndicator} from "react-native";
import { Icon, List, ListItem, Left, Body, Right, Thumbnail,Button } from 'native-base';
import { Layout, Text, Input} from '@ui-kitten/components';
import { getRetailers } from '../../api';
import SelectDropdown from 'react-native-select-dropdown';
import { connect } from 'react-redux';
import { COLORS, SIZES } from '../../constants';


class Sales extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            retailers: null
		};
		
	} /* End constructor. */

    handleViewableItemsChanged = ({viewableItems})=> {
        this.setState({currentPage: viewableItems[0].index });
    }

    userBalance = () => {
        return this.state.userBal
    }

    goToPin = () => {
        this.props.navigation.navigate('Pin');
    }

    threeDots = () => {
        return(
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 1,
                marginVertical: 7,
                justifyContent: 'center',
                width: SIZES.width * 0.9
            }}>
                {/* Pagination */}
                {
                    // No. of dots
                    [...Array(profileProgData.length)].map((_, index)=>(
                        <View
                            key={index} 
                            style={{
                                width: 7,
                                height: 7,
                                borderRadius: 5,
                                backgroundColor: index == this.state.currentPage ? COLORS.blu : COLORS.blu + '20',
                                marginRight: 8
                            }} />                            
                    ))
                }               
            </View>
        )        
    }

    renderFlatlistItem = ({item}) => {
        return (
            <ListItem thumbnail>
                <Left>
                    <Thumbnail source={require("../../img/profile.jpg")}/>
                </Left>
                <Body>
                    <Text>{item.companyname}</Text>
                    <Text note style={styles.greyText}>{item.address}</Text>
                </Body>
                <Right>
                    <Button transparent onPress={() => {this.props.navigation.navigate('MakeSale', item)}}>
                        <Text style={styles.blueTxt}>
                            <Icon type="MaterialCommunityIcons" name="chevron-right" />
                        </Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    getRetailer = () => {
        getRetailers().then(
            ({ data, status }) => {
                if(data.status == 200){    
                    // console.log(data.retailers);
                    this.setState({retailers: data.retailers});                        
                } else {
                    // this.setState({spinnerVisible: false});
                    // this.setState({errMsg: data.msg });
                    // this.setState({alertVisible: true });
                }
            },
            (err) => {
                // this.setState({spinnerVisible: false});
                // this.setState({errMsg: 'Invalid Username/password.' });
                // this.setState({alertVisible: true });
            }
        )
    }
    UNSAFE_componentWillMount(){
        StatusBar.setBarStyle('light-content');
		StatusBar.setBackgroundColor(COLORS.primary);
    }
	componentDidMount() {
        this.getRetailer();
  	}; /* End componentDidMount(). */

	render() {  
        
        return(
            <View style={styles.container}>
                <Layout style={[styles.headerRow, styles.appBackground]}>
                    <Layout style={[styles.headerImage, styles.appBackground]}>
                        <Image source={require("../../img/noProfileImg.png")} style={styles.image}/>
                    </Layout>
                    <Layout style={[styles.headerTextCont, styles.appBackground]}>
                        <Text style={styles.headerText}>Hi, {this.props.user.username}</Text>
                    </Layout>
                    <Layout style={[styles.headerIconCont, styles.appBackground]}>
                        <Icon type="MaterialCommunityIcons" name='bell' style={styles.headerIcon}/>
                    </Layout>
                </Layout>
                <Layout style={[styles.welcomeRow, styles.appBackground]}>
                    <Text style={styles.welcomeText}>
                        RETAILERS
                    </Text>
                </Layout>
                
                <Layout style={styles.inputRow}>
                    <Input
                    placeholder='Search Retailers'
                    onChangeText={() => {}}
                    />
                </Layout>
                <Layout>
                    <List>
                        <FlatList
                            data={this.state.retailers}
                            renderItem={this.renderFlatlistItem}
                            keyExtractor={item => item._id}
                        />
                    </List>
                    
                </Layout>
            </View>
        )
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        // paddingHorizontal: SIZES.width * 0.035,
        // paddingTop: 15,
    },  
    appBackground: {
        backgroundColor: COLORS.primary,
    },
    header: {
        paddingVertical: 15,
        backgroundColor: '#fff'
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: SIZES.height * 0.1,
        paddingHorizontal: SIZES.width * 0.035,
        paddingTop: 15,
    },
    inputRow: {
        paddingHorizontal: SIZES.width * 0.035,
    },
    image: {
		width: 42,
		height: 42,
		borderRadius: 42 / 2,
		borderWidth: 1,
		borderColor: "#ACACAC",
	},
    headerTextCont: {
        width: SIZES.width * 0.7,
        paddingLeft: 10
    },
    greyText: {
        fontSize: 12,
        color: '#c1c1c1',
        fontWeight: '700'
    },  
    headerText: {
        fontSize: 14,
        fontWeight: '700',
        fontStyle: 'normal',        
        color: '#fff'
    },
    welcomeRow: {
        marginBottom: 10
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 15,
        textAlign: 'center',
        color: '#fff'
    },
    headerIconCont: {
        width: SIZES.width * 0.12,
        alignItems: 'flex-end',
    },
    headerIcon: {
        fontSize: 21,
        color: '#fff'
    },  
    balBackgroundImg: {
        marginTop: SIZES.height * 0.018,
        width: SIZES.width * 0.93,
        height: SIZES.height * 0.2,
    },
    currencyRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        paddingTop: 5
    },  
    currencyDropdownBtnStyle: {
        width: SIZES.width * 0.27,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: SIZES.height * 0.04,
    },
    currencyDropdownStyle: {
        height: SIZES.height * 0.05,
    },
    currencyDropdownBtnTxtStyle: {
        color: COLORS.white,
        fontSize: 12,
    },
    balanceVisibleRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    balanceVisibleTxt: {
        fontSize: 14,
        paddingLeft: 15,
        marginRight: 15,
        color: '#fff'
    },
    icon: {
        fontSize: 20,
        color: '#fff'
    },
    userBalanceRow: {
        marginVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    userBalanceTxt: {
        paddingLeft: 15,
        fontSize: 24,
        fontWeight: '700',
        color: '#fff'
    },
    buttonRow: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 13
    },
    button: {
        width: SIZES.width * 0.3
    },
    coinActionRow: {
        flexDirection: 'row',
        marginVertical: 15
    },
    coinActionButton: {
        backgroundColor: COLORS.liteBlu,
        borderRadius: 10,
        width: SIZES.width * 0.3
    },
    coinActionButtonMdl: {
        marginHorizontal: SIZES.width * 0.014
    },
    profileProgressRow: {     
        flexDirection: 'row',
        paddingVertical: SIZES.height * 0.01 
    },
    profileProgressRowBackgroundColor: {
        backgroundColor: '#FFF5DD',
    },
    profileProgress: {
        width: SIZES.width * 0.24,
        paddingLeft: SIZES.width * 0.04
    },
    profileDetail: {
        width: SIZES.width * 0.68,
        paddingLeft: SIZES.width * 0.05,
        paddingRight: SIZES.width * 0.1
    },
    profileProgressHeader: {
        fontSize: 14,
        fontWeight: '700',
        paddingVertical: SIZES.height * 0.008
    },
    profileProgressTxt: {
        fontSize: 10,
    },
    tabContainer: {
        marginTop: SIZES.height * 0.02
    },
    tabHeadingActiveTab: {
        backgroundColor: '#E2E8FB',
        width: SIZES.width * 0.5,
        padding: 0,
        margin: 0
    },
    tabHeading: {
        backgroundColor: '#fff',
        width: SIZES.width * 0.5,
        // padding: 0,
        // margin: 0
    },
    tabHeadingText: {
        color: '#90a4ae',
    },
    tabHeadingActive: {
        color: COLORS.primary,
    },
    tabsUnderline: {
        backgroundColor: '#E2E8FB',
        height: 2
    }    
});

/**
 * Function to map state to Component props.
 */
 const mapStateToProps = (inState) => {
	return {
		user: inState.authReducer.user
	};
};


// Export components.
export default connect(mapStateToProps)(Sales);