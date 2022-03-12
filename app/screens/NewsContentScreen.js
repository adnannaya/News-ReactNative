import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Progress from 'react-native-progress';
import Card from '../shared/UI/card';

function NewsContentScreen({ route }) {

  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Progress.Bar progress={progress} width={null} />}
      <Card>
        <Text style={{fontWeight: 'bold'}}>
          {route.params.title}
        </Text>
      </Card>
      <WebView
        source={{ uri: route.params.url }}
        style={{ marginTop: 5 }}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
        onLoadEnd={()=>{setIsLoaded(true)}}

      >
      </WebView>
    </>

  );
}

const styles = StyleSheet.create({
  newsListContainer: {
    flex: 1,
  },
});
export default NewsContentScreen;