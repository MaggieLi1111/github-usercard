import axios from "axios";
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

axios.get("https://api.github.com/users/MaggieLi1111")

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function
    Skip to STEP 3 (line 34).*/
.then(res =>{
  console.log(res);
  console.log(res.data.avatar_url,res.data.login, res.data.html_url);
  /*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
  cardMaker(res.data);

})
.catch(err =>{
  console.log(err);
})
    
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:
    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/


const cards = document.querySelector(".cards");

function cardMaker ( { avatar_url, location, name, login, followers, following, html_url, bio}) {

  const card = document.createElement("div");
  const cardImg = document.createElement("img");
  const cardInfo = document.createElement("div");
  const h3name = document.createElement("h3");
  const link = document.createElement("a");

  const ps = [];
  for(let i = 0 ; i < 6 ; i++){
    ps.push(document.createElement("p"));
  }

  card.classList.add("card");
  cardImg.src = avatar_url;
  cardInfo.classList.add("card-info");
  h3name.classList.add("name");
  h3name.textContent = name;
  link.href = html_url;
  link.textContent = html_url;

  ps[0].classList.add("username");
  ps[0].textContent = login;
  ps[1].textContent = "Location: " + location;
  ps[2].textContent = "Profile: ";
  ps[3].textContent = "Followers: " + followers;
  ps[4].textContent = "Following: " + following;
  ps[5].textContent = "Bio: " + bio;

  cards.appendChild(card);
  card.appendChild(cardImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(h3name);
  ps[2].appendChild(link);
  ps.forEach(item =>{
    cardInfo.appendChild(item);
  })
 

  return card;
}
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/


const followersArray = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];
followersArray.forEach(item => {
  axios.get(`https://api.github.com/users/${item}`)
  .then(res =>{
    cardMaker(res.data);
  })
  .catch(err =>{
    console.error(err);
  })
})


