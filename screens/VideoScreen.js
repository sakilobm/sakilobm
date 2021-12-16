import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Video from 'react-native-video-controls/VideoPlayer';
import MedCard from '../Components/MedCard';
import MovieCard from '../Components/MovieCard';
import LinearGradient from 'react-native-linear-gradient';

class VideoScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  render() {  //Navigation default option
    const { navigation } = this.props;
    const data = navigation.getParam("video");
    const MedCardData = navigation.getParam("datas");
    const MovieCardData = navigation.getParam("movieData");
    return (
      <LinearGradient
        style={styles.linearGradient}
        // colors={['#485563', '#29323c']}
        // colors={['#000428', '#004e92']}
        colors={['#8A2387', '#E94057', '#F27121']}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.6, 0.6]}
      >
        <Container>
          <ScrollView showsVerticalScrollIndicator={false}>
            <VideoContainer>
              <Video
                source={{
                  uri: data.video
                }}
                shouldPlay={true}
                toggleResizeModeOnFullscreen={true}
                onBack={true}
                fullscreen={true}
                resizeMode={'cover'}
                disableOnBack={true}
                style={{ width: "100%", height: "100%" }}
              />
            </VideoContainer>
            <VideoTitle>{data.title}</VideoTitle>
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
              <LikeText> You Also Like </LikeText>
            </SecondTextContainer>
            <MovieCardContainer>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {MovieCardData.map((data, index) => (
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
                    <MovieCard image={data.image} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </MovieCardContainer>
          </ScrollView>
        </Container>
      </LinearGradient>
    );
  }
}

export default VideoScreen;

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 5
  }
})

const Container = styled.View`
  flex: 1;
`;

const VideoContainer = styled.View`
width: 100%;
height: 201px;
background: black;

`;

const VideoTitle = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  color: white;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 600;
`;
const MedCardContainer = styled.View`
  margin-top: 20px;
  margin-left: 5px;
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
top: 10px;
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
const MovieCardContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 5px;
`;
