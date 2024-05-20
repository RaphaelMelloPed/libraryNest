import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route} from "react-router-dom";
import Container from "./components/Container/Container";

import Home from "./pages/home/home";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import Licensing from "./pages/licensing/licensing";
import NotFound from "./components/NotFound/NotFound";
import Privacy from "./pages/privacyPolicy/privacyPolicy";

import AllRents from "./pages/rents/allRents";
import EditRent from "./pages/rents/editRents";

import NewUser from "./pages/users/newUsers";
import EditUser from "./pages/users/editUsers";
import UserPage from "./pages/users/userPages";
import LoginUser from "./pages/users/loginUsers";

import OneBook from "./pages/books/oneBook";
import AllBooks from "./pages/books/allBooks";
import EditBooks from "./pages/books/editBooks";

import AllAuthors from "./pages/authors/allAuthors";
import EditAuthors from "./pages/authors/editAuthors";

import AllCategories from "./pages/categories/allCategories";
import EditCategories from "./pages/categories/editCategories";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/licensing" element={<Licensing />} />
          <Route path="/privacypolicy" element={<Privacy />} />

          <Route path="/rents/" element={<AllRents />} />
          <Route path="/rents/update/:id" element={<EditRent />} />

          <Route path="/users" element={<UserPage />} />
          <Route path="/users/new" element={<NewUser />} />
          <Route path="/users/login" element={<LoginUser />} />
          <Route path="/users/update/:id" element={<EditUser />} />

          <Route path="/books" element={<AllBooks />} />
          <Route path="/books/:id" element={<OneBook />} />
          <Route path="/books/update/:id" element={<EditBooks />} />

          <Route path="/authors" element={<AllAuthors />} />
          <Route path="/authors/update/:id" element={<EditAuthors />} />

          <Route path="/categories" element={<AllCategories />} />
          <Route path="/categories/update/:id" element={<EditCategories />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <Footer />
    </>
  );
}

export default App;
