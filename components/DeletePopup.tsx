import { useRouter } from 'next/navigation'

export default ({ id, closePopup }: {
    id: number,
    closePopup: () => void
}) => {
    const router = useRouter()

    const handleDelete = async () => {
        console.log('sir', id)

        try {
            const res = await fetch('/api/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id ? id : null
                })
            })

            if(!res.ok){
                throw new Error('Failed to upload new product')
            }
            
            router.push('/')
        } catch (err){
            console.error('Error adding new product:', err)
        }
    }

    return (
        <div className="absolute m-auto top-0 bottom-20 left-0 right-0 flex flex-col items-center bg-light-grey rounded shadow-gray-500 shadow-xl p-4 h-36 w-80 dp-fade">
            <h3 className="text-black font-bold mb-2">
                Are you sure?
            </h3>
            <p className="text-black font-normal opacity-70 mb-2">
                This product will be deleted forever.
            </p>
            <div className="flex flex-row justify-center">
                <button
                    className="bg-purple text-white text-sm font-semibold py-2 px-3 rounded shadow-md mr-1"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button
                    className="bg-white text-purple text-sm font-semibold py-2 px-3 border-2 border-purple rounded shadow-md ml-1"
                    onClick={closePopup}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}