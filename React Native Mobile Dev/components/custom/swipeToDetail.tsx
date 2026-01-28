import React from 'react'
import {View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {useAnimatedStyle, useSharedValue, withSpring, runOnJS} from 'react-native-reanimated'
import {scheduleOnRN} from 'react-native-worklets'

interface Props {
  children: React.ReactNode
  onSwipeLeft: () => void
}

const SwipeToDetail = ({children, onSwipeLeft}: Props) => {
  const translateX = useSharedValue(0)
  const THRESHOLD = -100

  const gesture = Gesture.Pan()

    .onUpdate(event => {
      if (event.translationX < 0) {
        translateX.value = event.translationX
      }
    })
    .onEnd(event => {
      if (event.translationX < THRESHOLD) {
        scheduleOnRN(onSwipeLeft)
      }
      translateX.value = withSpring(0)
    })
    .activeOffsetX([-10, 10])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
    opacity: 1 + translateX.value / 400,
  }))

  return (
    <View className="relative overflow-hidden">
      <GestureDetector gesture={gesture}>
        <Animated.View style={animatedStyle}>{children}</Animated.View>
      </GestureDetector>
    </View>
  )
}

export default SwipeToDetail
