import React from "react";
import Clock from "../../assets/Clock.png";
function Edit() {
    return (
        <div className="flex justify-center">
            <div className=" border p-16 rounded-2xl">
                <h2 className="font-bold text-xl text-[--primary]">
                    Informacion de la estafeta
                </h2>
                <div>
                    <div className="flex gap-2 items-end mb-4 ">
                        <img
                            src={Clock}
                            alt=""
                            style={{ backgroundSize: "cover" }}
                        />
                        <div>
                            <h3 className="font-semibold">Lunes a viernes</h3>
                            <div className="flex gap-8">
                                <input
                                    class="de relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="monday"
                                    type="time"
                                />
                                <input
                                    class="a relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="monday"
                                    type="time"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-5 mb-4">
                        <div className="w-4"></div>
                        <div>
                            <h3 className="font-semibold">Sabados</h3>
                            <div className="flex gap-8">
                                <input
                                    class="de relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="monday"
                                    type="time"
                                />
                                <input
                                    class="a relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="monday"
                                    type="time"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="w-4"></div>
                        <div>
                            <h3 className="font-semibold">Domingos</h3>
                            <div className="flex gap-8">
                                <input
                                    class="de relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="monday"
                                    type="time"
                                />
                                <input
                                    class="a relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="monday"
                                    type="time"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
