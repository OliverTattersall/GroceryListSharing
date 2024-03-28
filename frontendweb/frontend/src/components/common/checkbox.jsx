import React from 'react';
import * as Styled from '../checkbox/checkboxstyle.ts';


export const Checkbox = ({
  onChange,
  disabled = false,
  checked = false,
  ...inputProps
}) => {
  // const [checked, setChecked] = useState(checkedInit);

  const handleClick = (e) => {
    if (disabled) return;
    // console.log(e)
    const nextValue = !checked;
    // setChecked(() => nextValue);
    if (onChange) onChange(nextValue);
  };

  return (
    <input type="checkbox" disabled={disabled} value={checked} onClick={handleClick}/>
    // <Styled.Checkbox onClick={handleClick} checked={checked} disabled={disabled}>
    //   <Styled.Input {...inputProps} disabled={disabled} />
    //   <Styled.Inner checked={checked} disabled={disabled} />
    // </Styled.Checkbox>
  );
};
