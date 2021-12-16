import React from 'react';
import styled from "styled-components";
import Carousel from "react-native-snap-carousel";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default class BigCard extends React.Component {

  _renderItem({ item, index }) {
    return (
      <View style={{ borderRadius: 10, overflow: "hidden" }}>
        <Image
          source={{
            uri: item.image
          }}
          style={{
            width: "100%",
            height: 220
          }}
        />
      </View>
    )
  }

  componentDidMount() {
    console.log(this.props.data)
  }

  render() {
    return (
      <Container>
        <Carousel
          ref={c => this._carousel = c}
          data={this.props.data}
          renderItem={this._renderItem}
          sliderWidth={screenWidth}
          itemWidth={385}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          activeSlideAlignment={"start"}
          loop={true}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          activeAnimationType={"spring"}
          activeAnimationOptions={{
            friction: 5,
            tension: 40
          }}
          contentContainerCustomStyle={{
            height: 220,
            marginLeft: 10
          }}
        //U Can Change AnimationType
        // layout={'stack'}
        // layoutCardOffset={50}
        />
      </Container>

    );
  }
}

const Container = styled.View`
  width: ${screenWidth};
  height: 220px;
 
`;

