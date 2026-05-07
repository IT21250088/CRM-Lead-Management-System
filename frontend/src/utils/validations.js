// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone number validation regex (basic international format)
const PHONE_REGEX = /^[\d\s\-+()]*$/;

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return '';
};

/**
 * Validate name field (Lead Name, Company Name, Salesperson)
 */
export const validateName = (name, fieldName = 'Name') => {
  if (!name || name.trim() === '') {
    return `${fieldName} is required`;
  }
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }
  if (name.length > 100) {
    return `${fieldName} cannot exceed 100 characters`;
  }
  return '';
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return ''; // Phone is optional
  }
  if (!PHONE_REGEX.test(phone)) {
    return 'Phone number contains invalid characters';
  }
  if (phone.replace(/\D/g, '').length < 7) {
    return 'Phone number must have at least 7 digits';
  }
  return '';
};

/**
 * Validate estimated deal value
 */
export const validateDealValue = (value) => {
  if (value === '' || value === null || value === undefined) {
    return ''; // Optional field
  }
  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return 'Estimated Deal Value must be a valid number';
  }
  if (numValue < 0) {
    return 'Estimated Deal Value cannot be negative';
  }
  if (numValue > 999999999) {
    return 'Estimated Deal Value is too large';
  }
  return '';
};

/**
 * Validate entire Login form
 */
export const validateLoginForm = (email, password) => {
  const errors = {};
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

/**
 * Validate entire Lead form
 */
export const validateLeadForm = (formData) => {
  const errors = {};
  
  // Validate Lead Name
  const leadNameError = validateName(formData.leadName, 'Lead Name');
  if (leadNameError) errors.leadName = leadNameError;
  
  // Validate Company Name
  const companyNameError = validateName(formData.companyName, 'Company Name');
  if (companyNameError) errors.companyName = companyNameError;
  
  // Validate Email
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  // Validate Phone (optional but if provided, validate format)
  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;
  
  // Validate Deal Value (optional but if provided, validate format)
  const dealValueError = validateDealValue(formData.estimatedDealValue);
  if (dealValueError) errors.estimatedDealValue = dealValueError;
  
  return errors;
};
