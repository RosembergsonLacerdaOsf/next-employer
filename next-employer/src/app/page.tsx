import { DataTableDemo } from "./components/employer/employerDataTable";
import Header from "./components/header/header";

export default function Home() {
  return (
    <div className="font-display font-bold">
      <Header />
      <div className="main-container lg:max-w-[1179px] m-auto px-4">
        <h1 className="text-[36px] color-title">Controle de Funcionários</h1>
        <h2 className="text-[20px] color-subtitle">Empresa DoQR Tecnologia</h2>
        <DataTableDemo />
      </div>
    </div>
  );
}
