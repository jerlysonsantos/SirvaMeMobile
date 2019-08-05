import { createStackNavigator } from 'react-navigation';

import Login from './pages/auth/login';
import Singin from './pages/auth/singin';
import Tabstext from './pages/tabstext';
import Main from './pages/main';
import Product from './pages/product';


export default createStackNavigator ({
    Login,
    Singin,
    Tabstext,
    Main,
    Product,
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#000",
        },

        headerTintColor: "#fff",
    },
});