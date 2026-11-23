export default function TextInput({label, name, placeholder, onChange, value}) {
    return (
        <>
            <div className="form-field">
                <label htmlFor="fieldText" className="form-label">{label}</label>
                <input type="text" className="form-control" id="fieldText" placeholder={placeholder} onChange={onChange} value={value} name={name}/>
            </div>
        </>
    );
}