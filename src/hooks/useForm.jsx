import { useState } from "react"
export const useForm = (initialForm,ValidationForm) => {
    const [form,setForm] = useState(initialForm);
    const [errors,setErrors] = useState({});

    const handleChange = (e) =>{
        const {name,value} = e.target
        setForm({
            ...form,
            [name]:value
        });
    }

    const handleBlur = (e) => {
        handleChange(e);
        setErrors({...errors, ...ValidationForm(form,e)})
    }
    return{form,setForm,errors,handleChange,handleBlur}
}
