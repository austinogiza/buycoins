const formInput = document.querySelector('.formInput')
const formSubmit = document.querySelector('.formSubmit')
const profileResult = document.querySelector('.profileResult')
const outputResult = document.querySelector('.outputResult')



const userInput = e=>{
  const formValue = e.target.value


  if(formValue!== ""){
    console.log(formValue)
  }

  
}
formInput.addEventListener('keyup', userInput)
const handleFn =e=>{
  e.preventDefault()
  console.log()

  
const github= {
  "token": "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",
  "username": "austinogiza"
}
const baseUrl = 'https://api.github.com/graphql'

const getUserRepo = {
  "query":`
  query { 
      user(login:"${formInput.value}"){
        avatarUrl,
        name,
        login,
        bio,
        bioHTML,
        status {
          id,
          message,
          emoji,
          emojiHTML,
        },
        repositories(first: 20, orderBy:{field: UPDATED_AT, direction: DESC}) {
          edges {
            node {
              id, 
              name,
              url,
            description,
              forkCount,
              stargazerCount,
              labels {
                edges {
                  node {
                    id
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
  Authorization: "bearer " + github.token
}


fetch(baseUrl, {
method: "POST",
headers: headers,
body: JSON.stringify(getUserRepo)
})
.then(res=>{
  const info = res.json()
  .then(res=>{

    profileResult.innerHTML =`
    <div class="profile_image">
<img src="${res.data.user.avatarUrl}" alt="">

${res.data.user && res.data.user.status.emoji === null && `<div class="symbol">${res.data.user.status.emoji}<h1>${res.data.user.status.message}</h1></div>`} 
</div>
<div class="name">
    <h1>${res.data.user.name}</h1>
    <h3>${res.data.user.login}</h3>
    <p>${res.data.user.bio}</p>
</div>
    `

    let result;
  res.data.user.repositories.edges.forEach(function(repo){
result +=`
<div class="repo_details">
<div class="repo_text">
    <div class="repo_name">
        <a href="${repo.node.url}">${repo.node.name}</a>
        ${repo.node.description && `<p>${repo.node.description}</p>`}    
    </div>
    <div class="repo_label">
       <ul>
           <a href="#"><li>ruby</li></a>
           <a href="#"><li>rails</li></a>
           <a href="#"><li>docker</li></a>
           <a href="#"><li>ruby</li></a>
           <a href="#"><li>rails</li></a>
           <a href="#"><li>docker</li></a>
       </ul>
    </div>
    <div class="repo_star">
        <div class="repo_color">
            <span class="color_type"><span class="bg_color"></span> Ruby</span>
            <div class="star_count">
                <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                2
            </div>
            <div class="fork_count">
                <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                16
            </div>
            <div class="updated_time">
                Update <h1>yesterday</h1>
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
      

    })

    outputResult.innerHTML = result;
    // outputResult.forEach()
    console.log(res)
    console.log(res.data.user)
    console.log(res.data.user)
    console.log()
    console.log(res.data.user.repositories.edges)
  })
    // console.log(res.json())
})

  
}
formSubmit.addEventListener('submit', handleFn)

