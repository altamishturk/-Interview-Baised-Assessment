import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

function Tooltip({anchorId,place="top",type="info",content="Tool Tip"}) {
  return (
    <ReactTooltip
        anchorId={anchorId}
        place={place}
        variant={type}
        content={content}
    />
  )
}

export default Tooltip