import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom"
import { get } from "mongoose";

function UserProfile({ user, setUser }) {
    const [profile, setProfile] = useState([])
    const [upload, setUpload] = useState(false)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    const [uploadPicture, setUploadPicture] = useState({
        email: user.email,
        picture: ""
    })
    const getUserInfo = async () => {
        const getUser = await fetch(`/app/getUser/${user.email}`)
        const info = await getUser.json()
        console.log(info)
        setProfile(info.data)
    }
    console.log(uploadPicture)
    console.log(user.email)
    console.log(profile)
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "fashionimages")
        setLoading(true)

        const res = await fetch("https://api.cloudinary.com/v1_1/alexandraaa/image/upload",
            {
                method: "POST",
                body: data
            })

        const file = await res.json()

        console.log(file)

        setImage(file.secure_url)
        setLoading(false)
        setUploadPicture({ ...uploadPicture, picture: file.secure_url })
    }
    console.log(user)
    const savedImages = async () => {
        const saveImages = await fetch('/app/savepicture', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(uploadPicture),

        })
    }

    useEffect(() => {
        getUserInfo()
    }, [upload])
    const [numOfFollow, setNumOfFollow] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);

    const handleToggleFollow = () => {
        if (isFollowed === false) {
            setIsFollowed(!isFollowed);
            setNumOfFollow(numOfFollow + 1);
        }
        if (isFollowed === true) {
            setIsFollowed(!isFollowed);
            setNumOfFollow(numOfFollow - 1);
        }
    };

    return (
        <Wrapper>
            <Container>

                <Label>Welcome {user && user.fullName}</Label>
                <StatNumber>
                    <BoldNumber>{numOfFollow}</BoldNumber> Followers
                </StatNumber>

                <button onClick={handleToggleFollow} color="pink" size={40}>Following</button>
                <Input type="file" name="file" placeholder="Upload an image"
                    onChange={uploadImage} />

                {
                    loading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <img src={image} />
                    )
                }
                <Button onClick={() => { savedImages(); setUpload(!upload) }}>Save</Button>
                <PictureWrapper>{profile && Object.keys(profile).length > 0 && profile.pictures.map((picture) => <div>
                    <Picture src={picture} />
                </div>)}</PictureWrapper>

            </Container>
        </Wrapper>
    )

};

export default UserProfile;
const Wrapper = styled.div`
flex-direction: column;
width: 100vw;
  height: 90vh;
  background-color: pink;
justify-content: center;

`;
const Input = styled.input`
align-items: center;
color: #fff;
margin-bottom: 10px;
font-size: 20px;
position: relative;
margin-left: 50px;
`
const PictureWrapper = styled.div`
background-collor:white;
column-count: 4;
column-gap: 10px;
margin: 0 auto;
max-width: 1260px;
height: 100%;`
const Picture = styled.img`
align-items: center;
box-sizing:border-box;
cursor: pointer;
width: 236px;
width: 100%;
border-radius: 16px;
object-fit: cover;`
const Container = styled.div`

`
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
const StatNumber = styled.p`
font-size: 16px;
padding: 10px;
`;
const BoldNumber = styled.span`
font-weight: bold;`;

const Label = styled.label`
color: #fff;
margin-bottom: 10px;
font-size: 20px;
`;