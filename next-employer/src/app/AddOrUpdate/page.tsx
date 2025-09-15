"use client";

import { Button } from "@/components/ui/button";
import Header from "../components/header/header";
import { ProfileForm } from "./components/form/form";
import Image from "next/image";
import arrowLeftSvg from "@/static/images/svg/arrow-left.svg";
import { useRouter } from "next/navigation"
import useContextGlobal from "@/context/contextZustand";

const AddOrUpdate = () => {
    const router = useRouter();
    const {isAddEmployer} = useContextGlobal();

    const handleBackToHome = () => {
        router.push('/');
    }

    return (
        <div className="font-display">
            <Header />
            <div className="main-container lg:max-w-[1179px] m-auto px-4">

                <Button className="bg-white text-black p-0 hover:bg-white cursor-pointer" onClick={handleBackToHome}>
                    <Image width={14} height={14} src={arrowLeftSvg} alt="adicionar funcionário" />
                    Voltar
                </Button>

                <h1 className="text-[36px] color-title">{isAddEmployer ? "Adicionar" : "Editar"} Funcionário</h1>
                <h2 className="text-[20px] color-subtitle">Empresa DoQR Tecnologia</h2>

                <ProfileForm />
            </div>
        </div>
    )
}

export default AddOrUpdate;