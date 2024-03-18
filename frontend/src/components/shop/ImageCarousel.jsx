"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function ImageCarousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <a href="#" className="carousel-link">
            <div className="image-slider-1 image-slider"></div>
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="#" className="carousel-link">
            <div className="image-slider-2 image-slider"></div>
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="#" className="carousel-link">
            <div className="image-slider-3 image-slider"></div>
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="#" className="carousel-link">
            <div className="image-slider-4 image-slider"></div>
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="#" className="carousel-link">
            <div className="image-slider-5 image-slider"></div>
          </a>{" "}
        </SwiperSlide>
      </Swiper>
    </>
  );
}
