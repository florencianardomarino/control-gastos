import { useState } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";

function App() {
  const [ presupuesto, setPresupuesto ] = useState();
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false);
  const [ modal, setModal ] = useState(false)
  const [ animarModal, setAnimarModal ] = useState(false)
  const [ gastos, setGastos ] = useState([])

  const formatearFecha = fecha => {
      const fechaNueva = new Date(fecha);
      const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }

      return fechaNueva.toLocaleString('es-ES', opciones)
  }

  const generarId = ()=>{
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
  };

  const guardarGasto = gasto =>{
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
      
      const ocultarModal = () => {
        setTimeout(() => {
          setModal(false);
        }, 500);
        setAnimarModal(false);
      };

      ocultarModal()
    };

  const handleNuevoGasto = ()=>{
    setModal(true)
    setTimeout(()=>{
        setAnimarModal(true)
    }, 500)
  };

  return (
    <div className={modal && "fijar"}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos 
              gastos={gastos}
              formatearFecha={formatearFecha}
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto} 
              alt="Icono Nuevo Gasto" 
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      { modal && 
      <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
      />}

    </div>
  );
}

export default App;
