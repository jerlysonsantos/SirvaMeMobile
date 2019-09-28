import { createStackNavigator } from 'react-navigation';

import Login from './pages/auth/login';
import Singin from './pages/auth/singin';
import Main from './pages/main';
import Service from './pages/service';


export default createStackNavigator ({
    Login,
    Singin,
    Main,
    Service,
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#446DAB",
        },

        headerTintColor: "#fff",
    },
});
