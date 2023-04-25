import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Header from './Header';
import Banner from './Banner';
import logo from '../logo.jpg'
import '../../App.css'
import { element } from 'prop-types';


/**
 * * IMPORTANTE, si se piden componentes de tipo clase:
 *    ? SI NO SE DECLARA import React from 'react';
 *  
 *    * class <Nombre del componente> extends React.Component {
 *    *     render () {
 *              codigo auxiliar
 * 
 *    *       return (
 *    *         codigo JSX a renderizar
 *    *       )
 *    *     }
 *    *  }
 *    *
 *    * export default <Nombre del componente>
 * 
 *    ? SI YA SE DECLARO import React from 'react';
 * 
 *    * class <Nombre del componente> extends Component {
 *    *     render () {
 *              codigo auxiliar
 * 
 *    *       return (
 *    *         codigo JSX a renderizar
 *    *       )
 *    *     }
 *    *  }
 *    *
 *    * export default <Nombre del componente>
 * 
 */
class App extends React.Component {
  /**
   * * IMPORTANTE:
   * *  Para declarar state: 
   * *      state = { elementos a considerar }
   * 
   * *  Para llamar a state y alguno de sus elementos: 
   * *      this.state.<elemento a llamar>
   * 
   */
  state = {
    carrito: [],
    total: 0,
    productosLista:[
      {codigo:1,descripcion:"Moto G42 128 GB", precio:4299},
      {codigo:2,descripcion:"Laptop HP AMD Ryzen 5", precio:11999},
      {codigo:3,descripcion:"Apple Macbook Air", precio:18599},
      {codigo:4,descripcion:"Pantalla Tcl Led 55 Smart 4k", precio:7999},
      {codigo:5,descripcion:"Cámara Seguridad Wifi 2mp Hd", precio:411},
      {codigo:6,descripcion:"Licuadora Ninja Professional", precio:1799},
      {codigo:7,descripcion:"Ouo Silla Gamer Reclinable", precio:1499},
      {codigo:8,descripcion:"Auriculares In-ear Inalámbricos", precio:334},
    ],

    registro_carrito_empty: {
      codigo: 'xxx',
      descripcion: 'xxx',
      cantidad: 'xxx',
      importe: 'xxx'
    }
  }
  

  /**
   * * IMPORTANTE
   * *  Para declarar funciones flecha/lambda que puedan ser llamadas dentro
   * *  de 'render()'
   * 
   *    * fuera de 'render()'...
   *    * <nombre de la función> = (<argumentos de entrada>) => {
   *        codigo de la función
   *    * } 
   */
  remover = (codigo) => {

    const productos = this.state.carrito;
    if (productos.length > 0) {
      // * <Array>.findIndex(): encuentra el indice de la primer coincidencia
      // * En el contexto de 'index_producto_remove': ... de cada elemento tal que se cumpla la condición
      const index_producto_to_remove = productos.findIndex(element => element.codigo === codigo);
      const total_carrito = this.state.total - productos[index_producto_to_remove].precio;
      const updated_elements_carrito = productos.splice(index_producto_to_remove, 1);
  
      /**
       * * IMPORTANTE
       * *  Para modificar 'state' de la forma indicada en 'React': 
       * *      this.setState({<argumentos a modificar>})
       * 
       * ! ESTOS DEBEN COINCIDIR CON EL TIPO DE DATO PROPUESTO DENTRO DE
       * ! LA DEFINICION DE 'state'.
       */
      this.setState({
        carrito: updated_elements_carrito,
        total: total_carrito
      });
    }
  }

  agregar = (codigo) => {
    const productos = this.state.productosLista;
    const carrito = this.state.carrito;

    if (carrito.length > 0) {
      const producto_to_add = productos.find(element => element.codigo === codigo);
      const total_carrito = this.state.total + producto_to_add.precio;
  
      this.setState({
        carrito: [...carrito, producto_to_add],
        total: total_carrito
      });
    }
    else {
      const producto_to_add = productos.find(element => element.codigo === codigo);
      const total_carrito = this.state.total + producto_to_add.precio;
  
      this.setState({
        carrito: [producto_to_add],
        total: total_carrito
      });
    }
}

  render () {

    // * return() va a contener el contenido HTML a mostrar en el navegador.
    /**
     * * Para llamar codigo de Javascript dentro de las lineas de código de JSX:
     *    * { codigo de Javascript a llamar }
     * ? SI SE VA A UTILIZAR JS y HTML: 
     *    * { fragmento1 <> fragmento2 </>}
     * 
     * ? Si un componente acepta 'props': 
     *    * <<nombre del componente> <nombre props>={valor}/>
     */
    return (
        <div className="App">
          <div className='App-header'>
            <Header logo={logo}/>
          </div>
          <div className='App-banner'>
            <Banner texto_banner='Copyright Todos los derechos reservados'/>
          </div>
          <div className='App-body'>
            <div className='Productos'>
              <header>
                Ofertas limitadas
              </header>
              <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Descripcion</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                          this.state.productosLista.map((registro, i) =>
                          <tr key={i}>
                            <td>{registro.descripcion}</td>
                            <td>{registro.precio}</td>
                            <td>
                              <Button variant="primary" onClick={() => this.agregar(registro.codigo)}>+</Button>
                            </td>
                            </tr>
                          )
                        }
                    </tbody>
              </Table>
            </div>
            <div className='Carrito'>
              {
                this.state.carrito.length > 0 ? 
                <>
                  <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Descripcion</th>
                              <th>Precio</th>
                              <th>Cantidad</th>
                              <th>Importe</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.carrito.map((registro, i) =>
                                <tr key={i}>
                                  <td>{registro.descripcion}</td>
                                  <td>{registro.precio}</td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <Button variant="danger" onClick={() => this.remover(registro.codigo)}>-</Button>
                                  </td>
                                </tr>
                              )
                            }
                          </tbody>
                    </Table>
                      <header>
                        Carrito: {this.state.total} 
                      </header>
                </>
                : 
                <></>
              }
            </div>
          </div>
        </div>
    )
  }
}

export default App