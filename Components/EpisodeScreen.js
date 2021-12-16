import React from 'react';
import styled from 'styled-components';
import { Text, ScrollView, TouchableOpacity, Dimensions, View, Image, StyleSheet } from 'react-native';
import MedCard from '../Components/MedCard';
import Carousel from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient';
const screenWidth = Dimensions.get("window").width;

class EpisodeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

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
  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("episode");
    const MedCardData = navigation.getParam("datas");
    const MovieCardData = navigation.getParam("movieData");
    return (
      <LinearGradient
        style={styles.linearGradient}
        colors={['#fc00ff', '#00dbde']}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.5, 0.6]}>
        <Container>
          <ScrollView>
            <CoverImage >
              <EpisodeImage source={{ uri: data.image }} />
            </CoverImage>
            <Text style={{
              color: "white",
              fontSize: 20,
              marginTop: 10,
              marginLeft: 10,
              marginBottom: 10,
              fontWeight: "bold"
            }}>{data.title}</Text>
            <FirstTextContainer>
              <ContainerText> Continue Watching </ContainerText>
            </FirstTextContainer>
            <MedCardContainer>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {MedCardData.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.props.navigation.push("Video", {
                        video: data,
                        datas: MedCardData,
                        movieData: MovieCardData
                      });
                    }}
                  >
                    <MedCard image={data.image} />
                  </TouchableOpacity>

                ))}
              </ScrollView>
            </MedCardContainer>
            <SecondTextContainer>
              <LikeText> Latest Videos </LikeText>
            </SecondTextContainer>
            <Carousel
              ref={c => this._carousel = c}
              data={MedCardData}
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
              // activeAnimationType={"spring"}
              // activeAnimationOptions={{
              //   friction: 4,
              //   tension: 40
              // }}
              contentContainerCustomStyle={{
                height: 220,
                marginLeft: 10,
                marginTop: 10
              }}
              //U Can Change AnimationType
              layout={'stack'}
              layoutCardOffset={15}
            />
          </ScrollView>
        </Container>
      </LinearGradient >
    );
  }
}

export default EpisodeScreen;
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 5
  }
})
const Container = styled.View`
  flex: 1px;
`;

const CoverImage = styled.View`  
  width: 100%;
  height: 229px;
`;

const EpisodeImage = styled.View`
  width: 100%;
  height: 100%;
`;
const FirstTextContainer = styled.View`
left: 6px;
width: 200px;
top: 10px;
background: white;
border-radius: 10px;
/* align-items: center; */
 /* justify-content: center; */
`;

const ContainerText = styled.Text`
  margin-top: 20px;
  margin-left: 10px;
  color: black;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  bottom: 10px;
`;
const SecondTextContainer = styled.View`
left: 6px;
width: 150px;
top: 5px;
background: white;
border-radius: 10px;
/* align-items: center; */
/* justify-content: center; */
`;

const LikeText = styled.Text`
  margin-top: 20px;
  margin-left: 10px;
  color: black;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  bottom: 10px;
`;

const MedCardContainer = styled.View`
  margin-top: 20px;
  margin-left: 5px;
`;