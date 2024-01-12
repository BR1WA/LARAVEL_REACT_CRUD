
'use client';

import { Table } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import axios from "axios";

const UsersTable = ()=> {
  const [users,setUsers] = useState([]);
  useEffect(()=>{
      const fetchUsers = async() => { try {
          const response = await axios.get('http://127.0.0.1:8000/api/user');
          setUsers(response.data.users);
          console.log(response);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchUsers();
    }, []);
  return (
    <div className="overflow-x-auto">
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
          {users.map((user)=>(
            
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {user.name}
            </Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.password}</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-red-600 hover:underline dark:text-red-500">
                Delete
              </a>
            </Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default UsersTable