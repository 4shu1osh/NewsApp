import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Child from './Child';
import moment from 'moment';
var curr = new Date();
const Temp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // axios.get(`https://api.instantwebtools.net/v1/passenger?page=${counter}&size=50`)
    axios
      .get(
        'https://newsapi.org/v2/top-headlines?country=in&apiKey=555fc1b58ba046749399a5d4332964c4',
      )
      .then(res => {
        setData(res.data.articles);
        console.log('res', res);
        // counter===1? setData(res.data.data): setData([...data,...res.data.data])
      });
  }, []);

  const renderItem = ({item}) => <Child item={item} />;

  const renderSectionHeader = ({section: {data}}) => {
    return (
      <Text style={styles.sectionText}>
        {/* {console.log(new Date(data[0].publishedAt).getDate() +"/"+new Date(data[0].publishedAt).getMonth()+"/"+new Date(data[0].publishedAt).getFullYear())} */}
        {moment(data[0].publishedAt).fromNow()}
      </Text>
    );
  };

  const callAPI = () => {
    setLoading(true);
    axios
      .get(
        'https://newsapi.org/v2/top-headlines?country=in&apiKey=555fc1b58ba046749399a5d4332964c4',
      )
      .then(res => {
        console.log('res', res);
        setLoading(false);
        setData(res.data.articles);
        // counter===1? setData(res.data.data): setData([...data,...res.data.data])
      });
  };
  const onRefresh = () => {
    setTimeout(() => {
      setLoading(true);
      callAPI();
    }, 0);
  };
  const formatData = () => {
    // this gives an object with authors as keys
    if (data.length == 0) return [];
    const groups = data.reduce((groups, item) => {
      const date = new Date(item.publishedAt).getHours();
      console.log(date);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});

    // to add it in the array format instead
    const groupArrays = Object.keys(groups).map(date => {
      return {
        date,
        data: groups[date],
      };
    });
    return groupArrays.reverse();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'black',
          }}>
          <Text
            style={{
              color: 'orange',
              fontSize: 30,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            {'News'}
          </Text>
          <Text
            style={{
              color: 'black',
              backgroundColor: 'orange',
              fontSize: 30,
              fontWeight: 'bold',
              marginBottom: 20,
              borderRadius: 5,
              overflow: 'hidden',
            }}>
            {'hub'}
          </Text>
        </View>
        <SectionList
          style={{flex: 1}}
          sections={formatData()}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={loading}
              colors={['red', 'blue', 'green']}
              tintColor={['red', 'grey']}
              // progressBackgroundColor='black'
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionText: {
    fontSize: 20,
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    // marginLeft: 20
  },
});

export default Temp;
