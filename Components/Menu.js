import React from "react";
import styled from 'styled-components';
import LinearGradient from "react-native-linear-gradient";
import { Animated, Dimensions, TouchableOpacity, AsyncStorage } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import MenuCard from "./MenuCard";

const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return { menu: state.menu }
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () => dispatch({
      type: "CLOSEMENU"
    }),
    Login: (email) =>
      dispatch({
        type: "LOG",
        email: email
      })

  }
}

class Menu extends React.Component {
  state = {
    top: new Animated.Value(screenHeight)
  }
  componentDidMount() {
    this.menu();
  }
  componentDidUpdate() {
    this.menu();
  }
  menu = () => {
    if (this.props.menu == "openMenu") {
      Animated.spring(this.state.top, { toValue: 150 }, { useNativeDriver: true }).start();
    }
    if (this.props.menu == "closeMenu") {
      Animated.spring(this.state.top, { toValue: screenHeight }, { useNativeDriver: true }).start();
    }

  }

  logout = () => {
    this.props.Login();
    this.props.closeMenu();
    AsyncStorage.clear();
  }

  render() {
    return (
      <AnimatedContainer style={{
        position: "absolute",
        top: this.state.top,
        zIndex: 100,
      }}>
        <Cover>
          <LinearGradient
            colors={["rgba(255, 148, 115, 1)", "rgba(255, 123, 123, 1)"]}
            style={{
              width: "100%",
              height: "100%",
              zIndex: 100
            }}
          />
          <MenuText>Menu</MenuText>
        </Cover>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 125,
            left: "50%",
            zIndex: 100,
            marginLeft: -22
          }}
          onPress={this.props.closeMenu}
        >

          <CloseView>
            <Ionicons name="ios-close" size={35} color="blue" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          <MenuCard text="Account" icon="ios-settings" caption="Profile" />
          <TouchableOpacity onPress={() => {
            this.logout();
          }} >
            <MenuCard text="Log out" icon="ios-log-out" caption="See You Soon" />
          </TouchableOpacity>
        </Content>
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Container = styled.View`
 width: 100%;
 height: 100%;
 background: #f0f3f5; 
 border-radius: 26px;
 overflow: hidden; 
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
 width: 100%;
 height: 142px;
`;
const Content = styled.View`
 width: 100%;
 height: 100;
 padding: 30px;
 
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px; 
  background: white;
  justify-content: center;
  align-items: center;
`;
const MenuText = styled.Text`
  position: absolute;
  font-size: 25px;
  font-weight: 700;
  color: white;
  top: 65;
  left: 42%;
  z-index: 100;
`;