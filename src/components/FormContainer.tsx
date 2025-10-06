import React from "react";



const FormContainer : React.FC = () => {


    return(
        <> 
            <div className="w-full flex justify-center px-[1rem] py-[1rem]">
                <div className="w-full max-w-[1440px] shadow-lg px-[1rem] py-[2rem] rounded-md">
                    {/* registration container title container */}
                    <div className="">
                        <h1 className="capitalize text-[1.5rem] font-semibold text-sky-800">teacher registration</h1>
                    </div>
                    
                    {/* registration form container */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-[4rem] my-[2rem]">
                        <div className="col-span-1">
                            {/* left container */}
                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-1 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">full name <span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-3">
                                    <input placeholder="tony stark" type="text" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-1 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">qualification <span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-3">
                                     <select id="car-brand" name="qualification" className="w-full border-[1px] text-gray-500 border-gray-300 py-[0.5rem] px-[1rem] rounded-md focus:outline-none">
                                        <option value="bachelors">Bachelors</option>
                                        <option value="masters">Masters</option>
                                        <option value="phd">P.HD</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-1 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">major<span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-3">
                                     <select id="car-brand" name="major" className="w-full border-[1px] text-gray-500 border-gray-300 py-[0.5rem] px-[1rem] rounded-md focus:outline-none">
                                        <option value="computer science">Computer Science</option>
                                        <option value="physics">Physics</option>
                                        <option value="chemistry">Chemistry</option>
                                        <option value="maths">Maths</option>
                                        <option value="biology">Biology</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-1 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">experience<span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-3">
                                     <div className="grid grid-cols-2 gap-[1rem]">
                                        <div className="col-span-1">
                                            <input type="text" placeholder="Years" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                        </div>
                                        <div className="col-span-1">
                                            <input type="text" placeholder="Months" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                        </div>
                                     </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-1 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">email address <span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-3">
                                    <input placeholder="tonystark@gmail.com" type="email" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-1 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">contact No <span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-3">
                                    <input placeholder="(+91) 1234567890" type="text" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-1 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">whatsApp No <span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-3">
                                    <input placeholder="(+91) 1234567890" type="text" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                </div>
                            </div>


                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-1 flex items-center ">
                                    <label htmlFor="" className="capitalize font-semibold">address <span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-3">
                                    <textarea placeholder="Enter Your Residential Address with pincode" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-span-1">
                            {/* right container */}
                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-2 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">High speed net connection <span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-2 flex items-center gap-[1rem]">
                                    {/* Yes Option */}
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                        type="radio"
                                        name="internet"
                                        value="yes"
                                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-sky-600 checked:border-sky-600 relative"
                                        />
                                        <span className="text-gray-800">Yes</span>
                                    </label>

                                    {/* No Option */}
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                        type="radio"
                                        name="internet"
                                        value="no"
                                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-sky-600 checked:border-sky-600 relative"
                                        />
                                        <span className="text-gray-800">No</span>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-2 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">Ready to work in early morning <span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-2 flex items-center gap-[1rem]">
                                    {/* Yes Option */}
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                        type="radio"
                                        name="early_morning"
                                        value="yes"
                                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-sky-600 checked:border-sky-600 relative"
                                        />
                                        <span className="text-gray-800">Yes</span>
                                    </label>

                                    {/* No Option */}
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                        type="radio"
                                        name="early_morning"
                                        value="no"
                                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-sky-600 checked:border-sky-600 relative"
                                        />
                                        <span className="text-gray-800">No</span>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-2 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">Working Hours <span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-2 flex items-center gap-[1rem]">
                                    {/* Yes Option */}
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                        type="radio"
                                        name="working_hours"
                                        value="full time"
                                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-sky-600 checked:border-sky-600 relative"
                                        />
                                        <span className="text-gray-800">Full Time</span>
                                    </label>

                                    {/* No Option */}
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                        type="radio"
                                        name="working_hours"
                                        value="part time"
                                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-sky-600 checked:border-sky-600 relative"
                                        />
                                        <span className="text-gray-800">Part Time</span>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-1 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">Resume <span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-3 flex items-center gap-[1rem]">
                                    <div className="flex flex-col md:flex-row items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                                    <input
                                        type="text"
                                        id="fileName"
                                        placeholder="No file chosen"
                                        readOnly
                                        className="px-3 py-2 w-64 outline-none text-gray-700"
                                    />
                                    <label
                                        htmlFor="fileInput"
                                        className="w-full md:w-fit bg-sky-600 border-[1px] border-sky-600 text-white px-4 py-2 cursor-pointer hover:bg-sky-700 transition"
                                    >
                                        Browse
                                    </label>
                                    <input type="file" id="fileInput" className="hidden" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-1 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">Attach identity proof <span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-3 flex items-center gap-[1rem]">
                                    <div className="flex flex-col md:flex-row items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                                    <input
                                        type="text"
                                        id="fileName"
                                        placeholder="No file chosen"
                                        readOnly
                                        className="px-3 py-2 w-64 outline-none text-gray-700"
                                    />
                                    <label
                                        htmlFor="fileInput"
                                        className="w-full md:w-fit  bg-sky-600 border-[1px] border-sky-600 text-white px-4 py-2 cursor-pointer hover:bg-sky-700 transition"
                                    >
                                        Browse
                                    </label>
                                    <input type="file" id="fileInput" className="hidden" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                <div className="col-span-4 lg:col-span-1 flex items-center">
                                    <label htmlFor="" className="capitalize font-semibold">Attach highest degree <span className="text-red-600">*</span></label>
                                </div>
                                <div className="col-span-4 lg:col-span-3 flex items-center gap-[1rem]">
                                    <div className="flex flex-col md:flex-row items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                                    <input
                                        type="text"
                                        id="fileName"
                                        placeholder="No file chosen"
                                        readOnly
                                        className="px-3 py-2 w-64 outline-none text-gray-700"
                                    />
                                    <label
                                        htmlFor="fileInput"
                                        className="w-full md:w-fit bg-sky-600 border-[1px] border-sky-600 text-white px-4 py-2 cursor-pointer hover:bg-sky-700 transition"
                                    >
                                        Browse
                                    </label>
                                    <input type="file" id="fileInput" className="hidden" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>
                    <div className="flex items-center gap-[1rem]">
                        <button className="cursor-pointer bg-green-600 text-white cpaitalize px-[2rem] py-[0.75rem] rounded-lg capitalize font-semibold hover:bg-green-700 duration-300">submit</button>
                        <button className="cursor-pointer bg-red-600 text-white cpaitalize px-[2rem] py-[0.75rem] rounded-lg capitalize font-semibold hover:bg-red-700 duration-300">reset</button>
                    </div>
                </div>
            </div>

        </>
    );
};



export default FormContainer;