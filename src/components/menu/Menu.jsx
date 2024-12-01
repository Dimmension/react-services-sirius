import { Button } from "@consta/uikit/Button";
import { Layout } from "@consta/uikit/Layout";
import { NavLink } from "react-router-dom";

const getStyleForNavLink = ({isActive}) => {
    isActive
      ? {
            cursor: 'default',
            color: 'black',
            textDecoration: 'none',
            padding: 20
      }
      : {padding: 20};
}

const Menu = () => {
    return (
        <Layout>
            <NavLink to='/' style={getStyleForNavLink}>
                <Button label='Главная страница'></Button>
            </NavLink>
            <NavLink to='/service'>
                <Button label='Страница услуг'></Button>
            </NavLink>
        </Layout>
    );
}

export default Menu