import {useState} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {FadeIn, Layout} from 'react-native-reanimated';

export default function BeatIndicator() {
  const [size, setSize] = useState(50);

  const tap = Gesture.Tap()
    .onEnd(() => setSize(size + 30))
    .runOnJS(true);

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        entering={FadeIn.duration(1500)}
        layout={Layout}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'goldenrod',
        }}
      />
    </GestureDetector>
  );
}
