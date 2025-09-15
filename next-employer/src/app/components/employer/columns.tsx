import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ColumnDef,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Employer } from "@/app/schemas/schemas";
import Image from "next/image"
import editsvg  from "@/static/images/svg/edit.svg";
import formatDateDDMMYYYY from "@/app/utils";
import useContextGlobal from "@/context/contextZustand";
import AlertConfDeleteEmployer from "../alertConfDeleteEmployer/alertConfDeleteEmployer";

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
        accessorKey:"dateOfBith",
        header: () => <div className="text-left font-bold text-[16px] th-title">Data de Nascimento</div>,
        cell: ({ row }) => {
            return <div className="text-left font-[14px] font-normal">{formatDateDDMMYYYY(row.getValue("dateOfBith"))}</div>
        }
    },
    {
        accessorKey: "typeOfHiring",
        header: () => <div className="text-left font-bold text-[16px] th-title">Tipo Contratação</div>,
        cell: ({ row }) => {
            return <div className="text-left font-[14px] font-normal">{row.getValue("typeOfHiring")}</div>
        }
    },
    {   accessorKey: "status",
        header: () => <div className="text-center font-bold text-[16px] th-title">Status</div>,
        cell: ({ row }) => {
            const isActive = row.getValue("status");

            return <div className={`${isActive ? "badgeActive" : "badgeInactive"} text-center font-[14px] font-normal capitalize`}>{row.getValue("status") ? "Ativo": "Inativo"}</div>
        }
    },
    {
        accessorKey:"actions",
        header: () => <div className="text-center pr-3 font-bold text-[16px] th-title">Ação</div>,
        cell: (prop) => {
            const router = useRouter();
            const { setEmployerEdit, setIsAddEmployer } = useContextGlobal();

            const handleEditEmployer = () => {
                setEmployerEdit(prop.row.original);
                setIsAddEmployer(false);
                router.push('/AddOrUpdate');
            }

            return (
                <div className="flex items-center gap-[8px]">
                    <Button className="p-0 bg-white cursor-pointer hover:bg-white" onClick={() => handleEditEmployer()} data-id={JSON.stringify(prop.row.original)}>
                        <Image width={18} height={18} src={editsvg} alt="edit" />
                    </Button>
                    <AlertConfDeleteEmployer employerId={prop.row.original.id}/>
                </div>
            )
        }
    },
]