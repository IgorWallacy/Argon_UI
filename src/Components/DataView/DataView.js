import React, { useEffect, useState, useRef } from "react";

import "../../App.css";

import "./DataView.css";

import axios from "axios";

//Formatar datas
import { format, addDays } from "date-fns";

import produtoSemFoto from '../../assets/ops_produto.webp'

//Componentes
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { Toast } from 'primereact/toast';



import CardComponent from "../Card/Card";

import { Card } from "primereact/card";

export default function DataViewComponent() {
  const [produtos, setProdutos] = useState([]);
  const [layout, setLayout] = useState("list");
  const nomeFilial = localStorage.getItem('nomeFilial')

  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);

  const [loading, setLoading] = useState(true);

  const isMounted = useRef(false);

  const toast = useRef(null);


  const sortOptions = [
    { label: "Ordenar pelo maior preço", value: "!valor" },
    { label: "Ordenar pelo menor preço", value: "valor" },
    { label: "Ordenar de A a Z", value: "idProduto.nome" },
  ];

  // Habilitar em producao
  // const ApiUrl = window.location.protocol +'//'+ window.location.hostname + ':' + window.location.port

  const ApiUrl = "http://127.0.0.1:2096";

  //const access_token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJEZW1vbnN0cmHDp8OjbyIsImlkIjoxLCJleHAiOjE2NDQyOTg5NjcsImF1dGhvcml0aWVzIjpbIlVTRVIiXSwianRpIjoiMWNkMjdlMTItNGU0Zi00MzNiLTgwMDctZmI0NTVjNjc1Yjk2Iiwic3VwZXJ2aXNvciI6MSwiY2xpZW50X2lkIjoiZG9rcyJ9.OYcB-epRL5x65faFDmsZqPqHpgevBd3mnoXc_NSq_bI'

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };



  useEffect(() => {
    if (isMounted.current) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {

  
    
    //   setLayout('list')

    //console.log(ApiUrl);

      const idFilial = localStorage.getItem('idFilial')

      

    axios
      .get(
        `${ApiUrl}/api_react/promocao/vigente/${idFilial}` /* {
       headers: {"Authorization" : `Bearer ${access_token}` } } */
      )
      .then((resposta) => {
        console.log(resposta.data)
        setProdutos(resposta.data);

        setLoading(false);
      })
      .catch((erro) => {
        
        toast.current.show({severity:'error', summary: 'Servidor offline', detail:`Não foi possivel conectar ao servidor ${erro}`, life: 3000, sticky : true});

        setProdutos(null)

        setLoading(true);
      
       
      });
  }, []);

  const renderGridItem = (data) => {
    if(data.valor != null) {
    var valorformatado = data.valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }
    return (
      
      <div className="col-12 md:col-4">
       
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">
              {data.produto.hierarquia.nome} <br />
                
              </span>
            </div>
          </div>
          <div className="product-grid-item-content">
            <img
              src={`${ApiUrl}/api_react/promocao/imagem/${data.produto.id}`}
              
              onError={(e) => {
               
                e.target.src = `http://www.eanpictures.com.br:9000/api/gtin/${data.produto.ean}`;

                e.target.src = `${produtoSemFoto}`
               
              }}
              alt={data.produto.nome}
            />
            <div className="product-name">{data.produto.nome}</div>
            <div className="product-description"> 
              Código {data.produto.ean} <br/>
              {data.produto.idUnidadeMedida.nome}
            </div>
          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price">{valorformatado}</span>
          </div>
          <div className="align-items-center hidden lg:flex">

          <span className="line-height-6">
              {" "}
              OFERTA VÁLIDA DE{" "}
              {format(
                addDays(new Date(data.idPromocao.dataInicial), 1),
                "dd/MM/yyyy"
              )}{" "}
              até{" "}
              {format(
                addDays(new Date(data.idPromocao.dataFinal), 1),
                "dd/MM/yyyy"
              )}{" "}
            </span>
           
          </div>
        </div>
      </div>
    );
  };
       
  const renderListItem = (data) => {
    if(data.valor != null) {
    var valorformatado = data.valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

    return (
      <div className="col-12">
        <div className="product-list-item">
          <img
            src={`${ApiUrl}/api_react/promocao/imagem/${data.id}`}
            onError={(e) => {
              
              e.target.src = `http://www.eanpictures.com.br:9000/api/gtin/${data.ean}`;
             
              e.target.src = `${produtoSemFoto}`
            }}
            alt={data.nome}
          />
          <div className="product-list-detail">
            <div className="product-name">{data.produto.nome}</div>
            <div className="product-description">
              {data.produto.idUnidadeMedida.nome}

              <div className="align-items-center hidden lg:flex"></div>
            </div>

            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">
              {data.produto.hierarquia.nome} <br />

              <span style={{ margin: 10 }} className="line-height-6">
                {" "}
                OFERTA VÁLIDA DE{" "}
                {format(
                  addDays(new Date(data.idPromocao.dataInicial), 1),
                  "dd/MM/yyyy"
                )}{" "}
                até{" "}
                {format(
                  addDays(new Date(data.idPromocao.dataFinal), 1),
                  "dd/MM/yyyy"
                )}{" "}
              </span>
              
             
            </span>
          </div>
          <div className="product-list-action">
            <span className="product-price">{valorformatado}</span>
          </div>
        </div>
      </div>
    );
  };

  

  

  const renderHeader = () => {
    return (
      <>
        <Card style={{ margin: 0 }}>
          <div className="grid grid-nogutter">
            <div className="col-6" style={{ textAlign: "left" }}>
              <Dropdown
                options={sortOptions}
                value={sortKey}
                optionLabel="label"
                placeholder="Ordenar por "
                onChange={onSortChange}
              />
            </div>

            <div className="col-6" style={{ textAlign: "right" }}>
              <DataViewLayoutOptions
                layout={layout}
                onChange={(e) => setLayout(e.value)}
              />
            </div>
          </div>
        </Card>
      </>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  const header = renderHeader();

  return (
    <>
      <div className="App">
        
      <Toast ref={toast} position="top-center"  />
        <div>
        <h1>  OFERTAS VÁLIDAS PARA A LOJA {nomeFilial} </h1>
          <CardComponent />
        </div>
        <Card style={{ margin: 0 }}>
          <div className="dataview-demo">
            <div className="card">
              <DataView
                value={produtos}
                layout={layout}
                header={header}
                emptyMessage=" ... Nenhuma oferta encontrada ... "
                loading={loading}
                paginatorPosition="both"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                rowsPerPageOptions={[3, 6, 50, 100]}
                itemTemplate={itemTemplate}
                paginator
                rows={3}
                sortOrder={sortOrder}
                sortField={sortField}
              />
            </div>
          </div>
        </Card>

        <div className="bg-bluegray-900 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap"></div>
      </div>
    </>
  );
}
