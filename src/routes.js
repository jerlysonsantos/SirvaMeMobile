import { createStackNavigator } from 'react-navigation';

import Login from './pages/auth/login';
import Singin from './pages/auth/singin';
import Main from './pages/main';
import Service from './pages/service/service.js';
import ViewToAcceptService from './pages/service/viewToAcceptService.js';
import ViewContractedServices from './pages/service/viewContractedServices.js';
import ViewAcceptedService from './pages/service/viewAcceptedServices.js';
import ContractService from './pages/service/contractService.js';


export default createStackNavigator ({
    Login,
    Singin,
    Main,
    Service,
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
