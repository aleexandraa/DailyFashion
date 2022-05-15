import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SignIn({
    allUsers,


    setLoggedinUser,
    setUserFriends,
    setCurrentUser,
}) {
    const [inputValue, setInputValue] = useState("");
    const history = useNavigate();
    const [errMessage, setErrMessage] = useState("");

    const handlerInput = (ev) => {
        setInputValue(ev.target.value);
    };

    const handlerButton = () => {
        for (let i = 0; i < allUsers.length; i++) {
            if (
                allUsers[i].name.toLowerCase().includes(inputValue.toLowerCase()) &&
                inputValue) {
                setLoggedinUser(allUsers[i].name);
                setUserFriends(allUsers[i].friends);
                setCurrentUser(allUsers[i].id);
                history.push("/");
            } else {
                setErrMessage(`${inputValue} does not exist`);
            }
        }
    };
    return (
        <Wrapper>
            <Form>
                <Label> First name</Label>
                <Input
                    onChange={handlerInput}
                    type="text"
                    placeholder="Your first name"
                />
                <Label>Second name</Label>
                <Input
                    onChange={handlerInput}
                    type="text"
                    placeholder="Your second name"
                />
                <Label>Password</Label>
                <Input
                    onChange={handlerInput}
                    type="password"
                    placeholder="Password"
                />
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
  }`;
const Form = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 250px;
  border-radius: 5px;
  margin-top: -40px;
  box-shadow:10px 20px 30px red;
  `;
export default SignIn;