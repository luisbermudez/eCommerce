// Array of items
let itemsArray = [
    {
      name: 'Ironhack T',
      price: 10,
      image: 'https://miro.medium.com/max/5190/1*aVsUjp1zvlRb1799gDjbLA@2x.jpeg'
    },
    {
      name: 'Ironhack Hoodie',
      price: 15,
      image: 'https://m.media-amazon.com/images/I/B1i3u9-Q-KS._AC_CLa%7C2140%2C2000%7CB1wqstnnTfS.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL1500_.png'
    },
    {
      name: 'Ironhack Sticker',
      price: 2,
      image:'https://e7.pngegg.com/pngimages/887/803/png-clipart-ironhack-web-development-job-startup-company-design-blue-user-interface-design-thumbnail.png'
    },
    {
      name: 'Ironhack Mug',
      price: 8,
      image: 'https://d0bb7f9bf11b5ad1a6b2-6175f06f5e3f64e15abbf67415a276ec.ssl.cf1.rackcdn.com/product-images/designlab/11-oz-traditional-ceramic-coffee-mugs-7102-white1582888132.jpg'
    },
]

// Locate the tag with id 'items'; <ul> and get it associated to variable list
let list = document.getElementById('items');
// The purpose of the following loop is to display the items of the array on the web page by creating the tags and giving them data
// Iterate through each item of array
itemsArray.forEach((item,i)=>{
    // Create, using .innerHTML, the following elements, inside variable list which is associated to the items <ul>
    // As we create new tags, we also put data inside them
    // we use 'item' that contains the data of each item of the array
    // we use .name or .price etc, to call the key inside the items
    // The input tag uses an argument call 'onchage' - so when there's a change at the input we can do something
    // When there's a change, we call a function - the inputChange function
    // The inputChange function takes 4 arguments
    // i which is a variable, contains the number of the iteration, starting with 0 until the length of the array **to know what item has been selected**
    // The function also takes the name of the item, the price and the image - all of it will be used later...
    // so we not only created new elements & modified the original HTML doc, when there's a change on the input, we record the data so we know:
    // What item the user wants to buy, its name, its price and its image
    list.innerHTML += 
    `<li>
        <div><b>Item:</b> ${item.name}<div>
        <div><b>Price:</b> $${item.price}<div>
        <img src='${item.image}' /> <br>
        <input type="number" placeholder="quantity" onchange='inputChange(${i}, "${item.name}", "${item.price}", "${item.image}")' />
        <button>Buy Item</button>
    </li>`
})

// Empty cart array, to store the items the user wants to buy
let cartArray = [];
// The function is called when the user enters a number at the quantity input
// To this function the number of the item in the array is passed as well as more details of that item
function inputChange(i, name, price, image) {
    // We associatte elements we are going to be working with to variables
    // listItem will be associated to the <li> tag of the item the user wants to buy - but because there are multiple <li>s we use [i] that indicates the index of the item
    let listItem = document.querySelectorAll('li')[i];
    // iput var is associated to the <input> tag
    let input = listItem.querySelector('input');
    // button var is associated to the <button> tag
    let button = listItem.querySelector('button');

    // We execute the code inside the function when the button is clicked
    // The function pushes a new element to the empty array to keep track of the items the user wants to buy
    // When the button is clicked an element is pushed into the array
    // The object has the following data:
    // The quantity - comming from the value of the input - the number the user entered at the input
    // The name of the item, the price and its image
    // When the button is clicked, another function is called too - the showCart() functioin
    button.onclick = function() {
        if (cartArray.length < 1 ) {
            cartArray.push({
            quantity: input.value,
            name: name,
            price: price,
            image: image
            })
            input.value = '';
            showCart();
            return;
        } 
        
        // this var will let me know if the <li> has already been created in <ul> - to avoid creating it again
        let track = false;
        // The j variable will provide the index inside the cartArray, so it is known where the item is and we can update it
        let j;

        // This loop will iterate through the array
        for (j = 0; j < cartArray.length; j++) {
            // If there is an <li> element with the same name, track will change to true to indicate it
            // Also, the loop will break, leaving j variable with the index of the item that has the same name, to know which item to update
            if (cartArray[j].name === name) {
                track = true;
                break;
            } 
        }

        // This line will be executed when track is true, so instead of creating another <li> we just take the one the already exists and we update the new number
        if (track) {
            // 2 variable are created to make the code more clear
            // This variable will take the quantity value of the existing <li>
            let amount = Number(cartArray[j].quantity);
            // This var will take the value the user just entered
            let entryValue = Number(input.value);
            // Both values will be added into the existing quantity key
            cartArray[j].quantity = amount + entryValue;
            // If track is false then there is no <li> item with the name we are comparing, we can go ahead and have the <li> element pushed
        } else {
            cartArray.push({
            quantity: input.value,
            name: name,
            price: price,
            image: image
            })
        }

        input.value = '';
        showCart();
    }
}

// The showCart function does not take arguments
function showCart() {
    // A grandTotal var is created and initialized to 0
    let grandTotal = 0;
    // cart id is located / <ul id="cart"></ul>
    // the tag gets associated to the cartItems variable
    let cartItems = document.getElementById('cart');
    // We make sure the <ul> elements is empty before we get it updated with the items the user wants to buy
    cartItems.innerHTML = '';

    // By now, the cart array is no longer empty - the function executed when the buttons was clicked has already pushed the items the user wants to buy
    // We iterate through the elements of the cartArray
    cartArray.forEach(item => {
        // For each item we update the granTotal var to keep track of the total - we get the price wwith item.price
        grandTotal += item.price * item.quantity;
        // We modify the <ul> tag, we create new tags and put them inside an <li> tag
        // so for each item the user has selected we create a new <li> tag 
        cartItems.innerHTML += 
        `<li>
            <div>Quantity: ${item.quantity}</div>
            <div>Item: ${item.name}</div>
            <div>Price: $${item.price}</div>
            <img src='${item.image}' />
        </li>`
    })

        

    // We locate the tag with the grandTotal id <span> - with innerHTML we assign the value of the grandTotal var with a $ sign
    document.getElementById('grandTotal').innerHTML = '$' + grandTotal;
}