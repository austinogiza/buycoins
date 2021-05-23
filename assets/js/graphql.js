

const ghi = "ghp_"

const thi = "QyzLwRln5R25v"

const endi = "T0Dqq2JHgM4RL813U3r6S6h"

//target all properties

const profileResult = document.querySelector('.profile')
const formSubmitGQ = document.querySelector('.formSubmit')
const outputResult = document.querySelector('.repo_update')
const no_repo = document.querySelector('.no_repo')
const repo_profile = document.querySelector(".repo_profile")
const repo_number = document.querySelector(".number")
const repo_number_mobile = document.querySelector(".mobile_header_cover .number")
const profile_nav_photo= document.querySelector(".profile_nav_photo")
const pageLoader = document.querySelector(".pageloader")
const repo_count = document.querySelector(".repo_count")



const units = [
	{ name: ' second', value: 1000, max: 50, single: 'a second' },
	{ name: ' minute', value: 60000, max: 50, single: 'a minute' },
	{ name: ' hour', value: 3600000, max: 22, single: 'an hour' },
	{ name: ' day', value: 86400000, max: 6, single: 'a day' },
	{ name: ' week', value: 604800000, max: 3.5, single: 'a week' },
	{ name: ' month', value: 2592000000, max: 11, single: 'a month' },
	{ name: ' year', value: 31536000000, max: Infinity, single: 'a year' }
];

const format = date => {
	let diff = Date.now() - date.getTime();

	const future = diff < 0;
	diff = Math.abs(diff);

	if (!future && diff < 10000) return 'just now';
	if (future && diff < 5000) return 'any second';

	const suffix = future ? ' from now' : ' ago';

	for (let i = 0; i < units.length; i++) {
		const unit = units[i];

		if (diff <= unit.max * unit.value) {
			const t = Math.round(diff / unit.value);
			return t === 1 ? unit.single + suffix : t + unit.name + 's' + suffix;
		}
	}
};




const formFn =e=>{
  e.preventDefault();
  }

formSubmitGQ.addEventListener('submit', formFn)

