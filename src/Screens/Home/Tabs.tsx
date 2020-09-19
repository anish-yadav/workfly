import { formatDistanceToNow } from "date-fns";
/* eslint-disable max-len */
import React, { RefObject, useEffect, useState } from "react";
import { Dimensions, RefreshControl, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Box, Text } from "../../components";
import { useGetTasksQuery } from "../../generated/graphql";
import { CARDS_HEIGHT } from "./Cards";

const { height, width } = Dimensions.get("window");
const items = [
  {
    title: "Long Hongdae Nights",
    description:
      "Korean fried chicken glazed with Gochujang, garnished with sesame & spring onions, served with fries & Miss Miu Mayo",
    price: "26 CHF",
  },
  {
    title: "Late Sunset",
    description:
      "Korean fried chicken starter with dirty cheese sauce and Artisan Hot Sauce - the naughty version new, favourite",
    price: "13.50 CHF",
  },
  {
    title: "Cabbage Kimchi",
    description: "Portion, vegan",
    price: "5.00 CHF",
  },
  {
    title: "Namur by Pieces",
    description:
      "Homemade steamed dim sum with minced pork, shiitake mushrooms and smokey honey flavour, four pcs",
    price: "10.50 CHF",
  },
  {
    title: "Silim Lights",
    description:
      "Beef Bibimbap, sesame oil, rice, beans, spinach, carrots, spring onions, Chinese cabbage, shiitake mushrooms, roasted onions and egg",
    price: "26.50 CHF",
  },
  {
    title: "Long Hongdae Nights",
    description:
      "Korean fried chicken glazed with Gochujang, garnished with sesame & spring onions, served with fries & Miss Miu Mayo",
    price: "26 CHF",
  },
  {
    title: "Late Sunset",
    description:
      "Korean fried chicken starter with dirty cheese sauce and Artisan Hot Sauce - the naughty version new, favourite",
    price: "13.50 CHF",
  },
  {
    title: "Cabbage Kimchi",
    description: "Portion, vegan",
    price: "5.00 CHF",
  },
  {
    title: "Namur by Pieces",
    description:
      "Homemade steamed dim sum with minced pork, shiitake mushrooms and smokey honey flavour, four pcs",
    price: "10.50 CHF",
  },
  {
    title: "Silim Lights",
    description:
      "Beef Bibimbap, sesame oil, rice, beans, spinach, carrots, spring onions, Chinese cabbage, shiitake mushrooms, roasted onions and egg",
    price: "26.50 CHF",
  },
  {
    title: "Long Hongdae Nights",
    description:
      "Korean fried chicken glazed with Gochujang, garnished with sesame & spring onions, served with fries & Miss Miu Mayo",
    price: "26 CHF",
  },
  {
    title: "Late Sunset",
    description:
      "Korean fried chicken starter with dirty cheese sauce and Artisan Hot Sauce - the naughty version new, favourite",
    price: "13.50 CHF",
  },
  {
    title: "Cabbage Kimchi",
    description: "Portion, vegan",
    price: "5.00 CHF",
  },
  {
    title: "Namur by Pieces",
    description:
      "Homemade steamed dim sum with minced pork, shiitake mushrooms and smokey honey flavour, four pcs",
    price: "10.50 CHF",
  },
  {
    title: "Silim Lights",
    description:
      "Beef Bibimbap, sesame oil, rice, beans, spinach, carrots, spring onions, Chinese cabbage, shiitake mushrooms, roasted onions and egg",
    price: "26.50 CHF",
  },
];

const styles = StyleSheet.create({
  section: {
    padding: 16,
    backgroundColor: "#fff",
  },
  placeholder: {
    height: CARDS_HEIGHT,
    marginBottom: 40,
  },
  text: {
    fontFamily: "DMSans-Regular",
    fontSize: 14,
  },
  title1: {
    fontFamily: "DMSans-Medium",
    fontSize: 24,
  },
  title2: {
    fontFamily: "DMSans-Medium",
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: "#e2e3e4",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  link: {
    color: "#247A00",
  },
  item: {
    borderBottomColor: "#e2e3e4",
    borderBottomWidth: 1,
    marginTop: 16,
  },
  title: {
    fontFamily: "DMSans-Medium",
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    fontFamily: "DMSans-Medium",
    marginBottom: 16,
  },
});

export interface TabModel {
  name: string;
  anchor: number;
}

interface ContentProps {
  y: Animated.Node<number>;
  activeIndex: number;
  scrollView: RefObject<Animated.ScrollView>;
}

export default ({ scrollView }: ContentProps) => {
  const [fetchedItems, setFetchedItems] = useState<any[]>();
  const { data, loading, error, fetchMore } = useGetTasksQuery({
    variables: { limit: 10 },
  });

  const [refreshing, setRefreshing] = useState<boolean>(false)

  const handleRefresh = () => {
    console.log('refreshing')
    setRefreshing(true)
    try {
      fetchMore({
      variables: {
        limit: 20
      },
      updateQuery: (_,{ fetchMoreResult}) => {
        setRefreshing(false)
        return fetchMoreResult!
      }
    })
  } catch (e) {
    console.error('error',e)
    setRefreshing(false)
  }
    
  }
  useEffect(() => {
    if (!loading && !error && data) {
      setFetchedItems(data.tasks.tasks);
    }
  }, [loading, error, data]);

  interface TaskCardProp {
    title: string;
    description: string;
    createdAt: string;
  }
  const TaskCard = ({ title, description, createdAt }: TaskCardProp) => {
    return (
      <Box
        height={150}
        maxHeight={150}
        padding="l"
        marginVertical="m"
        borderRadius={20}
        backgroundColor="greyCard"
      >
        <Text variant="header1">{title}</Text>
        <Text variant="body">
          {description
            .substr(0, 100)
            .replace(/<[^>]*>?/gm, " ")
            .replace("&nbsp", " ")}
        </Text>
        <Text variant="body1">
          {formatDistanceToNow(new Date(parseInt(createdAt)))} ago
        </Text>
      </Box>
    );
  };

  return (
    <>
      <View style={styles.placeholder} />
      <View style={styles.divider} />
      <Animated.ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        nestedScrollEnabled
        style={{ backgroundColor: "white" }}
        scrollEnabled={false}
      >
        <View>
        <FlatList
          data={fetchedItems}
          style={{ width, paddingHorizontal: 20 }}
          keyExtractor={(item) => item.id.toString()}
          nestedScrollEnabled
          onEndReachedThreshold={0.1}
          onEndReached={(d) => {
            console.log(d)
          }}
          onScroll={() => {
            console.log("fbeaua")
          }}
         
          renderItem={({ item, index }) => {
            return <TaskCard {...item} />;
          }}
         
        />
        </View>
        <View>
        <FlatList
          data={items}
          style={{ width, paddingHorizontal: 20 }}
          keyExtractor={(item) => item.price + Math.random() * 10000}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.item} key={index}>
                <Text style={styles.title}>Pending</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            );
          }}
        />
        </View>
        <View>
        <FlatList
          data={items}
          style={{ width, paddingHorizontal: 20 }}
          keyExtractor={(item) => item.price + Math.random() * 10000}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.item} key={index}>
                <Text style={styles.title}>Closed</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            );
          }}
        />
        </View>
      </Animated.ScrollView>
    </>
  );
};
