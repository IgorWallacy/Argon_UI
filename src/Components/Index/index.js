import React , {useState , useEffect, Component} from "react";
import axios from "axios";

//Componentes PrimeReact
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { useNavigate } from 'react-router-dom';

import "./Index.css";

import semLogo from '../../assets/placeholder.png'


const Principal = () =>  {
 

  const apiUrl = 'http://127.0.0.1:2096/api_react'

  const navigate = useNavigate()

  
  const [filiais, setFiliasis] = useState([]);



  useEffect(() => {
    axios
      .get(`${apiUrl}/filial`)
      .then((response) => {
        setFiliasis(response.data)
      })
      .catch((erro) => {});
  })
  

  

  const itemTemplate = (data) => {
    return (
      <div className="product-item">
        <img
          src={`${apiUrl}/promocao/imagem/filial/${data.id}`}
          onError={(e) =>
            (e.target.src = `${semLogo}` )
          }
          alt={data.name}
        />
        <div className="product-detail">
          <div className="product-name">{data.nome} </div>
        </div>
        <div className="product-action">
          <Button
            style={{ flex: 1 }}
            className="p-button-raised p-button-rounded"
            icon="pi pi-shopping-cart"
            label="VER OFERTAS"
            onClick={() => navegarOfertas(data)}
          ></Button>
        </div>
      </div>
    );
  };

  const navegarOfertas = (data) => {
 
    navigate(`/encarte`)
    localStorage.setItem('idFilial' , data.id)
    localStorage.setItem('nomeFilial', data.nome)
   // console.log(` ofertas ${data}`);
  };

  
    return (
      <>
        <Card>
          <div className="datascroller-demo">
            <div className="card">
              <DataScroller
                value={filiais}
                itemTemplate={itemTemplate}
                emptyMessage="Nenhuma loja dispnível"
                rows={5}
                buffer={0.4}
                header="Selecione uma loja"
              />
            </div>
          </div>
        </Card>
      </>
    );
  }



 

export default Principal;
