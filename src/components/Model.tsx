import React from "react";



const Model : React.FC = () => {


    return(
        <div className="w-full flex justify-center items-center px-[1rem] py-[1rem]">
            <div className="w-full max-w-[1440px] h-[80vh] shadow-lg px-[1rem] py-[2rem] rounded-md bg-white">
                <div className="flex h-full flex-col items-center justify-center">
                    <div className="">
                        <h1 className="text-[2rem] font-semibold text-center bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent text-center">B2P Teachers</h1>
                    </div>  
                    <div className="">
                        <video autoPlay muted loop playsInline width="640" height="360">
                            <source src="/videos/loader.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                    </div>
                </div>
            </div>

        </div>
    );
};



export default Model;