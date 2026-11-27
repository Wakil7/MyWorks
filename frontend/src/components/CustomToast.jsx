
import { createContext, useContext, useState, useCallback, useEffect } from "react";

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = "success") => {
        setToast({
            message,
            type,
            id: Date.now()
        });
    }, []);

    const closeToast = useCallback(() => {
        setToast(null);
    }, []);

    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [toast]);

    const icons = {
        success: "✓",
        error: "✕",
        warning: "!",
        info: "i"
    };

    const titles = {
        success: "Success",
        error: "Error",
        warning: "Warning",
        info: "Information"
    };

    const colors = {
    success: "success",
    error: "danger",
    warning: "warning",
    info: "info"
};

    return (
        <ToastContext.Provider value={showToast}>
            {children}

            {toast && (
                <div
                    className="toast-container position-fixed top-0 end-0 p-3"
                    style={{ zIndex: 1100 }}
                >
                    <div className="toast show border-0 shadow">
                        <div className="toast-body d-flex align-items-center gap-3 p-3">

                            <div
                                className={`rounded-circle bg-${colors[toast.type]} text-white d-flex align-items-center justify-content-center`}
                                style={{
                                    width: "38px",
                                    height: "38px",
                                    fontSize: "20px",
                                    flexShrink: 0
                                }}
                            >
                                {icons[toast.type]}
                            </div>

                            <div className="flex-grow-1">
                                <div className="fw-semibold mb-1">
                                    {titles[toast.type]}
                                </div>

                                <div className="text-secondary small">
                                    {toast.message}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeToast}
                                aria-label="Close"
                            />
                        </div>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}
