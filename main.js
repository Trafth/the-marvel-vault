import { db } from './firebase-config.js';
import { fetchAndDisplayData, displayMovie, displayNews, displayCharacter, displayTVShow, addData, editData, deleteData } from './database-functions.js';

console.log('main.js loaded');

let currentPath = window.location.pathname;

document.addEventListener('DOMContentLoaded', function () {
  currentPath = window.location.pathname;

  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  function toggleMobileMenu() {
    navLinks.classList.toggle('active');
  }
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      toggleMobileMenu();
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
      toggleMobileMenu();
    });
  }
  // Admin page logic

  // Function to fetch and display data from selected collection for admin page
  async function fetchAndDisplayCollectionData(collectionName, dataListContainer, populateFormForEdit, editingDocId) {
    dataListContainer.innerHTML = 'Loading data...';
    try {
      const querySnapshot = await db.collection(collectionName).get();
      dataListContainer.innerHTML = '';

      if (querySnapshot.docs.length > 0) {
        querySnapshot.docs.forEach(doc => {
          const itemData = doc.data();
          const listItem = document.createElement('div');
          listItem.classList.add('admin-data-item');
          listItem.innerHTML = `
            <span>${itemData.title || itemData.name || 'No Title/Name'}</span>
            <button class="edit-data" data-id="${doc.id}" data-collection="${collectionName}">Edit</button>
            <button class="delete-data" data-id="${doc.id}" data-collection="${collectionName}">Delete</button>
          `;
          dataListContainer.appendChild(listItem);

          listItem.querySelector('.edit-data').addEventListener('click', async () => {
            editingDocId = doc.id;
            // Populate form with data for editing
            populateFormForEdit(itemData);
          });

          listItem.querySelector('.delete-data').addEventListener('click', async () => {
            const docIdToDelete = doc.id;
            const collectionToDeleteFrom = collectionName;
            const itemTitle = itemData.title || 'this item';
            if (confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
              await deleteData(collectionToDeleteFrom, docIdToDelete);
              alert('Data deleted successfully!');
              listItem.remove();
            }
          });
        });
      } else {
        dataListContainer.innerHTML = '<p>No data in the database.</p>';
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      dataListContainer.innerHTML = '<p>Error loading data.</p>';
    }
  }

  // Function to populate the form for editing
  function populateFormForEdit(data) {
    document.getElementById('title').value = data.title || '';
    document.getElementById('headline').value = data.headline || '';
    document.getElementById('contents').value = data.contents || '';
    document.getElementById('imageUrl').value = data.imageUrl || '';
    document.getElementById('content').value = data.content || '';
    document.getElementById('description').value = data.description || '';
    document.getElementById('releaseYear').value = data.releaseYear || '';
    document.getElementById('cast').value = data.cast ? data.cast.join(', ') : '';
    document.getElementById('coProducer').value = data.coProducer || '';
    document.getElementById('director').value = data.director || '';
    document.getElementById('executiveProducers').value = data.executiveProducers ? data.executiveProducers.join(', ') : '';
    document.getElementById('heroImageUrl').value = data.heroImageUrl || '';
    document.getElementById('musicBy').value = data.musicBy || '';
    document.getElementById('overviewImageUrl').value = data.overviewImageUrl || '';
    document.getElementById('producer').value = data.producer || '';
    document.getElementById('network').value = data.network || '';
    document.getElementById('releaseDate').value = data.releaseDate ? new Date(data.releaseDate).toISOString().split('T')[0] : '';
    document.getElementById('synopsis').value = data.synopsis || '';
    document.getElementById('stageTeaserUrl').value = data.stageTeaserUrl || '';
    document.getElementById('synopsis').value = data.synopsis || '';
    document.getElementById('trailerUrl').value = data.trailerUrl || '';
  }
  if (currentPath.includes('admin.html')) {

    const dataListContainer = document.getElementById('dataList');
    const dataForm = document.getElementById('dataForm');
    const collectionSelect = document.getElementById('collection');
    let editingDocId = null;
    let currentCollection = collectionSelect.value;

    // Function to update the current collection
    function updateCurrentCollection() {      currentCollection = collectionSelect.value;

      // Get references to the news-specific fields and their labels
      const headlineGroup = document.getElementById('headline').parentElement;
      const contentsGroup = document.getElementById('contents').parentElement;
      const thumbnailPictureGroup = document.getElementById('thumbnailPicture').parentElement;

      // Get references to fields that should be hidden for movies
      const contentGroup = document.getElementById('content').parentElement;
      const descriptionGroup = document.getElementById('description').parentElement;

      const characterAliasGroup = document.getElementById('characterAlias').parentElement;
 const characterNameGroup = document.getElementById('characterName').parentElement;
 const castGroup = document.getElementById('cast').parentElement;
 const coProducerGroup = document.getElementById('coProducer').parentElement;
 const executiveProducersGroup = document.getElementById('executiveProducers').parentElement;
 const imageUrlGroup = document.getElementById('imageUrl').parentElement;
 const musicByGroup = document.getElementById('musicBy').parentElement;
 const overviewImageUrlGroup = document.getElementById('overviewImageUrl').parentElement;
 const producerGroup = document.getElementById('producer').parentElement;
 const releaseYearGroup = document.getElementById('releaseYear').parentElement;
      const stageTeaserUrlGroup = document.getElementById('stageTeaserUrl').parentElement;
 const synopsisGroup = document.getElementById('synopsis').parentElement;

      const networkGroup = document.getElementById('network').parentElement;
 // Add reference to director, heroImageUrl, releaseDate, title, trailerUrl if not already included
      const directorGroup = document.getElementById('director').parentElement;
      const heroImageUrlGroup = document.getElementById('heroImageUrl').parentElement;
      const releaseDateGroup = document.getElementById('releaseDate').parentElement;
      const titleGroup = document.getElementById('title').parentElement;
      const trailerUrlGroup = document.getElementById('trailerUrl').parentElement;

      // Show or hide news-specific fields based on the selected collection
      const isNewsCollection = currentCollection === 'news';
 if (headlineGroup) headlineGroup.style.display = isNewsCollection ? 'block' : 'none';
 if (contentsGroup) contentsGroup.style.display = isNewsCollection ? 'block' : 'none';
 if (thumbnailPictureGroup) thumbnailPictureGroup.style.display = isNewsCollection ? 'block' : 'none';

      // Hide all fields by default, then show based on collection
      const allFieldGroups = [
 headlineGroup, contentsGroup, thumbnailPictureGroup,
 contentGroup, descriptionGroup, characterAliasGroup,
 characterNameGroup, castGroup, coProducerGroup,
 executiveProducersGroup, imageUrlGroup, musicByGroup,
 overviewImageUrlGroup, producerGroup, releaseYearGroup, stageTeaserUrlGroup,
 synopsisGroup, networkGroup, directorGroup,
 heroImageUrlGroup, releaseDateGroup, titleGroup, trailerUrlGroup
      ];

      allFieldGroups.forEach(group => {
 if (group) group.style.display = 'none';
      });

      // Show fields based on the current collection
      const isMovieCollection = currentCollection === 'movies';
      const isTVShowCollection = currentCollection === 'tvshows';
      const isCharacterCollection = currentCollection === 'characters';

      if (isNewsCollection) {
 if (titleGroup) titleGroup.style.display = 'block';
 if (headlineGroup) headlineGroup.style.display = 'block';
 if (contentsGroup) contentsGroup.style.display = 'block';
 if (thumbnailPictureGroup) thumbnailPictureGroup.style.display = 'block';
 if (imageUrlGroup) imageUrlGroup.style.display = 'block';
      } else if (isMovieCollection) {
 // Show movie-specific fields (and common fields if they exist)
 if (titleGroup) titleGroup.style.display = 'block';
 if (imageUrlGroup) imageUrlGroup.style.display = 'block';
 if (descriptionGroup) descriptionGroup.style.display = 'block';
 if (releaseYearGroup) releaseYearGroup.style.display = 'block';
 if (castGroup) castGroup.style.display = 'block';
 if (coProducerGroup) coProducerGroup.style.display = 'block';
 if (directorGroup) directorGroup.style.display = 'block';
 if (executiveProducersGroup) executiveProducersGroup.style.display = 'block';
 if (heroImageUrlGroup) heroImageUrlGroup.style.display = 'block';
 if (musicByGroup) musicByGroup.style.display = 'block';
 if (overviewImageUrlGroup) overviewImageUrlGroup.style.display = 'block';
 if (producerGroup) producerGroup.style.display = 'block';
 if (releaseDateGroup) releaseDateGroup.style.display = 'block';
 if (stageTeaserUrlGroup) stageTeaserUrlGroup.style.display = 'block';
 if (synopsisGroup) synopsisGroup.style.display = 'block';
 if (trailerUrlGroup) trailerUrlGroup.style.display = 'block';
      } else if (isTVShowCollection) {
 // Show TV show-specific fields (and common fields if they exist)
 if (titleGroup) titleGroup.style.display = 'block';
 if (directorGroup) directorGroup.style.display = 'block';
 if (heroImageUrlGroup) heroImageUrlGroup.style.display = 'block';
 if (networkGroup) networkGroup.style.display = 'block';
 if (releaseDateGroup) releaseDateGroup.style.display = 'block';
 if (trailerUrlGroup) trailerUrlGroup.style.display = 'block';
 if (heroImageUrlGroup) heroImageUrlGroup.style.display = 'block';
 if (imageUrlGroup) imageUrlGroup.style.display = 'block';
 if (synopsisGroup) synopsisGroup.style.display = 'block';
      }

 // Always show common fields if they exist
 if(directorGroup) directorGroup.style.display = 'block';
 if(heroImageUrlGroup) heroImageUrlGroup.style.display = 'block';
 if(releaseDateGroup) releaseDateGroup.style.display = 'block';
 if(titleGroup) titleGroup.style.display = 'block';
 if(trailerUrlGroup) trailerUrlGroup.style.display = 'block';

      fetchAndDisplayCollectionData(currentCollection, dataListContainer, populateFormForEdit, editingDocId);
    }


    // Initial collection load
    updateCurrentCollection();

    // Listen for changes in the collection selection
    collectionSelect.addEventListener('change', updateCurrentCollection);

    if (dataForm && dataListContainer && collectionSelect) {
      dataForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const collectionName = collectionSelect.value;

        // Generic data collection from the form
        const data = {
 // Initialize data object with common fields
 title: document.getElementById('title').value.trim(),
        };

 // Add collection-specific fields
 if (collectionName === 'news') {
 data.headline = document.getElementById('headline').value.trim();
 data.contents = document.getElementById('contents').value.trim();
 data.thumbnailPicture = document.getElementById('thumbnailPicture').value.trim();
 } else if (collectionName === 'characters') {
          // Add fields relevant to characters
 data.characterAlias = document.getElementById('characterAlias').value.trim();
 data.characterName = document.getElementById('characterName').value.trim();
 data.heroImageUrl = document.getElementById('heroImageUrl').value.trim();
 data.imageUrl = document.getElementById('imageUrl').value.trim();
 data.synopsis = document.getElementById('synopsis').value.trim();
 }
 // Add fields relevant to other collections
 else {
 // Add fields relevant to other collections if they exist
 data.imageUrl = document.getElementById('imageUrl').value.trim();
 data.description = document.getElementById('description').value.trim(); // Keep description for other collections
 data.releaseYear = document.getElementById('releaseYear').value ? parseInt(document.getElementById('releaseYear').value) : null;
 data.cast = document.getElementById('cast').value ? document.getElementById('cast').value.split(',').map(item => item.trim()) : [];
 data.coProducer = document.getElementById('coProducer').value.trim();
 data.director = document.getElementById('director').value.trim();
 data.executiveProducers = document.getElementById('executiveProducers').value ? document.getElementById('executiveProducers').value.split(',').map(item => item.trim()) : [];
 data.heroImageUrl = document.getElementById('heroImageUrl').value.trim();
 data.musicBy = document.getElementById('musicBy').value.trim();
 data.overviewImageUrl = document.getElementById('overviewImageUrl').value.trim();
 data.producer = document.getElementById('producer').value.trim();
 data.network = document.getElementById('network').value.trim();
 data.releaseDate = document.getElementById('releaseDate').value ? new Date(document.getElementById('releaseDate').value) : null;
 data.stageTeaserUrl = document.getElementById('stageTeaserUrl').value.trim();
 data.synopsis = document.getElementById('synopsis').value.trim();
 data.trailerUrl = document.getElementById('trailerUrl').value.trim();
 }

        try {
          if (editingDocId) {
            await editData(collectionName, editingDocId, data);
            alert('Data updated successfully!');
          } else {
            await addData(collectionName, data);
            alert('Data added successfully!');
          }

          dataForm.reset();
          editingDocId = null;
          fetchAndDisplayCollectionData(collectionName, dataListContainer)
        } catch (error) {
          console.error('Error adding data: ', error);
          alert('Error adding data. Please try again.');
        }
      });
    }
  }

  // Search page logic
  else if (window.location.pathname.includes('search.html')) {
    const searchInput = document.querySelector('.search-area input[type="text"]');
    const searchButton = document.querySelector('.search-area button');
    const resultsGrid = document.querySelector('.results-grid');
    const categoryGrid = document.querySelector('.category-grid');
    let selectedCategory = 'all';

    if (searchInput && searchButton && resultsGrid && categoryGrid) {
      // Category selection
      categoryGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('category-item')) {
          event.preventDefault();
          // Remove active class from other categories
          document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
          });
          // Add active class to selected category
          event.target.classList.add('active');
          selectedCategory = event.target.dataset.category;
          performSearch(searchInput.value.trim(), selectedCategory);
        }
      });

      // Search functionality
      searchButton.addEventListener('click', async (event) => {
        const searchTerm = searchInput.value.trim();
        performSearch(searchTerm, selectedCategory);
      });

      // Perform search function
      async function performSearch(searchTerm, category) {
        resultsGrid.innerHTML = '';
        let collectionName = '';
        let detailPage = '';

        switch (category) {
          case 'movies':
            collectionName = 'movies';
            detailPage = 'movie-detail.html';
            break;
          case 'tvshows':
            collectionName = 'tvshows';
            detailPage = 'tvshows-detail.html';
            break;
          case 'characters':
            collectionName = 'characters';
            detailPage = 'characters-detail.html';
            break;
          case 'news':
            collectionName = 'news';
            detailPage = 'news-detail.html';
            break;
          default:
            collectionName = 'movies'; // Default to movies
            detailPage = 'movie-detail.html';
            break;
        }

        try {
          const collectionRef = db.collection(collectionName);
          const querySnapshot = await collectionRef.orderBy('title').startAt(searchTerm).endAt(searchTerm + '\uf8ff').get();

          if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.forEach(doc => {
              const data = doc.data();
              const resultItem = document.createElement('div');
              resultItem.classList.add('result-item');
              resultItem.innerHTML = `
                <a href="${detailPage}?id=${doc.id}">
                  <img src="${data.imageUrl || 'placeholder.jpg'}" alt="${data.title || 'No Title'}"></a>
                <div class="result-info">
                  <p class="result-title">${data.title}</p>
                  <p class="result-description">${data.description || data.releaseYear || ''}</p>
                </div>
              </a>
            `;
            resultsGrid.appendChild(resultItem);
            });
          } else {
            resultsGrid.innerHTML = '<p>No results found.</p>';
          }
        } catch (error) {
          console.error('Error fetching documents: ', error);
          resultsGrid.innerHTML = '<p>Error fetching search results.</p>';
        }
      }
    }
  }
  // Movie detail page logic
  else if (window.location.pathname.includes('movie-detail.html')) {
    const movieDetailContainer = document.querySelector('.movie-detail-container');

    if (movieDetailContainer) {
      const urlParams = new URLSearchParams(window.location.search);
      const movieId = urlParams.get('id');

      if (movieId) {
        fetchMovieData(movieId);
      } else {
        movieDetailContainer.innerHTML = '<p>Movie not found.</p>';
      }
    }

    async function fetchMovieData(movieId) {
      try {
        const movieRef = db.collection('movies').doc(movieId);
        const doc = await movieRef.get();

        if (doc.exists) {
          const movieData = doc.data();

          const heroBackground = document.querySelector('.hero-section');
          const overviewTitleElement = document.querySelector('.overview h2');
          const movieOverviewTextElement = document.querySelector('#movie-synopsis');
          const executiveProducersElement = document.getElementById('executive-producers');
          const producerElement = document.getElementById('producer');
          const coProducerElement = document.getElementById('co-producer');
          const directorElement = document.getElementById('director');
          const castElement = document.getElementById('cast');
          const musicByElement = document.getElementById('music-by');
          const movieReleaseYearElement = document.getElementById('movie-release-year');
          const movieTrailerVideoElement = document.getElementById('movie-trailer');
          const moviePosterElement = document.getElementById('overview-poster');

          if (heroBackground && movieData.heroImageUrl) {
            heroBackground.style.backgroundImage = `url(${movieData.heroImageUrl || ''})`;
            heroBackground.style.backgroundSize = 'cover';
            heroBackground.style.backgroundPosition = 'center';
          }

          if (movieOverviewTextElement) movieOverviewTextElement.textContent = movieData.synopsis || '';
          if (overviewTitleElement) overviewTitleElement.textContent = 'OVERVIEW';

          if (movieReleaseYearElement) {
            movieReleaseYearElement.textContent = `Release Year: ${movieData.releaseYear}` || 'Release Year not available';
          }

          if (executiveProducersElement && movieData.executiveProducers) {
            if (Array.isArray(movieData.executiveProducers)) {
              executiveProducersElement.textContent = `EXECUTIVE PRODUCERS: ${movieData.executiveProducers.join(', ')}`;
            } else {
              executiveProducersElement.textContent = `EXECUTIVE PRODUCERS: ${movieData.executiveProducers}`;
            }
          }
          if (producerElement && movieData.producer) {
            producerElement.textContent = `PRODUCER: ${movieData.producer}`;
          }
          if (coProducerElement && movieData.coProducer) {
            coProducerElement.textContent = `CO-PRODUCER: ${movieData.coProducer}`;
          }

          if (directorElement && movieData.director) {
            directorElement.textContent = `Director: ${movieData.director}`;
          }

          if (castElement && movieData.cast) {
            if (Array.isArray(movieData.cast)) {
              castElement.textContent = `Cast: ${movieData.cast.join(', ')}`;
            } else {
              castElement.textContent = `Cast: ${movieData.cast}`;
            }
          }
          if (musicByElement && movieData.musicBy) {
            musicByElement.textContent = `MUSIC BY: ${movieData.musicBy}`;
          }

          if (moviePosterElement) moviePosterElement.src = movieData.imageUrl || 'placeholder.jpg';
          const overviewImageElement = document.getElementById('overview-poster');
          if (overviewImageElement && movieData.overviewImageUrl) {
            overviewImageElement.src = movieData.overviewImageUrl;
          }

          const trailerIframe = document.getElementById('movie-trailer');
          if (trailerIframe && movieData.trailerUrl) {
            if (movieData.trailerUrl.includes('youtube.com/embed/')) {
              trailerIframe.src = movieData.trailerUrl;
            } else {
              trailerIframe.src = `https://www.youtube.com/embed/${movieData.trailerUrl}`;
            }
          }

          const mainTitleElement = document.getElementById('movie-title');
          if (mainTitleElement) {
            mainTitleElement.textContent = movieData.title || '';
          }

          const galleryGrid = document.querySelector('.gallery-grid');
          if (galleryGrid && movieData.galleryImages && Array.isArray(movieData.galleryImages)) {
            galleryGrid.innerHTML = '';
            movieData.galleryImages.forEach(imageUrl => {
              const img = document.createElement('img');
              img.src = imageUrl;
              img.alt = 'Gallery Image';
              galleryGrid.appendChild(img);
            });
          } else if (galleryGrid) {
            galleryGrid.innerHTML = '<p>No gallery images available.</p>';
          }
        } else {
          document.querySelector('.movie-detail-container').innerHTML = '<p>Movie not found.</p>';
        }
      } catch (error) {
        console.error('Error fetching movie document:', error);
        document.querySelector('.movie-detail-container').innerHTML = '<p>Error loading movie details.</p>';
      }
    }
  }
  // News detail page logic
  else if (window.location.pathname.includes('news-detail.html')) {
    const newsDetailContainer = document.querySelector('.movie-detail-container');

    if (newsDetailContainer) {
      const urlParams = new URLSearchParams(window.location.search);
      const newsId = urlParams.get('id');

      if (newsId) {
        fetchNewsData(newsId);
      } else {
        newsDetailContainer.innerHTML = '<p>News not found.</p>';
      }
    }

    async function fetchNewsData(newsId) {
      try {
        const newsRef = db.collection('news').doc(newsId);
        const doc = await newsRef.get();

        if (doc.exists) {
          const newsData = doc.data();

          const newsHeadlineElement = document.getElementById('news-headline');
          const newsContentsElement = document.getElementById('news-contents');
          const newsThumbnailElement = document.getElementById('news-thumbnail');
          const heroBackground = document.querySelector('.hero-section');
          const newsContentElement = document.getElementById('news-content');
          const overviewPosterElement = document.getElementById('overview-poster');

          if (newsHeadlineElement) newsHeadlineElement.textContent = newsData.headline || '';
          if (heroBackground && newsData.heroImageUrl) {
            heroBackground.style.backgroundImage = `url(${newsData.heroImageUrl || ''})`;
            heroBackground.style.backgroundSize = 'cover';
            heroBackground.style.backgroundPosition = 'center';
          }

          if (newsContentElement) newsContentElement.textContent = newsData.content || '';
          if (newsContentsElement) newsContentsElement.textContent = newsData.contents || '';

          if (overviewPosterElement && newsData.imageUrl) {
            overviewPosterElement.src = newsData.imageUrl || 'placeholder.jpg';
          }
        } else {
          document.querySelector('.movie-detail-container').innerHTML = '<p>News not found.</p>';
        }
        if (newsThumbnailElement && newsData.thumbnailPicture) {
 newsThumbnailElement.src = newsData.thumbnailPicture || 'placeholder.jpg';
        }
      } catch (error) {
        console.error('Error fetching news document:', error);
        document.querySelector('.movie-detail-container').innerHTML = '<p>Error loading news details.</p>';
      }
    }
  }
  // Character detail page logic
  else if (window.location.pathname.includes('characters-detail.html')) {
    const characterDetailContainer = document.querySelector('.movie-detail-container');

    if (characterDetailContainer) {
      const urlParams = new URLSearchParams(window.location.search);
      const characterId = urlParams.get('id');

      if (characterId) {
        fetchCharacterData(characterId);
      } else {
        characterDetailContainer.innerHTML = '<p>Character not found.</p>';
      }
    }

    async function fetchCharacterData(characterId) {
      try {
        const characterRef = db.collection('characters').doc(characterId);
        const doc = await characterRef.get();

        if (doc.exists) {
          const characterData = doc.data();

          const heroBackground = document.querySelector('.hero-section');
          const characterDescriptionElement = document.getElementById('character-description');
          const overviewPosterElement = document.getElementById('overview-poster');

          if (heroBackground && characterData.heroImageUrl) {
            heroBackground.style.backgroundImage = `url(${characterData.heroImageUrl || ''})`;
            heroBackground.style.backgroundSize = 'cover';
            heroBackground.style.backgroundPosition = 'center';
          }

          if (characterDescriptionElement) characterDescriptionElement.textContent = characterData.description || '';

          if (overviewPosterElement && characterData.imageUrl) {
            overviewPosterElement.src = characterData.imageUrl || 'placeholder.jpg';
          }
        } else {
          document.querySelector('.movie-detail-container').innerHTML = '<p>Character not found.</p>';
        }
      } catch (error) {
        console.error('Error fetching character document:', error);
        document.querySelector('.movie-detail-container').innerHTML = '<p>Error loading character details.</p>';
      }
    }
  }
  // TV Show detail page logic
  else if (window.location.pathname.includes('tvshows-detail.html')) {
    const tvShowDetailContainer = document.querySelector('.movie-detail-container');

    if (tvShowDetailContainer) {
      const urlParams = new URLSearchParams(window.location.search);
      const tvShowId = urlParams.get('id');

      if (tvShowId) {
        fetchTVShowData(tvShowId);
      } else {
        tvShowDetailContainer.innerHTML = '<p>TV Show not found.</p>';
      }
    }

    async function fetchTVShowData(tvShowId) {
      try {
        const tvShowRef = db.collection('tvshows').doc(tvShowId);
        const doc = await tvShowRef.get();

        if (doc.exists) {
          const tvShowData = doc.data();

          const heroBackground = document.querySelector('.hero-section');
          const tvShowDescriptionElement = document.getElementById('tvshow-description');
          const overviewPosterElement = document.getElementById('overview-poster');

          if (heroBackground && tvShowData.heroImageUrl) {
            heroBackground.style.backgroundImage = `url(${tvShowData.heroImageUrl || ''})`;
            heroBackground.style.backgroundSize = 'cover';
            heroBackground.style.backgroundPosition = 'center';
          }

          if (tvShowDescriptionElement) tvShowDescriptionElement.textContent = tvShowData.description || '';

          if (overviewPosterElement && tvShowData.imageUrl) {
            overviewPosterElement.src = tvShowData.imageUrl || 'placeholder.jpg';
          }
        } else {
          document.querySelector('.movie-detail-container').innerHTML = '<p>TV Show not found.</p>';
        }
      } catch (error) {
        console.error('Error fetching tvshow document:', error);
        document.querySelector('.movie-detail-container').innerHTML = '<p>Error loading tvshow details.</p>';
      }
    }
  }
});
