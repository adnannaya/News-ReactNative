import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import NewsListItemScreen from './NewsListItemScreen';
import * as Progress from 'react-native-progress';
import { ScrollView } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-transparent-spinner';
import { newsListStore } from '../store/newsStore';
import { observer } from 'mobx-react';

const NewsListScreen = observer((props) => {

    // const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefresh, setIsRefresh] = useState(false);

    const CHUNK_SIZE = 30;
    const MAX_STORIES_TO_CACHE = 30;

    const getTopStories = async () => {
        try {
            const topStories = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
            const topStoriesJson = await topStories.json();
            await setTopStoriesToStorage(topStoriesJson)
            return topStoriesJson
        }
        catch (err) {
            return [];
        }

    }

    const setTopStoriesToStorage = async (stories) => {
        try {
            await AsyncStorage.removeItem('TOP_STORIES')
            await AsyncStorage.setItem('TOP_STORIES', JSON.stringify(stories.slice(0, MAX_STORIES_TO_CACHE)))
        }
        catch (err) {
        }
    }

    const getTopStoriesFromStorage = async () => {
        try {
            let stories = await AsyncStorage.getItem('TOP_STORIES');
            if (!stories)
                return []
            return JSON.parse(stories);
        }
        catch (err) {
            // console.log("setTopStoriesToStorage", err)
        }
    }

    const loadStoriesFromStorage = async () => {
        try {

            let stories = await getTopStoriesFromStorage();
            let newsContent = await getNewsContent(stories);

            newsListStore.addNews(newsContent);

        } catch (err) {
            // console.log("loadStoriesFromStorage", err);
        }
    }
    const clearStorage = async () => {
        let keys = await AsyncStorage.getAllKeys();
        if (keys && keys.length > 0)
            await AsyncStorage.multiRemove(keys)
    }
    const getNewsContent = async (newsId) => {
        try {
            if (!Array.isArray(newsId))
                newsId = [newsId];

            let newNewsId = [];
            let finalNewsContent = [];

            for (let i = 0; i < newsId.length; i++) {
                const found = await AsyncStorage.getItem("" + newsId[i]);
                if (!found)
                    newNewsId.push(newsId[i]);
                else {
                    finalNewsContent.push(JSON.parse(found))
                }
            }

            // console.log(newsId.length, finalNewsContent.length);
            // console.log(`${newNewsId.length} new stories found.`)
            let promises = [];
            for (let i = 0; i < newNewsId.length; i++) {
                promises.push(fetch(`https://hacker-news.firebaseio.com/v0/item/${newNewsId[i]}.json`))
            }

            if (promises.length > 0) {
                const newsContent = await Promise.all(promises);

                let result = [];
                for (let i = 0; i < newsContent.length; i++) {
                    let json = await newsContent[i].json()
                    result.push(json)
                }

                for (let i = 0; i < result.length; i++) {
                    await AsyncStorage.setItem("" + result[i].id, JSON.stringify(result[i]));
                }
                finalNewsContent.unshift(...result);
            }

            return finalNewsContent;
        }
        catch (err) {
            return []
        }
    }

    useEffect(async () => {
        try {
            await loadStoriesFromStorage();
        }
        catch (err) {
            // console.log(err)
        }


    }, []);

    useEffect(async () => {
        try {
            // await clearStorage()
            setIsLoading(true);
            const topStories = await getTopStories();
            const newsContent = await getNewsContent(topStories)
            newsListStore.addNews(newsContent)
        }
        catch (err) {
            // console.log(err)
        }
        finally {
            setIsLoading(false);
        }
    }, [isRefresh])

    return (
        <>
            <Spinner visible={isLoading} />
            <FlatList
                data={newsListStore.newsList}
                renderItem={({ item }) => {
                    return <NewsListItemScreen navigation={props.navigation} content={item} />
                }}
                keyExtractor={item => item.id}
            />
        </>
    );
})

const styles = StyleSheet.create({
    newsListContainer: {
        flex: 1,
    },
    progressBarCentre: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: 'rgba(0,0,0, 0.8)',
        // padding: 8,
    }
});
export default NewsListScreen;