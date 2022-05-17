import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'

export default function memeGenChild(props) {
    const {item} = props
    console.log("first")
    console.log(item)
    if(item.data.is_video === false){
        return (
            <View >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                    <Text style={{ color: 'grey' }}>
                        {"Posted by u/: " + item.data.author + ' | ' + moment.unix(item.data.created).fromNow()}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize: 30, color: '#ff4500' }}>{'▲'}</Text>
                        <Text style={{fontSize: 20, color: '#ff4500' }}>{item.data.ups}</Text>
                        <Text style={{fontSize: 30, color: '#7193ff' }}>{'▼'}</Text>
                    </View>
                    <Text style={{ fontSize: 20, margin: 16, color: 'white' }}>
                    {item.data.title}
                </Text>
                </View>
                <Image
                    style={{ height: 400, width: 400, alignSelf: 'center', margin: 16, resizeMode: 'contain' }}
                    source={{
                        uri: item.data.url
                    }}

                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                   
                    <Text style={{fontSize: 20, color: '#ff4500' }}>
                        {"Comments: " + item.data.num_comments}
                    </Text>
         

                </View>
            </View>

        )}
        else{
            return null
        }
}