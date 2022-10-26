import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  formatearFecha,
  setGastoEditar,
  eliminarGasto,
  filtro,
  filtrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      { filtro ? (
            <>
              <h2>{filtrados.length ? "Gastos" : "No hay gastos aún en esta categoría"}</h2>
              {
                filtrados.map(gasto => (
                  <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  formatearFecha={formatearFecha}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                  />          
                ))
              }
            </>
      ) : (
            <>
              <h2>{gastos.length ? "Gastos" : "No hay gastos aún"}</h2>
              {
                gastos.map(gasto => (
                    <Gasto
                      key={gasto.id}
                      gasto={gasto}
                      formatearFecha={formatearFecha}
                      setGastoEditar={setGastoEditar}
                      eliminarGasto={eliminarGasto}
                      />
                ))
              }
            </>
            ) 
      }
    </div>
  );
};

export default ListadoGastos;
