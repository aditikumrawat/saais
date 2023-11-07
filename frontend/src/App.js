import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Bundle from "./components/Bundle";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AddProduct from './components/AddProduct';
import UpdateProduct from "./components/UpdateProduct";
import AddBundle from "./components/AddBundle"
import UpdateBundle from "./components/UpdateBundle"
import BeforeAcitvation from "./components/BeforeAcitvation";
import AfterAcivation from "./components/AfterAcivation";
import GoogleLoginButton from "./components/GoogleLoginButton";

function App() {

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadSlim(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    await console.log(container);
}, []);
  return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId="805286160007-u9l2316h9qod36qhd4ue7hdp9phl9pdj.apps.googleusercontent.com">
    <Particles
              id="tsparticles"
              init={particlesInit}
              loaded={particlesLoaded}
              options={{
                  background: {
                      color: {
                          value: "#121212",
                      },
                  },
                  fpsLimit: 120,
                  interactivity: {
                      events: {
                          onClick: {
                              enable: true,
                              mode: "push",
                          },
                          onHover: {
                              enable: true,
                              mode: "repulse",
                          },
                          resize: true,
                      },
                      modes: {
                          push: {
                              quantity: 4,
                          },
                          repulse: {
                              distance: 200,
                              duration: 0.4,
                          },
                      },
                  },
                  particles: {
                      color: {
                          value: "#ffffff",
                      },
                      links: {
                          color: "#ffffff",
                          distance: 150,
                          enable: true,
                          opacity: 0.5,
                          width: 1,
                      },
                      move: {
                          direction: "none",
                          enable: true,
                          outModes: {
                              default: "bounce",
                          },
                          random: false,
                          speed: 6,
                          straight: false,
                      },
                      number: {
                          density: {
                              enable: true,
                              area: 800,
                          },
                          value: 50,
                      },
                      opacity: {
                          value: 0.5,
                      },
                      shape: {
                          type: "circle",
                      },
                      size: {
                          value: { min: 1, max: 5 },
                      },
                  },
                  detectRetina: true,
              }}
          />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/bundle" element={<Bundle />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/addProduct" element={<AddProduct />}></Route>
        <Route path="/updateProduct" element={<UpdateProduct />}></Route>
        <Route path="/addBundle" element={<AddBundle />}></Route>
        <Route path="/updateBundle" element={<UpdateBundle />}></Route>
        <Route path="/beforeActivation" element={<BeforeAcitvation />}/>
        <Route path="/activate" element={<AfterAcivation/>}/>
        <Route path="/googleSigninButton" element={<GoogleLoginButton/>}/>
      </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;