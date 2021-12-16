import React from 'react';
import styled from 'styled-components';
import { ScrollView, StatusBar, StyleSheet, } from 'react-native';
import BigCard from '../Components/BigCard';
import MedCard from '../Components/MedCard';
import Icon from '../node_modules/react-native-vector-icons/dist/FontAwesome5';
import { TouchableOpacity, Animated, Dimensions, View } from 'react-native';
import Menu from '../Components/Menu';
import { connect } from 'react-redux';
import MovieCard from '../Components/MovieCard';
import firebaseApp from '../FirebaseConfig';
import Login from '../Components/Login';
import LinearGradient from 'react-native-linear-gradient';
import CircleCard from '../Components/CircleCard';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as firebase from "firebase"

const screenHeight = Dimensions.get('window').height;

function mapStateToProps(state) {
  return { menu: state.menu, log: state.log }
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () => dispatch({ type: 'OPENMENU' }),
    openLogin: () => dispatch({ type: 'OPENLOGIN' }),

  }
}

class HomeScreen extends React.Component {
  //Used To Removed Unused Header 
  static navigationOptions = {
    header: null
  };
  state = {
    left: 10,
    top: new Animated.Value(screenHeight),
    opacity: new Animated.Value(0),
    MedCardData: [],
    CircleCardData: [],
    BigCardData: [],
    MovieCardData: []
  };

  componentDidMount() {
    console.disableYellowBox = true;
    this.Bigdatabase = firebaseApp
      .database()
      .ref()
      .child("BigCardData");
    this.getBigCardData(this.Bigdatabase);
    this.Circledatabase = firebaseApp
      .database()
      .ref()
      .child("CircleCardData");
    this.getCircleCardData(this.Circledatabase);
    this.Meddatabase = firebaseApp
      .database()
      .ref()
      .child("MedCardData");
    this.getMedCardData(this.Meddatabase);
    this.Moviedatabase = firebaseApp
      .database()
      .ref()
      .child("MovieCardData");
    this.getMovieCardData(this.Moviedatabase);
  }
  getBigCardData = database => {
    database.on("value", (snap) => {
      let items = [];
      snap.forEach(child => {
        items.push({
          title: child.val().title,
          image: child.val().image
        });
      });
      this.setState({
        BigCardData: items
      });

    });

  }

  getCircleCardData = database => {
    database.on("value", snap => {
      let items = [];
      snap.forEach(child => {
        items.push({
          image: child.val().image,
          title: child.val().title,
        });
      });
      this.setState({
        CircleCardData: items
      });

    });
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
    console.log("MovieCardData: ",MovieCardData)
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
  }
  componentDidUpdate() {
    this.blackscreen()

    console.log(MovieCardData)
  }

  blackscreen() {
    if (this.props.menu == 'openMenu') {
      Animated.timing(this.state.top, { toValue: 0, duration: 10 }).start()
      Animated.timing(this.state.opacity, {
        toValue: 0.6,
        duration: 500
      }).start();
    }
    if (this.props.menu == 'closeMenu') {
      Animated.timing(this.state.top, {
        toValue: screenHeight,
        duration: 10,
      }).start();
      Animated.spring(this.state.opacity, { toValue: 0 }).start();
    }
  }

  handleLogin = () => {
    if (this.props.log) {
      this.props.openMenu();
    } else {
      this.props.openLogin();
    }
  }

