import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import ImageGallery from './Components/ImageGallery';
import Searchbar from './Components/Searchbar';
import fetchImages from './Components/servises';
import Button from './Components/Button';
import Loader from './Components/Loader';
import Modal from './Components/Modal';

class App extends Component {
  state = {
    images: [],
    searchValue: '',
    page: 1,
    isLoading: false,
    showModal: false,
    error: '',
  };

  maxPages = 0;
  bigURL = '';
  newElementHight = 0;

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.searchValue !== this.state.searchValue &&
        this.state.searchValue !== '') ||
      prevState.page !== this.state.page
    ) {
      this.searchImagesHandler();
    }
  }

  closeModal = () => {
    this.bigURL = '';
    this.setState({ showModal: false });
  };

  showImageHandler = imageUrl => () => {
    this.bigURL = imageUrl;
    this.setState({ showModal: true });
  };

  scrollToHandler = () => {
    const top = document.documentElement.scrollHeight - 150;

    setTimeout(() => {
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }, 300);
  };

  searchImagesHandler = async () => {
    const { searchValue, page } = this.state;
    this.setState({ isLoading: true, error: '' });
    try {
      const result = await fetchImages(searchValue, page);

      if (result.total !== 0) {
        this.maxPages = Math.ceil(result.totalHits / 12);

        this.setState(({ images }) => ({
          images: [...images, ...result.hits],
        }));
      } else {
        toast.info(`По вашему запросу ${searchValue} ничего не найдено!`);
        this.setState(() => ({
          images: [],
        }));
      }
    } catch (error) {
      console.error(error);
      this.setState(() => ({ error: error.toString() }));
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreHandler = () => {
    this.scrollToHandler();
    this.setState(() => ({
      page: Math.min(this.maxPages, this.state.page + 1),
    }));
  };

  onSubmitHandler = searchString => {
    this.maxPages = 0;

    this.setState(() => ({
      images: [],
      searchValue: searchString,
      page: 1,
    }));
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmitHandler} />
        {this.state.error ? (
          <p className="ErrorText">{this.state.error}</p>
        ) : (
          <ImageGallery
            images={this.state.images}
            showImageHandler={this.showImageHandler}
            scrollToHandler={this.scrollToHandler}
          />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.page < this.maxPages && (
          <Button loadMoreHandler={this.loadMoreHandler} />
        )}
        {this.state.showModal && (
          <Modal bigURL={this.bigURL} onClose={this.closeModal}></Modal>
        )}
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}

export default App;

// ============EXAMPLE=========POKEMON======================

// import React, { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import PokemonForm from './Components/PokemonForm';
// import PokemonInfo from './Components/PokemonInfo';

// export default class App extends Component {
//   state = {
//     pokemonName: '',
//   };

//   handleFormSubmit = pokemonName => {
//     this.setState({ pokemonName });
//   };

//   render() {
//     return (
//       <div style={{ maxWidth: 1170, margin: '0 auto', padding: 50 }}>
//         <PokemonForm onSubmit={this.handleFormSubmit} />
//         <PokemonInfo pokemonName={this.state.pokemonName} />
//         <ToastContainer autoClose={3000} />
//       </div>
//     );
//   }
// }
