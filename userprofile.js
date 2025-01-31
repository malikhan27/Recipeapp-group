let post_container = document.getElementById("posts-container")
let username= document.getElementById("username") 
async function loadPosts(){
  try {
    const {data: postsData, error: postsError} = await supabase
    .from("posts")
    .select("")
    if(postsError) throw postsError
    if(postsData){
      try {
          const {data: usersData , usersError} = await supabase
          .from("users")
          .select("")
          if(usersError) throw usersError
          if(usersData){
            let usersMap = {};
            usersData.forEach((user)=>{
              usersMap[user.userId] = user
            })
            
            var myId = JSON.parse(localStorage.getItem('currentuserinfo'))
            if(username){
            username.innerHTML=myId.name}
            console.log(myId)
            let myPost = false
            postsData.forEach((posts)=>{
              let currentUser = usersMap[posts.UID]
              if(currentUser.userId === myId.uid){
                myPost = true
                console.log(posts)
                if (post_container){
                post_container.innerHTML+= 
                `<div class="card w-100 my-2">
                                    <div class="card-header d-flex gap-2 align-items-start">
                                        <div>
                                            <img class="mt-1" src= width="50" height="50" bor
                                                alt="">
                                        </div>
                                        <div class="d-flex flex-column ">
                                            <h5 class="card-title p-0 m-0" id="userName">${currentUser.name}
                                            </h5>
                                            <small> 29-01-2025 </small>
                                        </div> 
                         ${myPost? `<button onclick="deleteMyPost(${posts.id})" >Delete </button> `
                                : ""}     
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">
                                         ${posts.name}
                                        </p>
                                    <p class="card-text">
                                        ${posts.ingredients}
                                        </p>
                                         <p class="card-text">
                                         ${posts.methods}
                                        </p>
                                       
                                        

                     ${posts.imageUrl!=null? `<img style="width: 100%; "
                        src=${posts.imageUrl}`:""}                  
                                    </div>
                                </div>`
                
              }
            }
            })
          }
      } catch (error) {
       console.log(error) 
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function deleteMyPost(postId) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .select();
  
      if (error) throw error;
  
      if (data) {
        post_container.innerHTML = "";
      }
    } catch (error) {
      console.log(error);
    }
    finally{
        loadPosts();
    }
  }
  
  window.deleteMyPost = deleteMyPost;
  

window.onload = loadPosts()