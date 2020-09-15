import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../../redux/store';

interface WrapperProps { 
    children:JSX.Element 
}

const Wrapper = ({ children }:WrapperProps) => {
    return (
        <Provider store={ store}>
            <PersistGate persistor={persistor}>
                { children }
            </PersistGate>
        </Provider>
    )
}
export default Wrapper