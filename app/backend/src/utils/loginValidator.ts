const loginValidator = (email: string, password: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validator = emailRegex.test(email) && password.length > 5;
  return validator;
};

export default loginValidator;
