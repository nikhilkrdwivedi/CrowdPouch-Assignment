import React from 'react';
import './App.scss';
import FileUpload from './components/FileUpload';
import NotFound from './components/NotFound';
import VideoLibrary from './components/VideoLibrary';
import CityView from './components/CityView';
import CityByPopulation from './components/CityByPopulation';
import Login from './components/Login';
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Register from './components/Register';
import Home from './components/Home';
function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute component={Home} exact path="/" />
        <PrivateRoute component={Home} exact path="/home" />
        <PrivateRoute component={CityView} exact path="/city-view" />
        <PrivateRoute component={CityByPopulation} exact path="/city-by-population" />
        <PrivateRoute component={VideoLibrary} exact path="/video-library" />
        <PrivateRoute component={FileUpload} exact path="/upload-video" />
        <PublicRoute restricted={true} component={Login} path="/login" exact />
        <PublicRoute restricted={true} component={Register} path="/register" exact />
        <PrivateRoute component={NotFound} path="/*" />
        <PublicRoute component={NotFound} path="/*" />
      </Switch>
    </Router>
  );
}

export default App;
