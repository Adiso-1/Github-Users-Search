const baseEndpoint = "https://api.github.com/users/";
const input = document.querySelector('input');
const button = document.querySelector("button");
const grid = document.querySelector(".grid-container");
const userInput = input.value;

const userNameArray = [];
const getUser = async (userInput) => {
  const fetchData = await fetch(`${baseEndpoint}${userInput}`);
  const userData = await fetchData.json();

  const userObject = {
    userImage: userData.avatar_url,
    userName: userData.name,
    userEmail: userData.email,
    userRepos: userData.public_repos,
  };

  if ((userData.message !== "Not Found")) {
    const newUser = document.createElement("div");
    const userImg = document.createElement("img");
    const userName = document.createElement("h4");
    const userEmail = document.createElement("h4");
    const userRepos = document.createElement("h4");

    userImg.src = userData.avatar_url;
    userName.innerText = `Name: ${userData.name || "No Name Provided"}`;
    userEmail.innerText = `Email: ${userData.email || "No Email Provided"}`;
    userRepos.innerText = `Public Repos: ${userData.public_repos}`;

    newUser.appendChild(userImg);
    newUser.appendChild(userName);
    newUser.appendChild(userEmail);
    newUser.appendChild(userRepos);

    grid.appendChild(newUser);

    userNameArray.push(userInput);
  }
};

button.addEventListener('click',(e) => {
    if (!userNameArray.includes(input.value)) {
        e.preventDefault();
        getUser(input.value);
        input.value = '';
        input.placeholder = `Github User Name..`;
    } else {
        e.preventDefault();
        input.value = '';
        input.placeholder = `User's card already exist !`;
    }
})