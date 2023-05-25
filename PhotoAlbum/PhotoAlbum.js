document.onclick = hideMenu;
document.oncontextmenu = rightClick;
var container=document.querySelector(".grid-container")
var menuSelect=Array.from(document.querySelectorAll(".item"));
var contextMenu=document.querySelector("#contextMenu");
function hideMenu() {
    document.getElementById("contextMenu").style.display = "none"
}

function rightClick(e) {
    e.preventDefault();

    if (document.getElementById("contextMenu").style.display == "block")
                hideMenu();
    else {
        var menu = document.getElementById("contextMenu")
        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
            }
}

var even=null;

window.addEventListener("contextmenu",function(e){
    even=e
})
contextMenu.addEventListener("click",(option)=>
{
    if(option.target.id=='it2'){
        even.target.style.filter="grayscale(100%)";
    }
    else if(option.target.id=='it3'){
        even.target.style.filter="brightness(170%)";
    }
    else if(option.target.id=='it4'){
        var newImage=reduceResolution(even.target)
        even.target.src=newImage
    }
    else if(option.target.id=='it6'){
        var duplicateImage=document.createElement('IMG')
        var div=document.createElement("div")
        duplicateImage.src=even.target.src
        div.append(duplicateImage)
        container.appendChild(div)
    }
    else if (option.target.id=="it8"){
        generateQRCode(even)
    }

    else if(option.target.id=="it5"){
        even.target.style.borderRadius="50%";
            even.target.style.width='150px';
            even.target.style.height='150px';
            even.target.style.display="flex";
            even.target.style.alignItems='center';
    }
//     else if(option.target.id=="it9"){
//         console.log(even.target)
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');

//         canvas.width = even.target.width;
//         canvas.height = even.target.height;

//         ctx.drawImage(even.target, 0, 0, canvas.width, canvas.height);
//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//         for (let i = 0; i < imageData.data.length; i += 4) imageData.data[i] = 255;

//         ctx.putImageData(imageData, 0, 0);

//         even.target.src = canvas.toDataURL();
//         let img=document.createElement("img")
//         img.src=even.target.src
//     }
//     else if(option.target.id="it10"){
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');

//         canvas.width = even.target.width;
//         canvas.height = even.target.height;

//         ctx.drawImage(even.target, 0, 0, canvas.width, canvas.height);
//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//         for (let i = 4; i < imageData.data.length; i += 4) imageData.data[i+1] = 255;

//         ctx.putImageData(imageData, 0, 0);

//         even.target.src = canvas.toDataURL();
//         let img=document.createElement("img")
//         img.src=even.target.src
// }
// else if(option.target.id="it11"){
//     const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');

//         canvas.width = even.target.width;
//         canvas.height = even.target.height;

//         ctx.drawImage(even.target, 0, 0, canvas.width, canvas.height);
//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//         for (let i = 0; i < imageData.data.length; i += 4) imageData.data[i+2] = 255;

//         ctx.putImageData(imageData, 0, 0);

//         even.target.src = canvas.toDataURL();
//         let img=document.createElement("img")
//         img.src=even.target.src
// }
else if(option.target.id=="it12"){
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    rgb={r:0,g:0,b:0}
    canvas.width = even.target.width;
    canvas.height = even.target.height;

    ctx.drawImage(even.target, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let color=""
    for (let i = 0; i < imageData.data.length; i+=4){
        rgb.r+=imageData.data[i]
        rgb.g+=imageData.data[i+1]
        rgb.b+=imageData.data[i+2]
    }
    if(rgb.r>rgb.g && rgb.r>rgb.b){
        color="red"
    }
    if(rgb.g>rgb.r && rgb.g>rgb.b){
        color="green"
    }
    if(rgb.b>rgb.r && rgb.b>rgb.g){
        color="blue"
    }
    console.log(even.target.id)
    let imageDiv=document.getElementById("c-"+even.target.id)
    let colorpopup=document.createElement("div")
    colorpopup.style.zIndex="100"
    colorpopup.style.position="absolute"
    // add popup  below image
    colorpopup.style.top="100%"
    colorpopup.style.left="0"
    colorpopup.style.width="10%"
    colorpopup.style.height="10%"
    colorpopup.style.backgroundColor=color

    colorpopup.textContent=color

    imageDiv.append(colorpopup)

}
}
)

function reduceResolution(target){
    var img = new Image();
    img.src=target.src
    img.crossOrigin="anonynomous"
    var canvas = document.createElement('canvas');
    var reducedImageData;
    var resImage=img.onload = function() {
          canvas.width = img.width/10;
          canvas.height = img.height/10;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img,0,0, canvas.width, canvas.height);
          reducedImageData = canvas.toDataURL();

          return reducedImageData
        }();
        return resImage
    }
    function generateQRCode(e){
        const qrCode = new QRCodeStyling({
            width: 300,
            height: 300,
            type: "svg",
            data:  e.target.src,
            image: e.target.src,
            dotsOptions: {
                color: "#4267b2",
                type: "rounded"
            },
            backgroundOptions: {
                color: "#e9ebee",
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 20
            }
        });

        qrCode.append(document.getElementById("canvas"));
        qrCode.download({ name: "qr", extension: "svg" });
    }