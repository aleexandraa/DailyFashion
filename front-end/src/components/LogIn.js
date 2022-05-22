import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const LogIn = ({ user, setUser }) => {
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    const [nameSignIn, setNameSignIn] = useState({
        nameSignIn: "",
        picture: ""
    });
    const handleChange = (e) => {
        setNameSignIn({
            ...nameSignIn,
            userName: e.target.value
        });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        // fetch(`/app/getUser/${nameSignIn.userName}`)
        //     .then((res) => res.json())
        //     .then((data) => setUser(data.data))
        //     .then(navigate("/"))
        const response = await fetch(`/app/getUser/${nameSignIn.userName}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
        })
        const user = await response.json()
        setUser(user.data)
        navigate('/')
    };
    return (
        <>
            <Container>
                <Form>
                    <Label>Your Email
                        <Input onChange={handleChange} name="name"
                            type="email"
                            placeholder="Email" />
                    </Label>
                    <Label>Your Password
                        <Input onChange={(e) => { setPassword(e.target.value) }} name="name"
                            type="password"
                            placeholder="password" />
                    </Label>

                    <Button onClick={handleSignIn} type="submit">
                        Sign In
                    </Button>
                </Form>
            </Container>

        </>
    );
};

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
`;
const Label = styled.label`
color: #fff;
margin-bottom: 10px;
font-size: 20px;
display:flex;
flex-direction:column;
`;
const Img = styled.img`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 350px;
`;
const Container = styled.div`
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
const Form = styled.form`
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 250px;
  border-radius: 5px;
  margin-top: -40px;
  box-shadow:10px 20px 30px red;`

const Input = styled.input`
width: 200px;
height: 30px;
font-family: "Allerta Stencil", sans-serif;
font-size: 20px;
border: 3px solid transparent;
border-radius: 5px;
`;

export default LogIn;