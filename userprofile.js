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
            postsData.forEach((posts)=>{
              let currentUser = usersMap[posts.UID]
             
              if(currentUser.userId === myId.uid){
                if (post_container) {
                  post_container.innerHTML += ` 
              <div class="  container w-75 my-5 py-1 rounded-3">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-column rounded-circle">
                       <div class="d-flex gap-2">
           ${usersData.imageUrl? `<img class="rounded-circle" style="width:50px; height:50px;" src=${user.imageUrl} alt=""></img>`:
    '<img class="rounded-circle" style="width:50px; height:50px;" src="assets/istockphoto-1327592449-612x612.jpg" alt=""></img>'
           }            
                        <p class="mt-2">${new Date(posts.created_at).toLocaleString() }<p>
                       </div>
                        <h5 class="mt-2">${currentUser.name}</h5>
                        
                    </div>
    
    ${currentUser.userId === myId.uid?`<div class="mt-4"><button onclick=deleteMyPost(${posts.id}) class= " btn btn-danger text-light"><i class="fa-solid fa-bucket"></i></button>
      </div>`:""}
                    
                </div>
                <hr>
                <div class="row px-2">
                ${posts.imageUrl!==null ? `<div class="col-12 col-md-6 h-75">
                        <div class=" d-flex justify-content-center">
                            <img class="w-100 h-100  rounded-4" src=${posts.imageUrl} alt="">
                        </div>
                    </div>
                    <div class="col-12 mt-3 mt-md-0 col-md-6 text-center text-content rounded-4 p-2">
                        <h3>RECIPE NAME</h3>
                         <hr>
                         <p>${posts.name}</p>
                          <hr>
                        <h3>INGREDIENTS</h3>
                         <hr>
                        <p>${posts.ingredients}</p>
                         <hr>
                        <h3>METHOD</h3>
                         <hr>
                        <p>${posts.methods}</p>
                    </div>`
                    :
                    `<div class="col-12  text-center text-content rounded-4 p-2">
                        <h3>RECIPE NAME</h3>
                         <hr>
                         <p>${posts.name}</p>
                          <hr>
                        <h3>INGREDIENTS</h3>
                         <hr>
                        <p>${posts.ingredients}</p>
                         <hr>
                        <h3>METHOD</h3>
                         <hr>
                        <p>${posts.methods}</p>
                    </div>` }
                   
                    
                </div>
                <div class="d-flex mt-3 mb-1 justify-content-center">
                    <div><button class="btn btn-danger border border-light" >❤ Add to Favorites</button>
    
                    </div>
                </div
            </div>`;
                }
            }
          }
            )
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
window.onload= window.getSession