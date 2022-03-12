import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Progress from 'react-native-progress';
import Card from '../shared/UI/card';
import SelectedBookmark from '../shared/UI/SelectedBookmark';
import UnSelectedBookmark from '../shared/UI/UnSelectedBookmark';
import { observer } from 'mobx-react';

const NewsContentScreen = observer(({ route }) => {

  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Progress.Bar progress={progress} width={null} />}
      <Card>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 9 }}>
            <Text style={{ fontWeight: 'bold' }}>
              {route.params.title}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            {route.params.is_bookmarked === true && <SelectedBookmark id={route.params.id} />}
            {route.params.is_bookmarked != true && <UnSelectedBookmark id={route.params.id} />}
          </View>
        </View>

      </Card>
      <WebView
        source={{ uri: route.params.url }}
        style={{ marginTop: 5 }}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
        onLoadEnd={() => { setIsLoaded(true) }}

      >
      </WebView>
    </>

  );
})

const styles = StyleSheet.create({
  newsListContainer: {
    flex: 1,
  },
});
export default NewsContentScreen;