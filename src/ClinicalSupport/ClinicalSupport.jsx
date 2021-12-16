import React, { useState } from "react";
import './clinical.css';

const ClinicalSupport = (props) => {

  const [fields, setFields] = useState([]);
  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setFields(JSON.parse(e.target.result)?.fields);
    };
  };
  const orderByFields = fields?.sort((a, b) => {
    return a.order - b.order;
  })
  return (
    <>
     <div className="uploadForm"> 
        <h1>Upload Json file - Example</h1>
        <input type="file" onChange={handleChange} />
      </div>
     
      <div className="form">
        <form>
          <ul className="formWrap">
            {orderByFields?.length > 0 ? orderByFields?.map(item => {return <FormItem {...item} key={item?.key} />}) : 'No Data'}
            {orderByFields?.length > 0 && <li><span></span><button className="btn" type="submit">Submit</button></li>}
          </ul>
        </form>
      </div>
    </>
  );
}

export default ClinicalSupport



const FormItem = (props) => {
  return (
    <li> <div className="col1">{props?.label}</div>
      <div className="col2">
        {props?.type === 'dropdown' ? <Select {...props} /> : <Input {...props} />}
      </div></li>
  );
}

const Input = ({ label, isRequired, isReadonly, type }) => {
  return (<input type={type} name={label} disabled={isReadonly} required={isRequired} />)
}

const Select = ({ label, items, key, isRequired, isReadonly }) => {
  return (<select className={label} name={label} disabled={isReadonly} required={isRequired}>
    {items?.map(({ value, text }) => <option key={`select${key}`} value={value}>{text}</option>)}
  </select>)
}


