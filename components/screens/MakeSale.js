import React from 'react';
import { StyleSheet, View, FlatList, Image, TextInput, StatusBar, Modal, TouchableWithoutFeedback, ActivityIndicator, PermissionsAndroid} from "react-native";
import { Icon, List, ListItem, Left, Body, Right, Thumbnail, Button, Card, CardItem } from 'native-base';
import { Layout, Text} from '@ui-kitten/components';
import { getProducts, createOrder } from '../../api';
import { Dialog } from 'react-native-paper';
import { connect } from 'react-redux';
import { COLORS, SIZES } from '../../constants';
import Geolocation from 'react-native-geolocation-service';
import getDistance from 'geolib/es/getDistance';

class MakeSale extends React.Component {

	/**
	 * Constructor.
	 */
	constructor(inProps) {

		super(inProps);
		this.state = {
            products: null,
            qty: '0',
            cart: [],
            visible: false,
            errMsg: '',
            blockMsg: '',
            alertVisible: false,
            spinnerVisible: false,
            blockVisible: false,
		};
		
	} /* End constructor. */

    addProductToCart = (prdtId) => {
        let findPrdt = this.state.cart.find((prdt) => {
            return prdt.id === prdtId;
        });
        let prdt = this.state.products.filter((prdt) => {
            return prdt._id === prdtId;
        });
        prdt = prdt[0];

        if(findPrdt === undefined){
            // add to cart array    
            let item = {
                id: prdt._id,
                name: prdt.name,
                unitPrice: prdt.unitPrice,
                qty: '1',
            }
            
            let cartItems = this.state.cart;
            cartItems.push(item);
            
            this.setState({cart: cartItems});  
        } else {
            //increase qty
            let cartItems = this.state.cart
            cartItems.forEach((prd) => {
                if(prd.id === prdtId){
                    let qty = parseInt(prd.qty) + 1;
                    qty = qty.toString();
                    prd.qty = qty;
                }
            });
            this.setState({cart: cartItems});
        }
    }

    hideDialog = () => {
        this.setState({alertVisible: false });
        this.setModalVisible(false)
    }

    hideBlockDialog = () => {
        this.setState({blockVisible: false });
        this.props.navigation.goBack();
    }

    setModalVisible(visible) {
        this.setState({visible: visible});
	}

    setProductToCart = (prdtId, val) => {
        let findPrdt = this.state.cart.find((prdt) => {
            return prdt.id === prdtId;
        });
        let prdt = this.state.products.filter((prdt) => {
            return prdt._id === prdtId;
        });
        prdt = prdt[0];

        if(findPrdt === undefined){
            // add to cart array    
            let item = {
                id: prdt._id,
                name: prdt.name,
                qty: val,
            }
            
            let cartItems = this.state.cart;
            cartItems.push(item);
            // console.log(cartItems);
            this.setState({cart: cartItems});  
        } else {
            //increase qty
            let cartItems = this.state.cart
            cartItems.forEach((prd) => {
                if(prd.id === prdtId){
                    prd.qty = val;
                }
            });
            this.setState({cart: cartItems});
        }
    }
    subtractProductToCart = (prdtId) => {
        let findPrdt = this.state.cart.find((prdt) => {
            return prdt.id === prdtId;
        });
        let prdt = this.state.products.filter((prdt) => {
            return prdt._id === prdtId;
        });
        prdt = prdt[0];

        if(findPrdt === undefined){
            
        } else {
            //increase qty
            let cartItems = this.state.cart
            cartItems.forEach((prd) => {
                if(prd.id === prdtId){
                    let qty = parseInt(prd.qty);
                    if(qty > 0){
                        qty -= 1;
                        qty = qty.toString();
                        prd.qty = qty;
                    }
                    
                }
            });
            this.setState({cart: cartItems});
        }
    }

    getItemQty = (itemId) => {
        let prdt = this.state.cart.find((prdt) => {
            return prdt.id === itemId;
        });

        if(prdt === undefined){
            return false;
        } else {
            return prdt.qty;
        }
    }

