import { View, Text } from 'react-native'
import React from 'react'

export default function RenderChild(props) {
  return (

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, backgroundColor: 'aqua', margin: 20}}>
                {props.item + "hello"}
            </Text>
            <Text 
            onPress={()=>props.deleteItem(indexOf(props.item))}
            style={{color: 'red'}}>
                {'X'}
            </Text>
            </View>

        
  )
}