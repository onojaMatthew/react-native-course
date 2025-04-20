import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, ActivityIndicator } from 'react-native';

export default function App() {
  const [listData, setListData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isRefreshing, setIsRefreshing ] = useState(false);

  const fetchData = async (limit) => {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
    response = await response.json();
    setListData(response);
    setIsLoading(false);
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData(20);
    setIsRefreshing(false);
  }

  useEffect(() => {
    fetchData(5);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color={"#0000ff"} />
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={listData}
          renderItem={({item}) => {
            return (
              <View style={styles.card}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.bodyText}>{item.body}</Text>
              </View>
            )
          }}
          ItemSeparatorComponent={<View style={{ marginBottom: 16 }} />}
          ListEmptyComponent={<Text>No Records Found</Text>}
          ListHeaderComponent={<Text style={styles.headerText}>❤️ Post list</Text>}
          ListFooterComponent={<Text style={styles.footerText}>Post footer</Text>}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,

  },
  titleText: {
    fontSize: 30
  },
  bodyText: {
    fontSize: 24,
    color: "#666666"
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12
  },
  footerText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 12
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight
  }
});
