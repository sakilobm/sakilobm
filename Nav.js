import React from "react";
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./screens/HomeScreen";
import VideoScreen from "./screens/VideoScreen";
import CourseScreen from "./screens/CourseScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import EpisodeScreen from "./Components/EpisodeScreen";


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Video: VideoScreen,
  Episode: EpisodeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (<Icon name="home" size={25} color={
    focused ? "#ffd644" : "#ffffff" //If Statement can't use Alternatively : ? 
  } />
  )
};

const CourseStack = createStackNavigator({
  Course: CourseScreen,
  Episode: EpisodeScreen
});

CourseStack.navigationOptions = {
  tabBarLabel: "Course",
  tabBarIcon: ({ focused }) => (<Icon name="book" size={25} color={
    focused ? "#ffd644" : "#ffffff"
  } />
  )

};

const VideoStack = createStackNavigator({
  Video: VideoScreen
});

VideoStack.navigationOptions = {
  tabBarLabel: "Videos",
  tabBarIcon: ({ focused }) => (<Icon name="video" size={25} color={
    focused ? "#5FAB2F" : "#9D9D9D"
  } />
  )

};

const BottomTab = createBottomTabNavigator({ HomeStack, CourseStack, VideoStack },
  { //Used to hide icon text (Any Altration use here)
    tabBarOptions: {
      showLabel: false,
    }
  }
);
const MaterialBottomTab = createMaterialBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Course: { screen: CourseStack },
    // Video: { screen: VideoStack }
  },
  {
    initialRouteName: "Home",
    activeColor: "#ffd644",
    inactiveColor: "#ffffff",
    barStyle: {
      backgroundColor: "#280b6f",
      borderStyle: "dotted"

    },
    shifting: true
  }
)

export default createAppContainer(MaterialBottomTab);
