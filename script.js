const moodList = document.querySelector(".mood-list");
const entryForm = document.querySelector(".user-notes-div form");
const entries = document.querySelector(".entries");
const deleteAll = document.querySelector("#delete-all");
const addBtn = document.getElementById("add-entry");
const userNotes = document.getElementById("user-notes");

let currentEditCard = null;

//Mood Selection Event Handler
function selectMood(e){
    const moods = document.querySelectorAll(".mood-list i");
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

//Add or Update Entry Event Handler
function onUserEntry(e){
    e.preventDefault();

    let moods = Array.from(document.querySelectorAll(".mood-list i"));
    let moodSelected = moods.filter((mood)=>{
        return mood.classList.contains("selected")
    })
    //Checking if the user already selected a mood or not.
    if(moodSelected.length == 0){
        alert("Please select a mood.");
        return
    }
    const moodValue = moodSelected[0].dataset.mood;
    const noteValue = userNotes.value;

    if(currentEditCard){
        currentEditCard.querySelector(".entry-note").textContent = noteValue;
        currentEditCard.querySelector(".entry-emoji").textContent = moodValue;

        //Reset edit mode
        currentEditCard = null;
        addBtn.textContent = "Add Entry";
        addBtn.classList.remove("edit-mode");
    }
    else{
        //Add the note to the UI
        addEntrytoUI(noteValue,moodValue);
    }

    //Form Reset
    userNotes.value = '';
    document.querySelectorAll(".mood-list i").forEach(m => m.classList.remove("selected"));

    checkUI();
}

function addEntrytoUI(userEntry,userMoodValue){

    let entryCard = document.createElement("div");
    entryCard.classList.add("entry-card");
    entries.append(entryCard);

    let entryTop = document.createElement("div");
    entryTop.classList.add("entry-top");
    entryCard.append(entryTop);

    // Use it in user entry
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

    addtoLocalStorage(userMoodValue,userEntry,formattedDate);
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
        let card = e.target.parentElement.parentElement;
        const noteText = card.querySelector(".entry-note").textContent;
        const moodText = card.querySelector(".entry-emoji").textContent;

        userNotes.value = noteText;
        document.querySelectorAll(".mood-list i").forEach(m => {
            m.classList.toggle("selected", m.dataset.mood === moodText);
        });
        currentEditCard = card;
        addBtn.textContent = "Update Entry";
        addBtn.classList.add("edit-mode");
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

//Adding items to local Storage.
function addtoLocalStorage(mood,note,date){
    const storedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    const entry = {mood,note,date};
    storedEntries.push(entry);
    localStorage.setItem("entries",JSON.stringify(storedEntries));
}

//Mood Selection Event Listener
moodList.addEventListener("click",selectMood)
//Form Submission Event Listener
entryForm.addEventListener("submit",onUserEntry)
//Card Delete and Edit Button Event Listener
entries.addEventListener("click",onDeleteEdit)
//Delete All button event Listener
deleteAll.addEventListener("click",deleteAllEntries)
//Checking UI to display or hide the Delete All button
checkUI();