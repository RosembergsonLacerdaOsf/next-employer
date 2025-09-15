"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { set, z } from "zod"
import "./form.scss"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { handleAddEmployerObJ, formSchema, arrFieldsOnForm, convertEmployObj, handleEditEmployerObj } from "./utilsForm"
import { addEmployer, editEmployer } from "@/api/CRUD"
import { useEffect, useState } from "react"
import useContextGlobal from "@/context/contextZustand"
import { AlertMessage } from "../alertMessage/alertMessage"

export function ProfileForm() {
    const {employerEdit, isAddEmployer} = useContextGlobal();
    const [defaultObjEmployer, setTest] = useState(convertEmployObj(employerEdit));
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultObjEmployer
    })

    const defaultShowMsgObj = {
        isShow: false,
        type: "",
        title: "",
        description: ""
    }

    const [showMsg, setShowMsg] = useState(defaultShowMsgObj);

    function onSubmit(values: z.infer<typeof formSchema>) {
        const response = isAddEmployer ? handleAddEmployerObJ(values) : handleEditEmployerObj(values);

        const sendObj = async() => {
            const res = isAddEmployer ? await addEmployer(response) : await editEmployer(+employerEdit.id, response)

            if (res.ok) {
                setShowMsg({
                    isShow: true,
                    type: "success",
                    title: "Sucesso!",
                    description: isAddEmployer ? "Cadastro realizado com sucesso!" : "Funcionário editado com sucesso!"
                })
            } else {
                setShowMsg({
                    isShow: true,
                    type: "error",
                    title: "Erro!",
                    description: "Ocorreu um erro, tente novamente!"
                })
            }
        }

        sendObj();
    }

    useEffect(() => {
        setTimeout(() => {
            setShowMsg(defaultShowMsgObj)
        }, 5000);
    }, [showMsg])

    return (
        <>
            <div className="employer-form-card bg-white rounded-xl p-[20px] inset-shadow-sm my-[20px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid grid-cols-3 gap-x-4">
                        {arrFieldsOnForm.map((idx, attr) => (
                            <FormField
                                key={attr}
                                control={form.control}
                                name={idx.id}
                                render={({ field }) => (
                                    <FormItem className="mb-[20px]">
                                        <FormLabel>{idx.label}</FormLabel>
                                        {idx.type == "select" ? (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={idx.placeholder} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        idx.options.map((item, idx) => (
                                                            <SelectItem key={`idx-${item.value}`} value={item.value}>{item.label}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <FormControl>
                                                <Input placeholder={idx.placeholder} {...field} />
                                            </FormControl>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit" className="col-start-1 col-end-1 w-[111px] bg-primary-color">{isAddEmployer ? "Cadastrar" : "Salvar"}</Button>
                    </form>
                </Form>

            </div>
            {
                showMsg?.isShow && <AlertMessage typeAlert={showMsg?.type} titleMsg={showMsg?.title} descriptionMsg={showMsg?.description}/>
            }
        </>
    )
}