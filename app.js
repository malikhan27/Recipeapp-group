


async function userinfoGet() {
  localStorage.clear
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      console.log(user)
   
      try {
        const { data : userdata, error } = await supabase
      .from('users')
      .select('name,email,id')
      .eq('userId', user.id) 
    
    if(error) throw error
    
      if(userdata){
      let currentuserinfo = {
      uid: user.id,
      name:userdata[0].name,
      email: userdata[0].email,
    };
    
    localStorage.setItem("currentuserinfo",JSON.stringify(currentuserinfo));
    }
        
      } 
      catch (error) {
        
      }
    
    }



    
    }

 




  
  catch (error) {
    console.log(error);
  }





}

async function checkSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (data) {
      console.log(data)
      
    }
    const authPages = ["/index.html", "/login.html", "/signup.html", "/"];
    const currentPath = window.location.pathname;
    const isAuthPage = authPages.some((page) => page.includes(currentPath));

    const { session } = data;

    if (session) {
      if (isAuthPage) {
        window.location.href = "/dashboard.html";
      }
    } else {
      if (!isAuthPage) {
        window.location.href = "/login.html";
      }
    }

    console.log(session);
  } catch (error) {
    console.log(error);
  }
}

window.getSession= checkSession
window.userinfoGet=userinfoGet



window.onload= getSession
window.onload= userinfoGet()

console.log(getSession)