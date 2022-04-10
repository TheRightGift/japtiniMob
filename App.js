// Imports: Dependencies
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/index';
import RootNavigator from "./components/navigation/navigator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import { PersistGate } from 'redux-persist/es/integration/react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['authReducer', 'appReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer, applyMiddleware(createLogger())
);

const persistedStore = persistStore(store); 


export default App = () => {
	return (
		<Provider store={store}>   
			<PersistGate persistor={persistedStore} loading={null}>
				<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider {...eva} theme={eva.light}>
					<RootNavigator /> 
				</ApplicationProvider>
			</PersistGate> 			  
		</Provider>
	);
};