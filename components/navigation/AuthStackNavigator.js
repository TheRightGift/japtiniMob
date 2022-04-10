import * as React from 'react';

import Register from '../screens/Auth/Register/Register';
import Welcome from '../screens/Auth/Register/welcome';
import Login from '../screens/Auth/Login/Login';
import OnBoarding from '../screens/onBoarding/Onboarding';
import ForgotPassword from '../screens/Auth/PasswordMgt/forgotPassword';
import ResetPassword from '../screens/Auth/PasswordMgt/resetPassword';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="OnBoarding" 
            screenOptions={{
                header: () => null
            }}
        >
            <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ title: 'OnBoarding' }}/>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}/>
            <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }}/>
            <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Welcome' }}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'ForgotPassword' }}/>
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: 'ResetPassword' }}/>
        </Stack.Navigator>
    );
};

export default AuthStackNavigator ;