  render() {
    return (
      <LinearGradient
        style={styles.linearGradient}
        colors={['#40E0D0', '#FF8C00', '#FF0080']}
      // colors={['#485563', '#29323c']}
      // colors={['#a8ff78', '#78ffd6']}
      // colors={['#5433FF', '#20BDFF', '#A5FECB']}
      // start={{ x: 0.0, y: 0.25 }}
      // end={{ x: 0.5, y: 1.0 }}
      // locations={[0, 0.5, 0.6]}
      >
        <Root>
          <Main >
            <ScrollView showsVerticalScrollIndicator={false}>
              <StatusBar showHideTransition />
              <Header>
                <TouchableOpacity
                  onPress={this.handleLogin}
                  style={{
                    position: "absolute",
                    top: 12,
                    left: this.state.left,
                    zIndex: 100,
                  }}
                >
                  <Icon name="align-justify" size={27} style={{ left: 5, top: 2 }} />
                </TouchableOpacity>
                <Logo>
                  Obm Studio
                </Logo>
                <Profile style={{ right: 5 }} source={require("../assets/download.jpg")} />
              </Header>
              <BigCardContainer>
                <BigCard data={this.state.BigCardData} />
              </BigCardContainer>
              <FirstTextContainer>
                <ContainerText> Continue Watching </ContainerText>
              </FirstTextContainer>
              <MedCardContainer>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {this.state.MedCardData.map((data, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.props.navigation.push("Video", {
                          video: data,
                          datas: this.state.MedCardData,
                          movieData: this.state.MovieCardData
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
                  {this.state.MovieCardData.map((data, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.props.navigation.push("Episode", {
                          episode: data,
                          datas: this.state.MedCardData,
                          movieData: this.state.MovieCardData
                        });
                      }}
                    >
                      <MovieCard image={data.episodeImage} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </MovieCardContainer>
            </ScrollView>
          </Main>
          <Menu />
          <Login />
        </Root>
      </LinearGradient>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 5
  }
})
const Root = styled.View`
  flex: 1px;
`;
const Main = styled.View`
  flex: 1px;
`;
const Black = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  flex: 1px;
  background: black;
  opacity: 0.6;
`;
const AnimatedBlack = Animated.createAnimatedComponent(Black)
const Header = styled.View`
  width: 100%;
  height: 56px;
  background: white;
  justify-content: center;
  border-radius: 20px;
`;
const Logo = styled.Text`
  height: 25px;
  font-size: 23px;
  margin: 0 0 6px 130px;
  color: lightsalmon;
  text-transform: uppercase;
  font-weight: bold;
`;
const Profile = styled.Image`
  position: absolute;
  top: 8px;
  right: 5px;
  width: 40px;
  height: 40px;
  background: #c4c4c4;
  border-radius: 17px;
`;

const BigCardContainer = styled.View`
  margin-top: 5px;
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

const MedCardContainer = styled.View`
  margin-top: 20px;
  margin-left: 5px;
`;

const MovieCardContainer = styled.View`
  margin-top: 20px;
  margin-left: 5px;
  margin-bottom: 10px;
`;
const TextCircle = styled.Text`
  margin-top: 20px;
  margin-left: 15px;
  color: black;
  font-size: 17px;
  font-weight: bold;
  text-transform: uppercase;
  bottom: 10px;
`;


const BigCardData = [
  {
    image: "https://frankeey.com/image/course/KXineZ1NFtQnHFq07QI8ndjzxD5ouTGu4r9S4Zwg.jpg",
    title: "Sk Hacker"
  },
  {
    image:
      "https://frankeey.com/image/course/kDH3hm9VFO4gHNW5Mn6gq1f89CjAryCJLeEweiF6.jpg",
    title: "Sk Developer"
  },
  {
    image:
      "https://frankeey.com/image/course/5NjwtmYYpgtKhxYdC6TDgVcXtPRC5w4G3HM3nJid.jpg",
    title: "SK Master"
  },
  {
    image: "https://frankeey.com/image/course/5NjwtmYYpgtKhxYdC6TDgVcXtPRC5w4G3HM3nJid.jpg",
    title: "SK Hero"
  }
]

const CircleCardData = [
  {
    image: "https://frankeey.com/image/course/KXineZ1NFtQnHFq07QI8ndjzxD5ouTGu4r9S4Zwg.jpg",
    title: "Cc1"
  },
  {
    image:
      "https://frankeey.com/image/course/kDH3hm9VFO4gHNW5Mn6gq1f89CjAryCJLeEweiF6.jpg",
    title: "Cc2"
  },
  {
    image:
      "https://frankeey.com/image/course/5NjwtmYYpgtKhxYdC6TDgVcXtPRC5w4G3HM3nJid.jpg",
    title: "Cc3"
  },
  {
    image: "https://frankeey.com/image/course/5NjwtmYYpgtKhxYdC6TDgVcXtPRC5w4G3HM3nJid.jpg",
    title: "Cc4"
  }
]

const MedCardData = [
  {
    image: "https://frankeey.com/image/course/KXineZ1NFtQnHFq07QI8ndjzxD5ouTGu4r9S4Zwg.jpg",
    title: 1

  },
  {
    image: "https://frankeey.com/image/course/kDH3hm9VFO4gHNW5Mn6gq1f89CjAryCJLeEweiF6.jpg",
    title: 2,

  },
  {
    image: "https://frankeey.com/image/course/5NjwtmYYpgtKhxYdC6TDgVcXtPRC5w4G3HM3nJid.jpg",
    title: 3,

  },
  {
    image: "https://frankeey.com/image/course/5NjwtmYYpgtKhxYdC6TDgVcXtPRC5w4G3HM3nJid.jpg",
    title: 4,
  }
]

const MovieCardData = [
  {
    episodeImage: "https://frankeey.com/image/course/A7Tc50iQqTrJVZBWL2fXWHEHxYWpHRYRiL8tXSSj.jpg",
    image: "https://frankeey.com/image/course/iDgQNZruX97mXhmfwWbrz66GJkxVPnVV7PgwG7XU.jpg",
    title: "Mcard1"
  },
  {
    episodeImage: "https://frankeey.com/image/course/bOIIis7ftrOVq551Ge53OLqgrNGPW3ixrCxPx62h.jpg",
    image: "https://frankeey.com/image/course/qdQBXz209lW9gaaYb19R6mCEAdmDgKomI9berS2t.jpg",
    title: "Mcard2"
  },
  {
    episodeImage: "https://frankeey.com/image/course/Bi6qLdjQeyRtu6LKj2MmbXbHUahni9nyx7lum2Ud.jpg",
    image: "https://frankeey.com/image/course/QfIUfKnqRifDfegQewlKTAZQiFWIIkwobqQ90YKL.jpg",
    title: "Mcard3"
  },
  {
    episodeImage: "https://frankeey.com/image/course/qdQBXz209lW9gaaYb19R6mCEAdmDgKomI9berS2t.jpg",
    image: "https://frankeey.com/image/course/fVlQydP3FJPBuQsXInBf4ojj0uctpke7pDHXYhAn.jpg",
    title: "Mcard4"
  }
]