    renderFlatlistItem = ({item}) => {
        let imgSrc = {uri: `http://192.168.43.2:8800/img/${item.name}.jpg`};
        
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Body style={styles.cardBodyHeaderRow}>
                            <Text style={styles.cardBodyHeader}>{item.name}</Text>
                            <Text note style={styles.cardBodyPrice}>NGN {item.unitPrice}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={imgSrc} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                <Left>
                    <Button transparent onPress={() => {this.subtractProductToCart(item._id)}}>
                        <Icon type="MaterialCommunityIcons" name="minus" />
                    </Button>
                </Left>
                <Body>
                    <TextInput
                    placeholder='Place your Text'
                    value={this.getItemQty(item._id) || '0'}
                    onChangeText={val => this.setProductToCart(item._id, val)}
                    style={styles.input}
                    keyboardType={'number-pad'}
                    />
                </Body>
                <Right>
                    <Button transparent onPress={() => {this.addProductToCart(item._id)}}>
                        <Icon type="MaterialCommunityIcons" active name="plus" />
                    </Button>
                </Right>
                </CardItem>
          </Card>
        )
    }

    renderCartlistItem = ({item}) => {
        return(
            <ListItem>
                <Left>
                    <Text>{item.name}</Text>
                </Left>
                <Body>
                    <Text>{item.unitPrice} ({item.qty})</Text>
                </Body>
                <Right>
                    <Text>{parseInt(item.unitPrice) * parseInt(item.qty)}</Text>
                </Right>
            </ListItem>
        );
    }

    getProducts = () => {
        getProducts().then(
            ({ data, status }) => {
                if(data.status == 200){    
                    // console.log(data.retailers);
                    this.setState({products: data.products});                        
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

    cartOp = () => {
        let cart = this.state.cart;
        if(cart.length < 1){
            return(
                <Button transparent light>
                    <Icon type="MaterialCommunityIcons" name='cart' style={styles.headerIcon}/>
                </Button> 
            );            
        } else {
            return(
                <Button transparent light onPress={() => this.setModalVisible(true)} >
                    <Text style={styles.cartNum}>{cart.length}</Text>
                    <Icon type="MaterialCommunityIcons" name='cart' style={styles.headerIcon}/>
                </Button> 
            );            
        }
    }

    createOrder = (retailerId, productId, salesPersonId, qty) => {
        console.log(retailerId, productId, salesPersonId, qty)
        let nuOrder = {
            outletId: retailerId,
            productId: productId,
            salesPersonId: salesPersonId,
            qty: qty,
        }

        createOrder(nuOrder).then(
            ({ data, status }) => {
                if(data.status == 201){  
                    let cart = this.state.cart;    
                    cart.shift();
                    if(cart.length > 0){
                        this.createOrder(this.props.route.params._id, cart[0]['id'], this.props.user.id, cart[0]['qty']);
                    } else {
                        this.setState({spinnerVisible: false});
                        this.setState({errMsg: 'Order initiated.' });
                        this.setState({alertVisible: true });
                        // this.setModalVisible(false)
                    }                 
                    
                } else {
                    console.log(data.status);
                }
            },
            (err) => {
                console.log(err);
            }
        )
    }
    processOrder = () => {
        this.setState({spinnerVisible: true});
        // let salesPersonId = this.props.user.id;
        // let retailerId = this.props.route.params._id;
        let cart = this.state.cart;
        
        // cart.forEach((prdt) => {
        //     this.createOrder(retailerId, prdt.id, salesPersonId, prdt.qty);
        // });

        this.createOrder(this.props.route.params._id, cart[0]['id'], this.props.user.id, cart[0]['qty']);
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

    checkProximity = async () => {
        const hasLocationPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    let salesLat = position.coords.latitude;
                    let salesLon = position.coords.longitude;
                    let retailerLat = this.props.route.params.latitude;
                    let retailerLon = this.props.route.params.longitude;

                    let distance = getDistance(
                        { latitude: retailerLat, longitude: retailerLon },
                        { latitude: salesLat, longitude: salesLon }
                    );
                    if(distance > 30){
                        this.setState({blockVisible: true });
                        this.setState({blockMsg: 'You are not close to the retailers premises' });
                        // 
                    }
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    }

    UNSAFE_componentWillMount(){
        StatusBar.setBarStyle('light-content');
		StatusBar.setBackgroundColor(COLORS.primary);

        this.checkProximity()
    }
	componentDidMount() {
        this.getProducts()
  	}; /* End componentDidMount(). */

	render() {  
        return(
            <View style={styles.container}>
                <Layout style={[styles.headerRow, styles.appBackground]}>
                    <Layout style={[styles.headerTextCont, styles.appBackground]}>
                        <Text style={styles.headerText}>{this.props.route.params.companyname}</Text>
                    </Layout>
                    <Layout style={[styles.headerIconCont, styles.appBackground]}>
                        {this.cartOp()}                       
                    </Layout>
                </Layout>
                <Layout>
                    <List>
                        <FlatList
                            data={this.state.products}
                            renderItem={this.renderFlatlistItem}
                            keyExtractor={item => item._id}
                        />
                    </List>
                </Layout>
                
                <Dialog visible={this.state.blockVisible} onDismiss={this.hideBlockDialog}>
                    <Dialog.Content style={[styles.red]}>
                        <View style={styles.dialog}>
                            <Text style={[styles.alertInnerText]}>{this.state.blockMsg}</Text>
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

                <Modal animationType="slide" transparent={false} visible={this.state.visible} onRequestClose={() => this.setModalVisible(false)}>
                    <Layout style={[styles.modalHeaderRow, styles.appBackground]}>
                        <Layout style={[styles.headerTextCont, styles.appBackground]}>
                            <Text style={styles.headerText}>Initiate Order</Text>
                        </Layout>
                        <Layout style={[styles.headerIconCont, styles.appBackground]}>
                            <Button transparent light onPress={() => this.setModalVisible(false)}>
                                <Icon type="MaterialCommunityIcons" name='window-close' style={styles.headerIcon}/>
                            </Button>                        
                        </Layout>
                    </Layout>
                    <Layout style={styles.modalSubHeaderRow}>
                        <Text style={styles.modalSubHeader}>{this.props.route.params.companyname}</Text>
                    </Layout>            
                    <Layout>
                        <List>
                            <ListItem itemHeader>
                                <Left>
                                    <Text style={styles.boldText}>Products</Text>
                                </Left>
                                <Body>
                                    <Text style={styles.boldText}>Unit Price (Qty)</Text>
                                </Body>
                                <Right>
                                    <Text style={styles.boldText}>Total</Text>
                                </Right>
                            </ListItem>
                            <FlatList
                                data={this.state.cart}
                                renderItem={this.renderCartlistItem}
                                keyExtractor={item => item._id}
                            />
                        </List>
                    </Layout>  
                    <Layout style={styles.buttonRow}>
                        <Button block info onPress={() => this.processOrder()}><Text> Create Order </Text></Button>
                    </Layout>

                    <Dialog visible={this.state.alertVisible} onDismiss={this.hideDialog}>
                        <Dialog.Content style={[styles.green]}>
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
                </Modal>
            </View>
        )
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },  
    appBackground: {
        backgroundColor: COLORS.primary,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: SIZES.height * 0.1,
        paddingHorizontal: SIZES.width * 0.035,
        paddingTop: 15,
    },
    boldText: {
        fontWeight: '700'
    },
    buttonRow: {
        marginTop: SIZES.height * 0.6,
        paddingHorizontal: 10
    },
    modalHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // height: SIZES.height * 0.06,
        paddingHorizontal: SIZES.width * 0.035,
        paddingTop: 8,
    },
    modalSubHeaderRow: {
        height: 40,
        lineHeight: 40,
        justifyContent: 'center',
        borderBottomColor: '#c1c1c1',
        borderWidth: 1

    },
    modalSubHeader: {
        textAlign: 'center',
        fontSize: 15,
    },  
    headerTextCont: {
        width: SIZES.width * 0.8,
        paddingLeft: 10
    },
    headerText: {
        fontSize: 14,
        fontWeight: '700',
        fontStyle: 'normal',        
        color: '#fff'
    },
    headerIconCont: {
        width: SIZES.width * 0.20,
        alignItems: 'flex-end',        
    },
    cartNum: {
        color: '#fff',
        position: 'relative',
        left: 30,
        top: -15,
        fontSize: 12
    },
    headerIcon: {
        fontSize: 21,
        color: '#fff'
    },
    cardBodyHeaderRow: {
        flexDirection: 'row'
    },
    cardBodyHeader: {
        fontSize: 15,
        fontWeight: '700'
    },
    cardBodyPrice: {
        fontSize: 13,
        position: 'relative',
        left: SIZES.width * 0.65
    },
    input: {
        width: 75,
        marginLeft: 10,
        // borderColor: '#c1c1c1',
        // borderWidth: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500'
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
    green: {
        backgroundColor: 'green'
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
		user: inState.authReducer.user
	};
};


// Export components.
export default connect(mapStateToProps)(MakeSale);