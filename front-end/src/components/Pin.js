import React, { useEffect, useState } from "react"
import styled from "styled-components";
import unsplash from '../api/unsplash';
import axios from "axios"

const count = 1;
function Pin(props) {
    let { urls } = props;
    return (
        <Wrapper>
            <Container>
                <img src={urls?.regular} alt="pin" />
            </Container>
        </Wrapper>
    )
}
function SearchImages(query) {
    const [state, setState] = useState([])
    useEffect(() => {
        unsplash
            .get("https://api.unsplash.com/search/photos?query=" + query + "")
            .then((data) => {
                setState(data.data.results)
            })
    }, [query])
    return state;
}

export default Pin;
export { SearchImages };

const Wrapper = styled.div`
display: inline-flex;
padding: 8px;
`

const Container = styled.div`
align-items: center;
box-sizing:border-box;
cursor: pointer;
width: 236px;

img{
    display: flex;
    width: 100%;
    cursor: zoom-in;
    border-radius: 16px;
    object-fit: cover;
}`