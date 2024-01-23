
'use client';

import { Table } from 'flowbite-react';
import React, { useState, useEffect,  } from 'react';
import axios from "axios";
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';

const UsersTable = ({toast , setToast}) => {
  const [users,setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [submitValue, setSubmitValue] = useState('Add');
  const [userId, setUserId] = useState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    id : '',
  });

    //READ
      const fetchUsers = async() => { try {
          const response = await axios.get('http://127.0.0.1:8000/api/user');
          setUsers(response.data.users);
          console.log(response);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      useEffect(()=>{
        fetchUsers();
      },[])

    //DELETE
    const deleteUser = async(uID) => { try{
      const response = await axios.delete(`http://127.0.0.1:8000/api/user/${uID}`);
      console.log(response);
      fetchUsers();
      }catch(error){
        console.error('Error deleting user',error);
      }finally{
        setIsLoading(false);
      }
    }

    //CREATE & UPDATE
    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(e)
      try{
        if(submitValue=="Add") {
          const response = await axios.post(`http://127.0.0.1:8000/api/user`,formData)
          console.log(response.data.message);
        }else{
          const response = await axios.put(`http://127.0.0.1:8000/api/user/${userId}`,formData)
        }
        fetchUsers();
      }catch{
        console.error(response);
      }finally{
        setOpenModal(false);
        // setToast({
        //   ...toast,
        //   display: true,
        //   message: response.message
        // });
        setFormData({
          ...formData,
          name : '',
          email : '',
          password : '',
        })
      }
    }

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }

    //EDIT
    function editUser(user) {
      setOpenModal(true);
      setSubmitValue('Update');
      setFormData({
        ...formData,
        name : user.name,
        email : user.email,
        password : user.password,
      });
      setUserId(user.id);
    }
  return (
    <div className="overflow-x-auto">
    
      <Button onClick={() => {setOpenModal(true);setSubmitValue('Add')}}>Add User</Button>
      <Modal show={openModal} size="md" popup onClose={() => {setOpenModal(false);setSubmitValue('Add');}}>
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{submitValue} User</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your name" />
              </div>
              <TextInput id="name" name='name' placeholder="John" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput id="email" name='email' placeholder="john@gmail.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" name='password' placeholder='john1234' value={formData.password} onChange={handleChange} required />
            </div>
            <div className="w-full">
              <Button type='submit'>{submitValue}</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>User name</Table.HeadCell>
          <Table.HeadCell>email</Table.HeadCell>
          <Table.HeadCell>password</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">delete</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          { users.map((user)=>(
            
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={user.id}>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.name}
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.password}</Table.Cell>
              <Table.Cell>
                <span className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer" onClick={()=>editUser(user)}>
                  Edit
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="font-medium text-red-600 hover:underline dark:text-red-500 cursor-pointer" onClick={()=>deleteUser(user.id)}>
                  Delete
                </span>
              </Table.Cell>
            </Table.Row>
            )
          )
          }
        </Table.Body>
      </Table>
    </div>
  );
}

export default UsersTable