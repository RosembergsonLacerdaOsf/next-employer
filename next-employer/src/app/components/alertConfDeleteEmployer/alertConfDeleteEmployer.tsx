import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import trashsvg from "@/static/images/svg/trash.svg";
import { deleteEmployer } from "@/api/CRUD";

const AlertConfDeleteEmployer = ({ employerId, isEditpage }: { employerId:string, isEditpage:boolean }) => {
    const handleDeleteEmployer = async () => {
        const response = await deleteEmployer(+employerId);

        if (response.ok){
            window.location.reload()
        }
    }

    return (
        <AlertDialog>
            {
                isEditpage ? (
                    <AlertDialogTrigger className="flex items-center justify-center rounded-md py-2 h-[32px] w-[86px] p-0 bg-secundary text-white font-bold cursor-pointer hover:bg-white">
                        Excluir
                    </AlertDialogTrigger>
                ) : (
                    <AlertDialogTrigger className="p-0 bg-white cursor-pointer hover:bg-white">
                        <Image width={16} height={18} src={trashsvg} alt="trash" />
                    </AlertDialogTrigger>
                )
            }
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                    Depois que confirmar para remover esse funcionário não será possível acessar os dados do mesmo.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Não</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteEmployer()}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertConfDeleteEmployer;
