import{
    auth,
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    db,
    collection,
    addDoc,
    doc,
    getDocs,
    getStorage,
} from"../utils/utlils.js";

const productCategory = document.getElementById('productCategory');
const productImage = document.getElementById('productImage');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const add = document.getElementById('add');

add.addEventListener('click', (e)=>{
    e.preventDefault();
    const productCategoryValue = productCategory.value;
    const productImageValue = productImage.files[0];
    const productNameValue = productName.value;
    const productPriceValue = productPrice.value;

    const product = {
        productCategory: productCategoryValue,
        productImage: productImageValue,
        productName: productNameValue,
        productPrice: productPriceValue,
        createdBy : auth.currentUser.uid,
        createdByEmail : auth.currentUser.email,
        cart : []
        }; 

        console.log(product);

        const imgRef = ref(storage, product.productImage.name)
        uploadBytes(imgRef, product.productImage).then(()=>{
            console.log("File Upload Done");

            getDownloadURL(imgRef).then(
                (url) => {
                    console.log(url);
                    product.productImage = url;
                    console.log(product);

                    const productCollection = collection(db, "Products");
                    addDoc(productCollection, product)
                    .then(()=>{
                        console.log("Product Added");
                        window.location.href="/";
                        })
                    .catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                })
            })
});