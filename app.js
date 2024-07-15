import{
    auth,
    signOut,
    onAuthStateChanged,
    db,
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "./utils/utlils.js";

const addProduct = document.getElementById('addProduct');
const myProduct = document.getElementById('myProduct');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userDropdown = document.getElementById('userDropdown');
const userImage = document.getElementById('userImage');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const product_container = document.getElementById('product_container');
const cartnumber = document.getElementById('cartnumber');

getAllProduct();

logoutBtn.addEventListener('click', () => {
        // 
    signOut(auth).then(() => {
            console.log('logout success');
            window.location.href = "/index.html";
    }).catch((error) => {   
           console.log(error.message);  
    });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("User is signed In");
      console.log(user);
    loginBtn.style.display = 'none';
    userImage.style.display = 'block';
    getUserInfo(uid);
      } else {
        // User is signed out
        console.log("User is signed Out");
        loginBtn.style.display = 'block';
        userImage.style.display = 'none';
        userDropdown.style.display = 'none';
        }
});

loginBtn.addEventListener('click', ()=>{
    window.location.href = "/login/index.html";
})

addProduct.addEventListener('click', ()=>{
    window.location.href = "/product/index.html";
});

myProduct.addEventListener('click', ()=>{
    window.location.href = "/myProduct/index.html";
})

function getUserInfo(uid){
    const userRef = getDocs(db, 'users', uid);
    getDoc(userRef)
    .then((data) => {
        console.log(data);
        console.log(data.id);
        console.log(data.data());
        })
        .catch((error) => {
            console.log(error.message);
    })
}

async function getAllProduct(){
    try{
        const querySnapshot = await getDocs(collection(db, "Products"));
        product_container.innerHTML = '';
           querySnapshot.forEach((doc) => {
             console.log(`${doc.id} => ${doc.data()}`);

             const product = doc.data();
             
             const cards = `<div class="product-card">
                        <h2>${product.productCategory}</h2>
                        <img src="${product.productImage}">
                       <h3>${product.productName}</h3>
                       <div class="add">
                           <p class="price">Rs ${product.productPrice}</p>
                            <button id="${doc.id}" class="btn" onclick="addCart(this)">
                            ${(auth?.currentUser && product?.cart?.includes(auth?.currentUser.uid) ? "Carted" : "Add to Cart")} 
                            </button> 
                        </div>
                        </div>`
                     window.addCart = addCart;
                 product_container.innerHTML += cards;
        console.log(product);
    });
    }catch(err){
        alert(err);
    }
}

async function addCart(e){
    console.log(e);
    if(auth.currentUser){
        e.disabled = true
        const uid = auth.currentUser.uid;
        const productID = e.id;
        const productRef = doc(db, 'Products', productID); 
        if(e.innerText == "Carted"){
            updateDoc(productRef, {
                cart : arrayRemove (uid)
            })
            .then(()=>{
                e.innerText = 'Add to Cart';
                e.disabled = false
            })
            .catch((e)=> console.log(e));    
        }else{
            updateDoc(productRef, {
                cart : arrayUnion (uid)
            })
            .then(()=>{
                e.innerText = 'Carted'
                e.disabled = false
            })
            .catch((e)=> console.log(e));
        }
    }else{
        alert("Please Login First");
        window.location.href = "/login/index.html"
    }
}
