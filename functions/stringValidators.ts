const emailIsValid = function (email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
};

const passwordIsValid = function (password: string): boolean {
    //Minimum eight characters, at least one letter, one number and one special character:
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
};

export { emailIsValid, passwordIsValid };
