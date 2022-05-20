import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router";

const UsersProfile = ({ user, setUser }) => {
    const { userName } = useParams()
    const [userProfile, setUserProfile] = useState([]);
    const usersProfile = async () => {
        const user = await fetch(`/app/getuserprofile/${userName}`)
        const profile = await user.json()
        setUserProfile(profile.data);
    }
    useEffect(() => {
        usersProfile()
    }, [])
    console.log(user)
    console.log(userProfile);
    const followUser = async () => {
        const users = { following: userProfile._id, user: user._id }
        const follow = await fetch("/app/follow", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(users),
        });
        const following = await follow.json();
        console.log(follow)
        await usersProfile();
    }

    const unFollowUser = async () => {
        const users = { unfollowing: userProfile._id, user: user._id }
        const unfollow = await fetch("/app/unfollow", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(users),
        });
        const unfollowing = await unfollow.json();
        await usersProfile();
        console.log(unfollowing)
    }
    return (
        <Wrapper>
            <InfoWrapper>
                <ProfilePic src={userProfile.userPic} />
                {userProfile && <div> <div>{userName && userName}</div>
                    {userProfile.followers && userProfile.followers.includes(user._id) ?
                        <Button onClick={unFollowUser}>Unfollow</Button> : <Button onClick={followUser}>Follow</Button>}

                    <div>Followers {userProfile.followers && userProfile.followers.length} </div></div>}
            </InfoWrapper>
            <PictureWrapper>
                {userProfile && userProfile.pictures && userProfile.pictures.map((picture) => {
                    return <Img src={picture} />
                })}
            </PictureWrapper>
        </Wrapper>
    )
}

export default UsersProfile;

const Wrapper = styled.div`
flex-direction: column;
width: 100vw;
  height: 100vh;
  background-color: pink;
justify-content: center;
`;
const ProfilePic = styled.img`
height: 200px;
width: 150px;`
const Img = styled.img`
align-items: center;
box-sizing:border-box;
cursor: pointer;
width: 236px;
border-radius: 16px;
object-fit: cover;
height: 200px;`
const Button = styled.button`
width: 200px;
  height: 40px;
  margin-top: 8px;
  font-family: sans-serif;
  font-size: 20px;
  border: none;
  color:#F473B9;
  background-color: white;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: #505050;
  }
`
const InfoWrapper = styled.div`
position:absolute;
left: 50%;
top: 10%;
text-align: center;
transform: translate(-50%);
`
const PictureWrapper = styled.div`
column-count: 4;
column-gap: 10px;
margin: 0 auto;
max-width: 1260px;
display: flex;
position: absolute;
top: 45%;
left: 50%;
transform: translate(-50%);
`