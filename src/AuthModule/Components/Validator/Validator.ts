export const emailValidation = {
    required: "Email is required",
    pattern: {
      value:
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
      message: "Email is invalid",
    },
  };
  
  export const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      message:
        "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character",
    },
  };
  
  
  export const userNameValidation = {
    required: "User Name is required",
    minLength: {
      value: 3,
      message: "User Name must be at least 3 characters",
    },
    maxLength: {
        value: 16,
        message: "User Name must be at most 16 characters",
      },
    pattern: {
      value: /^[a-zA-Z]+[0-9]+$/,
      message:
        "User Name must contain characters and end with numbers without spaces",
    },
  };
  
  export const countryValidation = {
    required: "Country is required",
    minLength: {
      value: 3,
      message: "Country must be at least 3 characters",
    },
    maxLength: {
      value: 16,
      message: "Country must not be more than 16 characters",
    },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: "Country is invalid (only letters)",
    },
  };
  
  export const phoneNumberValidation = {
    pattern: {
        value: /^(\+2)?01[0125][0-9]{8}$/,
        message: "Please enter a valid Egyptian phone number",
      },
      
      required: {
        value: true,
        message: "Phone Number is Required",
      },
  };
  
  export const OTPValidation = {
    required: "OTP is required",
  };