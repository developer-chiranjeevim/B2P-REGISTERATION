import React from "react";



const Navbar : React.FC = () => {


    return(
        <>
            <div className="fixed w-full top-0 bg-white z-10 flex justify-center shadow-lg">
                <div className="w-full max-w-[1440px] px-[1rem] py-[1rem]">
                    {/* navbar logo container */}
                    <div className="cursor-pointer select-none">
                        <h1 className="text-[1.5rem] font-semibold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">B2PTeachers</h1>
                    </div>
                </div>
            </div>
            <div className="w-full h-[80px]"></div>
        </>
    );
};



export default Navbar;