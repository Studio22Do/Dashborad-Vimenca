import React, { useState, useEffect } from "react";
import Block from "../Block";
import ReactPaginate from "react-paginate";
import Fuse from "fuse.js";
import { useEstafetasContext, useItemsEstafetasContext } from "../../providers/EstafetasProviders";

function Oficinas() {
    const { activeEstafeta, setActiveEstafeta } = useEstafetasContext();
    const { ItemsEstafetas } = useItemsEstafetasContext(); 

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState(ItemsEstafetas);
    const itemsPerPage = 8;
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredItems(ItemsEstafetas); // Mostrar todos los elementos si la búsqueda está vacía
        } else {
            const fuse = new Fuse(ItemsEstafetas, { // Usar ItemsEstafetas
                keys: ["nombre", "direccion"],
                includeScore: true,
                //includeMatches: true,
                //minMatchCharLength: 6,
                //location: 9,
                ignoreLocation: true,
                threshold: 0.9,
            });

            const results = fuse.search(searchTerm);
            setFilteredItems(results.map((result) => result.item));
        }
        setItemOffset(0); // Reiniciar el offset al buscar
    }, [searchTerm, ItemsEstafetas]);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filteredItems.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="bg-white rounded-tr-2xl rounded-b-2xl">
            <div className="px-4 py-5 border-b flex justify-between">
                <h2 className="text-xl font-bold text-[--primary]">
                    Todas las Estafetas
                </h2>
                <div className="flex gap-4">
                    <button
                        className="py-2 px-5 text-[--primary] font-semibold border border-[--primary] rounded-lg"
                        onClick={() => setActiveEstafeta(2)}
                    >
                        Crear Nuevo
                    </button>
                    <div className="searchinput relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar"
                            className="border rounded-lg py-1 bg-[--gris] pl-9 h-full"
                        />
                    </div>
                </div>
            </div>

            {currentItems.length > 0 ? (
                currentItems.map((item) => (
                    <Block
                        key={item.id}
                        nombre={item.nombre}
                        address={item.direccion}
                        id={item.id}
                    />
                ))
            ) : (
                <p>No se encontraron resultados.</p>
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
                pageClassName="pagebut"
                previousClassName="prevbut"
                nextClassName="nextbut"
                activeClassName="activelink"
            />
        </div>
    );
}

export default Oficinas;