import styled from "styled-components";
import React from "react";


export default class MovieCard extends React.Component {
  render() {
    return (
      <Container>
        <Image source={{ uri: this.props.image }} />
      </Container>
    );
  }
}

const Container = styled.View`
  width: 130px;
  height: 172px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  margin-left: 5px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;


