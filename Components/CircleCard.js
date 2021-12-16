import styled from "styled-components";
import React from "react";

export default class CircleCard extends React.Component {
  render() {
    return (
      <Container>
        <Image /*source={{ uri: this.props.image }}*/ />
      </Container>
    );
  }
}

const Container = styled.View`
  margin-top: 7px;
  margin-bottom: 10px;
  margin-left: 10px;
  height: 143px;
  width: 146px;
  left: 5px;
  top: 3px;
  background-color: white;
  overflow: hidden;
  border-radius: 70px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
