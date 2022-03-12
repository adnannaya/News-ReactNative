import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, TouchableOpacity } from 'react-native';
import { newsListStore } from '../../store/newsStore';

const UnSelectedBookmark = (props) => {

    const onUnnSelectBookmarkHandler = async () => {
        const result = newsListStore.unMarkBookmark(props.id);

        if(result){
            await AsyncStorage.setItem(""+props.id, JSON.stringify(result))
        }
    }
    return (
        <View>
            <TouchableOpacity onPress={onUnnSelectBookmarkHandler} activeOpacity={0.5}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../../../assets/Unselected-star.png")}
                />
            </TouchableOpacity>


        </View>
    )
}

export default UnSelectedBookmark;