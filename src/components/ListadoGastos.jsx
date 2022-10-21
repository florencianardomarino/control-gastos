import Gasto from "./Gasto"

const ListadoGastos = ({ gastos, formatearFecha, setGastoEditar, eliminarGasto }) => {

  return (
    <div className="listado-gastos contenedor">
        <h2>{gastos.length ? 'Gastos' : 'No hay gastos aún'}</h2>
        {gastos.map( gasto => (
            <Gasto 
            key={gasto.id}
            gasto={gasto}
            formatearFecha={formatearFecha}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            />
            )
        )}
    </div>
  )
}

export default ListadoGastos