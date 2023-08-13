import React, { useEffect } from "react";

type UniverseProps = {
  starColor?: string;
  children: JSX.Element;
};

/**
 * Starfield Animation
 * SRC: https://codepen.io/sacsam005/pen/BaJmaXy
 */
const Universe: React.FC<UniverseProps> = ({
  starColor = "#000",
  children,
}) => {
  useEffect(() => {
    var starCount = 100;
    var maxTime = 40;
    var universe = document.getElementById("universe");
    var w = window;
    var d = document;
    var e = d.documentElement;
    var g = d.getElementsByTagName("body")[0];
    var width =
      d.getElementById("universe_container")?.clientWidth ||
      w.innerWidth ||
      e.clientWidth ||
      g.clientWidth;
    var height =
      d.getElementById("universe_container")?.clientHeight ||
      w.innerHeight ||
      e.clientHeight ||
      g.clientHeight;

    for (var i = 0; i < starCount; ++i) {
      var ypos = Math.round(Math.random() * height);
      var star = document.createElement("div");
      var speed = 1000 * (Math.random() * maxTime + 1);
      star.setAttribute("class", "star" + Math.round(Math.random() * 3));
      star.style.backgroundColor = starColor;
      universe?.appendChild(star);
      if (Math.random() > 0.3) {
        // Moving star.
        star.animate(
          [
            {
              transform: "translate3d(" + width + "px, " + ypos + "px, 0)",
            },
            {
              transform:
                "translate3d(-" +
                Math.random() * 256 +
                "px, " +
                ypos +
                "px, 0)",
            },
          ],
          {
            delay: Math.random() * -speed,
            duration: speed,
            iterations: 1000,
          }
        );
      } else {
        // Blicking star.
        star.style.top = `${Math.round(Math.random() * height)}px`;
        star.style.left = `${Math.round(Math.random() * width)}px`;
        star.animate(
          {
            opacity: [0.5, 1],
            transform: ["scale(0.5)", "scale(1)"],
          },
          {
            direction: "alternate",
            duration: 500,
            iterations: Infinity,
            delay: Math.round(Math.random()) * 500,
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="universe_container">
      <div id="universe"></div>
      {children}
    </div>
  );
};

export default Universe;
