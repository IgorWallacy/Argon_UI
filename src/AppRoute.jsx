import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

import DataViewComponent from './Components/DataView/DataView'
import Principal from './Components/Index/index';

const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Principal />}></Route>
                <Route exact path="/encarte" element={<DataViewComponent/>}></Route>
            </Routes>
        </Router>
    )

}


export default AppRoutes