import "./formvalidate.css";
export default function FormValidate({data , error, backClick, nextClick}){
    
return(
  <div className="form-div">
    <form className="form-something">
      {data.map((input, index) => (
        <div key={index}>
          <label>{input.name}</label>
          <br />
          <input
            type={input.type}
            value={input.value}
            onChange={(e) =>input.onChange && input.onChange(e.target.value)}
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
      <button type="button" onClick={backClick}>Back</button>
      <button type="button" onClick={nextClick}>Next</button>
    </form>

  </div>
)
}