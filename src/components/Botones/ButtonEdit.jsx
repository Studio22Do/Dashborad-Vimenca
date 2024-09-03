import React from "react";

function ButtonEdit({id}) {
    id = id;
    function handleclick() {
        console.log(`editando la oficina con el id numero: ${id}`);
    }
    return (
        <div className="relative">
            <button className="text-blue-800 font-semibold py-1 px-4 rounded-md buttonedit" onClick={()=>{handleclick()}}>Editar</button>
        </div>
    );
}

export default ButtonEdit;
