
function Brand({ compact = false }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                <svg
                    viewBox="0 0 48 48"
                    className="h-8 w-8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Vaultify shield and keyhole logo"
                    role="img"
                >
                    <path
                        d="M24 4L40 10V21C40 32 33 40 24 44C15 40 8 32 8 21V10L24 4Z"
                        stroke="white"
                        strokeWidth="2.8"
                        strokeLinejoin="round"
                    />
                    <circle cx="24" cy="20" r="4" fill="white" />
                    <path
                        d="M22 23H26L28 33H20L22 23Z"
                        fill="white"
                    />
                </svg>
            </div>

            {!compact && (
                <span className="text-2xl font-bold tracking-tight text-slate-800">
                    Vaultify
                </span>
            )}
        </div>
    );
}

export default Brand;
