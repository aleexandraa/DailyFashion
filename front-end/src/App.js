import React from 'react';
import { useEffect, useState } from "react";
import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DailyFashion from './components/DailyFashion';
import unsplash from './api/unsplash';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import GlobalStyles from './components/GlobalStyles';
import Following from './components/Following';
function App() {
  const [pins, setNewPins] = useState([])
  const [user, setUser] = useState([])

  const getImages = (term) => {
    return unsplash.get('https://api.unsplash.com/search/photos', {
      params: {
        query: term
      }
    });
  };



  const onSearchSubmit = (term) => {
    getImages(term).then((res) => {
      let results = res.data.results;

      let newPins = [
        ...results,
        ...pins,
      ]

      newPins.sort(function (a, b) {
        return 0.5 - Math.random();
      });
      setNewPins(newPins);
    })
  }

  const getNewPins = () => {
    let promises = [];
    let pinData = [];

    let pins = ["fashion", "shoes", "clothes", "pants", "dress", "heels"]

    pins.forEach((pinTerm) => {
      promises.push(
        getImages(pinTerm).then((res) => {
          let results = res.data.results;

          pinData = pinData.concat(results);
          pinData.sort(function (a, b) {
            return 0.5 - Math.random();
          })
        })
      )
    })
    Promise.all(promises).then(() => {
      setNewPins(pinData);
    });
  };

  useEffect(() => {
    getNewPins();
  }, [])


  return (

    <Router>
      <GlobalStyles />
      <Header onSubmit={onSearchSubmit} />
      <Routes>
        <Route path="/" exact element={<DailyFashion pins={pins} />} />
        <Route path="/signIn" exact element={<SignIn setUser={setUser} />} />
        <Route exact path="/profile" element={<UserProfile user={user} setUser={setUser} />} />
        <Route path="logIn" exact element={<LogIn setUser={setUser} />} />
        <Route path="following" exact element={<Following setUser={setUser} />} />


      </Routes>

    </Router >
  );
};

export default App;
