export default function AppointmentCard({data, onSubmit}){
    const handleClick =(e)=>{
        e.preventDefault();
        onSubmit();
    };
return(
    <div className="apt-card">
    {data.map((inputs,index)=>(
        <div key={index}> 
            <p><b>Name:{inputs.name}</b></p>
            <p>Time:{inputs.time}</p>
            <p>Date:{inputs.date}</p>
            <p>Problem:{inputs.prob}</p>
        </div>
    ))}
    <button onClick={handleClick}>Delete</button>
    </div>
)
}