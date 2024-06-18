import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { baseURL } from "../../utils/variables";

export default function HomeTop() {
  const { isLogin } = useSelector((store) => store.authReducer);
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");
  const [lpImages,setLpImages] = useState([]);


  useEffect(() => {

    getLpImages();
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      setName(user.u_name);
    }
  }, [isLogin]);

  const getLpImages = async() => {
    const res = await axios.get(`${baseURL}api/set-lp-imgs`)

    if (res.status === 200) {
        console.log('Data submitted successfully:', res.data);
         setLpImages(res.data);
       


      } else {
        console.error('Failed to submit data:', res.data);
      }
  }

  console.log("check",lpImages);

  const defaultImages = [
    { src: "images/wearhouse.png", alt: "First slide" },
    { src: "images/adv2.png", alt: "Second slide" },
    { src: "images/adv3.png", alt: "Third slide" },
  ];

  const imagesToDisplay = lpImages.length > 0 ? lpImages.map(img => ({
    src: `${baseURL}storage/app/${img.lp_img_path}`,
    alt: "Slide image" // Adjust as necessary if you have alt text in your backend
  })) : defaultImages;

  return (
     <Box>
      <Box className="card-body" mt="60px">
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000} // Slide interval in milliseconds (3 seconds)
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          showArrows={true}
          dynamicHeight={true}
          className="carousel"
        >
          {imagesToDisplay.map((image, index) => (
            <div key={index}>
              <img
                src={image.src}
                alt={image.alt}
                style={{ objectFit: "cover", maxHeight: "300px" }}
              />
            </div>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}
