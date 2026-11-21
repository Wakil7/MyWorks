export default function TextInput({label, placeholder, onChange, value}) {
    return (
        <>
            <div className="form-field">
                <label htmlFor="fieldText" className="form-label">{label}</label>
                <input type="text" className="form-control" id="fieldText" placeholder={placeholder} onChange={onChange} value={value}/>
            </div>
        </>
    );
}