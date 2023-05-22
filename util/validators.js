 const validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }
    if(email.trim() === ''){
        errors.email = 'email must not be empty'
    } else {
        const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email.match(regEx)) {
            errors.email = 'Email must be a valid address';
        }
    }
    if(password === ''){
        errors.password = 'password must not be empty'
    }else if(password !== confirmPassword) {
        errors.confirmPassword = 'Password must match';
    }
    
    return {
        errors,
        valid : Object.keys(errors).length < 1
    }

};

const validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }
    if(password === ''){
        errors.password = 'Password must not be empty';
    }

    return {
        errors,
        valid : Object.keys(errors).length < 1
    }
};

const validate = { 
    validateRegisterInput,
    validateLoginInput
}

export default validate