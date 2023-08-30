const loadPhone = async (searchText,isShowAll) => {
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayphones (phones,isShowAll);
}


const displayphones = (phones , isShowAll) =>{
  // console.log(phones);
  const phoneContainer = document.getElementById('phone-container');

  phoneContainer.textContent ='';
  
 const showAllContainer = document.getElementById('show-all-container');
 if(phones.length > 9 && !isShowAll){
  showAllContainer.classList.remove('hidden')
}
else{
  showAllContainer.classList.add('hidden')
}

  // display show first 10 phone 

if(!isShowAll){
  phones = phones.slice(0,9)
}

 phones.forEach(phone => {
//  console.log(phone);

const phoneCard = document.createElement('div');
phoneCard.classList =`card h-auto bg-base-100 shadow-xl border-[#CFCFCF] border-2 mt-5`

phoneCard.innerHTML =`
<figure class="shadow-md ml-5 mt-5 mr-5 rounded-lg bg-[#0D6EFD0D]"><img src="${phone.image}" class="p-4" /></figure>
<div class="card-body">
  <h2 class="card-title justify-center text-[#403F3F]">${phone.phone_name}</h2>
  <p class=" text-center mt-2 text-[#706F6F]">There are many variations of passages of available, but the majority have suffered</p>
    <span class=" text-center py-3 text-lg text-[#403F3F]">$999</span
  <div class="card-actions justify-center">
    <button onclick ="showDetailsHadle('${phone.slug}')" class="btn bg-[#0D6EFD] hover:bg-sky-500 text-white">Show Details</button>
</div>
</div>
`;
 phoneContainer.appendChild (phoneCard)

    });

    toggleLoadingSpiner(false)
}


// seaerchbar 

const handleSearch = (isShowAll) =>{
  toggleLoadingSpiner(true);
  const searchField = document.getElementById ('search-field');
  const searchText = searchField.value; 
// console.log(searchText);
loadPhone (searchText,isShowAll)



}

//  loading 

const toggleLoadingSpiner =(isLoading)=> {
   const loadingSpiner = document.getElementById('loading');
 if(isLoading){
  loadingSpiner.classList.remove('hidden');
 }
 else{
  loadingSpiner.classList.add('hidden');
 }
}


//  showAll
  
const showAllHandle = () => {
  handleSearch (true )
}



// show details modal show.....

const showDetailsHadle = async (id) => {
  // console.log(showDetailsHadle,id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
   console.log(data)
  showPhoneDetailsModal(phone);
}




showPhoneDetailsModal = (phone) => {
      

  // const allPhoneName = document.getElementById('all-phone-name');
          
  //    allPhoneName.innerText = phone.name;

     const showDetailsContainer = document.getElementById('show_details_container')

     showDetailsContainer.innerHTML = `
     <figure class="shadow-md ml-5 mt-5 mr-5 rounded-lg bg-[#0D6EFD0D]"><img src="${phone.image}" class="p-4 ml-7 lg:ml-28 md:ml-24" /></figure>
        <h3 class="font-bold text-lg my-2">${phone.name}</h3>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class=" my-2 text-xl text-black "> Storage: <span class="text-sm">${phone?.mainFeatures?.storage}</span></p>
        <p class=" my-2 text-xl text-black "> Display Size: <span class="text-sm">${phone?.mainFeatures?.displaySize}</span></p>
        <p class=" my-2 text-xl text-black "> Chipset: <span class="text-sm">${phone?.mainFeatures?.chipSet}</span></p>
        <p class=" my-2 text-xl text-black "> Memory: <span class="text-sm">${phone?.mainFeatures?.memory}</span></p>
        <p class=" my-2 text-xl text-black "> Slug: <span class="text-sm">${phone?.slug}</span></p>
        <p class=" my-2 text-xl text-black "> Release-date: <span class="text-sm">${phone?.releaseDate? phone?.releaseDate:'coming soon'}</span></p>
        <p class=" my-2 text-xl text-black "> Brand: <span class="text-sm">${phone.brand}</span></p>
        <p class=" my-2 text-xl text-black "> GPS: <span class="text-sm">${phone?.others?.GPS? phone?.others?.GPS:'not GPS in availaibe this device'}</span></p>
        
     
     `
  
         
        //  modal show
    show_details_modal.showModal();
}

loadPhone(displayphones);

  // displayphones('https://openapi.programming-hero.com/api/phones?search=iphone')
//  handleSearch('https://openapi.programming-hero.com/api/phones?search=iphone')