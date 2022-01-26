import { theme } from "../../../lib/theme";

export const PlusIcon = (props) => {

  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} >
      <circle fill={theme.color.dim} cx="64" cy="64" r="64"/>
      <path
        fill="#FFFFFF"
        d="M103,57H71V25c0-0.6-0.4-1-1-1H58c-0.6,0-1,0.4-1,1v32H25c-0.6,0-1,0.4-1,1v12c0,0.6,0.4,1,1,1h32v32
          c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V71h32c0.6,0,1-0.4,1-1V58C104,57.4,103.6,57,103,57z"
      />
    </svg>
  );
};
