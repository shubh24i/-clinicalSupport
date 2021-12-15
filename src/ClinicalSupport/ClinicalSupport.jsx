import React, { useState } from "react";
import './clinical.css';

const ClinicalSupport = ({ children }) => {
  const [fields, setFields] = useState([]);

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", JSON.parse(e.target.result));
      setFields(JSON.parse(e.target.result)?.fields);
    };
  };

  const orderByFields = fields?.sort((a,b)=>{
    return a.order-b.order;
  })
  return (
    <>
      <h1>Upload Json file - Example</h1>

      <input type="file" onChange={handleChange} />
      <br />
      <div className="form">
        <form>
        <ul className="formWrap">
          {orderByFields?.length>0 ? orderByFields?.map(item => {
            return <FormItem {...item} key={item?.key} />
          }):'No Data'}
          {orderByFields?.length>0 && <li><span></span><button className="btn" type="submit">Submit</button></li>}

        </ul>
        </form>
      </div>
    </>
  );
}

export default ClinicalSupport



const FormItem = ({ label, key, isRequired, order, isReadonly, type }) => {
  return (
    <li> <div className="col1">{label}</div>
      <div className="col2"><input type={type} readOnly={isReadonly} required={isRequired} /></div></li>
  );
}


