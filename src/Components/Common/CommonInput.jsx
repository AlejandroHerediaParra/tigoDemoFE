import React from 'react'

export const CommonInput = ({value, label, placeholder, onchange, type='text', error, disabled}) => {
  return (
    <div>
      <label className='text-lg font-medium'>{label}</label>
      <input
        className={`w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent ${error && 'border-red-400'}`}
        placeholder={placeholder}
        onChange={e => onchange(e.currentTarget.value)}
        onKeyDown={e => onchange(e.currentTarget.value)}
        value={value}
        type={type}
        disabled={disabled}
      />
    </div>
  )
}
