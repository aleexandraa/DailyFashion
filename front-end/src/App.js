import React from 'react';
import { useEffect, useState } from "react";
import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DailyFashion from './components/DailyFashion';
import unsplash from './api/unsplash';
function App() {
  const [pins, setNewPins] = useState([])


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

    let pins = ["fashion", "shoes", "clothes"]

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
      <Header onSubmit={onSearchSubmit} />
      <Routes>
        <Route path="/" exact element={<DailyFashion pins={pins} />} />
        <Route path="/signIn" exact element={<SignIn />} />
      </Routes>

    </Router >
  );
};

export default App;
