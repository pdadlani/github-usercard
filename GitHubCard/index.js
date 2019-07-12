/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.querySelector('.cards');

axios.get('https://api.github.com/users/pdadlani')
  // outcome if promise is a success
  .then(data => {
    console.log('my data', data)

    // create a new element with data received into card userComponent function
    const userData = userComponent(data.data);
    // add my user data to DOM
    cards.appendChild(userData);

    // creating contribution graph
    let contributions = document.createElement('div');
    cards.appendChild(contributions);
    console.log('data.login', data.data.login)
    contributions.id = data.data.login;
    new GitHubCalendar("#" + data.data.login, data.data.login);
  })

  // outcome if promise is a failure
  .catch(error => {
    console.log('There is an issue with your personal data', error, '. Please try again.')
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

let followersArray = [];

axios.get('https://api.github.com/users/pdadlani/followers')
  // solution 1: for outcome if promise is a success; all code in one .then. solution 2 in next block of code
  // .then(data => {
  //   // console.log('followers', data)
  //   // set followersArray to only equal to the necessary data of all my followers
  //   followersArray = data.data;
  //   // console.log('followersArrayData', followersArray)

  //   // iterate over all my followers to access their individual url, to then create a new user component and add it as a child in the DOM.
  //   followersArray.forEach(followerData => {
  //     // console.log('followers Data:', followerData);
  //     axios.get(followerData.url) 
  //       .then(data => {
  //         // console.log('forEach followers data', data)
  //         cards.appendChild(userComponent(data.data));
  //       })
  //   })
  // })

  // solution 2: for outcome if promise is a success; uses nested(?) .then()'s
  .then(data => 
    // console.log('followers', data)
    // set followersArray to only equal to the necessary data of all my followers
    followersArray = data.data)
    // console.log('followersArrayData', followersArray)

    // iterate over all my followers to access their individual url, to then create a new user component and add it as a child in the DOM.
  .then(followersArray =>  
    followersArray.forEach(followerData => {
      // console.log('followers Data:', followerData);
      axios.get(followerData.url)
        .then(data => {
          // console.log('forEach followers data', data)
          cards.appendChild(userComponent(data.data));
          // // creating contribution graph
          // let contributions = document.createElement('div');
          // cards.appendChild(contributions);
          // console.log('data.login', data.data.login)
          // contributions.id = data.data.login;
          // new GitHubCalendar("#" + data.data.login, data.data.login);
        })

    })
  )

  // outcome if promise is a failure
  .catch(error => {
    console.log('There is an issue collecting your followers data', error, '. Please try again.')
  })

// /* Step 3: Create a function that accepts a single object as its only argument,
//           Using DOM methods and properties, create a component that will return the following DOM element:

// <div class="card">
//   <img src={image url of user} />
//   <div class="card-info">
//     <h3 class="name">{users name}</h3>
//     <p class="username">{users user name}</p>
//     <p>Location: {users location}</p>
//     <p>Profile:  
//       <a href={address to users github page}>{address to users github page}</a>
//     </p>
//     <p>Followers: {users followers count}</p>
//     <p>Following: {users following count}</p>
//     <p>Bio: {users bio}</p>
//   </div>
// </div>

// */

function userComponent(userObject) {

   // another way to create elements with: parent, type, classes, and textContent
   // const card = createElement(null, 'div',  ['card'], null);
  // create the elements
  const card = document.createElement('div'),
    userImg = document.createElement('img'),
    cardInfo = document.createElement('div'),
    userName = document.createElement('h3'),
    userUsername = document.createElement('p'),
    location = document.createElement('p'),
    profile = document.createElement('p'),
    profileLink = document.createElement('a'),
    followers = document.createElement('p'),
    following = document.createElement('p'),
    bio = document.createElement('p'),
    contributions = document.createElement('div');

  // set the content
  userImg.src = userObject.avatar_url;
  userName.textContent = userObject.name || 'Cool person w/o a name';
  userUsername.textContent = userObject.login;
  location.textContent = `Location: ${userObject.location || 'Undisclosed'}`;
  profile.textContent = 'Profile: ';
  profileLink.href = userObject.html_url;
  profileLink.textContent = userObject.html_url;
  followers.textContent = `Followers: ${userObject.followers}`;
  following.textContent = `Following: ${userObject.following}`;
  bio.textContent = `Bio: ${userObject.bio || "Unavailable"}`;

  // set up structure of the elements
  // can use 'append' to append more than one element
  // otherwise use 'appendChild' if you want to do it one-by-one. 'append' also allows you to do it one-by-one.
  card.append(userImg,
    cardInfo);
  // card.appendChild(userImg);
  // card.appendChild(cardInfo);
  cardInfo.append(userName,
    userUsername,
    location,
    profile,
    followers,
    following,
    bio);
  profile.appendChild(profileLink);
  // card.appendChild(contributions);


  // set the styles aka class names
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  userName.classList.add('name');
  userUsername.classList.add('username');
  // contributions.id = data.login;

  // new GitHubCalendar('#', data.login, data.login)


  // return the card, all info is a child to card...so returns all info
  return card;
}


// function successAll(promiseArr) {
//   promiseArr.forEach(data => success(data));
// }

// function failueAll(promiseArr) {
//   promiseArr.forEach(data => failure(data));
// }

// // Append by order given
// let map = people.map(person => req(person));

// Promise.all(map)
//   .then(successAll)
//   .catch(failueAll)