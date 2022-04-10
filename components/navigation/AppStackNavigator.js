import * as React from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import MakeSale from '../screens/MakeSale';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppStackNavigator = () => {
    return (
            <Stack.Navigator initialRouteName="BottomTabNavigator" screenOptions={{headerShown: false}}>
                <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ title: 'BottomTabNavigator' }}/>
                <Stack.Screen name="MakeSale" component={MakeSale} options={{ title: 'MakeSale' }}/>
            </Stack.Navigator>
    );
};

export default AppStackNavigator ;