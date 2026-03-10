import "./faceCard.css";
export default function RoundFaceCard({imgData}){
    
return(
    <div style={{display:"flex", gap:"20px"}}>
    {imgData.map((data, index)=>(
        <div key={index} className="rounded-div">
        <div style={{backgroundImage:`url(${data.img})`}} className="img-div" > </div>
        <div className="title-div"><h5>{data.name}</h5></div>
       </div>
       ))}
       </div>
)
}