const repo_profile = document.querySelector(".repo_profile")

const scrollWindow =()=>{

    if (window.scrollY > 370 ){
        repo_profile.classList.add("repo_active")
    }
    else{
        repo_profile.classList.remove("repo_active")

    }
}
window.addEventListener('scroll', scrollWindow)