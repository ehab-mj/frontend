import React, { useState } from 'react'
import { SwiperSlide } from 'swiper/react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GameComponent from './GameComponent';
import useDataCard from '../hooks/useDataCard';
function TrailerPlay({ GameFav }) {

    const [active, setActive] = useState(false);

    const handleToggleVideo = () => {
        setActive(!active);
    }


    return (

        <div>
            {
                GameFav.map(game => (
                    <SwiperSlide key={game._id}>
                        <GameComponent
                            game={game}
                            active={active}
                            toggleVideo={handleToggleVideo}
                        />
                    </SwiperSlide>
                ))
            }
        </div>
    )
}

export default TrailerPlay
