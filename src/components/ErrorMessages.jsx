/* eslint-disable react/prop-types */
export const ErrorMessages = ({message}) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative mt-3" role="alert">
            <strong className="font-bold">Hey! </strong>
            <span className="block sm:inline">{message}</span>
        </div>
    )
}
