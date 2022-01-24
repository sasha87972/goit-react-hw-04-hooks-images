import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import searchImages from "../../imageFinderApi";
import Loader from "../loader";
import ImageGallery from "../imageGallery";
import Button from "../button";
import Modal from "../modal";
import { Message, Wrapper } from "./searchResult.styles";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function SearchResult({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState("");

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    setStatus(Status.PENDING);
    setImages([]);
  }, [searchQuery]);
  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    searchImages(searchQuery, page)
      .then((loadedImages) => {
        if (loadedImages.hits.length === 0) {
          setStatus(Status.REJECTED);
          toast.error("Wrong search query!!!");
          return;
        }
        setImages((state) => [...state, ...loadedImages.hits]);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setStatus(Status.REJECTED);
      });
  }, [searchQuery, page]);

  const toggleModal = () => {
    setShowModal((state) => !state);
  };
  const showModalImg = (largeImg) => {
    toggleModal();
    largeImg && setModalImg(largeImg);
  };
  const loadNextPage = () => {
    setPage((state) => state + 1);
  };

  if (status === "idle") {
    return <Message>Please enter your search query</Message>;
  }

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "rejected") {
    return <Message>No images match {searchQuery} query</Message>;
  }

  if (status === "resolved") {
    return (
      <>
        <ImageGallery
          items={images}
          onShowModalImg={showModalImg}
          showModal={toggleModal}
        />{" "}
        <Wrapper>
          {" "}
          <Button onButtonClick={loadNextPage} />
        </Wrapper>
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImg.src} alt={modalImg.alt} />
          </Modal>
        )}
      </>
    );
  }
}

SearchResult.propTypes = {
  searchQuery: PropTypes.string,
};
