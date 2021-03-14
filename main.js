let storeProducts = [];

//Function that loads all the products from fakestoreapi with a callbakc 
function loadData(callback){
    const url = 'https://fakestoreapi.com/products';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4 && xhr.status == 200){
          callback(JSON.parse(xhr.responseText));
      }
    }; 
    xhr.open('GET', url);
    xhr.send();
}
loadData(renderShopInterface);
loadData(getProdArray);

function getProdArray(arr){
  for (let i = 0; i < arr.length; i++) {
    storeProducts.push(arr[i]);
  }
}

function getAddBtns(){
  const collection = document.querySelectorAll('.addToCartBtn');
  //listening for button click for the "add to cart" button
  collection.forEach(product => {
    product.addEventListener('click', ()=>{
        addToCart(product.id);
    })
  });
}

function renderShopInterface (prod){
    let output = ' <div class="row">';
    for (let key of prod) {
      output += `  
      <div class="col-sm text-left">
        <div class="card">
          <img class="card-img-top p-1 img-fluid rounded shadow-sm" width="70" src="${key.image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${key.title}</h5>
            <p class="card-text ">${key.description}</p>
            <p class="card-text">$${key.price}</p>
            <button href="#" class="btn addToCartBtn" id="${key.id}" >Add to Cart</button>
            </div>
        </div>
      </div>
      `;
    }
    output += '</div>';
    document.querySelector('#output').innerHTML = output;
    getAddBtns();
}

//The function for adding a product
function addToCart(key){
  let product = {
    id: "",
    title : "",
    description: "",
    price: "",
    image: ""
  };

  //If the product exist it creates a new product that gets added in the cart 
  storeProducts.forEach(item => {
    if(key == item.id){
      product.id = item.id;
      product.title = item.title;
      product.description = item.description;
      product.price = item.price;
      product.image = item.image;
    }
  });

  let multiProducts = [];
  let cartProducts = [];
  let theLooopExiter = true;

  if(localStorage.getItem("cartItems") == null){ //Creats a localstorage with key if there is none
      multiProducts.push(product);
      cartProducts.push(multiProducts);
      localStorage.setItem("cartItems", JSON.stringify(cartProducts)); //Pushes the product in to an array and sets the localstorage
    } else{  
    let arrayOfProductFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

    arrayOfProductFromLocalStorage.forEach(arr => { //Checks if there is any product with the same id, if so it pushes the same product into the same array
      if(arr[0].id == product.id){
        arr.push(product);
        theLooopExiter = false;
      }
    });
    if(theLooopExiter){ //Else it creates a new array
      multiProducts.push(product);
      arrayOfProductFromLocalStorage.push(multiProducts);
    }
    localStorage.setItem("cartItems", JSON.stringify(arrayOfProductFromLocalStorage));
    };
}


renderCustomerCart();

//Function that renders the shopping cart
function renderCustomerCart(){
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let output = '';
  if(cartItems!= null){
    cartItems.forEach(prod => { //Gets the localstorage parsed array and loops through it to get all the products 
      let amount = prod.length;
        output += `
        <tr>
          <th scope="row" class="border-0">
            <div class="p-2">
              <img src="${prod[0].image}" alt="product image" width="70" class="img-fluid rounded shadow-sm">
              <div class="ml-3 d-inline-block align-middle">
                <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">${prod[0].title}</a></h5>
              </div>
            </div>
          </th>
          <td class="border-0 align-middle"><strong>$${prod[0].price}</strong></td>
          <td class="border-0 align-middle"><strong>${amount}</strong></td>
          <td class="align-middle text-left">
            <button class="btn btn-danger" id="minus" value="${prod[0].id}">-</button>
          </td>
          <td class="align-middle text-left">
            <button class="btn" id="plus" value="${prod[0].id}">+</button>
          </td>
        </tr>
        `
    });
    document.querySelector('#cartBody').innerHTML = output;
  };

  document.querySelector('#removeAll').addEventListener('click',function(){
    localStorage.clear();
    window.location.reload();
  });
  //Function for deleting products in cart
  let minus = document.querySelectorAll('#minus');
  minus.forEach(btns => {
    btns.addEventListener('click', ()=>{ //The function loops over the buttons and checks wich one has been clicked
        cartItems.forEach(arr => {
          let index = arr.length -1;
          if(btns.value == arr[index].id){
            for (let i = 0; i < arr.length; i++) {
              arr.pop();
              if(arr.length == 0){
                cartItems.splice(cartItems.indexOf(arr),1);
              } 
              break;
            }
            
          }
          
          //When the value is found it pops it from the array and sets the localstorage 
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        });
    })
  });

  let plusProduct = document.querySelectorAll('#plus');
  plusProduct.forEach(btns => {
    btns.addEventListener('click', ()=>{
      addToCart(btns.value);
    })
  });

  let price = 0;
  cartItems.forEach(p => {
      p.forEach(element => {
      price += element.price;
    });
  });
  let total = `
                <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                  <h5 class="font-weight-bold">$${price}</h5>
                </li>
  `;

  document.querySelector('#subTotal').innerHTML = total;

  document.getElementById("myForm").addEventListener('submit', (e)=>{
    //Gets the information about the customers shipping 
    const customerName = document.getElementById('name'); 
    const customerAdress = document.getElementById('adress'); 
    const customerEmail = document.getElementById('email'); 
    const customerPhoneNumber = document.getElementById('phoneNumber'); 
    const errorMessage = document.getElementById('errorMessage'); 
  
    //If some of the input is not filled in correctly the customer gets a error message
    let message = [];
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
    }else {
      errorMessage.innerHTML = "";
      renderCheckout();
    }
  })

  function renderCheckout(e){
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    let output = '<tbody>';
    if(cartItems!= null){
      cartItems.forEach(prod => {
        let amount = prod.length;
          output += `
          <tr>
            <th scope="row" class="border-0">
              <div class="p-2">
                <img src="${prod[0].image}" alt="product image" width="70" class="img-fluid rounded shadow-sm">
                <div class="ml-3 d-inline-block align-middle">
                  <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">${prod[0].title}</a></h5>
                </div>
              </div>
            </th>
            <td class="border-0 align-middle"><strong>$${prod[0].price}</strong></td>
            <td class="border-0 align-middle"><strong>${amount}</strong></td>
            <td class="align-middle text-left">
              <button class="btn btn-danger" id="minus" value="${prod[0].id}">-</button>
            </td>
            <td class="align-middle text-left">
              <button class="btn" id="plus" value="${prod[0].id}">+</button>
            </td>
          </tr>
          `
          output += '</tbody>'
      });
      document.querySelector('#checkout').innerHTML = output;
      e.preventDefault();
    }
  }
}

