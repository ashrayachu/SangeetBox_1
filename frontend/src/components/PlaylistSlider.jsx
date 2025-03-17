import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const PlaylistSlider = ({ title, playlists }) => {
const navigate = useNavigate()
    const handlePlaylist = (id) => {
      navigate(`/playlist/${id}`)
    }
    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>

            {playlists?.length > 0 && (
                <Swiper
                    slidesPerView={1} // Number of items visible at once
                    spaceBetween={20} // Gap between items
                    freeMode={true} // Enables smooth scrolling
                    pagination={{ clickable: true }} // Adds pagination dots
                    breakpoints={{
                        640: { slidesPerView: 3    },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 6 },
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    {playlists?.map((playlist) =>
                        playlist && (
                            <SwiperSlide key={playlist?.id} onClick={()=>handlePlaylist(playlist?.id)}>
                                <div className="flex flex-col items-center gap-1 w-full hover:bg-neutral-800 p-2 hover:cursor-pointer rounded-lg">
                                    <div className="w-40 h-40">
                                        <img
                                            src={playlist?.images?.[0]?.url}
                                            alt="album cover"
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div className="text-center">{playlist?.name}</div>
                                </div>
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
            )}
        </div>
    );
};

export default PlaylistSlider;
