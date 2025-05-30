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

const navbar= `<!--Navigation Bar Large Screens-->
    <aside class="hidden sm:block fixed w-1/6 h-full bg-white shadow left-0 top-0 z-20">
        <ul class="mt-6">
            <li class="my-2 hover:bg-gray-100"><a class="block px-4 py-2 text-xl font-semibold"
                    href="menu.html">Menu</a></li>
            <li class="my-2 hover:bg-gray-100"><a class="block px-4 py-2 text-xl font-semibold"
                    href="ordenesPage.html">Ordenes</a>
            </li>
            <li class="my-2 hover:bg-gray-100"><a class="block px-4 py-2 text-xl font-semibold" 
                    href="factuacionPage.html">Facturacion</a>
            </li>
            <li class="my-2 hover:bg-gray-100"><a class="block px-4 py-2 text-xl font-semibold" 
                    href="#">Reporte</a>
            </li>
            <li class="my-2 hover:bg-gray-100"><a class="block px-4 py-2 text-xl font-semibold"
                    href="historialDeOrdenes.html">Historial de Ordenes</a>
            </li>
        </ul>
    </aside>

    <!--Mobile Navigation Bar-->
    <div id="menu-section" class="sm:hidden hidden bg-white shadow p-4">
        <ul>
            <li class="mb-2"><a class="block text-lg font-medium" href="menu.html">Menu</a></li>
            <li class="mb-2"><a class="block text-lg font-medium" href="ordenesPage.html">Ordenes</a></li>
            <li class="mb-2"><a class="block text-lg font-medium" href="factuacionPage.html">Facturacion</a></li>
            <li class="mb-2"><a class="block text-lg font-medium" href="#">Reporte</a></li>
            <li class="mb-2"><a class="block text-lg font-medium" href="historialDeOrdenes.html">Historial de Ordenes</a></li>
        </ul>
    </div>
`

document.addEventListener('DOMContentLoaded', () => {
    const body = document.getElementById("navigation")
    body.innerHTML = navbar + body.innerHTML;
})

