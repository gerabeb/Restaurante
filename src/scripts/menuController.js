

document.addEventListener('DOMContentLoaded', () => {
    let ul = document.getElementById('dropdown-menu');
    let toggleButton = document.getElementById('menu-toggle');

    document.getElementById('ham-button').addEventListener('click', function() {

        console.log(ul.style.display)

        if (ul.style.display === 'hidden' || ul.style.display === '' || ul.style.display === 'none') {
            ShowElement(ul, toggleButton);
        } else {
            HideElement(ul, toggleButton);
        }
    });
    const menuItems = ul.querySelectorAll('li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            HideElement(ul, toggleButton);
        });
    });
});

function HideElement(element, toggle){
    element.style.display = 'none';
    toggle.innerHTML = "☰";
    
}

function ShowElement(element, toggle){
    element.style.display = 'block';
    toggle.innerHTML = "✗";
}