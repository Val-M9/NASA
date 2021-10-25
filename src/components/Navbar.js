import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { navItems } from "../constants/navItems";
import logo from "../assets/img/logo.png";
import "../styles/navbar.css";

const Navbar = () => {
  const { Sider } = Layout;

  return (
    <Sider breakpoint="s" collapsedWidth="0" collapsible>
      <Menu theme="dark" mode="inline">
        <img className="logo" src={logo} alt="logo" />
        <Menu.Item key={1}>
          <Link to={ROUTES.HOME} title={navItems.MAIN} />
          Main
        </Menu.Item>
        <Menu.Item key={2}>
          <Link to={ROUTES.PIC_OF_DAY} title={navItems.APOD} />
          APOD
        </Menu.Item>
        <Menu.Item key={3}>
          <Link to={ROUTES.EPIC} title={navItems.EPIC} />
          EPIC
        </Menu.Item>
        <Menu.Item key={4}>
          <Link to={ROUTES.NeoWs} title={navItems.NeoWs} />
          Asteroids
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default Navbar;
