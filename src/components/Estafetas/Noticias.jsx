import { React, useState } from "react";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

function Noticias() {
    const [items, setitems] = useState([
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
    const itemsPerPage = 3;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            {currentItems.map(i=>(
                <div>
                    {i.nombre}
                </div>
            ))}
            <ReactPaginate
                breakLabel="..."
                nextLabel="Siguiente >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Atras"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default Noticias;
