
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated as VanillaAnimated, BackHandler,
  Dimensions,
  StatusBar,
  StyleSheet
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, { Easing, timing } from "react-native-reanimated";
import { onScrollEvent, useValue } from "react-native-redash";
import { Routes } from "types";
import { Box } from "../../components";
import { Task, useGetTasksQuery } from "../../generated/graphql";
import Cards, { CARDS_HEIGHT } from "./Cards";
import HeaderTabs from "./HeaderTabs";
import { TaskCard } from "./Tabs";

interface Prop {
  navigation: StackNavigationProp<Routes, "Login">;
  route: RouteProp<Routes, "Login">;
}

const { width, height } = Dimensions.get("screen");

const Home = ({}: Prop) => {
  const [active, setActive] = useState<number>(0);
  const activeIndex = useValue(0);

  // Animation values
  // For outer scrollview

  const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
  const mainScroll = useRef<Animated.ScrollView>(null);
  const flatlist = useRef<VanillaAnimated.FlatList>(null)
  
  // For content
  const scrollView = useRef<Animated.ScrollView>(null);
  const y = useRef<VanillaAnimated.Value>(new VanillaAnimated.Value(0)).current

  // APi Data
  const { data, loading, error,  fetchMore } = useGetTasksQuery({
    variables: { limit: 10 },
  });
  console.log(loading,error)
  const [tasks, setTasks] = useState<Task[]>([]);

  const handlePress = (i: number) => {
    if (scrollView.current) {
      scrollView.current.getNode().scrollTo({ x: width * i });
    }
    if (mainScroll.current) {
      mainScroll.current
        .getNode()
        .scrollTo({ y: CARDS_HEIGHT, animated: true });
    }

    timing(activeIndex, {
      toValue: i,
      duration: 100,
      easing: Easing.linear,
    }).start(() => {
      setActive(i);
    });
  };

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
  useEffect(() => {
    console.log('re rendering', data)
    if (!loading && !error && data){
      //setTasks(data.tasks.tasks as Task[])
      //console.log()
    setTasks(t => {
      
      return data.tasks.tasks as Task[]
    });
    }
  },[data,loading,error])


  return (
    <Box flex={1} backgroundColor="mainBackground">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* <Cards {...{y,handlePress}} /> */}
      <VanillaAnimated.FlatList
        ref={flatlist}
        style={[StyleSheet.absoluteFill]}
        data={tasks}
        extraData={tasks}
        ListHeaderComponent={() => <Cards {...{ y, handlePress }} />}
        scrollEventThrottle={1}
        nestedScrollEnabled={true}
        keyExtractor={(item: Task) => item.id.toString()}
        onEndReachedThreshold={0.2}
        onEndReached={(d: { distanceFromEnd: number }) => {
          if (data?.tasks.hasMore) {
            // refetch({
            //   limit: 10,
            //   cursor: tasks![tasks!.length -1].createdAt
            // })
            // console.log(tasks)
            console.log('1600320504731')
            // console.log(tasks?.length, tasks![tasks!.length - 1].createdAt)
            fetchMore({
              variables: {
                limit: 10,
                cursor:tasks && tasks.length > 1 ? tasks[tasks.length -1].createdAt :  '1600320504731',
            
              },
            });
          }
        }}
        renderItem={({ item }: { item: Task }) => {
          return <TaskCard key={item.id} {...(item as Task)} />;
        }}
        // {...{ onScroll }}
        onScroll={VanillaAnimated.event(
            [{ nativeEvent: { contentOffset: { y  }}}],
            { useNativeDriver: true}
            )}
      />
      <HeaderTabs
        curr={active}
        onPress={handlePress}
        {...{ y }}
      />
    </Box>
  );
};

export default Home;