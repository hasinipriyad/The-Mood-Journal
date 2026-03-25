let moodList = document.querySelector(".mood-list");
let moods = Array.from(moodList.children);



function selectMood(e){
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

moodList.addEventListener("click",selectMood)