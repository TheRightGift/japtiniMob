import * as React from 'react';
import Sales from '../screens/Sales';
import Profile from '../screens/Profile';
import { Icon } from 'native-base';
import { COLORS, SIZES } from '../../constants';
import {appColorSecondary} from '../../app.json';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
    
    return (
        <Tab.Navigator initialRouteName="Sales"
            activeColor={COLORS.primary}
            barStyle={{ backgroundColor: '#fff' }}
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Sales" component={Sales} options={
                {
                    tabBarIcon: ({ focused, color, size }) => {
                        if(focused){
                            color = appColorSecondary;
                            size = 26;
                        } else {
                            color = '#8a83b9'
                            size = 20;
                        }
                        return (
                            <Icon type='MaterialCommunityIcons' size={size} name='home-outline' style={{color: color}} />
                        );
                    }, 
                    tabBarLabel: 'Home'
                }
            }/>
            
            <Tab.Screen name="Profile" component={Profile} options={
                {
                    tabBarIcon: ({ focused, color, size }) => {
                        if(focused){
                            color = appColorSecondary;
                            size = 26;
                        } else {
                            color = '#8a83b9'
                            size = 20;
                        }
                        return (
                            <Icon type='MaterialCommunityIcons' size={size} name='account-outline' style={{color: color}} />
                        );
                    }, 
                    tabBarLabel: 'Account'
                }
            }/>
            
        </Tab.Navigator>
    );
};

export default BottomTabNavigator ;