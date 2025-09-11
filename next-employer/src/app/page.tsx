import Header from "./components/header/header";

export default function Home() {
  return (
    <div className="font-display font-bold">
      <Header />
      <div className="main-container lg:max-w-[1179px] m-auto sm:px-4">
        <h1>Controle de Funcionários</h1>
        <h2>Empresa DoQR Tecnologia</h2>
      </div>
    </div>
  );
}
