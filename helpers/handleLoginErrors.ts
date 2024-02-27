interface FormProps {
    username: string,
    password: string
}

export default ({ username, password }: FormProps) => {
    let errors: Partial<FormProps> = {}

    // check for empty (or invalid) strings
    if(!username){
        errors.username = 'Username is required'
    }

    if(!password){
        errors.password = 'Password is required'
    }

    if(Object.keys(errors).length > 0){
        return errors
    }

    return false
}