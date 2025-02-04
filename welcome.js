let logo = document.getElementById("main");


function logoappear() {
  logo.innerHTML = `
  <div class="col-12 w-100 " data-aos="fade-down
      "data-aos-duration="3000">
          <div class="d-flex justify-content-center">
            <img class="logoimg" src="assets/image-removebg.png" alt="">
          </div>
   </div>`;
        ;
}

function sectionappear() {
  logo.innerHTML = `
 <div class=" col-12 text-center"
      data-aos="fade-down
      "data-aos-duration="3000">
           <div class="d-flex text-head flex-column flex-wrap justify-content-center">
           <p>Chû Fãng</p>
           </div>
        </div>
    </div>

        <div class=" col-4 d-none d-md-block"
        data-aos="fade-right"
         data-aos-duration="1500"
     data-aos-easing="ease-in-sine">
           <div class="d-flex flex-wrap justify-content-center">
           <img  style="width:420px" src="/assets/20250203_205129_0000.png" alt="">
           </div>
        </div>
    </div> `;

    
}



function imagesappear(){
    logo.innerHTML+= `<div class="col-12 col-sm-12  col-md-4"
    data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
           <div class="d-flex flex-wrap justify-content-center">
          <img  style="width:420px" src="assets/20250203_205012_0000.png" alt=""></img>
           </div>
        </div>`
}


 function imagesappear1(){
  logo.innerHTML+= `<div class="col-md-4 d-none d-md-block "
     data-aos="fade-left"
     data-aos-easing="ease-in-sine"
     data-aos-duration="1500">
    <div class="d-flex flex-wrap justify-content-center">
     <img  style="width:420px" src="/assets/20250203_204759_0000.png" alt="">
    </div>
 </div>
 <div" class="d-flex justify-content-center">
 <a class="btn btn-outline-dark" href="/signup.html">
 GET STARTED<a>


 </div>
 `
}


window.onload = logoappear();
window.onload = setTimeout(sectionappear, 3000);
window.onload = setTimeout(imagesappear, 4600);
window.onload = setTimeout(imagesappear1, 6100);







