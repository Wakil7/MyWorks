const TaskDisplayModal = ({ isOpen, taskData, onCancel}) => {
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
                        <h5 className="modal-title">Task</h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onCancel}
                        />
                    </div>

                    <div className="modal-body">
                        {taskData.name}
                    </div>

                    <div className="modal-body">
                        <p>{taskData.description}</p>
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Done
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TaskDisplayModal;