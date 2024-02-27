import React from 'react'

interface Props {
    name: string,
    type: string,
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error: boolean
}

export default ({ name, type, label, value, onChange, error }: Props) => {
    return (
        <div className="relative mb-6">
            <label
                htmlFor={name}
                className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0"
                style={{
                    color: error ? 'red' : 'inherit'
                }}
            >
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="bg-transparent w-full h-9 px-3 py-2 border border-gray-500 rounded-md"
                style={{
                    borderColor: error ? 'red' : '#6b7280'
                }}
            />
        </div>
    )
}