import { View, Text, SectionList, SafeAreaView } from 'react-native'
import React, { useState } from 'react'

const Data = [
    {
        title: { key: '1', value: 'Main Course', description: 'test demo testing1' },
        data: ["Pizza", "Burger", "Risotto"]
    },
    {
        title: { key: '1', value: "Starters", description: 'test demo testing2' },
        data: ["French Fries", "Onion Rings", "Fried Shrimps", "Pizza"]
    },
    {
        title: { key: '1', value: "Drinks", description: 'test demo testing3' },
        data: ["Water", "Coke", "Beer"]
    },
    {
        title: { key: '1', value: "Desserts", description: 'test demo testing4' },
        data: ["Cheese Cake", "Ice Cream"]
    }
];

export default function pure() {

    const [dt, setDt] = useState(Data)
    var a = []
    var newA = []


    console.log("data",dt)
    const updateValues = (curr, index, i) => {
        console.log("i--", i)
        console.log("dt index",index)
        console.log("data at",curr.data)
        a = curr.data
        console.log("arr--- ",a)

       newA = a.filter((item) => {
            return (item != i)
        })
        console.log("a filtered--", newA)
        setDt((prevDt)=> {
            prevDt[index].data = newA
            console.log("prev data , arr-- ", prevDt, newA)
            return (prevDt)
        })
        
    }
    const deleteItem = (i) => {
        // console.log('item-- ', prevDt[0]);

        dt.forEach((element, index) => {updateValues(element,index, i)})
        setDt(dt)
    }
    const renderItem = ({ item }) => {
        console.log("item # -- ",item)

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, backgroundColor: 'aqua', margin: 20 }}>
                    {item}
                </Text>
                <Text
                    onPress={() => deleteItem(item)}
                    style={{ color: 'red' }}>
                    {'X'}
                </Text>
            </View>

        )
    }

    const renderSectionHeader = ({ section: { title: { value } } }) => {
        return (
            <Text style={{ fontSize: 50, fontWeight: 'bold', backgroundColor: 'blue', textAlign: 'center', color: 'white' }}>
                {value}
            </Text>
        )
    }
    return (
        <SafeAreaView>
            <SectionList
                sections={dt}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
            />
        </SafeAreaView>

    )
}