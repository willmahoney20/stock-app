interface FormProps {
    name: string,
    email: string,
    username: string,
    password: string
}

export default ({ name, email, username, password }: FormProps) => {
    let errors: Partial<FormProps> = {}

    // check for empty (or invalid) strings
    if(!name){
        errors.name = 'Name is required'
    }

    if(!email){
        errors.email = 'Email is required'
    }

    if(!username){
        errors.username = 'Username is required'
    }

    if(!password){
        errors.password = 'Password is required'
    }

    if(password.trim().length < 8 || password.trim().length > 20){
        errors.password = 'Password must be between 8 and 20 characters'
    }

    if(Object.keys(errors).length > 0){
        return errors
    }

    return false
}