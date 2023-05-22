/* eslint-disable react/prop-types */
import { Paciente } from "./Paciente"
export const Pacientes = ({pacientes,setPacienteEdit,delete_paciente}) => {
    return (
        <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
            {pacientes && pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
                    <p className="text-lg mt-5 text-center mb-3">Administra tus <span className="text-indigo-600 font-bold">Pacientes y Citas</span></p>
                    {pacientes.length != 0 &&  pacientes.map( (paciente) => (
                        <Paciente key={paciente.id} paciente={paciente} setPacienteEdit={setPacienteEdit} delete_paciente={delete_paciente}/>
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
                    <p className="text-lg mt-5 text-center mb-3">Empieza a registrarlos <span className="text-indigo-600 font-bold"> y apareceran en la lista</span></p>
                </>
            )}
        </div>
    )
}
