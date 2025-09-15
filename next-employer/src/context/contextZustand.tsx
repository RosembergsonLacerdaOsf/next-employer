import { Employer } from '@/app/schemas/schemas'
import { create } from 'zustand'

interface ContextGlobal {
  isAddEmployer: boolean,
  defaultEmployer: Employer | {},
  employerEdit: Employer | {},
  listEmployers: Array<Employer> | [],
  setEmployerEdit: (data: {}) => void,
  setListEmployers: (data: []) => void,
  setIsAddEmployer: (data:boolean) => void
}

const defaultEmployer = {
  id: 0,
  name: "",
  email: "",
  cpf: "",
  phone: "",
  dateOfBith: "",
  typeOfHiring: "CLT",
  status: false
}

const useContextGlobal = create<ContextGlobal>()((set) => ({
  isAddEmployer: true,
  defaultEmployer: defaultEmployer,
  employerEdit: defaultEmployer,
  listEmployers: [],
  setEmployerEdit: (data) => set(() => ({ employerEdit: data })),
  setListEmployers: (data) => set(() => ({ listEmployers: data })),
  setIsAddEmployer: (data: boolean) => set(() => ({ isAddEmployer: data })),
}))

export default useContextGlobal;
