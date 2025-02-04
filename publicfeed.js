let post_container = document.getElementById("feed-container")
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
            let userpost = false
            postsData.forEach((posts)=>{
                console.log(posts.UID)
              let currentUser = usersMap[posts.UID]
              console.log(currentUser.userId)
             
              if(currentUser.userId === myId.uid){
                userpost = true}

            if (post_container){
                post_container.innerHTML+= 
                ` <div class="card post mb-3">
                <div class="card-body">
                 <div class="d-flex align-items-center justify-content-between mb-3">
                    <div>
                    <img src=${posts.imageUrl} alt="User Avatar"
                    class="rounded-circle me-2" width="40" height="40">
                     <h5 class="card-title mb-0">${currentUser.name}</h5>
                    </div>
            ${userpost  ? `<div><button onclick=deleteMyPost(${posts.id})>DELETE</button>
                </div>`: ""}
                                </div>
                                <hr>
                                <div>
                                <p class="card-text">${posts.name}</p>
                                <p class="card-text">${posts.ingredients}</p>
                                <p class="card-text">${posts.methods}</p>
                                </div>
                                

          ${posts.imageUrl!=null? `<div>
                                     <img src=${posts.imageUrl} alt="Recipe Image"
                                        class="card-img-top recipe-image mb-3"></div>` :""}
             ${!userpost?`<div class="ms-2 mb-1"> 
                                <button class="btn d-flex  btn-danger favorite-button"> ❤ Add to Favorites</button>
                            </div>`:""}               
                        </div>`
                
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