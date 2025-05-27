const options = ["Sin queso", "Sin pepinillos", "Sin cebolla", "Sin aderezo"];

// Modal y formulario
let modal = document.getElementById('checkbox-modal');
let form = document.getElementById('checkbox-form');
let closeModalBtn = document.getElementById('close-modal');
let confirmBtn = document.getElementById('confirm-checkboxes');

// Cerrar el modal
function CloseAddNotesModal() {
    modal.style.display = "none";
}

// Abrir el modal y generar opciones
function openAddNotesModal(product) {
    form.innerHTML = ""; // Limpiar checkboxes previos

    // Generar los checkboxes
    options.forEach((opt, idx) => {
        const label = document.createElement('label');
        label.className = "block mb-2";
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = opt;
        checkbox.id = `checkbox_${idx}`;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(" " + opt));
        form.appendChild(label);
    });

    // Campo de texto para nota especial (siempre visible)
    const noteLabel = document.createElement('label');
    noteLabel.className = "block mt-4 mb-2 font-semibold";
    noteLabel.textContent = "Nota especial (opcional):";
    const noteInput = document.createElement('input');
    noteInput.type = "text";
    noteInput.placeholder = "Escribe tu personalización aquí";
    noteInput.id = "special-note";
    noteInput.className = "w-full border rounded px-2 py-1 mt-1";
    noteLabel.appendChild(noteInput);
    form.appendChild(noteLabel);

    modal.style.display = "flex";

    // Confirmar selección
    confirmBtn.onclick = function (e) {
        e.preventDefault();
        const checked = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.value);

        const noteInput = document.getElementById('special-note');
        const noteValue = noteInput.value.trim();

        // Puedes validar aquí si la nota es obligatoria
        // if (!noteValue) { ... }

        if (checked.length > 0 || noteValue) {
            let opciones = checked.join(', ');
            if (noteValue) {
                opciones += (opciones ? ', ' : '') + noteValue;
            }
            console.log(`aca se deberia agregar al carrito: ${opciones}`);
            product.note = opciones;
            addToCart(product)
        }

        modal.style.display = "none";
    };
}

document.addEventListener('DOMContentLoaded', function () {
    modal = document.getElementById('checkbox-modal');
    form = document.getElementById('checkbox-form');
    closeModalBtn = document.getElementById('close-modal');
    confirmBtn = document.getElementById('confirm-checkboxes');
});
