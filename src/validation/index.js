

export const validateRegister = (username, password, confirmPassword) => {
  const errors = {};
  
  if(username.trim().length < 4) {
    errors.username = "Username must be at least 4 characters."
  }
  if(password.trim().length < 5) {
    errors.password = "Password must be at least 5 characters."
  }
  if(confirmPassword.trim().length !== password.trim().length) {
    errors.confirmPassword = "Passwords do not match."
  }

  return  {
    errors, 
    isValid: Object.keys(errors).length < 1
  }
}