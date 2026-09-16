import { useCallback, useEffect, useState } from "react";
import TopGonImg from "../../assets/top-gun.jpg";
import MarloweImg from "../../assets/Marlowe.jpg";
import Midway from "../../assets/midway-movie.jpg";

const slides = [
    {
        image: TopGonImg,
        alt: "Top Gun Maverick",
    },
    {
        image: MarloweImg,
        alt: "Marlowe",
    },
    {
        image: Midway,
        alt: "Midway",
    },
];

const Carousel = () => {
    // Clone first slide at the end for seamless looping
    const carouselSlides = [...slides, slides[0]];

    const [activeSlide, setActiveSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [touchStart, setTouchStart] = useState(null);

    const nextSlide = useCallback(() => {
        setIsTransitioning(true);
        setActiveSlide((current) => current + 1);
    }, []);

    const previousSlide = useCallback(() => {
        setActiveSlide((current) => {
            if (current === 0) {
                setIsTransitioning(false);

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setActiveSlide(slides.length - 1);
                        setIsTransitioning(true);
                    });
                });

                return current;
            }

            setIsTransitioning(true);
            return current - 1;
        });
    }, []);

    const goToSlide = useCallback((index) => {
        setIsTransitioning(true);
        setActiveSlide(index);
    }, []);

    // Automatic slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 2500);

        return () => clearInterval(interval);
    }, [nextSlide]);

    // Reset clone after reaching the end
    useEffect(() => {
        if (activeSlide === slides.length) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setActiveSlide(0);

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setIsTransitioning(true);
                    });
                });
            }, 650);

            return () => clearTimeout(timer);
        }
    }, [activeSlide]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                previousSlide();
            }

            if (event.key === "ArrowRight") {
                nextSlide();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [nextSlide, previousSlide]);

    // Touch swipe
    const handleTouchStart = (event) => {
        setTouchStart(event.touches[0].clientX);
    };

    const handleTouchEnd = (event) => {
        if (touchStart === null) return;

        const touchEnd = event.changedTouches[0].clientX;
        const distance = touchStart - touchEnd;

        if (Math.abs(distance) > 60) {
            if (distance > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }

        setTouchStart(null);
    };

    const indicatorIndex =
        activeSlide === slides.length ? 0 : activeSlide;

    return (
        <div
            id="myCarousel"
            style={{
                position: "relative",
                width: "100%",
                height: "calc(100vh - 74px)",
                minHeight: "600px",
                overflow: "hidden",
                background: "#0b1020",
                touchAction: "pan-y",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Sliding Track */}
            <div
                style={{
                    display: "flex",
                    width: `${carouselSlides.length * 100}%`,
                    height: "100%",
                    transform: `translateX(-${
                        activeSlide * (100 / carouselSlides.length)
                    }%)`,
                    transition: isTransitioning
                        ? "transform 0.65s cubic-bezier(0.77, 0, 0.175, 1)"
                        : "none",
                }}
            >
                {carouselSlides.map((slide, index) => (
                    <div
                        key={`${slide.alt}-${index}`}
                        style={{
                            width: `${100 / carouselSlides.length}%`,
                            height: "100%",
                            flexShrink: 0,
                        }}
                    >
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            draggable="false"
                            loading={index === 0 ? "eager" : "lazy"}
                            style={{
                                display: "block",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                userSelect: "none",
                                pointerEvents: "none",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Previous Button */}
            <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous slide"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "25px",
                    transform: "translateY(-50%)",
                    zIndex: 5,
                    width: "50px",
                    height: "50px",
                    border: "none",
                    borderRadius: "50%",
                    background: "rgba(0, 0, 0, 0.35)",
                    color: "#fff",
                    fontSize: "34px",
                    lineHeight: 1,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s ease",
                }}
            >
                ‹
            </button>

            {/* Next Button */}
            <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "25px",
                    transform: "translateY(-50%)",
                    zIndex: 5,
                    width: "50px",
                    height: "50px",
                    border: "none",
                    borderRadius: "50%",
                    background: "rgba(0, 0, 0, 0.35)",
                    color: "#fff",
                    fontSize: "34px",
                    lineHeight: 1,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s ease",
                }}
            >
                ›
            </button>

            {/* Indicators */}
            <div
                style={{
                    position: "absolute",
                    bottom: "22px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 5,
                    display: "flex",
                    gap: "8px",
                }}
            >
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        style={{
                            width:
                                index === indicatorIndex
                                    ? "40px"
                                    : "22px",
                            height: "4px",
                            padding: 0,
                            border: "none",
                            borderRadius: "10px",
                            background:
                                index === indicatorIndex
                                    ? "#ffffff"
                                    : "rgba(255,255,255,0.55)",
                            cursor: "pointer",
                            transition:
                                "width 0.25s ease, background 0.25s ease",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;