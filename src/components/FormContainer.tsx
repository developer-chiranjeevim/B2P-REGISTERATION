import React,{ useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import validationSchema from "../schema/yupschema.ts";
import axios from "axios";
import Model from "./Model.tsx";
import { SuccessNotification, FailedNotification } from "./SubmitNotifications.tsx";

interface FormValuesIF {
  firstname: string;
  qualification: string,
  major: string,
  experienceYears: number;
  experienceMonths: number;
  email: string;
  contactNumber: string;
  whatsAppNumber: string;
  address: string;
  internetConnection: string;
  earlyMorningWork: string;
  workingHours: string;
  resume: File | null;
  identity: File | null;
  degree: File | null;
}
const initialValues: FormValuesIF = {
    firstname: "",
    qualification: "",
    major: "",
    experienceYears: 0,
    experienceMonths: 0,
    email: "",
    contactNumber: "",
    whatsAppNumber: "",
    address: "",
    internetConnection: "",
    earlyMorningWork: "",
    workingHours: "",
    resume: null,
    identity: null,
    degree: null
};
 
interface FormSubmitIF{
    isSubmitted: boolean,
    submitStatus: "success" | "failed",
};

const FormContainer: React.FC = () => {

    
    
    const [applicationReference, setApplicationReference] = useState<string>("");
    const [onLoad, setOnLoad] = useState<boolean>(false);
    const [formSubmit, setFormSubmit] = useState<FormSubmitIF>({isSubmitted: false, submitStatus:"success"});
    

    const add_dynamodb_record = async(values: FormValuesIF, resume_path: string, degree_path: string, identity_path: string) => {
        
        try{
            

            const request = await axios.post("http://localhost:8080/apis/application/submit_application", {
                applicationReference: applicationReference,
                fullName: values.firstname,
                qualification: values.qualification,
                major: values.major,
                experienceMonths: values.experienceMonths,
                experienceYears: values.experienceYears,
                email: values.email,
                contactNumber: values.contactNumber,
                whatsAppNumber: values.whatsAppNumber,
                address: values.address,
                internetConnection: values.internetConnection === "yes"? true : false,
                earlyMorningWork: values.earlyMorningWork  === "yes"? true : false,
                workingHours: values.workingHours,
                resumePath: resume_path,
                identityPath: identity_path,
                degreePath: degree_path,
            });

           const status = await request.status;
           return status;


        }catch(error){
            if(error instanceof Error){
                console.log(error.message);
                return 500;
            }else{
                console.log(error);
                return 500;
            };
        };

    };

    const fetch_presigned_url = async(application_reference: string, file_name: string, file_type: string) => {
        try{

            const request = await axios.post("http://localhost:8080/apis/application/generate_presigned_url", {

                application_reference: application_reference,
                file_name: file_name,
                file_type: file_type
            });

            const {presigned_url} = request.data;
            return presigned_url;

        }catch(error){
            if(error instanceof Error){
                console.log(error.message);
            }else{
                console.log(error);
            };
        };
    };


    const upload_file = async(file: File, presigned_url: string) => {
        try{

            await axios.put(presigned_url, file, {
                headers: {
                    "Content-Type": file.type || "application/pdf",
                },
            });

            const file_url = presigned_url.split("?")[0];
            return file_url
            

        }catch(error){
            if(error instanceof Error){
                console.log(error.message);
            }else{
                console.log(error);
            };
        };
    };


    const onSubmit = async(values: FormValuesIF, actions: FormikHelpers<FormValuesIF>) => {

        setOnLoad(true);

        const resume_url = await fetch_presigned_url(applicationReference, values.resume?.name ?? "", "application/pdf");
        const address_proof_url = await fetch_presigned_url(applicationReference, values.identity?.name ?? "", "application/pdf");
        const degree_url = await fetch_presigned_url(applicationReference, values.degree?.name ?? "", "application/pdf");

        if ((values.resume && resume_url) && (values.identity && address_proof_url) && (values.degree && degree_url)) {
            const resume_path = await upload_file(values.resume, resume_url);
            const identity_path = await upload_file(values.identity, address_proof_url);
            const degree_path = await upload_file(values.degree, degree_url);

            console.log(resume_path, identity_path, degree_path);
            const statusCode = await add_dynamodb_record(values, resume_path || "", degree_path || "", identity_path || "");
            console.log(statusCode);
            if(statusCode === 200){
                setFormSubmit({isSubmitted: true, submitStatus: "success"});
            }else{
                setFormSubmit({isSubmitted: true, submitStatus: "failed"});
            }

        };

        // console.log(resume_url, address_proof_url, degree_url);
        console.log(formSubmit);
        setOnLoad(false);
        actions.setSubmitting(false);
    };

    useEffect(() => {
        const fetch_application_number = async() => {
            try{
                const request = await axios.get("http://localhost:8080/apis/application/fetch_application_number");
                const application_reference = await request.data.application_reference;
                setApplicationReference(application_reference);

            }catch(error){
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    console.log(error);
                }
            }
        };

        fetch_application_number();
    }, [])

    return (
        <>
            {
                applicationReference == ""?
                    <Model />
                    :

                
                <div className="w-full flex justify-center px-[1rem] py-[1rem]">
                    <div className="w-full max-w-[1440px] shadow-lg px-[1rem] py-[2rem] rounded-md bg-white">
                        {/* registration container title container */}
                        <div className="">
                            <div className="">
                                <h1 className="capitalize text-[1.5rem] font-semibold text-sky-800">teacher registration</h1>
                            </div>
                            <div className="">
                                <h1 className="font-semibold text-gray-600 text-[0.875rem]">{`APPLICATION ID : ${applicationReference}`}</h1>
                            </div>
                        </div>

                        {/* registration form container */}
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {({ setFieldValue, setFieldTouched, values, resetForm }) => (
                                <Form className="grid grid-cols-1 md:grid-cols-2 gap-[4rem] my-[2rem]">
                                    <div className="col-span-1">
                                        {/* left container */}
                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-1 flex items-center">
                                                <label htmlFor="firstname" className="capitalize font-semibold">full name <span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-3">
                                                <Field name="firstname" placeholder="Tony Stark" type="text" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                                <ErrorMessage name="firstname" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-1 flex items-center">
                                                <label htmlFor="qualification" className="capitalize font-semibold">qualification <span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-3">
                                                <Field as="select" id="qualification" name="qualification" className="w-full border-[1px] text-gray-500 border-gray-300 py-[0.5rem] px-[1rem] rounded-md focus:outline-none">
                                                    <option value="">Select Qualification</option>
                                                    <option value="bachelors">Bachelors</option>
                                                    <option value="masters">Masters</option>
                                                    <option value="phd">P.HD</option>
                                                </Field>
                                                <ErrorMessage name="qualification" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-1 flex items-center">
                                                <label htmlFor="major" className="capitalize font-semibold">major<span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-3">
                                            <Field as="select" id="major" name="major" className="w-full border-[1px] text-gray-500 border-gray-300 py-[0.5rem] px-[1rem] rounded-md focus:outline-none">
                                                    <option value="">Select Major</option>
                                                    <option value="computer science">Computer Science</option>
                                                    <option value="physics">Physics</option>
                                                    <option value="chemistry">Chemistry</option>
                                                    <option value="maths">Maths</option>
                                                    <option value="biology">Biology</option>
                                                </Field>
                                                <ErrorMessage name="major" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]"/>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-1 flex items-center">
                                                <label htmlFor="experience" className="capitalize font-semibold">experience<span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-3">
                                                <div className="grid grid-cols-2 gap-[1rem]">
                                                    <div className="col-span-1">
                                                        <Field name="experienceYears" type="text" placeholder="Years" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                                        <ErrorMessage name="experienceYears" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <Field name="experienceMonths" type="text" placeholder="Months" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                                        <ErrorMessage name="experienceMonths" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-1 flex items-center">
                                                <label htmlFor="email" className="capitalize font-semibold">email address <span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-3">
                                                <Field name="email" placeholder="tonystark@gmail.com" type="email" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                                <ErrorMessage name="email" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-1 flex items-center">
                                                <label htmlFor="contactNumber" className="capitalize font-semibold">contact No <span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-3">
                                                <Field name="contactNumber" placeholder="(+91) 1234567890" type="text" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                                <ErrorMessage name="contactNumber" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-1 flex items-center">
                                                <label htmlFor="whatsAppNumber" className="capitalize font-semibold">whatsApp No <span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-3">
                                                <Field name="whatsAppNumber" placeholder="(+91) 1234567890" type="text" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                                <ErrorMessage name="whatsAppNumber" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                            </div>
                                        </div>


                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-1 flex items-center ">
                                                <label htmlFor="address" className="capitalize font-semibold">address <span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-3">
                                                <Field as="textarea" name="address" placeholder="Enter Your Residential Address with pincode" className="w-full px-[1rem] py-[0.25rem] border-[1px] border-gray-300 rounded-md focus:outline-none" />
                                                <ErrorMessage name="address" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-span-1">
                                        {/* right container */}
                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-2 flex items-center">
                                                <label htmlFor="internetConnection" className="capitalize font-semibold">High speed net connection <span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-2 flex items-center gap-[1rem]">

                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                    <Field
                                                        type="radio"
                                                        name="internetConnection"
                                                        value="yes"
                                                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-sky-600 checked:border-sky-600 relative"
                                                    />
                                                    <span className="text-gray-800">Yes</span>
                                                </label>


                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                    <Field
                                                        type="radio"
                                                        name="internetConnection"
                                                        value="no"
                                                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-sky-600 checked:border-sky-600 relative"
                                                    />
                                                    <span className="text-gray-800">No</span>
                                                </label>
                                            </div>
                                            <div className="hidden lg:block lg:col-span-2"></div>
                                            <div className="col-span-2">
                                                <ErrorMessage name="internetConnection" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-2 flex items-center">
                                                <label htmlFor="earlyMorningWork" className="capitalize font-semibold">Ready to work in early morning <span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-2 flex items-center gap-[1rem]">
                                                {/* Yes Option */}
                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                    <Field
                                                        type="radio"
                                                        name="earlyMorningWork"
                                                        value="yes"
                                                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-sky-600 checked:border-sky-600 relative"
                                                    />
                                                    <span className="text-gray-800">Yes</span>
                                                </label>

                                                {/* No Option */}
                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                    <Field
                                                        type="radio"
                                                        name="earlyMorningWork"
                                                        value="no"
                                                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-sky-600 checked:border-sky-600 relative"
                                                    />
                                                    <span className="text-gray-800">No</span>
                                                </label>
                                            </div>
                                            <div className="hidden lg:block lg:col-span-2"></div>
                                            <div className="col-span-2">
                                                <ErrorMessage name="earlyMorningWork" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-2 flex items-center">
                                                <label htmlFor="workingHours" className="capitalize font-semibold">Working Hours <span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-2 flex items-center gap-[1rem]">
                                                {/* Yes Option */}
                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                    <Field
                                                        type="radio"
                                                        name="workingHours"
                                                        value="full time"
                                                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-sky-600 checked:border-sky-600 relative"
                                                    />
                                                    <span className="text-gray-800">Full Time</span>
                                                </label>

                                                {/* No Option */}
                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                    <Field
                                                        type="radio"
                                                        name="workingHours"
                                                        value="part time"
                                                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-sky-600 checked:border-sky-600 relative"
                                                    />
                                                    <span className="text-gray-800">Part Time</span>
                                                </label>
                                            </div>
                                            <div className="hidden lg:block lg:col-span-2"></div>
                                            <div className="col-span-2">
                                                <ErrorMessage name="workingHours" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-1 flex items-center">
                                                <label htmlFor="resumeFileInput" className="capitalize font-semibold">Resume <span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-3 flex items-center gap-[1rem]">
                                                <div className="flex flex-col md:flex-row items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                                                    <input
                                                        type="file"
                                                        id="resumeFileInput"
                                                        name="resume"
                                                        accept=".pdf,application/pdf"
                                                        className="hidden"
                                                        onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                            const file = event.currentTarget.files?.[0] || null;
                                                            console.log('Resume file selected:', file);
                                                            await setFieldValue("resume", file, true);
                                                        }}
                                                    />
                                                    <div className="px-3 py-2 w-64 text-gray-700 truncate">
                                                        {values.resume ? values.resume.name : "No file chosen"}
                                                    </div>
                                                    <label
                                                        htmlFor="resumeFileInput"
                                                        className="w-full md:w-fit bg-sky-600 border-[1px] border-sky-600 text-white px-4 py-2 cursor-pointer hover:bg-sky-700 transition"
                                                    >
                                                        Browse
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-span-4">
                                                <ErrorMessage name="resume" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-1 flex items-center">
                                                <label htmlFor="identityFileInput" className="capitalize font-semibold">Attach identity proof <span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-3 flex items-center gap-[1rem]">
                                                <div className="flex flex-col md:flex-row items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                                                    <input
                                                        type="file"
                                                        id="identityFileInput"
                                                        name="identity"
                                                        accept="application/pdf"
                                                        className="hidden"
                                                        onChange={async(event: React.ChangeEvent<HTMLInputElement>) => {
                                                            const file = event.currentTarget.files?.[0] || null;
                                                            await setFieldValue("identity", file, true);
                                                            setFieldTouched("identity", true);
                                                        }}
                                                    />
                                                    <div className="px-3 py-2 w-64 text-gray-700 truncate">
                                                        {values.identity ? values.identity.name : "No file chosen"}
                                                    </div>
                                                    <label
                                                        htmlFor="identityFileInput"
                                                        className="w-full md:w-fit bg-sky-600 border-[1px] border-sky-600 text-white px-4 py-2 cursor-pointer hover:bg-sky-700 transition"
                                                    >
                                                        Browse
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-span-4">
                                                <ErrorMessage name="identity" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-[1rem] mb-[2rem]">
                                            <div className="col-span-4 lg:col-span-1 flex items-center">
                                                <label htmlFor="degreeFileInput" className="capitalize font-semibold">Attach highest degree <span className="text-red-600">*</span></label>
                                            </div>
                                            <div className="col-span-4 lg:col-span-3 flex items-center gap-[1rem]">
                                                <div className="flex flex-col md:flex-row items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                                                    <input
                                                        type="file"
                                                        id="degreeFileInput"
                                                        name="degree"
                                                        accept="application/pdf"
                                                        className="hidden"
                                                        onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                            const file = event.currentTarget.files?.[0] || null;
                                                            await setFieldValue("degree", file, true);
                                                            setFieldTouched("degree", true);
                                                        }}
                                                    />
                                                    <div className="px-3 py-2 w-64 text-gray-700 truncate">
                                                        {values.degree ? values.degree.name : "No file chosen"}
                                                    </div>
                                                    <label
                                                        htmlFor="degreeFileInput"
                                                        className="w-full md:w-fit bg-sky-600 border-[1px] border-sky-600 text-white px-4 py-2 cursor-pointer hover:bg-sky-700 transition"
                                                    >
                                                        Browse
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-span-4">
                                                <ErrorMessage name="degree" component="p" className="text-red-500 text-[1rem] mt-[0.5rem]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="mb-[1rem]">
                                            {
                                                formSubmit.isSubmitted == true && formSubmit.submitStatus == "success"?
                                                    <SuccessNotification />
                                                    :
                                                    <></>   
                                            }
                                            {
                                                formSubmit.isSubmitted == true && formSubmit.submitStatus == "failed"?
                                                    <FailedNotification />
                                                    :
                                                    <></>   
                                            }
                                        </div>
                                        <div className="flex items-center gap-[1rem]">
                                            <button type="submit" className="cursor-pointer bg-green-600 text-white cpaitalize px-[2rem] py-[0.75rem] rounded-lg capitalize font-semibold hover:bg-green-700 duration-300">
                                                {
                                                    onLoad?
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                        </svg>
                                                        :
                                                        "submit"
                                                }
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => {
                                                    resetForm();
                                                    // Clear file inputs
                                                    const resumeInput = document.getElementById('resumeFileInput') as HTMLInputElement;
                                                    const identityInput = document.getElementById('identityFileInput') as HTMLInputElement;
                                                    const degreeInput = document.getElementById('degreeFileInput') as HTMLInputElement;
                                                    if (resumeInput) resumeInput.value = '';
                                                    if (identityInput) identityInput.value = '';
                                                    if (degreeInput) degreeInput.value = '';
                                                }}
                                                className="cursor-pointer bg-red-600 text-white cpaitalize px-[2rem] py-[0.75rem] rounded-lg capitalize font-semibold hover:bg-red-700 duration-300"
                                            >
                                                reset
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            }

        </>
    );
};



export default FormContainer;