import { Employer } from '@/app/schemas/schemas'
import { create } from 'zustand'

interface ContextGlobal {
  isAddEmployer: boolean,
  employerEdit: Employer | {},
  listEmployers: Array<Employer> | [],
  setEmployerEdit: (data: {}) => void,
  setListEmployers: (data: []) => void,
}

const useContextGlobal = create<ContextGlobal>()((set) => ({
  isAddEmployer: true,
  employerEdit: {
    id:"",
    name: "",
    email: "",
    cpf: "",
    phone: "",
    dateOfBith: "",
    typeOfHiring: "CLT",
    status: false
  },
  listEmployers: [],
  setEmployerEdit: (data) => set(() => ({ employerEdit: data })),
  setListEmployers: (data) => set(() => ({ listEmployers: data })),
  changeIsAddEmployer: (data: any) => set(() => ({ isAddEmployer: data })),
}))

export default useContextGlobal;
