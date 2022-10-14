import {useState} from "react"
import Mensaje from "./Mensaje";
import CerrarBtn from "../img/cerrar.svg";

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto }) => {

    const [ nombre, setNombre ] = useState("")
    const [ cantidad, setCantidad ] = useState("")
    const [ categoria, setCategoria ] = useState("")
    const [ mensaje, setMensaje ] = useState("")

    const ocultarModal = () => {
        setTimeout(() => {
            setModal(false);
        }, 500);
        setAnimarModal(false);
    };

    const handleSubmit = e =>{
        e.preventDefault()
        if([ nombre, cantidad, categoria ].includes('')){
            setMensaje('Todos los campos son obligatorios')
            setTimeout(()=>{
                setMensaje('')
            }, 3000)
            return
        }
        guardarGasto({ nombre , cantidad, categoria })
    }

    
    return (
    <div className="modal">
      <div className="cerrar-modal">
        <img 
            src={CerrarBtn} 
            alt="cerrar modal" 
            onClick={ocultarModal} 
        />
      </div>
      <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>Nuevo Gasto</legend>
        { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input 
            id="nombre" 
            type="text" 
            placeholder="Añade un nuevo gasto" 
            value={nombre}
            onChange={e=> setNombre(e.target.value)}
            />
          <label htmlFor="cantidad">Cantidad</label>
          <input 
            id="cantidad" 
            type="number" 
            placeholder="Añande la cantidad del gasto: ej.300" 
            value={cantidad}
            onChange={e => setCantidad(Number(e.target.value))}
            />  
            <div className="campo">
              <label htmlFor="categoria">Categoria</label>
                <select 
                    id="categoria"
                    value={categoria}
                    onChange={ e => { setCategoria(e.target.value)}}>
                        <option value="">-- Seleccione --</option>    
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </div>
          <input type="submit" value="Añadir gasto" />                   
      </form>
    </div>
  );
};

export default Modal;
