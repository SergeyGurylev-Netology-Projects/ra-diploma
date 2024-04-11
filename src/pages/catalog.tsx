import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { categoryActions, getData as getCategoryData, selectCategoryItems } from '../slices/category-slice';
import { catalogActions, getData as getCatalogData, selectCatalogItems } from '../slices/catalog-slice';
import ListItems from '../components/list-items.tsx';
import Categories from '../components/categories.tsx';
import Loading from '../components/loading.tsx';
import Failed from "../components/failed.tsx";

export default function Catalog({...props}) {
  const [ searchParams] = useSearchParams('');
  const searchParam = searchParams.has('search') ? String(searchParams.get('search')) : "";

  const dispatch = useAppDispatch();
  const { items: itemsCatalog, status: statusCatalog, search, offset, category, isEmpty } = useAppSelector(selectCatalogItems);
  const { items: itemsCategory, status: statusCategory, active: activeCategory} = useAppSelector(selectCategoryItems);
  const [ searchState, SetSearchState ] = useState({search: searchParam});

  const loadCategories = () => dispatch(getCategoryData());

  const loadCatalog = () => dispatch(getCatalogData(search, offset, category));

  useEffect(() => {
    if (statusCategory !== 'idle') loadCategories();
    if (statusCatalog !== 'idle') loadCatalog();
    }, []
  );

  useEffect(() => {
      if (searchParam) {
        SetSearchState({ ...searchState, search: searchParam });
        dispatch(catalogActions.setSearch(searchParam));
        dispatch(catalogActions.clearItems());
        dispatch(getCatalogData(searchParam, offset, category));
      }
    }, [searchParam]
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    SetSearchState({...searchState, [name]: value});
  }

  const searchSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchState.search !== search || isEmpty) {
      dispatch(catalogActions.setSearch(searchState.search));
      dispatch(catalogActions.clearItems());
      dispatch(getCatalogData(searchState.search, offset, category));
    }
  }

  const showMoreHandle = () => dispatch(getCatalogData(search, offset + 6, category));

  const categoryClickHandle = (id:number) => {
    dispatch(categoryActions.setActive(id));
    dispatch(catalogActions.setCategory(id));
    dispatch(catalogActions.clearItems());
    dispatch(getCatalogData(search, 0, id));
  }

  const repeatLoadCategoriesClickHandle = () => loadCategories();

  const repeatLoadCatalogClickHandle = () => loadCatalog();

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {props.page === 'catalog' &&
        <form className="catalog-search-form form-inline" onSubmit={searchSubmitHandle}>
          <input name="search" className="form-control" value={searchState.search} onChange={onSearchChange} placeholder="Поиск" />
        </form>}

      {statusCategory === 'loading' && <Loading />}
      {statusCategory === 'failed' && <Failed actions={{repeatClick: repeatLoadCategoriesClickHandle}}/>}
      {statusCategory === 'idle' && <>
        <Categories items={itemsCategory} active={activeCategory} actions={{categoryClick: categoryClickHandle}}/>

        {statusCatalog === 'loading' && isEmpty && <Loading />}
        {statusCatalog === 'failed' && isEmpty && <Failed actions={{repeatClick: repeatLoadCatalogClickHandle}}/>}
        {(statusCatalog === 'idle' || !isEmpty) && <ListItems items={itemsCatalog}/>}

        {statusCatalog === 'failed' && !isEmpty && <Failed />}
        {(statusCatalog === 'idle' || statusCatalog === 'failed') && !isEmpty && itemsCatalog.length >= offset + 6 &&
          <div className="text-center">
            <button className="btn btn-outline-primary" onClick={showMoreHandle}>Загрузить ещё</button>
          </div>}
        {statusCatalog === 'loading' && !isEmpty && <Loading />}
        </>}
    </section>
  )
}
