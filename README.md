# React Native auto carousel
A React Native module that allows you to show a Carousel of photo/view with autoPlay or swipe.

## Showcase

### :raised_hands: layouts

![react-native-snap-carousel default layout](https://i.imgur.com/vWa1u0M.gif)

---
Install
```
yarn add react-native-auto-carousel
```
or
```
npm install react-native-auto-carousel
```

## Methods

```js
import {Carousel} from 'react-native-auto-carousel';
```
### Usage

```js
import React from 'react';
import {Dimensions, Image} from 'react-native';
import {Carousel} from 'react-native-auto-carousel';

const DEVICE_WIDTH = Dimensions.get('window').width;
const IMAGES = ['../images/1.png', '../images/2.png', '../images/3.png']
const App = () => {
return (
<Carousel
      data={Images}
      renderItem={item => (
        <Image
          key={item}
          src={{uri: item}}
          style={{
            height: '100%',
            width: DEVICE_WIDTH
          }}
        />
      )}
    />
    )}
```
In the data prop you can pass any list which you want to show in the carousel
The renderItem function let you display a component of your choice

## List of props

| Option         | Description                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| data (required)      | An array of data which you want to display maybe images, text, objects etc.                             |
| renderItem (required)       | callback which give you access to the indivisual item of data and the component you want to show.                                                                                                                  |
| autoPlay (options)      | Accepts a boolean to enable or disable auto play (true by default)                                                                                                                   |
| autoPlayTime   | The time in milli seconds you want to change the image/view                                                                       |
| dotStyle  |The dots shown on the images which show the count and selected (by default they are white and round)                                                                                                          |        
