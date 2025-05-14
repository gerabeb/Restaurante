

let currentOpenSection = null;
function toggleSection(sectionId) {
const section = document.getElementById(sectionId + '-section');

if(currentOpenSection && currentOpenSection !== section){
    currentOpenSection.classList.add('hidden');
    }
    if (section.classList.contains('hidden')){
        section.classList.remove('hidden');
        currentOpenSection = section;
    } else {
        section.classList.add('hidden');
        currentOpenSection = null;
    }
}

