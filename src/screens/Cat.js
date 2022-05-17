import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

export default function Cat() {
    const URL = `https://api.thecatapi.com/v1/images/search?limit=100&page=${counter}`
    const [data, setData] = useState([])
    const [counter, setCounter] = useState(1)
    const [loading, setLoading] = useState(false);
    const callAPI = () => {
        setLoading(true)
        axios
            .get(URL, { headers: { 'x-api-key': "57181903-e6db-41c2-b54f-2b6f7a9b09f2" } })
            .then((res) => {
                setData([...data, ...res.data]);
                setLoading(false);
            })
    }
    useEffect(() => {
        callAPI()
    }, [])

    const renderItem = ({ item }) => {
        const url = item.url
        console.log(item.url, 'url')
        return (
            <Image style={styles.img} source={{ uri: url }} />
        )
    }

    const onEndReached = () => {
        // setCounter(counter=> counter+1)
        callAPI()
    }

    const getItemLayout = useCallback(
        (data, index) =>( {
            length : 200,
            offset: 200*index,
            index
        }),
        []
    )

    return (
        <View style={styles.container}>
            {
                
                loading ? <View>
                    <Text>loading...</Text>
                </View>
                :
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    maxToRenderPerBatch={1}
                    initialNumToRender={1}
                    removeClippedSubviews={false}
                    getItemLayout={getItemLayout}
                    ListEmptyComponent={<View>
                    
                    </View>}
                    //updateCellsBatchingPeriod={10000}
                    // onViewableItemsChanged={()=>{

                    // }}
                    // onEndReached={onEndReached}
                    // onEndReachedThreshold={0.5}    
                />
                }
            
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        height: 300,
        width: 300
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})