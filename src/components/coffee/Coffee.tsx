0;

import React, { useEffect } from "react";

export const Coffee = () => {
  useEffect(() => {
    const script = document.createElement("script");
    const div = document.getElementById("supportByBMC");
    script.setAttribute("src", "./widget.prod.min.js");
    script.setAttribute("data-name", "BMC-Widget");
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-id", "narvidas");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute("data-color", "#eeeeee11");
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "20");
    script.setAttribute("data-y_margin", "32");

    script.onload = function () {
      const evt = document.createEvent("Event");
      evt.initEvent("DOMContentLoaded", false, false);
      window.dispatchEvent(evt);
    };

    div && div.appendChild(script);
  }, []);

  return <div id="supportByBMC"></div>;
};
