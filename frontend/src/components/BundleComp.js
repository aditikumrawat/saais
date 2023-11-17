import React, { useEffect, useState } from "react";
import pcImage from "../images/pcImage.jpg";
import "../css/BundleComp.css";

const BundleComp = () => {
  const [imgSrc, setImgSrc] = useState(pcImage);

  const srcs = [
    "https://f.nooncdn.com/p/v1692599587/N53429237A_1.jpg",
    "https://f.nooncdn.com/p/pzsku/Z77E5CED9CC200662864BZ/45/_/1685605913/bc1e9bf7-d404-4744-b15c-f97f33fedf53.jpg",
    "https://f.nooncdn.com/p/v1548738129/N20640432A_1.jpg",
    "https://f.nooncdn.com/p/v1564134963/N28548686A_1.jpg",
    "https://f.nooncdn.com/p/v1629782655/N50302339A_1.jpg",
  ];

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setImgSrc(srcs[currentIndex]);
      currentIndex = (currentIndex + 1) % srcs.length; // Loop back to the beginning when reaching the end
    }, 2000); // Change the image every 2 seconds (you can adjust the interval duration)

    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, []);
  return (
   
      <div className="bundle-div">
        {/* <div className="bundle-heading">Pc Component</div> */}
        <div className="atom">
          <div className="nucleus">
            <img className="bundle-image" src={imgSrc} alt="img" />
          </div>
          <div className="line line-1">
            <div className="electron"></div>
          </div>
          <div className="line line-2">
            <div className="electron"></div>
          </div>
          <div className="line line-3">
            <div className="electron"></div>
          </div>
        </div>
      </div>
  );
};

export default BundleComp;
