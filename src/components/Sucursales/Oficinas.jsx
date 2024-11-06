import React, { useState, useEffect, useCallback, useMemo } from "react";
import Block from "./Block";
import ReactPaginate from "react-paginate";
import Fuse from "fuse.js";
import { useSucursalesContext } from "../../providers/SucursalesProviders";

import { useItemsOficinasContext } from "../../providers/OficinasProviders";

const Oficinas = React.memo(() => {
    const { activeSucursal, setActiveSucursal } = useSucursalesContext();
    const { itemsOficinas } = useItemsOficinasContext();
    const [ItemsSucursales, setItemsSucursales] = useState(
        itemsOficinas.sucursales
    );
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 8;
    const [itemOffset, setItemOffset] = useState(0);
    // Efecto para actualizar ItemsEstafetas cuando itemsOficinas cambie
    useEffect(() => {
        setItemsSucursales(itemsOficinas.sucursales);
    }, [itemsOficinas]); // Este efecto se ejecutará cada vez que itemsOficinas cambie

    // Filtrado de elementos usando useMemo
    const filteredItems = useMemo(() => {
        if (searchTerm === "") {
            return ItemsSucursales; // Mostrar todos los elementos si la búsqueda está vacía
        } else {
            const fuse = new Fuse(ItemsSucursales, {
                keys: ["nombre_oficina", "direccion"],
                includeScore: true,
                ignoreLocation: true,
                threshold: 0.9,
            });
            const results = fuse.search(searchTerm);
            return results.map((result) => result.item);
        }
    }, [searchTerm, ItemsSucursales]); // Dependencias de useMemo

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filteredItems.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

    const handlePageClick = useCallback(
        (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % filteredItems.length;
            setItemOffset(newOffset);
        },
        [itemsPerPage, filteredItems.length]
    ); // Actualiza las dependencias

    useEffect(() => {
        setItemOffset(0);
    }, [searchTerm]);

    return (
        <div className="bg-white rounded-tr-2xl rounded-b-2xl">
            <div className="px-4 py-5 border-b flex justify-between">
                <h2 className="text-xl font-bold text-[--primary]">
                    Todas las Sucursales
                </h2>
                <div className="flex gap-4">
                    <button
                        className="py-2 px-5 text-[--primary] font-semibold border border-[--primary] rounded-lg"
                        onClick={() => setActiveSucursal(2)}
                    >
                        Crear Nuevo
                    </button>
                    <div className="searchinput relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar"
                            autoComplete="off" // Evita autocompletar
                            className="border rounded-lg py-1 bg-[--gris] pl-9 h-full"
                        />
                    </div>
                </div>
            </div>

            {currentItems.length > 0 ? (
                currentItems.map((item) => (
                    <Block
                        key={`${item.id}-${item.nombre_oficina}`} // Clave única combinando id y nombre
                        nombre={item.nombre_oficina}
                        address={item.direccion}
                        id={item.id}
                    />
                ))
            ) : (
                <p className="text-center text-gray-500 text-xl py-80">
                    No se encontraron resultados.
                </p>
            )}

            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className="pagination"
                pageLinkClassName="pagebut"
                previousLinkClassName="prevbut"
                nextLinkClassName="nextbut"
                activeLinkClassName="activelink"
            />
        </div>
    );
});

export default Oficinas;
