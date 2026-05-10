'use client'

const STYLES = `
  .loader {
    --duration: 3s;
    --primary: rgba(99, 102, 241, 1);
    --primary-light: #818cf8;
    --primary-rgba: rgba(99, 102, 241, 0);
    width: 200px;
    height: 320px;
    position: relative;
    transform-style: preserve-3d;
  }

  /* wings removed — they clash with the card background */
  .loader:before,
  .loader:after { display: none; }

  .loader .ground {
    position: absolute;
    left: -50px;
    bottom: -120px;
    transform-style: preserve-3d;
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
  }

  .loader .ground div {
    transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, var(--primary) 0%, var(--primary) 50%, var(--primary-light) 50%, var(--primary-light) 100%);
    transform-style: preserve-3d;
    animation: loader3-ground var(--duration) linear forwards infinite;
  }

  .loader .ground div:before,
  .loader .ground div:after {
    --rx: 90deg;
    --ry: 0deg;
    --x: 44px;
    --y: 162px;
    --z: -50px;
    content: "";
    width: 156px;
    height: 300px;
    opacity: 0;
    background: linear-gradient(var(--primary), var(--primary-rgba));
    position: absolute;
    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
    animation: loader3-ground-shine var(--duration) linear forwards infinite;
  }

  .loader .ground div:after {
    --rx: 90deg;
    --ry: 90deg;
    --x: 0;
    --y: 177px;
    --z: 150px;
  }

  .loader .box {
    --x: 0;
    --y: 0;
    position: absolute;
    animation: var(--duration) linear forwards infinite;
  }

  .loader .box div {
    background-color: var(--primary);
    width: 48px;
    height: 48px;
    position: relative;
    transform-style: preserve-3d;
    animation: var(--duration) ease forwards infinite;
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
  }

  .loader .box div:before,
  .loader .box div:after {
    --rx: 90deg;
    --ry: 0deg;
    --z: 24px;
    --y: -24px;
    --x: 0;
    content: "";
    position: absolute;
    background-color: inherit;
    width: inherit;
    height: inherit;
    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
    filter: brightness(var(--b, 1.2));
  }

  .loader .box div:after {
    --rx: 0deg;
    --ry: 90deg;
    --x: 24px;
    --y: 0;
    --b: 1.4;
  }

  .loader .box.box0 { --x: -220px; --y: -120px; left: 58px;  top: 108px; }
  .loader .box.box1 { --x: -260px; --y:  120px; left: 25px;  top: 120px; }
  .loader .box.box2 { --x:  120px; --y: -190px; left: 58px;  top:  64px; }
  .loader .box.box3 { --x:  280px; --y:  -40px; left: 91px;  top: 120px; }
  .loader .box.box4 { --x:   60px; --y:  200px; left: 58px;  top: 132px; }
  .loader .box.box5 { --x: -220px; --y: -120px; left: 25px;  top:  76px; }
  .loader .box.box6 { --x: -260px; --y:  120px; left: 91px;  top:  76px; }
  .loader .box.box7 { --x: -240px; --y:  200px; left: 58px;  top:  87px; }

  .loader .box0     { animation-name: loader3-box-move0; }
  .loader .box0 div { animation-name: loader3-box-scale0; }
  .loader .box1     { animation-name: loader3-box-move1; }
  .loader .box1 div { animation-name: loader3-box-scale1; }
  .loader .box2     { animation-name: loader3-box-move2; }
  .loader .box2 div { animation-name: loader3-box-scale2; }
  .loader .box3     { animation-name: loader3-box-move3; }
  .loader .box3 div { animation-name: loader3-box-scale3; }
  .loader .box4     { animation-name: loader3-box-move4; }
  .loader .box4 div { animation-name: loader3-box-scale4; }
  .loader .box5     { animation-name: loader3-box-move5; }
  .loader .box5 div { animation-name: loader3-box-scale5; }
  .loader .box6     { animation-name: loader3-box-move6; }
  .loader .box6 div { animation-name: loader3-box-scale6; }
  .loader .box7     { animation-name: loader3-box-move7; }
  .loader .box7 div { animation-name: loader3-box-scale7; }

  @keyframes loader3-box-move0 {
    12%       { transform: translate(var(--x), var(--y)); }
    25%, 52%  { transform: translate(0, 0); }
    80%       { transform: translate(0, -32px); }
    90%, 100% { transform: translate(0, 188px); }
  }
  @keyframes loader3-box-scale0 {
    6%        { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    14%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes loader3-box-move1 {
    16%       { transform: translate(var(--x), var(--y)); }
    29%, 52%  { transform: translate(0, 0); }
    80%       { transform: translate(0, -32px); }
    90%, 100% { transform: translate(0, 188px); }
  }
  @keyframes loader3-box-scale1 {
    10%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    18%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes loader3-box-move2 {
    20%       { transform: translate(var(--x), var(--y)); }
    33%, 52%  { transform: translate(0, 0); }
    80%       { transform: translate(0, -32px); }
    90%, 100% { transform: translate(0, 188px); }
  }
  @keyframes loader3-box-scale2 {
    14%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    22%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes loader3-box-move3 {
    24%       { transform: translate(var(--x), var(--y)); }
    37%, 52%  { transform: translate(0, 0); }
    80%       { transform: translate(0, -32px); }
    90%, 100% { transform: translate(0, 188px); }
  }
  @keyframes loader3-box-scale3 {
    18%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    26%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes loader3-box-move4 {
    28%       { transform: translate(var(--x), var(--y)); }
    41%, 52%  { transform: translate(0, 0); }
    80%       { transform: translate(0, -32px); }
    90%, 100% { transform: translate(0, 188px); }
  }
  @keyframes loader3-box-scale4 {
    22%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    30%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes loader3-box-move5 {
    32%       { transform: translate(var(--x), var(--y)); }
    45%, 52%  { transform: translate(0, 0); }
    80%       { transform: translate(0, -32px); }
    90%, 100% { transform: translate(0, 188px); }
  }
  @keyframes loader3-box-scale5 {
    26%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    34%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes loader3-box-move6 {
    36%       { transform: translate(var(--x), var(--y)); }
    49%, 52%  { transform: translate(0, 0); }
    80%       { transform: translate(0, -32px); }
    90%, 100% { transform: translate(0, 188px); }
  }
  @keyframes loader3-box-scale6 {
    30%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    38%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes loader3-box-move7 {
    40%       { transform: translate(var(--x), var(--y)); }
    53%, 52%  { transform: translate(0, 0); }
    80%       { transform: translate(0, -32px); }
    90%, 100% { transform: translate(0, 188px); }
  }
  @keyframes loader3-box-scale7 {
    34%       { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); }
    42%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); }
  }
  @keyframes loader3-ground {
    0%, 65%   { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0); }
    75%, 90%  { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(1); }
    100%      { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0); }
  }
  @keyframes loader3-ground-shine {
    0%, 70%   { opacity: 0; }
    75%, 87%  { opacity: 0.2; }
    100%      { opacity: 0; }
  }
`

export function Component() {
  return (
    <>
      <style>{STYLES}</style>
      {/*
        Clip window: only show the active animation area (top ~170px of the 320px loader).
        overflow:hidden clips the boxes that fall below the ground plane.
        The 200px width is scaled to 140px via scale(0.7).
      */}
      <div
        style={{
          width: '140px',
          height: '150px',
          overflow: 'hidden',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%) scale(0.7)',
            transformOrigin: 'top center',
          }}
        >
          <div className="loader">
            <div className="box box0"><div /></div>
            <div className="box box1"><div /></div>
            <div className="box box2"><div /></div>
            <div className="box box3"><div /></div>
            <div className="box box4"><div /></div>
            <div className="box box5"><div /></div>
            <div className="box box6"><div /></div>
            <div className="box box7"><div /></div>
            <div className="ground"><div /></div>
          </div>
        </div>
      </div>
    </>
  )
}
