import { db } from './firebase-config.js';
import { fetchAndDisplayData, displayMovie, displayNews, displayCharacter, displayTVShow, addData, editData, deleteData } from './database-functions.js';

let editingDocId = null;

let currentPath = window.location.pathname;

document.addEventListener('DOMContentLoaded', function () {
  let lastMarvelDoc = null; 
 let lastMarvelTvShowDoc = null; 
 let lastMoreFromDisneyDoc = null; 
 let lastMarvelSeriesDoc = null;
  let lastOtherDoc = null; 

  // Function form for editing
  function populateFormForEdit(data) {
    document.getElementById('title').value = data.title || '';
    document.getElementById('headline').value = data.headline || '';
    document.getElementById('contents').value = data.contents || '';
    document.getElementById('imageUrl').value = data.imageUrl || '';
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
    document.getElementById('releaseDate').value = data.releaseDate ? new Date(data.releaseDate.seconds * 1000).toISOString().split('T')[0] : '';
    document.getElementById('synopsis').value = data.synopsis || '';
    document.getElementById('stageTeaserUrl').value = data.stageTeaserUrl || '';
    document.getElementById('category').value = data.category || '';
    document.getElementById('platform').value = data.platform || '';
    document.getElementById('universe').value = data.universe || '';
    document.getElementById('trailerUrl').value = data.trailerUrl || '';
    document.getElementById('author').value = data.author || '';
    document.getElementById('run-time').value = data.runTime || '';
    document.getElementById('rating').value = data.rating || '';
    document.getElementById('writtenBy').value = data.writtenBy || '';
    document.getElementById('characterAlias').value = data.characterAlias || '';
    document.getElementById('characterName').value = data.characterName || '';
    document.getElementById('thumbnailPicture').value = data.thumbnailPicture || '';
    document.getElementById('articlecontents').value = data.articlecontents || '';
  }

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
  // Admin page functionality
 async function fetchAndDisplayCollectionData(collectionName, dataListContainer, populateFormForEdit) {
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
          populateFormForEdit(itemData);
        });
        listItem.querySelector('.delete-data').addEventListener('click', async () => {
          const docIdToDelete = doc.id;
          const collectionToDeleteFrom = collectionName;
          const itemTitle = itemData.title || 'this item';
          if (confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
 await deleteData(collectionToDeleteFrom, docIdToDelete);
 fetchAndDisplayCollectionData(collectionName, dataListContainer, populateFormForEdit);
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

  if (currentPath.includes('admin.html')) {

    const dataListContainer = document.getElementById('dataList');
    const dataForm = document.getElementById('dataForm');
    const collectionSelect = document.getElementById('collection');
    let currentCollection = collectionSelect.value;

    // Function to update 
 function updateCurrentCollection() {
      currentCollection = collectionSelect.value;
      
      const titleGroup = document.getElementById('title')?.parentElement;
      const headlineGroup = document.getElementById('headline')?.parentElement;
      const contentsGroup = document.getElementById('contents')?.parentElement;
      const characterAliasGroup = document.getElementById('characterAlias')?.parentElement;
      const characterNameGroup = document.getElementById('characterName')?.parentElement;
      const castGroup = document.getElementById('cast')?.parentElement;
      const coProducerGroup = document.getElementById('coProducer')?.parentElement;
      const executiveProducersGroup = document.getElementById('executiveProducers')?.parentElement;
      const imageUrlGroup = document.getElementById('imageUrl')?.parentElement;
      const musicByGroup = document.getElementById('musicBy')?.parentElement;
      const descriptionGroup = document.getElementById('description')?.parentElement;
      const overviewImageUrlGroup = document.getElementById('overviewImageUrl')?.parentElement;
      const producerGroup = document.getElementById('producer')?.parentElement;
      const releaseYearGroup = document.getElementById('releaseYear')?.parentElement;
      const stageTeaserUrlGroup = document.getElementById('stageTeaserUrl')?.parentElement;
      const thumbnailPictureGroup = document.getElementById('thumbnailPicture')?.parentElement;
      const synopsisGroup = document.getElementById('synopsis')?.parentElement;
      const networkGroup = document.getElementById('network')?.parentElement;
      const directorGroup = document.getElementById('director')?.parentElement;
      const heroImageUrlGroup = document.getElementById('heroImageUrl')?.parentElement;
      const releaseDateGroup = document.getElementById('releaseDate')?.parentElement;
      const trailerUrlGroup = document.getElementById('trailerUrl')?.parentElement;
      const authorGroup = document.getElementById('author')?.parentElement;
      const categoryGroup = document.getElementById('category')?.parentElement;
      const platformGroup = document.getElementById('platform')?.parentElement;
      const universeGroup = document.getElementById('universe')?.parentElement;
      const runTimeGroup = document.getElementById('run-time')?.parentElement;
      const ratingGroup = document.getElementById('rating')?.parentElement;
      const writtenByGroup = document.getElementById('writtenBy')?.parentElement;
      const platform1Group = document.getElementById('platform1')?.parentElement;
      const articlecontentsGroup = document.getElementById('articlecontents')?.parentElement;
      
      const allFieldGroups = [
        titleGroup, headlineGroup, contentsGroup, thumbnailPictureGroup,
        descriptionGroup, characterAliasGroup,
        characterNameGroup, castGroup, coProducerGroup,
        executiveProducersGroup, imageUrlGroup, musicByGroup,
        overviewImageUrlGroup, producerGroup, releaseYearGroup, stageTeaserUrlGroup,
        categoryGroup, platformGroup, universeGroup, synopsisGroup, networkGroup, releaseDateGroup, trailerUrlGroup,
        directorGroup, heroImageUrlGroup, authorGroup, runTimeGroup, ratingGroup, writtenByGroup, platform1Group, articlecontentsGroup
      ].filter(group => group !== null && group !== undefined); 

  
 allFieldGroups.forEach(group => {
 group.style.display = 'none';
 });

   
      const isNewsCollection = currentCollection === 'news';
      const isMovieCollection = currentCollection === 'movies';
      const isTVShowCollection = currentCollection === 'tvshows';
      const isCharacterCollection = currentCollection === 'characters';

      if (isNewsCollection) {
        if (titleGroup) titleGroup.style.display = 'block'; 
        if (headlineGroup) headlineGroup.style.display = 'block';
        if (contentsGroup) contentsGroup.style.display = 'block';
        if (articlecontentsGroup) articlecontentsGroup.style.display = 'block';
        if (thumbnailPictureGroup) thumbnailPictureGroup.style.display = 'block';
        if (imageUrlGroup) imageUrlGroup.style.display = 'block';
        if (authorGroup) authorGroup.style.display = 'block';
        if (releaseDateGroup) releaseDateGroup.style.display = 'block';
        if (platform1Group) platform1Group.style.display = 'block';
      

      } else if (isMovieCollection) {
        if (titleGroup) titleGroup.style.display = 'block';
        if (imageUrlGroup) imageUrlGroup.style.display = 'block';
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
        if (categoryGroup) categoryGroup.style.display = 'block';
        if (runTimeGroup) runTimeGroup.style.display = 'block';
        if (ratingGroup) ratingGroup.style.display = 'block';
        if (writtenByGroup) writtenByGroup.style.display = 'block';


      } else if (isTVShowCollection) {
        if (titleGroup) titleGroup.style.display = 'block';
        if (directorGroup) directorGroup.style.display = 'block';
        if (heroImageUrlGroup) heroImageUrlGroup.style.display = 'block';
        if (networkGroup) networkGroup.style.display = 'block';
        if (releaseDateGroup) releaseDateGroup.style.display = 'block';
        if (trailerUrlGroup) trailerUrlGroup.style.display = 'block';
        if (imageUrlGroup) imageUrlGroup.style.display = 'block';
        if (synopsisGroup) synopsisGroup.style.display = 'block';
        if (platformGroup) platformGroup.style.display = 'block';

      } else if (isCharacterCollection) {
        if (titleGroup) titleGroup.style.display = 'block'; 
        if (characterAliasGroup) characterAliasGroup.style.display = 'block';
        if (characterNameGroup) characterNameGroup.style.display = 'block';
        if (universeGroup) universeGroup.style.display = 'block';
        if (heroImageUrlGroup) heroImageUrlGroup.style.display = 'block';
        if (imageUrlGroup) imageUrlGroup.style.display = 'block';
        if (synopsisGroup) synopsisGroup.style.display = 'block';
        if (universeGroup) universeGroup.style.display = 'block';
      }

 fetchAndDisplayCollectionData(currentCollection, dataListContainer, populateFormForEdit);
    }


   
    updateCurrentCollection();

    
    collectionSelect.addEventListener('change', updateCurrentCollection);

    if (dataForm && dataListContainer && collectionSelect) {
      dataForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const collectionName = collectionSelect.value;

     
        const data = {
        }
          switch (collectionName) {
            case 'news':
              if (document.getElementById('title')) data.title = document.getElementById('title').value.trim();
              if (document.getElementById('headline')) data.headline = document.getElementById('headline').value.trim();
              if (document.getElementById('contents')) data.contents = document.getElementById('contents').value.trim();
              if (document.getElementById('articlecontents')) data.articlecontents = document.getElementById('articlecontents').value.trim();
              if (document.getElementById('thumbnailPicture')) data.thumbnailPicture = document.getElementById('thumbnailPicture').value.trim();
              if (document.getElementById('imageUrl')) data.imageUrl = document.getElementById('imageUrl').value.trim();
              if (document.getElementById('author')) data.author = document.getElementById('author').value.trim();
              if (document.getElementById('releaseDate')) data.releaseDate = document.getElementById('releaseDate').value ? new Date(document.getElementById('releaseDate').value) : null;
              if (document.getElementById('platform1')) data.platform1 = document.getElementById('platform1').value.trim();
              break;
            case 'movies':
              if (document.getElementById('title')) data.title = document.getElementById('title').value.trim();
              if (document.getElementById('imageUrl')) data.imageUrl = document.getElementById('imageUrl').value.trim();
              if (document.getElementById('releaseYear')) data.releaseYear = document.getElementById('releaseYear').value ? parseInt(document.getElementById('releaseYear').value) : null;
              if (document.getElementById('cast')) data.cast = document.getElementById('cast').value ? document.getElementById('cast').value.split(',').map(item => item.trim()) : [];
              if (document.getElementById('coProducer')) data.coProducer = document.getElementById('coProducer').value.trim();
              if (document.getElementById('director')) data.director = document.getElementById('director').value.trim();
              if (document.getElementById('executiveProducers')) data.executiveProducers = document.getElementById('executiveProducers').value ? document.getElementById('executiveProducers').value.split(',').map(item => item.trim()) : [];
              if (document.getElementById('heroImageUrl')) data.heroImageUrl = document.getElementById('heroImageUrl').value.trim();
              if (document.getElementById('musicBy')) data.musicBy = document.getElementById('musicBy').value.trim();
              if (document.getElementById('overviewImageUrl')) data.overviewImageUrl = document.getElementById('overviewImageUrl').value.trim();
              if (document.getElementById('producer')) data.producer = document.getElementById('producer').value.trim();
              if (document.getElementById('releaseDate')) data.releaseDate = document.getElementById('releaseDate').value ? new Date(document.getElementById('releaseDate').value) : null;
              if (document.getElementById('synopsis')) data.synopsis = document.getElementById('synopsis').value.trim();
              if (document.getElementById('stageTeaserUrl')) data.stageTeaserUrl = document.getElementById('stageTeaserUrl').value.trim();
              if (document.getElementById('category')) data.category = document.getElementById('category').value.trim();
              if (document.getElementById('run-time')) data.runTime = document.getElementById('run-time').value.trim();
              if (document.getElementById('rating')) data.rating = document.getElementById('rating').value.trim();
              if (document.getElementById('writtenBy')) data.writtenBy = document.getElementById('writtenBy').value.trim();
              if (document.getElementById('trailerUrl')) data.trailerUrl = document.getElementById('trailerUrl').value.trim();
              break;
            case 'tvshows':
              if (document.getElementById('title')) data.title = document.getElementById('title').value.trim();
              if (document.getElementById('director')) data.director = document.getElementById('director').value.trim();
              if (document.getElementById('heroImageUrl')) data.heroImageUrl = document.getElementById('heroImageUrl').value.trim();
              if (document.getElementById('network')) data.network = document.getElementById('network').value.trim();
              if (document.getElementById('releaseDate')) data.releaseDate = document.getElementById('releaseDate').value ? new Date(document.getElementById('releaseDate').value) : null;
              if (document.getElementById('trailerUrl')) data.trailerUrl = document.getElementById('trailerUrl').value.trim();
              if (document.getElementById('imageUrl')) data.imageUrl = document.getElementById('imageUrl').value.trim();
              if (document.getElementById('synopsis')) data.synopsis = document.getElementById('synopsis').value.trim();
              if (document.getElementById('platform')) data.platform = document.getElementById('platform').value.trim();
              break;
            case 'characters':
              if (document.getElementById('title')) data.title = document.getElementById('title').value.trim();
              if (document.getElementById('characterAlias')) data.characterAlias = document.getElementById('characterAlias').value.trim();
              if (document.getElementById('characterName')) data.characterName = document.getElementById('characterName').value.trim();
              if (document.getElementById('universe')) data.universe = document.getElementById('universe').value.trim();
              if (document.getElementById('heroImageUrl')) data.heroImageUrl = document.getElementById('heroImageUrl').value.trim();
              if (document.getElementById('imageUrl')) data.imageUrl = document.getElementById('imageUrl').value.trim();
              if (document.getElementById('synopsis')) data.synopsis = document.getElementById('synopsis').value.trim();
              break;
            default:
              console.warn(`Unknown collection selected: ${collectionName}`);
              break;
          }
          // // Populate generic fields that might be on the form for multiple collections
          // if (document.getElementById('title')) data.title = document.getElementById('title').value.trim();
          // if (document.getElementById('imageUrl')) data.imageUrl = document.getElementById('imageUrl').value.trim();
          // if (document.getElementById('description')) data.description = document.getElementById('description').value.trim();
          // if (document.getElementById('releaseYear')) data.releaseYear = document.getElementById('releaseYear').value ? parseInt(document.getElementById('releaseYear').value) : null;
          // if (document.getElementById('cast')) data.cast = document.getElementById('cast').value ? document.getElementById('cast').value.split(',').map(item => item.trim()) : [];
          // if (document.getElementById('coProducer')) data.coProducer = document.getElementById('coProducer').value.trim();
          // if (document.getElementById('director')) data.director = document.getElementById('director').value.trim();
          // if (document.getElementById('executiveProducers')) data.executiveProducers = document.getElementById('executiveProducers').value ? document.getElementById('executiveProducers').value.split(',').map(item => item.trim()) : [];
          // if (document.getElementById('heroImageUrl')) data.heroImageUrl = document.getElementById('heroImageUrl').value.trim();
          // if (document.getElementById('musicBy')) data.musicBy = document.getElementById('musicBy').value.trim();
          // if (document.getElementById('overviewImageUrl')) data.overviewImageUrl = document.getElementById('overviewImageUrl').value.trim();
          // if (document.getElementById('producer')) data.producer = document.getElementById('producer').value.trim();
          // if (document.getElementById('network')) data.network = document.getElementById('network').value.trim();
          // if (document.getElementById('releaseDate')) data.releaseDate = document.getElementById('releaseDate').value ? new Date(document.getElementById('releaseDate').value) : null;
          // if (document.getElementById('synopsis')) data.synopsis = document.getElementById('synopsis').value.trim();
          // if (document.getElementById('stageTeaserUrl')) data.stageTeaserUrl = document.getElementById('stageTeaserUrl').value.trim();
          // if (document.getElementById('category')) data.category = document.getElementById('category').value.trim();
          // if (document.getElementById('platform')) data.platform = document.getElementById('platform').value.trim();
          // if (document.getElementById('universe')) data.universe = document.getElementById('universe').value.trim();
          // if (document.getElementById('trailerUrl')) data.trailerUrl = document.getElementById('trailerUrl').value.trim();
          // if (document.getElementById('author')) data.author = document.getElementById('author').value.trim();
          // if (document.getElementById('run-time')) data.runTime = document.getElementById('run-time').value.trim();
          // if (document.getElementById('rating')) data.rating = document.getElementById('rating').value.trim();
          // if (document.getElementById('writtenBy')) data.writtenBy = document.getElementById('writtenBy').value.trim();
          // if (document.getElementById('platform1')) data.platform1 = document.getElementById('platform1').value.trim();
          // if (document.getElementById('thumbnailPicture')) data.thumbnailPicture = document.getElementById('thumbnailPicture').value.trim();
          // if (document.getElementById('headline')) data.headline = document.getElementById('headline').value.trim();
          // if (document.getElementById('contents')) data.contents = document.getElementById('contents').value.trim();
          // if (document.getElementById('characterAlias')) data.characterAlias = document.getElementById('characterAlias').value.trim();
          // if (document.getElementById('characterName')) data.characterName = document.getElementById('characterName').value.trim();
          console.log('editingDocId before add/edit:', editingDocId);
   console.log('Data object being sent:', data);

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

          fetchAndDisplayCollectionData(collectionName, dataListContainer, populateFormForEdit)
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
      categoryGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('category-item')) {
          event.preventDefault();
          
          document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
          });
          
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
            collectionName = 'movies'; 
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

  // Index Page
  if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    const moviesGrid = document.querySelector('.movies .movie-grid');
    const blogGrid = document.querySelector('.blog-posts .blog-grid');
    const itemsPerSection = 6; 

    async function fetchLatestMovies(limit) {
      try {
        const querySnapshot = await db.collection('movies').orderBy('releaseYear', 'desc').limit(limit).get();
        const moviesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return moviesData;
      } catch (error) {
        console.error('Error fetching latest movies:', error);
        return [];
      }
    }

    async function fetchLatestNews(limit) {
      try {
        const querySnapshot = await db.collection('news').orderBy('releaseDate', 'desc').limit(limit).get();
        const newsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return newsData;
      } catch (error) {
        console.error('Error fetching latest news:', error);
        return [];
      }
    }

    function displayMovies(movies, container) {
      if (!container) return;
      container.innerHTML = ''; 
      movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item'); 
        movieItem.innerHTML = `
          
            <a href="movie-detail.html?id=${movie.id}"><img src="${movie.imageUrl || 'placeholder.jpg'}" alt="${movie.title || 'No Title'}"></a>
            <div class="movie-info">
            <p class="movie-title">${movie.title || 'No Title'}</p>
            <p class="movie-date">${movie.releaseYear || 'No Date'}</p>
            </div>
            `;
        container.appendChild(movieItem);
      });
    }

    // display news
    function displayNews(news, container) {
      if (!container) return;
      container.innerHTML = ''; 
      news.forEach(article => {
        const newsArticle = document.createElement('div');
        newsArticle.classList.add('blog-card'); 
        newsArticle.innerHTML = `
          <a href="news-detail.html?id=${article.id}">
            <img src="${article.imageUrl || 'placeholder.jpg'}" alt="${article.title || 'No Title'}">
            </a>
            <h3 class="article-title">${article.title || 'No Title'}</h3>
            
          
        `;
        container.appendChild(newsArticle);
      });
    }

   
    fetchLatestMovies(itemsPerSection).then(movies => displayMovies(movies, moviesGrid));
    fetchLatestNews(itemsPerSection).then(news => displayNews(news, blogGrid));
  }

  // Movies Page
  else if (window.location.pathname.includes('movies.html')) {
    const marvelMovieGridContainer = document.querySelector('.movies .marvel-movie-grid'); // Container for Marvel Movies
    const otherMovieGridContainer = document.querySelector('.other-movies-section .other-movie-grid');  // Container for Other Movies
    const loadMoreMarvelButton = document.getElementById('load-more-marvel-movies');
    const loadMoreOtherButton = document.getElementById('load-more-other-movies');
    const moviesPerPage = 36;
    const otherPerPage = 4;

async function fetchMoviesData(collectionName, limit, lastDoc = null, category = null) {
 try {
 console.log(`Fetching movies: collection=${collectionName}, limit=${limit}, category=${category}, lastDoc exists: ${!!lastDoc}`); // Debugging log
 let query = db.collection(collectionName);
      if (category) {
query = query.where('category', '==', category);
          }
      query = query.orderBy('releaseDate', 'desc').limit(limit);
 if (lastDoc) {
 query = query.startAfter(lastDoc);
 }

      const querySnapshot = await query.get();
 if (querySnapshot.empty) {
 return []; 
 }
 return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
 
      } catch (error) {
        console.error('Error fetching Movies: ', error);
        return [];
      }
    }
 function displayMovies(movies, containerSelector, append = false) {
    const container = document.querySelector(containerSelector);
      if (!container) {
        console.error(`Element with selector ${containerSelector} not found.`);
        return;
      }

      if (!append) {
        container.innerHTML = ''; 
      }

      movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-card'); 
        movieItem.innerHTML = `
          <a href="movie-detail.html?id=${movie.id}">
            <img src="${movie.imageUrl || 'placeholder.jpg'}" alt="${movie.title || 'No Title'}"></a>
            <div class="movie-info">
            <p class="movie-title">${movie.title || 'No Title'}</p>
            <p class="movie-date">${movie.releaseYear || 'No Date'}</p>
            </div>
        `;
        container.appendChild(movieItem);
      });
    }

    
    if (marvelMovieGridContainer) {
      console.log('Marvel movie grid container found. Fetching Marvel movies.'); 
      fetchMoviesData('movies', moviesPerPage, null, 'marvel').then(movies => {
        console.log('fetchMoviesData (marvel) returned movies:', movies); 
       if (movies.length > 0) {
        displayMovies(movies, '.movies .marvel-movie-grid');
 lastMarvelDoc = movies[movies.length - 1]; 
 loadMoreMarvelButton.style.display = 'none';
 }
      }).catch(error => console.error('Error fetching initial Marvel movies:', error));
    }

    // Initial load of Other Movies
    if (otherMovieGridContainer) { 
 console.log('Other movie grid container found and is empty. Fetching Other movies.'); 
 fetchMoviesData('movies', otherPerPage, null, 'other').then(movies => { 
 console.log('fetchMoviesData (other) returned movies:', movies);
 if (movies.length > 0) {
 displayMovies(movies, '.other-movies-section .other-movie-grid'); 
 lastOtherDoc = movies[movies.length - 1];
 loadMoreOtherButton.style.display = 'none';
 }
 }).catch(error => console.error('Error fetching initial Other movies:', error));
    }

    // Load more button functionality for Marvel Movies
    if (loadMoreMarvelButton) {
 loadMoreMarvelButton.addEventListener('click', async () => {
 const newMovies = await fetchMoviesData('movies', moviesPerPage, lastMarvelDoc, 'marvel');
 displayMovies(newMovies, '.movies .marvel-movie-grid', true); 
 if (newMovies.length > 0) {
 lastMarvelDoc = newMovies[newMovies.length - 1]; 
 }
      if (newMovies.length < moviesPerPage) {
        loadMoreMarvelButton.style.display = 'none';
      }
      });
    }

    // Load more button functionality for Other Movies
    if (loadMoreOtherButton) {
 loadMoreOtherButton.addEventListener('click', async () => {
 const newotherMovies = await fetchMoviesData('movies', otherPerPage, lastOtherDoc, 'other');
 displayMovies(newotherMovies, '.other-movies-section .other-movie-grid', true); 
 if (newotherMovies.length > 0) {
 lastOtherDoc = newotherMovies[newotherMovies.length - 1]; 
 }
      if (newotherMovies.length < otherPerPage) {
        loadMoreOtherButton.style.display = 'none';
      }
 });
    }
  }
  // Movie Detail Page
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

          //  elements for movie details
          const heroBackground = document.querySelector('.hero-section');
          const mainTitleElement = document.getElementById('movie-title'); 
          const directorNameElement = document.getElementById('director-name');
          const castListElement = document.getElementById('cast-list');
          const executiveProducersListElement = document.getElementById('executive-producers-list');
          const producerNameElement = document.getElementById('producer-name');
          const coProducerNameElement = document.getElementById('co-producer-name');
          const musicByNameElement = document.getElementById('music-by-name');
          const releaseYearTextElement = document.getElementById('release-year-text');
          const overviewPosterElement = document.getElementById('overview-poster');
          const trailerIframeElement = document.getElementById('movie-trailer'); 
          const overviewImageElement = document.getElementById('overview-poster');

        
          if (heroBackground && movieData.heroImageUrl) {
            heroBackground.style.backgroundImage = `url(${movieData.heroImageUrl || ''})`;
            heroBackground.style.backgroundSize = 'cover';
            heroBackground.style.backgroundPosition = 'center';
          }

          if (mainTitleElement) mainTitleElement.textContent = movieData.title || '';
          if (document.getElementById('synopsis-text')) document.getElementById('synopsis-text').textContent = movieData.synopsis || ''; // Assuming you have an element with this ID for the synopsis

          if (castListElement && movieData.cast) {
 if (Array.isArray(movieData.cast)) {
 castListElement.textContent = movieData.cast.join(', ');
 } else {
 castListElement.textContent = movieData.cast; 
 }
          }

 if (directorNameElement) directorNameElement.textContent = movieData.director || '';

          if (executiveProducersListElement && movieData.executiveProducers) {
 if (Array.isArray(movieData.executiveProducers)) {
 executiveProducersListElement.textContent = movieData.executiveProducers.join(', ');
 } else {
 executiveProducersListElement.textContent = movieData.executiveProducers; 
 }
          }
 if (musicByNameElement) musicByNameElement.textContent = movieData.musicBy || '';
          if (producerNameElement) producerNameElement.textContent = movieData.producer || '';
          if (coProducerNameElement) coProducerNameElement.textContent = movieData.coProducer || '';

          if (releaseYearTextElement) {
            releaseYearTextElement.textContent = `Release Year: ${movieData.releaseYear}` || 'Release Year not available';
          }

          if (overviewPosterElement) overviewPosterElement.src = movieData.imageUrl || 'placeholder.jpg';

          if (overviewImageElement && movieData.overviewImageUrl) {
            overviewImageElement.src = movieData.overviewImageUrl;
          }

          if (trailerIframeElement && movieData.trailerUrl) {
            trailerIframeElement.src = movieData.trailerUrl;
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

  // News Detail Page
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
          const heroBackground = document.querySelector('.hero-section');
          const articlecontentsElement = document.getElementById('news-content');
          const newsTitleElement = document.getElementById('news-title');
          const newsAuthorElement = document.getElementById('news-author');
          const newsCategoryElement = document.getElementById('news-category');
          const newsReleaseDateElement = document.getElementById('news-releaseDate');
          const newsImageUrlElement = document.getElementById('news-image-url');
          const newsThumbnailElement = document.getElementById('news-thumbnail');
          const overviewPosterElement = document.getElementById('overview-poster');

          if (newsHeadlineElement) newsHeadlineElement.textContent = newsData.headline || '';
          if (heroBackground && newsData.heroImageUrl) {
            heroBackground.style.backgroundImage = `url(${newsData.heroImageUrl || ''})`;
            heroBackground.style.backgroundSize = 'cover';
            heroBackground.style.backgroundPosition = 'center';
          }
          
          if (newsContentsElement) newsContentsElement.innerHTML = newsData.contents || '';
 

         
          if (newsTitleElement) newsTitleElement.textContent = newsData.title || '';
          if (newsAuthorElement) newsAuthorElement.textContent = `By: ${newsData.author || 'N/A'}`;
          if (newsCategoryElement) newsCategoryElement.textContent = ` ${newsData.platform1 || 'N/A'}`;

          if (newsReleaseDateElement && newsData.releaseDate) {
            try {
              const releaseDate = new Date(newsData.releaseDate.seconds * 1000);
 newsReleaseDateElement.textContent = `Published: ${releaseDate.toLocaleDateString()}`;
            } catch (error) {
              console.error('Error formatting release date:', error);
              newsReleaseDateElement.textContent = 'Release Date: N/A';
            }
          } else if (newsReleaseDateElement) {
            newsReleaseDateElement.textContent = 'Release Date: N/A';
          }

          if (newsImageUrlElement) newsImageUrlElement.src = newsData.imageUrl || 'placeholder.jpg';
          if (overviewPosterElement && newsData.imageUrl) {
            overviewPosterElement.src = newsData.imageUrl || 'placeholder.jpg';
          }
if (articlecontentsElement) {
 articlecontentsElement.innerHTML = newsData.articlecontents || '';
 }
 if (document.getElementById('news-thumbnail') && newsData.thumbnailPicture) {
 document.getElementById('news-thumbnail').src = newsData.thumbnailPicture || 'placeholder.jpg';
          }
        } else {
          document.querySelector('.movie-detail-container').innerHTML = '<p>News not found.</p>';
        }
      } catch (error) {
        console.error('Error fetching news document:', error);
        document.querySelector('.movie-detail-container').innerHTML = '<p>Error loading news details.</p>';
      }
    }
  }

  // Character Detail Page
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

          const characterTitleElement = document.getElementById('character-title');
          const characterAliasElement = document.getElementById('character-alias');
          const characterNameElement = document.getElementById('character-name');
          const characterUniverseElement = document.getElementById('character-universe');

          const heroBackground = document.querySelector('.hero-section');
          const characterDescriptionElement = document.getElementById('character-description');
          const overviewPosterElement = document.getElementById('overview-poster');

          if (heroBackground && characterData.heroImageUrl) {
            heroBackground.style.backgroundImage = `url(${characterData.heroImageUrl || ''})`;
            heroBackground.style.backgroundSize = 'cover';
            heroBackground.style.backgroundPosition = 'center';
          }

          if (characterTitleElement) characterTitleElement.textContent = characterData.title || 'N/A';
          if (characterAliasElement) characterAliasElement.textContent = `Alias: ${characterData.characterAlias || 'N/A'}`;
          if (characterNameElement) characterNameElement.textContent = `Name: ${characterData.characterName || 'N/A'}`;
          if (characterUniverseElement) characterUniverseElement.textContent = `Universe: ${characterData.universe || 'N/A'}`;
          if (characterDescriptionElement) characterDescriptionElement.textContent = characterData.synopsis || 'No synopsis available.';

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

  // TV Show Detail Page
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

    async function fetchTVShowData(tvshowId) {
      try {
        const tvShowRef = db.collection('tvshows').doc(tvshowId);
        const doc = await tvShowRef.get();

        if (doc.exists) {
          const tvShowData = doc.data();

          // Get references to the HTML elements
          const heroBackground = document.querySelector('.hero-section');
          const tvShowTitleElement = document.getElementById('tvshow-title');
          const tvShowDirectorElement = document.getElementById('tvshow-director');
          const tvShowNetworkElement = document.getElementById('tvshow-network');
          const tvShowPlatformElement = document.getElementById('tvshow-platform');
          const tvShowReleaseDateElement = document.getElementById('tvshow-release-date');
          const tvShowSynopsisElement = document.getElementById('tvshow-synopsis');
          const tvShowTrailerElement = document.getElementById('tvshow-trailer'); 
          const overviewPosterElement = document.getElementById('overview-poster');
          const overviewImageElement = document.getElementById('overview-poster');

   
          if (heroBackground && tvShowData.heroImageUrl) {
            heroBackground.style.backgroundImage = `url(${tvShowData.heroImageUrl || ''})`;
            heroBackground.style.backgroundSize = 'cover';
            heroBackground.style.backgroundPosition = 'center';
          }
       
          if (tvShowTitleElement) tvShowTitleElement.textContent = tvShowData.title || 'N/A';
          if (tvShowDirectorElement) tvShowDirectorElement.textContent = `Director: ${tvShowData.director || 'N/A'}`;
          if (tvShowNetworkElement) tvShowNetworkElement.textContent = `Network: ${tvShowData.network || 'N/A'}`;
          if (tvShowPlatformElement) tvShowPlatformElement.textContent = `Platform: ${tvShowData.platform || 'N/A'}`;

          if (tvShowReleaseDateElement && tvShowData.releaseDate) {
            try {
              const releaseDate = new Date(tvShowData.releaseDate.seconds * 1000);
              tvShowReleaseDateElement.textContent = `Release Date: ${releaseDate.toLocaleDateString()}`;
            } catch (error) {
              console.error('Error formatting TV show release date:', error);
              tvShowReleaseDateElement.textContent = 'Release Date: N/A';
            }
          } else if (tvShowReleaseDateElement) {
            tvShowReleaseDateElement.textContent = 'Release Date: N/A';
          }
          if (overviewPosterElement) overviewPosterElement.src = tvShowData.imageUrl || 'placeholder.jpg';

          if (overviewImageElement && tvShowData.overviewImageUrl) {
            overviewImageElement.src = tvShowData.overviewImageUrl;
          }
          if (tvShowSynopsisElement) tvShowSynopsisElement.textContent = tvShowData.synopsis || 'No synopsis available.';

          if (tvShowTrailerElement && tvShowData.trailerUrl) {
        
            if (tvShowData.trailerUrl.includes('youtube.com') || tvShowData.trailerUrl.includes('youtu.be')) {
              const youtubeVideoId = getYouTubeVideoId(tvShowData.trailerUrl);
              if (youtubeVideoId) {
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${youtubeVideoId}`;
                iframe.width = "560";
                iframe.height = "315";
                iframe.setAttribute("allowfullscreen", "");
                iframe.setAttribute("frameborder", "0");
                tvShowTrailerElement.innerHTML = ''; 
                tvShowTrailerElement.appendChild(iframe);
              } else {
                tvShowTrailerElement.innerHTML = `<p>Invalid YouTube URL.</p>`;
              }
            } else {
              tvShowTrailerElement.innerHTML = `<p>Trailer: <a href="${tvShowData.trailerUrl}" target="_blank">${tvShowData.trailerUrl}</a></p>`;
            }
          } else if (tvShowTrailerElement) {
 tvShowTrailerElement.innerHTML = '<p>No trailer available.</p>';
          }}
 } catch (error) {
        console.error('Error fetching tvshow document:', error);
        document.querySelector('.movie-detail-container').innerHTML = '<p>Error loading tvshow details.</p>';
      }
      }

  
  function getYouTubeVideoId(url) {
    let videoId = null;
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = url.match(regex);
    if (match && match[1]) {
 videoId = match[1];
    }
    return videoId;
  }


  }
  // Characters Page
  else if (window.location.pathname.includes('characters.html')) {
    const marvelCharactersGrid = document.querySelector('.marvel-characters-section .character-list');
    const otherCharactersGrid = document.querySelector('.other-characters-section .character-list');
    const loadMoreButton = document.querySelector('.characters-page-container .load-more');
 const charactersPerPage = 12; 
    let currentCharacterPage = 0;

    async function fetchCharactersData(limit, offset, universe = null) {
      try {
        let query = db.collection('characters').orderBy('characterName').limit(limit);
 if (offset > 0) {
          const lastDoc = await db.collection('characters').orderBy('characterName').limit(offset).get().then(snapshot => {
            return snapshot.docs[snapshot.docs.length - 1];
          });
          query = db.collection('characters').orderBy('characterName').startAfter(lastDoc).limit(limit);
        }
 if (universe) {
          query = query.where('universe', '==', universe);
 }
        const querySnapshot = await query.get();
        const charactersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return charactersData;
      } catch (error) {
        console.error('Error fetching characters: ', error);
        return [];
      }
    }

    function displayCharacters(characters, containerSelector, append = false) {
      const container = document.querySelector(containerSelector);
      if (!container) {
        console.error(`Element with selector ${containerSelector} not found.`);
        return;
 }
 if (!append) {
        container.innerHTML = ''; 
      }

      characters.forEach(character => {
        const characterItem = document.createElement('div');
        characterItem.classList.add('character-card'); 
        characterItem.innerHTML = `
          <a href="characters-detail.html?id=${character.id}">
            <img src="${character.imageUrl || 'placeholder.jpg'}" alt="${character.characterName || 'No Name'}"></a>
          </a>
            <div class="character-info">
            <p class="character-title">${character.characterAlias || 'No Alias'}</p>
            <p class="character-series">${character.characterName || 'No Name'}</p>
          </div>
          
        `;
        container.appendChild(characterItem);
      });
    }

    // Initial load of characters
    if (marvelCharactersGrid) {
 fetchCharactersData(charactersPerPage, 0, 'marvel').then(characters => { 
        displayCharacters(characters, '.marvel-characters-section .character-list');
        currentCharacterPage = 1;
      });
    }

    
    setTimeout(() => {
     
 fetchCharactersData(charactersPerPage, 0, 'other').then(characters => { 
        displayCharacters(characters, '.other-characters-section .character-list');
      });
    }, 100); 

    
    function getCharacterUniverse(element) {
      if (element.closest('.marvel-characters-section')) return 'marvel';
      if (element.closest('.other-characters-section')) return 'other';
    }

   
    if (loadMoreButton) {
      loadMoreButton.addEventListener('click', async () => {
        const newCharacters = await fetchCharactersData(charactersPerPage, currentCharacterPage * charactersPerPage);
        displayCharacters(newCharacters, '.marvel-characters-section .character-list .other-characters-section .character-list', true); 
        currentCharacterPage++;
      });
    }
  }

  // News Page
  else if (window.location.pathname.includes('news.html')) {
    const latestNewsArticlesContainer = document.querySelector('.latest-news-section .news-articles');
    const latestTvShowsNewsArticlesContainer = document.querySelector('.latest-tv-shows-news-section .news-articles');
    const loadMoreButtons = document.querySelectorAll('.news-page-container .load-more');
    const newsPerPage = 8; 

 async function fetchNewsData(collectionName, limit, lastDoc = null, platform1 = null) {
 console.log(`Fetching news: collection=${collectionName}, limit=${limit}, platform1=${platform1}, lastDoc exists: ${!!lastDoc}`);
      try {
 let query = db.collection(collectionName);
        if (platform1) {
        query = query.where('platform1', '==', platform1);
 console.log('Query with platform1 filter:', query); 
        }
        query = query.orderBy('releaseDate', 'desc').limit(limit);
        const querySnapshot = await query.get();
        const newsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
 console.log('Fetched news data:', newsData); 
        return newsData;
      } catch (error) {
        console.error('Error fetching news: ', error);
        return [];
      }
    }

    function displayNewsArticles(news, containerSelector, append = false) {
 console.log('displayNewsArticles called with news:', news); 
 const container = document.querySelector(containerSelector);
 console.log('Container element:', container); 
 if (!container) {
        console.error(`Element with selector ${containerSelector} not found.`);
        return;
      }

      if (!append) {
        container.innerHTML = '';
      }

      news.forEach(article => {
 console.log('Processing news article:', article); 
        const newsArticle = document.createElement('div');
        newsArticle.classList.add('news-article');
        newsArticle.innerHTML = `
         <a href="news-detail.html?id=${article.id}">
            <img class="blog-post-image" src="${article.imageUrl || 'placeholder.jpg'}" alt="${article.title || 'No Title'}">
            </a>
            <p class="article-date">${article.releaseDate ? new Date(article.releaseDate.seconds * 1000).toLocaleDateString() : 'No Date'}</p>
            <h1 class="article-title">${article.title || 'No Title'}</h1>
        
        `;
        container.appendChild(newsArticle);
      });
    }

    // Initial load of latest news
 if (latestNewsArticlesContainer) {
      let lastNewsDoc = null; 
      fetchNewsData('news', newsPerPage, null, 'MOVIES').then(news => {
        displayNewsArticles(news, '.latest-news-section .news-articles', false); 
 if (news.length > 0) {
 lastNewsDoc = news[news.length - 1]; 
 }
      });
    }
    if (latestTvShowsNewsArticlesContainer) {
      let lastTvShowNewsDoc = null; 
 fetchNewsData('news', newsPerPage, null, 'TV SHOWS').then(tvNews => { 
        displayNewsArticles(tvNews, '.latest-tv-shows-news-section .news-articles');
 if (tvNews.length > 0) {
 lastTvShowNewsDoc = tvNews[tvNews.length - 1];
 }
      });
    }

    loadMoreButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const parentSection = button.closest('.latest-news-section') || button.closest('.latest-tv-shows-news-section');
        let platform1 = null;
        let containerSelector = null;

        if (parentSection && parentSection.classList.contains('latest-news-section')) {
          platform1 = 'MOVIES';
          containerSelector = '.latest-news-section .news-articles';
        } else if (parentSection && parentSection.classList.contains('latest-tv-shows-news-section')) {
          platform1 = 'TV SHOWS';
          containerSelector = '.latest-tv-shows-news-section .news-articles';
        } else {
          console.error('Could not determine news category for load more button.');
          return;
        }

        let lastDoc = null;
        if (platform1 === 'MOVIES') {
          lastDoc = lastNewsDoc;
        } else if (platform1 === 'TV SHOWS') {
          lastDoc = lastTvShowNewsDoc;
        }

        const newNews = await fetchNewsData('news', newsPerPage, lastDoc, platform1);
        displayNewsArticles(newNews, containerSelector, true); 
 if (newNews.length > 0) {
          if (platform1 === 'MOVIES') lastNewsDoc = newNews[newNews.length - 1];
          else if (platform1 === 'TV SHOWS') lastTvShowNewsDoc = newNews[newNews.length - 1];
        }
      });
    });
  }

  // TV Shows Page
  else if (window.location.pathname.includes('tvshows.html')) {
    const marvelTvShowsGrid = document.querySelector('.tv-shows-grid-section:nth-of-type(1) .tv-show-grid'); 
    const moreFromDisneyGrid = document.querySelector('.tv-shows-grid-section:nth-of-type(2) .tv-show-grid');
    const marvelSeriesGrid = document.querySelector('.tv-shows-grid-section:nth-of-type(3) .tv-show-grid'); 
    const loadMoreButtons = document.querySelectorAll('.tv-shows-grid-section .load-more');
    const tvShowsPerPage = 12; 

 async function fetchTvShowsData(collectionName, limit, lastDoc = null, platform = null) {
      try {
 let query = db.collection(collectionName);
 if (platform) {
 query = query.where('platform', '==', platform);
 }
 query = query.orderBy('releaseDate', 'desc').limit(limit);
 if (lastDoc) {
 query = query.startAfter(lastDoc);
 }
 
        const querySnapshot = await query.get();
 return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return tvShowsData;

      } catch (error) {
        console.error('Error fetching TV shows: ', error);
        return [];
      }
    }

    function displayTvShows(tvshows, containerSelector, append = false) {
      const container = document.querySelector(containerSelector);
      if (!container) {
        console.error(`Element with selector ${containerSelector} not found.`);
        return;
      }

 if (!append) {
        container.innerHTML = ''; 
      }

      tvshows.forEach(tvshows => {
        const tvShowItem = document.createElement('div');
        tvShowItem.classList.add('tv-show-item');
        tvShowItem.innerHTML = `
          <a href="tvshows-detail.html?id=${tvshows.id}">
            <img src="${tvshows.imageUrl || 'placeholder.jpg'}" alt="${tvshows.title || 'No Title'}">
            </a>
            <p class="tv-show-title">${tvshows.title || 'No Title'}</p>
            <p class="tv-show-release">${tvshows.releaseDate ? new Date(tvshows.releaseDate.seconds * 1000).toLocaleDateString() : (tvshows.releaseYear || 'No Date')}</p>
        `;
        container.appendChild(tvShowItem);
      });
    }

   
    if (marvelTvShowsGrid) {
      fetchTvShowsData('tvshows', tvShowsPerPage, null, 'Disney+').then(tvshows => {
      displayTvShows(tvshows, '.tv-shows-grid-section:nth-of-type(1) .tv-show-grid');
 if (tvshows.length > 0) {
 lastMarvelTvShowDoc = tvshows[tvshows.length - 1];
 }
      });
    }

 if (moreFromDisneyGrid) {
 fetchTvShowsData('tvshows', tvShowsPerPage, null, 'disneyplus-other').then(tvshows => {
 displayTvShows(tvshows, '.tv-shows-grid-section:nth-of-type(2) .tv-show-grid');
 if (tvshows.length > 0) {
 lastMoreFromDisneyDoc = tvshows[tvshows.length - 1];
 }
      });
    }

    if (marvelSeriesGrid) {
 fetchTvShowsData('tvshows', tvShowsPerPage, null, 'Disney+').then(tvshows => {
 displayTvShows(tvshows, '.tv-shows-grid-section:nth-of-type(3) .tv-show-grid');
 if (tvshows.length > 0) {
 lastMarvelSeriesDoc = tvshows[tvshows.length - 1];
 }
      });
    }
 
    loadMoreButtons.forEach((button, index) => {
 button.addEventListener('click', async () => {
        const parentSection = button.closest('.tv-shows-grid-section');
        let platform = null;
        if (index === 0) platform = 'Disney+';
        else if (index === 1) platform = 'disneyplus-other';
        else if (index === 2) platform = 'Disney+';

        let lastDoc = null;
        if (index === 0) lastDoc = lastMarvelTvShowDoc;
        else if (index === 1) lastDoc = lastMoreFromDisneyDoc;
        else if (index === 2) lastDoc = lastMarvelSeriesDoc;

        const newTvShows = await fetchTvShowsData('tvshows', tvShowsPerPage, lastDoc, platform);

        if (newTvShows.length > 0) {
 displayTvShows(newTvShows, parentSection.querySelector('.tv-show-grid'), true); 
          if (index === 0) lastMarvelTvShowDoc = newTvShows[newTvShows.length - 1];
          else if (index === 1) lastMoreFromDisneyDoc = newTvShows[newTvShows.length - 1];
          else if (index === 2) lastMarvelSeriesDoc = newTvShows[newTvShows.length - 1];
        } else {
 button.style.display = 'none'; 
        }
      });
    });
  }
});