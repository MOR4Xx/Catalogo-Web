

export default function Modal({onClose, title, children, className}) {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 backdrop-blur-sm bg-black/50" onClick={onClose}></div>
            <div className={`${"relative bg-white rounded-2xl w-full max-w-lg p-6 z-10 modal-in "} ${className}`}>
                <h2 className="text-xl font-semibold mb-3">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
}