import { useState, useEffect } from "react";
import {Header} from "./components/Header";
import { Formulario } from "./components/Formulario";
import { Pacientes } from "./components/Pacientes";

function App() {

  const [pacientes,setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []);
  const [pacienteEdit,setPacienteEdit] = useState({});

  /*useEffect(() => {
    const obtenerLista = () => {
      const pacientesList = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      console.log(pacientesList)
      setPacientes(pacientesList);
    }
    obtenerLista()
  },[])*/

  useEffect(() => {
    localStorage.setItem('pacientes' , JSON.stringify(pacientes));
  },[pacientes]);

  const delete_paciente = (id) => {
    const pacientesActualizados = pacientes.filter(el => el.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header/>
      <div className="mt-10 md:flex">
        <Formulario pacientes={pacientes} setPacientes={setPacientes} pacienteEdit={pacienteEdit} setPacienteEdit={setPacienteEdit}/>
        <Pacientes pacientes={pacientes} setPacienteEdit={setPacienteEdit} delete_paciente={delete_paciente}/>
      </div>
    </div>
  )
}

export default App
