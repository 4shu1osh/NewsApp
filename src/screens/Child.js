import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,

    ImageBackground,
    Linking,

    SafeAreaView
} from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'

export default function Child(props) {


    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    }, []);
    return (
        <View style={styles.parent}>

            <View style={styles.container}>
                <ImageBackground>
                    <View >
                        <Text style={{ marginBottom: 10,  fontWeight: 'bold' }}> {'\n'+props.item.title}</Text>
                        <Image style={styles.styleImg} source={{ uri: `${props.item.urlToImage}` }} />
                        {props.item.urlToImage ? null : <Text style={{position: 'absolute', top: 110, left:95}}>{"No image available"}</Text>}
                        <View>
                            <Text
                                style={{ marginTop: 10 }}
                                onTextLayout={onTextLayout}
                                numberOfLines={textShown ? null : 2}>
                                {props.item.description}
                                {"\n\nSource:\t"}
                                <Text
                                    style={{ color: 'blue' }}
                                    onPress={() => {
                                        Linking.openURL(props.item.url)
                                    }}>
                                    {props.item.url}
                                </Text>
                            </Text>

                            <Text
                                onPress={toggleNumberOfLines}
                                style={{ lineHeight: 20, marginTop: 10, color: 'grey' }}>
                                {textShown ? 'Read less' : 'Read more...'}
                            </Text>


                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    parent: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 10
    },
    container: {
        borderRadius: 10,
        width: 350,
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
    },
    styleImg: {
        width: "100%",
        height: 130,
        borderRadius: 10,
        backgroundColor: 'grey'
    },
    sectionText: {
        fontSize: 20,
        width: '100%',
        backgroundColor: 'black',
        color: 'white',
        fontWeight: 'bold',

    }
});