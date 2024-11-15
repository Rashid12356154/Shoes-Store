function showProduct(name,title,newprice,price,dis,image) {
    let img=document.getElementById("product-image")
  
    img.src=image;
   
    document.getElementById('product-name').textContent=name;
    document.getElementById('product-title').textContent=title;
    document.getElementById('new-price').textContent=`$${newprice}`
    document.getElementById('price').textContent=`$${price}`
    document.getElementById('discription').textContent=dis;
    
    const heroContent=document.querySelector('.hero-content');
    heroContent.classList.remove('animate-slide-in'); void heroContent.offsetWidth;
    heroContent.classList.add('animate-slide-in')
    
}

function showStory(image){
    document.getElementById('story-image').src=image;
}

const cartBtn=document.getElementById('cart-btn');
const closeCart=document.getElementById('cart-close')
cartBtn.addEventListener('click',function(){
    document.getElementById('cart').classList.toggle('hidden');
})
closeCart.addEventListener('click',function() {
    document.getElementById('cart').classList.toggle('hidden');
})

let newdata;
let baskit=JSON.parse(localStorage.getItem("data")) || [];
let total;

fetch('./data.json').then(res => res.json()).then((data)=>{
     newdata=data;
     DisplayArrival()
     DisplayCollection()
    DisplayCart()
})


function DisplayArrival(){
    const product=document.getElementById('new-arrival')
    let items=newdata.filter(p => p.categorie ==='new arrival')
    items.map((item)=>{
        const card=document.createElement('div');
        card.className='grid bg-primary shadow-md rounded-md overflow-hidden';
        card.innerHTML=`<div class="w-full h-[250px] overflow-hidden">
                    <img src="${item.img}" alt="" class="w-full h-full object-cover">  
                </div>
                <div class="grid gap-2 p-4">
                    <h1 class="text-secondary capitalize font-semibold text-lg">${item.name}</h1>
                    <h1 class="text-secondary capitalize text-sm">${item.title}</h1>
                    <div class="flex justify-between items-center">
                        <div class="flex gap-4 items-center">
                            <h1 class="text-secondary text-xl font-semibold">$${item.newprice}</h1>
                            <h1 class="text-slate-400 text-lg" style="text-decoration: line-through;">$${item.price}</h1>
                        </div>
                        <button class="bg-accent w-8 h-8 rounded-full flex justify-center items-center text-lg font-medium text-primary shadow-md cursor-pointer hover:shadow-xl" onclick="AddToCart(${item.id})"> + </button>
                    </div>
                </div>`
                product.appendChild(card);
    })
}

function DisplayCollection(){
    const product=document.getElementById('collection');
    let items=newdata.filter(p => p.categorie ==='new collection');
    items.map((item)=>{
        const card=document.createElement('div');
        card.className='grid bg-primary shadow-md rounded-md overflow-hidden'
        card.innerHTML=` <div class="w-full h-[250px] overflow-hidden">
                            <img src="${item.img}" alt="" class="w-full h-full object-cover">  
                        </div>
                        <div class="grid gap-4 p-4">
                            <h1 class="text-secondary capitalize font-semibold text-xl">${item.name}</h1>
                            <h1 class="text-secondary capitalize text-sm">${item.title}</h1>
                            <div class="flex justify-between items-center">
                                <div class="flex gap-4 items-center">
                                    <h1 class="text-secondary text-xl font-semibold">$${item.newprice}</h1>
                                    <h1 class="text-slate-400 text-lg" style="text-decoration: line-through;">$${item.price}</h1>
                                </div>
                                <button class="bg-accent w-8 h-8 rounded-full flex justify-center items-center text-lg font-medium text-primary shadow-md cursor-pointer hover:shadow-xl" onclick="AddToCart(${item.id})"> + </button>
                            </div>
                        </div>`
                        product.appendChild(card);
    })
}


function AddToCart(id){
    const product=newdata.find(p => p.id ===id);
    const items=baskit.find(p => p.id ===id);
    if(items)return
    else{
        baskit.push({...product,qty:1})
    }
    document.getElementById('empty').style.display='none'
    baskit=baskit.filter(p => p.id !==0);
    localStorage.setItem("data",JSON.stringify(baskit));
    
    DisplayCart()
    
}

function DisplayCart(){
   
   
    console.log(baskit);
    total=baskit.reduce((acc,p)=> acc + p.newprice * p.qty,0);
    let count=baskit.reduce((acc,p)=> acc+p.qty,0);
    const  showCart=document.getElementById('show-cart');
    showCart.innerHTML=''
    baskit.map((item)=>{
        const card=document.createElement('div');
        card.className='flex gap-2 items-center bg-primary shadow-md w-full'
        card.innerHTML=`<img src="${item.img}" alt="" class="w-20 h-20">
                <div class="w-full grid gap-2 px-1">
                    <div class="flex w-full justify-between">
                        <h1 class="text-secondary font-medium text-lg">${item.name}</h1>
                        <span class="cursor-pointer px-2" onclick="Delete(${item.id})"><img src="./image/baseline-close-24px.png" alt="" class="w-4"></span>
                    </div>
                    <div class="flex w-full justify-between">
                        <h1 class="text-secondary font-medium text-lg">$${item.newprice}</h1>
                        <div class="flex items-center gap-4">
                            <button class="bg-primary shadow-md p-1 rounded-sm cursor-pointer" onclick="Minus(${item.id})">
                                <img src="./image/left-icon.png" alt="">
                            </button >
                            <span id="qty" class="text-secondary font-semibold text-lg" id="qty">${item.qty}</span>
                            <button class="bg-primary shadow-md p-1 rounded-sm cursor-pointer" onclick="Pluse(${item.id})">
                                <img src="./image/right-icon.png" alt="">
                            </button>
                        </div>
                    </div>
                </div>`
                showCart.appendChild(card)
    })

    if(count ===0){
        document.getElementById('empty').className='mt-4'
        document.getElementById('count').innerHTML=count
    }else{
        document.getElementById('count').innerHTML=count
    }
    document.getElementById('total').innerHTML=`$${total}`;
    
}
function Delete(id){
    baskit=baskit.filter(p => p.id !==id)
    localStorage.setItem("data",JSON.stringify(baskit));
    DisplayCart();
}

function Minus(id){
    
    console.log(baskit);
    
    let cart=baskit.find(p => p.id===id);
    if(cart){
        if(cart.qty===0)return
        else{
            cart.qty-=1;

        }
    }
    DisplayCart()
    baskit=baskit.filter(p => p.qty !==0);
    localStorage.setItem('data',JSON.stringify(baskit))
    Update(id)
}

function Update(id){
    const item=baskit.find(p => p.id ===id)
    if(item==undefined){
        DisplayCart()
    }else{
        document.getElementById('qty').innerHTML=item.qty;
    }
}
function  Pluse(id){
    const  item=baskit.find(p => p.id===id);
    if(item){
        item.qty +=1;
    }
    DisplayCart()
    localStorage.setItem('data',JSON.stringify(baskit))
    Update(id)
}
function Checkout(){
    alert('thank your for shopping!');
    baskit=[]
    localStorage.setItem("data",JSON.stringify(baskit));
    DisplayCart()
}