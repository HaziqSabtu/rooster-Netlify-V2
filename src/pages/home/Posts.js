import React from "react";
import { getPost } from "../../client/query";
import { useState, useEffect } from "react";
import { client } from "../../client/client";
import Post from "./Post";

import axios from "axios";
import { getAllPosts } from "../../services/postApi";

const Posts = ({ count, setCount }) => {
    const [query, setQuery] = useState([]);

    useEffect(() => {
        (async () => {
            await axios(getAllPosts())
                .then((response) => {
                    setQuery(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        })();
    }, [count]);
    const generatePost = query?.map((post) => {
        return <Post key={post._id} post={post} setCount={setCount} />;
    });

    return <div className='mt-3 flex flex-col'>{generatePost}</div>;
};

export default Posts;
