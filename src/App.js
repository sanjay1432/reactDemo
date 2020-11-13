import React, { Component, useEffect } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import "./App.css";
import "./sass/styles.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ROUTES, { RenderRoutes } from "./routes";
import { GlobalProvider } from "./plugins/globalContext";
import Root from "./Root";
class App extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://use.fontawesome.com/releases/v5.14.0/js/all.js";
    this.div.appendChild(script);
  }

  render() {
    return (
      <div ref={(el) => (this.div = el)}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </div>
    );
  }
}

export function Provider() {
  return (
    <GlobalProvider>
      <Navbar />

      <section className="section">
        <RenderRoutes routes={ROUTES} />
      </section>
      <Footer />
    </GlobalProvider>
  );
}
export default App;
