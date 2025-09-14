"use client"
import { Employer } from "@/app/schemas/schemas"

const handleResponse = async (res: Response): Promise<any> => {
    const json = await res.json()

    if (!json) {
        return
    }

    return json
}

export const getEmployers = async () => {
    const res = await fetch('https://api-testefrontend.qforms.com.br/employees')
    return handleResponse(res)
}

export const addEmployer = async(body:Employer) => {
    const res = await fetch('https://api-testefrontend.qforms.com.br/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body && JSON.stringify(body)
    })
    return res
}

export const editEmployer = async(id: number, body:Employer) => {
    const res = await fetch(`https://api-testefrontend.qforms.com.br/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body && JSON.stringify(body)
    })
    return handleResponse(res)
}

export const getEmployer = async(id: number) => {
    const res = await fetch(`https://api-testefrontend.qforms.com.br/employees/${id}`)
    return handleResponse(res)
}

export const deleteEmployer = async(id:number) => {
    const res = await fetch(`https://api-testefrontend.qforms.com.br/employees/${id}`, {
        method: 'DELETE'
    })

    return res
}

export default getEmployers;