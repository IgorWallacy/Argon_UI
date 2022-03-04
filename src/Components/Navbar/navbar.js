import React, {Component} from 'react';


class Navbar extends Component {
    state = {  } 
   
   
    render() { 
        return (
            <>
            <div  className="bg-bluegray-900 text-gray-100 p-6 flex justify-content-between lg:justify-content-center align-items-center flex-wrap">
          <div className="font-bold mr-12">
          <h1>  🔥 Encarte virtual - Confira nossas promoções e economize muito 🤑 </h1>
          </div>
        </div>
            </>
        );
    }
}
 
export default Navbar;