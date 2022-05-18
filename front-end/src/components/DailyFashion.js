import React, { useState } from "react";
import styled from "styled-components";
import Pin from "./Pin";
import { SearchImages } from "./Pin"

function DailyFashion(props) {
    let { pins } = props;
    const [query, setQuery] = useState()
    const [searchQ, setSearch] = useState()
    const search = () => {
        setSearch(query)
    }

    const searchData = SearchImages(query);
    console.log(searchData)
    return (
        <Wrapper>
            <Container>
                <form>
                    <input type="text" placeholder="Search for items" onChange={(ev) => setQuery(ev.target.value)} />
                </form>
                {searchData.map((pin, index) => {
                    let { urls } = pin;
                    return <Pin key={index} urls={urls} alt={pin.description} />
                })}
                {!query && pins.map((pin, index) => {
                    let { urls } = pin;
                    return <Pin key={index} urls={urls} alt={pin.description} />
                })}


            </Container>
        </Wrapper>
    )
}

export default DailyFashion

const Wrapper = styled.div`
background-color: pink;
display: flex;
width: 100%;
height: 100%;
margin-top: 15px;
justify-content: space-between;
`

const Container = styled.div`
background-collor:white;
column-count: 4;
column-gap: 10px;
margin: 0 auto;
max-width: 1260px;
height: 100%;
`