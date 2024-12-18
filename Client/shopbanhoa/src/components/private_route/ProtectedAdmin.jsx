import { Navigate } from 'react-router-dom'

export const ProtectedAdmin = ({ isSignedIn, role, children }) => {
    if (!isSignedIn) {
        
        return <Navigate to="/login" replace />
    }

    if (role !== 1) {
        return <Navigate to="/" replace />
    }

    console.log(isSignedIn, role)

    return children
}
