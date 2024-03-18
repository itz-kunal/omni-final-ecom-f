
export const checkLogin = (router)=>{
    const user = localStorage.getItem('user');
    if(!user){
        router.push('/auth/login')
    }
}

export const ifLoggedIn = (router)=>{
    const user = localStorage.getItem('user');

    if(user){
        router.push('/account')
    }
}
