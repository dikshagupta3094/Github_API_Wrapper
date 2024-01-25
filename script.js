let name = document.getElementById("name");
let serach_btn = document.getElementById("search-btn");
let repos = document.getElementById("card");
serach_btn.addEventListener("click", () => {
  let username = name.value;
  let main = document.querySelector("#main");
  let response = fetch(`https://api.github.com/users/${username}`);
  response
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      let card = `  <div class="github-box">
    <div class="avatar-img">
        <img src="${data.avatar_url}" alt="">
    </div>
    <div class="user-info">
        <h2>${data.name}</h2>
        <p>${data.bio}</p>
        <ul class="info">
            <li> ${data.following} <strong>following </strong></li>
            <li> ${data.followers} <strong>followers</strong></li>
            <li>${data.public_repos} <strong>repos</strong></li>
        </ul>
    </div>
</div>
`;
      main.innerHTML += card;
      getRepos(username);
    })
    .catch((error) => {
      console.log("Error");
    });
});

async function getRepos(username) {
  try {
    let response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    let data = await response.json();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      repos.innerHTML += `<div id="repos">
    <div class="repo-name">${data[i].name}</div>
    <div class="repo-language">${data[i].language}</div>
    <div class="repo-text">
      <button>
        <a href="${data[i].html_url}" target="_blank">Do checkout project</a>
      </button>
    </div>
  </div>`;
    }
  } catch (error) {
    console.log(error);
  }
}

