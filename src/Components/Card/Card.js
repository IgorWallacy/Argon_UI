import React from "react";

import imagemFilial from '../../assets/placeholder.png'




const CardComponent = () => {

  const filialId = localStorage.getItem('idFilial')
  
   

  return (
    <div style={{margin:2}}>

<div className="grid grid-nogutter surface-0 text-800">
    <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
            <span className="block text-6xl font-bold mb-1">Confira nossa seleção de produtos</span>
            <div className="text-6xl text-primary font-bold mb-3">Aproveite os super descontos</div>
            <p className="mt-0 mb-4 text-700 line-height-3"></p>

           
        </section>
    </div>
    <div className="col-12 md:col-6 sm:col-12 overflow-hidden">
        <img 
        
        alt="Confira nossas ofertas !!"
        src={`http://127.0.0.1:2096/api_react/promocao/imagem/filial/${filialId}`}
        onError={(e) =>
          (e.target.src =
            `${imagemFilial}`)
        }

        className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)', width : '95%' , margin : 0 }} />
    </div>
</div>
      
       
     
    </div>
  );
};

export default CardComponent;
