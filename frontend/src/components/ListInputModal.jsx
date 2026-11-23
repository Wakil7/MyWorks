import TextInput from './TextInput';

const ListInputModal = ({ isOpen, title, onConfirm, onCancel, inputOnChange, inputValue }) => {
    if (!isOpen) return null;

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onCancel}
                        />
                    </div>

                    <div className="modal-body">
                        <TextInput
                            label="Name"
                            placeholder="Type list name here..."
                            name="name"
                            onChange={inputOnChange}
                            value={inputValue}
                        ></TextInput>
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >
                            Done
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ListInputModal;