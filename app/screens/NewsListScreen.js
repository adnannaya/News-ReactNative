import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
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
    const topStories = [];

    const getTopStories = async () => {
        try {
            console.log("getTopStories called")
            const topStories = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
            const topStoriesJson = await topStories.json();
            await setTopStoriesToStorage(topStoriesJson)
            return topStoriesJson
        }
        catch (err) {
            console.log("getTopStories", err);
            return [];
        }

    }

    const setTopStoriesToStorage = async (stories) => {
        try {
            // console.log(stories.slice(0, MAX_STORIES_TO_CACHE))
            await AsyncStorage.removeItem('TOP_STORIES')
            await AsyncStorage.setItem('TOP_STORIES', JSON.stringify(stories.slice(0, MAX_STORIES_TO_CACHE)))
        }
        catch (err) {
            console.log("setTopStoriesToStorage", err)
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
            console.log("setTopStoriesToStorage", err)
        }
    }

    const loadStoriesFromStorage = async () => {
        try {

            let stories = await getTopStoriesFromStorage();
            // console.log("Storage Stories", stories);
            let newsContent = await getNewsContent(stories);
            // console.log("Storage Content", newsContent);

            newsListStore.addNews(newsContent);

        } catch (err) {
            console.log("loadStoriesFromStorage", err);
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

            console.log(newsId.length, finalNewsContent.length);
            console.log(`${newNewsId.length} new stories found.`)
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
                    // console.log(result);
                    await AsyncStorage.setItem("" + result[i].id, JSON.stringify(result[i]));
                }
                finalNewsContent.unshift(...result);
            }
            else {
                console.log("No new stories found")
            }


            return finalNewsContent;
        }
        catch (err) {
            console.log("Error encountered")
            console.log(err);
            return []
        }
    }

    useEffect(async () => {
        try {
            console.log("loadStoriesFromStorage Started")
            await loadStoriesFromStorage();
            console.log("loadStoriesFromStorage Finished")
        }
        catch (err) {
            console.log(err)
        }


    }, []);

    useEffect(async () => {
        try {
            // await clearStorage()
            console.log("new stories loading Started")
            setIsLoading(true);
            this.topStories = await getTopStories();
            console.log(this.topStories.length)
            const newsContent = await getNewsContent(this.topStories)
            newsListStore.addNews(newsContent)
            console.log("new stories loading Finished")
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setIsLoading(false);
        }
    }, [isRefresh])

    const storeTop30Stories = async (data) => {
        try {
            for (let i = 0; i < data.length; i++) {
                let keyValues = []
                for (let i = 0; i < data.length; i++) {
                    keyValues.push([data[i].id, data[i]])
                }

                let keys = await AsyncStorage.getAllKeys();
                await AsyncStorage.multiRemove(keys);

                await AsyncStorage.multiSet(keyValues);
            }
        }
        catch (err) {

        }
    }

    return (
        <>
            {/* {isLoading && <Progress.Circle style={styles.progressBarCentre} size={30} indeterminate={true} />} */}
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