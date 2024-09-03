import React from "react";
import ButtonDelete from "./Botones/ButtonDelete";
import ButtonEdit from "./Botones/ButtonEdit";

function Block({ nombre, address, id }) {
    return (
        <div className="border-b py-4 pl-4 flex justify-between items-center">
            <div>
                <div className="font-semibold">{nombre}</div>
                <div className="text-gray-500">{address}</div>
            </div>
            <div className="flex gap-9 px-9">
                <ButtonEdit id={id}/>
                <ButtonDelete id={id}/>
            </div>
        </div>
    );
}

export default Block;
