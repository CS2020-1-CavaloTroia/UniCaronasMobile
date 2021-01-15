import React from "react";
import { StarImage } from "./styles";

import star0 from "~/assets/star0.png";
import star1 from "~/assets/star1.png";
import star2 from "~/assets/star2.png";
import star3 from "~/assets/star3.png";
import star4 from "~/assets/star4.png";
import star5 from "~/assets/star5.png";
import star6 from "~/assets/star6.png";
import star7 from "~/assets/star7.png";
import star8 from "~/assets/star8.png";
import star9 from "~/assets/star9.png";
import star10 from "~/assets/star10.png";

export default function Star({ percent = 0, size = "0px" }) {
  const selectStarImage = () => {
    if (percent > 0 && percent <= 10) return star1;
    else if (percent > 10 && percent <= 20) return star2;
    else if (percent > 20 && percent <= 30) return star3;
    else if (percent > 30 && percent <= 40) return star4;
    else if (percent > 40 && percent <= 50) return star5;
    else if (percent > 50 && percent <= 60) return star6;
    else if (percent > 60 && percent <= 70) return star7;
    else if (percent > 70 && percent <= 80) return star8;
    else if (percent > 80 && percent < 100) return star9;
    else if (percent >= 100) return star10;

    return star0;
  };

  const star = selectStarImage();

  return <StarImage size={size} source={star} />;
}
