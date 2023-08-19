import React from 'react';

import {StyleSheet, Text} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {clockRadius, screenCenter} from '../config';

interface BeatIndicatorProps {
  isDownBeat: boolean;
  beatNumber: number;
}

const beatScale = {
  weak: 1,
  strong: 1.1,
};

const beatSize = 50;

export default function BeatIndicator({
  isDownBeat,
  beatNumber,
}: BeatIndicatorProps): JSX.Element {
  const isStrongBeat = useSharedValue(isDownBeat);

  const theta = Math.PI / 2 - (Math.PI / 6) * beatNumber;

  const sizeDelta = beatSize / 2;

  const screenPosition = {
    x: clockRadius * Math.cos(theta) + screenCenter.x - sizeDelta,
    y: -clockRadius * Math.sin(theta) + screenCenter.y - sizeDelta,
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
            isStrongBeat.value ? beatScale.strong : beatScale.weak,
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
        style={[animatedStyle, styles.beat, positionStyle.position]}>
        <Text>{beatNumber}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  beat: {
    width: beatSize,
    height: beatSize,
    borderRadius: beatSize / 2,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
