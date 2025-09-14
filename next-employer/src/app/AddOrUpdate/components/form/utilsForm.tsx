import { Employer } from "@/app/schemas/schemas";

export const handleAddEmployerObJ = (obj: Employer) => {
    const { dateOfBith, cpf, phone, status } = obj;

    return {
        ...obj,
        dateOfBith: new Date(dateOfBith).toISOString(),
        id: cpf.replace(/\D/g, ""),
        phone: phone.replace(/\D/g, ""),
        status: status == "active" ? true : false,
    };
}