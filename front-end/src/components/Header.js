import React from "react"
import { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { SearchImages } from "./Pin"
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
            <HomePageButton to="/">
                {location.pathname !== "/" && "DailyFashion"}
            </HomePageButton>
            <ProfileButton to="/profile">
                {location.pathname !== "/profile" && "Profile"}
            </ProfileButton>
            <FollowingButton to="/following">
                {location.pathname !== "/following" && "Following"}

            </FollowingButton>

            <SignInButton to="/users">
                {location.pathname !== "/users" && "All Users"}
            </SignInButton>

            <SignInButton to="/signIn">
                {location.pathname !== "/signIn" && "Sign up"}
            </SignInButton>
            <LogInButton to="/logIn">
                {location.pathname !== "/logIn" && "Log In"}
            </LogInButton>



        </Wrapper >



    )
}


export default Header;

const Wrapper = styled.div`
display: flex;
align-item: center;
height: 56px;
padding: 12px 4px 4px 16px;
background-color: white;
color: black;
background-color:#E75480;
justify-content: space-evenly;
`
const HomeButtons = styled.div`
display: flex;
height: 48px;
min-width: 123px;
align-items: center;
justify-content: center;
border-radius: 24 px;
cursor: pointer;`

const LogInButton = styled(Link)`
color: white;
text-decoration: none;
font-size: 20px;
&:hover{
    border-bottom: solid;
}
`;

const SigninWrapper = styled.div`
  display: flex;
    flex-direction: column;`;



const HomePageButton = styled(Link)`
color: white;
text-decoration: none;
font-size: 25px;
&:hover{
    border-bottom: solid;
}
`;
const ProfileButton = styled(Link)`
color: white;
text-decoration: none;
font-size: 20px;
&:hover{
    border-bottom: solid;
}
`;
const SignInButton = styled(Link, HomeButtons)`

color: white;
text-decoration: none;
font-size: 20px;
&:hover{
    border-bottom: solid;
}
`;
const FollowingButton = styled(Link)`
color: white;
text-decoration: none;
font-size: 20px;
&:hover{
    border-bottom: solid;
}
`;

const SearchWrapper = styled.div`
width: 30vw;
height: 40px;
margin-right: 10px;

&:focus {
    border: 5px solid pink;
    }`;




