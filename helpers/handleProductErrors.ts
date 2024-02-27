import ErrorProps from '@/types/errors'

interface FormProps {
    name: string,
    quantity: number,
    price: string,
    gender: string,
    group: string,
    images: string[]
}

export default ({ name, quantity, price, gender, group, images }: FormProps) => {
    let errors: Partial<ErrorProps> = {}

    // check for empty (or invalid) strings
    if(!name){
        errors.name = 'Name is required'
    }

    if(!quantity && quantity !== 0){
        errors.quantity = 'Quantity is required'
    }

    if(!price){
        errors.price = 'Price is required'
    }

    if(!gender){
        errors.gender = 'Gender is required'
    }
    
    if(!group){
        errors.group = 'Group is required'
    }

    // check images are between 1 and 5 uploads
    if(images.length < 1 || images.length > 5){
        errors.images = 'You must upload 1-5 images'
    }

    if(Object.keys(errors).length > 0){
        return errors
    }

    return false
}