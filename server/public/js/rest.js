// window <- An object representation of (essentially) the browser
window.onload = () => { // The onload event triggers after the webpage is finished loading.
    // document <- An object representation of the DOM.
    //ajaxGetRestaurants();
    //createRestaurantList(restaurants);
    createNavBar();
    document.getElementById('addRestLink').onclick= addRestaurantForm;
    fetchGetRestaurants();
    authenticate();
}
function fetchGetRestaurants(){
    // Fetch is an API for sending requests to servers that utilizes promises.
    fetch('/restaurants').then((resp)=> {
            // The data that gets passed into the promise is basically a response object.
            // the response object has metadata (like the status code) and the body of the response
            // as well as useful methods like .json() which will create a promise with the data
            // as an object.
            return resp.json();
        }).then(data => createRestaurantList(data));
}
function ajaxGetRestaurants(){
    // Asynchronous Java and XML

    // Step 1: Create a new XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    // Step 2: set callback for onreadystatechange
    xhttp.onreadystatechange = () => {
        // closure to the xhttp object to handle our response
        /*
        ReadyStates of AJAX:
        0 - New
        1 - Open
        2 - Recieved
        3 - Processing
        4 - Ready
        */
        if(xhttp.readyState === 4 && xhttp.status === 200) {
            console.log(xhttp.response);
            createRestaurantList(JSON.parse(xhttp.response));
        }
    }
    // Step 3: open the connection
    xhttp.open('GET', '/restaurants');
    // Step 4: send the request
    xhttp.send(); // Because this is a get request, the send will be empty.

}
function createRestaurantList(restaurantList){
    let section = document.getElementById('restaurants');
    let row;
    for(let i = 0; i < restaurantList.length; i++) {
        if(i%3 === 0) {
            row = document.createElement('section');
            row.className='row border';
            section.appendChild(row);
        }
        let div = createRestaurantElement('div', '', 'col restaurant card', row);
        let img = document.createElement('img');
        img.src = restaurantList[i].img;
        img.className = 'card-img-top rest-logo';
        div.appendChild(img);
        let card = document.createElement('div');
        card.className="card-body";
        div.appendChild(card);
        createRestaurantElement('p', restaurantList[i].name, '', card);
        createRestaurantElement('p', restaurantList[i].eta, 'deliverytime', card);
        createRestaurantElement('p', restaurantList[i].rating, 'rating', card);
        createRestaurantElement('p', restaurantList[i].type, 'foodtype', card);
    }
}
function createRestaurantElement(element, data, className, parent){
    let e = document.createElement(element);
    e.innerHTML = data;
    e.className = className;
    parent.appendChild(e);
    return e;
}
let createLiteral = (rest) => {
    return `<div class="restaurant">
    <p>${rest.name}</p>
    <img src="${rest.img}"/>
    <p class="deliverytime">${rest.eta}</p>
    <p class="rating">${rest.rating} stars</p>
    <p class="foodtype">${rest.type}</p>
    </div>`
}