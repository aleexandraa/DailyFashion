import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SignIn({
    user,
    setUser
}) {
    const [inputValue, setInputValue] = useState({
        fullName: "",
        userName: "",
        email: "",
        password: "",
        followers: [],
        following: [],
        pictures: [],
        userPic: [],
    });
    const history = useNavigate();
    const [errMessage, setErrMessage] = useState("");

    const handlerInput = (ev) => {
        setInputValue(ev.target.value);
    };
    const handlerButton = async (e) => {
        e.preventDefault()
        const signup = await fetch("/app/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputValue),
        });
        const user = await signup.json()
        setUser(user)
        history('/profile')
    };
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    const [upload, setUpload] = useState(false)
    const [uploadPicture, setUploadPicture] = useState({
        email: user.email,
        picture: ""
    })

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
        setInputValue({ ...inputValue, userPic: file.secure_url })
    }
    return (
        <Wrapper>
            <Form>
                <Label> Full name</Label>
                <Input
                    onChange={(e) => setInputValue({
                        ...inputValue, fullName: e.target.value
                    })
                    }
                    type="text"
                    placeholder="Your full name"
                />
                <Label>User name</Label>
                <Input
                    onChange={(e) => setInputValue({
                        ...inputValue, userName: e.target.value
                    })
                    }
                    type="text"
                    placeholder="Your user name"
                />
                <Label>Password</Label>
                <Input
                    onChange={(e) => setInputValue({
                        ...inputValue, password: e.target.value
                    })
                    }
                    type="password"
                    placeholder="Password"
                />
                <Label>Email</Label>
                <Input
                    onChange={(e) => setInputValue({
                        ...inputValue, email: e.target.value
                    })
                    }
                    type="email"
                    placeholder="Email"
                />
                <PhottoLabel>Photo User</PhottoLabel>
                <InputPic type="file" name="file" placeholder="Upload an image"
                    onChange={uploadImage} />
                <Button onClick={handlerButton}>Submit</Button>

            </Form>
        </Wrapper>
    )
}
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

const Label = styled.label`
color: #fff;
margin-bottom: 10px;
font-size: 20px;
`;
const Input = styled.input`
width: 292px;
  height: 30px;
  font-family: "Allerta Stencil", sans-serif;
  font-size: 20px;
  border: 3px solid transparent;
  border-radius: 5px;`;

const PhottoLabel = styled.label`
color: #fff;
top: 25%;
font-size: 20px;
position: absolute;
`
const Button = styled.button`
width: 200px;
  height: 40px;
  margin-top: 15px;
  font-family: sans-serif;
  font-size: 20px;
  border: none;
  color:#F473B9;
  background-color: white;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: #505050;
  }`;
const Form = styled.form`
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 700px;
  border-radius: 10px;
  margin-top: -40px;
  box-shadow:10px 20px 50px red;
  `;

const InputPic = styled.input`
align-items: center;
color: #fff;
top: 30%;
font-size: 20px;
position: absolute;
margin-left: 50px;`

const Title = styled.div`
width: 292px;
height: 30px;
margin-top: -700px;
position: relative;
font-family: "Franklin Gothic Medium", sans-serif;
font-size: 20px;
border: 3px solid transparent;
border-radius: 5px;`
export default SignIn;