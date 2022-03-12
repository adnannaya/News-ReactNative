import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Card from '../shared/UI/card';
import { newsListStore } from '../store/newsStore';

const NewsListItemScreen = observer((props) => {

    const newsPressEventHandler = () => {
        props.navigation.navigate('NewsContent', props.content)
    }

    const bookmarkSelectHandler = () => {
        console.log("bookmarkSelectHandler")
        newsListStore.markBookmark(props.content.id);
    }

    const bookmarkDeSelectHandler = () => {
        console.log("bookmarkDeSelectHandler")
        newsListStore.unMarkBookmark(props.content.id);
    }
    return (
        <View>
            <Card>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 8 }}>
                        <Text onPress={newsPressEventHandler} style={{ justifyContent: "flex-start", fontWeight: "bold" }}>{props.content.title}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        {props.content.is_bookmarked != true &&<Button onPress={bookmarkDeSelectHandler} style={{ justifyContent: "flex-end", marginLeft: 10, backgroundColor: "rgba(100,100,100)" }} title="B"></Button>}
                        {props.content.is_bookmarked === true &&<Button onPress={bookmarkSelectHandler} style={{ justifyContent: "flex-end", marginLeft: 10, backgroundColor: "rgba(100,100,0)" }} title="B"></Button>}
                    </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ justifyContent: 'flex-start' }}>{(new Date(props.content.time * 1000)).toLocaleDateString('en-US')}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ justifyContent: 'flex-end' }}>{props.content.by}</Text>
                    </View>
                </View>
            </Card>
        </View>

    );
})

const styles = StyleSheet.create({
    newsListContainer: {
        flex: 1,
    },
});
export default NewsListItemScreen;