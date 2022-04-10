import React, { useRef, useState, useEffect, Image } from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, SIZES } from '../../../constants/index';
import { SvgUri } from 'react-native-svg';
import data from './data';
import { connect } from 'react-redux';
import { setOnBoardingViewed } from "../../../store/actions/appActions";

const Onboarding = (props) => {

    const flatlistRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [viewableItems, setViewableItems] = useState([])

    const handleViewableItemsChanged = useRef(({viewableItems})=> {
        setViewableItems(viewableItems)
    })
    useEffect(() => {
        if(!viewableItems[0] || currentPage === viewableItems[0].index) 
            return;
        setCurrentPage(viewableItems[0].index)

    }, [viewableItems])

    // const handleNext = () => {
    //     if(currentPage == data.length-1)
    //         return;

    //     flatlistRef.current.scrollToIndex({
    //         animated: true,
    //         index: currentPage +1
    //     })
    // }

    toLogin = () => {
        props.setOnBoardingViewed(true);
        props.navigation.navigate('Login');
    }
    toRegister = () => {
        props.setOnBoardingViewed(true);
        props.navigation.navigate('Register');
    }

    const threeDots = () => {
        return(
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 1,
                marginVertical: 30,
                width: SIZES.width * 0.9
            }}>
                {/* Pagination */}
                {
                    // No. of dots
                    [...Array(data.length)].map((_, index)=>(
                        <View
                            key={index} 
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: index == currentPage ? 'white' : COLORS.white + '20',
                                marginRight: 8
                            }} />                            
                    ))
                }               
            </View>
        )        
    }

    const renderBottomSection = () => {
        return (
            <SafeAreaView style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity onPress={() => {toRegister()}} style={{flex: 1, paddingVertical: 15, marginLeft: SIZES.width * 0.055}}> 
                    <Text style = {{color: '#fff'}}>
                        Create an account
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => {toLogin()}} style={{paddingHorizontal: 30, paddingVertical: 15, backgroundColor: '#fff', marginRight: SIZES.width * 0.055}}> 
                    <Text style = {{color: '#0E1F3F'}}>
                        Login
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    const renderFlatlistItem = ({item}) => {
        return (
            <View style={{
                width: SIZES.width,
                alignItems: 'center',
            }}>
                <SvgUri
                    width="100%"
                    height="35%"
                    uri={item.image}
                />
                {/* <Image source={item.image} style={{width: SIZES.width * 0.7, resizeMode: 'contain', flex: 0.95, justifyContent: 'center'}} /> */}
                <View style={{paddingHorizontal: 18}}>
                    <Text style={{fontSize: 36, fontWeight: 'bold', lineHeight: 39.6}}>
                        {item.title}
                    </Text>
                    <Text style={{ fontSize: 18, marginTop: 15, lineHeight: 21 }}>
                        {item.desc}
                    </Text>
                </View>
                {threeDots()}
                {/* BOTTOM SECTION - pagination & next or GetStarted button */}
                { renderBottomSection() }
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: data[currentPage]['color'],
            justifyContent: 'center'
        }}>
            {/* <StatusBar barStyle="dark-content" backgroundColor={data[currentPage]['color']} />
            <FlatList
                data={data}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={true}
                keyExtractor={item => item.id}
                renderItem={renderFlatlistItem}

                ref={flatlistRef}
                onViewableItemsChanged={handleViewableItemsChanged.current}
                viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
                initialNumToRender={1}
                extraData={SIZES.width}
            /> */}
            <Text>Happy</Text>           

        </View>
    )
}

function mapStateToProps(state) {
    return { 
        onBoardingViewed: state.onBoardingViewed 
    };
} 

export default connect(mapStateToProps, {setOnBoardingViewed})(Onboarding);
