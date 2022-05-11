import React from "react";
import styled from "styled-components";
import Pin from "./Pin";
function DailyFashion(props) {
    let { pins } = props;

    return (
        <Wrapper>
            <Container>
                {pins.map((pin, index) => {
                    let { urls } = pin;
                    return <Pin key={index} urls={urls} />
                })}

            </Container>
        </Wrapper>
    )
}

export default DailyFashion

const Wrapper = styled.div`
background-color: pink;
display: felx;
width: 100%;
height: 100%;
margin-top: 15px;
justify-content: center;
`

const Container = styled.div`
background-collor:white;
column-count: 5;
column-gap: 10px;
margin: 0 auto;
max-width: 1260px;
height: 100%
`