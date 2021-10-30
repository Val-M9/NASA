import React from "react";
import { Layout } from "antd";
import { HashRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import { ROUTES } from "./constants/routes";
import Navbar from "./components/Navbar";
import loader from "./assets/loader/Ripple-1.4s-200px.svg";
import "./styles/content.css";

const Home = React.lazy(() => import("./pages/Home"));
const PicOfDay = React.lazy(() => import("./pages/PicOfDay"));
const Asteroids = React.lazy(() => import("./pages/NearEarthObjects/NearEarthObjects"));
const Mars = React.lazy(() => import("./pages/MarsPhotos/MarsRovers"));

function App() {
  const { Content, Header, Footer } = Layout;

  return (
    <>
      <HashRouter>
        <React.Suspense className="loader" fallback={loader}>
          <Switch>
            <Layout>
              <Navbar />
              <Layout>
                <Header className="header" />
                <Content>
                  <div className="wrapper">
                    <Route exact path={ROUTES.HOME} component={Home} />
                    <Route exact path={ROUTES.PIC_OF_DAY} component={PicOfDay} />
                    <Route exact path={ROUTES.ASTEROIDS} component={Asteroids} />
                    <Route exact path={ROUTES.MARS_ROVER_PHOTOS} component={Mars} />
                  </div>
                </Content>
                <Footer className="footer">Website is developed with NASA open API 2021</Footer>
              </Layout>
            </Layout>
          </Switch>
        </React.Suspense>
      </HashRouter>
    </>
  );
}

export default App;
