import styled from "./WhatWeDoCard.module.scss";

interface WhatWeDoCardProps {
    image: string;
    title: string;
    description: string;
}

export const WhatWeDoCard = ({ image, title, description }: WhatWeDoCardProps) => {

    return (
        <div className={styled["container-main"]}>
            <img src={image} alt={image} className={styled["image"]} />
            <div className={styled["title"]}>{title}</div>
            <div className={styled["description"]}>{description}</div>
        </div>
    )
};

export default WhatWeDoCard;