/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useForm } from "../hooks/useForm";
import { ErrorMessages } from "./ErrorMessages";
import { useEffect } from 'react';

const generateID = () => {
    const random = Math.random().toString(36).substr(2);
    const date = Date.now().toString(36);

    return ((random + date));
}

const MySwal = withReactContent(Swal);
const initialForm = {
    id: '',
    nombreMascota:'',
    nombreProp:'',
    mail:'',
    dateIn:'',
    sintomas:''
};
const ValidationForm = (form,e) => {
    let errors = {},
    key = e.target.name,
    regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
    regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
    regexComments = /^.{1,255}$/;

    if(!form[key].trim()){
        errors[key] = 'El campo no debe estar vacio'
    }else{
        errors[key] = ''
        if(key == 'mail'){
            if(!regexEmail.test(form[key].trim())){
                errors[key] = 'El formato del correo no es el correcto'
            }else{
                errors[key] = '';
            }
        }
        else{
            if(key == 'sintomas'){
                if(!regexComments.test(form[key].trim())){
                    errors[key] = 'Solo puedes escribir entre 1 a 255 caracteres.';
                }else{
                    errors[key] = '';
                }
            }else if(key == 'dateIn'){
                console.log();
            }else{ 
                if(!regexName.test(form[key].trim())){
                    errors[key] = 'Solo puedes escribir letras';
                }else{
                    errors[key] = '';
                }
            }
        }
    }


    return errors;
};

export const Formulario = ({pacientes,setPacientes, pacienteEdit,setPacienteEdit}) => {

    const {form,setForm,errors,handleChange,handleBlur} = useForm(initialForm,ValidationForm);

    useEffect(() => {
        if(Object.keys(pacienteEdit).length > 0){
            setForm(pacienteEdit);
        } 
    },[pacienteEdit])

    const handleSubmit = (e) =>{
        e.target.disabled = true;
        e.preventDefault();
        let empty = true,
        objeto_paciente = {};
        Object.entries(errors).forEach(entrie => {
            const [key,value] = entrie;
            // eslint-disable-next-line no-self-assign
            value === '' ? empty=empty : empty=false;
        })

        if(empty === true){
            if(pacienteEdit.id ){
                console.log('Se esta editando un registro.')
                Object.entries(form).forEach(entrie => {
                    const [key,value] = entrie;
                    objeto_paciente = {...objeto_paciente, [key]:value}
                })
                const pacientesActualizados = pacientes.map( el => el.id === pacienteEdit.id ? objeto_paciente : el);
                setPacientes(pacientesActualizados);
                setForm(initialForm);
                setPacienteEdit({});
                MySwal.fire({
                    title: <strong>Listo!</strong>,
                    html: <i>Registro actualizado!</i>,
                    icon: 'success',
                    confirmButtonText: 'ok'
                })

            }else{
                Object.entries(form).forEach(entrie => {
                    const [key,value] = entrie;
                    objeto_paciente = {...objeto_paciente, [key]:value}
                })
                objeto_paciente.id = generateID()
                setPacientes([...pacientes, objeto_paciente]);
                setForm(initialForm);
                MySwal.fire({
                    title: <strong>Listo!</strong>,
                    html: <i>Informacion del seguimiento añadida!</i>,
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
            }
            
        }else{
            MySwal.fire({
                title: <strong>Atencion!</strong>,
                html: <i>Algunos campos contienen datos no permitidos!</i>,
                icon: 'error',
                confirmButtonText: 'ok'
            })
        }
        e.target.disabled = false;
    }


    const restartForm = () => {
        setPacienteEdit({});   
        setForm(initialForm);
    }

    return (
        <div className="md:w-1/2 lg:2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-3">Añade Paciente o <span className="text-indigo-600 font-bold">Modificalos</span></p>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md py-10 px-5">

                {/* Input para el nombre de la mascota */}
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="n_mascota">Nombre Mascota</label>
                    <input id="n_mascota" name="nombreMascota" className="w-full p-2 border-2 mt-2 placeholder-indigo-100 rounded-md" type="text" placeholder="Nombre de la Mascota" value={form.nombreMascota} onChange={handleChange} onBlur={handleBlur} required/>
                    {errors.nombreMascota && <ErrorMessages message={errors.nombreMascota}/>}
                </div>

                {/* Input para el nombre del propietario */}
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="n_propietario">Nombre del Propietario</label>
                    <input id="n_propietario" name="nombreProp" className="w-full p-2 border-2 mt-2 placeholder-indigo-100 rounded-md" type="text" placeholder="Nombre del Propietario" value={form.nombreProp} onChange={handleChange} onBlur={handleBlur} required/>
                    {errors.nombreProp && <ErrorMessages message={errors.nombreProp}/>}
                </div>

                {/* Input para el correo del propietario */}
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="p_email">Correo Electronico</label>
                    <input id="p_email" name="mail" type="email" className="w-full p-2 border-2 mt-2 placeholder-indigo-100 rounded-md" placeholder="Correo Electronico" value={form.mail} onChange={handleChange} onBlur={handleBlur} required/>
                    {errors.mail && <ErrorMessages message={errors.mail}/>}
                </div>

                {/* Input para la fecha de alta */}
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="p_date">Fecha de Alta</label>
                    <input id="p_date" name="dateIn" type="date" className="w-full p-2 border-2 mt-2 placeholder-indigo-100 rounded-md" value={form.dateIn} onChange={handleChange} onBlur={handleBlur} required/>
                    {errors.dateIn && <ErrorMessages message={errors.dateIn}/>}
                </div>

                {/* Input para los sintomas de la mascota */}
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="p_sintomas">Sintomas</label>
                    <textarea id="p_sintomas" name="sintomas" type="date" className="w-full p-2 border-2 mt-2 placeholder -indigo-100 rounded-md" placeholder="Sintomas de la mascota" value={form.sintomas} onChange={handleChange} onBlur={handleBlur} required/>
                    {errors.sintomas && <ErrorMessages message={errors.sintomas}/>}
                </div>

                <input id="btn_enviar" type="submit" className="w-full shadow-lg bg-indigo-500 p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" value={pacienteEdit && Object.entries(pacienteEdit).length > 0 ? 'Guardar Informacion' : 'Agregar paciente'}/>
                {Object.entries(pacienteEdit).length > 0 && <input type="submit" className="w-full shadow-lg mt-2 bg-red-500 p-3 text-white uppercase font-bold hover:bg-red-700 cursor-pointer transition-colors" value='Cancelar' onClick={restartForm} />}
            </form>
        </div>
    )
}