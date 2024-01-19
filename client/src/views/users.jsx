import { Button } from 'flowbite-react';
import { UsersTable, ToastReponse } from '../components';
import { DarkThemeToggle, Flowbite, Toast } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { HiCheck } from 'react-icons/hi';

const Users = () => {
    const [toast,setToast] = useState({
      display : false,
      message : 'no message yet',
    });
    return(
        //<Flowbite>

            <div className="h-screen p-5 flex flex-col items-center justify-center dark:bg-slate-900 bg-white">
                {toast.display ? <ToastReponse message={toast.message}/> : null}
            {/* <DarkThemeToggle/> */}
                <UsersTable toast={toast} setToast={setToast}></UsersTable>
            </div>

        //</Flowbite>
    )
}

export default Users;