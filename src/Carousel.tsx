import React, {useState, useEffect, useId} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewStyle,
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

type CarouselProps<T> = {
	data: T[];
	renderItem: (item: T, index: number) => React.ReactNode;
	autoPlayTime?: number;
	autoPlay?: boolean;
	dotStyle?: ViewStyle
}

const Carousel = <T extends unknown>(props: CarouselProps<T>) => {
	const {
		data, 
		renderItem, 
		autoPlayTime = 5000, 
		autoPlay = true, 
		dotStyle={
			width: 10,
			height: 10,
			borderRadius: 5,
			backgroundColor: '#fff',
		}} = props
  const scrollRef = React.useRef<ScrollView|null>(null);
  const [state, setState] = useState({selectedIndex: 0});

  useEffect(() => {
    if(autoPlay){setInterval(() => {
      setState((prev) => ({
        selectedIndex:
          prev.selectedIndex === data.length - 1 ? 0 : prev.selectedIndex + 1,
      }));
    }, autoPlayTime);}
  }, []);

  useEffect(() => {
      scrollRef.current?.scrollTo({
        animated: true,
        y: 0,
        x: DEVICE_WIDTH * state.selectedIndex,
      });
  }, [state]);

  const setSelectedIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.floor(contentOffset / viewSize);
    setState({selectedIndex: selectedIndex});
  };

  const renderDots = (_: T, i: number) => {
	return <View
            key={`dot-${i.toString()}`}
            style={{
				...dotStyle,
				margin: 8,
				opacity: i === state.selectedIndex ? 0.5 : 1,
            }}
          />
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
		showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={setSelectedIndex}
        ref={scrollRef}>
        {data.map((image, index) => (
			renderItem(image, index)
        ))}
      </ScrollView>
      <View style={styles.circleDiv}>
        {data.map((_, i) => (
          renderDots(_, i)
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  circleDiv: {
    position: 'absolute',
    top: '95%',
    height: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
export default Carousel;