import React, { useState } from "react";
import styled from "styled-components";

function UserProfile() {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(""
    )
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
    }
    return (
        <Wrapper>
            <Container>
                <h1>Upload Image</h1>
                <input type="file" name="file" placeholder="Upload an image"
                    onChange={uploadImage} />

                {
                    loading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <img src={image} styled={{ width: "300px" }} />
                    )
                }
                <Label>Alexandra</Label>
            </Container>
        </Wrapper>
    )

};

export default UserProfile;
const Wrapper = styled.div`
width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
  background-color: pink;
`;

const Container = styled.div`
flex:1;
alignItems: "center";
justifyContent: "center";
`;
const Label = styled.label`
color: #fff;
margin-bottom: 10px;
font-size: 20px;
`;