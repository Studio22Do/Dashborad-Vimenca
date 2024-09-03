import React from "react";

function ButtonDelete({id}) {
    id = id;
    id = id;
    function handleclick() {
        console.log(`borrando la oficina con el id numero: ${id}`);
    }
    return (
        <div>
            <button className="border border-red-500 bg-red-300 text-red-700 font-semibold py-1 px-4 rounded-md" onClick={()=>{handleclick()}}>Eliminar</button>
        </div>
    );
}

export default ButtonDelete;
