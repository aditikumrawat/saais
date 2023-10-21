import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Bundle from "./components/Bundle";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AddProduct from './components/AddProduct';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;