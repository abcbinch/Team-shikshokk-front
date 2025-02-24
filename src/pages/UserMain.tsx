import React, { useState } from "react";
import "../styles/UserMain.scss";
import pizza from "../assets/pizza.jpg";
import pizza2 from "../assets/pizza2.jpg";
import vietnam from "../assets/vietnam.jpg";
import mexican from "../assets/mexican.jpg";
import burger from "../assets/burger.jpg";
import Header from "../components/Header/Header";

const UserMain: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("서울시 종로구");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(event.target.value);
  };

  const foodItems = Array(8).fill("패스트푸드");
  const images = [pizza, pizza2, vietnam, mexican];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Header nickname="사용자 이름" /> {/* 여기에 사용자 이름을 전달 */}
      <div className="user-main">
        <header className="header">
          <div className="header-controls">
            <div className="search-container">
              <select
                value={selectedArea}
                onChange={handleAreaChange}
                className="area-select"
              >
                <option value="서울시 종로구">서울시 종로구</option>
                <option value="서울시 강남구">서울시 강남구</option>
                <option value="부산시 해운대구">부산시 해운대구</option>
                {/* 추가 지역 옵션 */}
              </select>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="검색할 음식을 입력하세요..."
                className="search-input"
              />
            </div>
          </div>
        </header>
        <div className="banner">
          <div className="slider">
            <button className="slider-button prev" onClick={prevSlide}>
              &#10094; {/* 이전 버튼 */}
            </button>
            <img
              src={images[currentIndex]}
              alt="피자"
              className="banner-image"
            />
            <button className="slider-button next" onClick={nextSlide}>
              &#10095; {/* 다음 버튼 */}
            </button>
          </div>
          <h1 className="banner-title">
            every day <span className="highlight">Shik - Shok</span>
          </h1>
        </div>
        <div className="food-grid">
          {foodItems.map((item, index) => (
            <div
              key={index}
              className={`food-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={burger} // burger 이미지로 대체
                alt="음식"
                className="food-image"
              />
              <p className="food-name">{item}</p>
            </div>
          ))}
        </div>
        {/* STORE 섹션 */}
        <div className="store-section">
          <h2 className="store-title">STORE</h2>
          <div className="store-grid">
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="store-item">
                  <img src={pizza} alt="피자" className="store-image" />
                  <div className="store-info">
                    <h3 className="store-name">PIZZA DOMINO</h3>
                    <div className="store-rating">
                      <span className="rating-circle">4.8</span>
                    </div>
                    <p className="store-description">PIZZA</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMain;
