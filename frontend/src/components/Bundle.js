import React from "react";
import "../css/Bundle.css";

const Bundle = () => {
  return (
    <div className="bundle">
      <div className="pc-bundle">
        <span className="bundle-head">PC Bundle</span>
        <div className="ball_container_sB">
          <span className="loading_ball _a"></span>
          <span className="loading_ball _b"></span>
          <span className="loading_ball _c"></span>
        </div>
      </div>
      <div className="bicycle-bundle">
        <span className="bundle-head">Bicycle Bundle</span>
        <div class="wheel">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
          <div class="cabin"></div>
          <div class="cabin"></div>
          <div class="cabin"></div>
          <div class="cabin"></div>
          <div class="cabin"></div>
          <div class="cabin"></div>
        </div>
      </div>
      <div className="bulb-bundle">
        <div className="bundle-head">Bulb Bundle</div>
        <div class="atom">
          <div class="orbit">
            <span class="electron e1"></span>
          </div>
          <div class="orbit">
            <span class="electron e2"></span>
          </div>
          <div class="orbit">
            <span class="electron e3"></span>
          </div>
          <div class="core"></div>
        </div>
      </div>
    </div>
  );
};

export default Bundle;
