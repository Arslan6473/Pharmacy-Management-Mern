import React from 'react'
import Sidebar from '../features/sidebar/Sidebar'
import User from '../features/user/User'

function UserPage() {
    return (
        <>
            <Sidebar>
                <User />
            </Sidebar>
        </>
    )
}

export default UserPage