import React from "react"
import { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";


function Header({ handleSelect,
    loggedinUser,
    props }) {

    const [input, setInput] = useState('');
    const onSearchSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(input);


    }
    const location = useLocation();
    const logOut = () => { };

    return (
        <Wrapper>
            <HomePageButton to="/profile">
                {location.pathname !== "/profile" && "Profile"}
            </HomePageButton>
            <FollowingButton>
                <a href="/">Following</a>
            </FollowingButton>
            <SearchWrapper>
                <form>
                    <input type="text" onChange={(ev) => console.log(ev.target.value)} />
                    <button type="submit">Submit</button>
                </form>
            </SearchWrapper>

            <SignInButton to="/signIn">
                {location.pathname !== "/signIn" && "Sign in"}
            </SignInButton>



        </Wrapper >



    )
}


export default Header;

const Wrapper = styled.div`
display: felx;
align-item: center;
height: 56px;
padding: 12px 4px 4px 16px;
background-color: white;
color: black;
`
const HomeButtons = styled.div`
display: flex;
height: 48px;
min-width: 123px;
align-items: center;
justify-content: center;
border-radius: 24 px;
cursor: pointer;`

const SignIn = styled(Link, HomeButtons)`
margin-left:200px;

a {
    text-decoration: none;
    color: white;
    font-weight: 700
}`;

const SigninWrapper = styled.div`
  display: flex;
    flex-direction: column;`;



const HomePageButton = styled(Link, HomeButtons)`

a {
    text-decoration: none;
    color: white;
    font-weight: 700
}
`
const SignInButton = styled(Link, HomeButtons)`

a {
    text-decoration: none;
    color: white;
    font-weight: 700
}
`
const FollowingButton = styled(HomeButtons)`
background-color:white;
a{
    text-decoration: none;
    color: black;
    font-weight: 700
}

:hover {
    background-color: #e1e1e1;
}`

const SearchWrapper = styled.div`
width: 30vw;
height: 40px;
margin-right: 10px;

&:focus {
    border: 5px solid pink;
    }`;




