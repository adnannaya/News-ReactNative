import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, TouchableOpacity } from 'react-native';
import { newsListStore } from '../../store/newsStore';

const SelectedBookmark = (props) => {

    const onUnnSelectBookmarkHandler = async () => {
        let result = newsListStore.markBookmark(props.id);

        if(result){
            await AsyncStorage.setItem(""+props.id, JSON.stringify(result))
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={onUnnSelectBookmarkHandler} activeOpacity={0.5}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../../../assets/Selected-star.png")}
                />
            </TouchableOpacity>
        </View>
    )
}

export default SelectedBookmark;