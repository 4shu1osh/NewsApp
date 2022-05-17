import { View, Text, FlatList, SafeAreaView, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function comment() {
    const [data, setData] = useState([])
    const [itemNo, setItemNo] = useState(50)
    const [isRefreshing, setIsRefreshing] = useState(false)
    let listRefView;

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/comments')
            .then((res) => {
                setData(res.data.slice(0, 50))
            })
    }, [])

    const endButtonHandler = () => {
        listRefView.scrollToEnd({ animated: true })
    }
    const topButtonHandler = () => {
        listRefView.scrollToOffset({ offset: 0, animated: true })
    }
    const onEndReached = () => {
        axios
            .get('https://jsonplaceholder.typicode.com/comments')
            .then((res) => {
                setData([...data, ...res.data.slice(itemNo, (itemNo + 50))])
                setItemNo(itemNo + 50)
            })
    }

    const ref = (ref) => {
        listRefView = ref
    }

    const onRefresh = () => {
        setIsRefreshing(true)
        axios
            .get('https://jsonplaceholder.typicode.com/comments')
            .then((res) => {
                let page = Math.random() * 100
                setData(res.data.slice(page, page + 50))
                setItemNo(page + 50)
            })
        setIsRefreshing(false)
    }

    const ListFooter = () => (
          
            <Text style={{ fontFamily: 'SourceCodePro-Regular', fontWeight: 'bold', fontSize: 20, margin: 10, marginBottom: 20, color: 'lightgreen' }}>
                {"Loading..."}
                </Text>
        );    

    const ItemSeparatorComponent = () => (
        <View
            style={{
                width: '100%',
                height: 1,
                backgroundColor: 'darkgreen',
                alignSelf: 'center',
            }}
        />
    )

    const renderItem = ({ item }) => (
        <Text
            style={{ fontFamily: 'SourceCodePro-Regular', fontWeight: 'bold', fontSize: 20, margin: 10, marginBottom: 20, color: item.id % 2 === 0 ? 'green' : 'lightgreen' }}>
            {item.id + ': ' + item.email}
        </Text>
    )
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center', margin: 10, color: 'green' }}>{"<?>"}</Text>
            <FlatList
                style={{ flex: 1 }}
                data={data}
                renderItem={renderItem}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ItemSeparatorComponent={ItemSeparatorComponent}
                ListFooterComponent = {ListFooter}
                initialNumToRender = { 100 }
                ref={ref}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor={'lightgreen'}
                    />
                }
            />
            <TouchableOpacity
                onPress={endButtonHandler}
                style={{ backgroundColor: 'darkgreen', borderRadius: 50, height: 50, width: 50, top: 140, right: 30, position: 'absolute', justifyContent: 'center', alignItems: 'center', opacity: 0.8 }}>

                <Text style={{ color: 'lightgreen', fontSize: 20 }} >
                    {"↓"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={topButtonHandler}
                style={{ backgroundColor: 'darkgreen', borderRadius: 50, height: 50, width: 50, bottom: 70, right: 30, position: 'absolute', justifyContent: 'center', alignItems: 'center', opacity: 0.8 }}>
                <Text style={{ color: 'lightgreen', fontSize: 20 }} >
                    {"↑"}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}