import { useState } from "react";
import './styles/chess.css'

//主逻辑
function turncharge(list,next,setOver){
  const arr=list?list.filter(ele=>ele.id%2===next).map(e=>e.count):[]
  const sort=arr.sort((a,b)=>a-b)
  //判断
  sort.forEach(ele => {
    const chargearr=[[1,2,3],[ele,ele+3,ele+6],[ele,ele+4,ele+8],[3,5,7],[4,5,6],[7,8,9]]
    chargearr.forEach(itemarr=>{
      const flag= itemarr.every(e=>{
         return sort.includes(e)
      })
      if(flag){
        setOver(true)
      }
    })
  });
}


//主函数
function Main(){
  
  //回合数
  const [turn ,setTurn]=useState(0)
  //历史条
  const [history,sethistory]=useState([])
  //下回合
  const next=turn%2
  //结束符
  const [over,setOver]=useState(false)

  //回合ticker
  const ticker=(value)=>{
    sethistory([...history,value])
    setTurn(turn+1)
    turncharge([...history,value],next,setOver)
  }
  return(
    <div className="main_box">
      <div>
        <div>{over?<span>Winner : {next?'X':'O'}</span>:<span>Next player : {next?'O':'X'}</span>}: </div>
        <Chessboard onNext={ticker} isover={over} history={history} next={next}></Chessboard>
      </div>
      <History history={history} sethistory={sethistory} setOver={setOver}></History>
    </div>
  )
}
//棋盘

function Chessboard(props){
  const arr=[]
  for(let i=1;i<=9;i++){
    const item=props.history.find(ele=>ele.count===i)
    item?arr.push(item):arr.push({id:'-1',count:i})
  }
  const map={
    1:'O',
    0:'X',
    '-1':''
  }
  const handlerClick=(ele)=>{
    if(props.isover) return
    if(props.history.findIndex((e=>e.count===ele.count))!==-1) return
    const obj={
      id:props.next,
      count:ele.count
    }
    props.onNext(obj)
  }
  return (
    <div className="board">
      {arr.map(ele=><div className="item_c" onClick={()=>handlerClick(ele)} key={ele.count}>{map[ele.id]}</div>)}
    </div>
  )
}



//历史
function History(props){
  const handlerClick=(index)=>{
    const arr=props.history.filter((ele,ind)=>ind<index)
    props.sethistory(arr)
    props.setOver(false)
  }
  return (
    <ul className="ul">
      {props.history.map((ele,index)=><li key={index+1}>{index+1}. <button onClick={()=>handlerClick(index)}>{index?('Go to move #'+index):'go to game start'}</button></li>)}
    </ul>
  )
}

export default Main