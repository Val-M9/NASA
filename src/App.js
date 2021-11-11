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
const Curiosity = React.lazy(() => import("./pages/MarsPhotos/Curiosity"));
const Opportunity = React.lazy(() => import("./pages/MarsPhotos/Opportunity"));
const Spirit = React.lazy(() => import("./pages/MarsPhotos/Spirit"));

function App() {
  const { Content, Header, Footer } = Layout;

  return (
    <>
      <HashRouter>
        <Switch>
          <Layout>
            <React.Suspense fallback={<img src={loader} alt="loader" className="loader" />}>
              <Navbar />
              <Layout>
                <Header className="header" />
                <Content>
                  <div className="wrapper">
                    <Route exact path={ROUTES.HOME} component={Home} />
                    <Route exact path={ROUTES.PIC_OF_DAY} component={PicOfDay} />
                    <Route exact path={ROUTES.ASTEROIDS} component={Asteroids} />
                    <Route exact path={ROUTES.MARS_ROVERS} component={Mars} />
                    <Route exact path={ROUTES.CURIOSITY} component={Curiosity} />
                    <Route exact path={ROUTES.OPPORTUNITY} component={Opportunity} />
                    <Route exact path={ROUTES.SPIRIT} component={Spirit} />
                  </div>
                </Content>
                <Footer className="footer">Website is developed using NASA open API 2021</Footer>
              </Layout>
            </React.Suspense>
          </Layout>
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
