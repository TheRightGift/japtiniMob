import * as React from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import AppStackNavigator from './AppStackNavigator';
import Splash from '../screens/Splash';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const StackAll = createStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <StackAll.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
                <StackAll.Screen name="Splash" component={Splash} options={{ title: 'Splash' }}/>
                <StackAll.Screen name="auth" children={AuthStackNavigator} />
                <StackAll.Screen name="app" children={AppStackNavigator} />
            </StackAll.Navigator>            
        </NavigationContainer>
    );
};

export default RootNavigator;