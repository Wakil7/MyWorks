
export default function PrimaryButton({ children, onClick, type = "button" }) {
    return (
        <button type={type} className="btn btn-primary w-100" onClick={onClick}>
            {children}
        </button>
    );
}
