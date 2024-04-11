import TopSales from './top-sales.tsx';
import Catalog from "./catalog.tsx";

export default function Home() {

  return (
    <>
      <TopSales />
      <Catalog page={'home'}/>
    </>
  )
}
