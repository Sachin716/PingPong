'use client';

import React, { useState, useEffect, useRef } from 'react';

const Localgame = () => {

  const isHit = useRef(false)
  const isGame = useRef(false)
  const isGround = useRef(false)
  const isWin = useRef(false)
  const windowHeight = useRef(0)
  const windowWidth = useRef(0)
  
  useEffect(()=>{
      windowHeight.current = window.innerHeight
      windowWidth.current = window.innerWidth
  })

  
  const isPlaying = useRef(false)
  const [lPaddleHeight, setLPaddleHeight] = useState(125);
  const lPaddleRef = useRef(125)
  const [rPaddleHeight, setRPaddleHeight] = useState(125);
  const rPaddleRef = useRef(125)
  const [ballPosition , setBallPosition] = useState({
    v : windowHeight.current/2,
    h : windowWidth.current /2
  })

  const ballPositionref = useRef({
    v : windowHeight.current/2,
    h : windowWidth.current /2
  })
  const ballVelocity = useRef({
    v : 0,
    h : 0
  })
  const [lScore, setLScore] = useState(0);
  const lRef = useRef(0)
  const [rScore, setRScore] = useState(-1);
  const rRef = useRef(-1)


  useEffect(()=>{
    let velh = Math.round(Math.max((Math.random()- 0.5) * 600) , 300 )
    let velv = Math.round(Math.max((Math.random()- 0.5) * 600) , 400 )
    ballVelocity.current.v = velv
    ballVelocity.current.h =velh

  } , [])
  

  const paddleMoveVelocity = 2400;
  const keystats = useRef({
    w: false,
    s: false,
    up: false,
    down: false,
  });

  let lasttime = new Date().getTime();

  const updateKeyStats = (e, value) => {
    if (e.keyCode === 87) keystats.current.w = value; // W key
    if (e.keyCode === 83) keystats.current.s = value; // S key
    if (e.keyCode === 38) keystats.current.up = value; // Up arrow
    if (e.keyCode === 40) keystats.current.down = value; // Down arrow
    if (e.keyCode === 32) isPlaying.current = true; // Up arrow
    if (e.keyCode === 27) isPlaying.current = false; // Down arrow
  };




  
  const playloop = () => {
    const curr = new Date().getTime();
    const dt = curr - lasttime;
    lasttime = curr;

    



    
    

    if (keystats.current.w) {
      const newHeight = Math.max(0, lPaddleRef.current - (paddleMoveVelocity / (1000 / dt)));
      lPaddleRef.current = newHeight;
      setLPaddleHeight(newHeight);
    }

    if (keystats.current.s) {
      const newHeight = Math.min(windowHeight.current-125, lPaddleRef.current + (paddleMoveVelocity / (1000 / dt)));
      lPaddleRef.current = newHeight;
      setLPaddleHeight(newHeight);
    }
    
    if (keystats.current.up) {
      const newHeight = Math.max(0, rPaddleRef.current - (paddleMoveVelocity / (1000 / dt)));
      rPaddleRef.current = newHeight;
      setRPaddleHeight(newHeight);
    }
    
    if (keystats.current.down) {
      const newHeight = Math.min(windowHeight.current-125, rPaddleRef.current + (paddleMoveVelocity / (1000 / dt)));
      rPaddleRef.current = newHeight;
      setRPaddleHeight(newHeight);
    }

    const ball = ballPositionref.current

    if(ball.h > windowWidth.current - 25){
      const calcLsc = lRef.current + 1
      lRef.current = calcLsc
      setLScore(lRef.current) 
      let velh = Math.round(Math.max((Math.random()- 0.5) * 600) , 300 )
      let velv = Math.round(Math.max((Math.random()- 0.5) * 600) , 400 )
      ballVelocity.current.v = velv
      ballVelocity.current.h = velh
      ball.h = windowWidth.current/2
      ball.v = windowHeight.current/2
      isPlaying.current = false
      isGame.current.play()
    }
    if(ball.h <=  1){
      const calcRsc = rRef.current + 1
      rRef.current = calcRsc
      setRScore(rRef.current) 
      let velh = Math.round(Math.max((Math.random()- 0.5) * 600) , 300 )
      let velv = Math.round(Math.max((Math.random()- 0.5) * 600) , 400 )
      ballVelocity.current.v = velv
      ballVelocity.current.h = velh
      ball.h = windowWidth.current/2
      ball.v = windowHeight.current/2
      isPlaying.current = false
      isGame.current.play()
    }

    const vel = ballVelocity.current

    if(ball.v > windowHeight.current -25 && vel.v > 0){
      vel.v = -1*vel.v
      isGround.current.play()
    }
    if(ball.v <= 0 && vel.v < 0){
      vel.v = -1*vel.v
      isGround.current.play()
      
    }

    const lpaddle = lPaddleRef.current
    if(ball.h >= 15 && ball.h <= 30 && ball.v >= lpaddle -25 && ball.v <= lpaddle + 125  && vel.h < 0){
      vel.h = vel.h*-1.1
      vel.v = vel.v*1.1
      isHit.current.play()
    }
    const rpaddle = rPaddleRef.current
    if(ball.h <= windowWidth.current - 40 && ball.h >= windowWidth.current - 55 && ball.v >= rpaddle -25 && ball.v <= rpaddle + 125  && vel.h > 0){
      vel.h = vel.h*-1.1
      vel.v = vel.v*1.1
      isHit.current.play()
    }

    if(lRef >= 10){
      isPlaying.current = false 
      alert("Player 2 Wins")
      isWin.current.play()
    }

    
    if(rRef >= 10){
      isPlaying.current = false 
      alert("Player 1 Wins")
      isWin.current.play()
    }
    

    if(isPlaying.current){
    const newHPos = ball.h + vel.h/(1000/dt)
    const newVPos = ball.v + vel.v/(1000/dt)
    ballPositionref.current.h = newHPos
    ballPositionref.current.v = newVPos
    setBallPosition({
      ...ballPositionref.current
    })
  }
    requestAnimationFrame(playloop);
  };

  useEffect(() => {
    playloop();
  }, []);
 

  useEffect(() => {
    const handleKeyDown = (e) => updateKeyStats(e, true);
    const handleKeyUp = (e) => updateKeyStats(e, false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className='w-screen h-screen flex flex-col items-center overflow-hidden'>
      <div className='  flex w-[50%] h-[50%]'>
        
        <div className='flex-1 flex items-end text-[150px]  text-zinc-800'>
          {lScore}
        </div>
        <div className=' flex-1 flex items-end justify-end text-[150px] text-zinc-800'>
          {rScore}
        </div>
      </div>

      <div className={`left-paddle absolute w-[20px] h-[125px] bg-white left-[10px]`} style={{
        top:`${lPaddleHeight}px`
      }}  >
      </div>
      <div className='ball absolute h-[25px] w-[25px] rounded-full bg-white' style={{ 
        top:`${ballPosition.v}px`,
        left:`${ballPosition.h}px`
       }}>
      </div>
      <div className='right-paddle absolute w-[20px] h-[125px] bg-white right-[10px]' style={{top:`${rPaddleHeight}px`}}>
      </div>

      <audio ref={isHit}  src={'/groundHit.mp3'} />
      <audio ref={isWin}  src={'/Gameover.mp3'} />
      <audio ref={isGround}  src={'/groundHit.mp3'} />
      <audio ref={isGame}  src={'/Score.mp3'} />

      {isPlaying.current ? "" :  <div className='w-screen fixed h-screen flex items-center align-center text-center justify-center  px-auto py-auto bg-[#00000011] m-0'>
          controls <br></br><br></br>
          Left Paddle   <br></br>
          W : up        <br></br>
          s : down      <br></br>
          <br></br>
          <br></br>
          <br></br>
          Right Paddle <br></br>
          up arrow : up<br></br>
          down arrow : down<br></br>
          <br></br>
          <br></br>
          <br></br> 
          esc to pause <br></br>
          <br></br>
          Space to continue Game

        </div>}

      
    </div>
  )
}

export default Localgame
