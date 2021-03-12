let storeProducts = [];

//Function that loads all the products from fakestoreapi
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
            <p class="card-text">${key.price} :-</p>
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

function addToCart(key){
  let product = {
    id: "",
    title : "",
    description: "",
    price: "",
    image: ""
  };

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

  if(localStorage.getItem("cartItems") == null){
      multiProducts.push(product);
      cartProducts.push(multiProducts);
      localStorage.setItem("cartItems", JSON.stringify(cartProducts));
    } else{  
    let arrayOfProductFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

    arrayOfProductFromLocalStorage.forEach(arr => {
      if(arr[0].id == product.id){
        arr.push(product);
        theLooopExiter = false;
      }
    });
    if(theLooopExiter){
      multiProducts.push(product);
      arrayOfProductFromLocalStorage.push(multiProducts);
    }
    localStorage.setItem("cartItems", JSON.stringify(arrayOfProductFromLocalStorage));
    };
}


renderCustomerCart();

function renderCustomerCart(){
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  let output = '';
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
    });
    document.querySelector('#cartBody').innerHTML = output;
  }
  document.querySelector('#removeAll').addEventListener('click',function(){
    localStorage.clear();
    window.location.reload();
  });

  let minus = document.querySelectorAll('#minus');
  minus.forEach(btns => {
    btns.addEventListener('click', ()=>{
      alert(btns.value);
      localStorage.removeItem(btns.value);
    })
  });
  let plusProduct = document.querySelectorAll('#plus');
  plusProduct.forEach(btns => {
    btns.addEventListener('click', ()=>{
      addToCart(btns.value);
      window.location.reload();
    })
  });

  let price = 0;
  cartItems.forEach(p => {
      p.forEach(element => {
      price += element.price;
    });
  });
  let total = `
                <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>$${price.toFixed(2)}</strong></li>
                <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Shipping and handling</strong><strong>$10</strong></li>
                <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                  <h5 class="font-weight-bold">$${(price + 10).toFixed(2)}</h5>
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
}

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
  }
}