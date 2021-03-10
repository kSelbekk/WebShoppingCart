/*function getData(){
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => console.log(json))
}*/

//IIFE function that loads all the products from fakestoreapi
(function load(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://fakestoreapi.com/products');
    xhr.send();
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            let resp = JSON.parse(xhr.responseText);
            render(resp)
        }
    }
})()

function render(prod){
    let output = ' <div class="row">';
    for (let key of prod) {
      output += `  
      <div class="col-sm text-left">
        <div class="card">
          <img class="card-img-top p-1 img-fluid rounded shadow-sm" width="70" src="${key.image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${key.title}</h5>
            <p class="card-text ">${key.description}</p>
            <p class="card-text">${key.price} :-</p>
            <button href="#" class="btn btn-primary addToCartBtn" id="${key.id}" >Add to Cart</button>
            </div>
        </div>
      </div>
      `;
    }
    output += '</div>';
    document.querySelector('#output').innerHTML = output;
}

//listening for button click for the "add to cart" button

const collection = document.getElementsByClassName('addToCartBtn');
console.log(collection);

for (let i = 0; i < collection.length; i++) {
  console.log(collection[i]);
}

/*
btnAdd.forEach(product => {
    product.addEventListener('click', ()=>{
        //TODO!!! Add function for adding to localstorage
        console.log(product.innerHTML);
    })
});
*/

function addToCart(){

    if(localStorage.getItem("cartItems") === null){
        let cartProducts = [];
        cartProducts.push("Kevin");
        localStorage.setItem("cartItems", JSON.stringify(names));
        return;
    }

    let a = JSON.parse(localStorage.getItem("cartItems"));
    a.push("kevin");
    localStorage.setItem("cartItems", JSON.stringify(a));
    console.log(localStorage.getItem("cartItems"));
}
removeFromCart = (product)=>{

}

updateNumberOfProducts = (prodcut)=>{

}

function renderCustomerCart(){

}


document.getElementById("myForm").addEventListener('submit', (e)=>{
  //Gets the information about the customers shipping 
  const customerName = document.getElementById('name'); 
  const customerAdress = document.getElementById('adress'); 
  const customerEmail = document.getElementById('email'); 
  const customerPhoneNumber = document.getElementById('phoneNumber'); 
  const errorMessage = document.getElementById('errorMessage'); 

  //If some of the input is not filled in correctly the customer gets a error message
  let message = []
  if (customerName.value === "" || customerName.value == null) {
    message.push("You must fill in your name");
  }
  if (customerAdress.value === "" || customerAdress.value == null) {
    message.push("You must fill in your adress");
  }
  if (customerEmail.value === "" || customerEmail.value == null) {
    message.push("You must fill in your email");
  }
  if (customerPhoneNumber.value === "" || customerPhoneNumber.value == null) {
    message.push("You must fill in your phone number");
  }

  if(message.length > 0){
    errorMessage.innerHTML = message.join(',<br>');
    e.preventDefault();
  }
  else {
    errorMessage.innerHTML = "";

    submitCustomerForm();
  }
});

function submitCustomerForm(){
  console.log("asd");
  document.getElementById("myForm").submit();

}
