import { Employer } from "@/app/schemas/schemas";
import formatDateDDMMYYYY from "@/app/utils";
import { z } from "zod"

const phoneValidation = new RegExp(
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
);

export const handleAddEmployerObJ = (obj: Employer) => {
    const { dateOfBith, cpf, status } = obj;

    return {
        ...obj,
        dateOfBith: new Date(dateOfBith).toISOString(),
        id: +cpf.replace(/\D/g, ""),
        status: status == "active" ? true : false,
    };
}

export const handleEditEmployerObj = (obj: Employer) => {
  const { status,cpf, ...rest} = obj;

  return {
    ...rest,
    status: status == "active" ? true : false,
    cpf
  }
}

export const convertEmployObj = (obj: Employer) => {
  if (+obj?.id == 0) {
    return  {...obj, status: "", typeOfHiring: ""}
  }

  if(!obj.dateOfBith) {
    return
  }

  const { dateOfBith, id, status } = obj;
  const birthDayFormatted = formatDateDDMMYYYY(dateOfBith);

  return {
      ...obj,
      dateOfBith: birthDayFormatted,
      id: `${id}`,
      status: status ? "active" : "inactive",
  };
}

export const arrFieldsOnForm = [
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

export const defaultValues = {
    id: 0,
    name: "",
    email: "",
    cpf: "",
    phone: "",
    dateOfBith: "",
    typeOfHiring: "",
    status: false
}

export const formSchema = z.object({
    name: z.string({
      message: 'Este campo é obrigatório.',
    }).min(5, {
        message: "Nome do usuário precisar ter mais de 5 caracteres.",
    }),
    email: z.string({
      message: 'Este campo é obrigatório.',
    }).email("Endereço de e-mail inválido"),
    cpf: z.string({
      message: 'Este campo é obrigatório.',
    })
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length >= 11;
    }, 'CPF deve conter no mínimo 11 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return !!Number(replacedDoc);
    }, 'CPF deve conter apenas números.'),
    phone: z.string({
      message: 'Este campo é obrigatório.',
    }).min(9, {message:"Telefone precisa de mais de 9 caracteres"}).regex(phoneValidation, {message: "Telefone invalido"}),
    dateOfBith:  z.string({
      message: 'Este campo é obrigatório.',
    }).transform((str, ctx) => {
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
    typeOfHiring: z.string({
      message: 'Este campo é obrigatório.',
    }).min(1, {
      message: "Você precisa selecionar uma opção.",
    }),
    status: z.string({
      message: 'Este campo é obrigatório.',
    }).min(1, {
      message: "Você precisa selecionar uma opção.",
    })
})