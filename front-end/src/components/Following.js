import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Following = ({ user }) => {
  const navigate = useNavigate();
  const navigateUser = (user) => {
    navigate(`/users/${user}`)
  }
  const [followingUser, setFollowingUser] = useState([])
  const getFollowing = async () => {
    const following = user.following
    console.log({ following })
    let followingList = []
    following.map(async (user) => {
      const getUser = await fetch(`/app/getfollower/${user}`)
      const userProfile = await getUser.json()
      // followingList.push(userProfile.data)

      setFollowingUser(
        (previous) => [...previous, userProfile.data]
      )
    })
    console.log(followingList)


  }
  useEffect(() => {
    getFollowing()
  }, []);
  console.log(followingUser)

  return (
    <Wrapper>
      <h1>Following</h1>
      {followingUser && followingUser.map((user) => <div onClick={() => navigateUser(user.userName)}>
        <ProfilePic src={user.userPic} /> <h3>{user.userName}</h3></div>)}
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: pink;
  height: 100vh;
  text-align: center;
  
`;
const ProfilePic = styled.img`
margin-top:20px;
height: 200px;
width: 200px;`
export default Following;
