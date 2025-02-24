import { useSnackbar } from "../../contexts/SnackBarContext"

const SnackBar = () => {
    const { isShowing, status, message } = useSnackbar()
    return (
        isShowing ? <div className={`${isShowing ? "show" : ""} ${status === 0 ? "bg-green-500" : status === 1 ? "bg-amber-500" : "bg-red-500"} fixed bottom-0 left-0 m-4 rounded-lg p-4 text-white text-center`}>
            <span>
                {message}
            </span>
        </div>
            : null
    )
}

export default SnackBar