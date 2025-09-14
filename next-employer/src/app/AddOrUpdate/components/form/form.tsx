"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { date, z } from "zod"
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
import { handleAddEmployerObJ } from "./utilsForm"
import { addEmployer } from "@/api/CRUD"

const phoneValidation = new RegExp(
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
);

const formSchema = z.object({
    name: z.string().min(5, {
        message: "Nome do usuário precisar ter mais de 5 caracteres.",
    }),
    email: z.string().email("Endereço de e-mail inválido"),
    cpf: z.string({
      message: 'CPF é obrigatório.',
    })
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length >= 11;
    }, 'CPF deve conter no mínimo 11 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return !!Number(replacedDoc);
    }, 'CPF deve conter apenas números.'),
    phone: z.string().min(9, {message:"Telefone precisa de mais de 9 caracteres"}).regex(phoneValidation, {message: "Telefone invalido"}),
    dateOfBith:  z.string().transform((str, ctx) => {
      const date = new Date(str);
      if (isNaN(date.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Formato de data inválido",
        });
        return z.NEVER;
      }
      return date;
    }),
    typeOfHiring: z.string().min(1, {
      message: "Você precisa selecionar uma opção.",
    }),
    status: z.string().min(1, {
      message: "Você precisa selecionar uma opção.",
    })
})

export function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: 0,
            name: "",
            email: "",
            cpf: "",
            phone: "",
            dateOfBith: "",
            typeOfHiring: "",
            status: false
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const response = handleAddEmployerObJ(values);

        const add = async() => {
            const res = await addEmployer(response)

            if (res.ok) {
                console.log(res)
            }
        }

        add();
    }

    const arrFieldsOnForm = [
        {
            id: "name",
            label: "Nome",
            placeholder: "Nome",
            type: "string"
        },
        {
            id: "email",
            label: "E-mail",
            placeholder: "e-mail",
            type: "string"
        },
        {
            id: "cpf",
            label: "CPF",
            placeholder: "000.000.000-00",
            type: "string",
            mask:''
        },
        {
            id: "phone",
            label: "Celular",
            placeholder: "(99) 99999-9999",
            type: "string"
        },
        {
            id: "dateOfBith",
            label: "Data de Nascimento",
            placeholder: "00/00/0000",
            type: "string"
        },
        {
            id: "typeOfHiring",
            label: "Tipo de Contratação",
            placeholder: "Selecione uma opção...",
            type: "select",
            options: [
                {label:"CLT", value:"CLT"},
                {label:"PJ", value:"PJ"},
            ]
        },
        {
            id: "status",
            label: "Status",
            placeholder: "Seleciona uma opção...",
            type: "select",
            options:[
                {label:"Ativo", value:"active"},
                {label:"Inativo", value: "inactive"}
            ]
        }
    ]

    return (
        <div className="employer-form-card bg-white rounded-xl p-[20px] inset-shadow-sm mt-[20px]">
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
                                        <Select onValueChange={field.onChange}>
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
                    <Button type="submit" className="col-start-1 col-end-1 w-[111px] bg-primary-color">Cadastrar</Button>
                </form>
            </Form>
        </div>
    )
}