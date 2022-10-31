import React from "react";
import PropTypes from "prop-types";
import styles from "./SocialBar.scss";
import { Container } from "../layout/Container";
import { ReactComponent as Twitter } from "../icons/SocialTwitter.svg";
import { ReactComponent as Linkedin } from "../icons/SocialLinkedin.svg";
import { ReactComponent as Youtube } from "../icons/SocialYoutube.svg";
import { ReactComponent as Facebook } from "../icons/SocialFacebook.svg";
import { ReactComponent as Instagram } from "../icons/SocialInstagram.svg";

export function SocialBar({ mobile }) {
  return (
    <Container className={mobile ? styles.mobileSocialBar : styles.socialBarContainer}>
 
      <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/Aumentur">
        <Twitter />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="hhttps://www.youtube.com/channel/UCv-kpstg1Gy4bIwbQQwOU6Q/featured">
        <Youtube />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/aumentur/">
        <Linkedin />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Aumentur/">
        <Facebook />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/aumentur/">
        <Instagram />
      </a>
     
    </Container>
  );
}
SocialBar.propTypes = {
  mobile: PropTypes.bool = true
};
