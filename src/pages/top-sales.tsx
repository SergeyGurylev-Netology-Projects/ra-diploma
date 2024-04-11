import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getData, selectTopSalesItems } from '../slices/top-sales-slice';
import ListItems from "../components/list-items.tsx";
import Loading from '../components/loading.tsx';
import Failed from '../components/failed.tsx';

export default function TopSales() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector(selectTopSalesItems);

  const loadData = () => dispatch(getData());

  useEffect(() => {
      if (status !== 'idle') loadData();
    }, []
  );

  const repeatLoadCatalogClickHandle = () => loadData();

  return (
    <>
      {(status === 'failed' || status === 'loading' || (status === 'idle' && items.length > 0)) &&
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          {status === 'failed' && <Failed actions={{repeatClick: repeatLoadCatalogClickHandle}}/>}
          {status === 'loading' && <Loading />}
          {status === 'idle' && items.length > 0 &&
            <ListItems items={items}/>}
        </section>}
    </>
  )
}
