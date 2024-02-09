/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import { Table, TableBody, TableCell} from 'flowbite-react'
import {Link} from 'react-router-dom'
export default function DashPosts() {
  const {currentUser} = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);
  useEffect ( () =>{
    const fetchPost = async () => {
      try{
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if(res.ok){
          setUserPosts(data.posts);
        }
        
      }catch(error){
        console.log(error.message);
      }
    };
    if(currentUser.isAdmin){
      fetchPost();
    }
  }, [currentUser._id, currentUser.isAdmin] );
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <TableBody key={post._id} className="divide-y ">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post._id}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-20 w-20 object-cover bg-gray-500"
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/post/${post.slug}`}
                      className="font-medium text-gray-500 dark:text-white"
                    >
                      {post.title}{" "}
                    </Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <span className="text-red-600 font-medium hover:underline cursor-pointer">
                      Delete
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/update-post/${post._id}`}
                      className="text-teal-500 hover:underline"
                    >
                      <span>Edit</span>
                    </Link>
                  </TableCell>
                </Table.Row>
              </TableBody>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no post yet.</p>
      )}
    </div>
  );
}
