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
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function HomeTop() {
  const { isLogin } = useSelector((store) => store.authReducer);
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      setName(user.u_name);
    }
  }, [isLogin]);

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
          <div>
            <img
              src="images/adv1.png"
              alt="First slide"
              style={{ objectFit: "cover", maxHeight: "200px" }}
            />
          </div>
          <div>
            <img
              src="images/adv2.png"
              alt="Second slide"
              style={{ objectFit: "cover", maxHeight: "200px" }}
            />
          </div>
          <div>
            <img
              src="images/adv3.png"
              alt="Third slide"
              style={{ objectFit: "cover", maxHeight: "200px" }}
            />
          </div>
        </Carousel>
      </Box>
    </Box>
  );
}
