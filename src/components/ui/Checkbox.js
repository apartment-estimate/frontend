import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles(() => ({
  check: {
    marginLeft: 30,
    position: 'relative',
  },
  checkInput: {
    display: 'none',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    appearance: 'none',
    position: 'absolute',
  },
  checkBox: {
    cursor: 'pointer',
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    marginLeft: -30,
  },
  checkedImgTru: {
    backgroundImage: 'url(\'data:image/svg+xml,%3C%3Fxml version="1.0" encoding="UTF-8"%3F%3E%3Csvg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"%3E%3Ctitle%3EGroup 2%3C/title%3E%3Cg id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"%3E%3Cg id="TOOLTIPS-REGISTRATION-v0_2-(Tablet)" transform="translate(-223.000000, -730.000000)"%3E%3Cg id="Group-87" transform="translate(199.000000, 143.000000)"%3E%3Cg id="Group-2" transform="translate(24.000000, 587.000000)"%3E%3Ccircle id="Oval" stroke="%231EC78E" cx="6" cy="6" r="5.5"%3E%3C/circle%3E%3Ccircle id="Oval-Copy" fill="%231EC78E" cx="6" cy="6" r="4"%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A\')'
  },
  checkedImgFalse: {
    backgroundImage: 'url(\'data:image/svg+xml,%3C%3Fxml version="1.0" encoding="UTF-8"%3F%3E%3Csvg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"%3E%3Ctitle%3EOval%3C/title%3E%3Cg id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"%3E%3Cg id="TOOLTIPS-REGISTRATION-v0_2-(Desktop)" transform="translate(-351.000000, -602.000000)" stroke="%231EC78E"%3E%3Cg id="Group-84" transform="translate(327.000000, 15.000000)"%3E%3Ccircle id="Oval" cx="30" cy="593" r="5.5"%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
  },
}))

export const Checkbox = ({ checked, handlerClick, handlerChange, style, children, styleCheckBox }) => {
  const { check, checkInput, checkBox, checkedImgTru, checkedImgFalse } = useStyles();

  return (
    <label className={check}>
      <input
        className={checkInput}
        style={style}
        checked={checked}
        type="checkbox"
        onClick={handlerClick}
        onChange={handlerChange}
      />
      <span style={styleCheckBox} className={`${checkBox} ${checked ? checkedImgTru : checkedImgFalse }`} />
      {children}
    </label>
  );
};
