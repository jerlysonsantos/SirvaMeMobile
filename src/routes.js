import { createStackNavigator } from 'react-navigation';

import Login from './pages/auth/login';
import SignIn from './pages/auth/signin';
import Main from './pages/main';
import Options from './pages/options';
import Service from './pages/service/service.js';
import Maps from './pages/webView.js';
import ViewToAcceptService from './pages/service/viewToAcceptService.js';
import ViewContractedServices from './pages/service/viewContractedServices.js';
import ViewAcceptedService from './pages/service/viewAcceptedServices.js';
import ContractService from './pages/service/contractService.js';


export default createStackNavigator ({
    Login,
    SignIn,
    Main,
    Service,
    Options,
    Maps,
    ContractService,
    ViewToAcceptService,
    ViewAcceptedService,
    ViewContractedServices,
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#446DAB",
        },

        headerTintColor: "#fff",
    },
});
