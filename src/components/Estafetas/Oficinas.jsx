import { React, useState, useEffect } from "react";
import Block from "../Block";
import ReactPaginate from "react-paginate";
import Fuse from "fuse.js";
import { useEstafetasContext } from "../../providers/EstafetasProviders";

function Oficinas({ setActiveButton }) {
    const [items, setItems] = useState([
        {
            id: 1,
            nombre: "Oficina Central",
            direccion: "Avenida Principal 123, Ciudad A",
        },
        {
            id: 2,
            nombre: "Oficina Secundaria",
            direccion: "Calle Secundaria 456, Ciudad B",
        },
        {
            id: 3,
            nombre: "Oficina Norte",
            direccion: "Calle Norte 789, Ciudad C",
        },
        { id: 4, nombre: "Oficina Sur", direccion: "Calle Sur 101, Ciudad D" },
        {
            id: 5,
            nombre: "Oficina Este",
            direccion: "Calle Este 202, Ciudad E",
        },
        {
            id: 6,
            nombre: "Oficina Oeste",
            direccion: "Calle Oeste 303, Ciudad F",
        },
        {
            id: 7,
            nombre: "Oficina de Ventas",
            direccion: "Calle Ventas 404, Ciudad G",
        },
        {
            id: 8,
            nombre: "Oficina de Marketing",
            direccion: "Calle Marketing 505, Ciudad H",
        },
        {
            id: 9,
            nombre: "Oficina de Recursos Humanos",
            direccion: "Calle Recursos 606, Ciudad I",
        },
        {
            id: 10,
            nombre: "Oficina de Finanzas",
            direccion: "Calle Finanzas 707, Ciudad J",
        },
        {
            id: 11,
            nombre: "Oficina de IT",
            direccion: "Calle IT 808, Ciudad K",
        },
        {
            id: 12,
            nombre: "Oficina de Atención al Cliente",
            direccion: "Calle Atención 909, Ciudad L",
        },
        {
            id: 13,
            nombre: "Oficina de Proyectos",
            direccion: "Calle Proyectos 1010, Ciudad M",
        },
        {
            id: 14,
            nombre: "Oficina de Legal",
            direccion: "Calle Legal 1111, Ciudad N",
        },
        {
            id: 15,
            nombre: "Oficina de Investigación",
            direccion: "Calle Investigación 1212, Ciudad O",
        },
        {
            id: 16,
            nombre: "Oficina de Desarrollo",
            direccion: "Calle Desarrollo 1313, Ciudad P",
        },
        {
            id: 17,
            nombre: "Oficina de Calidad",
            direccion: "Calle Calidad 1414, Ciudad Q",
        },
        {
            id: 18,
            nombre: "Oficina de Logística",
            direccion: "Calle Logística 1515, Ciudad R",
        },
        {
            id: 19,
            nombre: "Oficina de Compras",
            direccion: "Calle Compras 1616, Ciudad S",
        },
        {
            id: 20,
            nombre: "Oficina de Estrategia",
            direccion: "Calle Estrategia 1717, Ciudad T",
        },
        {
            id: 21,
            nombre: "Oficina de Comunicación",
            direccion: "Calle Comunicación 1818, Ciudad U",
        },
        {
            id: 22,
            nombre: "Oficina de Desarrollo Sostenible",
            direccion: "Calle Sostenible 1919, Ciudad V",
        },
        {
            id: 23,
            nombre: "Oficina de Innovación",
            direccion: "Calle Innovación 2020, Ciudad W",
        },
        {
            id: 24,
            nombre: "Oficina de Seguridad",
            direccion: "Calle Seguridad 2121, Ciudad X",
        },
        {
            id: 25,
            nombre: "Oficina de Relaciones Públicas",
            direccion: "Calle Relaciones 2222, Ciudad Y",
        },
        {
            id: 26,
            nombre: "Oficina de Capacitación",
            direccion: "Calle Capacitación 2323, Ciudad Z",
        },
        {
            id: 27,
            nombre: "Oficina de Administración",
            direccion: "Calle Administración 2424, Ciudad AA",
        },
        {
            id: 28,
            nombre: "Oficina de Auditoría",
            direccion: "Calle Auditoría 2525, Ciudad AB",
        },
        {
            id: 29,
            nombre: "Oficina de Servicio Técnico",
            direccion: "Calle Técnico 2626, Ciudad AC",
        },
        {
            id: 30,
            nombre: "Oficina de Consultoría",
            direccion: "Calle Consultoría 2727, Ciudad AD",
        },
    ]);
    const { activeEstafeta, setActiveEstafeta } = useEstafetasContext();

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState(items);
    const itemsPerPage = 8;
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredItems(items); // Mostrar todos los elementos si la búsqueda está vacía
        } else {
            const fuse = new Fuse(items, {
                keys: ["nombre", "direccion"],
                includeScore: true,
                threshold: 0.3,
            });

            const results = fuse.search(searchTerm);
            setFilteredItems(results.map((result) => result.item));
        }
        setItemOffset(0); // Reiniciar el offset al buscar
    }, [searchTerm, items]);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filteredItems.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * itemsPerPage) % filteredItems.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="bg-white rounded-tr-2xl rounded-b-2xl">
            <div className="px-4 py-5 border-b flex justify-between">
                <h2 className="text-xl font-bold text-[--primary]">
                    Todas las Estafetas
                </h2>
                <div className="flex gap-4">
                    <button className="py2 px-5 text-[--primary] font-semibold border border-[--primary] rounded-lg" onClick={()=> setActiveEstafeta(2)}>Crear Nuevo</button>
                    <div className="searchinput relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar"
                            className="border rounded-lg py-1 bg-[--gris] pl-9"
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
