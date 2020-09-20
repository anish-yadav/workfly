
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  BackHandler,

  StatusBar,
  StyleSheet
} from "react-native";
import { Easing, timing } from "react-native-reanimated";
import { useValue } from "react-native-redash";
import { Routes } from "types";
import { Box, TaskCard } from "../../../components";
import { Task, useGetTasksQuery } from "../../../generated/graphql";
import Cards from "./../Cards";
import HeaderTabs from "./../HeaderTabs";

interface Prop {
  navigation: StackNavigationProp<Routes, "Login">;
  route: RouteProp<Routes, "Login">;
}


const Home = ({ navigation }: Prop) => {
  const [active, setActive] = useState<number>(0);
  const activeIndex = useValue(0);

  // Animation values
  // For outer scrollview

  const flatlist = useRef<Animated.FlatList | null>(null)
  
  // For content
  const y = useRef<Animated.Value>(new Animated.Value(0)).current

  // APi Data
  const { data, loading, error,  fetchMore } = useGetTasksQuery({
    variables: { limit: 10 },
  });
  console.log(loading,error)
  const [tasks, setTasks] = useState<Task[]>([]);

  const handlePress = (i: number) => {

    if(flatlist.current) {
       // @ts-ignore
      flatlist.current.scrollToIndex({ index: 0, animated:true})
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
      <Animated.FlatList
        ref={(flist) => flatlist.current = flist}
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
          return <TaskCard key={item.id} navigation={navigation} {...(item as Task)} />;
        }}
        // {...{ onScroll }}
        onScroll={Animated.event(
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