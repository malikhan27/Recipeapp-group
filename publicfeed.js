let post_container = document.getElementById ('feed-container');
let username = document.getElementById ('username');
let currentuserid
let favoritesbtn=document.getElementById("Favourites")
async function loadPosts () {
  try {
    const {data: postsData, error: postsError} = await supabase
      .from ('posts')
      .select ('');
    if (postsError) throw postsError;
    if (postsData) {
      try {
        const {data: usersData, usersError} = await supabase
          .from ('users')
          .select ('');
        if (usersError) throw usersError;
        if (usersData) {
          let usersMap = {};
          usersData.forEach (user => {
            usersMap[user.userId] = user;
          });

          var myId = JSON.parse (localStorage.getItem ('currentuserinfo'));
          currentuserid= myId.uid;
          if (username) {
            username.innerHTML = myId.name;
          }
          
          postsData.forEach (posts => {
            let currentUser = usersMap[posts.UID];
         if (post_container) {
          post_container.innerHTML=""
              post_container.innerHTML += ` 
               <div class="text-center"><h1>Public Feed</h1><div>
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

${currentUser.userId === myId.uid?`<div class="mt-4"><button onclick=deleteMyPost(${posts.id}) class= " btn btn-danger border border-light text-light"><i class="fa-solid fa-bucket"></i></button>
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
                <div>
                <button class="btn btn-danger border border-light" onclick=addtofavorites(${posts.id})>❤ Add to Favorites</button>
                </div>
            </div
        </div>`;
            }
          });
        }
      } catch (error) {
        console.log (error);
      }
    }
  } catch (error) {
    console.log (error);
  }
}


async function deleteMyPost(postId) {
  try {
    Swal.fire({
      title: "Are you sure want to delete the post",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async(result) => {
      if (result.isConfirmed) {
        const { data:postdeletedata, error:postdeleteerror } = await supabase
          .from("posts")
          .delete()
          .eq("id", postId)
          .select();

        if (postdeleteerror) throw postdeleteerror;
      

        if(postdeletedata){
          post_container.innerHTML=""
          loadPosts()
          loadFavourites()
          Swal.fire({
            icon: 'success' ,
            title: 'Post Deleted Succesfully '
          })

          
        }
        
       

      }
    });
  } catch (error) {
    console.log(error);
  }
   
      

    
  }


  async function addtofavorites(Postid) {
    try {
      const { data: Favoritesdata, error: FavoritesError } = await supabase
            .from("Favorites")
            .insert({
              post_Id:Postid,
              user_Id:currentuserid,
           
            })
            .select();
            if(FavoritesError) throw FavoritesError

            if(Favoritesdata){
              console.log(Favoritesdata
              )
            }
      
    } catch (error) {
      console.log(error)
    }
    
  }

async function loadFavourites(){
  try {
    const {data: postsData, error: postsError} = await supabase
      .from ('posts')
      .select ('');
    if (postsError) throw postsError;
    if (postsData) {
      try {
        const {data: FavoritesData, FavoritesError} = await supabase
          .from ('Favorites')
          .select ('');
        if (FavoritesError) throw FavoritesError;
        if (FavoritesData) {
          let favoritessMap = {};
          FavoritesData.forEach (favorites => {
            favoritessMap[favorites.post_Id] = favorites;
            console.log(favoritessMap)
          });

          var myId = JSON.parse (localStorage.getItem ('currentuserinfo'));
          if (username) {
            username.innerHTML = myId.name;
          }
          
          postsData.forEach (posts => {
            let currentUser = favoritessMap[posts.id];
          
            
            if(currentUser.user_Id===myId.uid){
            
              if (post_container) {
                              post_container.innerHTML = ` 
                              <div class="text-center"><h1>MY FAVOURITES</h1><div>
                          <div class="  container w-75 my-5 py-1 rounded-3">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-column rounded-circle">
                                   <div class="d-flex gap-2">
                       <img class="rounded-circle" style="width:50px; height:50px;" src= alt=""></img>           
                                    <p class="mt-2">${new Date(posts.created_at).toLocaleString() }<p>
                                   </div>
                                    <h5 class="mt-2">${myId.name}</h5>
                                    
                                </div>
                
               <div class="mt-4"><button onclick=deleteMyPost(${posts.id}) class= " btn btn-danger border border-light text-light"><i class="fa-solid fa-bucket"></i></button>
                  </div>
                                
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
                        </div>
                        <div class="my-2"><button onclick="loadPosts()" class="btn btn-outline-dark">Back</button></div>`;
                            }
            
            }
      
          });
        }
      } catch (error) {
        console.log (error);
      }
    }
  } catch (error) {
    console.log (error);
  }
}

favoritesbtn.addEventListener("click",loadFavourites)

window.deleteMyPost = deleteMyPost;
window.addtofavorites= addtofavorites;
window.loadPosts=loadPosts
window.onload = loadPosts();
window.onload = window.getSession;

