import { createContext } from "react";
import { toast } from "react-toastify";


export let ToastContext=createContext(0);

export default function ToastContextProvider(props:any){

    const toastSuccess=(message:string)=>{
        toast.success(message);
    }
    const toastError=(message:string)=>{
        toast.error(message);
    }
    const toastAny=(message:string)=>{
        toast(message);
    }

    return <ToastContext.Provider value={{toastSuccess,toastError,toastAny}}>
        {props.children}
    </ToastContext.Provider>
}