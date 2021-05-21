const repo_profile = document.querySelector(".repo_profile")

const scrollWindow =()=>{

    if (window.scrollY > 370 ){
        repo_profile.classList.add("repo_active")
    }
    else{
        repo_profile.classList.remove("repo_active")

    }
}

const symbolStatus = document.querySelector(".symbol")
const symbolStatusText = document.querySelector(".symbol h1")

const hoverFn = ()=>{
        symbolStatus.classList.add("active_status")
        symbolStatusText.classList.add("status_h1")
    }
const hoverLeave = ()=>{
        symbolStatus.classList.add("active_status")
        symbolStatusText.classList.remove("status_h1")
    }

symbolStatus.addEventListener('mouseenter', hoverFn)
symbolStatus.addEventListener('mouseleave', hoverLeave)
window.addEventListener('scroll', scrollWindow)


const fetch = require("node-fetch")

