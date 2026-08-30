
const API_KEY = 'HfRvjZaDDWEdd0gbrDqlsrz7notiUuPq28n8ged8lTVNHlEC1WYgtINn';

const API_URL = 'https://api.pexels.com/v1/curated?per_page=15';

// Elementos del DOM
const gallery = document.getElementById('gallery');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
async function fetchPhotos() {
    try {
        // Mostrar spinner de carga
        loading.classList.remove('hidden');
        gallery.classList.add('hidden');
        errorDiv.classList.add('hidden');

        // Petición GET a la API
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }


        const data = await response.json();


        renderPhotos(data.photos);

    } catch (error) {
        console.error('Error al obtener fotos:', error);
        showError();
    } finally {
        // Ocultar spinner siempre
        loading.classList.add('hidden');
    }
}

/**
 * Renderiza las fotos en el grid
 * @param {Array} photos - Array de objetos foto de Pexels
 */
function renderPhotos(photos) {
    gallery.innerHTML = '';


    photos.forEach(photo => {
        const card = createPhotoCard(photo);
        gallery.appendChild(card);
    });


    gallery.classList.remove('hidden');
}

/**
 * Crea el elemento HTML de una tarjeta de foto
  @param {Object} photo - Objeto foto de Pexels
 * @returns {HTMLElement} - Elemento div de la tarjeta
 */
function createPhotoCard(photo) {
    const card = document.createElement('div');
    card.className = 'photo-card';

    
    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.alt || 'Foto de Pexels';
    img.loading = 'lazy';

    
    const info = document.createElement('div');
    info.className = 'photo-info';

    
    const title = document.createElement('h3');
    title.className = 'photo-title';
    title.textContent = photo.alt || 'Sin título';
    title.title = photo.alt || 'Sin título';

    const meta = document.createElement('div');
    meta.className = 'photo-meta';

    const author = document.createElement('span');
    author.className = 'photo-author';
    author.textContent = photo.photographer;

    const size = document.createElement('span');
    size.className = 'photo-size';
    size.textContent = `${photo.width}×${photo.height}`;

  
    meta.appendChild(author);
    meta.appendChild(size);
    info.appendChild(title);
    info.appendChild(meta);
    card.appendChild(img);
    card.appendChild(info);


    card.addEventListener('click', () => {
        window.open(photo.url, '_blank');
    });

    return card;
}

function showError() {
    loading.classList.add('hidden');
    gallery.classList.add('hidden');
    errorDiv.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando álbum de fotos...');
    fetchPhotos();
});
