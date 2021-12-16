import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  Alert,
  AsyncStorage,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import Loading from './Loading';
import Success from './Success';
import { connect } from 'react-redux';
import firebaseApp from '../FirebaseConfig';
import * as firebase from "firebase";

function mapStateToProps(state) {
  return { menu: state.menu };
}

function mapDispatchToProps(dispatch) {
  return {
    closeLogin: () =>
      dispatch({
        type: "CLOSELOGIN"
      }),
    Login: (email) =>
      dispatch({
        type: "LOG",
        email: email
      })
  };
}
const screenHeight = Dimensions.get('window').height;

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    isSuccess: false,
    top: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0)
  };

  componentDidMount() {
    this.getUser();
  }

  setUser = async (name) => {
    try {
      await AsyncStorage.setItem("userName", name)
    } catch (error) { }
  };

  getUser = async () => {
    try {
      const name = await AsyncStorage.getItem("userName");
      if (name !== null) {
        this.props.Login(name);
      }
    } catch (error) { }
  }

  handleLogin = () => {
    this.setState({ isLoading: true });

    // setTimeout(() => {
    //   this.setState({ isLoading: false });
    //   this.setState({ isSuccess: true });
    // }, 2000);
    // setTimeout(() => {
    //   this.setState({ isSuccess: false });
    //   this.props.closeLogin();
    // }, 3000);
    const email = this.state.email;
    const password = this.state.password;

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        Alert.alert("Error", error.message)
      })
      .then(response => {
        this.setState({ isLoading: false });

        if (response) {
          console.log(response);
          this.setUser(response.user.email)
          this.props.Login(response.user.email);
          this.setState({ isSuccess: true });
          setTimeout(() => {
            this.setState({ isSuccess: false });
            this.props.closeLogin();
          }, 3000);
        }
      });
  };

  componentDidUpdate() {
    if (this.props.menu == "openLogin") {
      Animated.timing(this.state.top, { toValue: 0, duration: 0 }).start();
      Animated.spring(this.state.scale, { toValue: 1 }).start();
      Animated.timing(this.state.translateY, { toValue: 0, duration: 0 }).start();
    }
    if (this.props.menu == "closeLogin") {
      setTimeout(() => {
        Animated.timing(this.state.top, { toValue: screenHeight, duration: 0 }).start();
        Animated.spring(this.state.scale, { toValue: 1.3 }).start();
      }, 500)
      Animated.timing(this.state.translateY, { toValue: 1000, duration: 500 }).start();
    }
  }

  tapBackground = () => {
    this.props.closeLogin();
  }

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <TouchableWithoutFeedback onPress={this.tapBackground} style={{ position: "absolute", top: 0, left: 0 }} >
          <BlackScreen />
        </TouchableWithoutFeedback>
        <AnimatedBox style={{
          transform: [
            { scale: this.state.scale }, { translateY: this.state.translateY }
          ]
        }} >
          <LinearGradient
            style={styles.linearGradient}
            colors={['#8E2DE2', '#4A00E0']}
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 0.6, 0.6]}>
            <TextContainer>
              <Text>
                Member Login
              </Text>
            </TextContainer>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(email) => { this.setState({ email: email }) }} />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => { this.setState({ password: password }) }} />
            <TouchableOpacity onPress={this.handleLogin}>
              <ButtonView >
                <ButtonText >Login</ButtonText>
              </ButtonView>
            </TouchableOpacity>
          </LinearGradient>
        </AnimatedBox>
        <Loading isActive={this.state.isLoading} />
        <Success isActive={this.state.isSuccess} />
      </AnimatedContainer>
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
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
justify-content: center;
align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
const BlackScreen = styled.View`
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
background: rgba(0, 0, 0, 0.75);
`;

const Box = styled.View`
width: 372PX;
height: 386px;
margin-top: 40px;
border-radius: 40px;
 `;
const AnimatedBox = Animated.createAnimatedComponent(Box);

const TextContainer = styled.View`
margin-left: 60px;
margin-top: 50px;
margin-bottom: 40px;
width: 250px;
height: 50px;
border-radius: 17px;
background-color: white;
`;
const Text = styled.Text`
top: 5px;
font-size: 28px;
font-weight: 700;
color: #8E2DE2;
text-align: center;
`;

const TextInput = styled.TextInput`
margin-top: 20px;
width: 327px; 
height: 38px;
background: #e4e4e4;
border-radius: 10px;
margin-left: 20px;
padding-left: 10px;
color: green;
`;

const Button = styled.Button`  
`;

const ButtonView = styled.View`
background: white;
border-radius: 10px;
width: 187px;
height: 38px;
justify-content: center;
align-items: center;
margin-top: 20px;
margin-left: 90px; 
`;

const ButtonText = styled.Text`
color: #4A00E0;
text-transform: uppercase;
font-weight: bold;
font-size: 20px;

`;


export default connect(mapStateToProps, mapDispatchToProps)(Login);