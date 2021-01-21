let restTemp = `
<section id="addRest" class="container">
    <section class="row">
        <label name="name">Name:</label>
        <input type="text" name="name" id="n-rest-name" />
    </section>
    <section class="row">
        <label name="rating">Rating:</label>
        <input type="text" name="rating" id="n-rest-rating" />
    </section>
    <section class="row">
        <label name="chef">chef:</label>
        <input type="text" name="chef" id="n-rest-chef" />
    </section>
    <section class="row">
        <label name="type">type:</label>
        <input type="text" name="type" id="n-rest-type" />
    </section>
    <section class="row">
        <label name="img">img:</label>
        <input type="text" name="img" id="n-rest-img" />
    </section>
    <button id="n-rest-submit">Add Restaurant</button>
</section>
`
function addRestaurantForm(){
    document.getElementById('restForm').innerHTML=restTemp;
    document.getElementById('n-rest-submit').onclick = addRestaurant;
    document.getElementById('addRest').onkeydown = checkEnter;
}
function removeRestaurantForm(){
    document.getElementById('restForm').innerHTML='';
    window.location.reload();
}
function checkEnter(event) {
    console.log(event);
    if(event.which === 13) {
        addRestaurant();
    }
}
function addRestaurant() {
    let data = {};
    data.name=document.getElementById('n-rest-name').value;
    data.img=document.getElementById('n-rest-img').value;
    data.rating=document.getElementById('n-rest-rating').value;
    data.chef=document.getElementById('n-rest-chef').value;
    data.type=document.getElementById('n-rest-type').value;
    console.log(data);
    fetch('/restaurants', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(data)}).then(()=>{removeRestaurantForm()})
}