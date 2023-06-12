'use client';

import { useState, useEffect } from "react";

import PromptCardList from "./PromptCardList";



const Feed = () => {

  const [searchText, setSearchText] = useState('');
  
  const [originalPosts, setOriginalPosts] = useState([])
  const [posts, setPosts] = useState([]);


  const searchEvent = (value) => {
    if(value){
      const filteredPosts = posts.filter((item) => {
        const { creator, prompt, tag } = item;
        const lowerCaseQuery = value.toLowerCase();
        return (
          prompt.toLowerCase().includes(lowerCaseQuery) ||
          tag.toLowerCase().includes(lowerCaseQuery) || 
          creator.username.toLowerCase().includes(lowerCaseQuery) ||
          creator.email.toLowerCase().includes(lowerCaseQuery)
        );
      });
      setPosts(filteredPosts);
    }
  }

  const handleSearchChange = (e) =>{
    e.preventDefault();
    const value = e.target.value;
    setSearchText(value);
    if(value != ''){
      searchEvent(value);
    }else{
      setPosts(originalPosts);
    }
  }

  const handleTagClick = (tag) => {
    if(tag){
      setSearchText(tag);
      searchEvent(tag);
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setOriginalPosts(data);
    }

    fetchPosts();

  },[]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text"
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        className="search_input peer"
        />
      </form>

      <PromptCardList 
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed;