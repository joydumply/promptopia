'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import ProfileComponent from "@components/Profile"

const Profile = () => {

    const router = useRouter();

    const {data : session} = useSession();

    const [posts, setPosts] = useState([])

    useEffect(() => {
        if(!session?.user.id){
            router.push('/');
        }
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }
    
        if(session?.user.id){
            fetchPosts();
        }
        
    },[]);

    const handlEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p)=>{
                    p._id !== post._id
                })

                setPosts(filteredPosts);

            } catch (error) {
                
            }
        }
    }

  return (
    <ProfileComponent
    name="My"
    desc="Welcome to your personalized profile page"
    data={posts}
    handleEdit={handlEdit}
    handleDelete={handleDelete}
    />
  )
}

export default Profile