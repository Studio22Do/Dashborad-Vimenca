import React, { useState, useContext } from "react";

const EstafetasContext = React.createContext();
const ItemsEstafetasContext = React.createContext();
const OnEditEstafetaContext = React.createContext();

function useEstafetasContext() {
    return useContext(EstafetasContext);
}

function useItemsEstafetasContext() {
    return useContext(ItemsEstafetasContext);
}

function useEditEstafeta() {
    const context = useContext(OnEditEstafetaContext);
    if (context === undefined) {
        throw new Error('useEditEstafeta must be used within a OnEditEstafetaProvider');
    }
    return context;
}

function EstafetasProviders({ children }) {
    const [activeEstafeta, setActiveEstafeta] = useState(0);
    const [ItemsEstafetas, setItemsEstafetas] = useState([
        {
            "id": 1,
            "nombre": "VIMENCA - OFICINA PRINCIPAL",
            "direccion": "Avenida Abraham Lincoln No. 306",
            "Provincia": "Santo Domingo",
            "Latitud": 18.461822,
            "Longitud": -69.928519,
            "Lunes - Viernes": "07:30AM - 11:00PM",
            "Sábado": "08:00AM - 11:00PM",
            "Domingo": "08:00AM - 12:00PM",
            "Teléfono": "(809) 532-7381",
            "Agente de Cambio": "NO",
            "Vimenpaq": "SI",
            "PagaTodo": "NO",
            "Banco Vimenca": "NO",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 2,
            "nombre": "VIMENCA - OFICINA SANTO DOMINGO ESTE",
            "direccion": "Avenida San Vicente de Paúl No. 100",
            "Provincia": "Santo Domingo",
            "Latitud": 18.500000,
            "Longitud": -69.900000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 123-4567",
            "Agente de Cambio": "SI",
            "Vimenpaq": "NO",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 3,
            "nombre": "VIMENCA - OFICINA SANTIAGO",
            "direccion": "Calle 30 de Marzo No. 55",
            "Provincia": "Santiago",
            "Latitud": 19.453056,
            "Longitud": -70.676944,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 765-4321",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "NO",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 4,
            "nombre": "VIMENCA - OFICINA PUERTO PLATA",
            "direccion": "Calle José del Carmen Ariza No. 12",
            "Provincia": "Puerto Plata",
            "Latitud": 19.790000,
            "Longitud": -70.694444,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 987-6543",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "NO",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 5,
            "nombre": "VIMENCA - OFICINA LA ROMANA",
            "direccion": "Avenida Libertad No. 25",
            "Provincia": "La Romana",
            "Latitud": 18.413611,
            "Longitud": -68.983333,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 654-3210",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "NO",
            "Banco Vimenca": "NO",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 6,
            "nombre": "VIMENCA - OFICINA SAN CRISTÓBAL",
            "direccion": "Calle Juan Pablo Duarte No. 40",
            "Provincia": "San Cristóbal",
            "Latitud": 18.166667,
            "Longitud": -70.100000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 876-5432",
            "Agente de Cambio": "NO",
            "Vimenpaq": "NO",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 7,
            "nombre": "VIMENCA - OFICINA HIGÜEY",
            "direccion": "Calle Juan Alejandro No. 15",
            "Provincia": "La Altagracia",
            "Latitud": 18.706389,
            "Longitud": -68.746389,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 345-6789",
            "Agente de Cambio": "NO",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "NO",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 8,
            "nombre": "VIMENCA - OFICINA BARAHONA",
            "direccion": "Calle 12 de Febrero No. 20",
            "Provincia": "Barahona",
            "Latitud": 18.200000,
            "Longitud": -72.250000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 234-5678",
            "Agente de Cambio": "NO",
            "Vimenpaq": "NO",
            "PagaTodo": "NO",
            "Banco Vimenca": "NO",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 9,
            "nombre": "VIMENCA - OFICINA MONTE PLATA",
            "direccion": "Calle Juan Pablo Duarte No. 5",
            "Provincia": "Monte Plata",
            "Latitud": 18.800000,
            "Longitud": -69.700000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 456-7890",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 10,
            "nombre": "VIMENCA - OFICINA NEIVA",
            "direccion": "Calle 27 de Febrero No. 30",
            "Provincia": "Higuey",
            "Latitud": 18.700000,
            "Longitud": -68.800000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 321-6543",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 11,
            "nombre": "VIMENCA - OFICINA SAN JUAN",
            "direccion": "Calle Independencia No. 8",
            "Provincia": "San Juan",
            "Latitud": 18.800000,
            "Longitud": -70.200000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 654-3210",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 12,
            "nombre": "VIMENCA - OFICINA EL SEYBO",
            "direccion": "Calle Juan Pablo Duarte No. 12",
            "Provincia": "El Seybo",
            "Latitud": 18.600000,
            "Longitud": -69.200000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 234-5678",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 13,
            "nombre": "VIMENCA - OFICINA AZUA",
            "direccion": "Calle 16 de Agosto No. 15",
            "Provincia": "Azua",
            "Latitud": 18.500000,
            "Longitud": -70.600000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 987-6543",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 14,
            "nombre": "VIMENCA - OFICINA SAN PEDRO",
            "direccion": "Calle Mella No. 50",
            "Provincia": "San Pedro de Macorís",
            "Latitud": 18.466667,
            "Longitud": -69.283333,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 654-3210",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 15,
            "nombre": "VIMENCA - OFICINA VILLA GONZALEZ",
            "direccion": "Calle 27 de Febrero No. 20",
            "Provincia": "Santiago",
            "Latitud": 19.450000,
            "Longitud": -70.700000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 876-5432",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 16,
            "nombre": "VIMENCA - OFICINA COTUI",
            "direccion": "Calle Duarte No. 10",
            "Provincia": "Cotui",
            "Latitud": 19.050000,
            "Longitud": -70.250000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 321-6543",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 17,
            "nombre": "VIMENCA - OFICINA SABANA GRANDE DE BOYA",
            "direccion": "Calle Principal No. 25",
            "Provincia": "San Cristóbal",
            "Latitud": 18.200000,
            "Longitud": -70.050000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 456-7890",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 18,
            "nombre": "VIMENCA - OFICINA VILLA TAPIA",
            "direccion": "Calle 16 de Agosto No. 5",
            "Provincia": "Villa Tapia",
            "Latitud": 19.200000,
            "Longitud": -70.400000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 654-3210",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 19,
            "nombre": "VIMENCA - OFICINA JARABACOA",
            "direccion": "Calle Juan Pablo Duarte No. 30",
            "Provincia": "Jarabacoa",
            "Latitud": 19.200000,
            "Longitud": -70.600000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 321-6543",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 20,
            "nombre": "VIMENCA - OFICINA SAN RAFAEL",
            "direccion": "Calle 27 de Febrero No. 10",
            "Provincia": "San Rafael",
            "Latitud": 18.300000,
            "Longitud": -70.200000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 654-3210",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 21,
            "nombre": "VIMENCA - OFICINA SANTO DOMINGO OESTE",
            "direccion": "Calle 2 No. 100",
            "Provincia": "Santo Domingo",
            "Latitud": 18.500000,
            "Longitud": -69.900000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 123-4567",
            "Agente de Cambio": "SI",
            "Vimenpaq": "SI",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
    ]);
    const [editEstafeta, setEditEstafeta] = useState(null); // Estado para la estafeta en edición

    const updateEstafeta = (updatedEstafeta) => {
        setItemsEstafetas((prevItems) =>
            prevItems.map((item) =>
                item.id === updatedEstafeta.id ? updatedEstafeta : item
            )
        );
    };

    const addEstafeta = (newEstafeta) => {
        setItemsEstafetas((prevItems) => [...prevItems, newEstafeta]);
    };

    const deleteEstafeta = (id) => {
        setItemsEstafetas((prevItems) =>
            prevItems.filter((item) => item.id !== id)
        );
    };

    return (
        <EstafetasContext.Provider value={{ activeEstafeta, setActiveEstafeta }}>
            <ItemsEstafetasContext.Provider value={{ ItemsEstafetas, setItemsEstafetas, updateEstafeta, addEstafeta, deleteEstafeta }}>
                <OnEditEstafetaContext.Provider value={{ editEstafeta, setEditEstafeta }}>
                    {children}
                </OnEditEstafetaContext.Provider>
            </ItemsEstafetasContext.Provider>
        </EstafetasContext.Provider>
    );
}

export { EstafetasProviders, useEstafetasContext, useItemsEstafetasContext, useEditEstafeta };