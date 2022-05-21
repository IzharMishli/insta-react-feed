import React, {useState, useEffect} from "react";
import InstaImg from "./InstaImg";



export default function(props){

    const [posts, setPosts] = useState({
        isError: false,
        isLoaded: false,
        feeds: []
    })
  var url = "https://graph.instagram.com/me/media?fields=caption,media_count,media_type,permalink,media_url&&access_token=" + props.token;
    
    useEffect(function effectFunc() {
            fetch(url).then( res =>  res.json()).then(res => {
                if(!res.hasOwnProperty("error")) {
                    setPosts({
                        isError: false,
                        isLoaded: true,
                        feeds: res.data
                     });
                }
                else
                {
                    setPosts({
                        isError: true,
                        isLoaded: true
                     });
                    console.log("error...");
                }
               })
            }, []);
               
                
            console.log(posts);
            return (
                
                <div className="row insta-part">
                    <h1>{posts.feeds.length > 0 ? "" : "Loading"}</h1>
                    {posts.feeds.filter(post => String(post.caption).includes("ronchu") && (post.media_type=="IMAGE" || post.media_type=="CAROUSEL_ALBUM")).map(post => (
                        <InstaImg imgsrc={post.media_url} link={post.permalink}/>
                    ))}
                </div>
                );

        }
        
    
        
            

              
