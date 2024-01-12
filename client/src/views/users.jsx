import { Button } from 'flowbite-react';
import { UsersTable } from '../components';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import React, { useState, useEffect } from 'react';

const Users = () => {
    return(
        //<Flowbite>

            <div className="h-screen flex items-center justify-center dark:bg-slate-900 bg-white">
            {/* <DarkThemeToggle/> */}
                <UsersTable></UsersTable>
            </div>

        //</Flowbite>
    )
}

export default Users;