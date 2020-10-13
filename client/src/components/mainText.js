import React, { useEffect, useState } from "react";
import gsap from 'gsap';

const MainText = (props) => {
  const data = [
    {
      sentence: "how was your day",
      alternative: "fine thanks lol"
    },
    {
      sentence: "how was your lol",
      alternative: "fabulous mdr"
    }
  ];

  let refs = []
  let timelineArr = []
  let fDataS = []
  let fDataA = []
  let formatedData = null

  const mouseIn = (e, i) => {
    if (timelineArr[i]) {
      timelineArr[i].play()
    }
  };

  const mouseOut = (e, i) => {
    if (timelineArr[i]) {
      timelineArr[i].reverse()
    }
  };

  const formatData = (data, maxChar) => {
    data.map((e, i) => {
      let sentence = e.sentence.split(" ")
      let alternative = e.alternative.split(" ")
      let formatedDataS = { sentence: '' }
      let formatedDataA = { alternative: '' }
      fDataS.push([])
      fDataA.push([])

      sentence.map((word, ind) => {
        if (formatedDataS.sentence.length + word.length + 1 < maxChar) {
          if (formatedDataS.sentence) {
            formatedDataS.sentence = formatedDataS.sentence + " " + word
          } else {
            formatedDataS.sentence = word
          }
          if (ind === sentence.length - 1) {
            fDataS[i].push(formatedDataS)
            formatedDataS = { sentence: '' }
          }
        } else {
          fDataS[i].push(formatedDataS)
          formatedDataS = { sentence: '' }
          formatedDataS.sentence = word
          if (ind === sentence.length - 1) {
            fDataS[i].push(formatedDataS)
            formatedDataS = { sentence: '' }
          }
        }
      })
      alternative.map((word, ind) => {
        if (formatedDataA.alternative.length + word.length + 1 < maxChar) {
          if (formatedDataA.alternative) {
            formatedDataA.alternative = formatedDataA.alternative + " " + word
          } else {
            formatedDataA.alternative = word
          }
          if (ind === alternative.length - 1) {
            fDataA[i].push(formatedDataA)
            formatedDataA = { alternative: '' }
          }
        } else {
          fDataA[i].push(formatedDataA)
          formatedDataA = { alternative: '' }
          formatedDataA.alternative = word
          if (ind === alternative.length - 1) {
            fDataA[i].push(formatedDataA)
            formatedDataA = { alternative: '' }
          }
        }
      })
    })
    formatedData = [fDataS, fDataA]
  }

  useEffect(() => {
    formatData(data, 15)
    refs.map((e, i) => {
      console.log(e);
      const tl = gsap.timeline({ paused: true })
      tl
        .to(e.children[0].children[0].children[1], {
          duration: 0.5,
          ease: "none",
          attr: { values: "1 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 0 0 18 -8" }
        }, "blur")
        .to(e.children[0].children[0].children[0], {
          duration: 0.5,
          ease: "none",
          attr: { stdDeviation: 1.5 }
        }, "blur")
        .to(e.children[1].children[0], {
          duration: 0.5,
          ease: "none",
          opacity: 0
        }, 0.4)
        .to(e.children[1].children[1], {
          duration: 0.5,
          ease: "none",
          opacity: 1
        }, 0)
        .to(e.children[0].children[0].children[0], {
          duration: 0.5,
          ease: "none",
          attr: { stdDeviation: 0 }
        }, 0.5)
        .to(e.children[0].children[0].children[1], {
          duration: 0.5,
          ease: "none",
          attr: { values: "1 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 0 0 1 0" }
        }, 0.5)
      timelineArr.push(tl)
    })
  }, []);

  const addRef = e => {
    if (e && !refs.includes(e)) {
      refs.push(e)
    }
  }

    return (
      <div> {props.data.map((data, index) => {
        return (
          <svg viewBox="-0 -0 100 35" preserveAspectRatio="xMinYMid meet" ref={addRef}>
            <defs>
              <filter id={`goo-${index}`}>
                <feGaussianBlur className="feGau" in="SourceGraphic" stdDeviation={0} result="blur"></feGaussianBlur>
                <feColorMatrix className="feCol" in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 0 0 1 0" result="goo"></feColorMatrix>
                <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
              </filter>
            </defs>
            <g onMouseEnter={e => mouseIn(e, index)} onMouseLeave={e => mouseOut(e, index)} style={{ filter: `url(#goo-${index})` }}>
              <text className="sentence" style={{ opacity: '1' }} x="0" y="15"> <tspan>{data.sentence} </tspan><tspan dy={"1em"} x={0}>ba</tspan></text>
              <text className="alternative" style={{ opacity: '0' }} x="0" y="15"> <tspan>{data.alternative} </tspan> <tspan dy={"1em"} x={0}></tspan></text>
            </g>
          </svg>
        )
      })} </div>
    )
};

export default MainText;