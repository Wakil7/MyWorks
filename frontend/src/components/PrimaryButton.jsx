
export default function PrimaryButton({ children, type = "submit" }) {
    return (
        <button type={type} className="btn btn-primary w-100">
            {children}
        </button>
    );
}
