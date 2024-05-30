import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../auth/authSlice'

function AdminProtected({ children }) {
    const user = useSelector(getCurrentUser)


    {
        if (!user) return <Navigate to='/signin' replace={true}></Navigate>
        if (user && user.role !== "admin") return <Navigate to='/' replace={true}></Navigate>

        return children
    }

}

export default AdminProtected