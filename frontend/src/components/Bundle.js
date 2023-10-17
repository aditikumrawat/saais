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
          <span className="loading_ball _d"></span>
          <span className="loading_ball _e"></span>
          <span className="loading_ball _f"></span>
        </div>
      </div>
      <div className="pc-new-bundle">
        <span className="pc-bundle-head">PC Bundle</span>
        <div className="items">
          <div className="bundle-item"></div>
          <div className="bundle-item"></div>
          <div className="bundle-item"></div>
          <div className="bundle-item"></div>
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
          <div class="orbit">
            <span class="electron e4"></span>
          </div>
          <div class="core"></div>
        </div>
      </div>
    </div>
  );
};

export default Bundle;
