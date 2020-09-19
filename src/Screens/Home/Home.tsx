import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { Alert, BackHandler, Dimensions, StatusBar, StyleSheet } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { onScrollEvent, useValue } from "react-native-redash";
import { Routes } from "types";
import { Box } from "../../components";
import Cards, { CARDS_HEIGHT } from "./Cards";
import HeaderTabs from "./HeaderTabs";
import Tabs from "./Tabs";

interface Prop {
  navigation: StackNavigationProp<Routes, "Login">;
  route: RouteProp<Routes, "Login">;
}

const { width, height } = Dimensions.get("screen")

const Home = ({ navigation }: Prop) => {


  const [active, setActive] = useState<number>(0);

  const activeIndex = useValue(0);

  // Animation values
  // For outer scrollview
  const mainScroll = useRef<Animated.ScrollView>(null)

  // For content
  const scrollView = useRef<Animated.ScrollView>(null)
  const y = useValue(0)
  const onScroll = onScrollEvent({y})



  const handlePress = (i:number) => {
        if(scrollView.current){
          scrollView.current.getNode().scrollTo({ x: width*i})
        }
        if(mainScroll.current){
          mainScroll.current.getNode().scrollTo({ y: CARDS_HEIGHT ,animated:true})
        }
        
        Animated.timing(activeIndex,{
          toValue: i,
          duration: 100,
          easing:Easing.linear
        }).start(() => {
          setActive(i)
        })
  }

  const handleBackButton = () => {
    Alert.alert(
      "Exit App",
      "Exiting the application?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      }
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);


  return (
    <Box flex={1} backgroundColor="mainBackground"
     >
    <StatusBar  barStyle="dark-content" backgroundColor="white"/>
      <Cards {...{y,handlePress}} />
      <Animated.ScrollView
        ref={mainScroll}
        style={[StyleSheet.absoluteFill,{flex: 1}]}
        scrollEventThrottle={1}
        nestedScrollEnabled
        {...{ onScroll }}
        
      >
        <Tabs
          {...{ y , activeIndex: active, scrollView}}
        />
      </Animated.ScrollView>
      <HeaderTabs active={activeIndex} curr={active} onPress={handlePress} {...{y, scrollView}} />
    </Box>
  );
};

export default Home;
