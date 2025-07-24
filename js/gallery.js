//Gallery 

const images = [
    "assets/img/gallery/angela17.jpg", "assets/img/gallery/charice17.jpg", "assets/img/gallery/alexa17.jpg", 
    "assets/img/gallery/sophia17.jpg", "assets/img/gallery/charlotte17.jpg", "assets/img/gallery/kaia17.jpg", 

    "assets/img/gallery/angela16.jpg", "assets/img/gallery/charice16.jpg", "assets/img/gallery/alexa16.jpg", 
    "assets/img/gallery/sophia16.jpg", "assets/img/gallery/charlotte16.jpg", "assets/img/gallery/kaia8.jpg", 

    "assets/img/gallery/angela15.jpg", "assets/img/gallery/charice15.jpg", "assets/img/gallery/alexa15.jpg", 
    "assets/img/gallery/sophia15.jpg", "assets/img/gallery/charlotte15.jpg", "assets/img/gallery/kaia8.jpg", 

    "assets/img/gallery/angela8.jpg", "assets/img/gallery/charice8.jpg", "assets/img/gallery/alexa8.jpg", 
    "assets/img/gallery/sophia8.jpg", "assets/img/gallery/charlotte8.jpg", "assets/img/gallery/kaia8.jpg", 

    "assets/img/gallery/angela3.jpg", "assets/img/gallery/charice3.jpg", "assets/img/gallery/alexa3.jpg", 
    "assets/img/gallery/sophia3.jpg", "assets/img/gallery/charlotte3.jpg", "assets/img/gallery/kaia3.jpg", 

    "assets/img/gallery/angela6.jpg", "assets/img/gallery/charice6.jpg", "assets/img/gallery/alexa6.jpg", 
    "assets/img/gallery/sophia6.jpg", "assets/img/gallery/charlotte6.jpg", "assets/img/gallery/kaia3.jpg", 
    
    "assets/img/gallery/angela7.jpg", "assets/img/gallery/charice7.jpg", "assets/img/gallery/alexa7.jpg", 
    "assets/img/gallery/sophia7.jpg", "assets/img/gallery/charlotte7.jpg", "assets/img/gallery/kaia3.jpg", 

    "assets/img/gallery/angela9.jpg", "assets/img/gallery/charice9.jpg", "assets/img/gallery/alexa9.jpg", 
    "assets/img/gallery/sophia9.jpg", "assets/img/gallery/charlotte9.jpg", "assets/img/gallery/kaia9.jpg", 

    "assets/img/gallery/angela10.jpg", "assets/img/gallery/charice10.jpg", "assets/img/gallery/alexa10.jpg", 
    "assets/img/gallery/sophia10.jpg", "assets/img/gallery/charlotte10.jpg", "assets/img/gallery/kaia10.jpg", 

    "assets/img/gallery/angela11.jpg", "assets/img/gallery/charice11.jpg", "assets/img/gallery/alexa11.jpg", 
    "assets/img/gallery/sophia11.jpg", "assets/img/gallery/charlotte11.jpg", "assets/img/gallery/kaia11.jpg", 

    "assets/img/gallery/angela12.jpg", "assets/img/gallery/charice12.jpg", "assets/img/gallery/alexa12.jpg", 
    "assets/img/gallery/sophia12.jpg", "assets/img/gallery/charlotte12.jpg", "assets/img/gallery/kaia12.jpg", 

    "assets/img/gallery/angela13.jpg", "assets/img/gallery/charice13.jpg", "assets/img/gallery/alexa13.jpg", 
    "assets/img/gallery/sophia13.jpg", "assets/img/gallery/charlotte13.jpg", "assets/img/gallery/kaia13.jpg", 

    "assets/img/gallery/angela14.jpg", "assets/img/gallery/charice14.jpg", "assets/img/gallery/alexa14.jpg", 
    "assets/img/gallery/sophia14.jpg", "assets/img/gallery/charlotte14.jpg", "assets/img/gallery/kaia14.jpg", 

    // "assets/img/gallery/angela.jpg", "assets/img/gallery/charice.jpg", "assets/img/gallery/alexa.jpg", 
    // "assets/img/gallery/sophia.jpg", "assets/img/gallery/charlotte.jpg", "assets/img/gallery/kaia.jpg", 
    
    // "assets/img/gallery/angela4.jpg", "assets/img/gallery/charice4.jpg", "assets/img/gallery/alexa4.jpg", 
    // "assets/img/gallery/sophia4.jpg", "assets/img/gallery/charlotte4.jpg", "assets/img/gallery/kaia4.jpg", 

    // "assets/img/gallery/angela5.jpg", "assets/img/gallery/charice5.jpg", "assets/img/gallery/alexa5.jpg", 
    // "assets/img/gallery/sophia5.jpg", "assets/img/gallery/charlotte5.jpg", "assets/img/gallery/kaia5.jpg", 

    // "assets/img/gallery/angela2.jpg", "assets/img/gallery/charice2.jpg", "assets/img/gallery/alexa2.jpg", 
    // "assets/img/gallery/sophia2.jpg", "assets/img/gallery/charlotte2.jpg", "assets/img/gallery/kaia2.jpg", 
];
const itemsPerPage = 6;
let currentPage = 1;
const totalPages = Math.ceil(images.length / itemsPerPage);

function displayImages() {
    const galleryGrid = document.getElementById("galleryGrid");
    galleryGrid.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const imagesToShow = images.slice(start, end);

    imagesToShow.forEach(img => {
        const imgElement = document.createElement("img");
        imgElement.src = img;
        galleryGrid.appendChild(imgElement);
    });

    document.getElementById("pageNumber").textContent = currentPage;
    document.getElementById("totalPages").textContent = totalPages;
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayImages();
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayImages();
    }
});

displayImages();