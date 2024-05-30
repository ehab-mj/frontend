import React from 'react'

function DetailsTest() {
    return (
        <Grid container spacing={2}>
            {/* Movie Image */}
            <Grid Grid item xs={12} md={4}>
                <img
                    src={image}
                    alt={image}
                    style={{
                        maxWidth: "100%",
                        height: "90vh",
                        margin: 5,
                        objectFit: "contain",
                    }}
                />
                <Grid Grid item xs={12} md={4} sx={{ marginBottom: "70px", position: "relative" }}
                    style={{
                        maxWidth: "100%",
                        height: "20vh",
                        marginTop: -120,
                        objectFit: "contain",
                    }}>
                    Buy Now
                </Grid>
            </Grid>

            <Grid item xs={12} md={8} sx={{ marginTop: 20 }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                >
                    {title}
                    <GameRating rating={rating} />
                </Typography>

                <Divider />
                <Typography variant="subtitle1" gutterBottom >
                    {description} {" "}
                </Typography>
                <Typography variant="subtitle1" gutterBottom >
                    Rating: {rating}
                </Typography>
                <Typography variant="subtitle1" gutterBottom >
                    Price: {price}
                </Typography>
                <Typography variant="subtitle1" gutterBottom >
                    Category: {category.join(", ")}
                </Typography>

                <div className={`video ${active ? "active" : undefined}`}>
                    <iframe
                        width="500"
                        height="300"
                        autoPlay={autoplay}
                        src={trailer}
                        title={title}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        allowFullScreen
                    >

                    </iframe>
                </div>


                <div className="gameSlider">
                    <div className="content">
                        <div className="buttons">
                            <div className={`playBtn ${active ? 'active' : undefined}`} onClick={togglePopup}>
                                <span className='play'>
                                    <PlayCircleIcon
                                    />
                                </span>
                                <span className='pause' onClick={togglePopup}>
                                    &times;
                                    <PauseIcon />
                                </span>
                            </div>

                            {isOpen && (
                                <div className="popup-content">
                                    <div className={`video ${active ? "active" : undefined}`}>
                                        <iframe
                                            width="500"
                                            height="300"
                                            src={trailer}
                                            title={title}
                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                                            allowFullScreen
                                        >

                                        </iframe>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Box>
                    {((IsAdmin) ||
                        to.pathname === ROUTES.MYGAMES) && (
                            <IconButton onClick={handleDeleteClick}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        )}
                    {((login.isBusiness && IsAdmin) ||
                        to.pathname === ROUTES.MYGAMES) && (
                            <IconButton onClick={handleEditClick}>
                                <ModeIcon />
                            </IconButton>
                        )}
                </Box>
            </Grid >
        </Grid >
    )
}

export default DetailsTest
