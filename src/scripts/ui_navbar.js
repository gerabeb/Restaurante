let currentOpenSection = null;

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId + '-section');
    if (!section) return;

    // Hide the currently open section if it's not the one being toggled
    if (currentOpenSection && currentOpenSection !== section) {
        currentOpenSection.classList.add('hidden');
    }

    // Toggle visibility of the selected section
    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
        currentOpenSection = section;
    } else {
        section.classList.add('hidden');
        currentOpenSection = null;
    }
}