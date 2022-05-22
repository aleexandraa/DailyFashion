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
        setLoading(true)
        const getUser = await fetch(`/app/getuserprofile/${user.userName}`)
        const info = await getUser.json()
        if (info.status === 200) {
            setProfile(info.data)
            setLoading(false)
        }
        else {
        }

    }
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


        setImage(file.secure_url)
        setLoading(false)
        setUploadPicture({ ...uploadPicture, picture: file.secure_url })
    }
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
    }, [user])

    return (
        <Wrapper>
            {loading ? <Heart><div className="lds-heart"><div></div></div> </Heart> : profile &&
                <Container>
                    <InfoWrapper>
                        <Label>Welcome {profile && profile.fullName}</Label>
                        <ProfilePic src={profile.userPic} />

                        <StatNumber>
                            <BoldNumber>{profile && profile.followers && profile.followers.length}</BoldNumber> Followers
                            <BoldNumber1>{profile && profile.following && profile.following.length}</BoldNumber1> Following

                        </StatNumber>
                    </InfoWrapper>
                    <InputWrapper>Upload your pictures
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
                    </InputWrapper>
                    <PictureWrapper>{profile && Object.keys(profile).length > 0 && profile.pictures.map((picture) => <div>
                        <Picture src={picture} />
                    </div>)}</PictureWrapper>

                </Container>
            }
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
const Heart = styled.div`
position:absolute;
left: 50%;
top: 30%;`
const Input = styled.input`
align-items: center;
color: #fff;
margin-bottom: 10px;
font-size: 20px;
position: relative;
margin-left: 50px;
`
const InfoWrapper = styled.div`
position:absolute;
left: 50%;
transform: translate(-50%);
display:flex;
flex-direction:column;
`
const InputWrapper = styled.div`
position: absolute;
top: 35%;
left: 50%;
transform: translate(-50%);
`
const PictureWrapper = styled.div`
background-collor:white;
column-count: 4;
column-gap: 10px;
margin: 0 auto;
max-width: 1260px;
position: absolute;
top: 45%;
left: 50%;
transform: translate(-50%);
`
const Picture = styled.img`
align-items: center;
box-sizing:border-box;
cursor: pointer;
width: 236px;
border-radius: 16px;
object-fit: cover;
height: 200px;`
const ProfilePic = styled.img`
height: 200px;`

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

const BoldNumber1 = styled.span`
margin-left: 15px;
font-weight: bold;`;
const Label = styled.label`
color: #fff;
margin-bottom: 10px;
font-size: 20px;
`;