const fetchStorage =()=>{

  if(localStorage.getItem("austinOgiza") || sessionStorage.getItem("austinOgiza")){
  const formValue = localStorage.getItem("austinOgiza") || sessionStorage.getItem("austinOgiza")
      
const baseUrl = 'https://api.github.com/graphql'


//graphql query
const getUserRepo = {
  "query":`
  query { 
    user(login: "${formValue}"){
      avatarUrl,
      bio,
      name,
      login,
      bioHTML,
      status {
        id,
        message,
        emoji,
        emojiHTML,
        
      },
      repositories(first: 20, privacy: PUBLIC, orderBy:{field: UPDATED_AT, direction: DESC}) {
        totalCount,
  
        edges {
          node {
            id, 
            name,
            nameWithOwner,
            url,
          description,
            forkCount,
    isFork,
          parent{
            name,
            url,
            nameWithOwner
          },
            licenseInfo {
              id, name
            },
           
            stargazerCount,
            labels {
              edges {
                node {
                  id
                }
              }
            }, 
  repositoryTopics(first: 7){
     nodes {
              topic {
                name
              }
            }
  },
            primaryLanguage {
              id,
              color,
              name
            },
            updatedAt
          }
        }
      }
    }
  }
  `
  
}


const headers ={
  "Content-Type": "application/json",
  Authorization: "bearer " + `${ghi}${thi}${endi}`
}

//api fetch
fetch(baseUrl, {
method: "POST",
headers: headers,
body: JSON.stringify(getUserRepo)
})
.then(res=>{
  const info = res.json()
  .then(res=>{

  
//profile details input

repo_number.innerHTML = `${res.data.user.repositories.totalCount}`

repo_profile.innerHTML = `${res.data.user.repositories.edges.length === 0 ? `
<div class="no_repo">
${res.data.user.login} doesn’t have any public repositories yet.
</div>
` :""}`

repo_number_mobile.innerHTML = `${res.data.user.repositories.totalCount}`

repo_count.innerHTML = `
<h1>${res.data.user.repositories.totalCount}</h1> results for <span>public</span> repositories
`
    repo_profile.innerHTML = `
    <img src="${res.data.user.avatarUrl}" alt="${res.data.user.name}"> <h1>${res.data.user.name}</h1>
    `
    profileResult.innerHTML =`
<div class='details_group'>
<div class="profile_image">
<img src="${res.data.user.avatarUrl}" alt="${res.data.user.name}">
${res.data.user.status !== null ? 
`<div class="symbol">

<div class="emoji">${res.data.user.status.emojiHTML !== null ? res.data.user.status.emojiHTML : ""} </div>

<h1>${res.data.user.status.message}</h1></div>`
:""}

</div>
<div class="name">
${res.data.user.name !== null ? `<h1>${res.data.user.name}</h1>`:""}  
    <h3>${res.data.user.login}</h3>
    ${res.data.user.bio !== null ? `<p>${res.data.user.bio}</p>`:""} 
</div>
</div>

<div class="profile_mobile">
${res.data.user.status !== null ? `
<div class="mobile_emoji">
${res.data.user.status.emojiHTML !== null ? res.data.user.status.emojiHTML : ""} 
<h1>${res.data.user.status.message}</h1>
</div>
` : ""}

<div class="mobile_text">
${res.data.user.bio}
</div>
</div>

    `
    profile_nav_photo.innerHTML = `
    <img src="${res.data.user.avatarUrl}" alt="">
    `

 

  // let result;
  {res.data.user.repositories.edges?.map(repo => {

    outputResult.innerHTML +=`
    <div class="repo_details">
    <div class="repo_text">
        <div class="repo_name">
            <a href="${repo.node.url}" target="_blank">${repo.node.name}</a>
    
           ${repo.node.isFork === true ? `<div class="forked_true">
           Forked from  ${repo.node.parent !== null ? ` <a href="${repo.node.parent.url}">  ${repo.node.parent.name}</a></div>` : "" }
          
           `: ""}
            ${repo.node.description !== null ? `<p>${repo.node.description}</p>`: ""}    
        </div>
    
        ${repo.node.repositoryTopics.nodes.length > 0 ? `
        <div class="repo_label">
      
        <ul>
        ${repo.node.repositoryTopics.nodes.map((name)=> {return `<a href="#"><li>${name.topic.name}</li></a>`}
)
      }
        </ul>
     </div>`:""} 
      
        <div class="repo_star">
            <div class="repo_color">
         
               <span class="color_type">
               ${repo.node.primaryLanguage !== null ? 
               `<span class="bg_color"  style="background: ${repo.node.primaryLanguage.color} !important;"></span>${repo.node.primaryLanguage.name}</span>`
                :
              ""}
              
                <div class="star_count">
                    <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                    ${repo.node.stargazerCount}
                </div>
                <div class="fork_count">
                    <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                    ${repo.node.forkCount}
                </div>
                ${repo.node.licenseInfo !== null ?
                `
                <div class="licence_info">
            <svg class="octicon octicon-law mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg>
            ${repo.node.licenseInfo.name}
        </div>
                `
                :""}
                <div class="updated_time">
                    Update <h1>${format(new Date(repo.node.updatedAt))} </h1>
                </div>
            </div>
        </div>
       
    </div>
    <div class="repo_graph">
        <span class="star_repo_icon">
            <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>Star
        </span>
    </div>
    
    </div>
    
    `
          
    
      
  })}

  pageLoader.classList.add('pageloader_hide')
    // outputResult.forEach()

    setTimeout(()=>{

      pageLoader.style.display = "none"
    }, 25000)
    console.log(res)
    console.log(res.data.user)
    console.log(res.data.user)
    console.log()
    console.log(res.data.user.repositories.edges)
  })
    // console.log(res.json())
})

  

  }
 
  
};


window.addEventListener('load', fetchStorage)

//scroll reveal small profile


const scrollWindow =()=>{

    if (window.scrollY > 370 ){
        repo_profile.classList.add("repo_active")
    }
    else{
        repo_profile.classList.remove("repo_active")

    }
}
window.addEventListener('scroll', scrollWindow)


setTimeout(()=>{

  pageLoader.style.display = "none"
}, 25000)





