import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const userList = await fetch('/app/getallusers')
        const list = await userList.json()
        setUsers(list.data)
    }
    let navigate = useNavigate();
    useEffect(() => {
        getUsers()
    }, [])
    const navigateUser = (user) => {
        navigate(`/users/${user}`)
    }
    return (
        <Wrapper>
            <h1>Daily Fashion's Users</h1>
            {users.length > 0 &&
                <PictureWrapper>{users.map((user) => <User onClick={() => navigateUser(user.userName)}>
                    <ProfilePic src={user.userPic} />
                    <div> {user.userName}</div>
                </User>)}
                </PictureWrapper>}

        </Wrapper>
    )
};
const Wrapper = styled.div`
background-color: pink;
height: 100vh;
display: flex;
flex-align: row;
width: 100vw;
justify-content: center;`
const PictureWrapper = styled.div`
display:flex;
justify-content: space-around;
text-align: center;
position: absolute;
left: 50%;
transform: translate(-50%);
top: 20%;`
const ProfilePic = styled.img`
width: 150px;
cursor: pointer;
margin-right: 20px;
height: 150px;

`
const User = styled.div`
display:flex;
flex-direction: column`

export default UsersPage;
