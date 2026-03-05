export default function FormValidate({data , error, backClick, nextClick}){
    
return(
    <form>
      {data.map((input) => (
        <div key={input.id}>
          <label>{input.name}</label>
          <input
            type={input.type}
            value={input.value}
            onChange={(e) => input.onChange(e.target.value)}
            placeholder={input.placeholder}
          />
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
)
}