import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { Authentication } from './src/Authentication';
import { LoadAssets, theme } from './src/components';
import Wrapper from './src/components/Wrapper';
import HomeTabbar from './src/Home';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

export default function App() {
  const fonts = {
    'SFProText-Regular': require('./assets/fonts/SF-Pro-Text-Regular.otf'),
    'SFProText-Semibold': require('./assets/fonts/SF-Pro-Text-Semibold.otf'),
    'SFProText-Bold': require('./assets/fonts/SF-Pro-Text-Bold.otf'),
    'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
  }
  const Stack = createStackNavigator();
  const client = new ApolloClient({
    uri: 'https://96ac158bc00a.ngrok.io/graphql',
    cache: new InMemoryCache()
  })
  return (
    <LoadAssets fonts={fonts}>
      <Wrapper>
        <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Stack.Navigator headerMode="none" >
          <Stack.Screen component={Authentication} name="Login" />
          <Stack.Screen component={HomeTabbar} name="Home" />
          </Stack.Navigator>
        </ThemeProvider>
        </ApolloProvider>
      </Wrapper>
    </LoadAssets>
  );
}




