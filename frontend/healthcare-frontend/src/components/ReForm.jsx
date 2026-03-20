import "./reform.css"
export default function ReForm({data, onSubmit}){
    const handleSubmit = (e) => {
    e.preventDefault();        // stop page refresh
    onSubmit();                // call parent function
  };
return(
  <div className="form-div">
    <form className="form-something" onSubmit={handleSubmit}>
      {data.map((input) => (
        <div key={input.id}>
          <label className="form-div-label">{input.name}</label>
          <br />
          <input
            type={input.type}
            value={input.value}
            onChange={(e) => input.onChange(e.target.value)}
            placeholder={input.placeholder}
            className="form-div-input"
          />
          {data.error && ( <p style={{color:"red"}}>{data.error}</p> )}
        </div>
      ))}
      
          <br />
          <button type="submit" >ENTER</button>
    </form>

  </div>
)
}