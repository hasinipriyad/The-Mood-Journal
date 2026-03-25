let moodList = document.querySelector(".mood-list");
let entryForm = document.querySelector(".user-notes-div form");
let entries = document.querySelector(".entries");
let deleteAll = document.querySelector("#delete-all");
let addBtn = document.getElementById("add-entry");

function selectMood(e){
    let moods = document.querySelectorAll(".mood-list i");
    if(e.target.tagName==="I"){
        let emoji = e.target;
        let isSelected = emoji.classList.contains("selected");

        moods.forEach((mood)=>{
            mood.classList.remove("selected")
        })
        
        if(!isSelected){
            emoji.classList.add("selected")
        }
    }
}

function onUserEntry(e){

    //Prevent Default
    e.preventDefault();

    //Get the user notes
    let userEntry = document.querySelector("#user-notes").value;

    let moods = Array.from(document.querySelectorAll(".mood-list i"));

    let moodSelected = moods.filter((mood)=>{
        return mood.classList.contains("selected")
    })

    //Checking if the user already selected a mood or not.
    if(moodSelected.length == 0){
        alert("Please select a mood.");
        return
    }

    //Add the note to the UI
    addEntrytoUI(userEntry,moodSelected[0]);

    checkUI();

}

function addEntrytoUI(userEntry,userMood){
    console.dir(userMood.innerHTML)

    let entryCard = document.createElement("div");
    entryCard.classList.add("entry-card");
    entries.append(entryCard);

    let entryTop = document.createElement("div");
    entryTop.classList.add("entry-top");
    entryCard.append(entryTop);

    // Get the emoji string
    let userMoodValue = userMood.dataset.mood;

    // Use it in your entry
    let entryEmoji = document.createElement("span");
    entryEmoji.classList.add("entry-emoji");
    entryEmoji.textContent = userMoodValue;
    entryTop.append(entryEmoji);

    //Creating today's date format
    let today = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = today.toLocaleDateString('en-US', options);

    let entryDate = document.createElement("span");
    entryDate.classList.add('entry-date');
    entryDate.textContent = formattedDate;
    entryTop.append(entryDate);

    let entryNote = document.createElement("p");
    entryNote.classList.add("entry-note");
    entryNote.textContent = userEntry;
    entryCard.append(entryNote);

    let entryActions = document.createElement("div");
    entryActions.classList.add("entry-actions");
    entryActions.innerHTML = `<button class="edit-btn">Edit</button>
                       <button class="delete-btn">Delete</button>`
    entryCard.append(entryActions);
}

//Delete a User Entry
function onDeleteEdit(e){
    if(e.target.classList.contains("delete-btn")){
        let entryCard = e.target.parentElement.parentElement;
        if(confirm("Are you sure you want to delete?")){
            entryCard.remove();
        }
        checkUI();
    } else if(e.target.classList.contains("edit-btn")){
        console.log("edit mode");
    }
}

//Delete all entries
function deleteAllEntries(){
    if(confirm("Are you sure you want to delete all entries?")){
        entries.innerHTML = '';
        checkUI();
    }
}

//To display or hide the Delete All button.
function checkUI(){
    let userEntries = Array.from(entries.children);
    if(userEntries.length == 0){
        deleteAll.style.display = 'none';
    }else{
        deleteAll.style.display = 'flex';
    }
}

moodList.addEventListener("click",selectMood)
entryForm.addEventListener("submit",onUserEntry)
entries.addEventListener("click",onDeleteEdit)
deleteAll.addEventListener("click",deleteAllEntries)
checkUI();