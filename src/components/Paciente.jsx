/* eslint-disable react/prop-types */
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
export const Paciente = ({paciente,setPacienteEdit,delete_paciente}) => {
    const handleDelete = () => {
        MySwal.fire({
            title: '¿Estas seguro?',
            text: "No podras deshacer los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                delete_paciente(paciente.id);
                MySwal.fire(
                'Eliminado!',
                'El registro ha sido eliminado!',
                'success'
                )
            }
        })
    }
return (
    <div className="mx-5 my-10 p-10 rounded-xl py-10 px-5 bg-white shadow-md" id="paciente_container">
                <p className="font-bold mb-3 text-gray-700 uppercase">Nombre de la Mascota: <span className="font-normal normal-case">{paciente.nombreMascota}</span></p>
                <p className="font-bold mb-3 text-gray-700 uppercase">Nombre del Propietario: <span className="font-normal normal-case">{paciente.nombreProp}</span></p>
                <p className="font-bold mb-3 text-gray-700 uppercase">Correo Electronica: <span className="font-normal normal-case">{paciente.mail}</span></p>
                <p className="font-bold mb-3 text-gray-700 uppercase">Fecha Alta: <span className="font-normal normal-case">{paciente.dateIn}</span></p>
                <p className="font-bold mb-3 text-gray-700 uppercase">Sintomas: <span className="font-normal normal-case">{paciente.sintomas}</span></p>
                <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded" onClick={ () => {setPacienteEdit(paciente)} }>Editar</button>
                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded float-right" onClick={handleDelete}>Eliminar</button>
    </div>
)
}
