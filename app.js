window.onload=checkSession
let currentuserinfo={
    uid:data.user.id,
    email:data.user.email,
  }
  localStorage.setItem("currentuserino",)


async function userinfoGet(params) {
    try {
        const { data: { user } } = await supabase.auth.getUser()

        if(user){
            console.log(user)
        }
    } 
    catch (error) {
        
    }

    
}
























  async function checkSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (data) {
        console.log(data);
      }
      const authPages = ["/index.html", "/login.html", "/"];
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

  window.checkSession = checkSession;