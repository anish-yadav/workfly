import { useApolloClient } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  BackHandler,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet
} from "react-native";
import { Easing, timing } from "react-native-reanimated";
import { useValue } from "react-native-redash";
import { Routes } from "types";
import { registerForPushNotificationsAsync } from "../../../../helpers/Notification";
import { Box, TaskCard } from "../../../components";
import {
  Stats, Task,
  useGetTasksQuery,
  useSetPushTokenMutation,
  useStatsQuery
} from "../../../generated/graphql";
import Cards, { CARDS_HEIGHT } from "./../Cards";
import HeaderTabs from "./../HeaderTabs";

interface Prop {
  navigation: StackNavigationProp<Routes, "Login">;
  route: RouteProp<Routes, "Login">;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

 const {width,height} = Dimensions.get("screen")
const Home = ({ navigation }: Prop) => {
  const [active, setActive] = useState<number>(0);
  const activeIndex = useValue<number>(0);


  // Notification 

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // Animation values
  // For outer scrollview

  const flatlist = useRef<Animated.FlatList | null>(null);

  // For content
  const y = useRef<Animated.Value>(new Animated.Value(0)).current;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats>();
  const [filter, setFilter] = useState<string>("Open");
  const filterOptions = ["Open", "Working", "Completed"];

  // APi Data
  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
    refetch,
  } = useGetTasksQuery({
    variables: { limit: 10, criteria: filter }
  });
  const {
    loading: statsLoading,
    data: statsData,
    error: statsError,
  } = useStatsQuery();
  const [ setPushNotification ] = useSetPushTokenMutation()

  const client = useApolloClient()

  const handlePress = (i: number) => {
    if (flatlist.current) {
      // @ts-ignore
      if(tasks && tasks.length > 0) flatlist.current.scrollToIndex({ index: 0, animated: true });
    }
    console.log("clicked")
    setFilter(filterOptions[i]);
    timing(activeIndex, {
      toValue: i,
      duration: 100,
      easing: Easing.linear,
    }).start(() => {
      setActive(i);
    });
  };

  // handling back button press
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

  // adding backpress event handler and removing it on close
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  // setting list data
  useEffect(() => {
    if (!loading && !error && data) {
     // console.log("data fethched",filter, data.tasks.tasks)
      setTasks((_) => {
        return data.tasks.tasks.filter(t => t.status === filter) as Task[];
      });
    }
  }, [data, loading, error]);

  // resetting data when filter is cahnged
  useEffect(() => {
    console.log("Filter changed",filter)
    setTasks([])
    client.resetStore()
    refetch({ limit: 10, criteria: filter})
  },[filter])
  // Setting stats data
  useEffect(() => {
    if (statsData && !statsLoading && !statsError) {
      setStats(statsData.stats as Stats);
    }
  }, [statsLoading, statsData, statsError]);


  // Notification
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if( token)
          setPushNotification({ variables: { token }})
    });

    // @ts-ignore
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification',notification)
      // @ts-ignore
      setNotification(notification);
    });

    //@ts-ignore
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      //@ts-ignore 
      Notifications.removeNotificationSubscription(notificationListener);
      //@ts-ignore
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  return (
    <Box flex={1} backgroundColor="mainBackground">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Animated.FlatList
        ref={(flist) => (flatlist.current = flist)}
        style={[StyleSheet.absoluteFill]}
        data={tasks}
        extraData={tasks}
        refreshing={networkStatus === 4}
        // onRefresh={() => {
        //   refetch();
        // }}
        ListHeaderComponent={() => (
          <Cards {...{ y, handlePress }} stats={stats} loading={statsLoading} />
        )}
        scrollEventThrottle={1}
        nestedScrollEnabled={true}
        keyExtractor={(item: Task) => item.id.toString()}
        onEndReachedThreshold={0.2}
        onEndReached={(d: { distanceFromEnd: number }) => {
          if (data?.tasks.hasMore) {
            console.log("cursor is ",tasks[tasks.length - 1].createdAt)
            fetchMore({
              variables: {
                limit: 10,
                cursor:
                  tasks && tasks.length > 1
                    ? tasks[tasks.length - 1].createdAt
                    : "1600320504731",
              },
            });
          }
        }}
        renderItem={({ item }: { item: Task }) => {
          return (
            <TaskCard
              key={item.id}
              navigation={navigation}
              {...(item as Task)}
            />
          );
        }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
          useNativeDriver: true,
        })}

        ListEmptyComponent={() => (
           <Image style={{ width: width,height: height - CARDS_HEIGHT - 150}} source={require("../../../../assets/list.png")}  />
        )}
      />
      <HeaderTabs
        curr={active}
        activeIndex={activeIndex}
        onPress={handlePress}
        {...{ y }}
      />
    </Box>
  );
};

export default Home;



