import * as Yup from 'yup';

const validationSchema = Yup.object({
    firstname: Yup.string().required('First Name is required'),
    experienceYears: Yup.number().required("This Field is Mandatory"),
    experienceMonths: Yup.number().required("This Field is Mandatory"),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contactNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Only digits are allowed')
        .min(10, 'Contact number must be exactly 10 digits')
        .max(10, 'Contact number must be exactly 10 digits')
        .required('Contact Number is required'),
    whatsAppNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Only digits are allowed')
        .min(10, 'Whatsapp number must be exactly 10 digits')
        .max(10, 'Whatsapp number must be exactly 10 digits')
        .required('WhatsApp Number is required'),
    address: Yup.string()
        .min(5, 'Address Should Be Minimum 5 Characters')
        .required('Address is Required'),
    internetConnection: Yup.string().required("Please Select an Option"),
    earlyMorningWork: Yup.string().required("Please Select an Option"),
    workingHours: Yup.string().required("Please Select an Option"),
    resume: Yup.mixed<File>()
        .required("Please Upload a file")
        .test('fileType', 'Only PDF Files are Allowed', (value) => {
            if (!value) return false;
            return value instanceof File && value.type === 'application/pdf';
        }),
    identity: Yup.mixed<File>()
        .required("Please Upload a file")
        .test('fileType', 'Only PDF Files are Allowed', (value) => {
            if (!value) return false;
            return value instanceof File && value.type === 'application/pdf';
        }),
    degree: Yup.mixed<File>()
        .required("Please Upload a file")
        .test('fileType', 'Only PDF Files are Allowed', (value) => {
            if (!value) return false;
            return value instanceof File && value.type === 'application/pdf';
        }),
});

export default validationSchema;