import {useState} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const RADIUS = 120;

const SCREEN_CENTER = {
  x: Dimensions.get('window').width / 2,
  y: Dimensions.get('window').height / 2,
};

const BeatScale = {
  weak: 1,
  strong: 1.1,
};

const BeatSize = 50;

export default function BeatIndicator({
  isDownBeat,
  beatNumber,
}: {
  isDownBeat: boolean;
  beatNumber: number;
}): JSX.Element {
  const isStrongBeat = useSharedValue(isDownBeat);

  const theta = Math.PI / 2 - (Math.PI / 6) * beatNumber;
  const sizeDelta = BeatSize / 2;

  const screenPosition = {
    x: RADIUS * Math.cos(theta) + SCREEN_CENTER.x - sizeDelta,
    y: -RADIUS * Math.sin(theta) + SCREEN_CENTER.y - sizeDelta,
  };

  const positionStyle = StyleSheet.create({
    position: {
      position: 'absolute',
      top: screenPosition.y,
      left: screenPosition.x,
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: isStrongBeat.value ? '#eb4431' : '#eb7831',
      transform: [
        {
          scale: withSpring(
            isStrongBeat.value ? BeatScale.strong : BeatScale.weak,
          ),
        },
      ],
    };
  });

  const tap = Gesture.Tap()
    .onEnd(() => {
      isStrongBeat.value = !isStrongBeat.value;
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        entering={FadeIn.duration(150)}
        layout={Layout}
        style={[animatedStyle, styles.beat, positionStyle.position]}>
        <Text>{beatNumber}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  beat: {
    width: BeatSize,
    height: BeatSize,
    borderRadius: BeatSize / 2,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
