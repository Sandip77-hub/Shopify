import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { items } from './Data'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Carousel.css';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

const ProductDetail = ({ cart, setCart, slides}) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const filterProduct = items.find((product) => product.id == id);
        setProduct(filterProduct);
    }, [id]);


    const nextSlide = () => {
        setSlide(slide === slides.length-1 ? 0 : slide + 1);

    }

    const prevSlide = () => {
        setSlide(slide === 0 ? slides.length-1 : slide - 1);


    }

    const addToCart = (id, price, name, description, image) => {
        const obj = { id, price, name, description, image };
        setCart([...cart, obj]);
        toast.success('Item added to cart.', {});
    }

    return (
        <>
            <ToastContainer />
            <div className='connatiner con'>
                <div className='carousel'>
                    <BsArrowLeftCircleFill className='arrow arrow-left' onClick={prevSlide} />
                    {slides.map((item, idx) => (
                        <img
                            src={`../images/${item.src}`}
                            alt={item.alt}
                            key={idx}
                            className={slide===idx ? "slides" : " slide slide-hidden"}
                        />

                    ))}
                    <BsArrowRightCircleFill className='arrow arrow-right' onClick={nextSlide} />
                    <span className='indicators'>

                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSlide(idx)}
                                className={slide === idx ? "indicator" : "indicator indicator-inactive"}
                            ></button>
                        ))}
                    </span>
                </div>
                <div className='text-center'>
                    <h1 className="card-title">{product.name}</h1>
                    <p className="card-text1 ">{product.describe}</p>
                    <button className='btn btn-primary mx-3'>{product.price}</button>
                    <button
                        onClick={() => addToCart(product.id, product.price, product.name, product.description, product.image)}
                        className='btn btn-warning'>Add To Cart
                    </button>
                </div>

            </div>
        </>
    )
}

export default ProductDetail;