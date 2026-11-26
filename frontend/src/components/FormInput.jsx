
export default function FormInput({
    label,
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    required = true,
    readOnly = false,
}) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>

            <input
                type={type}
                className="form-control"
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                readOnly={readOnly}
            />
        </div>
    );
}
