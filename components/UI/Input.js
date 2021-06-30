import PropTypes from 'prop-types'

function Input({ name, label, type, placeholder, value, change}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input 
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => change(e)}
      />
    </div>
  )
}

Input.propTypes = {

}

export default Input

