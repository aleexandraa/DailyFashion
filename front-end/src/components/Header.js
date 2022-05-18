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
    // const [query, setQuery] = useState()
    // const [searchQ, setSearch] = useState()
    // const search = () => {
    //     setSearch(query)
    // }

    // const searchData = SearchImages(query);
    // console.log(searchData)
    return (
        <Wrapper>
            <ProfileButton to="/profile">
                {location.pathname !== "/profile" && "Profile"}
            </ProfileButton>
            <FollowingButton to="/following">
                {location.pathname !== "/following" && "Following"}

            </FollowingButton>
            <HomePageButton to="/">
                {location.pathname !== "/" && "DailyFashion"}
            </HomePageButton>
            <SearchWrapper>
                {/* <form>
                    <input type="text" onChange={(ev) => setQuery(ev.target.value)} />
                    <button onClick={search}>Search</button>
                </form> */}
            </SearchWrapper>

            <SignInButton to="/signIn">
                {location.pathname !== "/signIn" && "Sign in"}
            </SignInButton>
            <LogInButton to="/logIn">
                {location.pathname !== "/logIn" && "LogIn"}
            </LogInButton>



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
background-color: pink
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
margin-left:100px;

a{
    text-decoration: none;
    color: black;
    font-weight: 700
}

:hover {
    background-color: #E75480;
}`;

const SigninWrapper = styled.div`
  display: flex;
    flex-direction: column;`;



const HomePageButton = styled(Link)`
margin-left:100px;

a{
    text-decoration: none;
    color: black;
    font-weight: 700
}

:hover {
    background-color: #E75480;
}
`;
const ProfileButton = styled(Link)`

a{
    text-decoration: none;
    color: black;
    font-weight: 700
}

:hover {
    background-color: #E75480;
}
`;
const SignInButton = styled(Link, HomeButtons)`

margin-left:100px;

a{
    text-decoration: none;
    color: black;
    font-weight: 700
}

:hover {
    background-color: #E75480;
}
`
const FollowingButton = styled(Link)`
margin-left:100px;

a{
    text-decoration: none;
    color: black;
    font-weight: 700
}

:hover {
    background-color: #E75480;
}`

const SearchWrapper = styled.div`
width: 30vw;
height: 40px;
margin-right: 10px;

&:focus {
    border: 5px solid pink;
    }`;




