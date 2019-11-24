import { createStackNavigator } from 'react-navigation';

import Login from './pages/auth/login';
import SignIn from './pages/auth/signin';
import Main from './pages/main';
import Service from './pages/service';
import Options from './pages/options';


export default createStackNavigator ({
    Login,
    SignIn,
    Main,
    Service,
    Options,
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#446DAB",
        },

        headerTintColor: "#fff",
    },
});
