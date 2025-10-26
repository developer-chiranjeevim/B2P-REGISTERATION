import * as Yup from 'yup';

// Helper for file validation
const pdfFile = (fieldName: string) =>
  Yup.mixed<File>()
    .required(`Please upload ${fieldName}`)
    .test('fileType', 'Only PDF files are allowed', (value) => {
      return value instanceof File && value.type === 'application/pdf';
    });

const validationSchema = Yup.object({
  firstname: Yup.string().trim().required('First Name is required'),

  experienceYears: Yup.number()
    .typeError('Experience Years must be a number')
    .required('This Field is Mandatory'),

  experienceMonths: Yup.number()
    .typeError('Experience Months must be a number')
    .required('This Field is Mandatory'),

  email: Yup.string().email('Invalid email').required('Email is required'),

  contactNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Only digits are allowed')
    .length(10, 'Contact number must be exactly 10 digits')
    .required('Contact Number is required'),

  whatsAppNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Only digits are allowed')
    .length(10, 'Whatsapp number must be exactly 10 digits')
    .required('WhatsApp Number is required'),

  address: Yup.string()
    .trim()
    .min(5, 'Address should be minimum 5 characters')
    .required('Address is required'),

  internetConnection: Yup.string().required('Please select an option'),
  earlyMorningWork: Yup.string().required('Please select an option'),
  workingHours: Yup.string().required('Please select an option'),

  major: Yup.string().trim().required('Major is required'),
  qualification: Yup.string().trim().required('Qualification is required'),

  resume: pdfFile('Resume'),
  identity: pdfFile('Identity Document'),
  degree: pdfFile('Degree Certificate'),
});

export default validationSchema;
