const form=document.querySelector("form"),input=document.querySelector("input");let value=Math.floor(100*Math.random()),i=0,gameOver=!1;const checkHandler=(e,r,t)=>9===t&&Number(r)!==e?(t=0,gameOver=!0,"Game over :( Try again?"):Number(r)===e?"Great! You are right!!!":Number(r)>e?"Try lower...":Number(r)<e?"Try higher...":void 0,handleSubmit=e=>{e.preventDefault(),console.log(value);const r=document.querySelector(".main__message"),t=input.value;r.innerHTML=checkHandler(value,t,i),i+=1,e.target.reset()};form.addEventListener("submit",handleSubmit);