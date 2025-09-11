import { Button } from "@/components/ui/button"
import Image from "next/image"
import editsvg  from "@/static/images/svg/edit.svg";
import trashsvg from "@/static/images/svg/trash.svg";

import {
  ColumnDef,
} from "@tanstack/react-table"

export type Employer = {
    id: string
    name: string
    email: string
    cpf: string
    phone: string
    birthDate: string
    typeContract: "CLT" | "PJ"
    status: "ativo" | "inativo"
}

export const listEmployer: Employer[] = [
  {
    id: "m5gr84i9",
    name:"Patrick say jonh",
    email: "pati@gmail.com",
    cpf: "322.432.566-23",
    phone: "+55 85 3423-4324",
    birthDate: "27/02/2011",
    typeContract: "PJ",
    status: "inativo"
  },
  {
    id: "3u1reuv4",
    name: "Artur cabral silva",
    email: "tutu@gmail.com",
    cpf: "972.453.213-23",
    phone: "+55 85 2344-4324",
    birthDate: "08/08/1997",
    typeContract: "CLT",
    status: "ativo"
  },
  {
    id: "derv1ws0",
    name: "karliane lima de oliveira",
    email: "kana@gmail.com",
    cpf: "423.432.123-23",
    phone: "+55 85 1233-3232",
    birthDate: "19/09/2021",
    typeContract: "CLT",
    status: "ativo"
  },
  {
    id: "5kma53ae",
    name: "Marilia santos pinto",
    email: "marisapinto@gmail.com",
    cpf: "231.312.123-23",
    phone: "+55 85 2424-4234",
    birthDate: "10/02/2022",
    typeContract: "PJ",
    status: "inativo",
  },
  {
    id: "bhqecj4p",
    name: "Joao naruto",
    email: "narujonh@gmail.com",
    cpf: "065.123.323-54",
    phone: "+55 85 99250-1023",
    birthDate: "08/08/1997",
    typeContract: "CLT",
    status: "ativo"
  },
]

export const columns: ColumnDef<Employer>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-left pl-3 font-bold text-[16px] th-title">Nome</div>,
        cell: ({ row }) => (
            <div className="capitalize pl-3 font-[14px] font-normal">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: () => <div className="text-left font-bold text-[16px] th-title">E-mail</div>,
        cell: ({ row }) => <div className="lowercase font-[14px] font-normal">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "cpf",
        header: () => <div className="text-left font-bold text-[16px] th-title">CPF</div>,
        cell: ({ row }) => {
            return <div className="text-left font-[14px] font-normal">{row.getValue("cpf")}</div>
        },
    },
    {
        accessorKey:"phone",
        header: () => <div className="text-left font-bold text-[16px] th-title">Celular</div>,
        cell: ({ row }) => {
            return <div className="text-left font-[14px] font-normal">{row.getValue("phone")}</div>
        },
    },
    {
        accessorKey:"birthDate",
        header: () => <div className="text-left font-bold text-[16px] th-title">Data de Nascimento</div>,
        cell: ({ row }) => {
            return <div className="text-left font-[14px] font-normal">{row.getValue("birthDate")}</div>
        }
    },
    {
        accessorKey: "typeContract",
        header: () => <div className="text-left font-bold text-[16px] th-title">Tipo Contratação</div>,
        cell: ({ row }) => {
            return <div className="text-left font-[14px] font-normal">{row.getValue("typeContract")}</div>
        }
    },
    {   accessorKey: "status",
        header: () => <div className="text-center font-bold text-[16px] th-title">Status</div>,
        cell: ({ row }) => {
            const isActive = row.getValue("status") == "ativo" ;

            return <div className={`${isActive ? "badgeActive" : "badgeInactive"} text-center font-[14px] font-normal capitalize`}>{row.getValue("status")}</div>
        }
    },
    {
        accessorKey:"actions",
        header: () => <div className="text-center pr-3 font-bold text-[16px] th-title">Ação</div>,
        cell: () => {
            return (
                <div className="flex items-center gap-[8px]">
                    <Button className="p-0 bg-white cursor-pointer hover:bg-white">
                        <Image width={18} height={18} src={editsvg} alt="edit" />
                    </Button>
                    <Button className="p-0 bg-white cursor-pointer hover:bg-white">
                        <Image width={16} height={18} src={trashsvg} alt="trash" />
                    </Button>
                </div>
            )
        }
    },
]