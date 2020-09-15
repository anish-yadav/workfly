type Value = {
    email?: string,
    password?: string
}

export const validate = (values:Value) => {
   const errors:Value = {};
 
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   } else if(!values.password) {
       errors.password = 'Required'
   }
 
   //...
 
   return errors;
 };