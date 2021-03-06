import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { PaginatedTask } from 'src/generated/graphql';
import { LoadAssets, theme } from './src/components';
import Wrapper from './src/components/Wrapper';
import HomeTabbar from './src/Screens/Home';



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
    uri: 'http://192.168.1.38:4000/graphql',
    credentials: "include",
    
    cache: new InMemoryCache({
      
      typePolicies:{
        Query:{
          fields:{
            tasks:{
              keyArgs:[],
              merge(existing:PaginatedTask | undefined, incoming: PaginatedTask):PaginatedTask {
                return {
                  ...incoming,
                  tasks:[ ...(existing?.tasks || []), ...incoming.tasks]
                }
              }
            }
          }
        }
      }
    })
  })
  return (
    <LoadAssets fonts={fonts}>
      <Wrapper>
        <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Stack.Navigator headerMode="none" >
          <Stack.Screen component={HomeTabbar} name="Home" />
          </Stack.Navigator>
        </ThemeProvider>
        </ApolloProvider>
      </Wrapper>
    </LoadAssets>
  );
}




