import React from 'react'

interface Props {
    name: string,
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    error: boolean,
    options: { label: string, value: string, hidden: boolean }[],
    classes: string
}

export default ({ name, label, value, onChange, error, options, classes }: Props) => {
    return (
        <div className={"relative " + classes}>
            <label
                htmlFor={name}
                className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0"
                style={{
                    color: error ? 'red' : 'inherit'
                }}
            >
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="bg-transparent w-full h-9 px-2 py-1 border border-gray-500 rounded-md"
                style={{
                    borderColor: error ? 'red' : '#6b7280'
                }}
            >
                {options.map(option => (
                    <option
                        value={option.value}
                        disabled={option.hidden}
                        hidden={option.hidden}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}