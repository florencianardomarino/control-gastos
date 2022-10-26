import { useState, useEffect } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";

function App() {
  const [ presupuesto, setPresupuesto ] = useState(
    Number(localStorage.getItem('presupuesto')) ?? ' '
  );
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false);
  const [ modal, setModal ] = useState(false)
  const [ animarModal, setAnimarModal ] = useState(false)
  const [ gastos, setGastos ] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
  const [ gastoEditar, setGastoEditar] = useState({});
  const [ filtro, setFiltro ] = useState('');
  const [ filtrados, setFiltrados ] = useState([]);

  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)
      setTimeout(()=>{
          setAnimarModal(true)
      }, 500)
    }
  }, [gastoEditar])

  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? ' ')
  }, [presupuesto])

  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? ' ');

    if(presupuestoLS > 0 ){
      setIsValidPresupuesto(true)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  },[gastos])


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
      if(gasto.id){
        const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
        setGastos(gastosActualizados)
        setGastoEditar({})
      } else{
        gasto.id = generarId();
        gasto.fecha = Date.now();
        setGastos([...gastos, gasto])
      }
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
    setGastoEditar({})
    setTimeout(()=>{
        setAnimarModal(true)
    }, 500)
  };

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados);
  }

  useEffect(()=>{
    if(filtro){
      const filtrados = gastos.filter(gasto => gasto.categoria === filtro)
      setFiltrados(filtrados)
    }
  },[filtro])

  return (
    <div className={modal ? "fijar" : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos}
              formatearFecha={formatearFecha}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtrados={filtrados}
              filtro={filtro}
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
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}

    </div>
  );
}

export default App;
