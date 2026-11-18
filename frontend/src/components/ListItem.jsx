
export default function ListItem({ number, name, onEdit, onDelete }) {
    return (
        <div className="list-item d-flex align-items-center justify-content-between">

            <div className="d-flex align-items-center gap-4">
                <span className="list-number">{number}.</span>
                <span className="list-name">{name}</span>
            </div>

            <div className="d-flex align-items-center gap-3">

                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={onEdit}
                    title="Edit List"
                >
                    <i className="bi bi-pencil-square"></i>
                </button>

                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={onDelete}
                    title="Delete List"
                >
                    <i className="bi bi-trash"></i>
                </button>

            </div>

        </div>
    );
}
