import React from 'react';
import styled from 'styled-components';
import Carousel from "react-native-snap-carousel";
import {
  View,
  Image,
  Dimensions,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import firebaseApp from '../FirebaseConfig';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get("window").width;

export default class courseScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    MovieCardData: [],
    MedCardData: []
  }

  componentDidMount() {
    console.disableYellowBox = true;
    this.Moviedatabase = firebaseApp
      .database()
      .ref()
      .child("MovieCardData");
    this.getMovieCardData(this.Moviedatabase);
    this.Meddatabase = firebaseApp
      .database()
      .ref()
      .child("MedCardData");
    this.getMedCardData(this.Meddatabase);

  }

  getMovieCardData = database => {
    database.on("value", snap => {
      let items = [];
      snap.forEach(child => {
        items.push({
          image: child.val().image,
          episodeImage: child.val().episodeImage,
          title: child.val().title
        });
      });
      this.setState({
        MovieCardData: items
      });
    });
  }
  getMedCardData = database => {
    database.on("value", (snap) => {
      let items = [];
      snap.forEach(child => {
        items.push({
          title: child.val().title,
          image: child.val().image,
          video: child.val().video
        });
      });
      this.setState({
        MedCardData: items
      });
    });
    console.log("MovieCardData")
  }
  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.push("Episode", {
            episode: item,
            datas: this.state.MedCardData,
            movieData: this.state.MovieCardData
          });
        }}>
        <View style={{ borderRadius: 10, overflow: "hidden" }}>
          <Image source={{ uri: item.image }} style={{ width: "100%", height: 350 }} />
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <LinearGradient style={styles.linearGradient} colors={['#1FA2FF', '#12D8FA', '#A6FFCB']}>
        <Container>
          <StatusBar hidden />
          <Cirtcle1 />
          <Cirtcle2 />

          <Latest>
            <Text style={{
              fontSize: 20,
              color: "white"
            }}>Latest</Text>
          </Latest>
          <SlideContainer>
            <Carousel
              ref={c => this._carousel = c}
              data={this.state.MovieCardData}
              renderItem={this._renderItem}
              sliderWidth={screenWidth}
              itemWidth={240}
              inactiveSlideScale={0.85}
              inactiveSlideOpacity={1}
              inactiveSlideShift={20}
              enableMomentum={true}
              activeSlideAlignment={"start"}
              // activeAnimationType={"spring"}
              // activeAnimationOptions={{
              //     friction: 4,
              //     tension: 40
              // }}
              loop={true}
              autoplay={true}
              autoplayDelay={4000}
              autoplayInterval={3000}
              contentContainerCustomStyle={{
                height: 900,
                marginLeft: 80
              }}
            //U Can Change AnimationType
            // layout={'stack'}
            // layoutCardOffset={18}
            />
          </SlideContainer>
        </Container>
      </LinearGradient>
    );
  }
}
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 5
  }
})

const Container = styled.View`
  flex: 1;
  justify-content: center;
  /* align-items: center; */
  
`;

const Cirtcle1 = styled.View`
position: absolute;
width: 340.52px;
height: 868.17px;
left: -200px;
top: 360.69px;
border-radius: 600px;
transform: rotate(-32.36deg);
background: white;
`;

const Cirtcle2 = styled.View`
position: absolute;
width: 340.52px;
height: 868.17px;
left: 170px;
top: -2.41px;
border-radius: 600px;
transform: rotate(-32.62deg);
background: white;
`;
// const Cirtcle2 = styled.View`
// position: absolute;
// width: 824.19px;
// height: 1000px;
// left: 355.23px;
// top: 795.5px;
// transform: rotate(159.31deg);
// background: white;
// `;

const Latest = styled.View`
 position: absolute;
 width: 150px;
 height: 42px;
 left: 131px;
 top: 28px;
 background: #292E49;
 border-radius: 8px;
 justify-content: center;
 align-items: center;
`;

const SlideContainer = styled.View`
  margin-top: 530px;
  width: ${screenWidth};
  height: 900px;
`;
