'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import ProfileComponent from "@components/Profile"

const Profile = ({params}) => {

    const router = useRouter();
    const {id} = params;
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }

        const fetchUser = async() => {
          const response = await fetch(`/api/users/${id}`);
          const data = await response.json();

          setUser(data);
        }
    
        if(id){
            fetchPosts();
            fetchUser();
        }
        
    },[]);


  return (
    <ProfileComponent
    name="Looking"
    desc={user?.username && `You are looking ${user.username}'s profile`}
    data={posts}
    />
  )
}

export default Profile