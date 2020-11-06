import React, { useEffect, useState } from "react";
import style from "./test1.module.scss";
import { WifiOutlined, WomanOutlined,CaretRightOutlined } from '@ant-design/icons';

// import Image from 'next/image'

function newPage({ posts }) {
    const [music,setMusic] = useState(false);
    const [audioPlay,setAudioPlay] = useState("");
    useEffect( () => {
        if(music === true){
          var x = document.getElementById("myAudio");
          x.addEventListener("play", () => {
              var test12 = document.getElementById("test1_my_music__2lip_");
              test12.classList.add("abc");
              test12.setAttribute("style","animation-play-state : running;");
          })
          x.addEventListener("pause", () => {
              console.log("hehe");
              var test12 = document.getElementById("test1_my_music__2lip_");
              test12.setAttribute("style","animation-play-state : paused;");
          })
        }
    });
    const clickPlayMusic = (item) => {
      return (event) => {
        if(item.srcMusic !== undefined){
          setMusic(true);
          const x = document.getElementById("myAudio");
          const x2 = document.getElementById("toggle_img");
          x.setAttribute("src",item.srcMusic);
          x2.setAttribute("src", item.imgMusic)
        }
      }
    }
  return(
    <>
      {
        console.log("RENDER")
      }
      <div className={style.container}>
        <div className={style.all_box_music}>
            <div className={style.left_box_music}>
              <div id={style.my_music}>
                <img id="toggle_img" />
              </div>
              <div className={ music === true ? style.all_music : style.no_music }>
                <audio id="myAudio" autoPlay controls>
                    <source type="audio/ogg" />
                    <source  type="audio/mpeg" />
                </audio> 
              </div>
            </div>
            <div className={style.right_box_music}>
              <p style={{color : "#fff"}}>{audioPlay}</p>
              {
                posts.map((item,index) => {
                  return(
                          <div onClick={clickPlayMusic(item)} key={index} item={item} className={style.box_item_music}>
                            <div className={style.item_number_music}>
                              <h6>{item.id}</h6>
                            </div>
                            <div className={style.item_img_music}>
                              <img
                                src={item.imgMusic}
                              />
                              <div className={style.icon_hover_music}>
                                <CaretRightOutlined className={style.icon_hover} style={{color : "#fff", fontSize : 25}} />
                              </div>
                            </div>
                            <div className={style.item_content_music}>
                              <h4 className={style.title_music}>{item.title}</h4>
                              <p className={style.singer_music}>{item.singer}</p>
                            </div>
                            <div className={style.item_time_music}>
                              <span className={style.time_music}>{item.time}</span>
                            </div>
                            <div className={style.item_all_icon_music}>
                              <WifiOutlined style={{fontSize : 13, color : "#fff"}} />
                              <WifiOutlined style={{fontSize : 13, color : "#fff" , margin : "0px 20px"}} />
                              <WomanOutlined style={{fontSize : 13, color : "#fff"}} />
                            </div>
                          </div>
                  );
                })
              }
            </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps(next) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('http://localhost:8082/posts');
    console.log("res",res);
    const posts = await res.json();
  
    // By returning { props: posts }, the Blog component///dds
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
      // notFound : true,
      // redirect: {
      //   destination: '/',
      //   permanent: false
      // }
    }
}
// export async function getServerSideProps(next) {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch('http://localhost:8082/posts');
//   console.log("res",res);
//   const posts = await res.json();

//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   }
// }
export async function getStaticPaths() {
  return {
    paths: [
      { params: { index : '1' } } // See the "paths" section below
    ],
    fallback: false, // See the "fallback" section below
  };
}
export default newPage;
