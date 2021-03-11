let storeProducts = [];

loadData =(callback) => {
    const url = 'https://fakestoreapi.com/products';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
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


//Function that loads all the products from fakestoreapi
/*
load = (callback)=>{
  const url = 'https://fakestoreapi.com/products';
  const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            let resp = JSON.parse(xhr.responseText);
            renderShopInterface(resp);
            callback();
            for (let i = 0; i < resp.length; i++) {
              storeProducts.push(resp[i]);
            }
        }
    }  
}
*/
function load(){
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
    load();
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

  if(localStorage.getItem("cartItems") == null){
      let cartProducts = [];
      cartProducts.push(product);
      localStorage.setItem("cartItems", JSON.stringify(cartProducts));
    } else{
    let arrayOfProductFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

    for (let i = 0; i < arrayOfProductFromLocalStorage.length; i++) {
      if(arrayOfProductFromLocalStorage[i].id == product.id || arrayOfProductFromLocalStorage[i].id == undefined){
        let multiProducts = [];
        multiProducts.push(product);
          multiProducts.push(arrayOfProductFromLocalStorage[i]);
          arrayOfProductFromLocalStorage.splice(arrayOfProductFromLocalStorage[i], 1);
          arrayOfProductFromLocalStorage.push(multiProducts);
          localStorage.setItem("cartItems", JSON.stringify(arrayOfProductFromLocalStorage));
          alert(1);
      } else{ 
        arrayOfProductFromLocalStorage.push(product);
        localStorage.setItem("cartItems", JSON.stringify(arrayOfProductFromLocalStorage));
      };
    }
    };
}


renderCustomerCart();

function renderCustomerCart(){
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  let output = '';
  if(cartItems!= null){
    cartItems.forEach(prod => {
        output += `
        <tr>
          <th scope="row" class="border-0">
            <div class="p-2">
              <img src="${prod.image}" alt="" width="70" class="img-fluid rounded shadow-sm">
              <div class="ml-3 d-inline-block align-middle">
                <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">${prod.title}</a></h5>
              </div>
            </div>
          </th>
          <td class="border-0 align-middle"><strong>${prod.price} kr</strong></td>
          <td class="border-0 align-middle"><strong>0</strong></td>
          <td class="align-middle text-left">
            <button class="btn btn-danger" id="minus" value="${prod.id}">-</button>
          </td>
          <td class="align-middle text-left">
            <button class="btn" id="plus" value="${prod.id}">+</button>
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
  
}

let plusProduct = document.querySelectorAll('#plus');
  plusProduct.forEach(btns => {
    btns.addEventListener('click', ()=>{
      addToCart(btns.value);
    })
  });

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
})

function submitCustomerForm(){
  console.log("asd");
  document.getElementById("myForm").submit();

}
removeFromCart = (product)=>{

}

updateNumberOfProducts = (prodcut)=>{

}