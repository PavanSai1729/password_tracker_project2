// GET CALL
window.addEventListener("DOMContentLoaded",function(){
    axios.get("https://crudcrud.com/api/fe13d93de74345febef1b585f8dd01e3/tracker")
     .then(function(result){
       console.log(result);
       
       for(var i=0; i<result.data.length;i++){
         displayOnScreen(result.data[i]);
       }
     })
     .catch(function(err){
       console.log(err);
     })
     
 })
 



 
// POST CALL
function abc(event) {
    event.preventDefault();

    const pDetails = {
        t1: event.target.t1.value,
        p1: event.target.p1.value
    };

    axios.post("https://crudcrud.com/api/fe13d93de74345febef1b585f8dd01e3/tracker", pDetails)
    .then(function(response){
        displayOnScreen(response.data);
    })
    .catch(function(err){
        console.error(err);
    });

    document.getElementById("t1").value = "";
    document.getElementById("p1").value = "";
}


function displayOnScreen(pDetails) {
    const child = document.createElement("li");
    child.innerHTML = `${pDetails.t1} - ${pDetails.p1}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = 'delete'; 
    deleteBtn.id ="d1";
    child.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = 'edit';
    editBtn.id = "e1";
    child.appendChild(editBtn);

    const parent = document.getElementById("display_items");
    parent.appendChild(child);


    deleteBtn.addEventListener("click", function (event) {
        // Remove the item from the screen
        const listItem = event.target.parentElement;
        listItem.remove();
    
        // Send a DELETE request to the backend API
        const itemId = listItem.getAttribute("data-item-id"); // Assuming you have a data attribute for the item ID
        axios.delete(`https://crudcrud.com/api/fe13d93de74345febef1b585f8dd01e3/tracker/${itemId}`)
        .then(function(result){
            console.log(result);
        })
        .catch(function(err){
            console.log(err);
        });
    });
    


    editBtn.addEventListener("click", function (event) {
        
        const listItem = event.target.parentElement;
        listItem.remove();
    
        // Send a DELETE request to the backend API
        const itemId = listItem.getAttribute("data-item-id"); // Assuming you have a data attribute for the item ID
        axios.delete(`https://crudcrud.com/api/fe13d93de74345febef1b585f8dd01e3/tracker/${itemId}`)
        .then(function(result){
            console.log(result);
        })
        .catch(function(err){
            console.log(err);
        });


        document.getElementById("t1").value= pDetails.t1;
        document.getElementById("p1").value = pDetails.p1;
    
    });
    

    }


//filter


const filter = document.getElementById("s1");
filter.addEventListener("keyup", function(event){
    const items = document.querySelectorAll("#display_items li"); // Update the selector to target list items inside the display_items ul
    const textEntered = event.target.value.toLowerCase(); // Use event.target.value to get the value entered in the input field

    for (let i = 0; i < items.length; i++) {
        const currItemText = items[i].textContent.toLowerCase(); // Access textContent of the list item directly
        if (currItemText.indexOf(textEntered) === -1) {
            items[i].style.display = "none";
        } else {
            items[i].style.display = "flex";
        }
    }
});



//count


// Function to update the count of items displayed on the screen
function updateItemCount() {
    const displayItems = document.getElementById("display_items");
    const itemCount = displayItems.querySelectorAll("li").length; // Count the number of list items
    const para1 = document.getElementById("para1");
    para1.textContent = `Number of items: ${itemCount}`; // Update the text content of the paragraph tag
}

// Call the function to initially update the count
updateItemCount();

// Event listener for changes in the display items
document.getElementById("display_items").addEventListener("DOMSubtreeModified", updateItemCount);

