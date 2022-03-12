import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Card from '../shared/UI/card';
import SelectedBookmark from '../shared/UI/SelectedBookmark';
import UnSelectedBookmark from '../shared/UI/UnSelectedBookmark';
import { newsListStore } from '../store/newsStore';

const NewsListItemScreen = observer((props) => {

    const newsPressEventHandler = () => {
        props.navigation.navigate('NewsContent', props.content)
    }

    return (
        <View>
            <Card>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 9 }}>
                        <Text onPress={newsPressEventHandler} style={{ justifyContent: "flex-start", fontWeight: "bold" }}>{props.content.title}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        {props.content.is_bookmarked === true && <SelectedBookmark id={props.content.id} />}
                        {props.content.is_bookmarked != true && <UnSelectedBookmark id={props.content.id} />}
                    </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 6 }}>
                        <Text style={{ justifyContent: 'flex-start' }}>{(new Date(props.content.time * 1000)).toLocaleDateString('en-US')}</Text>
                    </View>
                    <View style={{ flex: 3 }}>
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