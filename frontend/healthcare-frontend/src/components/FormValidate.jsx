import "./reform.css";
export default function FormValidate({data , error, backClick, nextClick}){
    
return(
  <div className="form-div">
    <form className="form-something">
      {data.map((input) => (
        <div key={input.id}>
          <label>{input.name}</label>
          <br />
          <input
            type={input.type}
            value={input.value}
            onChange={(e) => input.onChange(e.target.value)}
            placeholder={input.placeholder}
          />
          <br />
          {error[input.name?.toLowerCase()?.replace("*","")] && (
            <p style={{ color: "red" }}>
            {error[input.name?.toLowerCase()?.replace("*","")]}
            </p>
          )}
        </div>
      ))}
      <button onClick={backClick}>Back</button>
      <button onClick={nextClick}>Next</button>
    </form>

  </div>
)
}