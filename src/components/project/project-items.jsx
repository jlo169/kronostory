import React from 'react';
import ProjectItem from './project-item';
import Slider from 'react-slick';
import './project.css';


export default class ProjectItems extends React.Component {
    constructor(props) {
        super(props);
        this.testArray = [
            {id: 1, img: 'https://bit.ly/2QxSRa4', product: 'Meat'},
            {id: 2, img: 'https://bit.ly/2K9Hx2O', product: 'Cheese'},
            {id: 3, img: 'https://bit.ly/2Z3Cbud', product: 'Cinnamon'},
            {id: 4, img: 'https://bit.ly/2QC2RiM', product: 'Hamster'},
            {id: 5, img: 'https://bit.ly/2QC2RiM', product: 'Hamster'},
            {id: 6, img: 'https://bit.ly/2QC2RiM', product: 'Hamster'},
            {id: 7, img: 'https://bit.ly/2QC2RiM', product: 'Hamster'}
        ]
    }
    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            swipeToSlide: true,
            variableWidth: false
        };

        const usedItems = this.testArray.map(item => 
            <ProjectItem key={item.id} image={item.img} product={item.product} />
        )

        return (
            <div className="col-12 py-3 mb-4">
                <h3 className="mb-4 text-center">
                    Items Used
                </h3>
                <div>
                <Slider {...settings}>
                    {usedItems}
                </Slider>
                </div>
            </div>
        )
    }
}