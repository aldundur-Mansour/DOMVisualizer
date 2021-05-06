
// ------------------------------ init ----------------------------- //
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
canvas.style.backgroundColor = "black"
const nodeWidth = 30 ; 
const nodeHeight= 30 ;
const radius = 30 ;
const verticalDistance = 400;  

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();   
function resizeCanvas() {
     canvas.width = window.innerWidth*2;
     canvas.height = window.innerHeight*2;
 }

// ---------------------------- workers ---------------------------- // 

let root = document.querySelector('body') // root element
let power = 0 ; //to decide the blocks to be filled
        
// -----------------------  One Round Only ! ----------------------- // 

        draw ((window.innerWidth + (60))/2,((window.innerHeight + verticalDistance)/8),root);  
        function draw (rootX, rootY , root ) {
            // Flags 
            let attachPath = false ;
            let tagtoggle = false ; 
            // draw the root
            let rootChildren = root.childNodes ; 
            offset = ((window.innerWidth)/(Math.pow(2,power)*(rootChildren.length)))
            context.arc(rootX, rootY, radius, 0, 360);
            context.fillStyle = "Purple"
            context.fill();

                // draw children nodes 
                rootChildren.forEach((element,index) => {

                context.beginPath();
         
                 //if Text

                if(element.nodeType === 3 && element.data.trim() === '\n') {

                    context.rect((window.innerWidth/4)+offset -  ( nodeWidth/2), rootY + verticalDistance - (nodeWidth/2) , nodeWidth, nodeHeight);
                    context.fill();
                    attachPath = true
                 
                }

                // if Tag
                else if (element.nodeType === 1){

                    context.arc((window.innerWidth/4)+offset, rootY + verticalDistance , radius, 0, 360);
                    context.fill();  
                    tagtoggle = true 
                    attachPath = true
                  
                }

                else {

                    attachPath = false 
                    tagtoggle = false 

                }
                
               
                if(attachPath){
                    // draw the connecting line 
                    context.beginPath()
                    context.strokeStyle = "purple"
                    context.moveTo(rootX , rootY)
                    context.lineTo((window.innerWidth/4)+offset,rootY + verticalDistance)
                    context.stroke()
                }

                if(tagtoggle){
                    context.fillStyle = "white"
                    context.rect(((window.innerWidth/4)+offset)- (nodeWidth), (rootY + verticalDistance)- (nodeHeight), 15, 15);
                    context.fillText(element.tagName, ((window.innerWidth/4)+offset) -(nodeWidth/2), (rootY + verticalDistance), 30);
                    context.fill();
                    context.fillStyle = "purple"
                }
                
                // increase offset
                offset+=80

                // Recursive Call 
                if (element.nodeType === 1){

                    if (element.children && element.children.length > 0){
                        let x = ((window.innerWidth/4))+offset ; 
                        let y = rootY + verticalDistance ;
                        for (const child of element.children) {
                            draw(x,y,child)
                            x+=offset 
                        }
                        y+=verticalDistance ;
                    }
                }                    
            });  
        }
      

// ------------- saving the canvas ------------------ // 

const clickButton = ()=> {
    var dataURL = canvas.toDataURL("image/png");
    var newTab = window.open('about:blank','image from canvas');
    newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
}
