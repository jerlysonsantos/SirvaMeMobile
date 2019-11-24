import { createStackNavigator } from 'react-navigation';

import Login from './pages/auth/login';
import SignIn from './pages/auth/signin';
import Main from './pages/main';
import Options from './pages/options';
import Service from './pages/service/service.js';
import ContractService from './pages/service/contractService.js';



export default createStackNavigator ({
    Login,
    SignIn,
    Main,
    Service,
    Options,
    ContractService,
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#446DAB",
        },

        headerTintColor: "#fff",
    },
});
