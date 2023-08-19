import React from 'react';
import {StyleSheet} from 'react-native';

import BeatIndicator from './components/BeatIndicator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const buleria_pattern = [
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
];

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      {buleria_pattern.map((beat, beatNumber) => (
        <BeatIndicator
          isDownBeat={beat}
          beatNumber={beatNumber}
          key={beatNumber}
        />
      ))}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default App;
